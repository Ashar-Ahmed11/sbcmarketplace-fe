import { normalizeInspectionServiceListing } from './serviceCatalogData';
import InspectionServicesCatalogFilters from './InspectionServicesCatalogFilters';
import InspectionServicesCatalogHeader from './InspectionServicesCatalogHeader';
import InspectionServicesCatalogLoadMore from './InspectionServicesCatalogLoadMore';
import InspectionServicesListingsSection from './InspectionServicesListingsSection';
import InspectionServicesOtherProducts from './InspectionServicesOtherProducts';
import InspectionServicesRentalBanner from './InspectionServicesRentalBanner';

function InspectionServicesCatalog({ listings = [] }) {
  const renderedListings = listings.map(normalizeInspectionServiceListing);

  return (
    <section className="marketplace-catalog">
      <div className="container-xl marketplace-layout">
        <InspectionServicesCatalogFilters />
        <div className="marketplace-main">
          <InspectionServicesCatalogHeader />
          <InspectionServicesListingsSection listings={renderedListings} />
          <InspectionServicesCatalogLoadMore />
          <InspectionServicesRentalBanner />
          <InspectionServicesOtherProducts />
        </div>
      </div>
    </section>
  );
}

export default InspectionServicesCatalog;
