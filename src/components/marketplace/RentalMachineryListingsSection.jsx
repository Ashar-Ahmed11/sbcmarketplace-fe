import RentalMachineryListingCard from './RentalMachineryListingCard';

function RentalMachineryListingsSection({ listings = [] }) {
  return (
    <div className="marketplace-listings" id="featured">
      {listings.length ? listings.map((listing) => <RentalMachineryListingCard key={listing._id || listing.title} listing={listing} />) : (
        <div className="marketplace-empty-state">
          <h3>No approved rental construction machinery listings found</h3>
          <p>We&apos;re preparing verified rental construction machinery listings for this section. Please check back shortly.</p>
        </div>
      )}
    </div>
  );
}

export default RentalMachineryListingsSection;
