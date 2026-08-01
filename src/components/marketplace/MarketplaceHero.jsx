function MarketplaceHero() {
  const pills = [
    { label: 'Machines', icon: 'fa fa-truck', active: true },
    { label: 'Construction Material', icon: 'fa fa-cubes' },
    { label: 'Spare Parts', icon: 'fa fa-cogs' },
  ];

  return (
    <section className="page-hero marketplace-hero-block">
      <div className="page-hero-shade" />
      <div className="container-xl page-hero-inner">
        <span className="page-hero-eyebrow">Pakistan&apos;s # 1 Construction Marketplace</span>
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          <span>Home</span>
          <i className="fa fa-angle-right" aria-hidden="true" />
          <span>Marketplace Products</span>
          <i className="fa fa-angle-right" aria-hidden="true" />
          <strong>Machines</strong>
        </nav>
        <h1>Marketplace Products</h1>
        <div className="marketplace-searchbar">
          <input type="text" placeholder="Search" aria-label="Search marketplace products" />
          <button type="button" aria-label="Search marketplace">
            <i className="fa fa-search" aria-hidden="true" />
          </button>
        </div>
        <div className="marketplace-pills">
          {pills.map((pill) => (
            <button className={`marketplace-pill ${pill.active ? 'active' : ''}`} key={pill.label} type="button">
              <i className={pill.icon} aria-hidden="true" />
              <span>{pill.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MarketplaceHero;
