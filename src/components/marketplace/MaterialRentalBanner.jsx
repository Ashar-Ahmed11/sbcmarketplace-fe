import banner from '../../assets/figma/marketplace-banner.jpg';

function MaterialRentalBanner() {
  return (
    <a className="marketplace-rental-banner" href="#requirement" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${banner})` }}>
      <small>MAXIMIZE YOUR RIDES POWER</small>
      <strong>RENTAL<br />MACHINES</strong>
      <span>View Details</span>
    </a>
  );
}

export default MaterialRentalBanner;
