import banner from '../../assets/figma/marketplace-banner.jpg';

function ConstructionServicesRentalBanner() {
  return (
    <a className="marketplace-rental-banner" href="#requirement" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${banner})` }}>
      <small>BUILD STRONGER WITH VERIFIED PARTNERS</small>
      <strong>CONSTRUCTION<br />SERVICES</strong>
      <span>View Details</span>
    </a>
  );
}

export default ConstructionServicesRentalBanner;
