import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import SparePartInspectionNegotiationConversation from '../sparePartInspectionNegotiations/SparePartInspectionNegotiationConversation';
import SparePartInspectionPurchaseOrder from '../sparePartInspectionNegotiations/SparePartInspectionPurchaseOrder';
import {
  formatInspectionDate,
  formatInspectionTime,
  getAcceptedSparePartInspectionOffer,
} from '../sparePartInspectionNegotiations/sparePartInspectionNegotiationUtils';

function AdminSparePartInspectionNegotiationDetailPage() {
  const { sparePartInspectionNegotiationId } = useParams();
  const { basicInfo, getBasicInfo, getSparePartInspectionNegotiationById, updateSparePartInspectionNegotiationStatus } = useContext(AppContext);
  const [row, setRow] = useState(null);

  useEffect(() => {
    getBasicInfo();
    getSparePartInspectionNegotiationById(sparePartInspectionNegotiationId).then(setRow);
  }, [getBasicInfo, getSparePartInspectionNegotiationById, sparePartInspectionNegotiationId]);

  if (!row) return null;
  const acceptedOffer = getAcceptedSparePartInspectionOffer(row);

  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head">
        <div><h1>Negotiation Detail</h1><p>{row.inspectionService?.title || 'Spare part inspection service negotiation'}</p></div>
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
              <div className="truck-figma-specs-cell"><span>Spare Part</span><strong>{row.sparePart?.title || '—'}</strong></div>
              <div className="truck-figma-specs-cell"><span>Inspection Type</span><strong>{row.onSite ? 'On-Site' : 'Workshop'}</strong></div>
            </div>
            <div className="truck-figma-specs-row">
              <div className="truck-figma-specs-cell"><span>Buyer Address</span><strong>{row.buyerAddress || '—'}</strong></div>
              <div className="truck-figma-specs-cell"><span>Purchase Order Date</span><strong>{row.purhcaseOrderDate ? new Date(row.purhcaseOrderDate).toLocaleDateString() : '—'}</strong></div>
            </div>
            <div className="truck-figma-specs-row alt">
              <div className="truck-figma-specs-cell"><span>Accepted Inspection Date</span><strong>{formatInspectionDate(acceptedOffer?.inspectionDate)}</strong></div>
              <div className="truck-figma-specs-cell"><span>Accepted Inspection Time</span><strong>{formatInspectionTime(acceptedOffer?.inspectionTime)}</strong></div>
            </div>
          </div>
        </section>
        <section className="truck-figma-specs-card truck-figma-specs-card--compact">
          <div className="dashboard-section-head mb-0"><div><h3>Conversation</h3></div><button className="dashboard-action-btn" data-bs-target="#adminSparePartInspectionNegotiationConversation" data-bs-toggle="collapse" type="button">View Conversation</button></div>
          <div className="collapse mt-3" id="adminSparePartInspectionNegotiationConversation">
            <SparePartInspectionNegotiationConversation currentUserId={row.seller?._id} onAccept={() => {}} onOpenCounterOffer={() => {}} row={row} showActionButtons={false} showCounterButton={false} title="Spare Part Inspection Negotiation Conversation" />
          </div>
        </section>
        {acceptedOffer && row.finalPaymentStatus === 'paid' ? <SparePartInspectionPurchaseOrder basicInfo={basicInfo} reportBasePath="/admin-dashboard/spare-part-inspection-report" row={row} /> : null}
      </div>
      <div className="dashboard-form-actions">
        <button className="dashboard-action-btn" onClick={async () => setRow(await updateSparePartInspectionNegotiationStatus(sparePartInspectionNegotiationId, {
          advanceStatus: row.advanceStatus,
          finalPaymentStatus: row.finalPaymentStatus,
          advanceStatusRejectionReason: row.advanceStatusRejectionReason || '',
          finalPaymentStatusRejectionReason: row.finalPaymentStatusRejectionReason || '',
        }))} type="button">Update</button>
      </div>
    </section>
  );
}

export default AdminSparePartInspectionNegotiationDetailPage;
