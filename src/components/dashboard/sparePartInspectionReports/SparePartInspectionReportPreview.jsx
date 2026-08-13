import logo from '../../SBC LOGO.png';
import { sparePartInspectionReportSections } from './sparePartInspectionReportUtils';

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

function SparePartInspectionReportPreview({ form, overallScore, selectedNegotiation }) {
  const sparePart = selectedNegotiation?.sparePart;
  const sparePartImage = sparePart?.images?.[0]?.url || '';
  const inspectionId = selectedNegotiation?._id?.slice(-6)?.toUpperCase();
  const sparePartMeta = [
    ['Spare Part Title', sparePart?.title],
    ['Brand', sparePart?.brand],
    ['Category', sparePart?.category?.name],
    ['Condition', sparePart?.condition ? `${sparePart.condition.charAt(0).toUpperCase()}${sparePart.condition.slice(1)}` : ''],
    ['Location', sparePart?.location],
    ['Part Number', sparePart?.partNumber],
    ['Quantity', sparePart?.quantity],
    ['Seller', sparePart?.user?.fullName || sparePart?.user?.username],
  ].filter(([, value]) => value !== null && value !== undefined && value !== '' && value !== '—');

  if (!selectedNegotiation) {
    return (
      <section className="dashboard-section-card inspection-report-preview">
        <div className="inspection-report-preview__empty">
          <img alt="SBC Marketplace" src={logo} />
          <h2>Inspection Report Preview</h2>
          <p>Select a spare part inspection negotiation to generate a professional SBC report preview here.</p>
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
            <h1>Spare Part Inspection Report</h1>
            <p>Professional spare part condition summary tailored for SBC Marketplace review workflow.</p>
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
        <span>Report No: {inspectionId ? `SBC-SPIR-${inspectionId}` : '—'}</span>
        <span>Requester: {selectedNegotiation?.buyer?.fullName || selectedNegotiation?.buyer?.username || '—'}</span>
      </div>

      <div className="row g-4 inspection-report-preview__summary">
        <div className="col-lg-4">
          <div className="inspection-report-preview__truck-card">
            <div className="inspection-report-preview__truck-image">
              {sparePartImage ? <img alt={sparePart?.title || 'Spare Part'} src={sparePartImage} /> : <div className="inspection-report-preview__truck-placeholder"><i className="fa fa-cog" aria-hidden="true" /></div>}
            </div>
            <div className="inspection-report-preview__truck-copy">
              <span>Selected Spare Part</span>
              <h2>{sparePart?.title || 'Spare Part Listing'}</h2>
              <p>{sparePart?.description || 'Inspection summary prepared for the selected marketplace spare part listing.'}</p>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="inspection-report-preview__details-card">
            <div className="inspection-report-preview__section-head">
              <h3>Spare Part Details</h3>
              <span>Verified listing information</span>
            </div>
            <div className="row g-3">
              {sparePartMeta.map(([label, value]) => (
                <div className="col-md-6" key={label}>
                  <div className="inspection-report-preview__detail-item">
                    <span>{label}</span>
                    <strong>{valueOrDash(value)}</strong>
                  </div>
                </div>
              ))}
              <div className="col-md-6">
                <div className="inspection-report-preview__detail-item">
                  <span>Brand Verification</span>
                  <strong>{form?.brandVerification?.verified ? 'Verified' : 'Not Verified'}</strong>
                </div>
              </div>
              <div className="col-md-6">
                <div className="inspection-report-preview__detail-item">
                  <span>Packaging Available</span>
                  <strong>{form?.packagingCondition?.isPackagingAvailable ? 'Yes' : 'No'}</strong>
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
          {sparePartInspectionReportSections.map(({ key, label, iconClass }) => {
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

export default SparePartInspectionReportPreview;
