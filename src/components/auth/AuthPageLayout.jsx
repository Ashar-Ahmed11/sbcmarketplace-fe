function AuthPageLayout({ eyebrow, title, description, asideTitle, asideText, children }) {
  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="page-hero-shade" />
        <div className="container-xl auth-grid">
          <div className="auth-copy">
            <span className="orange-pill">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="auth-copy-card">
              <h2>{asideTitle}</h2>
              <p>{asideText}</p>
            </div>
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}

export default AuthPageLayout;
