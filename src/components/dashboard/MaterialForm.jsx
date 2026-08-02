import { useRef } from 'react';

function MaterialForm({
  categories,
  cities,
  data,
  imagePreviews,
  isAdminView,
  materialGrades,
  materialSellerTypes,
  materialUnits,
  onAddDeliveryLocation,
  onCategoryChange,
  onCheckboxChange,
  onClearUploads,
  onDeliveryLocationChange,
  onFileChange,
  onRemoveDeliveryLocation,
  onRemovePreview,
  onStatusChange,
  onSubmit,
  onTextChange,
  statusActionLabel,
  subCategories,
  submitLabel,
}) {
  const imageInputRef = useRef(null);

  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head">
        <div>
          <h1>{submitLabel}</h1>
          <p>Complete the construction material listing details below.</p>
        </div>
      </div>

      <div className="dashboard-form-grid">
        <div className="form-field">
          <label>Category</label>
          <select disabled={isAdminView} name="category" onChange={onCategoryChange} value={data.category}>
            <option value="">Select Category</option>
            {categories.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
          </select>
        </div>
        {subCategories.length ? (
          <div className="form-field">
            <label>Subcategory</label>
            <select disabled={isAdminView} name="subcategory" onChange={onTextChange} value={data.subcategory}>
              <option value="">Select Subcategory</option>
              {subCategories.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
            </select>
          </div>
        ) : null}
      </div>

      <div className="dashboard-form-grid dashboard-form-grid-primary">
        <div className="form-field">
          <label>Title</label>
          <input disabled={isAdminView} name="title" onChange={onTextChange} type="text" value={data.title} />
        </div>
        <div className="form-field">
          <label>Seller Type</label>
          <select disabled={isAdminView} name="sellerType" onChange={onTextChange} value={data.sellerType}>
            <option value="">Select Seller Type</option>
            {materialSellerTypes.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label>Brand</label>
          <select disabled={isAdminView} name="brand" onChange={onTextChange} value={data.brand}>
            <option value="local">Local</option>
            <option value="branded">Branded</option>
          </select>
        </div>
        <div className="form-field">
          <label>Grade</label>
          <select disabled={isAdminView} name="grade" onChange={onTextChange} value={data.grade}>
            <option value="">Select Grade</option>
            {materialGrades.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div className="form-field form-field-full">
          <label>Description</label>
          <textarea disabled={isAdminView} name="description" onChange={onTextChange} rows="5" value={data.description} />
        </div>
      </div>

      <div className="dashboard-form-grid">
        <div className="form-field">
          <label>Quantity</label>
          <input disabled={isAdminView} name="quantity" onChange={onTextChange} type="number" value={data.quantity} />
        </div>
        <div className="form-field">
          <label>Unit</label>
          <select disabled={isAdminView} name="unit" onChange={onTextChange} value={data.unit}>
            <option value="">Select Unit</option>
            {materialUnits.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label>Price</label>
          <input disabled={isAdminView} name="price" onChange={onTextChange} type="number" value={data.price} />
        </div>
        <div className="form-field">
          <label>Location</label>
          <input disabled={isAdminView} name="location" onChange={onTextChange} type="text" value={data.location} />
        </div>
      </div>

      <div className="dashboard-nested-section">
        <div className="dashboard-form-grid compact-switches">
          <label><input checked={data.deliveryProvided} disabled={isAdminView} onChange={(event) => onCheckboxChange('deliveryProvided', event.target.checked)} type="checkbox" /> Delivery Provided</label>
        </div>

        {data.deliveryProvided ? (
          <div className="dashboard-nested-section dashboard-subsection-tight">
            <div className="dashboard-section-head">
              <div><h2>Delivery Locations</h2></div>
              {!isAdminView ? <button className="dashboard-secondary-btn" onClick={onAddDeliveryLocation} type="button">Add Location</button> : null}
            </div>
            {data.deliveryLocations.map((item, index) => (
              <div className="dashboard-form-grid delivery-grid" key={`${item.city}-${index}`}>
                <div className="form-field">
                  <label>City</label>
                  {isAdminView ? (
                    <input disabled type="text" value={item.city} />
                  ) : (
                    <select onChange={(event) => onDeliveryLocationChange(index, 'city', event.target.value)} value={item.city}>
                      <option value="">Select City</option>
                      {cities.map((city) => <option key={city} value={city}>{city}</option>)}
                    </select>
                  )}
                </div>
                <div className="form-field">
                  <label>Price</label>
                  <input disabled={isAdminView} onChange={(event) => onDeliveryLocationChange(index, 'price', event.target.value)} type="number" value={item.price} />
                </div>
                {!isAdminView ? <button className="dashboard-danger-btn align-self-end" onClick={() => onRemoveDeliveryLocation(index)} type="button">Remove</button> : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="dashboard-upload-block">
        <div className="dashboard-upload-head">
          <div>
            <h2>Images</h2>
            <p>Upload material gallery images.</p>
          </div>
          {!isAdminView ? (
            <div className="dashboard-upload-actions">
              <button className="dashboard-secondary-btn" onClick={() => imageInputRef.current?.click()} type="button">Upload Image</button>
              <button className="dashboard-secondary-btn" onClick={() => onClearUploads('images')} type="button">Remove Images</button>
            </div>
          ) : null}
          {!isAdminView ? <input className="d-none" multiple onChange={(event) => onFileChange(event, 'images')} ref={imageInputRef} type="file" /> : null}
        </div>
        <div className="upload-preview-grid">
          {imagePreviews.map((image, index) => (
            <div className={`upload-preview-card ${isAdminView ? 'readonly' : ''}`} key={`${image.url}-${index}`}>
              <img alt="Material upload" src={image.url} />
              {!isAdminView ? <button onClick={() => onRemovePreview('images', index)} type="button">×</button> : null}
            </div>
          ))}
        </div>
      </div>

      {isAdminView ? (
        <div className="dashboard-nested-section">
          <div className="dashboard-form-grid">
            <div className="form-field">
              <label>Approval Status</label>
              <select onChange={onStatusChange} value={data.approvalStatus}>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            {data.approvalStatus === 'rejected' ? (
              <div className="form-field">
                <label>Rejection Reason</label>
                <input name="rejectionReason" onChange={onTextChange} type="text" value={data.rejectionReason} />
              </div>
            ) : null}
          </div>
          <div className="dashboard-form-actions">
            <button className="dashboard-action-btn" onClick={onSubmit} type="button">{statusActionLabel}</button>
          </div>
        </div>
      ) : (
        <div className="dashboard-form-actions">
          <button className="dashboard-action-btn" onClick={onSubmit} type="button">{submitLabel}</button>
        </div>
      )}
    </section>
  );
}

export default MaterialForm;
