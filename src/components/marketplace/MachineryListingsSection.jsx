import MachineryListingCard from './MachineryListingCard';

function MachineryListingsSection({ listings = [] }) {
  return (
    <div className="marketplace-listings" id="featured">
      {listings.length ? listings.map((listing) => (
        <MachineryListingCard key={listing._id || listing.title} listing={listing} />
      )) : (
        <div className="marketplace-empty-state">
          <h3>No approved machinery listings found</h3>
          <p>We&apos;re preparing verified marketplace listings for this section. Please check back shortly.</p>
        </div>
      )}
    </div>
  );
}

export default MachineryListingsSection;
