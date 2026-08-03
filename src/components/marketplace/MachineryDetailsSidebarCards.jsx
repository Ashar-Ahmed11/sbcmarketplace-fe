import TruckDetailsFinancing from './TruckDetailsFinancing';

function MachineryDetailsSidebarCards({ machinery }) {
  return (
    <div className="truck-figma-sidebar-stack">
      <section className="truck-figma-price-card">
        <small>Total Estimated Price</small>
        <span>Incl. Taxes &amp; Handling</span>
        <strong>{machinery?.price ? `Rs. ${Number(machinery.price).toLocaleString()}` : 'N/A'}</strong>
        <button className="truck-figma-cta truck-figma-cta--primary" type="button">Request for Meeting</button>
        <button className="truck-figma-cta truck-figma-cta--ghost" type="button">Download Spec Sheet</button>
      </section>

      <section className="truck-figma-offer-card">
        <h3>Submit Your Machinery Offer</h3>
        <div className="truck-figma-field">
          <label>Offer Amount (PKR)</label>
          <input placeholder="Enter your offer" type="text" />
        </div>
        <div className="truck-figma-field">
          <label>Select Delivery Type</label>
          <div className="truck-figma-delivery-options">
            <button type="button">Seller Delivery</button>
            <button type="button">SBC Delivery</button>
          </div>
        </div>
        <div className="truck-figma-field">
          <label>Message (Optional)</label>
          <textarea placeholder="Add any note" rows="5" />
        </div>
        <button className="truck-figma-cta truck-figma-cta--primary" type="button">
          <i className="fa fa-calendar-check-o" aria-hidden="true" />
          <span>Submit Offer</span>
        </button>
      </section>

      <section className="truck-figma-trust-card">
        <div className="truck-figma-trust-icon">
          <i className="fa fa-shield" aria-hidden="true" />
        </div>
        <div>
          <h4>Verified Machinery</h4>
          <p>{machinery?.machineStatus ? `${machinery.machineStatus} status documented for buyers.` : 'Inspection details available on request.'}</p>
        </div>
      </section>
      <TruckDetailsFinancing />
    </div>
  );
}

export default MachineryDetailsSidebarCards;
