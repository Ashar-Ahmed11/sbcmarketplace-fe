import TruckDetailsFinancing from './TruckDetailsFinancing';

function ConstructionServiceDetailsSidebarCards({ constructionService }) {
  return (
    <div className="truck-figma-sidebar-stack">
      <section className="truck-figma-price-card">
        <small>Service Pricing</small>
        <span>Shared after requirement review</span>
        <strong>Call for Quote</strong>
        <button className="truck-figma-cta truck-figma-cta--primary" type="button">Request Consultation</button>
        <button className="truck-figma-cta truck-figma-cta--ghost" type="button">Download Profile</button>
      </section>

      <section className="truck-figma-offer-card">
        <h3>Submit Project Requirement</h3>
        <div className="truck-figma-field">
          <label>Estimated Budget (PKR)</label>
          <input placeholder="Enter your budget" type="text" />
        </div>
        <div className="truck-figma-field">
          <label>Service Type</label>
          <div className="truck-figma-delivery-options">
            <button type="button">Onsite</button>
            <button type="button">Remote Planning</button>
          </div>
        </div>
        <div className="truck-figma-field">
          <label>Project Note</label>
          <textarea placeholder="Share your project need" rows="5" />
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
          <h4>Verified Service Team</h4>
          <p>{constructionService?.offerOnsiteService ? 'Onsite service available for qualified projects.' : 'Remote coordination available before deployment.'}</p>
        </div>
      </section>
      <TruckDetailsFinancing />
    </div>
  );
}

export default ConstructionServiceDetailsSidebarCards;
