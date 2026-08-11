import logo from '../../SBC LOGO.png';
import { getAcceptedRepairServiceOffer, getRepairServiceNegotiationTotals } from './repairServiceNegotiationUtils';

function formatCurrency(value) {
  return `Rs. ${Number(value || 0).toLocaleString()}`;
}

function RepairServicePurchaseOrder({ basicInfo, row }) {
  const acceptedOffer = getAcceptedRepairServiceOffer(row);
  const totals = getRepairServiceNegotiationTotals(acceptedOffer, basicInfo);

  if (!acceptedOffer) return null;

  return (
    <section className="dashboard-section-card truck-purchase-order">
      <div className="truck-purchase-order__header">
        <img alt="SBC Marketplace" src={logo} />
        <h1>PURCHASE ORDER</h1>
      </div>

      <div className="truck-purchase-order__party-grid">
        <div>
          <h2>Buyer:</h2>
          <p>{row.buyer?.fullName || row.buyer?.username || '—'}</p>
          <p>{row.buyer?.address || '—'}</p>
          <p>{[row.buyer?.city, row.buyer?.state, row.buyer?.zipCode].filter(Boolean).join(', ') || '—'}</p>
          <p>{row.buyer?.phoneNumber || '—'}</p>
        </div>
        <div>
          <h2>Seller:</h2>
          <p>{row.seller?.fullName || row.seller?.username || '—'}</p>
          <p>{row.seller?.address || '—'}</p>
          <p>{[row.seller?.city, row.seller?.state, row.seller?.zipCode].filter(Boolean).join(', ') || '—'}</p>
          <p>{row.seller?.phoneNumber || '—'}</p>
        </div>
      </div>

      <div className="truck-purchase-order__meta">
        <span>Purchase Order Date: {row.purhcaseOrderDate ? new Date(row.purhcaseOrderDate).toLocaleDateString() : '—'}</span>
        <span>Purchase Order No.: SBC-PO-{row._id?.slice(-6)?.toUpperCase()}</span>
      </div>

      <div className="truck-purchase-order__table-wrap">
        <table className="table truck-purchase-order__table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Repair Service Cost</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{row.repairService?.title || '—'}</td>
              <td>{row.repairService?.category?.map((item) => item?.name || item).join(', ') || '—'}</td>
              <td>{formatCurrency(totals.labourCharges)}</td>
              <td>{formatCurrency(totals.labourCharges)}</td>
            </tr>
            <tr>
              <td colSpan="2" />
              <td>Subtotal</td>
              <td>{formatCurrency(totals.labourCharges)}</td>
            </tr>
            <tr>
              <td colSpan="2" />
              <td>Delivery Cost</td>
              <td>{formatCurrency(totals.deliveryCost)}</td>
            </tr>
            <tr>
              <td colSpan="2" />
              <td>Advance Fee Amount</td>
              <td>{formatCurrency(totals.advanceFee)}</td>
            </tr>
            <tr>
              <td colSpan="2" />
              <td>Platform Fee</td>
              <td>{formatCurrency(totals.purchaseOrderPlatformFee)}</td>
            </tr>
            <tr>
              <td colSpan="2" />
              <td>Total</td>
              <td>{formatCurrency(totals.purchaseOrderTotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="truck-purchase-order__footer-grid">
        <div>
          <h3>Delivery Details</h3>
          <p>On-Site Service: {row.onSite ? 'Provided' : 'Not Provided'}</p>
          <p>On-Site Location: {row.buyerAddress || '—'}</p>
          <p>On-Site City: {row.buyerCity || '—'}</p>
        </div>
        <div>
          <h3>Special Instructions</h3>
          <p>All service execution and payments must be completed through the verified SBC Marketplace negotiation process.</p>
          <p>Buyer and seller must retain a copy of this purchase order for verification and dispute resolution.</p>
        </div>
      </div>
    </section>
  );
}

export default RepairServicePurchaseOrder;
