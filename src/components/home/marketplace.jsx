import banner from '../../assets/figma/marketplace-banner.jpg';
import excavator from '../../assets/figma/equipment-excavator.jpg';
import forklift from '../../assets/figma/equipment-forklift.jpg';
import loader from '../../assets/figma/equipment-loader.png';

const equipment = [{name:'Excavator', image:excavator},{name:'Fork lift', image:forklift},{name:'Wheel loader', image:loader}];

function Marketplace() {
  return (
    <section className="marketplace-section" id="marketplace">
      <div className="container-xl marketplace-grid">
        <article className="requirement-card" id="requirement"><span className="orange-pill">ONE REQUEST. FULL SUPPORT.</span><div className="handshake">🤝</div><h2>Need Equipment, Materials, or Services? Post Your Project Requirement.</h2><p>Define your project needs, including all necessary assets and resources.</p><div><button>Submit Your Requirement</button><button className="outline-btn">Login to Dashboard</button></div></article>
        <div className="fleet-panel">
          <div className="fleet-banner" style={{backgroundImage:`linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.35)), url(${banner})`}}><h3>Buy or Sell Excavator, Bulldozer, Tower Crane, Mobile Crane, Forklift, Road Roller, Off-Road Dump Truck, Concrete Mix Truck, Carry Deck Crane and more</h3><a href="#featured">Visit Marketplace</a></div>
          <p className="featured-label" id="featured">Featured Listings</p>
          <div className="equipment-grid">{equipment.map((item)=><article className="equipment-card" key={item.name}><img src={item.image} alt={item.name} /><h4>{item.name}<span>↗</span></h4><p>See Listing at Marketplace</p></article>)}</div>
        </div>
      </div>
    </section>
  );
}

export default Marketplace;
