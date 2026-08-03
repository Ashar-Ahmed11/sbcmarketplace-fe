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

function ServiceSpecialistDetailsInfoSections({ service, areaField, areaLabel }) {
  const categories = service?.category?.map((item) => item.name || item).join(', ');
  const areas = service?.[areaField]?.map((item) => item.city).filter(Boolean).join(', ');
  const sections = [
    {
      title: 'Listing Overview',
      rows: [
        ['Categories', valueOrDash(categories), 'Years of Experience', valueOrDash(service?.yearsOfExperience)],
        ['Team Size', valueOrDash(service?.teamSize), 'Location', valueOrDash(service?.location)],
        [areaLabel, valueOrDash(areas), 'Onsite Availability', valueOrDash(service?.offerOnsiteInspection ?? service?.offerOnsiteRepair)],
      ],
    },
    {
      title: 'Description',
      rows: [['Listing Description', valueOrDash(service?.description)]],
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

export default ServiceSpecialistDetailsInfoSections;
