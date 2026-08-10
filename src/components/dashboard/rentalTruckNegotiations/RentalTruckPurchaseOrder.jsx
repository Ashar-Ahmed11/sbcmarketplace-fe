import logo from '../../SBC LOGO.png';
import { getAcceptedRentalTruckOffer, getRentalTruckNegotiationTotals } from './rentalTruckNegotiationUtils';

function formatCurrency(value) {
  return `Rs. ${Number(value || 0).toLocaleString()}`;
}

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : '—';
}

function RentalTruckPurchaseOrder({ basicInfo, row }) {
  const acceptedOffer = getAcceptedRentalTruckOffer(row);
  const totals = getRentalTruckNegotiationTotals(acceptedOffer, basicInfo);

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
              <th>Rental Truck Brand</th>
              <th>Security Deposit</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{row.rentalTruck?.title || '—'}</td>
              <td>{row.rentalTruck?.category?.name || '—'}</td>
              <td>{row.rentalTruck?.brand || '—'}</td>
              <td>{formatCurrency(totals.securityDepositAmount)}</td>
              <td>{formatCurrency(totals.securityDepositAmount)}</td>
            </tr>
            <tr>
              <td colSpan="3" />
              <td>Subtotal</td>
              <td>{formatCurrency(totals.securityDepositAmount)}</td>
            </tr>
            <tr>
              <td colSpan="3" />
              <td>Delivery Cost</td>
              <td>{formatCurrency(totals.deliveryCost)}</td>
            </tr>
            <tr>
              <td colSpan="3" />
              <td>Advance Fee Amount</td>
              <td>{formatCurrency(totals.advanceFee)}</td>
            </tr>
            <tr>
              <td colSpan="3" />
              <td>Platform Fee</td>
              <td>{formatCurrency(totals.purchaseOrderPlatformFee)}</td>
            </tr>
            <tr>
              <td colSpan="3" />
              <td>Total</td>
              <td>{formatCurrency(totals.purchaseOrderTotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="truck-purchase-order__footer-grid">
        <div>
          <h3>Delivery Details</h3>
          <p>Seller Delivery: {row.sellerDelivery ? 'Provided' : 'Not Provided'}</p>
          <p>Delivery Location: {row.buyerDeliveryAddress || '—'}</p>
          <p>Delivery City: {row.buyerDeliveryCity || '—'}</p>
        </div>
        <div>
          <h3>Rental Terms</h3>
          <p>Per Day Rental Charges: {formatCurrency(acceptedOffer.perDayRentalCharges)}</p>
          <p>Mobilization Cost: {formatCurrency(acceptedOffer.mobilizationCost)}</p>
          <p>Demobilization Cost: {formatCurrency(acceptedOffer.demobilizationCost)}</p>
          <p>Rental Duration: {formatDate(acceptedOffer.rentalDuration?.fromDate)} - {formatDate(acceptedOffer.rentalDuration?.toDate)}</p>
          <p>Fuel Responsibility: {acceptedOffer.fuelResponsibility || '—'}</p>
          <p>Maintenance Responsibility: {acceptedOffer.maintenanceResponsibility || '—'}</p>
        </div>
      </div>

      <div className="truck-purchase-order__footer-grid">
        <div />
        <div>
          <h3>Special Instructions</h3>
          <p>All payments and delivery commitments must be completed through the verified SBC Marketplace negotiation process.</p>
          <p>Buyer and seller must retain a copy of this purchase order for verification and dispute resolution.</p>
        </div>
      </div>
    </section>
  );
}

export default RentalTruckPurchaseOrder;
