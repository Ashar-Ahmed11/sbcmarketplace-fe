import { normalizeRepairServiceListing } from './serviceCatalogData';
import RepairServicesCatalogFilters from './RepairServicesCatalogFilters';
import RepairServicesCatalogHeader from './RepairServicesCatalogHeader';
import RepairServicesCatalogLoadMore from './RepairServicesCatalogLoadMore';
import RepairServicesListingsSection from './RepairServicesListingsSection';
import RepairServicesOtherProducts from './RepairServicesOtherProducts';
import RepairServicesRentalBanner from './RepairServicesRentalBanner';

function RepairServicesCatalog({ listings = [] }) {
  const renderedListings = listings.map(normalizeRepairServiceListing);

  return (
    <section className="marketplace-catalog">
      <div className="container-xl marketplace-layout">
        <RepairServicesCatalogFilters />
        <div className="marketplace-main">
          <RepairServicesCatalogHeader />
          <RepairServicesListingsSection listings={renderedListings} />
          <RepairServicesCatalogLoadMore />
          <RepairServicesRentalBanner />
          <RepairServicesOtherProducts />
        </div>
      </div>
    </section>
  );
}

export default RepairServicesCatalog;
