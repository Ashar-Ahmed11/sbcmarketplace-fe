import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { timeStringToMinutes } from '../dashboard/meetings/truckMeetingUtils';

function TruckMeetingRequestModal({ isSubmitting, onClose, onSubmit, open, truckTitle }) {
  const [meetingDate, setMeetingDate] = useState(null);
  const [meetingTime, setMeetingTime] = useState('09:00');
  const [location, setLocation] = useState('');

  if (!open) return null;

  return (
    <div className="dashboard-modal-backdrop">
      <div className="dashboard-modal truck-negotiation-proof-modal">
        <h2>Request for Meeting</h2>
        <p>Choose your preferred date, time, and location for {truckTitle || 'this truck'}.</p>

        <div className="dashboard-form-grid mt-3">
          <div className="form-field">
            <label>Meeting Date</label>
            <DatePicker
              className="form-control"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              onChange={setMeetingDate}
              selected={meetingDate}
            />
          </div>
          <div className="">
            <label>Meeting Time</label>
            <TimePicker
              className="truck-time-picker"
              disableClock
              format="h:mm a"
              onChange={(value) => setMeetingTime(value || '09:00')}
              value={meetingTime}
            />
          </div>
          <div className="form-field" style={{ gridColumn: '1 / -1' }}>
            <label>Meeting Location</label>
            <input className="form-control" onChange={(event) => setLocation(event.target.value)} type="text" value={location} />
          </div>
        </div>

        <div className="dashboard-form-actions mt-3">
          <button className="dashboard-secondary-btn" disabled={isSubmitting} onClick={onClose} type="button">Cancel</button>
          <button
            className="dashboard-action-btn"
            disabled={!meetingDate || !meetingTime || !location.trim() || isSubmitting}
            onClick={() => onSubmit({
              meetingDate,
              meetingTime: timeStringToMinutes(meetingTime),
              location: location.trim(),
            })}
            type="button"
          >
            {isSubmitting ? 'Submitting...' : 'Request Meeting'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TruckMeetingRequestModal;
