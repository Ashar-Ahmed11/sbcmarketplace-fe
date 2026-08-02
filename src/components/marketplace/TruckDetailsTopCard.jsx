function TruckDetailsTopCard({ truck, heroImage }) {
  const bullets = [
    `Brand: ${truck?.brand || '—'}`,
    `Manufacture Year: ${truck?.manufacturingYear || '—'}`,
    `Warranty: ${truck?.originalDocuments ? 'Available' : 'Not Available'}`,
    `Model: ${truck?.modelYear || truck?.title || '—'}`,
    `Inspection: ${truck?.approvalStatus === 'approved' ? 'Available' : 'Pending'}`,
    `Delivery: ${truck?.deliveryProvided ? 'Seller Delivery' : 'Buyer Pickup Only'}`,
  ];

  return (
    <section className="truck-figma-top-card">
      <div className="truck-figma-top-card__image">
        {heroImage ? <img alt={truck?.title} src={heroImage} /> : <div className="truck-figma-image-fallback">Image coming soon</div>}
      </div>
      <div className="truck-figma-top-card__content">
        <h2>{truck?.title || 'Truck Listing'}</h2>
        <p className="truck-figma-top-card__quantity">Quantity Available: 3</p>
        <ul className="truck-figma-bullet-list">
          {bullets.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div className="truck-figma-top-card__actions">
        <button className="truck-figma-btn truck-figma-btn--primary" type="button">
          <i className="fa fa-eye" aria-hidden="true" />
          <span>View Catalogue</span>
        </button>
        <button className="truck-figma-btn truck-figma-btn--light" type="button">
          <i className="fa fa-print" aria-hidden="true" />
          <span>Print Quotation</span>
        </button>
      </div>
    </section>
  );
}

export default TruckDetailsTopCard;
