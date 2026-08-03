import equipmentExcavator from '../../assets/figma/equipment-excavator.jpg';
import equipmentForklift from '../../assets/figma/equipment-forklift.jpg';
import equipmentLoader from '../../assets/figma/equipment-loader.png';

const fallbackImages = [equipmentExcavator, equipmentForklift, equipmentLoader];

const formatCurrency = (value) => (value ? Number(value).toLocaleString() : 'Call for Price');

export const normalizeTruckListing = (truck, index) => {
  const specLeft = [
    `Brand: ${truck.brand || '—'}`,
    `Manufacturing Year: ${truck.manufacturingYear || '—'}`,
    `Location: ${truck.location || '—'}`,
    `Category: ${truck.category?.name || '—'}`,
  ];
  const specRight = [
    `Model Year: ${truck.modelYear || '—'}`,
    `Wheel Type: ${truck.wheelType || '—'}`,
    `Drive Type: ${truck.driveType || '—'}`,
    `Delivery: ${truck.deliveryProvided ? 'Available' : 'Not provided'}`,
  ];

  return {
    _id: truck._id,
    title: truck.title || 'Truck Listing',
    image: truck.images?.[0]?.url || fallbackImages[index % fallbackImages.length],
    price: formatCurrency(truck.price),
    quantity: truck.quantity || '1',
    detailA: `Condition: ${truck.condition ? truck.condition.charAt(0).toUpperCase() + truck.condition.slice(1) : 'Used'}`,
    detailB: `Mileage: ${truck.usage?.mileage ? `${truck.usage.mileage} km` : 'N/A'}`,
    specs: specLeft,
    specs2: specRight,
    buttonLabel: 'View Details',
  };
};

export const normalizeMachineryListing = (machinery, index) => {
  const specLeft = [
    `Brand: ${machinery.brand || '—'}`,
    `Manufacturing Year: ${machinery.manufacturingYear || '—'}`,
    `Location: ${machinery.location || '—'}`,
    `Category: ${machinery.category?.name || '—'}`,
  ];
  const specRight = [
    `Condition: ${machinery.condition ? `${machinery.condition.charAt(0).toUpperCase()}${machinery.condition.slice(1)}` : '—'}`,
    `Hours: ${machinery.workingHours || '—'}`,
    `Status: ${machinery.machineStatus || '—'}`,
    `Delivery: ${machinery.deliveryProvided ? 'Available' : 'Not provided'}`,
  ];

  return {
    _id: machinery._id,
    title: machinery.title || 'Construction Machinery Listing',
    image: machinery.images?.[0]?.url || fallbackImages[index % fallbackImages.length],
    price: formatCurrency(machinery.price),
    quantity: machinery.quantity || '1',
    detailA: `Condition: ${machinery.condition ? `${machinery.condition.charAt(0).toUpperCase()}${machinery.condition.slice(1)}` : 'Used'}`,
    detailB: `Working Hours: ${machinery.workingHours ? `${machinery.workingHours} hrs` : 'N/A'}`,
    specs: specLeft,
    specs2: specRight,
    buttonLabel: 'View Details',
  };
};

export const normalizeMaterialListing = (material, index) => {
  const specLeft = [
    `Seller Type: ${material.sellerType || '—'}`,
    `Grade: ${material.grade || '—'}`,
    `Location: ${material.location || '—'}`,
    `Category: ${material.category?.name || '—'}`,
  ];
  const specRight = [
    `Brand Type: ${material.brand || '—'}`,
    `Unit: ${material.unit || '—'}`,
    `Subcategory: ${material.subcategory?.name || '—'}`,
    `Delivery: ${material.deliveryProvided ? 'Available' : 'Not provided'}`,
  ];

  return {
    _id: material._id,
    title: material.title || 'Construction Material Listing',
    image: material.images?.[0]?.url || fallbackImages[index % fallbackImages.length],
    price: formatCurrency(material.price),
    quantity: material.quantity || '1',
    detailA: `Grade: ${material.grade || 'N/A'}`,
    detailB: `Unit: ${material.unit || 'N/A'}`,
    specs: specLeft,
    specs2: specRight,
    buttonLabel: 'View Details',
  };
};

export const normalizeSparePartListing = (sparePart, index) => {
  const compatibleBrands = sparePart.compatibleBrands?.map((item) => item.brand).filter(Boolean).slice(0, 2).join(', ') || '—';
  const specLeft = [
    `Brand: ${sparePart.brand || '—'}`,
    `Manufacturing Year: ${sparePart.manufacturingYear || '—'}`,
    `Location: ${sparePart.location || '—'}`,
    `Category: ${sparePart.category?.name || '—'}`,
  ];
  const specRight = [
    `Condition: ${sparePart.condition ? `${sparePart.condition.charAt(0).toUpperCase()}${sparePart.condition.slice(1)}` : '—'}`,
    `Part Number: ${sparePart.partNumber || '—'}`,
    `Warranty: ${sparePart.warrantyProvided ? 'Available' : 'Not available'}`,
    `Fits: ${compatibleBrands}`,
  ];

  return {
    _id: sparePart._id,
    title: sparePart.title || 'Spare Part Listing',
    image: sparePart.images?.[0]?.url || fallbackImages[index % fallbackImages.length],
    price: formatCurrency(sparePart.price),
    quantity: sparePart.quantity || '1',
    detailA: `Condition: ${sparePart.condition ? `${sparePart.condition.charAt(0).toUpperCase()}${sparePart.condition.slice(1)}` : 'Used'}`,
    detailB: `Part Number: ${sparePart.partNumber || 'N/A'}`,
    specs: specLeft,
    specs2: specRight,
    buttonLabel: 'View Details',
  };
};
