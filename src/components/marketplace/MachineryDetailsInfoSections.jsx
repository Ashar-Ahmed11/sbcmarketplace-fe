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

function MachineryDetailsInfoSections({ machinery }) {
  const sections = [
    {
      title: 'Listing Overview',
      rows: [
        ['Category', valueOrDash(machinery?.category?.name), 'Subcategory', valueOrDash(machinery?.subcategory?.name)],
        ['Brand', valueOrDash(machinery?.brand), 'Condition', valueOrDash(machinery?.condition ? `${machinery.condition.charAt(0).toUpperCase()}${machinery.condition.slice(1)}` : '')],
        ['Manufacturing Year', valueOrDash(machinery?.manufacturingYear), 'Import Year', valueOrDash(machinery?.importYear)],
        ['Country of Manufacture', valueOrDash(machinery?.countryOfManufacture), 'Machine Status', valueOrDash(machinery?.machineStatus)],
        ['Working Hours', valueOrDash(machinery?.workingHours), 'Quantity', valueOrDash(machinery?.quantity)],
        ['Price', valueOrDash(machinery?.price ? `Rs. ${Number(machinery.price).toLocaleString()}` : ''), 'Location', valueOrDash(machinery?.location)],
      ],
    },
    {
      title: 'Capacity',
      rows: [
        ['Operating Weight Ton', valueOrDash(machinery?.capacity?.operatingWeightTon), 'Bucket Capacity M3', valueOrDash(machinery?.capacity?.bucketCapacityM3)],
        ['Maximum Digging Depth', valueOrDash(machinery?.capacity?.maximumDiggingDepth), 'Maximum Digging Reach', valueOrDash(machinery?.capacity?.maximumDiggingReach)],
        ['Maximum Dumping Height', valueOrDash(machinery?.capacity?.maximumDumpingHeight), 'Lift Capacity', valueOrDash(machinery?.capacity?.liftCapacity)],
        ['Boom Length', valueOrDash(machinery?.capacity?.boomLength), 'Blade Width', valueOrDash(machinery?.capacity?.bladeWidth)],
        ['Drum Width', valueOrDash(machinery?.capacity?.drumWidth), 'Drum Capacity', valueOrDash(machinery?.capacity?.drumCapacity)],
        ['Fork Length', valueOrDash(machinery?.capacity?.forkLength)],
      ],
    },
    {
      title: 'Mechanical',
      rows: [
        ['Engine Brand', valueOrDash(machinery?.mechanical?.engineBrand), 'Engine Model', valueOrDash(machinery?.mechanical?.engineModel)],
        ['Horsepower HP', valueOrDash(machinery?.mechanical?.horsepowerHp), 'Engine Capacity CC', valueOrDash(machinery?.mechanical?.engineCapacityCc)],
        ['Fuel Type', valueOrDash(machinery?.mechanical?.fuelType), 'Transmission', valueOrDash(machinery?.mechanical?.transmission)],
        ['Drive Type', valueOrDash(machinery?.mechanical?.driveType), 'Hydraulic Pump Brand', valueOrDash(machinery?.mechanical?.hydraulicPumpBrand)],
        ['Hydraulic System', valueOrDash(machinery?.mechanical?.hydraulicSystem)],
      ],
    },
    {
      title: 'Tyres & Tracks',
      rows: [
        ['Track Type', valueOrDash(machinery?.tyres?.trackType), 'Track Shoe Width', valueOrDash(machinery?.tyres?.trackShoeWidth)],
        ['Track Condition', valueOrDash(machinery?.tyres?.trackCondition), 'Tyre Size', valueOrDash(machinery?.tyres?.tyreSize)],
        ['Number Of Tyres', valueOrDash(machinery?.tyres?.numberOfTyres), 'Tyre Condition', valueOrDash(machinery?.tyres?.tyreCondition)],
      ],
    },
    {
      title: 'Features',
      rows: [
        ['Air Conditioner', valueOrDash(machinery?.features?.airConditioner), 'Cabin', valueOrDash(machinery?.features?.cabin)],
        ['Joystick Controls', valueOrDash(machinery?.features?.joystickControls), 'GPS Tracking', valueOrDash(machinery?.features?.gpsTracking)],
        ['Reverse Camera', valueOrDash(machinery?.features?.reverseCamera), 'Auto Greasing', valueOrDash(machinery?.features?.autoGreasing)],
        ['LED Work Lights', valueOrDash(machinery?.features?.ledWorkLights), 'Auxiliary Hydraulics', valueOrDash(machinery?.features?.auxiliaryHydraulics)],
        ['Auto Idle', valueOrDash(machinery?.features?.autoIdle), 'Quick Hitch', valueOrDash(machinery?.features?.quickHitch)],
      ],
    },
    {
      title: 'Description',
      rows: [['Listing Description', valueOrDash(machinery?.description)]],
    },
  ];

  return (
    <div className="truck-figma-details-stack">
      {sections.map((section) => (
        <DetailsTableCard key={section.title} rows={section.rows.filter((row) => row[1] !== '—' || row[3])} title={section.title} />
      ))}

      {machinery?.deliveryLocations?.length ? (
        <section className="truck-figma-specs-card truck-figma-specs-card--compact">
          <h3>Delivery Locations</h3>
          <div className="truck-figma-specs-table">
            {machinery.deliveryLocations.map((item, index) => (
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

export default MachineryDetailsInfoSections;
