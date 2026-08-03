function RepairServicesCatalogFilters() {
  return (
    <aside className="marketplace-sidebar">
      <div className="marketplace-side-tools">
        <button type="button" aria-label="Zoom out"><i className="fa fa-search-minus" /></button>
        <button type="button" aria-label="Zoom in"><i className="fa fa-search-plus" /></button>
      </div>
      <div className="market-filter-group">
        <div className="market-filter-title"><span /> Repair Types <i className="fa fa-angle-down" /></div>
        <ul className="market-filter-list">
          {['Engine Repair', 'Hydraulic Repair', 'Body Work', 'Electrical Repair', 'Field Service'].map((item, index) => <li key={item}><input checked={index === 1} readOnly type="checkbox" /> {item}</li>)}
        </ul>
      </div>
      <div className="market-filter-group compact">
        <p className="market-range-label"><span /> Experience <small>(Years)</small></p>
        <input defaultValue="10" type="range" />
        <a href="#featured">Range from 1 To 25 years</a>
      </div>
      <div className="market-chip-list">
        <label><span>Onsite Repair</span><input checked readOnly type="checkbox" /></label>
        <label><span>Verified Team</span><input checked readOnly type="checkbox" /></label>
      </div>
      <div className="market-pill-inputs">
        <div><small>Repair City</small><input placeholder="Input text" type="text" /></div>
        <div><small>Service Area</small><input placeholder="Input text" type="text" /></div>
      </div>
    </aside>
  );
}

export default RepairServicesCatalogFilters;
