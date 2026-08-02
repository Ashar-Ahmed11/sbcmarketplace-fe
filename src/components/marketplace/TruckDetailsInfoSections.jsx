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

function TruckDetailsInfoSections({ truck }) {
  const sections = [
    {
      title: 'Listing Overview',
      rows: [
        ['Category', valueOrDash(truck?.category?.name), 'Subcategory', valueOrDash(truck?.subcategory?.name)],
        ['Brand', valueOrDash(truck?.brand), 'Condition', valueOrDash(truck?.condition ? `${truck.condition.charAt(0).toUpperCase()}${truck.condition.slice(1)}` : '')],
        ['Quantity', valueOrDash(truck?.quantity), 'Drive Type', valueOrDash(truck?.driveType)],
        ['Wheel Type', valueOrDash(truck?.wheelType), 'Location', valueOrDash(truck?.location)],
        ['Manufacturing Year', valueOrDash(truck?.manufacturingYear), 'Model Year', valueOrDash(truck?.modelYear)],
        ['Import Year', valueOrDash(truck?.importYear), 'Price', valueOrDash(truck?.price ? `Rs. ${Number(truck.price).toLocaleString()}` : '')],
        ['Original Documents', valueOrDash(truck?.originalDocuments), 'Approval Status', valueOrDash(truck?.approvalStatus)],
      ],
    },
    {
      title: 'Capacity',
      rows: [
        ['Payload Capacity', valueOrDash(truck?.capacity?.payloadCapacity), 'Gross Vehicle Weight', valueOrDash(truck?.capacity?.grossVehicleWeight)],
        ['Body Capacity', valueOrDash(truck?.capacity?.bodyCapacity), 'Tank Capacity', valueOrDash(truck?.capacity?.tankCapacity)],
        ['Drum Capacity', valueOrDash(truck?.capacity?.drumCapactiy)],
      ],
    },
    {
      title: 'Engine & Transmission',
      rows: [
        ['Engine Brand', valueOrDash(truck?.engineTransmission?.engineBrand), 'Engine Model', valueOrDash(truck?.engineTransmission?.engineModel)],
        ['Engine Capacity', valueOrDash(truck?.engineTransmission?.engineCapactiy), 'Horsepower', valueOrDash(truck?.engineTransmission?.engineHorsepower)],
        ['Torque', valueOrDash(truck?.engineTransmission?.torque), 'Emission Standard', valueOrDash(truck?.engineTransmission?.emissionStandard)],
        ['Fuel Type', valueOrDash(truck?.engineTransmission?.fuelType), 'Transmission', valueOrDash(truck?.engineTransmission?.transmission)],
        ['Drive Type', valueOrDash(truck?.engineTransmission?.driveType)],
      ],
    },
    {
      title: 'Dimensions',
      rows: [
        ['Length', valueOrDash(truck?.dimensions?.length), 'Width', valueOrDash(truck?.dimensions?.width)],
        ['Height', valueOrDash(truck?.dimensions?.height), 'Wheel Base', valueOrDash(truck?.dimensions?.wheelBase)],
        ['Ground Clearance', valueOrDash(truck?.dimensions?.groundClearance)],
      ],
    },
    {
      title: 'Tyres',
      rows: [
        ['Tyre Size', valueOrDash(truck?.tyres?.tyreSize), 'Number Of Tires', valueOrDash(truck?.tyres?.numberOfTires)],
        ['Tyre Condition', valueOrDash(truck?.tyres?.tyreCondition)],
      ],
    },
    {
      title: 'Body',
      rows: [
        ['Body Type', valueOrDash(truck?.body?.bodyType), 'Body Material', valueOrDash(truck?.body?.bodyMaterial)],
        ['Chassis Number', valueOrDash(truck?.body?.chassisNumber), 'Cabin Type', valueOrDash(truck?.body?.cabinType)],
        ['Steering', valueOrDash(truck?.body?.steering)],
      ],
    },
    {
      title: 'Usage & Registration',
      rows: [
        ['Mileage', valueOrDash(truck?.usage?.mileage), 'Number Of Owners', valueOrDash(truck?.usage?.numberOfOwners)],
        ['Registration City', valueOrDash(truck?.usage?.registrationCity), 'Registration Status', valueOrDash(truck?.usage?.registrationStatus)],
      ],
    },
    {
      title: 'Features',
      rows: [
        ['AC', valueOrDash(truck?.features?.ac), 'Power Steering', valueOrDash(truck?.features?.powerSteering)],
        ['ABS', valueOrDash(truck?.features?.abs), 'Differential Lock', valueOrDash(truck?.features?.differentialLock)],
        ['PTO', valueOrDash(truck?.features?.pto), 'Reverse Camera', valueOrDash(truck?.features?.reverseCamera)],
        ['GPS Tracker', valueOrDash(truck?.features?.gpsTracker), 'Cruise Control', valueOrDash(truck?.features?.cruiseControl)],
      ],
    },
    // {
    //   title: 'Delivery & Review',
    //   rows: [
    //     ['Delivery Provided', valueOrDash(truck?.deliveryProvided), 'Rejection Reason', valueOrDash(truck?.rejectionReason)],
    //   ],
    // },
  ];

  return (
    <div className="truck-figma-details-stack">
      {sections.map((section) => (
        <DetailsTableCard
          key={section.title}
          title={section.title}
          rows={section.rows.filter((row) => row[1] !== '—' || row[3])}
        />
      ))}

      {truck?.deliveryLocations?.length ? (
        <section className="truck-figma-specs-card truck-figma-specs-card--compact">
          <h3>Delivery Locations</h3>
          <div className="truck-figma-specs-table">
            {truck.deliveryLocations.map((item, index) => (
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

export default TruckDetailsInfoSections;
