import ConstructionServicesListingCard from './ConstructionServicesListingCard';

function ConstructionServicesListingsSection({ listings = [] }) {
  return (
    <div className="marketplace-listings" id="featured">
      {listings.length ? listings.map((listing) => <ConstructionServicesListingCard key={listing._id || listing.title} listing={listing} />) : (
        <div className="marketplace-empty-state">
          <h3>No approved construction services listings found</h3>
          <p>We&apos;re preparing verified marketplace listings for this section. Please check back shortly.</p>
        </div>
      )}
    </div>
  );
}

export default ConstructionServicesListingsSection;
