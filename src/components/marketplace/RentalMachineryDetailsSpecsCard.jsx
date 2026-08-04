function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString();
}

function RentalMachineryDetailsSpecsCard({ rentalMachinery }) {
  const statBadges = [
    { icon: 'fa fa-info-circle', label: 'Rental Status', value: rentalMachinery?.machineStatus ? `${rentalMachinery.machineStatus.charAt(0).toUpperCase()}${rentalMachinery.machineStatus.slice(1)}` : 'Available', accent: true },
    { icon: 'fa fa-history', label: 'Working Hours', value: rentalMachinery?.workingHours ? `${Number(rentalMachinery.workingHours).toLocaleString()} hrs` : 'N/A' },
    { icon: 'fa fa-calendar', label: 'Rental Period', value: rentalMachinery?.availableRentalDuration?.fromDate && rentalMachinery?.availableRentalDuration?.toDate ? `${formatDate(rentalMachinery.availableRentalDuration.fromDate)} - ${formatDate(rentalMachinery.availableRentalDuration.toDate)}` : 'Flexible' },
  ];

  const specRows = [
    ['Brand', rentalMachinery?.brand || '—', 'Category', rentalMachinery?.category?.name || '—'],
    ['Manufacture Year', rentalMachinery?.manufacturingYear || '—', 'Quantity', rentalMachinery?.quantity || '—'],
    ['Per Hour Rental', rentalMachinery?.perHourRentalCharges ? `Rs. ${Number(rentalMachinery.perHourRentalCharges).toLocaleString()}` : 'Call for Quote', 'Delivery', rentalMachinery?.deliveryProvided ? 'Seller Delivery' : 'Buyer Pickup Only'],
  ];

  return (
    <section className="truck-figma-specs-card">
      <h3>{rentalMachinery?.title || 'Rental Construction Machinery Listing'}</h3>
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
            <strong><i className="fa fa-map-marker" aria-hidden="true" /> {rentalMachinery?.location || 'Pakistan'}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RentalMachineryDetailsSpecsCard;
