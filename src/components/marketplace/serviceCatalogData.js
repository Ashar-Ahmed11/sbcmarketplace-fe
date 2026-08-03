import equipmentExcavator from '../../assets/figma/equipment-excavator.jpg';
import equipmentForklift from '../../assets/figma/equipment-forklift.jpg';
import equipmentLoader from '../../assets/figma/equipment-loader.png';

const fallbackImages = [equipmentExcavator, equipmentForklift, equipmentLoader];

export const normalizeConstructionServiceListing = (constructionService, index) => {
  const serviceAreas = constructionService.serviceAreas?.map((item) => item.city).filter(Boolean).slice(0, 2).join(', ') || '—';
  const specLeft = [
    `Company Type: ${constructionService.companyType || '—'}`,
    `Experience: ${constructionService.yearsOfExperience || '—'} years`,
    `Location: ${constructionService.location || '—'}`,
    `Category: ${constructionService.category?.name || '—'}`,
  ];
  const specRight = [
    `Team Size: ${constructionService.teamSize || '—'}`,
    `Onsite Service: ${constructionService.offerOnsiteService ? 'Available' : 'Not offered'}`,
    `Service Areas: ${serviceAreas}`,
    `Subcategories: ${constructionService.subcategory?.length || 0}`,
  ];

  return {
    _id: constructionService._id,
    title: constructionService.title || 'Construction Service Listing',
    image: constructionService.images?.[0]?.url || fallbackImages[index % fallbackImages.length],
    price: 'Call for Quote',
    quantity: constructionService.teamSize || '—',
    detailA: `Company Type: ${constructionService.companyType || 'N/A'}`,
    detailB: `Experience: ${constructionService.yearsOfExperience || 'N/A'} years`,
    specs: specLeft,
    specs2: specRight,
    buttonLabel: 'View Details',
  };
};

export const normalizeInspectionServiceListing = (inspectionService, index) => {
  const areas = inspectionService.inspectionAreas?.map((item) => item.city).filter(Boolean).slice(0, 2).join(', ') || '—';

  return {
    _id: inspectionService._id,
    title: inspectionService.title || 'Inspection Service Listing',
    image: inspectionService.images?.[0]?.url || fallbackImages[index % fallbackImages.length],
    price: 'Call for Quote',
    quantity: inspectionService.teamSize || '—',
    detailA: `Experience: ${inspectionService.yearsOfExperience || 'N/A'} years`,
    detailB: `Inspection Areas: ${areas}`,
    specs: [
      `Team Size: ${inspectionService.teamSize || '—'}`,
      `Location: ${inspectionService.location || '—'}`,
      `Onsite Inspection: ${inspectionService.offerOnsiteInspection ? 'Available' : 'Not offered'}`,
      `Categories: ${inspectionService.category?.length || 0}`,
    ],
    specs2: [
      `Categories: ${inspectionService.category?.map((item) => item.name || item).slice(0, 2).join(', ') || '—'}`,
    ],
    buttonLabel: 'View Details',
  };
};

export const normalizeRepairServiceListing = (repairService, index) => {
  const areas = repairService.repairAreas?.map((item) => item.city).filter(Boolean).slice(0, 2).join(', ') || '—';

  return {
    _id: repairService._id,
    title: repairService.title || 'Repair Service Listing',
    image: repairService.images?.[0]?.url || fallbackImages[index % fallbackImages.length],
    price: 'Call for Quote',
    quantity: repairService.teamSize || '—',
    detailA: `Experience: ${repairService.yearsOfExperience || 'N/A'} years`,
    detailB: `Repair Areas: ${areas}`,
    specs: [
      `Team Size: ${repairService.teamSize || '—'}`,
      `Location: ${repairService.location || '—'}`,
      `Onsite Repair: ${repairService.offerOnsiteRepair ? 'Available' : 'Not offered'}`,
      `Categories: ${repairService.category?.length || 0}`,
    ],
    specs2: [
      `Categories: ${repairService.category?.map((item) => item.name || item).slice(0, 2).join(', ') || '—'}`,
    ],
    buttonLabel: 'View Details',
  };
};
