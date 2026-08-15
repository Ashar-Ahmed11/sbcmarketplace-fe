import { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import FinanceTruckPurchaseOrder from '../financeTruckNegotiations/FinanceTruckPurchaseOrder';
import PaymentProofModal from '../negotiations/PaymentProofModal';
import { getAcceptedFinanceTruckOffer, getFinanceTruckNegotiationTotals } from '../financeTruckNegotiations/financeTruckNegotiationUtils';

const financeCounterOfferInitialState = {
  truckCost: '',
  downPayment: '',
  deliveryAmount: '',
  totalAmount: '',
  installments: [],
};

function formatCurrency(value) {
  return `Rs. ${Number(value || 0).toLocaleString()}`;
}

function formatDisplayDate(value) {
  return value ? new Date(value).toLocaleDateString() : '—';
}

function getNegotiationInstallmentTotal(negotiation) {
  return Math.max(
    (Number(negotiation?.truckCost || 0) + Number(negotiation?.deliveryAmount || 0))
      - Number(negotiation?.downPayment || 0),
    0
  );
}

function getOrdinalLabel(number) {
  const numeric = Number(number);
  const remainder10 = numeric % 10;
  const remainder100 = numeric % 100;

  if (remainder10 === 1 && remainder100 !== 11) return `${numeric}st`;
  if (remainder10 === 2 && remainder100 !== 12) return `${numeric}nd`;
  if (remainder10 === 3 && remainder100 !== 13) return `${numeric}rd`;
  return `${numeric}th`;
}

function formatDateInputValue(date) {
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
}

function createInstallmentSchedule(totalInstallmentAmount, months) {
  const safeMonths = Number(months) || 0;
  if (safeMonths <= 0) {
    return [];
  }

  const total = Number(totalInstallmentAmount) || 0;
  const baseAmount = Math.floor((total / safeMonths) * 100) / 100;
  const installments = [];
  let allocated = 0;

  for (let index = 0; index < safeMonths; index += 1) {
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + index + 1);

    const amount = index === safeMonths - 1
      ? Math.round((total - allocated) * 100) / 100
      : baseAmount;

    allocated += amount;
    installments.push({
      amount: String(amount > 0 ? amount : 0),
      date: formatDateInputValue(dueDate),
    });
  }

  return installments;
}

function rebalanceInstallments(installments, editedIndex, editedAmount, totalInstallmentAmount) {
  const total = Number(totalInstallmentAmount) || 0;
  const safeInstallments = Array.isArray(installments) ? installments : [];

  if (!safeInstallments.length) {
    return [];
  }

  if (safeInstallments.length === 1) {
    return [{
      ...safeInstallments[0],
      amount: String(Math.max(total, 0)),
    }];
  }

  const normalizedEditedAmount = Math.max(Number(editedAmount) || 0, 0);
  const remainingTotal = Math.max(total - normalizedEditedAmount, 0);
  const remainingCount = safeInstallments.length - 1;
  const equalShare = remainingCount > 0
    ? Math.floor((remainingTotal / remainingCount) * 100) / 100
    : 0;

  let allocatedRemaining = 0;

  return safeInstallments.map((item, index) => {
    if (index === editedIndex) {
      return {
        ...item,
        amount: String(normalizedEditedAmount),
      };
    }

    const isLastRemaining = index === safeInstallments.length - 1 || (
      editedIndex === safeInstallments.length - 1 && index === safeInstallments.length - 2
    );

    const amount = isLastRemaining
      ? Math.round((remainingTotal - allocatedRemaining) * 100) / 100
      : equalShare;

    allocatedRemaining += amount;

    return {
      ...item,
      amount: String(Math.max(amount, 0)),
    };
  });
}

