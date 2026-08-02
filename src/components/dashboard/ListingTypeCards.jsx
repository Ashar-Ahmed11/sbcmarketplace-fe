import { Link } from 'react-router-dom';

function ListingTypeCards({ items, title, actionLabel, actionTo, subtitle }) {
  return (
    <section className="dashboard-section-card">
      <div className="dashboard-section-head">
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {/* {actionLabel && actionTo ? <Link className="dashboard-action-btn" to={actionTo}>{actionLabel}</Link> : null} */}
      </div>
      <div className="listing-type-grid">
        {items.map((item) => (
          <Link className="listing-type-card" key={item.label} to={item.to}>
            <div className="listing-type-icon"><i className={item.icon} aria-hidden="true" /></div>
            <h2>{item.label}</h2>
            <p>{item.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ListingTypeCards;
