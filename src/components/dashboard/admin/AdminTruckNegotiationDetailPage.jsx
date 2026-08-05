import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';

function AdminTruckNegotiationDetailPage() {
  const { truckNegotiationId } = useParams();
  const { getTruckNegotiationById, updateTruckNegotiationStatus } = useContext(AppContext);
  const [row, setRow] = useState(null);

  useEffect(() => {
    getTruckNegotiationById(truckNegotiationId).then(setRow);
  }, [getTruckNegotiationById, truckNegotiationId]);

  if (!row) return null;

  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head">
        <div>
          <h1>Negotiation Detail</h1>
          <p>{row.truck?.title || 'Truck negotiation'}</p>
        </div>
      </div>

      <div className="truck-figma-details-stack mb-4">
        <section className="truck-figma-specs-card truck-figma-specs-card--compact">
          <h3>Negotiation Summary</h3>
          <div className="truck-figma-specs-table">
            <div className="truck-figma-specs-row">
              <div className="truck-figma-specs-cell"><span>Buyer</span><strong>{row.buyer?.fullName || row.buyer?.username || '—'}</strong></div>
              <div className="truck-figma-specs-cell"><span>Seller</span><strong>{row.seller?.fullName || row.seller?.username || '—'}</strong></div>
            </div>
            <div className="truck-figma-specs-row alt">
              <div className="truck-figma-specs-cell"><span>Delivery Type</span><strong>{row.sellerDelivery ? 'Seller Delivery' : 'SBC Delivery'}</strong></div>
              <div className="truck-figma-specs-cell"><span>Delivery City</span><strong>{row.buyerDeliveryCity || '—'}</strong></div>
            </div>
            <div className="truck-figma-specs-row">
              <div className="truck-figma-specs-cell"><span>Delivery Address</span><strong>{row.buyerDeliveryAddress || '—'}</strong></div>
              <div className="truck-figma-specs-cell"><span>Purchase Order Date</span><strong>{row.purhcaseOrderDate ? new Date(row.purhcaseOrderDate).toLocaleDateString() : '—'}</strong></div>
            </div>
          </div>
        </section>

        {(row.negotiation || []).map((item) => (
          <section className="truck-figma-specs-card truck-figma-specs-card--compact" key={item._id}>
            <h3>{item.negotiator === 'buyer' ? 'Buyer Offer' : 'Seller Offer'}</h3>
            <div className="truck-figma-specs-table">
              <div className="truck-figma-specs-row">
                <div className="truck-figma-specs-cell"><span>Truck Cost</span><strong>{item.truckCost ? `Rs. ${Number(item.truckCost).toLocaleString()}` : '—'}</strong></div>
                <div className="truck-figma-specs-cell"><span>Delivery Cost</span><strong>{item.deliveryCost ? `Rs. ${Number(item.deliveryCost).toLocaleString()}` : '—'}</strong></div>
              </div>
              <div className="truck-figma-specs-row alt">
                <div className="truck-figma-specs-cell"><span>Accepted</span><strong>{item.accepted ? 'Yes' : 'No'}</strong></div>
                <div className="truck-figma-specs-cell"><span>Submitted</span><strong>{item.createdAt ? new Date(item.createdAt).toLocaleString() : '—'}</strong></div>
              </div>
            </div>
          </section>
        ))}

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
      </div>

      <div className="dashboard-form-grid">
        <div className="form-field">
          <label>Advance Status</label>
          <select onChange={(event) => setRow((current) => ({ ...current, advanceStatus: event.target.value }))} value={row.advanceStatus}>
            <option value="unpaid">Unpaid</option>
            <option value="pendingApproval">Pending Approval</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        <div className="form-field">
          <label>Final Payment Status</label>
          <select onChange={(event) => setRow((current) => ({ ...current, finalPaymentStatus: event.target.value }))} value={row.finalPaymentStatus}>
            <option value="unpaid">Unpaid</option>
            <option value="pendingApproval">Pending Approval</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        <div className="form-field">
          <label>Advance Rejection Reason</label>
          <input name="advanceStatusRejectionReason" onChange={(event) => setRow((current) => ({ ...current, advanceStatusRejectionReason: event.target.value }))} type="text" value={row.advanceStatusRejectionReason || ''} />
        </div>
        <div className="form-field">
          <label>Final Rejection Reason</label>
          <input name="finalPaymentStatusRejectionReason" onChange={(event) => setRow((current) => ({ ...current, finalPaymentStatusRejectionReason: event.target.value }))} type="text" value={row.finalPaymentStatusRejectionReason || ''} />
        </div>
      </div>

      <div className="dashboard-form-actions">
        <button className="dashboard-action-btn" onClick={async () => setRow(await updateTruckNegotiationStatus(truckNegotiationId, {
          advanceStatus: row.advanceStatus,
          finalPaymentStatus: row.finalPaymentStatus,
          advanceStatusRejectionReason: row.advanceStatusRejectionReason || '',
          finalPaymentStatusRejectionReason: row.finalPaymentStatusRejectionReason || '',
        }))} type="button">Update</button>
      </div>
    </section>
  );
}

export default AdminTruckNegotiationDetailPage;
