const brands = ['Power Cement', 'AMRELI STEELS', 'AGHA STEEL', 'NAVEENA STEEL', 'LUCKY CEMENT', 'Attock Cement'];

function MarketplaceBrands() {
  return (
    <section className="marketplace-brands">
      <div className="container-xl marketplace-brand-strip">
        {brands.map((brand) => (
          <div className="marketplace-brand" key={brand}>{brand}</div>
        ))}
      </div>
    </section>
  );
}

export default MarketplaceBrands;
