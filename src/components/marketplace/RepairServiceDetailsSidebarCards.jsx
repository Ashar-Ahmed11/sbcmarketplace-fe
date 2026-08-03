import TruckDetailsFinancing from './TruckDetailsFinancing';

function RepairServiceDetailsSidebarCards({ repairService }) {
  return (
    <div className="truck-figma-sidebar-stack">
      <section className="truck-figma-price-card">
        <small>Repair Pricing</small>
        <span>Shared after fault review</span>
        <strong>Call for Quote</strong>
        <button className="truck-figma-cta truck-figma-cta--primary" type="button">Request Repair Support</button>
        <button className="truck-figma-cta truck-figma-cta--ghost" type="button">Download Profile</button>
      </section>

      <section className="truck-figma-offer-card">
        <h3>Submit Repair Requirement</h3>
        <div className="truck-figma-field">
          <label>Estimated Budget (PKR)</label>
          <input placeholder="Enter your budget" type="text" />
        </div>
        <div className="truck-figma-field">
          <label>Repair Mode</label>
          <div className="truck-figma-delivery-options">
            <button type="button">Onsite</button>
            <button type="button">Workshop</button>
          </div>
        </div>
        <div className="truck-figma-field">
          <label>Fault Details</label>
          <textarea placeholder="Describe the repair need" rows="5" />
        </div>
        <button className="truck-figma-cta truck-figma-cta--primary" type="button">
          <i className="fa fa-calendar-check-o" aria-hidden="true" />
          <span>Send Requirement</span>
        </button>
      </section>

      <section className="truck-figma-trust-card">
        <div className="truck-figma-trust-icon">
          <i className="fa fa-shield" aria-hidden="true" />
        </div>
        <div>
          <h4>Verified Repair Team</h4>
          <p>{repairService?.offerOnsiteRepair ? 'Onsite repair support available across listed areas.' : 'Workshop-based repair coordination available.'}</p>
        </div>
      </section>
      <TruckDetailsFinancing />
    </div>
  );
}

export default RepairServiceDetailsSidebarCards;
