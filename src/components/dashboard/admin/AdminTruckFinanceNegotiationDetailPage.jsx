import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import FinanceTruckPurchaseOrder from '../financeTruckNegotiations/FinanceTruckPurchaseOrder';
import { getAcceptedFinanceTruckOffer } from '../financeTruckNegotiations/financeTruckNegotiationUtils';

function AdminTruckFinanceNegotiationDetailPage() {
  const { financeTruckNegotiationId } = useParams();
  const {
    basicInfo,
    getBasicInfo,
    getFinanceTruckNegotiationById,
    updateFinanceTruckNegotiationStatus,
  } = useContext(AppContext);
  const [row, setRow] = useState(null);

  useEffect(() => {
    getBasicInfo();
    getFinanceTruckNegotiationById(financeTruckNegotiationId).then(setRow);
  }, [financeTruckNegotiationId, getBasicInfo, getFinanceTruckNegotiationById]);

  const acceptedOffer = useMemo(() => getAcceptedFinanceTruckOffer(row), [row]);
  if (!row) return null;

  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head"><div><h1>Truck Finance Negotiation Detail</h1><p>{row.truck?.title || 'Truck finance negotiation'}</p></div></div>
      <div className="truck-figma-details-stack mb-4">
        <section className="truck-figma-specs-card truck-figma-specs-card--compact">
          <h3>Negotiation Summary</h3>
          <div className="truck-figma-specs-table">
            <div className="truck-figma-specs-row"><div className="truck-figma-specs-cell"><span>Buyer</span><strong>{row.buyer?.fullName || row.buyer?.username || '—'}</strong></div><div className="truck-figma-specs-cell"><span>Seller</span><strong>{row.seller?.fullName || row.seller?.username || '—'}</strong></div></div>
            <div className="truck-figma-specs-row alt"><div className="truck-figma-specs-cell"><span>Delivery City</span><strong>{row.buyerDeliveryCity || '—'}</strong></div><div className="truck-figma-specs-cell"><span>Purchase Order Date</span><strong>{row.purhcaseOrderDate ? new Date(row.purhcaseOrderDate).toLocaleDateString() : '—'}</strong></div></div>
            {acceptedOffer ? <div className="truck-figma-specs-row"><div className="truck-figma-specs-cell"><span>Accepted Down Payment</span><strong>Rs. {Number(acceptedOffer.downPayment || 0).toLocaleString()}</strong></div><div className="truck-figma-specs-cell"><span>Installments</span><strong>{acceptedOffer.installments?.length || 0}</strong></div></div> : null}
          </div>
        </section>
        <section className="truck-figma-specs-card truck-figma-specs-card--compact">
          <div className="dashboard-form-grid">
            <div className="form-field"><label>Advance Status</label><select onChange={(event) => setRow((current) => ({ ...current, advanceStatus: event.target.value }))} value={row.advanceStatus}><option value="unpaid">Unpaid</option><option value="pendingApproval">Pending Approval</option><option value="paid">Paid</option></select></div>
            <div className="form-field"><label>Advance Rejection Reason</label><input onChange={(event) => setRow((current) => ({ ...current, advanceStatusRejectionReason: event.target.value }))} type="text" value={row.advanceStatusRejectionReason || ''} /></div>
            <div className="form-field"><label>Final Payment Status</label><select onChange={(event) => setRow((current) => ({ ...current, finalPaymentStatus: event.target.value }))} value={row.finalPaymentStatus}><option value="unpaid">Unpaid</option><option value="pendingApproval">Pending Approval</option><option value="paid">Paid</option></select></div>
            <div className="form-field"><label>Final Rejection Reason</label><input onChange={(event) => setRow((current) => ({ ...current, finalPaymentStatusRejectionReason: event.target.value }))} type="text" value={row.finalPaymentStatusRejectionReason || ''} /></div>
          </div>
        </section>

        {row.advancePaymentScreenshots?.length ? (
          <section className="truck-figma-specs-card truck-figma-specs-card--compact">
            <h3>Advance Payment Proof</h3>
            <div className="upload-preview-grid">
              {row.advancePaymentScreenshots.map((image, index) => (
                <div className="upload-preview-card readonly" key={`${image.url}-${index}`}>
                  <img alt="Advance payment proof" src={image.url} />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {row.finalPaymentScreenshots?.length ? (
          <section className="truck-figma-specs-card truck-figma-specs-card--compact">
            <h3>Final Payment Proof</h3>
            <div className="upload-preview-grid">
              {row.finalPaymentScreenshots.map((image, index) => (
                <div className="upload-preview-card readonly" key={`${image.url}-${index}`}>
                  <img alt="Final payment proof" src={image.url} />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {acceptedOffer && row.finalPaymentStatus === 'paid' ? (
          <FinanceTruckPurchaseOrder
            basicInfo={basicInfo}
            installmentsBasePath="/admin-dashboard/truck-installment"
            row={row}
          />
        ) : null}
      </div>
      <div className="dashboard-form-actions"><button className="dashboard-action-btn" onClick={async () => setRow(await updateFinanceTruckNegotiationStatus(financeTruckNegotiationId, row))} type="button">Update</button></div>
    </section>
  );
}

export default AdminTruckFinanceNegotiationDetailPage;
