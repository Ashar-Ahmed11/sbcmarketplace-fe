function SubCategoryForm({ actionLabel, name, onChange, onDelete, onSubmit, showDelete }) {
  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head">
        <div>
          <h1>{showDelete ? 'Edit Subcategory' : 'Create Subcategory'}</h1>
          <p>Manage the subcategory title for the selected category.</p>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="subcategoryName">Subcategory Name</label>
        <input id="subcategoryName" onChange={onChange} type="text" value={name} />
      </div>
      <div className="dashboard-form-actions">
        {showDelete ? <button className="dashboard-danger-btn" onClick={onDelete} type="button">Delete Subcategory</button> : null}
        <button className="dashboard-action-btn" onClick={onSubmit} type="button">{actionLabel}</button>
      </div>
    </section>
  );
}

export default SubCategoryForm;
