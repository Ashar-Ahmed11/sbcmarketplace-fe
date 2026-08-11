import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import RepairServiceNegotiationConversation from '../repairServiceNegotiations/RepairServiceNegotiationConversation';
import RepairServicePurchaseOrder from '../repairServiceNegotiations/RepairServicePurchaseOrder';
import { getAcceptedRepairServiceOffer } from '../repairServiceNegotiations/repairServiceNegotiationUtils';

function AdminRepairServiceNegotiationDetailPage() {
  const { repairServiceNegotiationId } = useParams();
  const { basicInfo, getBasicInfo, getRepairServiceNegotiationById, updateRepairServiceNegotiationStatus } = useContext(AppContext);
  const [row, setRow] = useState(null);

  useEffect(() => {
    getBasicInfo();
    getRepairServiceNegotiationById(repairServiceNegotiationId).then(setRow);
  }, [getBasicInfo, getRepairServiceNegotiationById, repairServiceNegotiationId]);

  if (!row) return null;
  const acceptedOffer = getAcceptedRepairServiceOffer(row);

  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head">
        <div>
          <h1>Negotiation Detail</h1>
          <p>{row.repairService?.title || 'Repair service negotiation'}</p>
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
              <div className="truck-figma-specs-cell"><span>On-Site</span><strong>{row.onSite ? 'Yes' : 'Workshop'}</strong></div>
              <div className="truck-figma-specs-cell"><span>Buyer City</span><strong>{row.buyerCity || '—'}</strong></div>
            </div>
            <div className="truck-figma-specs-row">
              <div className="truck-figma-specs-cell"><span>Buyer Address</span><strong>{row.buyerAddress || '—'}</strong></div>
              <div className="truck-figma-specs-cell"><span>Purchase Order Date</span><strong>{row.purhcaseOrderDate ? new Date(row.purhcaseOrderDate).toLocaleDateString() : '—'}</strong></div>
            </div>
            <div className="truck-figma-specs-row alt full">
              <div className="truck-figma-specs-cell">
                <span>Fault Description</span>
                <strong>{row.faultDescription || '—'}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="truck-figma-specs-card truck-figma-specs-card--compact">
          <div className="dashboard-section-head mb-0">
            <div><h3>Conversation</h3></div>
            <button className="dashboard-action-btn" data-bs-target="#adminRepairServiceNegotiationConversation" data-bs-toggle="collapse" type="button">View Conversation</button>
          </div>
          <div className="collapse mt-3" id="adminRepairServiceNegotiationConversation">
            <RepairServiceNegotiationConversation
              currentUserId={row.seller?._id}
              onAccept={() => {}}
              onOpenCounterOffer={() => {}}
              row={row}
              showActionButtons={false}
              showCounterButton={false}
              title="Repair Service Negotiation Conversation"
            />
          </div>
        </section>

        {row.faultImages?.length ? (
          <section className="truck-figma-specs-card truck-figma-specs-card--compact">
            <h3>Fault Images</h3>
            <div className="upload-preview-grid">
              {row.faultImages.map((image, index) => (
                <div className="upload-preview-card readonly" key={`${image.url}-${index}`}>
                  <img alt="Fault" src={image.url} />
                </div>
              ))}
            </div>
          </section>
        ) : null}

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
            <div className="dashboard-form-grid mt-3">
              <div className="form-field">
                <label>Advance Status</label>
                <select onChange={(event) => setRow((current) => ({ ...current, advanceStatus: event.target.value }))} value={row.advanceStatus}>
                  <option value="unpaid">Unpaid</option>
                  <option value="pendingApproval">Pending Approval</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              <div className="form-field">
                <label>Advance Rejection Reason</label>
                <input onChange={(event) => setRow((current) => ({ ...current, advanceStatusRejectionReason: event.target.value }))} type="text" value={row.advanceStatusRejectionReason || ''} />
              </div>
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
            <div className="dashboard-form-grid mt-3">
              <div className="form-field">
                <label>Final Payment Status</label>
                <select onChange={(event) => setRow((current) => ({ ...current, finalPaymentStatus: event.target.value }))} value={row.finalPaymentStatus}>
                  <option value="unpaid">Unpaid</option>
                  <option value="pendingApproval">Pending Approval</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              <div className="form-field">
                <label>Final Rejection Reason</label>
                <input onChange={(event) => setRow((current) => ({ ...current, finalPaymentStatusRejectionReason: event.target.value }))} type="text" value={row.finalPaymentStatusRejectionReason || ''} />
              </div>
            </div>
          </section>
        ) : null}

        {acceptedOffer && row.finalPaymentStatus === 'paid' ? <RepairServicePurchaseOrder basicInfo={basicInfo} row={row} /> : null}
      </div>

      <div className="dashboard-form-actions">
        <button className="dashboard-action-btn" onClick={async () => setRow(await updateRepairServiceNegotiationStatus(repairServiceNegotiationId, {
          advanceStatus: row.advanceStatus,
          finalPaymentStatus: row.finalPaymentStatus,
          advanceStatusRejectionReason: row.advanceStatusRejectionReason || '',
          finalPaymentStatusRejectionReason: row.finalPaymentStatusRejectionReason || '',
        }))} type="button">Update</button>
      </div>
    </section>
  );
}

export default AdminRepairServiceNegotiationDetailPage;
