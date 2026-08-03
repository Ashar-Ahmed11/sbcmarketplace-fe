function ConstructionServicesCatalogFilters() {
  return (
    <aside className="marketplace-sidebar">
      <div className="marketplace-side-tools">
        <button type="button" aria-label="Zoom out"><i className="fa fa-search-minus" /></button>
        <button type="button" aria-label="Zoom in"><i className="fa fa-search-plus" /></button>
      </div>
      <div className="market-filter-group">
        <div className="market-filter-title"><span /> Service Types <i className="fa fa-angle-down" /></div>
        <ul className="market-filter-list">
          {['Civil Works', 'Steel Structure', 'Electrical', 'Plumbing', 'Finishing', 'Interior Work'].map((item, index) => <li key={item}><input checked={index === 1} readOnly type="checkbox" /> {item}</li>)}
        </ul>
      </div>
      <div className="market-filter-group">
        <div className="market-filter-title"><span /> Team Capacity <i className="fa fa-angle-down" /></div>
        <ul className="market-filter-list">
          {['1-10 Members', '11-25 Members', '26-50 Members', '50+ Members'].map((item, index) => <li key={item}><input checked={index === 1} readOnly type="checkbox" /> {item}</li>)}
        </ul>
      </div>
      <div className="market-filter-group compact">
        <p className="market-range-label"><span /> Experience <small>(Years)</small></p>
        <input defaultValue="10" type="range" />
        <a href="#featured">Range from 1 To 25 years</a>
      </div>
      <div className="market-chip-list">
        <label><span>Onsite Service</span><input checked readOnly type="checkbox" /></label>
        <label><span>Verified Team</span><input checked readOnly type="checkbox" /></label>
      </div>
      <div className="market-pill-inputs">
        <div><small>Project City</small><input placeholder="Input text" type="text" /></div>
        <div><small>Service Area</small><input placeholder="Input text" type="text" /></div>
      </div>
    </aside>
  );
}

export default ConstructionServicesCatalogFilters;
