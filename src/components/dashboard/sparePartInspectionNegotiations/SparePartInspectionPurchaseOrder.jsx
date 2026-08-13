import { Link } from 'react-router-dom';
import logo from '../../SBC LOGO.png';
import { getAcceptedSparePartInspectionOffer, getSparePartInspectionNegotiationTotals } from './sparePartInspectionNegotiationUtils';

function formatCurrency(value) {
  return `Rs. ${Number(value || 0).toLocaleString()}`;
}

function SparePartInspectionPurchaseOrder({ basicInfo, reportBasePath, row }) {
  const acceptedOffer = getAcceptedSparePartInspectionOffer(row);
  const totals = getSparePartInspectionNegotiationTotals(acceptedOffer, basicInfo);

  if (!acceptedOffer) return null;

  return (
    <>
      {row.sparePartInspectionReport?._id ? (
        <div className="dashboard-form-actions mb-3">
          <Link className="dashboard-action-btn" to={`${reportBasePath}/${row.sparePartInspectionReport._id}`}>View Inspection Report</Link>
        </div>
      ) : null}

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
                <th>Spare Part Inspection Service Cost</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{row.inspectionService?.title || '—'}</td>
                <td>{row.inspectionService?.category?.map((item) => item?.name || item).join(', ') || '—'}</td>
                <td>{formatCurrency(totals.labourCharges)}</td>
                <td>{formatCurrency(totals.labourCharges)}</td>
              </tr>
              <tr><td colSpan="2" /><td>Subtotal</td><td>{formatCurrency(totals.labourCharges)}</td></tr>
              <tr><td colSpan="2" /><td>Advance Fee Amount</td><td>{formatCurrency(totals.advanceFee)}</td></tr>
              <tr><td colSpan="2" /><td>Platform Fee</td><td>{formatCurrency(totals.purchaseOrderPlatformFee)}</td></tr>
              <tr><td colSpan="2" /><td>Total</td><td>{formatCurrency(totals.purchaseOrderTotal)}</td></tr>
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
            <p>All inspections, report approvals, and payments must be completed through the verified SBC Marketplace process.</p>
            <p>Buyer and seller must retain a copy of this purchase order for verification and dispute resolution.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default SparePartInspectionPurchaseOrder;
