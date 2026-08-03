const pills = [
  { key: 'trucks', label: 'Trucks', icon: 'fa fa-truck' },
  { key: 'construction-machinery', label: 'Construction Machinery', icon: 'fa fa-industry' },
  { key: 'construction-material', label: 'Construction Material', icon: 'fa fa-cubes' },
  { key: 'spare-parts', label: 'Spare Parts', icon: 'fa fa-cogs' },
];

function MarketplaceHero({
  activeTab,
  onTabChange,
  pills: customPills,
  searchTerm,
  onSearchChange,
  title = 'Marketplace Products',
}) {
  const activePills = customPills || pills;

  return (
    <section className="page-hero marketplace-hero-block">
      <div className="page-hero-shade" />
      <div className="container-xl page-hero-inner">
        <span className="page-hero-eyebrow">Pakistan&apos;s # 1 Construction Marketplace</span>
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          <span>Home</span>
          <i className="fa fa-angle-right" aria-hidden="true" />
          <span>{title}</span>
          <i className="fa fa-angle-right" aria-hidden="true" />
          <strong>{activePills.find((pill) => pill.key === activeTab)?.label || 'Trucks'}</strong>
        </nav>
        <h1>{title}</h1>
        <div className="marketplace-searchbar">
          <input
            aria-label="Search marketplace products"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search"
            type="text"
            value={searchTerm}
          />
          <button type="button" aria-label="Search marketplace">
            <i className="fa fa-search" aria-hidden="true" />
          </button>
        </div>
        <div className="marketplace-pills">
          {activePills.map((pill) => (
            <button
              className={`marketplace-pill ${pill.key === activeTab ? 'active' : ''}`}
              key={pill.key}
              onClick={() => onTabChange(pill.key)}
              type="button"
            >
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
