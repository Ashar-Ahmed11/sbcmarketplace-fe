function MaterialDetailsSpecsCard({ material }) {
  const statBadges = [
    { icon: 'fa fa-industry', label: 'Seller Type', value: material?.sellerType || 'Manufacturer', accent: true },
    { icon: 'fa fa-cubes', label: 'Grade', value: material?.grade || 'Premium' },
    { icon: 'fa fa-archive', label: 'Stock', value: `${material?.quantity || 1} ${material?.unit || 'units'}` },
  ];

  const specRows = [
    ['Brand Type', material?.brand ? `${material.brand.charAt(0).toUpperCase()}${material.brand.slice(1)}` : 'Local', 'Category', material?.category?.name || 'Construction Material'],
    ['Quantity', material?.quantity || '1', 'Unit', material?.unit || 'Ton'],
    ['Delivery', material?.deliveryProvided ? 'Available' : 'Not Provided', 'City', material?.city || 'Pakistan'],
    ['Price', material?.price ? `Rs. ${Number(material.price).toLocaleString()}` : 'N/A', 'Location', material?.location || 'Pakistan'],
  ];

  return (
    <section className="truck-figma-specs-card">
      <h3>{material?.title || 'Construction Material Listing'}</h3>
      <div className="truck-figma-stats">
        {statBadges.map((badge) => (
          <div className="truck-figma-stat" key={badge.label}>
            <i className={badge.icon} aria-hidden="true" />
            <span>{badge.label}: <b className={badge.accent ? 'accent' : ''}>{badge.value}</b></span>
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

export default MaterialDetailsSpecsCard;
