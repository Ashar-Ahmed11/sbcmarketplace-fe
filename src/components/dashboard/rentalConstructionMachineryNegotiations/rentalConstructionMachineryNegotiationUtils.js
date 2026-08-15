export const normalizePercentage = (value) => {
  const numeric = Number(value) || 0;
  return numeric > 1 ? numeric / 100 : numeric;
};

export const getAcceptedRentalConstructionMachineryOffer = (row) => (row?.negotiation || []).find((item) => item.accepted);

export const getRentalConstructionMachineryNegotiationTotals = (offer, basicInfo) => {
  const securityDepositAmount = Number(offer?.securityDepositAmount) || 0;
  const perDayRentalCharges = Number(offer?.perDayRentalCharges) || 0;
  const deliveryCost = Number(offer?.deliveryCost) || 0;
  const mobilizationCost = Number(offer?.mobilizationCost) || 0;
  const demobilizationCost = Number(offer?.demobilizationCost) || 0;
  const baseTotal = securityDepositAmount + deliveryCost;
  const advancePercentage = normalizePercentage(basicInfo?.advancePercentage);
  const platformFeePercentage = normalizePercentage(basicInfo?.platformFeePercentage);
  const advanceFee = baseTotal * advancePercentage;
  const advancePlatformFee = advanceFee * platformFeePercentage;
  const advanceTotalToPay = advanceFee + advancePlatformFee;
  const finalPlatformFee = baseTotal * platformFeePercentage;
  const finalAmountToPay = baseTotal - advanceFee + finalPlatformFee;
  const purchaseOrderPlatformFee = baseTotal * platformFeePercentage;
  const purchaseOrderTotal = baseTotal + purchaseOrderPlatformFee;

  return {
    securityDepositAmount,
    perDayRentalCharges,
    deliveryCost,
    mobilizationCost,
    demobilizationCost,
    advanceBaseTotal: baseTotal,
    finalBaseTotal: baseTotal,
    advanceFee,
    advancePlatformFee,
    advanceTotalToPay,
    finalPlatformFee,
    finalAmountToPay,
    purchaseOrderPlatformFee,
    purchaseOrderTotal,
  };
};
