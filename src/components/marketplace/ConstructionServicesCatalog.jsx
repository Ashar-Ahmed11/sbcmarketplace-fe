import { normalizeConstructionServiceListing } from './serviceCatalogData';
import ConstructionServicesCatalogFilters from './ConstructionServicesCatalogFilters';
import ConstructionServicesCatalogHeader from './ConstructionServicesCatalogHeader';
import ConstructionServicesCatalogLoadMore from './ConstructionServicesCatalogLoadMore';
import ConstructionServicesListingsSection from './ConstructionServicesListingsSection';
import ConstructionServicesOtherProducts from './ConstructionServicesOtherProducts';
import ConstructionServicesRentalBanner from './ConstructionServicesRentalBanner';

function ConstructionServicesCatalog({ listings = [] }) {
  const renderedListings = listings.map(normalizeConstructionServiceListing);

  return (
    <section className="marketplace-catalog">
      <div className="container-xl marketplace-layout">
        <ConstructionServicesCatalogFilters />
        <div className="marketplace-main">
          <ConstructionServicesCatalogHeader />
          <ConstructionServicesListingsSection listings={renderedListings} />
          <ConstructionServicesCatalogLoadMore />
          <ConstructionServicesRentalBanner />
          <ConstructionServicesOtherProducts />
        </div>
      </div>
    </section>
  );
}

export default ConstructionServicesCatalog;
