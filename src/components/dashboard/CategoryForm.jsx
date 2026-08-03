function CategoryForm({ actionLabel, category, onChange, onDelete, onSubmit, showDelete }) {
  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head">
        <div>
          <h1>{showDelete ? 'Edit Category' : 'Create Category'}</h1>
          <p>Manage category names and their marketplace type.</p>
        </div>
      </div>
      <div className="dashboard-form-grid">
        <div className="form-field">
          <label htmlFor="categoryName">Category Name</label>
          <input id="categoryName" name="name" onChange={onChange} type="text" value={category.name} />
        </div>
        <div className="form-field">
          <label htmlFor="categoryType">Category Type</label>
          <select id="categoryType" name="categoryType" onChange={onChange} value={category.categoryType}>
            <option value="truck">Truck</option>
            <option value="machinery">Machinery</option>
            <option value="material">Material</option>
            <option value="spareParts">Spare Parts</option>
            <option value="constructionServices">Construction Services</option>
          </select>
        </div>
      </div>
      <div className="dashboard-form-actions">
        {showDelete ? <button className="dashboard-danger-btn" onClick={onDelete} type="button">Delete Category</button> : null}
        <button className="dashboard-action-btn" onClick={onSubmit} type="button">{actionLabel}</button>
      </div>
    </section>
  );
}

export default CategoryForm;
