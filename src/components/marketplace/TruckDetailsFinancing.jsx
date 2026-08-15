function TruckDetailsFinancing({ onCheckEligibility, onRequestFinancing }) {
  return (
    <section className="truck-figma-finance-card">
      <h3>Need financing?</h3>
      <p>We offer low-interest corporate leasing plans for fleet upgrades. Get approved in 48 hours.</p>
      <button className="truck-figma-finance-btn truck-figma-finance-btn--light" onClick={onRequestFinancing} type="button">Request Financing</button>
      <button className="truck-figma-finance-btn truck-figma-finance-btn--dark" onClick={onCheckEligibility} type="button">Check Eligibility</button>
    </section>
  );
}

export default TruckDetailsFinancing;
