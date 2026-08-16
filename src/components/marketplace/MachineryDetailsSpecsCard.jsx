function MachineryDetailsSpecsCard({ machinery }) {
  const statBadges = [
    { icon: 'fa fa-info-circle', label: 'Condition', value: machinery?.condition ? `${machinery.condition.charAt(0).toUpperCase()}${machinery.condition.slice(1)}` : 'Used', accent: true },
    { icon: 'fa fa-history', label: 'Working Hours', value: machinery?.workingHours ? `${Number(machinery.workingHours).toLocaleString()} hrs` : 'N/A' },
    { icon: 'fa fa-archive', label: 'Stock', value: `${machinery?.quantity || 1} available` },
  ];

  const specRows = [
    ['Brand', machinery?.brand || 'Komatsu', 'Model', machinery?.subcategory?.name || machinery?.title || 'Machinery'],
    ['Manufacture Year', machinery?.manufacturingYear || '—', 'Quantity', machinery?.quantity || '1'],
    ['Country', machinery?.countryOfManufacture || '—', 'City', machinery?.city || 'Pakistan'],
    ['Delivery', machinery?.deliveryProvided ? 'Seller Delivery' : 'Buyer Pickup Only', 'Location', machinery?.location || 'Pakistan'],
  ];

  return (
    <section className="truck-figma-specs-card">
      <h3>{machinery?.title || 'Construction Machinery Listing'}</h3>
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
              <strong>{valueA}</strong>
            </div>
            <div className="truck-figma-specs-cell">
              <span>{labelB}</span>
              <strong>{valueB}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MachineryDetailsSpecsCard;
