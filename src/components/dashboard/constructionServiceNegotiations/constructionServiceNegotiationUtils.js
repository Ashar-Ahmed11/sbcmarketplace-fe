export const normalizePercentage = (value) => {
  const numeric = Number(value) || 0;
  return numeric > 1 ? numeric / 100 : numeric;
};

export const getAcceptedConstructionServiceOffer = (row) => (row?.negotiation || []).find((item) => item.accepted);

export const getPendingConstructionServiceMilestone = (offer) => (offer?.milestones || []).find((item) => !item.isCompleted);

export const getConstructionServiceProgress = (offer) => {
  const milestones = offer?.milestones || [];
  if (!milestones.length) return 0;
  const completed = milestones.filter((item) => item.isCompleted).length;
  return Math.round((completed / milestones.length) * 100);
};

export const getConstructionServiceNegotiationTotals = (offer, basicInfo) => {
  const labourCharges = Number(offer?.labourCharges) || 0;
  const deliveryCost = 0;
  const agreedTotal = labourCharges;
  const pendingMilestone = getPendingConstructionServiceMilestone(offer);
  const milestoneCharge = Number(pendingMilestone?.charges) || 0;
  const advancePercentage = normalizePercentage(basicInfo?.advancePercentage);
  const platformFeePercentage = normalizePercentage(basicInfo?.platformFeePercentage);
  const advanceFee = agreedTotal * advancePercentage;
  const advancePlatformFee = advanceFee * platformFeePercentage;
  const advanceTotalToPay = advanceFee + advancePlatformFee;
  const finalPlatformFee = (pendingMilestone ? milestoneCharge : agreedTotal) * platformFeePercentage;
  const finalAmountToPay = pendingMilestone
    ? milestoneCharge + finalPlatformFee
    : agreedTotal - advanceFee + finalPlatformFee;
  const purchaseOrderPlatformFee = agreedTotal * platformFeePercentage;
  const purchaseOrderTotal = agreedTotal + purchaseOrderPlatformFee;

  return {
    labourCharges,
    deliveryCost,
    agreedTotal,
    milestoneCharge,
    advanceFee,
    advancePlatformFee,
    advanceTotalToPay,
    finalPlatformFee,
    finalAmountToPay,
    purchaseOrderPlatformFee,
    purchaseOrderTotal,
  };
};
