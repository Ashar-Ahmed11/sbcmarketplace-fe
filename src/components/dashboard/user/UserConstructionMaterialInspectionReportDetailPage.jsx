import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import {
  constructionMaterialInspectionReportSections,
  getConstructionMaterialInspectionOverallScore,
} from '../constructionMaterialInspectionReports/constructionMaterialInspectionReportUtils';
import ConstructionMaterialInspectionReportPreview from '../constructionMaterialInspectionReports/ConstructionMaterialInspectionReportPreview';

function UserConstructionMaterialInspectionReportDetailPage() {
  const { constructionMaterialInspectionReportId } = useParams();
  const { currentUser, fetchUser, getConstructionMaterialInspectionReportById } = useContext(AppContext);
  const [row, setRow] = useState(null);

  useEffect(() => {
    fetchUser();
    getConstructionMaterialInspectionReportById(constructionMaterialInspectionReportId).then(setRow);
  }, [constructionMaterialInspectionReportId, fetchUser, getConstructionMaterialInspectionReportById]);

  if (!row) return null;
  const canView = String(currentUser?._id) === String(row.inspectionRequester?._id) || String(currentUser?._id) === String(row.inspector?._id);
  if (!canView) return null;

  return (
    <>
      <section className="dashboard-section-card form-card-panel">
        <div className="dashboard-section-head">
          <div><h1>Construction Material Inspection Report</h1><p>{row.constructionMaterialInspectionNegotiation?.constructionMaterial?.title || 'Inspection report'}</p></div>
          <span className={`status-badge ${String(row.status || '').replace(/\s+/g, '-')}`}>{row.status}</span>
        </div>
        <div className="truck-purchase-order__meta mb-4">
          <span>Inspection Date: {row.inspectionDate ? new Date(row.inspectionDate).toLocaleDateString() : '—'}</span>
          <span>Overall Score: {getConstructionMaterialInspectionOverallScore(row)}%</span>
        </div>
        <div className="dashboard-form-actions mb-3">
          <button className="dashboard-action-btn" data-bs-target="#userConstructionMaterialInspectionReportDetailsCollapse" data-bs-toggle="collapse" type="button">View Details</button>
        </div>
        <div className="collapse mt-3" id="userConstructionMaterialInspectionReportDetailsCollapse">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="construction-negotiation-milestone-card"><div className="construction-negotiation-milestone-card__head"><div><h3>Quantity Verification</h3></div></div><p className="mb-0">{row?.quantityVerification?.verified ? 'Verified' : 'Not Verified'}</p></div>
            </div>
            <div className="col-md-6">
              <div className="construction-negotiation-milestone-card"><div className="construction-negotiation-milestone-card__head"><div><h3>Dates</h3></div></div><p className="mb-1">Manufacturing: {row.manufacturingDate ? new Date(row.manufacturingDate).toLocaleDateString() : '—'}</p><p className="mb-0">Expiry: {row.expiryDate ? new Date(row.expiryDate).toLocaleDateString() : '—'}</p></div>
            </div>
            {constructionMaterialInspectionReportSections.map(({ key, label }) => (
              <div className="col-12" key={key}>
                <div className="construction-negotiation-milestone-card">
                  <div className="construction-negotiation-milestone-card__head"><div><h3>{label}</h3></div><span className="status-badge approved">{Number(row?.[key]?.score) || 0}%</span></div>
                  <div className="upload-preview-grid">{(row?.[key]?.images || []).map((image, index) => <div className="upload-preview-card readonly" key={`${image.url}-${index}`}><img alt={label} src={image.url} /></div>)}</div>
                </div>
              </div>
            ))}
            <div className="col-12">
              <div className="construction-negotiation-milestone-card">
                <div className="construction-negotiation-milestone-card__head"><div><h3>Packaging Condition</h3></div><span className="status-badge approved">{Number(row?.packagingCondition?.score) || 0}%</span></div>
                <p className="mb-3">Packaging Available: {row?.packagingCondition?.isPackagingAvailable ? 'Yes' : 'No'}</p>
                <div className="upload-preview-grid">{(row?.packagingCondition?.images || []).map((image, index) => <div className="upload-preview-card readonly" key={`${image.url}-${index}`}><img alt="Packaging Condition" src={image.url} /></div>)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConstructionMaterialInspectionReportPreview form={row} overallScore={getConstructionMaterialInspectionOverallScore(row)} selectedNegotiation={row.constructionMaterialInspectionNegotiation} />
    </>
  );
}

export default UserConstructionMaterialInspectionReportDetailPage;
