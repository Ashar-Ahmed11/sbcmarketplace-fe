import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import PaymentProofModal from '../negotiations/PaymentProofModal';
import RepairServiceNegotiationConversation from '../repairServiceNegotiations/RepairServiceNegotiationConversation';
import RepairServiceNegotiationPaymentPanels from '../repairServiceNegotiations/RepairServiceNegotiationPaymentPanels';
import RepairServicePurchaseOrder from '../repairServiceNegotiations/RepairServicePurchaseOrder';
import { getAcceptedRepairServiceOffer } from '../repairServiceNegotiations/repairServiceNegotiationUtils';

function UserRepairServiceNegotiationDetailPage() {
  const { repairServiceNegotiationId } = useParams();
  const {
    acceptRepairServiceOffer,
    addRepairServiceCounterOffer,
    basicInfo,
    currentUser,
    fetchUser,
    getBasicInfo,
    getRepairServiceNegotiationById,
    submitRepairServiceAdvanceProof,
    submitRepairServiceFinalProof,
    uploadImage,
  } = useContext(AppContext);
  const [row, setRow] = useState(null);
  const [counterOffer, setCounterOffer] = useState({ labourCharges: '', partsResponsibility: 'buyer' });
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [proofModal, setProofModal] = useState({ open: false, type: 'advance' });

  useEffect(() => {
    fetchUser();
    getBasicInfo();
    getRepairServiceNegotiationById(repairServiceNegotiationId).then(setRow);
  }, [fetchUser, getBasicInfo, getRepairServiceNegotiationById, repairServiceNegotiationId]);

  if (!row) return null;

  const acceptedOffer = getAcceptedRepairServiceOffer(row);
  const isBuyer = String(row?.buyer?._id) === String(currentUser?._id);

  return (
    <>
      <section className="dashboard-section-card form-card-panel">
        <div className="dashboard-section-head">
          <div>
            <h1>Repair Service Negotiation</h1>
            <p>{row.repairService?.title || 'Repair service request'}</p>
          </div>
          <button className="dashboard-action-btn" data-bs-target="#repairFaultDetailsCollapse" data-bs-toggle="collapse" type="button">
            View Repair Fault Details
          </button>
        </div>

        <div className="collapse mt-3" id="repairFaultDetailsCollapse">
          <div className="truck-figma-details-stack">
            <section className="truck-figma-specs-card truck-figma-specs-card--compact">
              <div className="truck-figma-specs-table">
                <div className="truck-figma-specs-row full">
                  <div className="truck-figma-specs-cell">
                    <span>Fault Description</span>
                    <strong>{row.faultDescription || '—'}</strong>
                  </div>
                </div>
                <div className="truck-figma-specs-row alt">
                  <div className="truck-figma-specs-cell">
                    <span>Repair Mode</span>
                    <strong>{row.onSite ? 'On-Site' : 'Workshop'}</strong>
                  </div>
                  <div className="truck-figma-specs-cell">
                    <span>Buyer City</span>
                    <strong>{row.buyerCity || '—'}</strong>
                  </div>
                </div>
                <div className="truck-figma-specs-row">
                  <div className="truck-figma-specs-cell">
                    <span>Buyer Address</span>
                    <strong>{row.buyerAddress || '—'}</strong>
                  </div>
                  <div className="truck-figma-specs-cell">
                    <span>Parts Responsibility</span>
                    <strong>{row.negotiation?.[0]?.partsResponsibility || 'buyer'}</strong>
                  </div>
                </div>
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
          </div>
        </div>
      </section>

      {(!acceptedOffer || row.advanceStatus !== 'paid') ? (
        <RepairServiceNegotiationConversation
          currentUserId={currentUser?._id}
          onAccept={async (negotiationId) => setRow(await acceptRepairServiceOffer(repairServiceNegotiationId, { negotiationId }))}
          onOpenCounterOffer={() => setShowCounterModal(true)}
          row={row}
          title="Repair Service Negotiation"
        />
      ) : null}

      {acceptedOffer ? (
        <RepairServiceNegotiationPaymentPanels
          acceptedOffer={acceptedOffer}
          basicInfo={basicInfo}
          isBuyer={isBuyer}
          onOpenAdvanceProof={() => setProofModal({ open: true, type: 'advance' })}
          onOpenFinalProof={() => setProofModal({ open: true, type: 'final' })}
          row={row}
        />
      ) : null}

      {row.finalPaymentStatus === 'paid' ? <RepairServicePurchaseOrder basicInfo={basicInfo} row={row} /> : null}

      {showCounterModal ? (
        <div className="dashboard-modal-backdrop">
          <div className="dashboard-modal">
            <h2>Submit Counter Offer</h2>
            <p>Enter the revised labour charges and parts responsibility.</p>
            <div className="dashboard-form-grid mt-3">
              <div className="form-field">
                <label>Labour Charges</label>
                <input onChange={(event) => setCounterOffer((current) => ({ ...current, labourCharges: event.target.value }))} type="number" value={counterOffer.labourCharges} />
              </div>
              <div className="form-field">
                <label>Parts Responsibility</label>
                <select onChange={(event) => setCounterOffer((current) => ({ ...current, partsResponsibility: event.target.value }))} value={counterOffer.partsResponsibility}>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
            </div>
            <div className="dashboard-form-actions mt-3">
              <button className="dashboard-secondary-btn" onClick={() => setShowCounterModal(false)} type="button">Cancel</button>
              <button
                className="dashboard-action-btn"
                onClick={async () => {
                  setRow(await addRepairServiceCounterOffer(repairServiceNegotiationId, counterOffer));
                  setCounterOffer({ labourCharges: '', partsResponsibility: 'buyer' });
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
            ? await submitRepairServiceAdvanceProof(repairServiceNegotiationId, { advancePaymentScreenshots: images })
            : await submitRepairServiceFinalProof(repairServiceNegotiationId, { finalPaymentScreenshots: images });
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

export default UserRepairServiceNegotiationDetailPage;
