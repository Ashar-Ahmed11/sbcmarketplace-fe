import { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import ConstructionMaterialInspectionNegotiationConversation from '../constructionMaterialInspectionNegotiations/ConstructionMaterialInspectionNegotiationConversation';
import ConstructionMaterialInspectionNegotiationPaymentPanels from '../constructionMaterialInspectionNegotiations/ConstructionMaterialInspectionNegotiationPaymentPanels';
import ConstructionMaterialInspectionPurchaseOrder from '../constructionMaterialInspectionNegotiations/ConstructionMaterialInspectionPurchaseOrder';
import {
  formatInspectionDate,
  formatInspectionTime,
  getAcceptedConstructionMaterialInspectionOffer,
} from '../constructionMaterialInspectionNegotiations/constructionMaterialInspectionNegotiationUtils';
import PaymentProofModal from '../negotiations/PaymentProofModal';

function UserConstructionMaterialInspectionNegotiationDetailPage() {
  const { constructionMaterialInspectionNegotiationId } = useParams();
  const {
    acceptConstructionMaterialInspectionOffer,
    addConstructionMaterialInspectionCounterOffer,
    basicInfo,
    currentUser,
    fetchUser,
    getBasicInfo,
    getConstructionMaterialInspectionNegotiationById,
    submitConstructionMaterialInspectionAdvanceProof,
    submitConstructionMaterialInspectionFinalProof,
    uploadImage,
  } = useContext(AppContext);
  const [row, setRow] = useState(null);
  const [counterOffer, setCounterOffer] = useState({ labourCharges: '', inspectionDate: null, inspectionTime: '09:00' });
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [proofModal, setProofModal] = useState({ open: false, type: 'advance' });

  useEffect(() => {
    fetchUser();
    getBasicInfo();
    getConstructionMaterialInspectionNegotiationById(constructionMaterialInspectionNegotiationId).then(setRow);
  }, [constructionMaterialInspectionNegotiationId, fetchUser, getBasicInfo, getConstructionMaterialInspectionNegotiationById]);

  if (!row) return null;
  const acceptedOffer = getAcceptedConstructionMaterialInspectionOffer(row);
  const isBuyer = String(row?.buyer?._id) === String(currentUser?._id);

  return (
    <>
      <section className="dashboard-section-card form-card-panel">
        <div className="dashboard-section-head">
          <div><h1>Construction Material Inspection Negotiation</h1><p>{row.inspectionService?.title || 'Construction material inspection service request'}</p></div>
        </div>
        <div className="truck-figma-details-stack">
          <section className="truck-figma-specs-card truck-figma-specs-card--compact">
            <div className="truck-figma-specs-table">
              <div className="truck-figma-specs-row">
                <div className="truck-figma-specs-cell"><span>Selected Material</span><strong>{row.constructionMaterial?.title || '—'}</strong></div>
                <div className="truck-figma-specs-cell"><span>Inspection Mode</span><strong>{row.onSite ? 'On-Site' : 'Workshop'}</strong></div>
              </div>
              <div className="truck-figma-specs-row alt">
                <div className="truck-figma-specs-cell"><span>Buyer City</span><strong>{row.buyerCity || '—'}</strong></div>
                <div className="truck-figma-specs-cell"><span>Buyer Address</span><strong>{row.buyerAddress || '—'}</strong></div>
              </div>
              <div className="truck-figma-specs-row">
                <div className="truck-figma-specs-cell"><span>Accepted Inspection Date</span><strong>{formatInspectionDate(acceptedOffer?.inspectionDate)}</strong></div>
                <div className="truck-figma-specs-cell"><span>Accepted Inspection Time</span><strong>{formatInspectionTime(acceptedOffer?.inspectionTime)}</strong></div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {(!acceptedOffer || row.advanceStatus !== 'paid') ? (
        <ConstructionMaterialInspectionNegotiationConversation
          currentUserId={currentUser?._id}
          onAccept={async (negotiationId) => setRow(await acceptConstructionMaterialInspectionOffer(constructionMaterialInspectionNegotiationId, { negotiationId }))}
          onOpenCounterOffer={() => setShowCounterModal(true)}
          row={row}
          title="Construction Material Inspection Service Negotiation"
        />
      ) : null}

      {acceptedOffer ? (
        <ConstructionMaterialInspectionNegotiationPaymentPanels
          acceptedOffer={acceptedOffer}
          basicInfo={basicInfo}
          isBuyer={isBuyer}
          onOpenAdvanceProof={() => setProofModal({ open: true, type: 'advance' })}
          onOpenFinalProof={() => setProofModal({ open: true, type: 'final' })}
          row={row}
        />
      ) : null}

      {row.finalPaymentStatus === 'paid' ? <ConstructionMaterialInspectionPurchaseOrder basicInfo={basicInfo} reportBasePath="/user-dashboard/construction-material-inspection-report" row={row} /> : null}

      {showCounterModal ? (
        <div className="dashboard-modal-backdrop">
          <div className="dashboard-modal">
            <h2>Submit Counter Offer</h2>
            <p>Enter the revised labour charges and inspection schedule for the next round.</p>
            <div className="dashboard-form-grid mt-3">
              <div className="form-field"><label>Labour Charges</label><input onChange={(event) => setCounterOffer((current) => ({ ...current, labourCharges: event.target.value }))} type="number" value={counterOffer.labourCharges} /></div>
              <div className="form-field"><label>Inspection Date</label><DatePicker className="form-control" dateFormat="dd/MM/yyyy" minDate={new Date()} onChange={(value) => setCounterOffer((current) => ({ ...current, inspectionDate: value }))} selected={counterOffer.inspectionDate} /></div>
              <div><label>Inspection Time</label><TimePicker className="truck-time-picker" disableClock format="HH:mm a" onChange={(value) => setCounterOffer((current) => ({ ...current, inspectionTime: value || '09:00' }))} value={counterOffer.inspectionTime} /></div>
            </div>
            <div className="dashboard-form-actions mt-3">
              <button className="dashboard-secondary-btn" onClick={() => setShowCounterModal(false)} type="button">Cancel</button>
              <button className="dashboard-action-btn" disabled={!counterOffer.inspectionDate || !counterOffer.inspectionTime} onClick={async () => {
                setRow(await addConstructionMaterialInspectionCounterOffer(constructionMaterialInspectionNegotiationId, counterOffer));
                setCounterOffer({ labourCharges: '', inspectionDate: null, inspectionTime: '09:00' });
                setShowCounterModal(false);
              }} type="button">Submit</button>
            </div>
          </div>
        </div>
      ) : null}

      <PaymentProofModal
        onClose={() => setProofModal({ open: false, type: 'advance' })}
        onSubmit={async (images) => {
          const updated = proofModal.type === 'advance'
            ? await submitConstructionMaterialInspectionAdvanceProof(constructionMaterialInspectionNegotiationId, { advancePaymentScreenshots: images })
            : await submitConstructionMaterialInspectionFinalProof(constructionMaterialInspectionNegotiationId, { finalPaymentScreenshots: images });
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

export default UserConstructionMaterialInspectionNegotiationDetailPage;
