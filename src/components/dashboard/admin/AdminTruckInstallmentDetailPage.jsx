import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import { getAcceptedFinanceTruckOffer } from '../financeTruckNegotiations/financeTruckNegotiationUtils';

function AdminTruckInstallmentDetailPage() {
  const { financeTruckNegotiationId } = useParams();
  const { getFinanceTruckNegotiationById, updateFinanceTruckInstallmentStatus } = useContext(AppContext);
  const [row, setRow] = useState(null);

  useEffect(() => {
    getFinanceTruckNegotiationById(financeTruckNegotiationId).then(setRow);
  }, [financeTruckNegotiationId, getFinanceTruckNegotiationById]);

  const acceptedOffer = useMemo(() => getAcceptedFinanceTruckOffer(row), [row]);
  const installments = acceptedOffer?.installments || [];

  if (!row) return null;

  return (
    <section className="dashboard-section-card truck-negotiation-payment">
      <div className="dashboard-section-head">
        <div>
          <h1>Truck Installment Detail</h1>
          <p>{row?.truck?.title || 'Installment records'}</p>
        </div>
      </div>

      {installments.length ? (
        installments.map((installment, index) => (
          <div className="truck-negotiation-payment__card mb-3" key={installment._id || index}>
            <h2>Installment {index + 1}</h2>
            <div className="truck-negotiation-payment__row">
              <span>Amount</span>
              <strong>Rs. {Number(installment.amount || 0).toLocaleString()}</strong>
            </div>
            <div className="truck-negotiation-payment__row">
              <span>Date</span>
              <strong>{installment.date ? new Date(installment.date).toLocaleDateString() : '—'}</strong>
            </div>
            <div className="truck-negotiation-payment__row">
              <span>Current Status</span>
              <strong>
                <span className={`status-badge ${installment.status}`}>{installment.status}</span>
              </strong>
            </div>

            <div className="dashboard-form-grid mt-3">
              <div className="form-field">
                <label>Payment Status</label>
                <select
                  onChange={async (event) => setRow(await updateFinanceTruckInstallmentStatus(financeTruckNegotiationId, {
                    installmentId: installment._id,
                    status: event.target.value,
                  }))}
                  value={installment.status}
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="pendingApproval">Pending Approval</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <h3>Payment Proof</h3>
              {installment.installmentScreenshots?.length ? (
                <div className="upload-preview-grid">
                  {installment.installmentScreenshots.map((image, proofIndex) => (
                    <div className="upload-preview-card readonly" key={`${image.url}-${proofIndex}`}>
                      <img alt={`Installment ${index + 1} payment proof`} src={image.url} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mb-0 text-muted">No proof uploaded.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="truck-negotiation-payment__card">
          <p className="mb-0 text-muted">No installments found.</p>
        </div>
      )}
    </section>
  );
}

export default AdminTruckInstallmentDetailPage;
