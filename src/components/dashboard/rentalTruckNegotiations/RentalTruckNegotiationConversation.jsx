import { getAcceptedRentalTruckOffer } from './rentalTruckNegotiationUtils';

function formatCurrency(value) {
  return `Rs. ${Number(value || 0).toLocaleString()}`;
}

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : '—';
}

function RentalTruckNegotiationConversation({
  currentUserId,
  onAccept,
  onOpenCounterOffer,
  row,
  showActionButtons = true,
  showCounterButton = true,
  title = 'Deals - Negotiations',
}) {
  const acceptedOffer = getAcceptedRentalTruckOffer(row);
  const userRole = String(row?.buyer?._id) === String(currentUserId) ? 'buyer' : 'seller';

  return (
    <section className="dashboard-section-card truck-negotiation-screen">
      <div className="truck-negotiation-screen__head">
        <div>
          <h1>{title}</h1>
          <p>{row.rentalTruck?.title || 'Rental truck negotiation'}</p>
        </div>
        <span className="truck-negotiation-screen__status">Negotiating</span>
      </div>

      <div className="truck-negotiation-stage">
        <h2>Secure Negotiation</h2>
        <div className="truck-negotiation-stage__bars">
          <span />
          <span />
          <span className="active" />
          <span />
          <span />
        </div>
        <small>Round {Math.min(row.negotiation?.length || 1, 5)} of 5</small>
      </div>

      <div className="truck-negotiation-thread">
        {(row.negotiation || []).map((item) => {
          const isViewer = item.negotiator === userRole;
          return (
            <div className={`truck-negotiation-bubble ${isViewer ? 'buyer' : 'seller'}`} key={item._id}>
              <div className="truck-negotiation-bubble__inner">
                <small>{isViewer ? 'You' : item.negotiator === 'buyer' ? 'Buyer' : 'Seller'}</small>
                <strong>
                  {formatCurrency(item.perDayRentalCharges)} / day
                  {item.accepted ? ' (Accepted)' : item.negotiator !== userRole ? ' (Counter)' : ''}
                </strong>
                <span>
                  Deposit {formatCurrency(item.securityDepositAmount)}
                  {item.deliveryCost !== null && item.deliveryCost !== undefined ? ` • Delivery ${formatCurrency(item.deliveryCost)}` : ''}
                </span>
                <span>
                  Mobilization {formatCurrency(item.mobilizationCost)} • Demobilization {formatCurrency(item.demobilizationCost)}
                </span>
                <span>
                  Duration {formatDate(item.rentalDuration?.fromDate)} - {formatDate(item.rentalDuration?.toDate)}
                </span>
                <span>
                  Fuel: {item.fuelResponsibility || '—'} • Maintenance: {item.maintenanceResponsibility || '—'}
                </span>
                <span>{item.createdAt ? `Submitted ${new Date(item.createdAt).toLocaleString()}` : 'Submitted recently'}</span>
              </div>
              {!acceptedOffer && showActionButtons && item.negotiator !== userRole ? (
                <button className="dashboard-action-btn truck-negotiation-accept-btn" onClick={() => onAccept(item._id)} type="button">Accept</button>
              ) : null}
            </div>
          );
        })}
      </div>

      {!acceptedOffer && showCounterButton ? (
        <div className="truck-negotiation-actions">
          <button className="dashboard-secondary-btn" type="button">Withdraw</button>
          <button className="dashboard-action-btn" onClick={onOpenCounterOffer} type="button">Counter Offer</button>
        </div>
      ) : null}
    </section>
  );
}

export default RentalTruckNegotiationConversation;
