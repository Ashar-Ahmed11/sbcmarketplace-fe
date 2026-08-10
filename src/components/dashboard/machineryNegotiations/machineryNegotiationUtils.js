export const normalizePercentage = (value) => {
  const numeric = Number(value) || 0;
  return numeric > 1 ? numeric / 100 : numeric;
};

export const getAcceptedMachineryOffer = (row) => (row?.negotiation || []).find((item) => item.accepted);

export const getMachineryNegotiationTotals = (offer, basicInfo) => {
  const machineryCost = Number(offer?.machineryCost) || 0;
  const deliveryCost = Number(offer?.deliveryCost) || 0;
  const agreedTotal = machineryCost + deliveryCost;
  const advancePercentage = normalizePercentage(basicInfo?.advancePercentage);
  const platformFeePercentage = normalizePercentage(basicInfo?.platformFeePercentage);
  const advanceFee = agreedTotal * advancePercentage;
  const advancePlatformFee = advanceFee * platformFeePercentage;
  const advanceTotalToPay = advanceFee + advancePlatformFee;
  const finalPlatformFee = agreedTotal * platformFeePercentage;
  const finalAmountToPay = agreedTotal - advanceFee + finalPlatformFee;
  const purchaseOrderPlatformFee = agreedTotal * platformFeePercentage;
  const purchaseOrderTotal = agreedTotal + purchaseOrderPlatformFee;

  return {
    machineryCost,
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
