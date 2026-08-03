import banner from '../../assets/figma/marketplace-banner.jpg';

function RepairServicesRentalBanner() {
  return (
    <a className="marketplace-rental-banner" href="#requirement" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${banner})` }}>
      <small>FIND RELIABLE FIELD SUPPORT</small>
      <strong>REPAIR<br />SERVICES</strong>
      <span>View Details</span>
    </a>
  );
}

export default RepairServicesRentalBanner;
