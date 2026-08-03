import { normalizeSparePartListing } from './marketplaceCatalogData';
import SparePartsCatalogFilters from './SparePartsCatalogFilters';
import SparePartsCatalogHeader from './SparePartsCatalogHeader';
import SparePartsCatalogLoadMore from './SparePartsCatalogLoadMore';
import SparePartsListingsSection from './SparePartsListingsSection';
import SparePartsOtherProducts from './SparePartsOtherProducts';
import SparePartsRentalBanner from './SparePartsRentalBanner';

function MarketplaceSparePartsCatalog({ listings = [] }) {
  const renderedListings = listings.map(normalizeSparePartListing);

  return (
    <section className="marketplace-catalog">
      <div className="container-xl marketplace-layout">
        <SparePartsCatalogFilters />
        <div className="marketplace-main">
          <SparePartsCatalogHeader />
          <SparePartsListingsSection listings={renderedListings} />
          <SparePartsCatalogLoadMore />
          <SparePartsRentalBanner />
          <SparePartsOtherProducts />
        </div>
      </div>
    </section>
  );
}

export default MarketplaceSparePartsCatalog;
