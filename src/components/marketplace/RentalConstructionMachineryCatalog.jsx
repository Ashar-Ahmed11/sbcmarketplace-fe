import MachineryCatalogFilters from './MachineryCatalogFilters';
import MachineryCatalogLoadMore from './MachineryCatalogLoadMore';
import MachineryOtherProducts from './MachineryOtherProducts';
import MachineryRentalBanner from './MachineryRentalBanner';
import RentalMachineryCatalogHeader from './RentalMachineryCatalogHeader';
import RentalMachineryListingsSection from './RentalMachineryListingsSection';
import { normalizeRentalMachineryListing } from './rentalMarketplaceCatalogData';

function RentalConstructionMachineryCatalog({ listings = [] }) {
  const renderedListings = listings.map(normalizeRentalMachineryListing);

  return (
    <section className="marketplace-catalog">
      <div className="container-xl marketplace-layout">
        <MachineryCatalogFilters />
        <div className="marketplace-main">
          <RentalMachineryCatalogHeader />
          <RentalMachineryListingsSection listings={renderedListings} />
          <MachineryCatalogLoadMore />
          <MachineryRentalBanner />
          <MachineryOtherProducts />
        </div>
      </div>
    </section>
  );
}

export default RentalConstructionMachineryCatalog;
