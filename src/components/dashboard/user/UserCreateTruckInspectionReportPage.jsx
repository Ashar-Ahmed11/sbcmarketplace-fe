import { useContext, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/appContext';
import { createEmptyTruckInspectionReportForm, getTruckInspectionOverallScore, truckInspectionReportSections } from '../truckInspectionReports/truckInspectionReportUtils';
import TruckInspectionReportPreview from '../truckInspectionReports/TruckInspectionReportPreview';

function UserCreateTruckInspectionReportPage() {
  const history = useHistory();
  const { createTruckInspectionReport, searchEligibleTruckInspectionNegotiations, uploadImage } = useContext(AppContext);
  const [form, setForm] = useState(createEmptyTruckInspectionReportForm());
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedNegotiation, setSelectedNegotiation] = useState(null);
  const fileInputRefs = useRef({});

  // console.log(selectedNegotiation)
  const visibleResults = useMemo(
    () => results.filter((item) => String(item._id) !== String(form.truckInspectionServiceNegotiation)),
    [form.truckInspectionServiceNegotiation, results]
  );

  const overallScore = getTruckInspectionOverallScore(form);

  const handleSearch = async (value) => {
    setQuery(value);
    const data = await searchEligibleTruckInspectionNegotiations(value);
    setResults(Array.isArray(data) ? data : []);
  };

  const handleSelectNegotiation = (negotiation) => {
    setSelectedNegotiation(negotiation);
    setForm((current) => ({
      ...current,
      truckInspectionServiceNegotiation: negotiation?._id || '',
      inspectionRequester: negotiation?.buyer?._id || '',
    }));
  };

  const clearSelectedNegotiation = () => {
    setSelectedNegotiation(null);
    setForm((current) => ({
      ...current,
      truckInspectionServiceNegotiation: '',
      inspectionRequester: '',
    }));
  };

  const uploadSectionImages = async (sectionKey, files) => {
    const uploaded = await Promise.all(Array.from(files || []).map(async (file) => ({ url: await uploadImage(file) })));
    setForm((current) => ({
      ...current,
      [sectionKey]: {
        ...current[sectionKey],
        images: [...(current[sectionKey]?.images || []), ...uploaded],
      },
    }));
  };

  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head">
        <div>
          <h1>Create Truck Inspection Report</h1>
          <p>Fill the inspection findings and submit the report for admin approval.</p>
        </div>
      </div>

      <div className="dashboard-form-grid">
        <div className="form-field">
          <label>Search Truck Inspection Negotiation</label>
          <input onChange={(event) => handleSearch(event.target.value)} placeholder="Search by buyer name or username" type="text" value={query} />
          {selectedNegotiation ? (
            <div className="inspection-search-selected mt-2">
              <div>
                <strong>{selectedNegotiation.truck?.title || 'Selected Negotiation'}</strong>
                <span>
                  {[
                    selectedNegotiation.buyer?.fullName || selectedNegotiation.buyer?.username,
                    selectedNegotiation.truck?.brand,
                    selectedNegotiation.truck?.location,
                  ].filter(Boolean).join(' • ') || 'Truck inspection negotiation'}
                </span>
              </div>
              <button className="inspection-search-selected__clear" onClick={clearSelectedNegotiation} type="button">×</button>
            </div>
          ) : null}
          {query.trim() ? (
            <div className="inspection-search-results mt-2">
              {visibleResults.length ? visibleResults.map((item) => (
                <button className="inspection-search-result" key={item._id} onClick={() => handleSelectNegotiation(item)} type="button">
                  <strong>{item.truck?.title || 'Truck'}</strong>
                  <span>
                    {[
                      item.buyer?.fullName || item.buyer?.username,
                      item.truck?.brand,
                      item.truck?.location,
                    ].filter(Boolean).join(' • ') || 'Truck inspection negotiation'}
                  </span>
                </button>
              )) : (
                <div className="inspection-search-empty">No matching truck inspection negotiations found.</div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="dashboard-form-grid mt-3">
        <div className="form-field">
          <label>Inspection Date</label>
          <input onChange={(event) => setForm((current) => ({ ...current, inspectionDate: event.target.value }))} type="date" value={form.inspectionDate} />
        </div>
        <div className="form-field">
          <label>Overall Score</label>
          <input disabled type="text" value={`${overallScore}%`} />
        </div>
      </div>

      <div className="row g-3 mt-3">
        {truckInspectionReportSections.map(({ key, label }) => (
          <div className="col-12" key={key}>
            <div className="construction-negotiation-milestone-card">
              <div className="construction-negotiation-milestone-card__head">
                <div><h3>{label}</h3></div>
              </div>
              <div className="row g-3">
                <div className="form-field col-12">
                  <label>Score</label>
                  <input onChange={(event) => setForm((current) => ({ ...current, [key]: { ...current[key], score: event.target.value } }))} type="number" value={form[key].score} />
                </div>
              </div>
              <div className="row g-3 mt-1">
                <div className="col-12">
                  <div className="dashboard-upload-head">
                    <div><h3 className="mb-0">Images</h3></div>
                    <div className="dashboard-upload-actions">
                      <button className="dashboard-secondary-btn" onClick={() => fileInputRefs.current[key]?.click()} type="button">Upload Images</button>
                      <button className="dashboard-secondary-btn" onClick={() => setForm((current) => ({ ...current, [key]: { ...current[key], images: [] } }))} type="button">Remove Images</button>
                    </div>
                    <input className="d-none" multiple onChange={(event) => uploadSectionImages(key, event.target.files)} ref={(node) => { fileInputRefs.current[key] = node; }} type="file" />
                  </div>
                  <div className="upload-preview-grid mt-3">
                    {(form[key].images || []).map((image, index) => (
                      <div className="upload-preview-card" key={`${image.url}-${index}`}>
                        <img alt={label} src={image.url} />
                        <button onClick={() => setForm((current) => ({ ...current, [key]: { ...current[key], images: current[key].images.filter((_, itemIndex) => itemIndex !== index) } }))} type="button">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="construction-negotiation-milestone-card mt-3">
        <div className="construction-negotiation-milestone-card__head">
          <div><h3>Leakage</h3></div>
        </div>
        <div className="row g-3">
          <div className="form-field col-12">
            <label>Is Leaked</label>
            <select onChange={(event) => setForm((current) => ({ ...current, leakage: { ...current.leakage, isLeaked: event.target.value === 'yes' } }))} value={form.leakage.isLeaked ? 'yes' : 'no'}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>
        <div className="row g-3 mt-1">
          <div className="col-12">
            <div className="dashboard-upload-head">
              <div><h3 className="mb-0">Images</h3></div>
              <div className="dashboard-upload-actions">
                <button className="dashboard-secondary-btn" onClick={() => fileInputRefs.current.leakage?.click()} type="button">Upload Images</button>
                <button className="dashboard-secondary-btn" onClick={() => setForm((current) => ({ ...current, leakage: { ...current.leakage, images: [] } }))} type="button">Remove Images</button>
              </div>
              <input className="d-none" multiple onChange={(event) => uploadSectionImages('leakage', event.target.files)} ref={(node) => { fileInputRefs.current.leakage = node; }} type="file" />
            </div>
            <div className="upload-preview-grid mt-3">
              {(form.leakage.images || []).map((image, index) => (
                <div className="upload-preview-card" key={`${image.url}-${index}`}>
                  <img alt="Leakage" src={image.url} />
                  <button onClick={() => setForm((current) => ({ ...current, leakage: { ...current.leakage, images: current.leakage.images.filter((_, itemIndex) => itemIndex !== index) } }))} type="button">×</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TruckInspectionReportPreview form={form} overallScore={overallScore} selectedNegotiation={selectedNegotiation} />

      <div className="dashboard-form-actions mt-4">
        <button
          className="dashboard-action-btn"
          disabled={!form.truckInspectionServiceNegotiation}
          onClick={async () => {
            const created = await createTruckInspectionReport(form);
            history.push(`/user-dashboard/truck-inspection-report/${created._id}`);
          }}
          type="button"
        >
          Submit
        </button>
      </div>
    </section>
  );
}

export default UserCreateTruckInspectionReportPage;
