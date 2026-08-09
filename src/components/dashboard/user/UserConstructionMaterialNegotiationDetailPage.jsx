import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import ConstructionMaterialNegotiationConversation from '../constructionMaterialNegotiations/ConstructionMaterialNegotiationConversation';
import ConstructionMaterialNegotiationPaymentPanels from '../constructionMaterialNegotiations/ConstructionMaterialNegotiationPaymentPanels';
import ConstructionMaterialPurchaseOrder from '../constructionMaterialNegotiations/ConstructionMaterialPurchaseOrder';
import { getAcceptedConstructionMaterialOffer } from '../constructionMaterialNegotiations/constructionMaterialNegotiationUtils';
import PaymentProofModal from '../negotiations/PaymentProofModal';

function UserConstructionMaterialNegotiationDetailPage() {
  const { materialNegotiationId } = useParams();
  const {
    acceptConstructionMaterialOffer,
    addConstructionMaterialCounterOffer,
    basicInfo,
    currentUser,
    fetchUser,
    getBasicInfo,
    getConstructionMaterialNegotiationById,
    submitConstructionMaterialAdvanceProof,
    submitConstructionMaterialFinalProof,
    uploadImage,
  } = useContext(AppContext);
  const [row, setRow] = useState(null);
  const [counterOffer, setCounterOffer] = useState({ constructionMaterialCost: '', deliveryCost: '' });
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [proofModal, setProofModal] = useState({ open: false, type: 'advance' });

  useEffect(() => {
    fetchUser();
    getBasicInfo();
    getConstructionMaterialNegotiationById(materialNegotiationId).then(setRow);
  }, [fetchUser, getBasicInfo, getConstructionMaterialNegotiationById, materialNegotiationId]);

  if (!row) return null;

  const acceptedOffer = getAcceptedConstructionMaterialOffer(row);
  const isBuyer = String(row?.buyer?._id) === String(currentUser?._id);

  return (
    <>
      {(!acceptedOffer || row.advanceStatus !== 'paid') ? (
        <ConstructionMaterialNegotiationConversation
          currentUserId={currentUser?._id}
          onAccept={async (negotiationId) => setRow(await acceptConstructionMaterialOffer(materialNegotiationId, { negotiationId }))}
          onOpenCounterOffer={() => setShowCounterModal(true)}
          row={row}
          title="Construction Material Negotiation"
        />
      ) : null}

      {acceptedOffer ? (
        <ConstructionMaterialNegotiationPaymentPanels
          acceptedOffer={acceptedOffer}
          basicInfo={basicInfo}
          isBuyer={isBuyer}
          onOpenAdvanceProof={() => setProofModal({ open: true, type: 'advance' })}
          onOpenFinalProof={() => setProofModal({ open: true, type: 'final' })}
          row={row}
        />
      ) : null}

      {row.finalPaymentStatus === 'paid' ? <ConstructionMaterialPurchaseOrder basicInfo={basicInfo} row={row} /> : null}

      {showCounterModal ? (
        <div className="dashboard-modal-backdrop">
          <div className="dashboard-modal">
            <h2>Submit Counter Offer</h2>
            <p>Enter the revised construction material and delivery amounts for the next round.</p>
            <div className="dashboard-form-grid mt-3">
              <div className="form-field">
                <label>Construction Material Cost</label>
                <input onChange={(event) => setCounterOffer((current) => ({ ...current, constructionMaterialCost: event.target.value }))} type="number" value={counterOffer.constructionMaterialCost} />
              </div>
              <div className="form-field">
                <label>Delivery Cost</label>
                <input onChange={(event) => setCounterOffer((current) => ({ ...current, deliveryCost: event.target.value }))} type="number" value={counterOffer.deliveryCost} />
              </div>
            </div>
            <div className="dashboard-form-actions mt-3">
              <button className="dashboard-secondary-btn" onClick={() => setShowCounterModal(false)} type="button">Cancel</button>
              <button
                className="dashboard-action-btn"
                onClick={async () => {
                  setRow(await addConstructionMaterialCounterOffer(materialNegotiationId, counterOffer));
                  setCounterOffer({ constructionMaterialCost: '', deliveryCost: '' });
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
            ? await submitConstructionMaterialAdvanceProof(materialNegotiationId, { advancePaymentScreenshots: images })
            : await submitConstructionMaterialFinalProof(materialNegotiationId, { finalPaymentScreenshots: images });
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

export default UserConstructionMaterialNegotiationDetailPage;
