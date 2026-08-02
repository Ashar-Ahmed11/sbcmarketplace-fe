function TruckDetailsHero({ truck }) {
  return (
    <section className="page-hero marketplace-hero-block truck-details-hero">
      <div className="page-hero-shade" />
      <div className="container-xl page-hero-inner">
        <span className="page-hero-eyebrow">Pakistan&apos;s # 1 Construction Marketplace</span>
        <div className="truck-details-hero-icons">
          <span><i className="fa fa-cogs" aria-hidden="true" /></span>
          <span><i className="fa fa-truck" aria-hidden="true" /></span>
          <span><i className="fa fa-building" aria-hidden="true" /></span>
        </div>
      </div>
    </section>
  );
}

export default TruckDetailsHero;
