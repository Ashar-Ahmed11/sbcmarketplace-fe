const valueOrDash = (value, suffix = '') => {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return `${value}${suffix}`;
};

function DetailsTableCard({ title, rows }) {
  if (!rows.length) return null;

  return (
    <section className="truck-figma-specs-card truck-figma-specs-card--compact">
      <h3>{title}</h3>
      <div className="truck-figma-specs-table">
        {rows.map((row, index) => (
          <div className={`truck-figma-specs-row ${index % 2 ? 'alt' : ''}`} key={`${title}-${row[0]}-${row[2] || 'single'}`}>
            <div className="truck-figma-specs-cell">
              <span>{row[0]}</span>
              <strong>{row[1]}</strong>
            </div>
            {row[2] ? (
              <div className="truck-figma-specs-cell">
                <span>{row[2]}</span>
                <strong>{row[3]}</strong>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function ConstructionServiceDetailsInfoSections({ constructionService }) {
  const subcategories = constructionService?.subcategory?.map((item) => item.name || item).join(', ');
  const serviceAreas = constructionService?.serviceAreas?.map((item) => item.city).filter(Boolean).join(', ');
  const sections = [
    {
      title: 'Listing Overview',
      rows: [
        ['Category', valueOrDash(constructionService?.category?.name), 'Subcategories', valueOrDash(subcategories)],
        ['Company Type', valueOrDash(constructionService?.companyType), 'Years of Experience', valueOrDash(constructionService?.yearsOfExperience)],
        ['Team Size', valueOrDash(constructionService?.teamSize), 'Location', valueOrDash(constructionService?.location)],
        ['Onsite Service', valueOrDash(constructionService?.offerOnsiteService), 'Service Areas', valueOrDash(serviceAreas)],
      ],
    },
    {
      title: 'Description',
      rows: [['Listing Description', valueOrDash(constructionService?.description)]],
    },
  ];

  return (
    <div className="truck-figma-details-stack">
      {sections.map((section) => (
        <DetailsTableCard key={section.title} rows={section.rows.filter((row) => row[1] !== '—' || row[3])} title={section.title} />
      ))}
    </div>
  );
}

export default ConstructionServiceDetailsInfoSections;
