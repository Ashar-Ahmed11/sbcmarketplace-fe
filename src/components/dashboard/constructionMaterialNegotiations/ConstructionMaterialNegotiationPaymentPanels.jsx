import { getConstructionMaterialNegotiationTotals } from './constructionMaterialNegotiationUtils';

function formatCurrency(value) {
  return `Rs. ${Number(value || 0).toLocaleString()}`;
}

function PaymentRow({ label, value }) {
  return (
    <div className="truck-negotiation-payment__row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ConstructionMaterialNegotiationPaymentPanels({ acceptedOffer, basicInfo, isBuyer, onOpenAdvanceProof, onOpenFinalProof, row }) {
  if (!acceptedOffer) return null;

  const totals = getConstructionMaterialNegotiationTotals(acceptedOffer, basicInfo);

  if (row.advanceStatus !== 'paid') {
    return (
      <section className="dashboard-section-card truck-negotiation-payment">
        <div className="truck-negotiation-payment__head">
          <div>
            <h1>Deal Status: Offer Accepted</h1>
            <p>Pay advance fee to move this deal forward.</p>
          </div>
          <span className={`status-badge ${row.advanceStatus}`}>{row.advanceStatus}</span>
        </div>
        <div className="truck-negotiation-payment__card">
          <h2>Pay Advance Fee</h2>
          <PaymentRow label="Construction Material Cost" value={formatCurrency(totals.constructionMaterialCost)} />
          <PaymentRow label="Delivery Cost" value={formatCurrency(totals.deliveryCost)} />
          <PaymentRow label={`Advance Fee (${basicInfo.advancePercentage}%)`} value={formatCurrency(totals.advanceFee)} />
          <PaymentRow label={`Platform Fee (${basicInfo.platformFeePercentage}%)`} value={formatCurrency(totals.advancePlatformFee)} />
          <PaymentRow label="Total Amount to be Paid" value={formatCurrency(totals.advanceTotalToPay)} />
          {isBuyer ? (
            <div className="truck-negotiation-payment__actions">
              <button className="dashboard-action-btn" onClick={onOpenAdvanceProof} type="button">Upload Payment Proof</button>
              <button className="dashboard-secondary-btn" type="button">Pay Online</button>
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  if (row.finalPaymentStatus !== 'paid') {
    return (
      <section className="dashboard-section-card truck-negotiation-payment">
        <div className="truck-negotiation-payment__head">
          <div>
            <h1>Final Payment</h1>
            <p>Advance fee has been approved. Final payment is now due.</p>
          </div>
          <span className={`status-badge ${row.finalPaymentStatus}`}>{row.finalPaymentStatus}</span>
        </div>
        <div className="truck-negotiation-payment__card">
          <h2>Pay Full Amount</h2>
          <PaymentRow label="Agreed Construction Material Cost" value={formatCurrency(totals.constructionMaterialCost)} />
          {row.sellerDelivery ? <PaymentRow label="Agreed Delivery Cost" value={formatCurrency(totals.deliveryCost)} /> : null}
          <PaymentRow label="Agreed Total Cost" value={formatCurrency(totals.agreedTotal)} />
          <PaymentRow label="Advance Fee Paid" value="Yes" />
          <PaymentRow label="Advance Fee Amount" value={formatCurrency(totals.advanceFee)} />
          <PaymentRow label="Platform Fee" value={formatCurrency(totals.finalPlatformFee)} />
          <PaymentRow label="Amount to be Paid" value={formatCurrency(totals.finalAmountToPay)} />
          {isBuyer ? (
            <div className="truck-negotiation-payment__actions">
              <button className="dashboard-action-btn" onClick={onOpenFinalProof} type="button">Upload Payment Proof</button>
              <button className="dashboard-secondary-btn" type="button">Pay Online</button>
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-section-card truck-negotiation-payment">
      <div className="truck-negotiation-payment__head">
        <div>
          <h1>Negotiation Successful</h1>
          <p>Final payment has been approved and the purchase order is now available.</p>
        </div>
        <span className="status-badge approved">paid</span>
      </div>
    </section>
  );
}

export default ConstructionMaterialNegotiationPaymentPanels;