function UserTruckFinanceNegotiationDetailPage() {
  const { financeTruckNegotiationId } = useParams();
  const history = useHistory();
  const {
    acceptFinanceTruckOffer,
    addFinanceTruckCounterOffer,
    basicInfo,
    confirmFinanceTruckCost,
    currentUser,
    fetchUser,
    getBasicInfo,
    getFinanceTruckNegotiationById,
    submitFinanceTruckAdvanceProof,
    submitFinanceTruckFinalProof,
    uploadImage,
  } = useContext(AppContext);
  const [row, setRow] = useState(null);
  const [proofModal, setProofModal] = useState({ open: false, type: 'advance' });
  const [counterOffer, setCounterOffer] = useState(financeCounterOfferInitialState);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [selectedInstallmentMonths, setSelectedInstallmentMonths] = useState(0);
  const [selectedNegotiationDetail, setSelectedNegotiationDetail] = useState(null);

  const derivedTotalAmount = useMemo(
    () => (Number(counterOffer.truckCost || 0) + Number(counterOffer.deliveryAmount || 0)),
    [counterOffer.deliveryAmount, counterOffer.truckCost]
  );

  const totalInstallmentAmount = useMemo(
    () => Math.max(derivedTotalAmount - Number(counterOffer.downPayment || 0), 0),
    [counterOffer.downPayment, derivedTotalAmount]
  );

  useEffect(() => {
    if (!selectedInstallmentMonths) {
      return;
    }

    setCounterOffer((current) => ({
      ...current,
      totalAmount: String(derivedTotalAmount),
      installments: createInstallmentSchedule(totalInstallmentAmount, selectedInstallmentMonths).map((item, index) => ({
        ...item,
        date: current.installments?.[index]?.date || item.date,
      })),
    }));
  }, [derivedTotalAmount, selectedInstallmentMonths, totalInstallmentAmount]);

  useEffect(() => {
    let isMounted = true;

    fetchUser();
    getBasicInfo();
    getFinanceTruckNegotiationById(financeTruckNegotiationId).then((data) => {
      if (isMounted) {
        setRow(data);
      }
    });

    return () => {
      isMounted = false;
    };
    // The finance negotiation screen should load once per route id.
    // Using the context callbacks in the dependency array can retrigger
    // this effect repeatedly when provider identities churn.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [financeTruckNegotiationId]);

  const acceptedOffer = useMemo(() => getAcceptedFinanceTruckOffer(row), [row]);
  if (!row) return null;
  const isBuyer = String(row?.buyer?._id) === String(currentUser?._id);
  const totals = getFinanceTruckNegotiationTotals(acceptedOffer, basicInfo);
  const truckImage = row.truck?.images?.[0]?.url || row.truck?.documentImages?.[0]?.url || '';

  return (
    <>
      <section className="dashboard-section-card finance-truck-preview-card">
        <div className="finance-truck-preview-card__media">
          {truckImage ? (
            <img alt={row.truck?.title || 'Truck preview'} src={truckImage} />
          ) : (
            <div className="finance-truck-preview-card__placeholder">
              <i aria-hidden="true" className="fa fa-truck" />
            </div>
          )}
        </div>
        <div className="finance-truck-preview-card__content">
          <div>
            <h2>Selected truck for this finance negotiation</h2>
            <p>
              {row.truck?.title || 'Truck Listing'}
              {row.truck?.price ? ` • ${formatCurrency(row.truck.price)}` : ''}
              {row.truck?.brand ? ` • ${row.truck.brand}` : ''}
              {row.truck?.location ? ` • ${row.truck.location}` : ''}
            </p>
          </div>
          {row.truck?._id ? (
            <button
              className="dashboard-action-btn"
              onClick={() => history.push(`/truck-details/${row.truck._id}`)}
              type="button"
            >
              View
            </button>
          ) : null}
        </div>
      </section>

      <section className="dashboard-section-card form-card-panel">
        <div className="dashboard-section-head"><div><h1>Truck Finance Negotiation</h1><p>{row.truck?.title || 'Finance negotiation'}</p></div></div>
        <div className="truck-negotiation-thread">
          {(row.negotiation || []).map((item) => {
            const isViewer = item.negotiator === (isBuyer ? 'buyer' : 'seller');
            const needsCostConfirm = Number(item.deliveryAmount) === 0 && !item.costAccepted && item.negotiator !== (isBuyer ? 'buyer' : 'seller');
            return (
              <div className={`truck-negotiation-bubble ${isViewer ? 'buyer' : 'seller'}`} key={item._id}>
                <div className="truck-negotiation-bubble__inner">
                  <small>{isViewer ? 'You' : item.negotiator === 'buyer' ? 'Buyer' : 'Seller'}</small>
                  <strong>Down Payment: Rs. {Number(item.downPayment || 0).toLocaleString()}</strong>
                  <span>Truck Cost: Rs. {Number(item.truckCost || 0).toLocaleString()} • Delivery: Rs. {Number(item.deliveryAmount || 0).toLocaleString()} • Total: Rs. {Number(item.totalAmount || 0).toLocaleString()}</span>
                  <span>{item.costAccepted ? 'Truck cost confirmed' : item.accepted ? 'Accepted' : 'Awaiting response'}</span>
                  <div className="d-flex justify-content-end mt-2">
                    <button
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={() => setSelectedNegotiationDetail(item)}
                      style={{ fontSize: '0.7rem', lineHeight: 1, color: '#ff7a21', fontWeight: 700 }}
                      type="button"
                    >
                      View Full Negotiation
                    </button>
                  </div>
                </div>
                {!acceptedOffer && item.negotiator !== (isBuyer ? 'buyer' : 'seller') ? (
                  needsCostConfirm ? (
                    <div>
                      <button className="dashboard-action-btn truck-negotiation-accept-btn" onClick={async () => setRow(await confirmFinanceTruckCost(financeTruckNegotiationId, { negotiationId: item._id }))} type="button">Confirm Cost</button>
                      <small className="d-block mt-2">Confirms the truck cost and requests the financer to provide the delivery cost.</small>
                    </div>
                  ) : (
                    <button className="dashboard-action-btn truck-negotiation-accept-btn" onClick={async () => setRow(await acceptFinanceTruckOffer(financeTruckNegotiationId, { negotiationId: item._id }))} type="button">Accept</button>
                  )
                ) : null}
              </div>
            );
          })}
        </div>
        {!acceptedOffer ? (
          <div className="dashboard-form-actions mt-3">
            <button className="dashboard-action-btn" onClick={() => setShowCounterModal(true)} type="button">Counter Offer</button>
          </div>
        ) : null}
      </section>

      {acceptedOffer ? (
        <section className="dashboard-section-card truck-negotiation-payment">
          <div className="truck-negotiation-payment__head"><div><h1>{row.advanceStatus !== 'paid' ? 'Pay Advance Fee' : row.finalPaymentStatus !== 'paid' ? 'Final Payment' : 'Negotiation Successful'}</h1></div></div>
          {row.advanceStatus !== 'paid' ? (
            <div className="truck-negotiation-payment__card">
              <div className="truck-negotiation-payment__row"><span>Down Payment</span><strong>Rs. {Number(totals.downPayment).toLocaleString()}</strong></div>
              <div className="truck-negotiation-payment__row"><span>Delivery Cost</span><strong>Rs. {Number(totals.deliveryAmount).toLocaleString()}</strong></div>
              <div className="truck-negotiation-payment__row"><span>Advance Fee</span><strong>Rs. {Number(totals.advanceFee).toLocaleString()}</strong></div>
              <div className="truck-negotiation-payment__row"><span>Platform Fee</span><strong>Rs. {Number(totals.advancePlatformFee).toLocaleString()}</strong></div>
              <div className="truck-negotiation-payment__row"><span>Total Amount to be Paid</span><strong>Rs. {Number(totals.advanceTotalToPay).toLocaleString()}</strong></div>
              {isBuyer ? <div className="truck-negotiation-payment__actions"><button className="dashboard-action-btn" onClick={() => setProofModal({ open: true, type: 'advance' })} type="button">Upload Payment Proof</button></div> : null}
            </div>
          ) : row.finalPaymentStatus !== 'paid' ? (
            <div className="truck-negotiation-payment__card">
              <div className="truck-negotiation-payment__row"><span>Agreed Down Payment</span><strong>Rs. {Number(totals.downPayment).toLocaleString()}</strong></div>
              <div className="truck-negotiation-payment__row"><span>Agreed Delivery Cost</span><strong>Rs. {Number(totals.deliveryAmount).toLocaleString()}</strong></div>
              <div className="truck-negotiation-payment__row"><span>Agreed Total Cost</span><strong>Rs. {Number(totals.agreedTotal).toLocaleString()}</strong></div>
              <div className="truck-negotiation-payment__row"><span>Amount to be Paid</span><strong>Rs. {Number(totals.finalAmountToPay).toLocaleString()}</strong></div>
              {isBuyer ? <div className="truck-negotiation-payment__actions"><button className="dashboard-action-btn" onClick={() => setProofModal({ open: true, type: 'final' })} type="button">Upload Payment Proof</button></div> : null}
            </div>
          ) : (
            <>
              <FinanceTruckPurchaseOrder
                basicInfo={basicInfo}
                installmentsBasePath="/user-dashboard/truck-installment"
                row={row}
              />
              <div className="dashboard-form-actions mt-3">
                <button className="dashboard-secondary-btn" onClick={() => history.push(`/user-dashboard/truck-installment/${row._id}`)} type="button">Manage Installments</button>
              </div>
            </>
          )}
        </section>
      ) : null}

      {selectedNegotiationDetail ? (
        <>
          <div className="modal-backdrop fade show rental-negotiation-modal-backdrop" />
          <div
            aria-hidden="false"
            aria-labelledby="financeNegotiationDetailModalLabel"
            className="modal fade show d-block"
            role="dialog"
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable rental-negotiation-modal" role="document">
              <div className="modal-content rental-negotiation-modal__content">
                <div className="modal-header rental-negotiation-modal__header">
                  <div>
                    <h2 className="modal-title" id="financeNegotiationDetailModalLabel">Negotiation Detail</h2>
                    <p className="mb-0">View the complete finance offer details for this negotiation message.</p>
                  </div>
                  <button
                    aria-label="Close"
                    className="btn-close"
                    onClick={() => setSelectedNegotiationDetail(null)}
                    type="button"
                  />
                </div>
                <div className="modal-body rental-negotiation-modal__body">
                  <div className="row">
                    <div className="col-md-6 col-12 form-field">
                      <label>Negotiator</label>
                      <div className="form-control d-flex align-items-center bg-light">
                        {selectedNegotiationDetail.negotiator === 'buyer' ? 'Buyer' : 'Seller'}
                      </div>
                    </div>
                    <div className="col-md-6 col-12 form-field">
                      <label>Submitted On</label>
                      <div className="form-control d-flex align-items-center bg-light">
                        {selectedNegotiationDetail.createdAt ? new Date(selectedNegotiationDetail.createdAt).toLocaleString() : '—'}
                      </div>
                    </div>
                    <div className="col-md-6 col-12 form-field">
                      <label>Truck Cost</label>
                      <div className="form-control d-flex align-items-center bg-light">
                        {formatCurrency(selectedNegotiationDetail.truckCost)}
                      </div>
                    </div>
                    <div className="col-md-6 col-12 form-field">
                      <label>Down Payment</label>
                      <div className="form-control d-flex align-items-center bg-light">
                        {formatCurrency(selectedNegotiationDetail.downPayment)}
                      </div>
                    </div>
                    <div className="col-md-6 col-12 form-field">
                      <label>Delivery Amount</label>
                      <div className="form-control d-flex align-items-center bg-light">
                        {formatCurrency(selectedNegotiationDetail.deliveryAmount)}
                      </div>
                    </div>
                    <div className="col-md-6 col-12 form-field">
                      <label>Total Amount</label>
                      <div className="form-control d-flex align-items-center bg-light">
                        {formatCurrency(selectedNegotiationDetail.totalAmount)}
                      </div>
                    </div>
                    <div className="col-12 form-field">
                      <label>Total Installment Amount</label>
                      <div className="form-control d-flex align-items-center bg-light">
                        {formatCurrency(getNegotiationInstallmentTotal(selectedNegotiationDetail))}
                      </div>
                      <small className="truck-figma-field-hint">
                        Calculated as (Truck Cost + Delivery Amount) - Down Payment
                      </small>
                    </div>
                    <div className="col-12">
                      <div className="dashboard-upload-head px-0 pt-2">
                        <div>
                          <h2>Installments</h2>
                          <p>Read-only installment plan for this offer.</p>
                        </div>
                      </div>
                    </div>
                    {(selectedNegotiationDetail.installments || []).length ? (
                      selectedNegotiationDetail.installments.map((installment, index) => (
                        <div className="col-12" key={`${installment.date}-${index}`}>
                          <div className="border rounded-3 p-3 mb-2 bg-white">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <h3 className="mb-0" style={{ fontSize: '1rem', color: '#1d3557', fontWeight: 700 }}>
                                {getOrdinalLabel(index + 1)} Month
                              </h3>
                            </div>
                            <div className="row g-3">
                              <div className="col-md-6 col-12 form-field">
                                <label>Installment Amount</label>
                                <div className="form-control d-flex align-items-center bg-light">
                                  {formatCurrency(installment.amount)}
                                </div>
                              </div>
                              <div className="col-md-6 col-12 form-field">
                                <label>Installment Date</label>
                                <div className="form-control d-flex align-items-center bg-light">
                                  {formatDisplayDate(installment.date)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-12">
                        <div className="form-control d-flex align-items-center bg-light">
                          No installments added.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer rental-negotiation-modal__footer">
                  <button className="dashboard-secondary-btn" onClick={() => setSelectedNegotiationDetail(null)} type="button">Close</button>
                  {!acceptedOffer && selectedNegotiationDetail.negotiator !== (isBuyer ? 'buyer' : 'seller') ? (
                    Number(selectedNegotiationDetail.deliveryAmount) === 0 && !selectedNegotiationDetail.costAccepted ? (
                      <button
                        className="dashboard-action-btn"
                        onClick={async () => {
                          setRow(await confirmFinanceTruckCost(financeTruckNegotiationId, { negotiationId: selectedNegotiationDetail._id }));
                          setSelectedNegotiationDetail(null);
                        }}
                        type="button"
                      >
                        Confirm Cost
                      </button>
                    ) : (
                      <button
                        className="dashboard-action-btn"
                        onClick={async () => {
                          setRow(await acceptFinanceTruckOffer(financeTruckNegotiationId, { negotiationId: selectedNegotiationDetail._id }));
                          setSelectedNegotiationDetail(null);
                        }}
                        type="button"
                      >
                        Accept
                      </button>
                    )
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {showCounterModal ? (
        <>
          <div className="modal-backdrop fade show rental-negotiation-modal-backdrop" />
          <div
            aria-hidden="false"
            aria-labelledby="truckFinanceCounterOfferModalLabel"
            className="modal fade show d-block"
            role="dialog"
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable rental-negotiation-modal" role="document">
              <div className="modal-content rental-negotiation-modal__content">
                <div className="modal-header rental-negotiation-modal__header">
                  <div>
                    <h2 className="modal-title" id="truckFinanceCounterOfferModalLabel">Submit Counter Offer</h2>
                    <p className="mb-0">Enter the revised finance terms for the next round.</p>
                  </div>
                  <button
                    aria-label="Close"
                    className="btn-close"
                    onClick={() => setShowCounterModal(false)}
                    type="button"
                  />
                </div>
                <div className="modal-body rental-negotiation-modal__body">
                  <div className="row">
                    <div className="col-md-6 col-12 form-field">
                      <label>Truck Cost</label>
                      <input onChange={(event) => setCounterOffer((current) => ({ ...current, truckCost: event.target.value }))} type="number" value={counterOffer.truckCost} />
                    </div>
                    <div className="col-md-6 col-12 form-field">
                      <label>Down Payment</label>
                      <input onChange={(event) => setCounterOffer((current) => ({ ...current, downPayment: event.target.value }))} type="number" value={counterOffer.downPayment} />
                    </div>
                    <div className="col-md-6 col-12 form-field">
                      <label>Delivery Amount</label>
                      <input onChange={(event) => setCounterOffer((current) => ({ ...current, deliveryAmount: event.target.value }))} type="number" value={counterOffer.deliveryAmount} />
                    </div>
                    <div className="col-md-6 col-12 form-field">
                      <label>Total Amount</label>
                      <div className="form-control d-flex align-items-center bg-light">
                        {formatCurrency(derivedTotalAmount)}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="dashboard-upload-head px-0 pt-2">
                        <div>
                          <h2>Installments</h2>
                          <p>Define the installment schedule for this counter offer.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 form-field">
                      <label>Total Installment Amount</label>
                      <div className="form-control d-flex align-items-center bg-light">
                        {formatCurrency(totalInstallmentAmount)}
                      </div>
                      <small className="truck-figma-field-hint">
                        Calculated as (Truck Cost + Delivery Amount) - Down Payment
                      </small>
                    </div>
                    <div className="col-12">
                      <div className="d-flex flex-wrap gap-2 mb-3">
                        {Array.from({ length: 12 }, (_, index) => index + 1).map((monthCount) => (
                          <button
                            className={selectedInstallmentMonths === monthCount ? 'dashboard-action-btn' : 'dashboard-secondary-btn'}
                            key={monthCount}
                            onClick={() => setCounterOffer((current) => ({
                              ...current,
                              totalAmount: String(derivedTotalAmount),
                              installments: createInstallmentSchedule(totalInstallmentAmount, monthCount),
                            }))}
                            type="button"
                            onClickCapture={() => setSelectedInstallmentMonths(monthCount)}
                          >
                            {monthCount} Month
                          </button>
                        ))}
                      </div>
                    </div>
                    {(counterOffer.installments || []).map((installment, index) => (
                      <div className="col-12" key={index}>
                        <div className="border rounded-3 p-3 mb-2 bg-white">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <h3 className="mb-0" style={{ fontSize: '1rem', color: '#1d3557', fontWeight: 700 }}>
                              {getOrdinalLabel(index + 1)} Month
                            </h3>
                          </div>
                          <div className="row g-3 align-items-end">
                            <div className="col-md-6 col-12 form-field">
                              <label>Installment Amount</label>
                              <input
                                onChange={(event) => setCounterOffer((current) => ({
                                  ...current,
                                  installments: rebalanceInstallments(
                                    current.installments,
                                    index,
                                    event.target.value,
                                    totalInstallmentAmount
                                  ),
                                }))}
                                type="number"
                                value={installment.amount}
                              />
                            </div>
                            <div className="col-md-6 col-12 form-field">
                              <label>Installment Date</label>
                              <input
                                onChange={(event) => setCounterOffer((current) => ({
                                  ...current,
                                  installments: current.installments.map((item, itemIndex) => (
                                    itemIndex === index ? { ...item, date: event.target.value } : item
                                  )),
                                }))}
                                type="date"
                                value={installment.date}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer rental-negotiation-modal__footer">
                  <button className="dashboard-secondary-btn" onClick={() => setShowCounterModal(false)} type="button">Cancel</button>
                  <button
                    className="dashboard-action-btn"
                    onClick={async () => {
                      setRow(await addFinanceTruckCounterOffer(financeTruckNegotiationId, {
                        ...counterOffer,
                        totalAmount: derivedTotalAmount,
                      }));
                      setCounterOffer(financeCounterOfferInitialState);
                      setSelectedInstallmentMonths(0);
                      setShowCounterModal(false);
                    }}
                    type="button"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <PaymentProofModal
        onClose={() => setProofModal({ open: false, type: 'advance' })}
        onSubmit={async (images) => {
          const updated = proofModal.type === 'advance'
            ? await submitFinanceTruckAdvanceProof(financeTruckNegotiationId, { advancePaymentScreenshots: images })
            : await submitFinanceTruckFinalProof(financeTruckNegotiationId, { finalPaymentScreenshots: images });
          setRow(updated);
          setProofModal({ open: false, type: 'advance' });
        }}
        open={proofModal.open}
        title={proofModal.type === 'advance' ? 'Upload Advance Payment Proof' : 'Upload Final Payment Proof'}
        uploadImage={uploadImage}
      />
    </>
  );
}

export default UserTruckFinanceNegotiationDetailPage;
