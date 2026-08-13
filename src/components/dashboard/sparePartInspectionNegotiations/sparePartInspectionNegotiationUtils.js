export const normalizePercentage = (value) => {
  const numeric = Number(value) || 0;
  return numeric > 1 ? numeric / 100 : numeric;
};

export const formatInspectionDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString();
};

export const formatInspectionTime = (value) => {
  if (!value || typeof value !== 'string' || !value.includes(':')) return '—';
  const [hoursRaw, minutesRaw] = value.split(':');
  const hours = Number(hoursRaw);
  const minutes = Number(minutesRaw);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return '—';
  const formattedHour = ((hours + 11) % 12) + 1;
  const suffix = hours >= 12 ? 'PM' : 'AM';
  return `${formattedHour}:${String(minutes).padStart(2, '0')} ${suffix}`;
};

export const formatInspectionSchedule = (dateValue, timeValue) => {
  const dateText = formatInspectionDate(dateValue);
  const timeText = formatInspectionTime(timeValue);
  if (dateText === '—' && timeText === '—') return 'Schedule to be confirmed';
  if (dateText === '—') return timeText;
  if (timeText === '—') return dateText;
  return `${dateText} at ${timeText}`;
};

export const getAcceptedSparePartInspectionOffer = (row) => (row?.negotiation || []).find((item) => item.accepted);

export const getSparePartInspectionNegotiationTotals = (offer, basicInfo) => {
  const labourCharges = Number(offer?.labourCharges) || 0;
  const deliveryCost = 0;
  const agreedTotal = labourCharges + deliveryCost;
  const advancePercentage = normalizePercentage(basicInfo?.advancePercentage);
  const platformFeePercentage = normalizePercentage(basicInfo?.platformFeePercentage);
  const advanceFee = agreedTotal * advancePercentage;
  const advancePlatformFee = advanceFee * platformFeePercentage;
  const advanceTotalToPay = advanceFee + advancePlatformFee;
  const finalPlatformFee = agreedTotal * platformFeePercentage;
  const finalAmountToPay = agreedTotal - advanceFee + finalPlatformFee;
  const purchaseOrderPlatformFee = labourCharges * platformFeePercentage;
  const purchaseOrderTotal = labourCharges + purchaseOrderPlatformFee;

  return {
    labourCharges,
    deliveryCost,
    agreedTotal,
    advanceFee,
    advancePlatformFee,
    advanceTotalToPay,
    finalPlatformFee,
    finalAmountToPay,
    purchaseOrderPlatformFee,
    purchaseOrderTotal,
  };
};

export const getSparePartInspectionReportStatus = (row) => {
  if (!row?.sparePartInspectionReport?._id) return 'pending';
  return row?.sparePartInspectionReport?.status || 'pending approval';
};
