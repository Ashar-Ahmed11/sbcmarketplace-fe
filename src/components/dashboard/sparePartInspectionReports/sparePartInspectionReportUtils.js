export const sparePartInspectionReportSections = [
  { key: 'physicalCondition', label: 'Physical Condition', iconClass: 'fa fa-wrench' },
];

export const createEmptySparePartInspectionReportForm = () => ({
  inspectionRequester: '',
  sparePartInspectionNegotiation: '',
  status: 'pending approval',
  rejectionReason: '',
  inspectionDate: new Date().toISOString().slice(0, 10),
  brandVerification: { verified: false },
  physicalCondition: { score: '', images: [] },
  packagingCondition: { isPackagingAvailable: false, score: '', images: [] },
});

export const getSparePartInspectionOverallScore = (report) => {
  const physicalConditionScore = Number(report?.physicalCondition?.score) || 0;
  const packagingAvailable = Boolean(report?.packagingCondition?.isPackagingAvailable);
  const packagingScore = Number(report?.packagingCondition?.score) || 0;

  if (!packagingAvailable) {
    return Math.round(physicalConditionScore);
  }

  return Math.round((physicalConditionScore * 0.5) + (packagingScore * 0.5));
};
