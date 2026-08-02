function KpiGrid({ items, title, subtitle }) {
  return (
    <section className="dashboard-section-card">
      <div className="dashboard-section-head">
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      <div className="dashboard-kpi-grid">
        {items.map((item) => (
          <article className="dashboard-kpi-card" key={item.label}>
            <small>{item.label}</small>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default KpiGrid;
