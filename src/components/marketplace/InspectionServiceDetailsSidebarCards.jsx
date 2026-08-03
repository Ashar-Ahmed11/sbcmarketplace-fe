import TruckDetailsFinancing from './TruckDetailsFinancing';

function InspectionServiceDetailsSidebarCards({ inspectionService }) {
  return (
    <div className="truck-figma-sidebar-stack">
      <section className="truck-figma-price-card">
        <small>Inspection Pricing</small>
        <span>Shared after requirement review</span>
        <strong>Call for Quote</strong>
        <button className="truck-figma-cta truck-figma-cta--primary" type="button">Book Inspection</button>
        <button className="truck-figma-cta truck-figma-cta--ghost" type="button">Download Profile</button>
      </section>

      <section className="truck-figma-offer-card">
        <h3>Submit Inspection Request</h3>
        <div className="truck-figma-field">
          <label>Inspection Budget (PKR)</label>
          <input placeholder="Enter your budget" type="text" />
        </div>
        <div className="truck-figma-field">
          <label>Inspection Type</label>
          <div className="truck-figma-delivery-options">
            <button type="button">Onsite</button>
            <button type="button">Remote Review</button>
          </div>
        </div>
        <div className="truck-figma-field">
          <label>Message (Optional)</label>
          <textarea placeholder="Add inspection details" rows="5" />
        </div>
        <button className="truck-figma-cta truck-figma-cta--primary" type="button">
          <i className="fa fa-calendar-check-o" aria-hidden="true" />
          <span>Submit Request</span>
        </button>
      </section>

      <section className="truck-figma-trust-card">
        <div className="truck-figma-trust-icon">
          <i className="fa fa-shield" aria-hidden="true" />
        </div>
        <div>
          <h4>Verified Inspector</h4>
          <p>{inspectionService?.offerOnsiteInspection ? 'Onsite inspections available in listed coverage areas.' : 'Document review and offsite coordination available.'}</p>
        </div>
      </section>
      <TruckDetailsFinancing />
    </div>
  );
}

export default InspectionServiceDetailsSidebarCards;
