function BasicInfoForm({ data, onChange, onSubmit, submitLabel, title, subtitle }) {
  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head">
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>

      <div className="dashboard-form-grid">
        <div className="form-field">
          <label>Advance Percentage</label>
          <input name="advancePercentage" onChange={onChange} step="0.01" type="number" value={data.advancePercentage ?? ''} />
        </div>
        <div className="form-field">
          <label>Platform Fee Percentage</label>
          <input name="platformFeePercentage" onChange={onChange} step="0.01" type="number" value={data.platformFeePercentage ?? ''} />
        </div>
      </div>

      <div className="dashboard-form-actions">
        <button className="dashboard-action-btn" onClick={onSubmit} type="button">{submitLabel}</button>
      </div>
    </section>
  );
}

export default BasicInfoForm;
