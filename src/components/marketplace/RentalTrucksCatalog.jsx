import TruckCatalogFilters from './TruckCatalogFilters';
import TruckCatalogLoadMore from './TruckCatalogLoadMore';
import TruckOtherProducts from './TruckOtherProducts';
import TruckRentalBanner from './TruckRentalBanner';
import RentalTruckCatalogHeader from './RentalTruckCatalogHeader';
import RentalTruckListingsSection from './RentalTruckListingsSection';
import { normalizeRentalTruckListing } from './rentalMarketplaceCatalogData';

function RentalTrucksCatalog({ listings = [] }) {
  const renderedListings = listings.map(normalizeRentalTruckListing);

  return (
    <section className="marketplace-catalog">
      <div className="container-xl marketplace-layout">
        <TruckCatalogFilters />
        <div className="marketplace-main">
          <RentalTruckCatalogHeader />
          <RentalTruckListingsSection listings={renderedListings} />
          <TruckCatalogLoadMore />
          <TruckRentalBanner />
          <TruckOtherProducts />
        </div>
      </div>
    </section>
  );
}

export default RentalTrucksCatalog;
