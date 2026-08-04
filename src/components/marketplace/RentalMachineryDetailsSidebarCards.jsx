import TruckDetailsFinancing from './TruckDetailsFinancing';

function RentalMachineryDetailsSidebarCards({ rentalMachinery }) {
  return (
    <div className="truck-figma-sidebar-stack">
      <section className="truck-figma-price-card">
        <small>Per Hour Rental Charges</small>
        <span>Rental Construction Machinery</span>
        <strong>{rentalMachinery?.perHourRentalCharges ? `Rs. ${Number(rentalMachinery.perHourRentalCharges).toLocaleString()}` : 'N/A'}</strong>
        <button className="truck-figma-cta truck-figma-cta--primary" type="button">Request for Meeting</button>
        <button className="truck-figma-cta truck-figma-cta--ghost" type="button">Download Spec Sheet</button>
      </section>

      <section className="truck-figma-offer-card">
        <h3>Submit Your Rental Inquiry</h3>
        <div className="truck-figma-field">
          <label>Preferred Budget (PKR / hour)</label>
          <input placeholder="Enter your budget" type="text" />
        </div>
        <div className="truck-figma-field">
          <label>Select Delivery Type</label>
          <div className="truck-figma-delivery-options">
            <button type="button">Seller Delivery</button>
            <button type="button">Buyer Pickup</button>
          </div>
        </div>
        <div className="truck-figma-field">
          <label>Message (Optional)</label>
          <textarea placeholder="Share your rental requirement" rows="5" />
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
          <h4>Rental Machinery Verified</h4>
          <p>{rentalMachinery?.machineStatus ? `${rentalMachinery.machineStatus} status documented for buyers.` : 'Availability can be confirmed by the seller.'}</p>
        </div>
      </section>
      <TruckDetailsFinancing />
    </div>
  );
}

export default RentalMachineryDetailsSidebarCards;
