import { normalizeMaterialListing } from './marketplaceCatalogData';
import MaterialCatalogFilters from './MaterialCatalogFilters';
import MaterialCatalogHeader from './MaterialCatalogHeader';
import MaterialCatalogLoadMore from './MaterialCatalogLoadMore';
import MaterialListingsSection from './MaterialListingsSection';
import MaterialOtherProducts from './MaterialOtherProducts';
import MaterialRentalBanner from './MaterialRentalBanner';

function MarketplaceMaterialsCatalog({ listings = [] }) {
  const renderedListings = listings.map(normalizeMaterialListing);

  return (
    <section className="marketplace-catalog">
      <div className="container-xl marketplace-layout">
        <MaterialCatalogFilters />
        <div className="marketplace-main">
          <MaterialCatalogHeader />
          <MaterialListingsSection listings={renderedListings} />
          <MaterialCatalogLoadMore />
          <MaterialRentalBanner />
          <MaterialOtherProducts />
        </div>
      </div>
    </section>
  );
}

export default MarketplaceMaterialsCatalog;
