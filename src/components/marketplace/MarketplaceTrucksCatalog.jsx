import { normalizeTruckListing } from './marketplaceCatalogData';
import TruckCatalogFilters from './TruckCatalogFilters';
import TruckCatalogHeader from './TruckCatalogHeader';
import TruckCatalogLoadMore from './TruckCatalogLoadMore';
import TruckListingsSection from './TruckListingsSection';
import TruckOtherProducts from './TruckOtherProducts';
import TruckRentalBanner from './TruckRentalBanner';

function MarketplaceTrucksCatalog({ listings = [] }) {
  const renderedListings = listings.map(normalizeTruckListing);

  return (
    <section className="marketplace-catalog">
      <div className="container-xl marketplace-layout">
        <TruckCatalogFilters />
        <div className="marketplace-main">
          <TruckCatalogHeader />
          <TruckListingsSection listings={renderedListings} />
          <TruckCatalogLoadMore />
          <TruckRentalBanner />
          <TruckOtherProducts />
        </div>
      </div>
    </section>
  );
}

export default MarketplaceTrucksCatalog;
