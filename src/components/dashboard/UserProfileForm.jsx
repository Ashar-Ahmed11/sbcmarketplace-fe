function UserProfileForm({ data, onChange, onSubmit }) {
  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head">
        <div>
          <h1>Basic Info</h1>
          <p>Keep your purchase-order and negotiation contact information up to date.</p>
        </div>
      </div>

      <div className="dashboard-form-grid">
        <div className="form-field">
          <label>Full Name</label>
          <input name="fullName" onChange={onChange} type="text" value={data.fullName || ''} />
        </div>
        <div className="form-field">
          <label>Phone Number</label>
          <input name="phoneNumber" onChange={onChange} type="number" value={data.phoneNumber || ''} />
        </div>
        <div className="form-field">
          <label>City</label>
          <input name="city" onChange={onChange} type="text" value={data.city || ''} />
        </div>
        <div className="form-field">
          <label>State</label>
          <input name="state" onChange={onChange} type="text" value={data.state || ''} />
        </div>
        <div className="form-field">
          <label>Zip Code</label>
          <input name="zipCode" onChange={onChange} type="number" value={data.zipCode || ''} />
        </div>
        <div className="form-field form-field-full">
          <label>Address</label>
          <textarea name="address" onChange={onChange} rows="4" value={data.address || ''} />
        </div>
      </div>

      <div className="dashboard-form-actions">
        <button className="dashboard-action-btn" onClick={onSubmit} type="button">Update Basic Info</button>
      </div>
    </section>
  );
}

export default UserProfileForm;
