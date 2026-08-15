export const normalizePercentage = (value) => {
  const numeric = Number(value) || 0;
  return numeric > 1 ? numeric / 100 : numeric;
};

export const getAcceptedFinanceTruckOffer = (row) => (row?.negotiation || []).find((item) => item.accepted);

export const getFinanceTruckNegotiationTotals = (offer, basicInfo) => {
  const downPayment = Number(offer?.downPayment) || 0;
  const deliveryAmount = Number(offer?.deliveryAmount) || 0;
  const totalAmount = Number(offer?.totalAmount) || 0;
  const agreedTotal = downPayment + deliveryAmount;
  const advancePercentage = normalizePercentage(basicInfo?.advancePercentage);
  const platformFeePercentage = normalizePercentage(basicInfo?.platformFeePercentage);
  const advanceFee = agreedTotal * advancePercentage;
  const advancePlatformFee = advanceFee * platformFeePercentage;
  const advanceTotalToPay = advanceFee + advancePlatformFee;
  const finalPlatformFee = agreedTotal * platformFeePercentage;
  const finalAmountToPay = agreedTotal - advanceFee + finalPlatformFee;
  const purchaseOrderPlatformFee = (agreedTotal - advanceFee) * platformFeePercentage;
  const purchaseOrderTotal = agreedTotal + purchaseOrderPlatformFee;

  return {
    downPayment,
    deliveryAmount,
    totalAmount,
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
