import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import { getTruckInspectionOverallScore, truckInspectionReportSections } from '../truckInspectionReports/truckInspectionReportUtils';

function AdminTruckInspectionReportDetailPage() {
  const { truckInspectionReportId } = useParams();
  const { getTruckInspectionReportById, updateTruckInspectionReportStatus } = useContext(AppContext);
  const [row, setRow] = useState(null);

  useEffect(() => {
    getTruckInspectionReportById(truckInspectionReportId).then(setRow);
  }, [getTruckInspectionReportById, truckInspectionReportId]);

  if (!row) return null;

  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head">
        <div>
          <h1>Truck Inspection Report</h1>
          <p>{row.truckInspectionServiceNegotiation?.truck?.title || 'Inspection report'}</p>
        </div>
      </div>
      <div className="dashboard-form-grid mb-4">
        <div className="form-field">
          <label>Status</label>
          <select onChange={(event) => setRow((current) => ({ ...current, status: event.target.value }))} value={row.status}>
            <option value="pending approval">Pending Approval</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="form-field">
          <label>Rejection Reason</label>
          <input onChange={(event) => setRow((current) => ({ ...current, rejectionReason: event.target.value }))} type="text" value={row.rejectionReason || ''} />
        </div>
      </div>
      <div className="truck-purchase-order__meta mb-4">
        <span>Inspection Date: {row.inspectionDate ? new Date(row.inspectionDate).toLocaleDateString() : '—'}</span>
        <span>Overall Score: {getTruckInspectionOverallScore(row)}%</span>
      </div>
      <div className="row g-3">
        {truckInspectionReportSections.map(({ key, label }) => (
          <div className="col-12" key={key}>
            <div className="construction-negotiation-milestone-card">
              <div className="construction-negotiation-milestone-card__head">
                <div><h3>{label}</h3></div>
                <span className="status-badge approved">{Number(row?.[key]?.score) || 0}%</span>
              </div>
              <div className="upload-preview-grid">
                {(row?.[key]?.images || []).map((image, index) => (
                  <div className="upload-preview-card readonly" key={`${image.url}-${index}`}>
                    <img alt={label} src={image.url} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="dashboard-form-actions mt-4">
        <button className="dashboard-action-btn" onClick={async () => setRow(await updateTruckInspectionReportStatus(truckInspectionReportId, { status: row.status, rejectionReason: row.rejectionReason || '' }))} type="button">Update</button>
      </div>
    </section>
  );
}

export default AdminTruckInspectionReportDetailPage;
