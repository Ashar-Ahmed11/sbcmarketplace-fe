import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import PaymentProofModal from '../negotiations/PaymentProofModal';
import SparePartNegotiationConversation from '../sparePartNegotiations/SparePartNegotiationConversation';
import SparePartNegotiationPaymentPanels from '../sparePartNegotiations/SparePartNegotiationPaymentPanels';
import SparePartPurchaseOrder from '../sparePartNegotiations/SparePartPurchaseOrder';
import { getAcceptedSparePartOffer } from '../sparePartNegotiations/sparePartNegotiationUtils';

function UserSparePartNegotiationDetailPage() {
  const { sparePartNegotiationId } = useParams();
  const {
    acceptSparePartOffer,
    addSparePartCounterOffer,
    basicInfo,
    currentUser,
    fetchUser,
    getBasicInfo,
    getSparePartNegotiationById,
    submitSparePartAdvanceProof,
    submitSparePartFinalProof,
    uploadImage,
  } = useContext(AppContext);
  const [row, setRow] = useState(null);
  const [counterOffer, setCounterOffer] = useState({ sparePartCost: '', deliveryCost: '' });
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [proofModal, setProofModal] = useState({ open: false, type: 'advance' });

  useEffect(() => {
    fetchUser();
    getBasicInfo();
    getSparePartNegotiationById(sparePartNegotiationId).then(setRow);
  }, [fetchUser, getBasicInfo, getSparePartNegotiationById, sparePartNegotiationId]);

  if (!row) return null;

  const acceptedOffer = getAcceptedSparePartOffer(row);
  const isBuyer = String(row?.buyer?._id) === String(currentUser?._id);

  return (
    <>
      {(!acceptedOffer || row.advanceStatus !== 'paid') ? (
        <SparePartNegotiationConversation
          currentUserId={currentUser?._id}
          onAccept={async (negotiationId) => setRow(await acceptSparePartOffer(sparePartNegotiationId, { negotiationId }))}
          onOpenCounterOffer={() => setShowCounterModal(true)}
          row={row}
          title="Spare Part Negotiation"
        />
      ) : null}

      {acceptedOffer ? (
        <SparePartNegotiationPaymentPanels
          acceptedOffer={acceptedOffer}
          basicInfo={basicInfo}
          isBuyer={isBuyer}
          onOpenAdvanceProof={() => setProofModal({ open: true, type: 'advance' })}
          onOpenFinalProof={() => setProofModal({ open: true, type: 'final' })}
          row={row}
        />
      ) : null}

      {row.finalPaymentStatus === 'paid' ? <SparePartPurchaseOrder basicInfo={basicInfo} row={row} /> : null}

      {showCounterModal ? (
        <div className="dashboard-modal-backdrop">
          <div className="dashboard-modal">
            <h2>Submit Counter Offer</h2>
            <p>Enter the revised spare part and delivery amounts for the next round.</p>
            <div className="dashboard-form-grid mt-3">
              <div className="form-field">
                <label>Spare Part Cost</label>
                <input onChange={(event) => setCounterOffer((current) => ({ ...current, sparePartCost: event.target.value }))} type="number" value={counterOffer.sparePartCost} />
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
                  setRow(await addSparePartCounterOffer(sparePartNegotiationId, counterOffer));
                  setCounterOffer({ sparePartCost: '', deliveryCost: '' });
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
            ? await submitSparePartAdvanceProof(sparePartNegotiationId, { advancePaymentScreenshots: images })
            : await submitSparePartFinalProof(sparePartNegotiationId, { finalPaymentScreenshots: images });
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

export default UserSparePartNegotiationDetailPage;
