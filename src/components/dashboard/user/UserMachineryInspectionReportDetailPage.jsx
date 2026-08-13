import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import { getMachineryInspectionOverallScore, machineryInspectionReportSections } from '../machineryInspectionReports/machineryInspectionReportUtils';
import MachineryInspectionReportPreview from '../machineryInspectionReports/MachineryInspectionReportPreview';

function UserMachineryInspectionReportDetailPage() {
  const { machineryInspectionReportId } = useParams();
  const { currentUser, fetchUser, getMachineryInspectionReportById } = useContext(AppContext);
  const [row, setRow] = useState(null);

  useEffect(() => {
    fetchUser();
    getMachineryInspectionReportById(machineryInspectionReportId).then(setRow);
  }, [fetchUser, getMachineryInspectionReportById, machineryInspectionReportId]);

  if (!row) return null;
  const canView = String(currentUser?._id) === String(row.inspectionRequester?._id) || String(currentUser?._id) === String(row.inspector?._id);
  if (!canView) return null;

  return (
    <>
      <section className="dashboard-section-card form-card-panel">
        <div className="dashboard-section-head">
          <div>
            <h1>Machinery Inspection Report</h1>
            <p>{row.machineryInspectionNegotiation?.constructionMachinery?.title || 'Inspection report'}</p>
          </div>
          <span className={`status-badge ${String(row.status || '').replace(/\s+/g, '-')}`}>{row.status}</span>
        </div>

        <div className="truck-purchase-order__meta mb-4">
          <span>Inspection Date: {row.inspectionDate ? new Date(row.inspectionDate).toLocaleDateString() : '—'}</span>
          <span>Overall Score: {getMachineryInspectionOverallScore(row)}%</span>
        </div>

        <div className="dashboard-form-actions mb-3">
          <button className="dashboard-action-btn" data-bs-target="#userMachineryInspectionReportDetailsCollapse" data-bs-toggle="collapse" type="button">View Details</button>
        </div>

        <div className="collapse mt-3" id="userMachineryInspectionReportDetailsCollapse">
          <div className="row g-3">
            {machineryInspectionReportSections.map(({ key, label }) => (
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
        </div>
      </section>

      <MachineryInspectionReportPreview
        form={row}
        overallScore={getMachineryInspectionOverallScore(row)}
        selectedNegotiation={row.machineryInspectionNegotiation}
      />
    </>
  );
}

export default UserMachineryInspectionReportDetailPage;
