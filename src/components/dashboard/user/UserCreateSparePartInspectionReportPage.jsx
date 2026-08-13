import { useContext, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/appContext';
import { createEmptySparePartInspectionReportForm, getSparePartInspectionOverallScore } from '../sparePartInspectionReports/sparePartInspectionReportUtils';
import SparePartInspectionReportPreview from '../sparePartInspectionReports/SparePartInspectionReportPreview';

function formatNegotiationDateTime(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function UserCreateSparePartInspectionReportPage() {
  const history = useHistory();
  const { createSparePartInspectionReport, searchEligibleSparePartInspectionNegotiations, uploadImage } = useContext(AppContext);
  const [form, setForm] = useState(createEmptySparePartInspectionReportForm());
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedNegotiation, setSelectedNegotiation] = useState(null);
  const fileInputRefs = useRef({});
  const visibleResults = useMemo(() => results.filter((item) => String(item._id) !== String(form.sparePartInspectionNegotiation)), [form.sparePartInspectionNegotiation, results]);
  const overallScore = getSparePartInspectionOverallScore(form);

  const handleSearch = async (value) => {
    setQuery(value);
    const data = await searchEligibleSparePartInspectionNegotiations(value);
    setResults(Array.isArray(data) ? data : []);
  };

  const handleSelectNegotiation = (negotiation) => {
    setSelectedNegotiation(negotiation);
    setForm((current) => ({ ...current, sparePartInspectionNegotiation: negotiation?._id || '', inspectionRequester: negotiation?.buyer?._id || '' }));
  };

  const clearSelectedNegotiation = () => {
    setSelectedNegotiation(null);
    setForm((current) => ({ ...current, sparePartInspectionNegotiation: '', inspectionRequester: '' }));
  };

  const uploadSectionImages = async (sectionKey, files, nestedKey = null) => {
    const uploaded = await Promise.all(Array.from(files || []).map(async (file) => ({ url: await uploadImage(file) })));
    setForm((current) => nestedKey ? ({
      ...current,
      [sectionKey]: { ...current[sectionKey], [nestedKey]: [...(current[sectionKey]?.[nestedKey] || []), ...uploaded] },
    }) : ({
      ...current,
      [sectionKey]: { ...current[sectionKey], images: [...(current[sectionKey]?.images || []), ...uploaded] },
    }));
  };

  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head"><div><h1>Create Spare Part Inspection Report</h1><p>Fill the inspection findings and submit the report for admin approval.</p></div></div>
      <div className="dashboard-form-grid">
        <div className="form-field">
          <label>Search Spare Part Inspection Negotiation</label>
          <input onChange={(event) => handleSearch(event.target.value)} placeholder="Search by buyer name or username" type="text" value={query} />
          {selectedNegotiation ? (
            <div className="inspection-search-selected mt-2">
              <div>
                <strong>{selectedNegotiation.sparePart?.title || 'Selected Negotiation'}</strong>
                <span>{[selectedNegotiation.buyer?.fullName || selectedNegotiation.buyer?.username, selectedNegotiation.sparePart?.brand, selectedNegotiation.sparePart?.location].filter(Boolean).join(' • ') || 'Spare part inspection negotiation'}</span>
                <span>{formatNegotiationDateTime(selectedNegotiation.createdAt)}</span>
              </div>
              <button className="inspection-search-selected__clear" onClick={clearSelectedNegotiation} type="button">×</button>
            </div>
          ) : null}
          {query.trim() ? (
            <div className="inspection-search-results mt-2">
              {visibleResults.length ? visibleResults.map((item) => (
                <button className="inspection-search-result" key={item._id} onClick={() => handleSelectNegotiation(item)} type="button">
                  <strong>{item.sparePart?.title || 'Spare Part'}</strong>
                  <span>{[item.buyer?.fullName || item.buyer?.username, item.sparePart?.brand, item.sparePart?.location].filter(Boolean).join(' • ') || 'Spare part inspection negotiation'}</span>
                  <span>{formatNegotiationDateTime(item.createdAt)}</span>
                </button>
              )) : <div className="inspection-search-empty">No matching spare part inspection negotiations found.</div>}
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
            <div className="construction-negotiation-milestone-card__head"><div><h3>Brand Verification</h3></div></div>
            <div className="form-field col-12"><label>Verified</label><select onChange={(event) => setForm((current) => ({ ...current, brandVerification: { verified: event.target.value === 'yes' } }))} value={form.brandVerification.verified ? 'yes' : 'no'}><option value="no">No</option><option value="yes">Yes</option></select></div>
          </div>
        </div>
        <div className="col-12">
          <div className="construction-negotiation-milestone-card">
            <div className="construction-negotiation-milestone-card__head"><div><h3>Physical Condition</h3></div></div>
            <div className="form-field col-12"><label>Score</label><input onChange={(event) => setForm((current) => ({ ...current, physicalCondition: { ...current.physicalCondition, score: event.target.value } }))} type="number" value={form.physicalCondition.score} /></div>
            <div className="dashboard-upload-head mt-3">
              <div><h3 className="mb-0">Images</h3></div>
              <div className="dashboard-upload-actions"><button className="dashboard-secondary-btn" onClick={() => fileInputRefs.current.physicalCondition?.click()} type="button">Upload Images</button><button className="dashboard-secondary-btn" onClick={() => setForm((current) => ({ ...current, physicalCondition: { ...current.physicalCondition, images: [] } }))} type="button">Remove Images</button></div>
              <input className="d-none" multiple onChange={(event) => uploadSectionImages('physicalCondition', event.target.files)} ref={(node) => { fileInputRefs.current.physicalCondition = node; }} type="file" />
            </div>
            <div className="upload-preview-grid mt-3">{(form.physicalCondition.images || []).map((image, index) => <div className="upload-preview-card" key={`${image.url}-${index}`}><img alt="Physical Condition" src={image.url} /><button onClick={() => setForm((current) => ({ ...current, physicalCondition: { ...current.physicalCondition, images: current.physicalCondition.images.filter((_, itemIndex) => itemIndex !== index) } }))} type="button">×</button></div>)}</div>
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
              <div className="dashboard-upload-actions"><button className="dashboard-secondary-btn" onClick={() => fileInputRefs.current.packagingCondition?.click()} type="button">Upload Images</button><button className="dashboard-secondary-btn" onClick={() => setForm((current) => ({ ...current, packagingCondition: { ...current.packagingCondition, images: [] } }))} type="button">Remove Images</button></div>
              <input className="d-none" multiple onChange={(event) => uploadSectionImages('packagingCondition', event.target.files)} ref={(node) => { fileInputRefs.current.packagingCondition = node; }} type="file" />
            </div>
            <div className="upload-preview-grid mt-3">{(form.packagingCondition.images || []).map((image, index) => <div className="upload-preview-card" key={`${image.url}-${index}`}><img alt="Packaging Condition" src={image.url} /><button onClick={() => setForm((current) => ({ ...current, packagingCondition: { ...current.packagingCondition, images: current.packagingCondition.images.filter((_, itemIndex) => itemIndex !== index) } }))} type="button">×</button></div>)}</div>
          </div>
        </div>
      </div>
      <div className="py-2"><SparePartInspectionReportPreview form={form} overallScore={overallScore} selectedNegotiation={selectedNegotiation} /></div>
      <div className="dashboard-form-actions mt-4">
        <button className="dashboard-action-btn" disabled={!form.sparePartInspectionNegotiation} onClick={async () => {
          const created = await createSparePartInspectionReport(form);
          history.push(`/user-dashboard/spare-part-inspection-report/${created._id}`);
        }} type="button">Submit</button>
      </div>
    </section>
  );
}

export default UserCreateSparePartInspectionReportPage;
