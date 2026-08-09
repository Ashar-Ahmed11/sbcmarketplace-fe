import aghaSteel from '../../assets/marketplace-brands/agha-steel.png';
import amreliSteels from '../../assets/marketplace-brands/amreli-steels.png';
import attockCement from '../../assets/marketplace-brands/attock-cement.png';
import luckyCement from '../../assets/marketplace-brands/lucky-cement.png';
import naveenaSteel from '../../assets/marketplace-brands/naveena-steel.png';
import powerCement from '../../assets/marketplace-brands/power-cement.png';

const brands = [
  { name: 'Power Cement', src: powerCement, width: 300 },
  { name: 'Amreli Steels', src: amreliSteels, width: 340 },
  { name: 'Agha Steel', src: aghaSteel, width: 300 },
  { name: 'Naveena Steel', src: naveenaSteel, width: 300 },
  { name: 'Lucky Cement', src: luckyCement, width: 300 },
  { name: 'Attock Cement', src: attockCement, width: 220 },
];

function MarketplaceBrands() {
  return (
    <section className="marketplace-brands d-none d-md-block">
      <div className="container-xl marketplace-brand-strip">
        {brands.map((brand) => (
          <div className="marketplace-brand" key={brand.name}>
            <img
              alt={brand.name}
              className="marketplace-brand-logo"
              style={{
                '--brand-width': `${brand.width}px`,
              }}
              src={brand.src}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default MarketplaceBrands;
