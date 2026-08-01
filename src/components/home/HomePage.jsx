import Hero from './hero';
import Ecosystem from './ecosystem';
import Solutions from './solutions';
import Marketplace from './marketplace';
import Services from './services';
import Franchise from './franchise';
import Cta from './cta';
import Testimonials from './testimonials';

function HomePage() {
  return <main id="top" >
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
