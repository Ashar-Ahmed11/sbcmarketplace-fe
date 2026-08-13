export const constructionMaterialInspectionReportSections = [
  { key: 'quality', label: 'Quality', iconClass: 'fa fa-certificate' },
];

export const createEmptyConstructionMaterialInspectionReportForm = () => ({
  inspectionRequester: '',
  constructionMaterialInspectionNegotiation: '',
  status: 'pending approval',
  rejectionReason: '',
  inspectionDate: new Date().toISOString().slice(0, 10),
  quantityVerification: { verified: false },
  quality: { score: '', images: [] },
  manufacturingDate: '',
  expiryDate: '',
  packagingCondition: { isPackagingAvailable: false, score: '', images: [] },
});

export const getConstructionMaterialInspectionOverallScore = (report) => {
  const qualityScore = Number(report?.quality?.score) || 0;
  const packagingAvailable = Boolean(report?.packagingCondition?.isPackagingAvailable);
  const packagingScore = Number(report?.packagingCondition?.score) || 0;

  if (!packagingAvailable) {
    return Math.round(qualityScore);
  }

  return Math.round((qualityScore * 0.5) + (packagingScore * 0.5));
};
