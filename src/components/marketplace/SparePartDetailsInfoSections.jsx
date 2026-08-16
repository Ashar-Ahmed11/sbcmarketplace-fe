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

function SparePartDetailsInfoSections({ sparePart }) {
  const compatibleBrands = sparePart?.compatibleBrands?.map((item) => item.brand).filter(Boolean).join(', ');

  const sections = [
    {
      title: 'Listing Overview',
      rows: [
        ['Category', valueOrDash(sparePart?.category?.name), 'Subcategory', valueOrDash(sparePart?.subcategory?.name)],
        ['Brand', valueOrDash(sparePart?.brand), 'Condition', valueOrDash(sparePart?.condition ? `${sparePart.condition.charAt(0).toUpperCase()}${sparePart.condition.slice(1)}` : '')],
        ['Manufacturing Year', valueOrDash(sparePart?.manufacturingYear), 'Import Year', valueOrDash(sparePart?.importYear)],
        ['Country of Manufacture', valueOrDash(sparePart?.countryOfManufacture), 'Part Number', valueOrDash(sparePart?.partNumber)],
        ['Quantity', valueOrDash(sparePart?.quantity), 'City', valueOrDash(sparePart?.city)],
        ['Location', valueOrDash(sparePart?.location), 'Warranty Provided', valueOrDash(sparePart?.warrantyProvided)],
        ['Price', valueOrDash(sparePart?.price ? `Rs. ${Number(sparePart.price).toLocaleString()}` : '')],
      ],
    },
    {
      title: 'Compatibility',
      rows: [['Compatible Brands', valueOrDash(compatibleBrands)]],
    },
    {
      title: 'Description',
      rows: [['Listing Description', valueOrDash(sparePart?.description)]],
    },
  ];

  return (
    <div className="truck-figma-details-stack">
      {sections.map((section) => (
        <DetailsTableCard key={section.title} rows={section.rows.filter((row) => row[1] !== '—' || row[3])} title={section.title} />
      ))}

      {sparePart?.deliveryLocations?.length ? (
        <section className="truck-figma-specs-card truck-figma-specs-card--compact">
          <h3>Delivery Locations</h3>
          <div className="truck-figma-specs-table">
            {sparePart.deliveryLocations.map((item, index) => (
              <div className={`truck-figma-specs-row ${index % 2 ? 'alt' : ''}`} key={`${item.city}-${index}`}>
                <div className="truck-figma-specs-cell">
                  <span>City</span>
                  <strong>{valueOrDash(item.city)}</strong>
                </div>
                <div className="truck-figma-specs-cell">
                  <span>Price</span>
                  <strong>{item.price ? `Rs. ${Number(item.price).toLocaleString()}` : '—'}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default SparePartDetailsInfoSections;
