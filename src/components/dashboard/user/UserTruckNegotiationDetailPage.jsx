import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import PaymentProofModal from '../negotiations/PaymentProofModal';
import TruckNegotiationConversation from '../negotiations/TruckNegotiationConversation';
import TruckNegotiationPaymentPanels from '../negotiations/TruckNegotiationPaymentPanels';
import TruckPurchaseOrder from '../negotiations/TruckPurchaseOrder';
import { getAcceptedOffer } from '../negotiations/truckNegotiationUtils';

function UserTruckNegotiationDetailPage() {
  const { truckNegotiationId } = useParams();
  const {
    acceptTruckOffer,
    addTruckCounterOffer,
    basicInfo,
    currentUser,
    fetchUser,
    getBasicInfo,
    getTruckNegotiationById,
    submitAdvanceProof,
    submitFinalProof,
    uploadImage,
  } = useContext(AppContext);
  const [row, setRow] = useState(null);
  const [counterOffer, setCounterOffer] = useState({ truckCost: '', deliveryCost: '' });
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [proofModal, setProofModal] = useState({ open: false, type: 'advance' });

  useEffect(() => {
    fetchUser();
    getBasicInfo();
    getTruckNegotiationById(truckNegotiationId).then(setRow);
  }, [fetchUser, getBasicInfo, getTruckNegotiationById, truckNegotiationId]);

  if (!row) return null;

  const acceptedOffer = getAcceptedOffer(row);
  const isBuyer = String(row?.buyer?._id) === String(currentUser?._id);

  return (
    <>
      {(!acceptedOffer || row.advanceStatus !== 'paid') ? (
        <TruckNegotiationConversation
          currentUserId={currentUser?._id}
          onAccept={async (negotiationId) => setRow(await acceptTruckOffer(truckNegotiationId, { negotiationId }))}
          onOpenCounterOffer={() => setShowCounterModal(true)}
          row={row}
        />
      ) : null}

      {acceptedOffer ? (
        <TruckNegotiationPaymentPanels
          acceptedOffer={acceptedOffer}
          basicInfo={basicInfo}
          isBuyer={isBuyer}
          onOpenAdvanceProof={() => setProofModal({ open: true, type: 'advance' })}
          onOpenFinalProof={() => setProofModal({ open: true, type: 'final' })}
          row={row}
        />
      ) : null}

      {row.finalPaymentStatus === 'paid' ? <TruckPurchaseOrder basicInfo={basicInfo} row={row} /> : null}

      {showCounterModal ? (
        <div className="dashboard-modal-backdrop">
          <div className="dashboard-modal">
            <h2>Submit Counter Offer</h2>
            <p>Enter the revised truck and delivery amounts for the next round.</p>
            <div className="dashboard-form-grid mt-3">
              <div className="form-field">
                <label>Truck Cost</label>
                <input onChange={(event) => setCounterOffer((current) => ({ ...current, truckCost: event.target.value }))} type="number" value={counterOffer.truckCost} />
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
                  setRow(await addTruckCounterOffer(truckNegotiationId, counterOffer));
                  setCounterOffer({ truckCost: '', deliveryCost: '' });
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
            ? await submitAdvanceProof(truckNegotiationId, { advancePaymentScreenshots: images })
            : await submitFinalProof(truckNegotiationId, { finalPaymentScreenshots: images });
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

export default UserTruckNegotiationDetailPage;
