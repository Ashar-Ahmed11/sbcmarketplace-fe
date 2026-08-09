import { Link } from 'react-router-dom';
import { formatMeetingDate, formatMeetingTime, getMeetingStatusClass } from './meetings/truckMeetingUtils';

function getLatestMeeting(item) {
  if (!item?.negotiation?.length) return null;
  return item.negotiation[item.negotiation.length - 1];
}

function TruckMeetingTable({ rows, title, subtitle, viewBasePath }) {
  return (
    <section className="dashboard-section-card">
      <div className="dashboard-section-head">
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>

      <div className="dashboard-table-wrap" style={{ border: '1px solid #E4E7EC' }}>
        <table className="table dashboard-table">
          <thead>
            <tr>
              <th className="py-3">Truck</th>
              <th className="py-3">Buyer</th>
              <th className="py-3">Seller</th>
              <th className="py-3">Meeting Date</th>
              <th className="py-3">Meeting Time</th>
              <th className="py-3">Location</th>
              <th className="py-3">Status</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((item) => {
              const latest = getLatestMeeting(item);
              return (
                <tr key={item._id}>
                  <td className="py-3">{item.truck?.title || 'Truck Meeting'}</td>
                  <td className="py-3">{item.buyer?.fullName || item.buyer?.username || '—'}</td>
                  <td className="py-3">{item.seller?.fullName || item.seller?.username || '—'}</td>
                  <td className="py-3">{formatMeetingDate(latest?.meetingDate)}</td>
                  <td className="py-3">{formatMeetingTime(latest?.meetingTime)}</td>
                  <td className="py-3">{latest?.location || '—'}</td>
                  <td className="py-3"><span className={`status-badge ${getMeetingStatusClass(item.status)}`}>{item.status || 'pending'}</span></td>
                  <td className="py-3"><Link className="dashboard-inline-link" to={`${viewBasePath}/${item._id}`}>View →</Link></td>
                </tr>
              );
            }) : (
              <tr><td className="text-center py-4" colSpan="8">No truck meetings found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TruckMeetingTable;
