import { Link } from 'react-router-dom';

function ConstructionServicesListingCard({ listing }) {
  return (
    <article className="marketplace-listing-card">
      <div className="marketplace-listing-media">
        <img alt={listing.title} src={listing.image} />
        <div className="marketplace-listing-links">
          <span>View Catelogue</span>
          <span>Print Quotation</span>
        </div>
      </div>
      <div className="marketplace-listing-copy">
        <h3>{listing.title}</h3>
        <p className="marketplace-meta">
          <span><i className="fa fa-circle" /> {listing.detailA}</span>
          <span><i className="fa fa-circle" /> {listing.detailB}</span>
        </p>
        <strong>Team Size: {listing.quantity}</strong>
        <div className="marketplace-spec-grid">
          <ul>{listing.specs.map((spec) => <li key={spec}>{spec}</li>)}</ul>
          <ul>{listing.specs2.map((spec) => <li key={spec}>{spec}</li>)}</ul>
        </div>
      </div>
      <div className="marketplace-price-box">
        <small>Pricing<br />On Request</small>
        <strong>{listing.price}</strong>
        <Link className="marketplace-price-link" to={`/construction-services-details/${listing._id}`}>{listing.buttonLabel}</Link>
      </div>
    </article>
  );
}

export default ConstructionServicesListingCard;
