function TruckDetailsSpecsCard({ truck }) {
  const statBadges = [
    { icon: 'fa fa-info-circle', label: 'Condition', value: truck?.condition ? `${truck.condition.charAt(0).toUpperCase()}${truck.condition.slice(1)}` : 'Used', accent: true },
    { icon: 'fa fa-history', label: 'Mileage', value: truck?.usage?.mileage ? `${Number(truck.usage.mileage).toLocaleString()} km` : '4,600 hrs' },
    { icon: 'fa fa-archive', label: 'Stock', value: `${truck?.quantity || 1} available` },
  ];

  const specRows = [
    ['Brand', truck?.brand || 'Komatsu', 'Model', truck?.subcategory?.name || truck?.title || 'WA100M-8'],
    ['Manufacture Year', truck?.manufacturingYear || '2019', 'Quantity', truck?.quantity || '1'],
    ['Warranty', truck?.originalDocuments ? 'Available' : 'Not Available', 'Delivery', truck?.deliveryProvided ? 'Seller Delivery' : 'Buyer Pickup Only'],
  ];

  return (
    <section className="truck-figma-specs-card">
      <h3>{truck?.title || 'Compact Wheel Loader — Komatsu WA100M'}</h3>
      <div className="truck-figma-stats">
        {statBadges.map((badge) => (
          <div className="truck-figma-stat" key={badge.label}>
            <i className={badge.icon} aria-hidden="true" />
            <span>
              {badge.label}: <b className={badge.accent ? 'accent' : ''}>{badge.value}</b>
            </span>
          </div>
        ))}
      </div>

      <div className="truck-figma-specs-table">
        {specRows.map(([labelA, valueA, labelB, valueB], index) => (
          <div className={`truck-figma-specs-row ${index % 2 ? 'alt' : ''}`} key={`${labelA}-${labelB}`}>
            <div className="truck-figma-specs-cell">
              <span>{labelA}</span>
              <strong className={labelA === 'Warranty' && valueA === 'Not Available' ? 'danger' : ''}>{valueA}</strong>
            </div>
            <div className="truck-figma-specs-cell">
              <span>{labelB}</span>
              <strong>{valueB}</strong>
            </div>
          </div>
        ))}
        <div className="truck-figma-specs-row alt full">
          <div className="truck-figma-specs-cell">
            <span>Location</span>
            <strong><i className="fa fa-map-marker" aria-hidden="true" /> {truck?.location || 'Lahore, PK'}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TruckDetailsSpecsCard;
