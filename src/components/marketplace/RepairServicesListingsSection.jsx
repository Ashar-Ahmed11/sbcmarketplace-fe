import RepairServicesListingCard from './RepairServicesListingCard';

function RepairServicesListingsSection({ listings = [] }) {
  return (
    <div className="marketplace-listings" id="featured">
      {listings.length ? listings.map((listing) => <RepairServicesListingCard key={listing._id || listing.title} listing={listing} />) : (
        <div className="marketplace-empty-state">
          <h3>No approved repair services listings found</h3>
          <p>We&apos;re preparing verified marketplace listings for this section. Please check back shortly.</p>
        </div>
      )}
    </div>
  );
}

export default RepairServicesListingsSection;
