import { useContext, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/appContext';
import {
  createEmptyConstructionMaterialInspectionReportForm,
  getConstructionMaterialInspectionOverallScore,
} from '../constructionMaterialInspectionReports/constructionMaterialInspectionReportUtils';
import ConstructionMaterialInspectionReportPreview from '../constructionMaterialInspectionReports/ConstructionMaterialInspectionReportPreview';

function formatNegotiationDateTime(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function UserCreateConstructionMaterialInspectionReportPage() {
  const history = useHistory();
  const {
    createConstructionMaterialInspectionReport,
    searchEligibleConstructionMaterialInspectionNegotiations,
    uploadImage,
  } = useContext(AppContext);
  const [form, setForm] = useState(createEmptyConstructionMaterialInspectionReportForm());
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedNegotiation, setSelectedNegotiation] = useState(null);
  const fileInputRefs = useRef({});
  const visibleResults = useMemo(
    () => results.filter((item) => String(item._id) !== String(form.constructionMaterialInspectionNegotiation)),
    [form.constructionMaterialInspectionNegotiation, results]
  );
  const overallScore = getConstructionMaterialInspectionOverallScore(form);

  const handleSearch = async (value) => {
    setQuery(value);
    const data = await searchEligibleConstructionMaterialInspectionNegotiations(value);
    setResults(Array.isArray(data) ? data : []);
  };

  const handleSelectNegotiation = (negotiation) => {
    setSelectedNegotiation(negotiation);
    setForm((current) => ({
      ...current,
      constructionMaterialInspectionNegotiation: negotiation?._id || '',
      inspectionRequester: negotiation?.buyer?._id || '',
    }));
  };

  const clearSelectedNegotiation = () => {
    setSelectedNegotiation(null);
    setForm((current) => ({
      ...current,
      constructionMaterialInspectionNegotiation: '',
      inspectionRequester: '',
    }));
  };

  const uploadSectionImages = async (sectionKey, files) => {
    const uploaded = await Promise.all(Array.from(files || []).map(async (file) => ({ url: await uploadImage(file) })));
    setForm((current) => ({
      ...current,
      [sectionKey]: { ...current[sectionKey], images: [...(current[sectionKey]?.images || []), ...uploaded] },
    }));
  };

  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head"><div><h1>Create Construction Material Inspection Report</h1><p>Fill the inspection findings and submit the report for admin approval.</p></div></div>

      <div className="dashboard-form-grid">
        <div className="form-field">
          <label>Search Construction Material Inspection Negotiation</label>
          <input onChange={(event) => handleSearch(event.target.value)} placeholder="Search by buyer name or username" type="text" value={query} />
          {selectedNegotiation ? (
            <div className="inspection-search-selected mt-2">
              <div>
                <strong>{selectedNegotiation.constructionMaterial?.title || 'Selected Negotiation'}</strong>
                <span>{[selectedNegotiation.buyer?.fullName || selectedNegotiation.buyer?.username, selectedNegotiation.constructionMaterial?.brand, selectedNegotiation.constructionMaterial?.location].filter(Boolean).join(' • ') || 'Construction material inspection negotiation'}</span>
                <span>{formatNegotiationDateTime(selectedNegotiation.createdAt)}</span>
              </div>
              <button className="inspection-search-selected__clear" onClick={clearSelectedNegotiation} type="button">×</button>
            </div>
          ) : null}
          {query.trim() ? (
            <div className="inspection-search-results mt-2">
              {visibleResults.length ? visibleResults.map((item) => (
                <button className="inspection-search-result" key={item._id} onClick={() => handleSelectNegotiation(item)} type="button">
                  <strong>{item.constructionMaterial?.title || 'Construction Material'}</strong>
                  <span>{[item.buyer?.fullName || item.buyer?.username, item.constructionMaterial?.brand, item.constructionMaterial?.location].filter(Boolean).join(' • ') || 'Construction material inspection negotiation'}</span>
                  <span>{formatNegotiationDateTime(item.createdAt)}</span>
                </button>
              )) : <div className="inspection-search-empty">No matching construction material inspection negotiations found.</div>}
            </div>
          ) : null}
        </div>
      </div>

      <div className="dashboard-form-grid mt-3">
        <div className="form-field"><label>Inspection Date</label><input onChange={(event) => setForm((current) => ({ ...current, inspectionDate: event.target.value }))} type="date" value={form.inspectionDate} /></div>
        <div className="form-field"><label>Overall Score</label><input disabled type="text" value={`${overallScore}%`} /></div>
      </div>

      <div className="row g-3 mt-3">
        <div className="col-12">
          <div className="construction-negotiation-milestone-card">
            <div className="construction-negotiation-milestone-card__head"><div><h3>Quantity Verification</h3></div></div>
            <div className="form-field col-12">
              <label>Verified</label>
              <select onChange={(event) => setForm((current) => ({ ...current, quantityVerification: { verified: event.target.value === 'yes' } }))} value={form.quantityVerification.verified ? 'yes' : 'no'}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="construction-negotiation-milestone-card">
            <div className="construction-negotiation-milestone-card__head"><div><h3>Quality</h3></div></div>
            <div className="form-field col-12"><label>Score</label><input onChange={(event) => setForm((current) => ({ ...current, quality: { ...current.quality, score: event.target.value } }))} type="number" value={form.quality.score} /></div>
            <div className="dashboard-upload-head mt-3">
              <div><h3 className="mb-0">Images</h3></div>
              <div className="dashboard-upload-actions">
                <button className="dashboard-secondary-btn" onClick={() => fileInputRefs.current.quality?.click()} type="button">Upload Images</button>
                <button className="dashboard-secondary-btn" onClick={() => setForm((current) => ({ ...current, quality: { ...current.quality, images: [] } }))} type="button">Remove Images</button>
              </div>
              <input className="d-none" multiple onChange={(event) => uploadSectionImages('quality', event.target.files)} ref={(node) => { fileInputRefs.current.quality = node; }} type="file" />
            </div>
            <div className="upload-preview-grid mt-3">{(form.quality.images || []).map((image, index) => <div className="upload-preview-card" key={`${image.url}-${index}`}><img alt="Quality" src={image.url} /><button onClick={() => setForm((current) => ({ ...current, quality: { ...current.quality, images: current.quality.images.filter((_, itemIndex) => itemIndex !== index) } }))} type="button">×</button></div>)}</div>
          </div>
        </div>

        <div className="col-12">
          <div className="construction-negotiation-milestone-card">
            <div className="construction-negotiation-milestone-card__head"><div><h3>Dates</h3></div></div>
            <div className="row g-3">
              <div className="form-field col-md-6"><label>Manufacturing Date</label><input onChange={(event) => setForm((current) => ({ ...current, manufacturingDate: event.target.value }))} type="date" value={form.manufacturingDate} /></div>
              <div className="form-field col-md-6"><label>Expiry Date</label><input onChange={(event) => setForm((current) => ({ ...current, expiryDate: event.target.value }))} type="date" value={form.expiryDate} /></div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="construction-negotiation-milestone-card">
            <div className="construction-negotiation-milestone-card__head"><div><h3>Packaging Condition</h3></div></div>
            <div className="row g-3">
              <div className="form-field col-md-6"><label>Packaging Available</label><select onChange={(event) => setForm((current) => ({ ...current, packagingCondition: { ...current.packagingCondition, isPackagingAvailable: event.target.value === 'yes' } }))} value={form.packagingCondition.isPackagingAvailable ? 'yes' : 'no'}><option value="no">No</option><option value="yes">Yes</option></select></div>
              <div className="form-field col-md-6"><label>Score</label><input onChange={(event) => setForm((current) => ({ ...current, packagingCondition: { ...current.packagingCondition, score: event.target.value } }))} type="number" value={form.packagingCondition.score} /></div>
            </div>
            <div className="dashboard-upload-head mt-3">
              <div><h3 className="mb-0">Images</h3></div>
              <div className="dashboard-upload-actions">
                <button className="dashboard-secondary-btn" onClick={() => fileInputRefs.current.packagingCondition?.click()} type="button">Upload Images</button>
                <button className="dashboard-secondary-btn" onClick={() => setForm((current) => ({ ...current, packagingCondition: { ...current.packagingCondition, images: [] } }))} type="button">Remove Images</button>
              </div>
              <input className="d-none" multiple onChange={(event) => uploadSectionImages('packagingCondition', event.target.files)} ref={(node) => { fileInputRefs.current.packagingCondition = node; }} type="file" />
            </div>
            <div className="upload-preview-grid mt-3">{(form.packagingCondition.images || []).map((image, index) => <div className="upload-preview-card" key={`${image.url}-${index}`}><img alt="Packaging Condition" src={image.url} /><button onClick={() => setForm((current) => ({ ...current, packagingCondition: { ...current.packagingCondition, images: current.packagingCondition.images.filter((_, itemIndex) => itemIndex !== index) } }))} type="button">×</button></div>)}</div>
          </div>
        </div>
      </div>

      <div className="py-2">
        <ConstructionMaterialInspectionReportPreview form={form} overallScore={overallScore} selectedNegotiation={selectedNegotiation} />
      </div>

      <div className="dashboard-form-actions mt-4">
        <button className="dashboard-action-btn" disabled={!form.constructionMaterialInspectionNegotiation} onClick={async () => {
          const created = await createConstructionMaterialInspectionReport(form);
          history.push(`/user-dashboard/construction-material-inspection-report/${created._id}`);
        }} type="button">Submit</button>
      </div>
    </section>
  );
}

export default UserCreateConstructionMaterialInspectionReportPage;
