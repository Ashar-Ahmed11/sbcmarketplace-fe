function SparePartDetailsSpecsCard({ sparePart }) {
  const statBadges = [
    { icon: 'fa fa-info-circle', label: 'Condition', value: sparePart?.condition ? `${sparePart.condition.charAt(0).toUpperCase()}${sparePart.condition.slice(1)}` : 'Used', accent: true },
    { icon: 'fa fa-certificate', label: 'Warranty', value: sparePart?.warrantyProvided ? 'Available' : 'Not Available' },
    { icon: 'fa fa-archive', label: 'Stock', value: `${sparePart?.quantity || 1} available` },
  ];

  const specRows = [
    ['Brand', sparePart?.brand || 'Caterpillar (CAT)', 'Part Number', sparePart?.partNumber || '—'],
    ['Manufacture Year', sparePart?.manufacturingYear || '—', 'Quantity', sparePart?.quantity || '1'],
    ['Country', sparePart?.countryOfManufacture || '—', 'City', sparePart?.city || 'Pakistan'],
    ['Delivery', sparePart?.deliveryProvided ? 'Seller Delivery' : 'Buyer Pickup Only', 'Location', sparePart?.location || 'Pakistan'],
  ];

  return (
    <section className="truck-figma-specs-card">
      <h3>{sparePart?.title || 'Spare Part Listing'}</h3>
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

export default SparePartDetailsSpecsCard;
