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

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString();
}

function RentalMachineryDetailsInfoSections({ rentalMachinery }) {
  const sections = [
    {
      title: 'Listing Overview',
      rows: [
        ['Category', valueOrDash(rentalMachinery?.category?.name), 'Subcategory', valueOrDash(rentalMachinery?.subcategory?.name)],
        ['Brand', valueOrDash(rentalMachinery?.brand), 'Condition', valueOrDash(rentalMachinery?.condition ? `${rentalMachinery.condition.charAt(0).toUpperCase()}${rentalMachinery.condition.slice(1)}` : '')],
        ['Manufacturing Year', valueOrDash(rentalMachinery?.manufacturingYear), 'Import Year', valueOrDash(rentalMachinery?.importYear)],
        ['Country of Manufacture', valueOrDash(rentalMachinery?.countryOfManufacture), 'Machine Status', valueOrDash(rentalMachinery?.machineStatus)],
        ['Working Hours', valueOrDash(rentalMachinery?.workingHours), 'Quantity', valueOrDash(rentalMachinery?.quantity)],
        ['Location', valueOrDash(rentalMachinery?.location), 'Approval Status', valueOrDash(rentalMachinery?.approvalStatus)],
      ],
    },
    {
      title: 'Rental Details',
      rows: [
        ['Available From', formatDate(rentalMachinery?.availableRentalDuration?.fromDate), 'Available To', formatDate(rentalMachinery?.availableRentalDuration?.toDate)],
        ['Per Hour Rental Charges', valueOrDash(rentalMachinery?.perHourRentalCharges ? `Rs. ${Number(rentalMachinery.perHourRentalCharges).toLocaleString()}` : ''), 'Delivery Provided', valueOrDash(rentalMachinery?.deliveryProvided)],
      ],
    },
    {
      title: 'Capacity',
      rows: [
        ['Operating Weight Ton', valueOrDash(rentalMachinery?.capacity?.operatingWeightTon), 'Bucket Capacity M3', valueOrDash(rentalMachinery?.capacity?.bucketCapacityM3)],
        ['Maximum Digging Depth', valueOrDash(rentalMachinery?.capacity?.maximumDiggingDepth), 'Maximum Digging Reach', valueOrDash(rentalMachinery?.capacity?.maximumDiggingReach)],
        ['Maximum Dumping Height', valueOrDash(rentalMachinery?.capacity?.maximumDumpingHeight), 'Lift Capacity', valueOrDash(rentalMachinery?.capacity?.liftCapacity)],
        ['Boom Length', valueOrDash(rentalMachinery?.capacity?.boomLength), 'Blade Width', valueOrDash(rentalMachinery?.capacity?.bladeWidth)],
        ['Drum Width', valueOrDash(rentalMachinery?.capacity?.drumWidth), 'Drum Capacity', valueOrDash(rentalMachinery?.capacity?.drumCapacity)],
        ['Fork Length', valueOrDash(rentalMachinery?.capacity?.forkLength)],
      ],
    },
    {
      title: 'Mechanical',
      rows: [
        ['Engine Brand', valueOrDash(rentalMachinery?.mechanical?.engineBrand), 'Engine Model', valueOrDash(rentalMachinery?.mechanical?.engineModel)],
        ['Horsepower HP', valueOrDash(rentalMachinery?.mechanical?.horsepowerHp), 'Engine Capacity CC', valueOrDash(rentalMachinery?.mechanical?.engineCapacityCc)],
        ['Fuel Type', valueOrDash(rentalMachinery?.mechanical?.fuelType), 'Transmission', valueOrDash(rentalMachinery?.mechanical?.transmission)],
        ['Drive Type', valueOrDash(rentalMachinery?.mechanical?.driveType), 'Hydraulic Pump Brand', valueOrDash(rentalMachinery?.mechanical?.hydraulicPumpBrand)],
        ['Hydraulic System', valueOrDash(rentalMachinery?.mechanical?.hydraulicSystem)],
      ],
    },
    {
      title: 'Tyres & Tracks',
      rows: [
        ['Track Type', valueOrDash(rentalMachinery?.tyres?.trackType), 'Track Shoe Width', valueOrDash(rentalMachinery?.tyres?.trackShoeWidth)],
        ['Track Condition', valueOrDash(rentalMachinery?.tyres?.trackCondition), 'Tyre Size', valueOrDash(rentalMachinery?.tyres?.tyreSize)],
        ['Number Of Tyres', valueOrDash(rentalMachinery?.tyres?.numberOfTyres), 'Tyre Condition', valueOrDash(rentalMachinery?.tyres?.tyreCondition)],
      ],
    },
    {
      title: 'Features',
      rows: [
        ['Air Conditioner', valueOrDash(rentalMachinery?.features?.airConditioner), 'Cabin', valueOrDash(rentalMachinery?.features?.cabin)],
        ['Joystick Controls', valueOrDash(rentalMachinery?.features?.joystickControls), 'GPS Tracking', valueOrDash(rentalMachinery?.features?.gpsTracking)],
        ['Reverse Camera', valueOrDash(rentalMachinery?.features?.reverseCamera), 'Auto Greasing', valueOrDash(rentalMachinery?.features?.autoGreasing)],
        ['LED Work Lights', valueOrDash(rentalMachinery?.features?.ledWorkLights), 'Auxiliary Hydraulics', valueOrDash(rentalMachinery?.features?.auxiliaryHydraulics)],
        ['Auto Idle', valueOrDash(rentalMachinery?.features?.autoIdle), 'Quick Hitch', valueOrDash(rentalMachinery?.features?.quickHitch)],
      ],
    },
    {
      title: 'Description',
      rows: [['Listing Description', valueOrDash(rentalMachinery?.description)]],
    },
  ];

  return (
    <div className="truck-figma-details-stack">
      {sections.map((section) => (
        <DetailsTableCard key={section.title} rows={section.rows.filter((row) => row[1] !== '—' || row[3])} title={section.title} />
      ))}

      {rentalMachinery?.deliveryLocations?.length ? (
        <section className="truck-figma-specs-card truck-figma-specs-card--compact">
          <h3>Delivery Locations</h3>
          <div className="truck-figma-specs-table">
            {rentalMachinery.deliveryLocations.map((item, index) => (
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

export default RentalMachineryDetailsInfoSections;
