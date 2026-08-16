import { useMemo, useRef } from 'react';
import Select from 'react-dropdown-select';

function ServiceSpecialistForm({
  areaField,
  areaLabel,
  categories,
  categoryLabel,
  cities,
  data,
  imagePreviews,
  certificationPreviews,
  isAdminView,
  onCategoryMultiChange,
  onClearUploads,
  onFileChange,
  onOfferChange,
  onRemovePreview,
  onStatusChange,
  onSubmit,
  onTextChange,
  selectedCategoryIds = [],
  statusActionLabel,
  submitLabel,
}) {
  const imageInputRef = useRef(null);
  const certificationInputRef = useRef(null);
  const categoryOptions = useMemo(() => categories.map((item) => ({ label: item.name, value: item._id })), [categories]);
  const selectedCategories = useMemo(() => categoryOptions.filter((item) => selectedCategoryIds.includes(item.value)), [categoryOptions, selectedCategoryIds]);
  const cityOptions = useMemo(() => cities.map((city) => ({ label: city, value: city })), [cities]);
  const selectedCities = useMemo(() => cityOptions.filter((item) => (data[areaField] || []).some((area) => area.city === item.value)), [areaField, cityOptions, data]);

  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head">
        <div>
          <h1>{submitLabel}</h1>
          <p>Complete the service listing details below.</p>
        </div>
      </div>

      <div className="dashboard-form-grid">
        <div className="form-field">
          <label>{categoryLabel}</label>
          {isAdminView ? (
            <input disabled type="text" value={selectedCategories.map((item) => item.label).join(', ')} />
          ) : (
            <div className="dashboard-multi-select">
              <Select
                create={false}
                clearOnSelect={false}
                closeOnSelect={false}
                dropdownHandle
                keepSelectedInList
                labelField="label"
                multi
                onChange={(values) => onCategoryMultiChange(values.map((item) => item.value))}
                options={categoryOptions}
                placeholder="Select categories"
                searchBy="label"
                selectAll
                selectAllLabel="Select all"
                clearAllLabel="Clear all"
                value={selectedCategories}
                values={selectedCategories}
              />
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-form-grid dashboard-form-grid-primary">
        <div className="form-field">
          <label>Title</label>
          <input disabled={isAdminView} name="title" onChange={onTextChange} type="text" value={data.title} />
        </div>
        <div className="form-field">
          <label>Years of Experience</label>
          <input disabled={isAdminView} name="yearsOfExperience" onChange={onTextChange} type="number" value={data.yearsOfExperience} />
        </div>
        <div className="form-field">
          <label>Team Size</label>
          <input disabled={isAdminView} name="teamSize" onChange={onTextChange} type="number" value={data.teamSize} />
        </div>
        <div className="form-field">
          <label>Location</label>
          <input disabled={isAdminView} name="location" onChange={onTextChange} type="text" value={data.location} />
        </div>
        <div className="form-field">
          <label>City</label>
          <select disabled={isAdminView} name="city" onChange={onTextChange} value={data.city || ''}>
            <option value="">Select City</option>
            {cities.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>
        <div className="form-field form-field-full">
          <label>Description</label>
          <textarea disabled={isAdminView} name="description" onChange={onTextChange} rows="5" value={data.description} />
        </div>
      </div>

      <div className="dashboard-form-grid compact-switches">
        <label>
          <input checked={Boolean(data.offerOnsiteInspection ?? data.offerOnsiteRepair)} disabled={isAdminView} onChange={(event) => onOfferChange(event.target.checked)} type="checkbox" />
          {areaLabel === 'Inspection Areas' ? 'Offer Onsite Inspection' : 'Offer Onsite Repair'}
        </label>
      </div>

      <div className="dashboard-nested-section">
        <h2>{areaLabel}</h2>
        <div className="form-field">
          {isAdminView ? (
            <input disabled type="text" value={selectedCities.map((item) => item.label).join(', ')} />
          ) : (
            <div className="dashboard-multi-select">
              <Select
                create={false}
                clearOnSelect={false}
                closeOnSelect={false}
                dropdownHandle
                keepSelectedInList
                labelField="label"
                multi
                onChange={(values) => onTextChange({ target: { name: areaField, value: values.map((item) => ({ city: item.value })) } })}
                options={cityOptions}
                placeholder={`Select ${areaLabel.toLowerCase()}`}
                searchBy="label"
                selectAll
                selectAllLabel="Select all"
                clearAllLabel="Clear all"
                value={selectedCities}
                values={selectedCities}
              />
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-upload-block">
        <div className="dashboard-upload-head">
          <div>
            <h2>Images</h2>
            <p>Upload service listing images.</p>
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
              <img alt="Service upload" src={image.url} />
              {!isAdminView ? <button onClick={() => onRemovePreview('images', index)} type="button">×</button> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-upload-block">
        <div className="dashboard-upload-head">
          <div>
            <h2>Certification Images</h2>
            <p>Upload certifications and proofs.</p>
          </div>
          {!isAdminView ? (
            <div className="dashboard-upload-actions">
              <button className="dashboard-secondary-btn" onClick={() => certificationInputRef.current?.click()} type="button">Upload Image</button>
              <button className="dashboard-secondary-btn" onClick={() => onClearUploads('certificationsImages')} type="button">Remove Images</button>
            </div>
          ) : null}
          {!isAdminView ? <input className="d-none" multiple onChange={(event) => onFileChange(event, 'certificationsImages')} ref={certificationInputRef} type="file" /> : null}
        </div>
        <div className="upload-preview-grid">
          {certificationPreviews.map((image, index) => (
            <div className={`upload-preview-card ${isAdminView ? 'readonly' : ''}`} key={`${image.url}-${index}`}>
              <img alt="Service certification upload" src={image.url} />
              {!isAdminView ? <button onClick={() => onRemovePreview('certificationsImages', index)} type="button">×</button> : null}
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

export default ServiceSpecialistForm;
