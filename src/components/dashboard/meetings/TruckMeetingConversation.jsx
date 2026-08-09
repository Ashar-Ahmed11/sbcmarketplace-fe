import { formatMeetingDateTime, getAcceptedMeeting, getMeetingStatusClass } from './truckMeetingUtils';

function TruckMeetingConversation({
  currentUserId,
  onAccept,
  onOpenCounterOffer,
  row,
  showActionButtons = true,
  showCounterButton = true,
  title = 'Truck Meetings',
}) {
  const acceptedMeeting = getAcceptedMeeting(row);
  const userRole = String(row?.buyer?._id) === String(currentUserId) ? 'buyer' : 'seller';

  return (
    <section className="dashboard-section-card truck-negotiation-screen">
      <div className="truck-negotiation-screen__head">
        <div>
          <h1>{title}</h1>
          <p>{row.truck?.title || 'Truck meeting'}</p>
        </div>
        <span className={`status-badge ${getMeetingStatusClass(row.status)}`}>{row.status || 'pending'}</span>
      </div>

      <div className="truck-negotiation-stage">
        <h2>Meeting Coordination</h2>
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
                  {formatMeetingDateTime(item.meetingDate, item.meetingTime)}
                  {item.accepted ? ' (Accepted)' : item.negotiator !== userRole ? ' (Counter)' : ''}
                </strong>
                <span>{item.location || 'Location not shared yet'}</span>
                <span>{item.createdAt ? `Submitted ${new Date(item.createdAt).toLocaleString()}` : 'Submitted recently'}</span>
              </div>
              {!acceptedMeeting && showActionButtons && item.negotiator !== userRole ? (
                <button className="dashboard-action-btn truck-negotiation-accept-btn" onClick={() => onAccept(item._id)} type="button">Accept</button>
              ) : null}
            </div>
          );
        })}
      </div>

      {!acceptedMeeting && showCounterButton ? (
        <div className="truck-negotiation-actions">
          <button className="dashboard-secondary-btn" type="button">Withdraw</button>
          <button className="dashboard-action-btn" onClick={onOpenCounterOffer} type="button">Counter Meeting</button>
        </div>
      ) : null}
    </section>
  );
}

export default TruckMeetingConversation;
