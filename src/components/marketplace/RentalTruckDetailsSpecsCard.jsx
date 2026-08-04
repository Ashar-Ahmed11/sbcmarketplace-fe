function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString();
}

function RentalTruckDetailsSpecsCard({ rentalTruck }) {
  const statBadges = [
    { icon: 'fa fa-info-circle', label: 'Rental Status', value: rentalTruck?.truckStatus ? `${rentalTruck.truckStatus.charAt(0).toUpperCase()}${rentalTruck.truckStatus.slice(1)}` : 'Available', accent: true },
    { icon: 'fa fa-history', label: 'Mileage', value: rentalTruck?.usage?.mileage ? `${Number(rentalTruck.usage.mileage).toLocaleString()} km` : 'N/A' },
    { icon: 'fa fa-calendar', label: 'Rental Period', value: rentalTruck?.availableRentalDuration?.fromDate && rentalTruck?.availableRentalDuration?.toDate ? `${formatDate(rentalTruck.availableRentalDuration.fromDate)} - ${formatDate(rentalTruck.availableRentalDuration.toDate)}` : 'Flexible' },
  ];

  const specRows = [
    ['Brand', rentalTruck?.brand || '—', 'Category', rentalTruck?.category?.name || '—'],
    ['Manufacture Year', rentalTruck?.manufacturingYear || '—', 'Model Year', rentalTruck?.modelYear || '—'],
    ['Per Hour Rental', rentalTruck?.perHourRentalCharges ? `Rs. ${Number(rentalTruck.perHourRentalCharges).toLocaleString()}` : 'Call for Quote', 'Delivery', rentalTruck?.deliveryProvided ? 'Seller Delivery' : 'Buyer Pickup Only'],
  ];

  return (
    <section className="truck-figma-specs-card">
      <h3>{rentalTruck?.title || 'Rental Truck Listing'}</h3>
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
        <div className="truck-figma-specs-row alt full">
          <div className="truck-figma-specs-cell">
            <span>Location</span>
            <strong><i className="fa fa-map-marker" aria-hidden="true" /> {rentalTruck?.location || 'Pakistan'}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RentalTruckDetailsSpecsCard;
