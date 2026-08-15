import { useState } from 'react';

function TruckFinancingRequestModal({ cities, isSubmitting, onClose, onSubmit, open, submittedCount = 0 }) {
  const [form, setForm] = useState({ buyerDeliveryAddress: '', buyerDeliveryCity: '' });

  if (!open) return null;

  return (
    <div className="dashboard-modal-backdrop">
      <div className="dashboard-modal">
        <h2>Request Financing</h2>
        <p>Send your financing request to matching truck financers.</p>
        <div className="dashboard-form-grid mt-3">
          <div className="form-field">
            <label>Buyer Delivery City</label>
            <select onChange={(event) => setForm((current) => ({ ...current, buyerDeliveryCity: event.target.value }))} value={form.buyerDeliveryCity}>
              <option value="">Select city</option>
              {cities.map((city) => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label>Buyer Delivery Address</label>
            <input onChange={(event) => setForm((current) => ({ ...current, buyerDeliveryAddress: event.target.value }))} type="text" value={form.buyerDeliveryAddress} />
          </div>
        </div>
        {submittedCount ? <div className="alert alert-success mt-3 mb-0">Your finance request has been successfully sent to {submittedCount} financers.</div> : null}
        <div className="dashboard-form-actions mt-3">
          <button className="dashboard-secondary-btn" onClick={onClose} type="button">Close</button>
          {!submittedCount ? <button className="dashboard-action-btn" disabled={!form.buyerDeliveryCity || !form.buyerDeliveryAddress.trim() || isSubmitting} onClick={() => onSubmit(form)} type="button">{isSubmitting ? 'Sending...' : 'Send Request'}</button> : null}
        </div>
      </div>
    </div>
  );
}

export default TruckFinancingRequestModal;
