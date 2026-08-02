import { useRef } from 'react';

function SparePartForm({
  categories,
  cities,
  countryOptions,
  data,
  imagePreviews,
  isAdminView,
  machineryBrands,
  onAddCompatibleBrand,
  onAddDeliveryLocation,
  onCategoryChange,
  onCheckboxChange,
  onClearUploads,
  onCompatibleBrandChange,
  onDeliveryLocationChange,
  onFileChange,
  onRemoveCompatibleBrand,
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
          <p>Complete the spare parts listing details below.</p>
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
          <label>Brand</label>
          <select disabled={isAdminView} name="brand" onChange={onTextChange} value={data.brand}>
            <option value="">Select Brand</option>
            {machineryBrands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label>Condition</label>
          <select disabled={isAdminView} name="condition" onChange={onTextChange} value={data.condition}>
            <option value="used">Used</option>
            <option value="new">New</option>
          </select>
        </div>
        <div className="form-field">
          <label>Part Number</label>
          <input disabled={isAdminView} name="partNumber" onChange={onTextChange} type="number" value={data.partNumber} />
        </div>
        <div className="form-field form-field-full">
          <label>Description</label>
          <textarea disabled={isAdminView} name="description" onChange={onTextChange} rows="5" value={data.description} />
        </div>
      </div>

      <div className="dashboard-form-grid">
        <div className="form-field">
          <label>Manufacturing Year</label>
          <input disabled={isAdminView} name="manufacturingYear" onChange={onTextChange} type="number" value={data.manufacturingYear} />
        </div>
        <div className="form-field">
          <label>Country of Manufacture</label>
          <select disabled={isAdminView} name="countryOfManufacture" onChange={onTextChange} value={data.countryOfManufacture}>
            <option value="">Select Country</option>
            {countryOptions.map((country) => <option key={country} value={country}>{country}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label>Import Year</label>
          <input disabled={isAdminView} name="importYear" onChange={onTextChange} type="number" value={data.importYear} />
        </div>
        <div className="form-field">
          <label>Quantity</label>
          <input disabled={isAdminView} name="quantity" onChange={onTextChange} type="number" value={data.quantity} />
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
        <div className="dashboard-section-head">
          <div><h2>Compatible Brands</h2></div>
          {!isAdminView ? <button className="dashboard-secondary-btn" onClick={onAddCompatibleBrand} type="button">Add Brand</button> : null}
        </div>
        {data.compatibleBrands.map((item, index) => (
          <div className="dashboard-form-grid delivery-grid" key={`${item.brand}-${index}`}>
            <div className="form-field">
              <label>Brand</label>
              {isAdminView ? (
                <input disabled type="text" value={item.brand} />
              ) : (
                <select onChange={(event) => onCompatibleBrandChange(index, event.target.value)} value={item.brand}>
                  <option value="">Select Brand</option>
                  {machineryBrands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
                </select>
              )}
            </div>
            {!isAdminView ? <button className="dashboard-danger-btn align-self-end" onClick={() => onRemoveCompatibleBrand(index)} type="button">Remove</button> : null}
          </div>
        ))}
      </div>

      <div className="dashboard-form-grid compact-switches">
        <label><input checked={data.warrantyProvided} disabled={isAdminView} onChange={(event) => onCheckboxChange('warrantyProvided', event.target.checked)} type="checkbox" /> Warranty Provided</label>
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
            <p>Upload spare parts gallery images.</p>
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
              <img alt="Spare part upload" src={image.url} />
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

export default SparePartForm;
