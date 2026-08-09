import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import TruckMeetingConversation from '../meetings/TruckMeetingConversation';
import {
  formatMeetingDate,
  formatMeetingTime,
  getAcceptedMeeting,
  getMeetingStatusClass,
} from '../meetings/truckMeetingUtils';

function AdminTruckMeetingDetailPage() {
  const { truckMeetingId } = useParams();
  const { getTruckMeetingById, updateTruckMeetingStatus } = useContext(AppContext);
  const [row, setRow] = useState(null);

  useEffect(() => {
    getTruckMeetingById(truckMeetingId).then(setRow);
  }, [getTruckMeetingById, truckMeetingId]);

  const acceptedMeeting = useMemo(() => getAcceptedMeeting(row), [row]);

  if (!row) return null;

  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head">
        <div>
          <h1>Truck Meeting Detail</h1>
          <p>{row.truck?.title || 'Truck meeting'}</p>
        </div>
      </div>

      <div className="truck-figma-details-stack mb-4">
        <section className="truck-figma-specs-card truck-figma-specs-card--compact">
          <h3>Meeting Summary</h3>
          <div className="truck-figma-specs-table">
            <div className="truck-figma-specs-row">
              <div className="truck-figma-specs-cell"><span>Buyer</span><strong>{row.buyer?.fullName || row.buyer?.username || '—'}</strong></div>
              <div className="truck-figma-specs-cell"><span>Seller</span><strong>{row.seller?.fullName || row.seller?.username || '—'}</strong></div>
            </div>
            <div className="truck-figma-specs-row alt">
              <div className="truck-figma-specs-cell"><span>Status</span><strong>{row.status || 'pending'}</strong></div>
              <div className="truck-figma-specs-cell"><span>Created On</span><strong>{formatMeetingDate(row.dateOfCreation || row.createdAt)}</strong></div>
            </div>
            {acceptedMeeting ? (
              <div className="truck-figma-specs-row">
                <div className="truck-figma-specs-cell"><span>Approved Date</span><strong>{formatMeetingDate(acceptedMeeting.meetingDate)}</strong></div>
                <div className="truck-figma-specs-cell"><span>Approved Time</span><strong>{formatMeetingTime(acceptedMeeting.meetingTime)}</strong></div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="truck-figma-specs-card truck-figma-specs-card--compact">
          <div className="dashboard-section-head mb-0">
            <div>
              <h3>Conversation</h3>
            </div>
            <button className="dashboard-action-btn" data-bs-target="#adminMeetingConversation" data-bs-toggle="collapse" type="button">View Conversation</button>
          </div>
          <div className="collapse mt-3" id="adminMeetingConversation">
            <TruckMeetingConversation
              currentUserId={row.seller?._id}
              onAccept={() => {}}
              onOpenCounterOffer={() => {}}
              row={row}
              showActionButtons={false}
              showCounterButton={false}
              title="Truck Meeting Conversation"
            />
          </div>
        </section>

        {row.status === 'under approval' ? (
          <section className="truck-figma-specs-card truck-figma-specs-card--compact">
            <h3>Under Admin Approval</h3>
            <p className="mb-0">The buyer and seller have accepted a meeting schedule and are waiting for your approval.</p>
          </section>
        ) : null}

        {acceptedMeeting ? (
          <section className="truck-figma-specs-card truck-figma-specs-card--compact">
            <h3>Accepted Meeting Slot</h3>
            <div className="truck-figma-specs-table">
              <div className="truck-figma-specs-row">
                <div className="truck-figma-specs-cell"><span>Date</span><strong>{formatMeetingDate(acceptedMeeting.meetingDate)}</strong></div>
                <div className="truck-figma-specs-cell"><span>Time</span><strong>{formatMeetingTime(acceptedMeeting.meetingTime)}</strong></div>
              </div>
              <div className="truck-figma-specs-row alt">
                <div className="truck-figma-specs-cell"><span>Location</span><strong>{acceptedMeeting.location || '—'}</strong></div>
                <div className="truck-figma-specs-cell"><span>Successful Date</span><strong>{formatMeetingDate(row.meetingSuccessfulDate)}</strong></div>
              </div>
            </div>
          </section>
        ) : null}
      </div>

      <div className="dashboard-form-grid">
        <div className="form-field">
          <label>Meeting Status</label>
          <select onChange={(event) => setRow((current) => ({ ...current, status: event.target.value }))} value={row.status}>
            <option value="pending">Pending</option>
            <option value="under approval">Under Approval</option>
            <option value="scheduled approved">Scheduled Approved</option>
            <option value="successful">Successful</option>
          </select>
        </div>
        <div className="form-field">
          <label>Current Badge Preview</label>
          <div className="d-flex align-items-center h-100">
            <span className={`status-badge ${getMeetingStatusClass(row.status)}`}>{row.status}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-form-actions">
        <button className="dashboard-action-btn" onClick={async () => setRow(await updateTruckMeetingStatus(truckMeetingId, {
          status: row.status,
        }))} type="button">Update</button>
      </div>
    </section>
  );
}

export default AdminTruckMeetingDetailPage;
