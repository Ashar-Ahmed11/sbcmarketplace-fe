import TruckDetailsFinancing from './TruckDetailsFinancing';

function MaterialDetailsSidebarCards({ material }) {
  return (
    <div className="truck-figma-sidebar-stack">
      <section className="truck-figma-price-card">
        <small>Total Estimated Price</small>
        <span>Incl. Taxes &amp; Handling</span>
        <strong>{material?.price ? `Rs. ${Number(material.price).toLocaleString()}` : 'N/A'}</strong>
        <button className="truck-figma-cta truck-figma-cta--primary" type="button">Request for Quote</button>
        <button className="truck-figma-cta truck-figma-cta--ghost" type="button">Download Spec Sheet</button>
      </section>

      <section className="truck-figma-offer-card">
        <h3>Submit Material Inquiry</h3>
        <div className="truck-figma-field">
          <label>Offer Amount (PKR)</label>
          <input placeholder="Enter your offer" type="text" />
        </div>
        <div className="truck-figma-field">
          <label>Select Delivery Type</label>
          <div className="truck-figma-delivery-options">
            <button type="button">Seller Delivery</button>
            <button type="button">Pickup</button>
          </div>
        </div>
        <div className="truck-figma-field">
          <label>Message (Optional)</label>
          <textarea placeholder="Add any note" rows="5" />
        </div>
        <button className="truck-figma-cta truck-figma-cta--primary" type="button">
          <i className="fa fa-calendar-check-o" aria-hidden="true" />
          <span>Submit Inquiry</span>
        </button>
      </section>

      <section className="truck-figma-trust-card">
        <div className="truck-figma-trust-icon">
          <i className="fa fa-shield" aria-hidden="true" />
        </div>
        <div>
          <h4>Verified Material Listing</h4>
          <p>{material?.grade ? `Grade ${material.grade} documented by seller.` : 'Quality and sourcing information available.'}</p>
        </div>
      </section>
      <TruckDetailsFinancing />
    </div>
  );
}

export default MaterialDetailsSidebarCards;
