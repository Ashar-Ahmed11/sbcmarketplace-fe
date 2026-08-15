import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import PaymentProofModal from '../negotiations/PaymentProofModal';
import { getAcceptedFinanceTruckOffer } from '../financeTruckNegotiations/financeTruckNegotiationUtils';

function UserTruckInstallmentPage() {
  const { financeTruckNegotiationId } = useParams();
  const {
    currentUser,
    fetchUser,
    getFinanceTruckNegotiationById,
    submitFinanceTruckInstallmentProof,
    uploadImage,
  } = useContext(AppContext);
  const [row, setRow] = useState(null);
  const [selectedInstallmentId, setSelectedInstallmentId] = useState('');

  useEffect(() => {
    fetchUser();
    getFinanceTruckNegotiationById(financeTruckNegotiationId).then(setRow);
  }, [fetchUser, financeTruckNegotiationId, getFinanceTruckNegotiationById]);

  const acceptedOffer = useMemo(() => getAcceptedFinanceTruckOffer(row), [row]);
  const installments = acceptedOffer?.installments || [];
  const isBuyer = String(row?.buyer?._id) === String(currentUser?._id);
  const selectedInstallment = installments.find((installment) => String(installment._id) === String(selectedInstallmentId));

  if (!row) return null;

  return (
    <>
      <section className="dashboard-section-card">
        <div className="dashboard-section-head"><div><h1>Truck Installments</h1><p>{row?.truck?.title || 'Accepted finance installments'}</p></div></div>
        <div className="dashboard-table-wrap" style={{ border: '1px solid #E4E7EC' }}>
          <table className="table dashboard-table">
            <thead><tr><th className="py-3">Amount</th><th className="py-3">Date</th><th className="py-3">Status</th><th className="py-3">Action</th></tr></thead>
            <tbody>
              {installments.length ? installments.map((installment) => (
                <tr key={installment._id}>
                  <td className="py-3">Rs. {Number(installment.amount || 0).toLocaleString()}</td>
                  <td className="py-3">{installment.date ? new Date(installment.date).toLocaleDateString() : '—'}</td>
                  <td className="py-3"><span className={`status-badge ${installment.status}`}>{installment.status}</span></td>
                  <td className="py-3">
                    {!isBuyer ? 'Buyer action required' : installment.status === 'paid'
                      ? 'Paid'
                      : <button className="dashboard-action-btn truck-installment-action-btn" onClick={() => setSelectedInstallmentId(installment._id)} type="button">Upload Payment Proof</button>}
                  </td>
                </tr>
              )) : <tr><td className="text-center py-4" colSpan="4">No installments found.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
      <PaymentProofModal
        existingImages={selectedInstallment?.installmentScreenshots || []}
        onClose={() => setSelectedInstallmentId('')}
        onSubmit={async (images) => {
          const updated = await submitFinanceTruckInstallmentProof(financeTruckNegotiationId, {
            installmentId: selectedInstallmentId,
            installmentScreenshots: images,
          });
          setRow(updated);
          setSelectedInstallmentId('');
        }}
        open={Boolean(selectedInstallmentId)}
        title="Upload Installment Payment Proof"
        uploadImage={uploadImage}
      />
    </>
  );
}

export default UserTruckInstallmentPage;
