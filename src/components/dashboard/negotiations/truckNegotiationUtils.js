export const normalizePercentage = (value) => {
  const numeric = Number(value) || 0;
  return numeric > 1 ? numeric / 100 : numeric;
};

export const getAcceptedOffer = (row) => (row?.negotiation || []).find((item) => item.accepted);

export const getNegotiationTotals = (offer, basicInfo) => {
  const truckCost = Number(offer?.truckCost) || 0;
  const deliveryCost = Number(offer?.deliveryCost) || 0;
  const agreedTotal = truckCost + deliveryCost;
  const advancePercentage = normalizePercentage(basicInfo?.advancePercentage);
  const platformFeePercentage = normalizePercentage(basicInfo?.platformFeePercentage);
  const advanceFee = agreedTotal * advancePercentage;
  const advancePlatformFee = advanceFee * platformFeePercentage;
  const advanceTotalToPay = advanceFee + advancePlatformFee;
  const finalPlatformFee = agreedTotal * platformFeePercentage;
  const finalAmountToPay = agreedTotal - advanceFee + finalPlatformFee;
  const purchaseOrderPlatformFee = (agreedTotal - advanceFee) * platformFeePercentage;
  const purchaseOrderTotal = agreedTotal - advanceFee + purchaseOrderPlatformFee;

  return {
    truckCost,
    deliveryCost,
    agreedTotal,
    advancePercentage,
    platformFeePercentage,
    advanceFee,
    advancePlatformFee,
    advanceTotalToPay,
    finalPlatformFee,
    finalAmountToPay,
    purchaseOrderPlatformFee,
    purchaseOrderTotal,
  };
};
