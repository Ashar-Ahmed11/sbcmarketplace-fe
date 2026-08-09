import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import PaymentProofModal from '../negotiations/PaymentProofModal';
import MachineryNegotiationConversation from '../machineryNegotiations/MachineryNegotiationConversation';
import MachineryNegotiationPaymentPanels from '../machineryNegotiations/MachineryNegotiationPaymentPanels';
import MachineryPurchaseOrder from '../machineryNegotiations/MachineryPurchaseOrder';
import { getAcceptedMachineryOffer } from '../machineryNegotiations/machineryNegotiationUtils';

function UserMachineryNegotiationDetailPage() {
  const { machineryNegotiationId } = useParams();
  const {
    acceptMachineryOffer,
    addMachineryCounterOffer,
    basicInfo,
    currentUser,
    fetchUser,
    getBasicInfo,
    getMachineryNegotiationById,
    submitMachineryAdvanceProof,
    submitMachineryFinalProof,
    uploadImage,
  } = useContext(AppContext);
  const [row, setRow] = useState(null);
  const [counterOffer, setCounterOffer] = useState({ machineryCost: '', deliveryCost: '' });
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [proofModal, setProofModal] = useState({ open: false, type: 'advance' });

  useEffect(() => {
    fetchUser();
    getBasicInfo();
    getMachineryNegotiationById(machineryNegotiationId).then(setRow);
  }, [fetchUser, getBasicInfo, getMachineryNegotiationById, machineryNegotiationId]);

  if (!row) return null;

  const acceptedOffer = getAcceptedMachineryOffer(row);
  const isBuyer = String(row?.buyer?._id) === String(currentUser?._id);

  return (
    <>
      {(!acceptedOffer || row.advanceStatus !== 'paid') ? (
        <MachineryNegotiationConversation
          currentUserId={currentUser?._id}
          onAccept={async (negotiationId) => setRow(await acceptMachineryOffer(machineryNegotiationId, { negotiationId }))}
          onOpenCounterOffer={() => setShowCounterModal(true)}
          row={row}
          title="Construction Machinery Negotiation"
        />
      ) : null}

      {acceptedOffer ? (
        <MachineryNegotiationPaymentPanels
          acceptedOffer={acceptedOffer}
          basicInfo={basicInfo}
          isBuyer={isBuyer}
          onOpenAdvanceProof={() => setProofModal({ open: true, type: 'advance' })}
          onOpenFinalProof={() => setProofModal({ open: true, type: 'final' })}
          row={row}
        />
      ) : null}

      {row.finalPaymentStatus === 'paid' ? <MachineryPurchaseOrder basicInfo={basicInfo} row={row} /> : null}

      {showCounterModal ? (
        <div className="dashboard-modal-backdrop">
          <div className="dashboard-modal">
            <h2>Submit Counter Offer</h2>
            <p>Enter the revised machinery and delivery amounts for the next round.</p>
            <div className="dashboard-form-grid mt-3">
              <div className="form-field">
                <label>Machinery Cost</label>
                <input onChange={(event) => setCounterOffer((current) => ({ ...current, machineryCost: event.target.value }))} type="number" value={counterOffer.machineryCost} />
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
                  setRow(await addMachineryCounterOffer(machineryNegotiationId, counterOffer));
                  setCounterOffer({ machineryCost: '', deliveryCost: '' });
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
            ? await submitMachineryAdvanceProof(machineryNegotiationId, { advancePaymentScreenshots: images })
            : await submitMachineryFinalProof(machineryNegotiationId, { finalPaymentScreenshots: images });
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

export default UserMachineryNegotiationDetailPage;
