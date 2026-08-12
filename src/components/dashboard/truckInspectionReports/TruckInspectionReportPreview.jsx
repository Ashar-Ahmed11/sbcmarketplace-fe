import logo from "../../SBC LOGO.png";
import { truckInspectionReportSections } from "./truckInspectionReportUtils";

function valueOrDash(value) {
  if (value === null || value === undefined || value === "") return "—";
  return value;
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString();
}

function formatBoolean(value, yesLabel = "Yes", noLabel = "No") {
  if (value === null || value === undefined) return "—";
  return value ? yesLabel : noLabel;
}

function getScoreTone(score) {
  const numeric = Number(score) || 0;
  if (numeric >= 80) return "excellent";
  if (numeric >= 60) return "good";
  if (numeric >= 40) return "fair";
  return "low";
}

function TruckInspectionReportPreview({
  form,
  overallScore,
  selectedNegotiation,
}) {
  const truck = selectedNegotiation?.truck;
  const truckImage = truck?.images?.[0]?.url || "";
  const inspectionId = selectedNegotiation?._id?.slice(-6)?.toUpperCase();
  const truckMeta = [
    ["Truck Title", truck?.title],
    ["Brand", truck?.brand],
    ["Category", truck?.category?.name],
    [
      "Condition",
      truck?.condition
        ? `${truck.condition.charAt(0).toUpperCase()}${truck.condition.slice(1)}`
        : "",
    ],
    ["Location", truck?.location],
    ["Mileage", truck?.usage?.mileage],
    ["Original Documents", formatBoolean(truck?.originalDocuments, "Available", "Not Available")],
    ["Seller", truck?.user?.fullName || truck?.user?.username],
  ].filter(
    ([, value]) =>
      value !== null && value !== undefined && value !== "" && value !== "—",
  );

  if (!selectedNegotiation) {
    return (
      <section className="dashboard-section-card inspection-report-preview">
        <div className="inspection-report-preview__empty">
          <img alt="SBC Marketplace" src={logo} />
          <h2>Inspection Report Preview</h2>
          <p>
            Select a truck inspection negotiation to generate a professional SBC
            report preview here.
          </p>
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
            <h1>Truck Inspection Report</h1>
            <p>
              Professional equipment condition summary tailored for SBC
              Marketplace review workflow.
            </p>
          </div>
        </div>

        <div className="inspection-report-preview__scorebox">
          <small>Overall Score</small>
          <strong>{overallScore}%</strong>
          <span>
            {overallScore >= 80
              ? "Excellent"
              : overallScore >= 60
                ? "Good"
                : overallScore >= 40
                  ? "Fair"
                  : "Needs Attention"}
          </span>
        </div>
      </div>

      <div className="inspection-report-preview__meta">
        <span>Inspection Date: {formatDate(form?.inspectionDate)}</span>
        <span>Report No: {inspectionId ? `SBC-IR-${inspectionId}` : "—"}</span>
        <span>
          Requester:{" "}
          {selectedNegotiation?.buyer?.fullName ||
            selectedNegotiation?.buyer?.username ||
            "—"}
        </span>
      </div>

      <div className="row g-4 inspection-report-preview__summary">
        <div className="col-lg-4">
          <div className="inspection-report-preview__truck-card">
            <div className="inspection-report-preview__truck-image">
              {truckImage ? (
                <img alt={truck?.title || "Truck"} src={truckImage} />
              ) : (
                <div className="inspection-report-preview__truck-placeholder">
                  <i className="fa fa-truck" aria-hidden="true" />
                </div>
              )}
            </div>
            <div className="inspection-report-preview__truck-copy">
              <span>Selected Truck</span>
              <h2>{truck?.title || "Truck Listing"}</h2>
              <p>
                {truck?.description ||
                  "Inspection summary prepared for the selected marketplace listing."}
              </p>
              <div className="inspection-report-preview__truck-highlights">
                <span>{truck?.brand || "—"}</span>
                <span>
                  {truck?.condition
                    ? `${truck.condition.charAt(0).toUpperCase()}${truck.condition.slice(1)}`
                    : "—"}
                </span>
                <span>{truck?.location || "—"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="inspection-report-preview__details-card">
            <div className="inspection-report-preview__section-head">
              <h3>Truck Details</h3>
              <span>Verified listing information</span>
            </div>
            <div className="row g-3">
              {truckMeta.length ? (
                truckMeta.map(([label, value]) => (
                  <div className="col-md-6" key={label}>
                    <div className="inspection-report-preview__detail-item">
                      <span>{label}</span>
                      <strong>{valueOrDash(value)}</strong>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div className="inspection-report-preview__detail-item">
                    <span>Truck Details</span>
                    <strong>
                      Truck information will appear here after selection.
                    </strong>
                  </div>
                </div>
              )}
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
          {truckInspectionReportSections.map(({ key, label, iconClass }) => {
            const score = Number(form?.[key]?.score) || 0;
            const tone = getScoreTone(score);

            return (
              <div className="col-xl-4 col-md-6" key={key}>
                <div
                  className={`inspection-report-preview__score-card inspection-report-preview__score-card--${tone}`}
                >
                  <div className="inspection-report-preview__score-head">
                    <div className="inspection-report-preview__score-icon">
                      <i aria-hidden="true" className={iconClass} />
                    </div>
                    <div>
                      <h4>{label}</h4>
                      <span>Component assessment</span>
                    </div>
                  </div>
                  <div className="inspection-report-preview__score-value">
                    <strong>{score}%</strong>
                  </div>
                  <div className="inspection-report-preview__score-track">
                    <span
                      style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="inspection-report-preview__footer">
        <div className="inspection-report-preview__leakage">
          <span>Leakage Status</span>
          <strong
            className={form?.leakage?.isLeaked ? "text-danger" : "text-success"}
          >
            {form?.leakage?.isLeaked
              ? "Leakage Detected"
              : "No Leakage Detected"}
          </strong>
        </div>
        <p>
          This report preview is generated within SBC Marketplace and summarizes
          the selected truck inspection negotiation using the current inspection
          inputs.
        </p>
      </div>
    </section>
  );
}

export default TruckInspectionReportPreview;
