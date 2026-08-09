import { useContext, useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import TruckMeetingConversation from '../meetings/TruckMeetingConversation';
import {
  formatMeetingDate,
  formatMeetingTime,
  getAcceptedMeeting,
  getMeetingStatusClass,
  timeStringToMinutes,
} from '../meetings/truckMeetingUtils';

function UserTruckMeetingDetailPage() {
  const { truckMeetingId } = useParams();
  const {
    acceptTruckMeetingOffer,
    addTruckMeetingCounterOffer,
    currentUser,
    fetchUser,
    getTruckMeetingById,
  } = useContext(AppContext);
  const [row, setRow] = useState(null);
  const [counterOffer, setCounterOffer] = useState({ meetingDate: null, meetingTime: '09:00', location: '' });
  const [showCounterModal, setShowCounterModal] = useState(false);

  useEffect(() => {
    fetchUser();
    getTruckMeetingById(truckMeetingId).then(setRow);
  }, [fetchUser, getTruckMeetingById, truckMeetingId]);

  const acceptedMeeting = useMemo(() => getAcceptedMeeting(row), [row]);

  if (!row) return null;

  return (
    <>
      <TruckMeetingConversation
        currentUserId={currentUser?._id}
        onAccept={async (negotiationId) => setRow(await acceptTruckMeetingOffer(truckMeetingId, { negotiationId }))}
        onOpenCounterOffer={() => setShowCounterModal(true)}
        row={row}
        title="Truck Meeting Detail"
      />

      {row.status === 'under approval' ? (
        <section className="dashboard-section-card truck-negotiation-payment">
          <div className="truck-negotiation-payment__head">
            <div>
              <h1>Under Admin Approval</h1>
              <p>Our admin team is reviewing the accepted meeting schedule.</p>
            </div>
            <span className={`status-badge ${getMeetingStatusClass(row.status)}`}>{row.status}</span>
          </div>
        </section>
      ) : null}

      {row.status === 'scheduled approved' && acceptedMeeting ? (
        <section className="dashboard-section-card truck-negotiation-payment">
          <div className="truck-negotiation-payment__head">
            <div>
              <h1>Meeting Approved</h1>
              <p>Your meeting has been approved by the admin team.</p>
            </div>
            <span className={`status-badge ${getMeetingStatusClass(row.status)}`}>{row.status}</span>
          </div>
          <div className="truck-figma-specs-table mt-3">
            <div className="truck-figma-specs-row">
              <div className="truck-figma-specs-cell"><span>Date</span><strong>{formatMeetingDate(acceptedMeeting.meetingDate)}</strong></div>
              <div className="truck-figma-specs-cell"><span>Time</span><strong>{formatMeetingTime(acceptedMeeting.meetingTime)}</strong></div>
            </div>
            <div className="truck-figma-specs-row alt">
              <div className="truck-figma-specs-cell"><span>Location</span><strong>{acceptedMeeting.location || '—'}</strong></div>
              <div className="truck-figma-specs-cell"><span>Truck</span><strong>{row.truck?.title || '—'}</strong></div>
            </div>
          </div>
        </section>
      ) : null}

      {row.status === 'successful' ? (
        <section className="dashboard-section-card truck-negotiation-payment">
          <div className="truck-negotiation-payment__head">
            <div>
              <h1>Meeting Marked Successful</h1>
              <p>The meeting has been completed successfully.</p>
            </div>
            <span className={`status-badge ${getMeetingStatusClass(row.status)}`}>{row.status}</span>
          </div>
          <p className="mb-0 mt-3">Successful Date: {formatMeetingDate(row.meetingSuccessfulDate)}</p>
        </section>
      ) : null}

      {showCounterModal ? (
        <div className="dashboard-modal-backdrop">
          <div className="dashboard-modal truck-negotiation-proof-modal">
            <h2>Propose New Meeting</h2>
            <p>Share an updated date, time, and location for the next round.</p>
            <div className="dashboard-form-grid mt-3">
              <div className="form-field">
                <label>Meeting Date</label>
                <DatePicker
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  onChange={(value) => setCounterOffer((current) => ({ ...current, meetingDate: value }))}
                  selected={counterOffer.meetingDate}
                />
              </div>
              <div className="">
                <label>Meeting Time</label>
                <TimePicker
                  className="truck-time-picker"
                  disableClock
                  format="HH:mm a"
                  onChange={(value) => setCounterOffer((current) => ({ ...current, meetingTime: value || '09:00' }))}
                  value={counterOffer.meetingTime}
                />
              </div>
              <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                <label>Meeting Location</label>
                <input onChange={(event) => setCounterOffer((current) => ({ ...current, location: event.target.value }))} type="text" value={counterOffer.location} />
              </div>
            </div>
            <div className="dashboard-form-actions mt-3">
              <button className="dashboard-secondary-btn" onClick={() => setShowCounterModal(false)} type="button">Cancel</button>
              <button
                className="dashboard-action-btn"
                disabled={!counterOffer.meetingDate || !counterOffer.location.trim()}
                onClick={async () => {
                  setRow(await addTruckMeetingCounterOffer(truckMeetingId, {
                    meetingDate: counterOffer.meetingDate,
                    meetingTime: timeStringToMinutes(counterOffer.meetingTime),
                    location: counterOffer.location.trim(),
                  }));
                  setCounterOffer({ meetingDate: null, meetingTime: '09:00', location: '' });
                  setShowCounterModal(false);
                }}
                type="button"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default UserTruckMeetingDetailPage;
