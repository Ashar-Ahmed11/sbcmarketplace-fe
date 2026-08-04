import RentalTruckListingCard from './RentalTruckListingCard';

function RentalTruckListingsSection({ listings = [] }) {
  return (
    <div className="marketplace-listings" id="featured">
      {listings.length ? listings.map((listing) => <RentalTruckListingCard key={listing._id || listing.title} listing={listing} />) : (
        <div className="marketplace-empty-state">
          <h3>No approved rental truck listings found</h3>
          <p>We&apos;re preparing verified rental truck listings for this section. Please check back shortly.</p>
        </div>
      )}
    </div>
  );
}

export default RentalTruckListingsSection;
