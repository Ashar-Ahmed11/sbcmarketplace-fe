function ServiceSpecialistDetailsSpecsCard({ service, titleFallback }) {
  const statBadges = [
    { icon: 'fa fa-users', label: 'Team Size', value: service?.teamSize || '—', accent: true },
    { icon: 'fa fa-briefcase', label: 'Experience', value: service?.yearsOfExperience ? `${service.yearsOfExperience} years` : '—' },
    { icon: 'fa fa-map-marker', label: 'City', value: service?.city || 'Pakistan' },
  ];

  const specRows = [
    ['Categories', service?.category?.length || 0, 'Onsite', (service?.offerOnsiteInspection ?? service?.offerOnsiteRepair) ? 'Available' : 'Not Offered'],
    ['Location', service?.location || 'Pakistan'],
  ];

  return (
    <section className="truck-figma-specs-card">
      <h3>{service?.title || titleFallback}</h3>
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

export default ServiceSpecialistDetailsSpecsCard;
