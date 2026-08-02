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

function MaterialDetailsInfoSections({ material }) {
  const sections = [
    {
      title: 'Listing Overview',
      rows: [
        ['Category', valueOrDash(material?.category?.name), 'Subcategory', valueOrDash(material?.subcategory?.name)],
        ['Seller Type', valueOrDash(material?.sellerType), 'Brand Type', valueOrDash(material?.brand ? `${material.brand.charAt(0).toUpperCase()}${material.brand.slice(1)}` : '')],
        ['Grade', valueOrDash(material?.grade), 'Unit', valueOrDash(material?.unit)],
        ['Quantity', valueOrDash(material?.quantity), 'Location', valueOrDash(material?.location)],
        ['Price', valueOrDash(material?.price ? `Rs. ${Number(material.price).toLocaleString()}` : ''), 'Approval Status', valueOrDash(material?.approvalStatus)],
        ['Delivery Provided', valueOrDash(material?.deliveryProvided), 'Rejection Reason', valueOrDash(material?.rejectionReason)],
      ],
    },
    {
      title: 'Description',
      rows: [['Listing Description', valueOrDash(material?.description)]],
    },
  ];

  return (
    <div className="truck-figma-details-stack">
      {sections.map((section) => (
        <DetailsTableCard key={section.title} rows={section.rows.filter((row) => row[1] !== '—' || row[3])} title={section.title} />
      ))}

      {material?.deliveryLocations?.length ? (
        <section className="truck-figma-specs-card truck-figma-specs-card--compact">
          <h3>Delivery Locations</h3>
          <div className="truck-figma-specs-table">
            {material.deliveryLocations.map((item, index) => (
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

export default MaterialDetailsInfoSections;
