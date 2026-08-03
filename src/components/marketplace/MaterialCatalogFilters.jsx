const categoryItems = [
  'Excavators',
  'Wheel Loaders',
  'Backhoe Loaders',
  'Bulldozers',
  'Motor Graders',
  'Road Rollers / Compactors',
  'Cranes',
  'Dumpers / Tippers',
  'Low Bed / Trailers',
  'Forklifts',
  'Concrete Mixer',
  'Generators',
  'Water Bowsers / Tankers',
];

const machineTypes = [
  'Compact Wheel Loader Upto 3T',
  'Standard Wheel Loader 3T to 8T',
  'Heavy Wheel Loader 8T+',
  'Backhoe-Loader Combo',
  'Special Attachment Loader',
  'Zero Emission Loader',
];

function MaterialCatalogFilters() {
  return (
    <aside className="marketplace-sidebar">
      <div className="marketplace-side-tools">
        <button type="button" aria-label="Zoom out"><i className="fa fa-search-minus" /></button>
        <button type="button" aria-label="Zoom in"><i className="fa fa-search-plus" /></button>
      </div>
      <div className="market-filter-group">
        <div className="market-filter-title"><span /> Categories <i className="fa fa-angle-down" /></div>
        <ul className="market-filter-list">
          {categoryItems.map((item, index) => <li key={item}><input checked={index === 1} readOnly type="checkbox" /> {item}</li>)}
        </ul>
      </div>
      <div className="market-filter-group">
        <div className="market-filter-title"><span /> Machine Type <i className="fa fa-angle-down" /></div>
        <ul className="market-filter-list">
          {machineTypes.map((item, index) => <li key={item}><input checked={index === 1} readOnly type="checkbox" /> {item}</li>)}
        </ul>
      </div>
      <div className="market-filter-group compact">
        <p className="market-range-label"><span /> Model <small>(Manufacturing Year)</small></p>
        <input defaultValue="2000 to 2026" type="range" />
        <a href="#featured">Range from 2000 To 2026</a>
      </div>
      <div className="market-filter-group compact">
        <p className="market-range-label"><span /> Price <small>(Budget in PKR)</small></p>
        <input defaultValue="50" type="range" />
        <a href="#featured">Range from 5,000,000 To 50,000,000</a>
      </div>
      <div className="market-chip-list">
        <label><span>Seller Delivery</span><input checked readOnly type="checkbox" /></label>
        <label><span>Inspection by SBC</span><input checked readOnly type="checkbox" /></label>
        <div className="market-condition-row">
          <label><span>Condition Used</span><input checked readOnly type="checkbox" /></label>
          <label><span>Condition New</span><input checked readOnly type="checkbox" /></label>
        </div>
      </div>
      <div className="market-pill-inputs">
        <div><small>Your Location</small><input placeholder="Input text" type="text" /></div>
        <div><small>Delivery Location</small><input placeholder="Input text" type="text" /></div>
      </div>
      <div className="market-brands-box">
        <strong>BRANDS</strong>
        <div className="market-brand-cloud">
          <span className="orange">Volvo</span>
          <span>CAT</span>
          <span className="small">samsung</span>
          <span>SANY</span>
          <span className="italic">DONGFENG</span>
          <span className="tall">HITACHI</span>
        </div>
      </div>
    </aside>
  );
}

export default MaterialCatalogFilters;
