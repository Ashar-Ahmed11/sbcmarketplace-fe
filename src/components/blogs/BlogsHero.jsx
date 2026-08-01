function BlogsHero() {
  return (
    <section className="page-hero blogs-hero-block">
      <div className="page-hero-shade" />
      <div className="container-xl page-hero-centered">
        <div className="page-hero-icons" aria-hidden="true">
          <i className="fa fa-truck" />
          <i className="fa fa-cubes" />
          <i className="fa fa-briefcase" />
        </div>
        <span className="page-hero-divider" />
        <h1>Blogs</h1>
        <div className="page-mini-breadcrumb"><span>HOME</span><strong>BLOGS</strong></div>
      </div>
    </section>
  );
}

export default BlogsHero;
