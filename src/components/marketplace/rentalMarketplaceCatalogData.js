import equipmentExcavator from '../../assets/figma/equipment-excavator.jpg';
import equipmentForklift from '../../assets/figma/equipment-forklift.jpg';
import equipmentLoader from '../../assets/figma/equipment-loader.png';

const fallbackImages = [equipmentExcavator, equipmentForklift, equipmentLoader];

const formatCurrency = (value) => (value ? `Rs. ${Number(value).toLocaleString()}` : 'Call for Quote');

export const normalizeRentalTruckListing = (truck, index) => {
  const specLeft = [
    `Brand: ${truck.brand || '—'}`,
    `Manufacturing Year: ${truck.manufacturingYear || '—'}`,
    `Location: ${truck.location || '—'}`,
    `Category: ${truck.category?.name || '—'}`,
  ];
  const specRight = [
    `Truck Status: ${truck.truckStatus || '—'}`,
    `Rental Duration: ${truck.availableRentalDuration?.fromDate && truck.availableRentalDuration?.toDate ? 'Scheduled' : 'Flexible'}`,
    `Drive Type: ${truck.driveType || '—'}`,
    `Delivery: ${truck.deliveryProvided ? 'Available' : 'Not provided'}`,
  ];

  return {
    _id: truck._id,
    title: truck.title || 'Rental Truck Listing',
    image: truck.images?.[0]?.url || fallbackImages[index % fallbackImages.length],
    price: formatCurrency(truck.perHourRentalCharges),
    quantity: '1',
    detailA: `Rental Status: ${truck.truckStatus ? truck.truckStatus.charAt(0).toUpperCase() + truck.truckStatus.slice(1) : 'Available'}`,
    detailB: `Mileage: ${truck.usage?.mileage ? `${truck.usage.mileage} km` : 'N/A'}`,
    specs: specLeft,
    specs2: specRight,
    buttonLabel: 'View Details',
  };
};

export const normalizeRentalMachineryListing = (machinery, index) => {
  const specLeft = [
    `Brand: ${machinery.brand || '—'}`,
    `Manufacturing Year: ${machinery.manufacturingYear || '—'}`,
    `Location: ${machinery.location || '—'}`,
    `Category: ${machinery.category?.name || '—'}`,
  ];
  const specRight = [
    `Condition: ${machinery.condition ? `${machinery.condition.charAt(0).toUpperCase()}${machinery.condition.slice(1)}` : '—'}`,
    `Hours: ${machinery.workingHours || '—'}`,
    `Rental Status: ${machinery.machineStatus || '—'}`,
    `Delivery: ${machinery.deliveryProvided ? 'Available' : 'Not provided'}`,
  ];

  return {
    _id: machinery._id,
    title: machinery.title || 'Rental Construction Machinery Listing',
    image: machinery.images?.[0]?.url || fallbackImages[index % fallbackImages.length],
    price: formatCurrency(machinery.perHourRentalCharges),
    quantity: machinery.quantity || '1',
    detailA: `Rental Status: ${machinery.machineStatus ? `${machinery.machineStatus.charAt(0).toUpperCase()}${machinery.machineStatus.slice(1)}` : 'Available'}`,
    detailB: `Working Hours: ${machinery.workingHours ? `${machinery.workingHours} hrs` : 'N/A'}`,
    specs: specLeft,
    specs2: specRight,
    buttonLabel: 'View Details',
  };
};
