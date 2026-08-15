import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import PaymentProofModal from '../negotiations/PaymentProofModal';
import RentalConstructionMachineryNegotiationConversation from '../rentalConstructionMachineryNegotiations/RentalConstructionMachineryNegotiationConversation';
import RentalConstructionMachineryNegotiationPaymentPanels from '../rentalConstructionMachineryNegotiations/RentalConstructionMachineryNegotiationPaymentPanels';
import RentalConstructionMachineryPurchaseOrder from '../rentalConstructionMachineryNegotiations/RentalConstructionMachineryPurchaseOrder';
import { getAcceptedRentalConstructionMachineryOffer } from '../rentalConstructionMachineryNegotiations/rentalConstructionMachineryNegotiationUtils';

function getInitialCounterOffer() {
  return {
    securityDepositAmount: '',
    perDayRentalCharges: '',
    deliveryCost: '',
    mobilizationCost: '',
    demobilizationCost: '',
    rentalDuration: { fromDate: '', toDate: '' },
    fuelResponsibility: 'buyer',
    maintenanceResponsibility: 'seller',
  };
}

function UserRentalConstructionMachineryNegotiationDetailPage() {
  const { rentalConstructionMachineryNegotiationId } = useParams();
  const {
    acceptRentalConstructionMachineryOffer,
    addRentalConstructionMachineryCounterOffer,
    basicInfo,
    currentUser,
    fetchUser,
    getBasicInfo,
    getRentalConstructionMachineryNegotiationById,
    submitRentalConstructionMachineryAdvanceProof,
    submitRentalConstructionMachineryFinalProof,
    uploadImage,
  } = useContext(AppContext);
  const [row, setRow] = useState(null);
  const [counterOffer, setCounterOffer] = useState(getInitialCounterOffer);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [proofModal, setProofModal] = useState({ open: false, type: 'advance' });

  useEffect(() => {
    let isMounted = true;

    fetchUser();
    getBasicInfo();
    getRentalConstructionMachineryNegotiationById(rentalConstructionMachineryNegotiationId).then((data) => {
      if (isMounted) {
        setRow(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [fetchUser, getBasicInfo, getRentalConstructionMachineryNegotiationById, rentalConstructionMachineryNegotiationId]);

  if (!row) return null;

  const acceptedOffer = getAcceptedRentalConstructionMachineryOffer(row);
  const isBuyer = String(row?.buyer?._id) === String(currentUser?._id);

  return (
    <>
      {(!acceptedOffer || row.advanceStatus !== 'paid') ? (
        <RentalConstructionMachineryNegotiationConversation
          currentUserId={currentUser?._id}
          onAccept={async (negotiationId) => setRow(await acceptRentalConstructionMachineryOffer(rentalConstructionMachineryNegotiationId, { negotiationId }))}
          onOpenCounterOffer={() => setShowCounterModal(true)}
          row={row}
          title="Rental Construction Machinery Negotiation"
        />
      ) : null}

      {acceptedOffer ? (
        <RentalConstructionMachineryNegotiationPaymentPanels
          acceptedOffer={acceptedOffer}
          basicInfo={basicInfo}
          isBuyer={isBuyer}
          onOpenAdvanceProof={() => setProofModal({ open: true, type: 'advance' })}
          onOpenFinalProof={() => setProofModal({ open: true, type: 'final' })}
          row={row}
        />
      ) : null}

      {row.finalPaymentStatus === 'paid' ? <RentalConstructionMachineryPurchaseOrder basicInfo={basicInfo} row={row} /> : null}

      {showCounterModal ? (
        <>
          <div className="modal-backdrop fade show rental-negotiation-modal-backdrop" />
          <div aria-hidden="false" aria-labelledby="rentalConstructionMachineryCounterOfferModalLabel" className="modal fade show d-block" role="dialog" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable rental-negotiation-modal" role="document">
              <div className="modal-content rental-negotiation-modal__content">
                <div className="modal-header rental-negotiation-modal__header">
                  <div>
                    <h2 className="modal-title" id="rentalConstructionMachineryCounterOfferModalLabel">Submit Counter Offer</h2>
                    <p className="mb-0">Enter the revised rental terms for the next round.</p>
                  </div>
                  <button aria-label="Close" className="btn-close" onClick={() => setShowCounterModal(false)} type="button" />
                </div>
                <div className="modal-body rental-negotiation-modal__body">
                  <div className="row">
                    <div className="form-field col-md-6 col-12">
                      <label>Rental Construction Machinery Per Day Negotiation Cost</label>
                      <input onChange={(event) => setCounterOffer((current) => ({ ...current, perDayRentalCharges: event.target.value }))} type="number" value={counterOffer.perDayRentalCharges} />
                    </div>
                    <div className="form-field col-md-6 col-12">
                      <label>Delivery Cost</label>
                      <input onChange={(event) => setCounterOffer((current) => ({ ...current, deliveryCost: event.target.value }))} type="number" value={counterOffer.deliveryCost} />
                    </div>
                    <div className="form-field col-12">
                      <label>Security Deposit Amount</label>
                      <input onChange={(event) => setCounterOffer((current) => ({ ...current, securityDepositAmount: event.target.value }))} type="number" value={counterOffer.securityDepositAmount} />
                    </div>
                    <div className="form-field col-md-6 col-12">
                      <label>Mobilization Cost</label>
                      <input onChange={(event) => setCounterOffer((current) => ({ ...current, mobilizationCost: event.target.value }))} type="number" value={counterOffer.mobilizationCost} />
                    </div>
                    <div className="form-field col-md-6 col-12">
                      <label>Demobilization Cost</label>
                      <input onChange={(event) => setCounterOffer((current) => ({ ...current, demobilizationCost: event.target.value }))} type="number" value={counterOffer.demobilizationCost} />
                    </div>
                    <div className="form-field col-md-6 col-12">
                      <label>Rental Duration From</label>
                      <input onChange={(event) => setCounterOffer((current) => ({ ...current, rentalDuration: { ...current.rentalDuration, fromDate: event.target.value } }))} type="date" value={counterOffer.rentalDuration.fromDate} />
                    </div>
                    <div className="form-field col-md-6 col-12">
                      <label>Rental Duration To</label>
                      <input onChange={(event) => setCounterOffer((current) => ({ ...current, rentalDuration: { ...current.rentalDuration, toDate: event.target.value } }))} type="date" value={counterOffer.rentalDuration.toDate} />
                    </div>
                    <div className="form-field col-md-6 col-12">
                      <label>Fuel Responsibility</label>
                      <select onChange={(event) => setCounterOffer((current) => ({ ...current, fuelResponsibility: event.target.value }))} value={counterOffer.fuelResponsibility}>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                      </select>
                    </div>
                    <div className="form-field col-md-6 col-12">
                      <label>Maintenance Responsibility</label>
                      <select onChange={(event) => setCounterOffer((current) => ({ ...current, maintenanceResponsibility: event.target.value }))} value={counterOffer.maintenanceResponsibility}>
                        <option value="seller">Seller</option>
                        <option value="buyer">Buyer</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer rental-negotiation-modal__footer">
                  <button className="dashboard-secondary-btn" onClick={() => setShowCounterModal(false)} type="button">Cancel</button>
                  <button
                    className="dashboard-action-btn"
                    onClick={async () => {
                      setRow(await addRentalConstructionMachineryCounterOffer(rentalConstructionMachineryNegotiationId, counterOffer));
                      setCounterOffer(getInitialCounterOffer());
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
            ? await submitRentalConstructionMachineryAdvanceProof(rentalConstructionMachineryNegotiationId, { advancePaymentScreenshots: images })
            : await submitRentalConstructionMachineryFinalProof(rentalConstructionMachineryNegotiationId, { finalPaymentScreenshots: images });
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

export default UserRentalConstructionMachineryNegotiationDetailPage;
