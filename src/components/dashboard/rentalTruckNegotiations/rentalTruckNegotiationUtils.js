export const normalizePercentage = (value) => {
  const numeric = Number(value) || 0;
  return numeric > 1 ? numeric / 100 : numeric;
};

export const getAcceptedRentalTruckOffer = (row) => (row?.negotiation || []).find((item) => item.accepted);

export const getRentalTruckNegotiationTotals = (offer, basicInfo) => {
  const securityDepositAmount = Number(offer?.securityDepositAmount) || 0;
  const perDayRentalCharges = Number(offer?.perDayRentalCharges) || 0;
  const deliveryCost = Number(offer?.deliveryCost) || 0;
  const mobilizationCost = Number(offer?.mobilizationCost) || 0;
  const demobilizationCost = Number(offer?.demobilizationCost) || 0;
  const advanceBaseTotal = securityDepositAmount + deliveryCost;
  const finalBaseTotal = securityDepositAmount + deliveryCost;
  const advancePercentage = normalizePercentage(basicInfo?.advancePercentage);
  const platformFeePercentage = normalizePercentage(basicInfo?.platformFeePercentage);
  const advanceFee = advanceBaseTotal * advancePercentage;
  const advancePlatformFee = advanceFee * platformFeePercentage;
  const advanceTotalToPay = advanceFee + advancePlatformFee;
  const finalPlatformFee = finalBaseTotal * platformFeePercentage;
  const finalAmountToPay = finalBaseTotal - advanceFee + finalPlatformFee;
  const purchaseOrderPlatformFee = advanceBaseTotal * platformFeePercentage;
  const purchaseOrderTotal = advanceBaseTotal + purchaseOrderPlatformFee;

  return {
    securityDepositAmount,
    perDayRentalCharges,
    deliveryCost,
    mobilizationCost,
    demobilizationCost,
    advanceBaseTotal,
    finalBaseTotal,
    advanceFee,
    advancePlatformFee,
    advanceTotalToPay,
    finalPlatformFee,
    finalAmountToPay,
    purchaseOrderPlatformFee,
    purchaseOrderTotal,
  };
};
