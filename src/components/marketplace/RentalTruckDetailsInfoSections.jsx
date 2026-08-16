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

function RentalTruckDetailsInfoSections({ rentalTruck }) {
  const sections = [
    {
      title: 'Listing Overview',
      rows: [
        ['Category', valueOrDash(rentalTruck?.category?.name), 'Subcategory', valueOrDash(rentalTruck?.subcategory?.name)],
        ['Brand', valueOrDash(rentalTruck?.brand), 'Truck Status', valueOrDash(rentalTruck?.truckStatus)],
        ['Wheel Type', valueOrDash(rentalTruck?.wheelType), 'Drive Type', valueOrDash(rentalTruck?.driveType)],
        ['Manufacturing Year', valueOrDash(rentalTruck?.manufacturingYear), 'Model Year', valueOrDash(rentalTruck?.modelYear)],
        ['Import Year', valueOrDash(rentalTruck?.importYear), 'City', valueOrDash(rentalTruck?.city)],
        ['Location', valueOrDash(rentalTruck?.location)],
        ['Original Documents', valueOrDash(rentalTruck?.originalDocuments), 'Approval Status', valueOrDash(rentalTruck?.approvalStatus)],
      ],
    },
    {
      title: 'Rental Details',
      rows: [
        ['Available From', formatDate(rentalTruck?.availableRentalDuration?.fromDate), 'Available To', formatDate(rentalTruck?.availableRentalDuration?.toDate)],
        ['Per Hour Rental Charges', valueOrDash(rentalTruck?.perHourRentalCharges ? `Rs. ${Number(rentalTruck.perHourRentalCharges).toLocaleString()}` : ''), 'Delivery Provided', valueOrDash(rentalTruck?.deliveryProvided)],
      ],
    },
    {
      title: 'Capacity',
      rows: [
        ['Payload Capacity', valueOrDash(rentalTruck?.capacity?.payloadCapacity), 'Gross Vehicle Weight', valueOrDash(rentalTruck?.capacity?.grossVehicleWeight)],
        ['Body Capacity', valueOrDash(rentalTruck?.capacity?.bodyCapacity), 'Tank Capacity', valueOrDash(rentalTruck?.capacity?.tankCapacity)],
        ['Drum Capacity', valueOrDash(rentalTruck?.capacity?.drumCapactiy)],
      ],
    },
    {
      title: 'Engine & Transmission',
      rows: [
        ['Engine Brand', valueOrDash(rentalTruck?.engineTransmission?.engineBrand), 'Engine Model', valueOrDash(rentalTruck?.engineTransmission?.engineModel)],
        ['Engine Capacity', valueOrDash(rentalTruck?.engineTransmission?.engineCapactiy), 'Horsepower', valueOrDash(rentalTruck?.engineTransmission?.engineHorsepower)],
        ['Torque', valueOrDash(rentalTruck?.engineTransmission?.torque), 'Emission Standard', valueOrDash(rentalTruck?.engineTransmission?.emissionStandard)],
        ['Fuel Type', valueOrDash(rentalTruck?.engineTransmission?.fuelType), 'Transmission', valueOrDash(rentalTruck?.engineTransmission?.transmission)],
        ['Drive Type', valueOrDash(rentalTruck?.engineTransmission?.driveType)],
      ],
    },
    {
      title: 'Dimensions',
      rows: [
        ['Length', valueOrDash(rentalTruck?.dimensions?.length), 'Width', valueOrDash(rentalTruck?.dimensions?.width)],
        ['Height', valueOrDash(rentalTruck?.dimensions?.height), 'Wheel Base', valueOrDash(rentalTruck?.dimensions?.wheelBase)],
        ['Ground Clearance', valueOrDash(rentalTruck?.dimensions?.groundClearance)],
      ],
    },
    {
      title: 'Tyres',
      rows: [
        ['Tyre Size', valueOrDash(rentalTruck?.tyres?.tyreSize), 'Number Of Tires', valueOrDash(rentalTruck?.tyres?.numberOfTires)],
        ['Tyre Condition', valueOrDash(rentalTruck?.tyres?.tyreCondition)],
      ],
    },
    {
      title: 'Body',
      rows: [
        ['Body Type', valueOrDash(rentalTruck?.body?.bodyType), 'Body Material', valueOrDash(rentalTruck?.body?.bodyMaterial)],
        ['Chassis Number', valueOrDash(rentalTruck?.body?.chassisNumber), 'Cabin Type', valueOrDash(rentalTruck?.body?.cabinType)],
        ['Steering', valueOrDash(rentalTruck?.body?.steering)],
      ],
    },
    {
      title: 'Usage & Registration',
      rows: [
        ['Mileage', valueOrDash(rentalTruck?.usage?.mileage), 'Number Of Owners', valueOrDash(rentalTruck?.usage?.numberOfOwners)],
        ['Registration City', valueOrDash(rentalTruck?.usage?.registrationCity), 'Registration Status', valueOrDash(rentalTruck?.usage?.registrationStatus)],
      ],
    },
    {
      title: 'Features',
      rows: [
        ['AC', valueOrDash(rentalTruck?.features?.ac), 'Power Steering', valueOrDash(rentalTruck?.features?.powerSteering)],
        ['ABS', valueOrDash(rentalTruck?.features?.abs), 'Differential Lock', valueOrDash(rentalTruck?.features?.differentialLock)],
        ['PTO', valueOrDash(rentalTruck?.features?.pto), 'Reverse Camera', valueOrDash(rentalTruck?.features?.reverseCamera)],
        ['GPS Tracker', valueOrDash(rentalTruck?.features?.gpsTracker), 'Cruise Control', valueOrDash(rentalTruck?.features?.cruiseControl)],
      ],
    },
    {
      title: 'Description',
      rows: [['Listing Description', valueOrDash(rentalTruck?.description)]],
    },
  ];

  return (
    <div className="truck-figma-details-stack">
      {sections.map((section) => (
        <DetailsTableCard key={section.title} rows={section.rows.filter((row) => row[1] !== '—' || row[3])} title={section.title} />
      ))}

      {rentalTruck?.deliveryLocations?.length ? (
        <section className="truck-figma-specs-card truck-figma-specs-card--compact">
          <h3>Delivery Locations</h3>
          <div className="truck-figma-specs-table">
            {rentalTruck.deliveryLocations.map((item, index) => (
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

export default RentalTruckDetailsInfoSections;
