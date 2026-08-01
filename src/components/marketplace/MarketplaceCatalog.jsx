import banner from '../../assets/figma/marketplace-banner.jpg';
import equipmentExcavator from '../../assets/figma/equipment-excavator.jpg';
import equipmentForklift from '../../assets/figma/equipment-forklift.jpg';
import equipmentLoader from '../../assets/figma/equipment-loader.png';

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

const listings = [
  {
    title: 'Standard Wheel Loader — CAT 908M',
    image: equipmentExcavator,
    price: '38,50,000',
    quantity: '1',
    detailA: 'Condition: Used',
    detailB: 'Hour Meter: 3,100 hrs',
    specs: ['Brand: Caterpillar', 'Manufacture Year: 2020', 'Warranty: Available', 'Location: Karachi ★ 4.7'],
    specs2: ['Model: 908M', 'Inspection: SBC Verified', 'Delivery: Buyer Pickup / Seller Delivery'],
  },
  {
    title: 'Compact Wheel Loader — Komatsu WA100M',
    image: equipmentForklift,
    price: '29,75,000',
    quantity: '3',
    detailA: 'Condition: Used',
    detailB: 'Hour Meter: 4,600 hrs',
    specs: ['Brand: Komatsu', 'Manufacture Year: 2019', 'Warranty: Not Available', 'Location: Lahore ★ 4.3'],
    specs2: ['Model: WA100M-8', 'Inspection: Available', 'Delivery: Buyer Pickup Only'],
  },
  {
    title: 'Wheel Loader with Forks Attachment — SDLG LG936L',
    image: equipmentLoader,
    price: '34,20,000',
    quantity: '1',
    detailA: 'Condition: New',
    detailB: 'Hour Meter: 0 hrs',
    specs: ['Brand: SDLG', 'Manufacture Year: 2024', 'Warranty: Available', 'Location: Karachi ★ 4.9'],
    specs2: ['Model: LG936L', 'Inspection: SBC Verified', 'Delivery: Seller Delivery'],
  },
  {
    title: 'Long Boom Wheel Loader — Liugong 856H',
    image: equipmentExcavator,
    price: '31,00,000',
    quantity: '1',
    detailA: 'Condition: Used',
    detailB: 'Model: 856H',
    specs: ['Brand: Liugong', 'Manufacture Year: 2018', 'Warranty: Not Available', 'Location: Faisalabad ★ 4.1'],
    specs2: ['Model: 856H', 'Inspection: Available', 'Delivery: Buyer Pickup / Seller Delivery'],
  },
  {
    title: 'Special Attachment Wheel Loader — XCMG ZL30GN',
    image: equipmentLoader,
    price: '41,80,000',
    quantity: '2',
    detailA: 'Condition: New',
    detailB: 'Hour Meter: 0 hrs',
    specs: ['Brand: XCMG', 'Manufacture Year: 2024', 'Warranty: Available', 'Location: Islamabad ★ 4.8'],
    specs2: ['Model: ZL30GN', 'Inspection: SBC Verified', 'Delivery: Seller Delivery'],
  },
];

const otherProducts = [
  { title: 'Excavator CAT', image: equipmentExcavator },
  { title: 'ROAD-ROLLER ACE', image: equipmentForklift },
  { title: 'ACE neo Fork Lift', image: equipmentLoader },
  { title: 'Concrete Mixer Truck', image: equipmentExcavator },
];

function MarketplaceCatalog() {
  return (
    <section className="marketplace-catalog">
      <div className="container-xl marketplace-layout">
        <aside className="marketplace-sidebar">
          <div className="marketplace-side-tools">
            <button type="button" aria-label="Zoom out"><i className="fa fa-search-minus" /></button>
            <button type="button" aria-label="Zoom in"><i className="fa fa-search-plus" /></button>
          </div>

          <div className="market-filter-group">
            <div className="market-filter-title"><span /> Categories <i className="fa fa-angle-down" /></div>
            <ul className="market-filter-list">
              {categoryItems.map((item, index) => (
                <li key={item}><input checked={index === 1} readOnly type="checkbox" /> {item}</li>
              ))}
            </ul>
          </div>

          <div className="market-filter-group">
            <div className="market-filter-title"><span /> Machine Type <i className="fa fa-angle-down" /></div>
            <ul className="market-filter-list">
              {machineTypes.map((item, index) => (
                <li key={item}><input checked={index === 1} readOnly type="checkbox" /> {item}</li>
              ))}
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

        <div className="marketplace-main">
          <div className="marketplace-heading-row">
            <h2>WHAT WE OFFER</h2>
            <div className="marketplace-tabs">
              <span className="active">NEW ARRIVALS</span>
              <span>FEATURES</span>
              <span>FEATURES</span>
            </div>
          </div>

          <div className="marketplace-listings" id="featured">
            {listings.map((listing) => (
              <article className="marketplace-listing-card" key={listing.title}>
                <div className="marketplace-listing-media">
                  <img src={listing.image} alt={listing.title} />
                  <div className="marketplace-listing-links">
                    <span>View Catelogue</span>
                    <span>Print Quotation</span>
                  </div>
                </div>
                <div className="marketplace-listing-copy">
                  <h3>{listing.title}</h3>
                  <p className="marketplace-meta">
                    <span><i className="fa fa-circle" /> {listing.detailA}</span>
                    <span><i className="fa fa-circle" /> {listing.detailB}</span>
                  </p>
                  <strong>Quantity Available: {listing.quantity}</strong>
                  <div className="marketplace-spec-grid">
                    <ul>
                      {listing.specs.map((spec) => <li key={spec}>{spec}</li>)}
                    </ul>
                    <ul>
                      {listing.specs2.map((spec) => <li key={spec}>{spec}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="marketplace-price-box">
                  <small>Total Price<br />Incl. Taxes</small>
                  <strong>Price: Rs. {listing.price}</strong>
                  <button type="button">Book a Meeting</button>
                </div>
              </article>
            ))}
          </div>

          <button className="marketplace-loadmore" type="button">Load more listings</button>

          <a className="marketplace-rental-banner" href="#requirement" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${banner})` }}>
            <small>MAXIMIZE YOUR RIDES POWER</small>
            <strong>RENTAL<br />MACHINES</strong>
            <span>View Details</span>
          </a>

          <div className="marketplace-heading-row other-products">
            <h2>OTHER PRODUCTS</h2>
            <div className="marketplace-tabs">
              <span>BEST SELLERS</span>
              <span className="active simple">TOP SELLER</span>
              <span>FLASH DEALS</span>
            </div>
          </div>

          <div className="marketplace-other-grid">
            {otherProducts.map((product) => (
              <article className="marketplace-other-card" key={product.title}>
                <img src={product.image} alt={product.title} />
                <h4>{product.title}</h4>
                <div className="marketplace-other-footer">
                  <span>Call for Price</span>
                  <button type="button">Buy</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MarketplaceCatalog;
