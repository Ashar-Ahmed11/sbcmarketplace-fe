import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import PaymentProofModal from '../negotiations/PaymentProofModal';
import TruckInspectionNegotiationConversation from '../truckInspectionNegotiations/TruckInspectionNegotiationConversation';
import TruckInspectionNegotiationPaymentPanels from '../truckInspectionNegotiations/TruckInspectionNegotiationPaymentPanels';
import TruckInspectionServicePurchaseOrder from '../truckInspectionNegotiations/TruckInspectionServicePurchaseOrder';
import { getAcceptedTruckInspectionServiceOffer } from '../truckInspectionNegotiations/truckInspectionNegotiationUtils';

function UserTruckInspectionNegotiationDetailPage() {
  const { truckInspectionServiceNegotiationId } = useParams();
  const {
    acceptTruckInspectionServiceOffer,
    addTruckInspectionServiceCounterOffer,
    basicInfo,
    currentUser,
    fetchUser,
    getBasicInfo,
    getTruckInspectionServiceNegotiationById,
    submitTruckInspectionServiceAdvanceProof,
    submitTruckInspectionServiceFinalProof,
    uploadImage,
  } = useContext(AppContext);
  const [row, setRow] = useState(null);
  const [counterOffer, setCounterOffer] = useState({ labourCharges: '' });
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [proofModal, setProofModal] = useState({ open: false, type: 'advance' });

  useEffect(() => {
    fetchUser();
    getBasicInfo();
    getTruckInspectionServiceNegotiationById(truckInspectionServiceNegotiationId).then(setRow);
  }, [fetchUser, getBasicInfo, getTruckInspectionServiceNegotiationById, truckInspectionServiceNegotiationId]);

  if (!row) return null;

  const acceptedOffer = getAcceptedTruckInspectionServiceOffer(row);
  const isBuyer = String(row?.buyer?._id) === String(currentUser?._id);

  return (
    <>
      <section className="dashboard-section-card form-card-panel">
        <div className="dashboard-section-head">
          <div>
            <h1>Truck Inspection Negotiation</h1>
            <p>{row.inspectionService?.title || 'Truck inspection service request'}</p>
          </div>
        </div>
        <div className="truck-figma-details-stack">
          <section className="truck-figma-specs-card truck-figma-specs-card--compact">
            <div className="truck-figma-specs-table">
              <div className="truck-figma-specs-row">
                <div className="truck-figma-specs-cell">
                  <span>Selected Truck</span>
                  <strong>{row.truck?.title || '—'}</strong>
                </div>
                <div className="truck-figma-specs-cell">
                  <span>Inspection Mode</span>
                  <strong>{row.onSite ? 'On-Site' : 'Workshop'}</strong>
                </div>
              </div>
              <div className="truck-figma-specs-row alt">
                <div className="truck-figma-specs-cell">
                  <span>Buyer City</span>
                  <strong>{row.buyerCity || '—'}</strong>
                </div>
                <div className="truck-figma-specs-cell">
                  <span>Buyer Address</span>
                  <strong>{row.buyerAddress || '—'}</strong>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {(!acceptedOffer || row.advanceStatus !== 'paid') ? (
        <TruckInspectionNegotiationConversation
          currentUserId={currentUser?._id}
          onAccept={async (negotiationId) => setRow(await acceptTruckInspectionServiceOffer(truckInspectionServiceNegotiationId, { negotiationId }))}
          onOpenCounterOffer={() => setShowCounterModal(true)}
          row={row}
          title="Truck Inspection Service Negotiation"
        />
      ) : null}

      {acceptedOffer ? (
        <TruckInspectionNegotiationPaymentPanels
          acceptedOffer={acceptedOffer}
          basicInfo={basicInfo}
          isBuyer={isBuyer}
          onOpenAdvanceProof={() => setProofModal({ open: true, type: 'advance' })}
          onOpenFinalProof={() => setProofModal({ open: true, type: 'final' })}
          row={row}
        />
      ) : null}

      {row.finalPaymentStatus === 'paid' ? <TruckInspectionServicePurchaseOrder basicInfo={basicInfo} reportBasePath="/user-dashboard/truck-inspection-report" row={row} /> : null}

      {showCounterModal ? (
        <div className="dashboard-modal-backdrop">
          <div className="dashboard-modal">
            <h2>Submit Counter Offer</h2>
            <p>Enter the revised labour charges for the next round.</p>
            <div className="dashboard-form-grid mt-3">
              <div className="form-field">
                <label>Labour Charges</label>
                <input onChange={(event) => setCounterOffer((current) => ({ ...current, labourCharges: event.target.value }))} type="number" value={counterOffer.labourCharges} />
              </div>
            </div>
            <div className="dashboard-form-actions mt-3">
              <button className="dashboard-secondary-btn" onClick={() => setShowCounterModal(false)} type="button">Cancel</button>
              <button
                className="dashboard-action-btn"
                onClick={async () => {
                  setRow(await addTruckInspectionServiceCounterOffer(truckInspectionServiceNegotiationId, counterOffer));
                  setCounterOffer({ labourCharges: '' });
                  setShowCounterModal(false);
                }}
                type="button"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <PaymentProofModal
        onClose={() => setProofModal({ open: false, type: 'advance' })}
        onSubmit={async (images) => {
          const updated = proofModal.type === 'advance'
            ? await submitTruckInspectionServiceAdvanceProof(truckInspectionServiceNegotiationId, { advancePaymentScreenshots: images })
            : await submitTruckInspectionServiceFinalProof(truckInspectionServiceNegotiationId, { finalPaymentScreenshots: images });
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

export default UserTruckInspectionNegotiationDetailPage;
