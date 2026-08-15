import { Link } from 'react-router-dom';
import logo from '../../SBC LOGO.png';
import { getAcceptedFinanceTruckOffer, getFinanceTruckNegotiationTotals } from './financeTruckNegotiationUtils';

function formatCurrency(value) {
  return `Rs. ${Number(value || 0).toLocaleString()}`;
}

function FinanceTruckPurchaseOrder({ basicInfo, installmentsBasePath, row }) {
  const acceptedOffer = getAcceptedFinanceTruckOffer(row);
  const totals = getFinanceTruckNegotiationTotals(acceptedOffer, basicInfo);

  if (!acceptedOffer) return null;

  return (
    <>
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
                <th>Truck Brand</th>
                <th>Truck Down Payment</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{row.truck?.title || '—'}</td>
                <td>{row.truck?.category?.name || '—'}</td>
                <td>{row.truck?.brand || '—'}</td>
                <td>{formatCurrency(totals.downPayment)}</td>
                <td>{formatCurrency(totals.downPayment)}</td>
              </tr>
              <tr><td colSpan="3" /><td>Subtotal</td><td>{formatCurrency(totals.downPayment)}</td></tr>
              <tr><td colSpan="3" /><td>Delivery Cost</td><td>{formatCurrency(totals.deliveryAmount)}</td></tr>
              <tr><td colSpan="3" /><td>Advance Fee Amount</td><td>{formatCurrency(totals.advanceFee)}</td></tr>
              <tr><td colSpan="3" /><td>Platform Fee</td><td>{formatCurrency(totals.purchaseOrderPlatformFee)}</td></tr>
              <tr><td colSpan="3" /><td>Total</td><td>{formatCurrency(totals.purchaseOrderTotal)}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="truck-purchase-order__footer-grid">
          <div>
            <h3>Delivery Details</h3>
            <p>Delivery Location: {row.buyerDeliveryAddress || '—'}</p>
            <p>Delivery City: {row.buyerDeliveryCity || '—'}</p>
          </div>
          <div>
            <h3>Finance Summary</h3>
            <p>Total Amount: {formatCurrency(acceptedOffer.totalAmount)}</p>
            <p>Installments: {acceptedOffer.installments?.length || 0}</p>
          </div>
        </div>

        {(acceptedOffer.installments || []).length ? (
          <div className="truck-purchase-order__table-wrap mt-4">
            <table className="table truck-purchase-order__table">
              <thead>
                <tr>
                  <th>Installment #</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {acceptedOffer.installments.map((installment, index) => (
                  <tr key={installment._id || index}>
                    <td>{index + 1}</td>
                    <td>{formatCurrency(installment.amount)}</td>
                    <td>{installment.date ? new Date(installment.date).toLocaleDateString() : '—'}</td>
                    <td>{installment.status || 'unpaid'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <div className="truck-purchase-order__footer-grid mt-4">
          <div>
            <h3>Special Instructions</h3>
            <p>All financing, proof submissions, and installment verifications must be completed through SBC Marketplace.</p>
            <p>Buyer and seller should retain this purchase order for verification and dispute resolution.</p>
          </div>
        </div>
      </section>

      <div className="dashboard-form-actions mt-3">
        <Link className="dashboard-action-btn" to={`${installmentsBasePath}/${row._id}`}>Manage Installments</Link>
      </div>
    </>
  );
}

export default FinanceTruckPurchaseOrder;
