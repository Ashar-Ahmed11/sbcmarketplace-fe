import logo from '../../SBC LOGO.png';
import { constructionMaterialInspectionReportSections } from './constructionMaterialInspectionReportUtils';

function valueOrDash(value) {
  if (value === null || value === undefined || value === '') return '—';
  return value;
}

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString();
}

function getScoreTone(score) {
  const numeric = Number(score) || 0;
  if (numeric >= 80) return 'excellent';
  if (numeric >= 60) return 'good';
  if (numeric >= 40) return 'fair';
  return 'low';
}

function ConstructionMaterialInspectionReportPreview({ form, overallScore, selectedNegotiation }) {
  const material = selectedNegotiation?.constructionMaterial;
  const materialImage = material?.images?.[0]?.url || '';
  const inspectionId = selectedNegotiation?._id?.slice(-6)?.toUpperCase();
  const materialMeta = [
    ['Material Title', material?.title],
    ['Brand', material?.brand],
    ['Category', material?.category?.name],
    ['Grade', material?.grade],
    ['Quantity', material?.quantity ? `${material.quantity} ${material?.unit || ''}`.trim() : ''],
    ['Location', material?.location],
    ['Seller Type', material?.sellerType],
    ['Seller', material?.user?.fullName || material?.user?.username],
  ].filter(([, value]) => value !== null && value !== undefined && value !== '' && value !== '—');

  if (!selectedNegotiation) {
    return (
      <section className="dashboard-section-card inspection-report-preview">
        <div className="inspection-report-preview__empty">
          <img alt="SBC Marketplace" src={logo} />
          <h2>Inspection Report Preview</h2>
          <p>Select a construction material inspection negotiation to generate a professional SBC report preview here.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-section-card inspection-report-preview">
      <div className="inspection-report-preview__topbar" />
      <div className="inspection-report-preview__header">
        <div className="inspection-report-preview__brand">
          <img alt="SBC Marketplace" src={logo} />
          <div>
            <span>Pakistan’s Construction Network</span>
            <h1>Construction Material Inspection Report</h1>
            <p>Professional material quality summary tailored for SBC Marketplace review workflow.</p>
          </div>
        </div>
        <div className="inspection-report-preview__scorebox">
          <small>Overall Score</small>
          <strong>{overallScore}%</strong>
          <span>{overallScore >= 80 ? 'Excellent' : overallScore >= 60 ? 'Good' : overallScore >= 40 ? 'Fair' : 'Needs Attention'}</span>
        </div>
      </div>

      <div className="inspection-report-preview__meta">
        <span>Inspection Date: {formatDate(form?.inspectionDate)}</span>
        <span>Report No: {inspectionId ? `SBC-CMIR-${inspectionId}` : '—'}</span>
        <span>Requester: {selectedNegotiation?.buyer?.fullName || selectedNegotiation?.buyer?.username || '—'}</span>
      </div>

      <div className="row g-4 inspection-report-preview__summary">
        <div className="col-lg-4">
          <div className="inspection-report-preview__truck-card">
            <div className="inspection-report-preview__truck-image">
              {materialImage ? <img alt={material?.title || 'Construction Material'} src={materialImage} /> : <div className="inspection-report-preview__truck-placeholder"><i className="fa fa-cubes" aria-hidden="true" /></div>}
            </div>
            <div className="inspection-report-preview__truck-copy">
              <span>Selected Material</span>
              <h2>{material?.title || 'Construction Material Listing'}</h2>
              <p>{material?.description || 'Inspection summary prepared for the selected marketplace construction material listing.'}</p>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="inspection-report-preview__details-card">
            <div className="inspection-report-preview__section-head">
              <h3>Material Details</h3>
              <span>Verified listing information</span>
            </div>
            <div className="row g-3">
              {materialMeta.map(([label, value]) => (
                <div className="col-md-6" key={label}>
                  <div className="inspection-report-preview__detail-item">
                    <span>{label}</span>
                    <strong>{valueOrDash(value)}</strong>
                  </div>
                </div>
              ))}
              <div className="col-md-6">
                <div className="inspection-report-preview__detail-item">
                  <span>Quantity Verification</span>
                  <strong>{form?.quantityVerification?.verified ? 'Verified' : 'Not Verified'}</strong>
                </div>
              </div>
              <div className="col-md-6">
                <div className="inspection-report-preview__detail-item">
                  <span>Packaging Available</span>
                  <strong>{form?.packagingCondition?.isPackagingAvailable ? 'Yes' : 'No'}</strong>
                </div>
              </div>
              <div className="col-md-6">
                <div className="inspection-report-preview__detail-item">
                  <span>Manufacturing Date</span>
                  <strong>{formatDate(form?.manufacturingDate)}</strong>
                </div>
              </div>
              <div className="col-md-6">
                <div className="inspection-report-preview__detail-item">
                  <span>Expiry Date</span>
                  <strong>{formatDate(form?.expiryDate)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3">
        <div className="inspection-report-preview__section-head mt-4">
          <h3>Inspection Scores</h3>
          <span>Condition ratings by component</span>
        </div>
        <div className="row g-3">
          {constructionMaterialInspectionReportSections.map(({ key, label, iconClass }) => {
            const score = Number(form?.[key]?.score) || 0;
            const tone = getScoreTone(score);
            return (
              <div className="col-xl-4 col-md-6" key={key}>
                <div className={`inspection-report-preview__score-card inspection-report-preview__score-card--${tone}`}>
                  <div className="inspection-report-preview__score-head">
                    <div className="inspection-report-preview__score-icon">
                      <i aria-hidden="true" className={iconClass} />
                    </div>
                    <div>
                      <h4>{label}</h4>
                      <span>Component assessment</span>
                    </div>
                  </div>
                  <div className="inspection-report-preview__score-value"><strong>{score}%</strong></div>
                  <div className="inspection-report-preview__score-track"><span style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }} /></div>
                </div>
              </div>
            );
          })}
          <div className="col-xl-4 col-md-6">
            <div className={`inspection-report-preview__score-card inspection-report-preview__score-card--${getScoreTone(form?.packagingCondition?.score)}`}>
              <div className="inspection-report-preview__score-head">
                <div className="inspection-report-preview__score-icon"><i aria-hidden="true" className="fa fa-dropbox" /></div>
                <div><h4>Packaging Condition</h4><span>Packaging assessment</span></div>
              </div>
              <div className="inspection-report-preview__score-value"><strong>{Number(form?.packagingCondition?.score) || 0}%</strong></div>
              <div className="inspection-report-preview__score-track"><span style={{ width: `${Math.min(Math.max(Number(form?.packagingCondition?.score) || 0, 0), 100)}%` }} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConstructionMaterialInspectionReportPreview;
