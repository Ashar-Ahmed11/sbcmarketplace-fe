export const machineryInspectionReportSections = [
  { key: 'engineCondition', label: 'Engine Condition', iconClass: 'fa fa-cogs' },
  { key: 'hydraulicSystem', label: 'Hydraulic System', iconClass: 'fa fa-tint' },
  { key: 'transmission', label: 'Transmission', iconClass: 'fa fa-gear' },
  { key: 'undercarriage', label: 'Undercarriage', iconClass: 'fa fa-truck' },
  { key: 'boomAndArm', label: 'Boom And Arm', iconClass: 'fa fa-wrench' },
  { key: 'bucket', label: 'Bucket', iconClass: 'fa fa-briefcase' },
  { key: 'tyresOrTracks', label: 'Tyres Or Tracks', iconClass: 'fa fa-circle-o-notch' },
  { key: 'cabin', label: 'Cabin', iconClass: 'fa fa-building-o' },
  { key: 'electricalSystem', label: 'Electrical System', iconClass: 'fa fa-bolt' },
  { key: 'hourMeter', label: 'Hour Meter', iconClass: 'fa fa-clock-o' },
];

export const createEmptyMachineryInspectionReportForm = () => ({
  inspectionRequester: '',
  machineryInspectionNegotiation: '',
  status: 'pending approval',
  rejectionReason: '',
  inspectionDate: new Date().toISOString().slice(0, 10),
  engineCondition: { score: '', images: [] },
  hydraulicSystem: { score: '', images: [] },
  transmission: { score: '', images: [] },
  undercarriage: { score: '', images: [] },
  boomAndArm: { score: '', images: [] },
  bucket: { score: '', images: [] },
  tyresOrTracks: { score: '', images: [] },
  cabin: { score: '', images: [] },
  electricalSystem: { score: '', images: [] },
  hourMeter: { score: '', images: [] },
  leakage: { isLeaked: false, images: [] },
});

export const getMachineryInspectionOverallScore = (report) => {
  const values = machineryInspectionReportSections.map(({ key }) => Number(report?.[key]?.score) || 0);
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, item) => sum + item, 0) / values.length);
};
