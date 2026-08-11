import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import PaymentProofModal from '../negotiations/PaymentProofModal';
import ConstructionServiceNegotiationConversation from '../constructionServiceNegotiations/ConstructionServiceNegotiationConversation';
import ConstructionServiceNegotiationPaymentPanels from '../constructionServiceNegotiations/ConstructionServiceNegotiationPaymentPanels';
import ConstructionServicePurchaseOrder from '../constructionServiceNegotiations/ConstructionServicePurchaseOrder';
import { getAcceptedConstructionServiceOffer } from '../constructionServiceNegotiations/constructionServiceNegotiationUtils';

const DEFAULT_COUNTER_OFFER = {
  labourCharges: '',
  duration: { fromDate: '', toDate: '' },
  milestones: [],
};

function UserConstructionServiceNegotiationDetailPage() {
  const { constructionServiceNegotiationId } = useParams();
  const {
    acceptConstructionServiceOffer,
    addConstructionServiceCounterOffer,
    basicInfo,
    currentUser,
    fetchUser,
    getBasicInfo,
    getConstructionServiceNegotiationById,
    submitConstructionServiceAdvanceProof,
    submitConstructionServiceFinalProof,
    updateConstructionServiceMilestone,
    uploadImage,
  } = useContext(AppContext);
  const [row, setRow] = useState(null);
  const [counterOffer, setCounterOffer] = useState(DEFAULT_COUNTER_OFFER);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [proofModal, setProofModal] = useState({ open: false, type: 'advance' });
  const [milestoneModal, setMilestoneModal] = useState({ open: false, milestone: null, isCompleted: 'no' });

  useEffect(() => {
    fetchUser();
    getBasicInfo();
    getConstructionServiceNegotiationById(constructionServiceNegotiationId).then(setRow);
  }, [fetchUser, getBasicInfo, getConstructionServiceNegotiationById, constructionServiceNegotiationId]);

  if (!row) return null;

  const acceptedOffer = getAcceptedConstructionServiceOffer(row);

  return (
    <>
      <section className="dashboard-section-card form-card-panel">
        <div className="dashboard-section-head">
          <div>
            <h1>Construction Service Requirement</h1>
            <p>{row.constructionService?.title || 'Construction service request'}</p>
          </div>
          <button
            className="dashboard-action-btn"
            data-bs-target="#userConstructionServiceRequirementCollapse"
            data-bs-toggle="collapse"
            type="button"
          >
            View Details
          </button>
        </div>
        <div className="truck-figma-details-stack collapse show" id="userConstructionServiceRequirementCollapse">
          <section className="truck-figma-specs-card truck-figma-specs-card--compact">
            <div className="truck-figma-specs-table">
              <div className="truck-figma-specs-row full">
                <div className="truck-figma-specs-cell">
                  <span>Construction Service Description</span>
                  <strong>{row.constructionServiceDescription || '—'}</strong>
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
        <ConstructionServiceNegotiationConversation
          currentUserId={currentUser?._id}
          onAccept={async (negotiationId) => setRow(await acceptConstructionServiceOffer(constructionServiceNegotiationId, { negotiationId }))}
          onOpenCounterOffer={() => setShowCounterModal(true)}
          row={row}
          title="Construction Service Negotiation"
        />
      ) : null}

      {acceptedOffer ? (
        <ConstructionServiceNegotiationPaymentPanels
          acceptedOffer={acceptedOffer}
          basicInfo={basicInfo}
          currentUserId={currentUser?._id}
          onOpenAdvanceProof={() => setProofModal({ open: true, type: 'advance' })}
          onOpenFinalProof={() => setProofModal({ open: true, type: 'final' })}
          onUpdateMilestone={(milestone) => setMilestoneModal({ open: true, milestone, isCompleted: milestone.isCompleted ? 'yes' : 'no' })}
          row={row}
        />
      ) : null}

      {row.finalPaymentStatus === 'paid' ? <ConstructionServicePurchaseOrder basicInfo={basicInfo} row={row} /> : null}

      {showCounterModal ? (
        <>
          <div className="modal-backdrop fade show rental-negotiation-modal-backdrop" />
          <div
            aria-hidden="false"
            aria-labelledby="constructionServiceCounterOfferModalLabel"
            className="modal fade show d-block"
            role="dialog"
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable rental-negotiation-modal" role="document">
              <div className="modal-content rental-negotiation-modal__content">
                <div className="modal-header rental-negotiation-modal__header">
                  <div>
                    <h2 className="modal-title" id="constructionServiceCounterOfferModalLabel">Submit Counter Offer</h2>
                    <p className="mb-0">Enter the revised labour charges, duration, and milestone plan.</p>
                  </div>
                  <button aria-label="Close" className="btn-close" onClick={() => setShowCounterModal(false)} type="button" />
                </div>
                <div className="modal-body rental-negotiation-modal__body">
                  <div className="row g-3">
                    <div className="form-field col-12">
                      <label>Labour Charges</label>
                      <input onChange={(event) => setCounterOffer((current) => ({ ...current, labourCharges: event.target.value }))} type="number" value={counterOffer.labourCharges} />
                    </div>
                    <div className="form-field col-md-6 col-12">
                      <label>From Date</label>
                      <input onChange={(event) => setCounterOffer((current) => ({ ...current, duration: { ...current.duration, fromDate: event.target.value } }))} type="date" value={counterOffer.duration.fromDate} />
                    </div>
                    <div className="form-field col-md-6 col-12">
                      <label>To Date</label>
                      <input onChange={(event) => setCounterOffer((current) => ({ ...current, duration: { ...current.duration, toDate: event.target.value } }))} type="date" value={counterOffer.duration.toDate} />
                    </div>
                  </div>

                  <div className="dashboard-upload-head mt-4">
                    <div><h2>Milestones</h2></div>
                    <div className="dashboard-upload-actions">
                      <button className="dashboard-secondary-btn" onClick={() => setCounterOffer((current) => ({ ...current, milestones: [...current.milestones, { dueDate: '', charges: '' }] }))} type="button">Add Milestone</button>
                    </div>
                  </div>

                  <div className="row g-3 mt-1">
                    {counterOffer.milestones.map((milestone, index) => (
                      <div className="col-12" key={`milestone-${index}`}>
                        <div className="construction-negotiation-milestone-card">
                          <div className="construction-negotiation-milestone-card__head">
                            <div>
                              <span className="construction-negotiation-milestone-card__number">Milestone {index + 1}</span>
                              <h3>Payment Milestone</h3>
                            </div>
                            <button
                              className="dashboard-secondary-btn construction-negotiation-milestone-card__remove"
                              onClick={() => setCounterOffer((current) => ({ ...current, milestones: current.milestones.filter((_, itemIndex) => itemIndex !== index) }))}
                              type="button"
                            >
                              ×
                            </button>
                          </div>

                          <div className="row g-3">
                            <div className="form-field col-md-6 col-12">
                              <label>Due Date</label>
                              <input onChange={(event) => setCounterOffer((current) => ({ ...current, milestones: current.milestones.map((item, itemIndex) => (itemIndex === index ? { ...item, dueDate: event.target.value } : item)) }))} type="date" value={milestone.dueDate} />
                            </div>
                            <div className="form-field col-md-6 col-12">
                              <label>Charges</label>
                              <input onChange={(event) => setCounterOffer((current) => ({ ...current, milestones: current.milestones.map((item, itemIndex) => (itemIndex === index ? { ...item, charges: event.target.value } : item)) }))} type="number" value={milestone.charges} />
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
                      setRow(await addConstructionServiceCounterOffer(constructionServiceNegotiationId, counterOffer));
                      setCounterOffer(DEFAULT_COUNTER_OFFER);
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

      {milestoneModal.open ? (
        <div className="dashboard-modal-backdrop">
          <div className="dashboard-modal">
            <h2>Update Milestone</h2>
            <div className="form-field mt-3">
              <label>Completed</label>
              <select onChange={(event) => setMilestoneModal((current) => ({ ...current, isCompleted: event.target.value }))} value={milestoneModal.isCompleted}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div className="dashboard-form-actions mt-3">
              <button className="dashboard-secondary-btn" onClick={() => setMilestoneModal({ open: false, milestone: null, isCompleted: 'no' })} type="button">Cancel</button>
              <button
                className="dashboard-action-btn"
                onClick={async () => {
                  setRow(await updateConstructionServiceMilestone(constructionServiceNegotiationId, {
                    milestoneId: milestoneModal.milestone?._id,
                    isCompleted: milestoneModal.isCompleted === 'yes',
                  }));
                  setMilestoneModal({ open: false, milestone: null, isCompleted: 'no' });
                }}
                type="button"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <PaymentProofModal
        onClose={() => setProofModal({ open: false, type: 'advance' })}
        onSubmit={async (images) => {
          const updated = proofModal.type === 'advance'
            ? await submitConstructionServiceAdvanceProof(constructionServiceNegotiationId, { advancePaymentScreenshots: images })
            : await submitConstructionServiceFinalProof(constructionServiceNegotiationId, { finalPaymentScreenshots: images });
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

export default UserConstructionServiceNegotiationDetailPage;
