import Hero from './hero';
import Ecosystem from './ecosystem';
import Solutions from './solutions';
import Marketplace from './marketplace';
import Services from './services';
import Franchise from './franchise';
import Cta from './cta';
import Testimonials from './testimonials';
import MobileMarketplaceSearch from './MobileMarketplaceSearch';
import MobileBrowseSection from './MobileBrowseSection';
import TruckRentalBanner from '../marketplace/TruckRentalBanner';

function HomePage() {
  return <main id="top" >
    <MobileMarketplaceSearch />
    <div className=" d-lg-none">
      <TruckRentalBanner />
    </div>
    <MobileBrowseSection />
    <Hero />
    <Ecosystem />
    <Solutions />
    <Marketplace />
    <Services />
    <Franchise />
    <Cta />
    <Testimonials />
  </main>;
}

export default HomePage;
