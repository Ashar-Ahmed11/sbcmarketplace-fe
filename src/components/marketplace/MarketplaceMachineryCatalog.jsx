import { normalizeMachineryListing } from './marketplaceCatalogData';
import MachineryCatalogFilters from './MachineryCatalogFilters';
import MachineryCatalogHeader from './MachineryCatalogHeader';
import MachineryCatalogLoadMore from './MachineryCatalogLoadMore';
import MachineryListingsSection from './MachineryListingsSection';
import MachineryOtherProducts from './MachineryOtherProducts';
import MachineryRentalBanner from './MachineryRentalBanner';

function MarketplaceMachineryCatalog({
  categories = [],
  cities = [],
  filters = {},
  listings = [],
  onFiltersChange = () => {},
}) {
  const renderedListings = listings.map(normalizeMachineryListing);

  return (
    <section className="marketplace-catalog">
      <div className="container-xl marketplace-layout">
        <MachineryCatalogFilters
          categories={categories}
          cities={cities}
          filters={filters}
          onChange={onFiltersChange}
        />
        <div className="marketplace-main">
          <MachineryCatalogHeader />
          <MachineryListingsSection listings={renderedListings} />
          <MachineryCatalogLoadMore />
          <MachineryRentalBanner />
          <MachineryOtherProducts />
        </div>
      </div>
    </section>
  );
}

export default MarketplaceMachineryCatalog;
