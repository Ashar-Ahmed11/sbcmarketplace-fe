function ConstructionServiceDetailsSpecsCard({ constructionService }) {
  const statBadges = [
    { icon: 'fa fa-building', label: 'Company Type', value: constructionService?.companyType || 'Main Contractor', accent: true },
    { icon: 'fa fa-users', label: 'Team Size', value: constructionService?.teamSize || '—' },
    { icon: 'fa fa-briefcase', label: 'Experience', value: constructionService?.yearsOfExperience ? `${constructionService.yearsOfExperience} years` : '—' },
  ];

  const specRows = [
    ['Category', constructionService?.category?.name || 'Construction Services', 'City', constructionService?.city || 'Pakistan'],
    ['Location', constructionService?.location || 'Pakistan', 'Subcategories', constructionService?.subcategory?.length || 0],
    ['Onsite Service', constructionService?.offerOnsiteService ? 'Available' : 'Not Offered'],
  ];

  return (
    <section className="truck-figma-specs-card">
      <h3>{constructionService?.title || 'Construction Service Listing'}</h3>
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

export default ConstructionServiceDetailsSpecsCard;
