import { useMemo, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { formatFieldLabel } from './dashboardUtils';

const generalPrimaryFields = [
  ['title', 'Title', 'text'],
  ['brand', 'Brand', 'selectBrand'],
  ['condition', 'Condition', 'selectCondition'],
  ['description', 'Description', 'textarea'],
];

const generalSecondaryFields = [
  ['quantity', 'Quantity', 'number'],
  ['wheelType', 'Wheel Type', 'number'],
  ['driveType', 'Drive Type', 'text'],
  ['price', 'Price', 'number'],
  ['manufacturingYear', 'Manufacturing Year', 'number'],
  ['modelYear', 'Model Year', 'number'],
  ['importYear', 'Import Year', 'number'],
  ['location', 'Location', 'text'],
];

function TruckForm({
  categories,
  cities,
  data,
  documentPreviews,
  brands,
  imagePreviews,
  isAdminView,
  isStatusVisible,
  onAddDeliveryLocation,
  onCategoryChange,
  onCheckboxChange,
  onClearUploads,
  onDeliveryLocationChange,
  onFeatureChange,
  onFileChange,
  onNestedChange,
  onRemoveDeliveryLocation,
  onRemovePreview,
  onStatusChange,
  onSubmit,
  onTextChange,
  onRentalDurationChange,
  statusActionLabel,
  subCategories,
  submitLabel,
  showRentalFields = false,
  showConditionField = true,
  showPriceField = true,
  showQuantityField = true,
}) {
  const imageInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const featureEntries = useMemo(() => Object.keys(data.features || {}), [data.features]);

  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head">
        <div>
          <h1>{submitLabel}</h1>
          <p>Complete the truck listing details below.</p>
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
        {generalPrimaryFields.map(([key, label, type]) => (
          <div className={`form-field ${key === 'description' ? 'form-field-full' : ''}`} key={key}>
            <label>{label}</label>
            {type === 'textarea' ? (
              <textarea disabled={isAdminView} name={key} onChange={onTextChange} rows="5" value={data[key]} />
            ) : type === 'selectBrand' ? (
              <select disabled={isAdminView} name={key} onChange={onTextChange} value={data[key]}>
                <option value="">Select Brand</option>
                {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
              </select>
            ) : type === 'selectCondition' ? (
              showConditionField ? (
                <select disabled={isAdminView} name={key} onChange={onTextChange} value={data[key]}>
                  <option value="used">Used</option>
                  <option value="new">New</option>
                </select>
              ) : null
            ) : (
              <input disabled={isAdminView} name={key} onChange={onTextChange} type={type} value={data[key]} />
            )}
          </div>
        ))}
      </div>

      <div className="dashboard-form-grid">
        {generalSecondaryFields.filter(([key]) => {
          if (key === 'quantity') return showQuantityField;
          if (key === 'price') return showPriceField;
          return true;
        }).map(([key, label, type]) => (
          <div className="form-field" key={key}>
            <label>{label}</label>
            <input disabled={isAdminView} name={key} onChange={onTextChange} type={type} value={data[key]} />
          </div>
        ))}
      </div>

      {showRentalFields ? (
        <div className="dashboard-nested-section">
          <h2>Rental Details</h2>
          <div className="dashboard-form-grid">
            <div className="form-field">
              <label>Available Rental From</label>
              <DatePicker
                className="w-100"
                dateFormat="dd/MM/yyyy"
                disabled={isAdminView}
                onChange={(date) => onRentalDurationChange?.('fromDate', date)}
                placeholderText="Select from date"
                selected={data.availableRentalDuration?.fromDate ? new Date(data.availableRentalDuration.fromDate) : null}
              />
            </div>
            <div className="form-field">
              <label>Available Rental To</label>
              <DatePicker
                className="w-100"
                dateFormat="dd/MM/yyyy"
                disabled={isAdminView}
                minDate={data.availableRentalDuration?.fromDate ? new Date(data.availableRentalDuration.fromDate) : null}
                onChange={(date) => onRentalDurationChange?.('toDate', date)}
                placeholderText="Select to date"
                selected={data.availableRentalDuration?.toDate ? new Date(data.availableRentalDuration.toDate) : null}
              />
            </div>
            <div className="form-field">
              <label>Per Hour Rental Charges</label>
              <input disabled={isAdminView} name="perHourRentalCharges" onChange={onTextChange} type="number" value={data.perHourRentalCharges || ''} />
            </div>
            <div className="form-field">
              <label>Truck Status</label>
              <select disabled={isAdminView} name="truckStatus" onChange={onTextChange} value={data.truckStatus || 'available'}>
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="fault">Fault</option>
              </select>
            </div>
          </div>
        </div>
      ) : null}

      {['capacity', 'engineTransmission', 'dimensions', 'tyres', 'body', 'usage'].map((section) => (
        <div className="dashboard-nested-section" key={section}>
          <h2>{formatFieldLabel(section)}</h2>
          <div className="dashboard-form-grid">
            {Object.keys(data[section] || {}).map((key) => (
              <div className="form-field" key={`${section}-${key}`}>
                <label>{formatFieldLabel(key)}</label>
                {section === 'usage' && key === 'registrationCity' ? (
                  <select disabled={isAdminView} onChange={(event) => onNestedChange(section, key, event.target.value)} value={data[section][key]}>
                    <option value="">Select City</option>
                    {cities.map((city) => <option key={city} value={city}>{city}</option>)}
                  </select>
                ) : section === 'usage' && key === 'registrationStatus' ? (
                  <select disabled={isAdminView} onChange={(event) => onNestedChange(section, key, event.target.value)} value={data[section][key]}>
                    <option value="registered">Registered</option>
                    <option value="unregistered">Unregistered</option>
                  </select>
                ) : section === 'body' && key === 'cabinType' ? (
                  <select disabled={isAdminView} onChange={(event) => onNestedChange(section, key, event.target.value)} value={data[section][key]}>
                    <option value="day">Day</option>
                    <option value="sleeper">Sleeper</option>
                  </select>
                ) : section === 'body' && key === 'steering' ? (
                  <select disabled={isAdminView} onChange={(event) => onNestedChange(section, key, event.target.value)} value={data[section][key]}>
                    <option value="LHD">LHD</option>
                    <option value="RHD">RHD</option>
                  </select>
                ) : (
                  <input disabled={isAdminView} onChange={(event) => onNestedChange(section, key, event.target.value)} type={typeof data[section][key] === 'number' ? 'number' : 'text'} value={data[section][key]} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="dashboard-form-grid compact-switches">
        <label><input checked={data.originalDocuments} disabled={isAdminView} onChange={(event) => onCheckboxChange('originalDocuments', event.target.checked)} type="checkbox" /> Original Documents</label>
      </div>

      <div className="dashboard-nested-section">
        <h2>Features</h2>
        <div className="dashboard-form-grid compact-switches">
          {featureEntries.map((feature) => (
            <label key={feature}>
              <input checked={data.features[feature]} disabled={isAdminView} onChange={(event) => onFeatureChange(feature, event.target.checked)} type="checkbox" />
              {formatFieldLabel(feature)}
            </label>
          ))}
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
              <div className="d-flex" key={`${item.city}-${index}`}>
                <div className="form-field w-100">
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
                <div className="form-field px-2 w-100">
                  <label>Price</label>
                  <input disabled={isAdminView} onChange={(event) => onDeliveryLocationChange(index, 'price', event.target.value)} type="number" value={item.price} />
                </div>
                <div className='d-flex align-items-center px-2'>
                {!isAdminView ? <button className="dashboard-danger-btn" onClick={() => onRemoveDeliveryLocation(index)} type="button">X</button> : null}
                  </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="dashboard-upload-block">
        <div className="dashboard-upload-head">
          <div>
            <h2>Images</h2>
            <p>Upload listing gallery images.</p>
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
              <img alt="Truck upload" src={image.url} />
              {!isAdminView ? <button onClick={() => onRemovePreview('images', index)} type="button">×</button> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-upload-block">
        <div className="dashboard-upload-head">
          <div>
            <h2>Document Images</h2>
            <p>Upload registration and document proof images.</p>
          </div>
          {!isAdminView ? (
            <div className="dashboard-upload-actions">
              <button className="dashboard-secondary-btn" onClick={() => documentInputRef.current?.click()} type="button">Upload Image</button>
              <button className="dashboard-secondary-btn" onClick={() => onClearUploads('documentImages')} type="button">Remove Images</button>
            </div>
          ) : null}
          {!isAdminView ? <input className="d-none" multiple onChange={(event) => onFileChange(event, 'documentImages')} ref={documentInputRef} type="file" /> : null}
        </div>
        <div className="upload-preview-grid">
          {documentPreviews.map((image, index) => (
            <div className={`upload-preview-card ${isAdminView ? 'readonly' : ''}`} key={`${image.url}-${index}`}>
              <img alt="Truck document upload" src={image.url} />
              {!isAdminView ? <button onClick={() => onRemovePreview('documentImages', index)} type="button">×</button> : null}
            </div>
          ))}
        </div>
      </div>

      {isStatusVisible ? (
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

export default TruckForm;
