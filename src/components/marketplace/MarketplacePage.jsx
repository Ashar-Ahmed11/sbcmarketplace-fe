import MarketplaceHero from './MarketplaceHero';
import MarketplaceBrands from './MarketplaceBrands';
import MarketplaceCatalog from './MarketplaceCatalog';
import MarketplaceSafety from './MarketplaceSafety';

function MarketplacePage() {
  return (
    <main className="marketplace-page">
      <MarketplaceHero />
      <MarketplaceBrands />
      <MarketplaceCatalog />
      <MarketplaceSafety />
    </main>
  );
}

export default MarketplacePage;
