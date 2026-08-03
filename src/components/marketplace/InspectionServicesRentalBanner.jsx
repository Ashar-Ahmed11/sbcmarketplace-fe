import banner from '../../assets/figma/marketplace-banner.jpg';

function InspectionServicesRentalBanner() {
  return (
    <a className="marketplace-rental-banner" href="#requirement" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${banner})` }}>
      <small>BOOK VERIFIED FIELD CHECKS</small>
      <strong>INSPECTION<br />SERVICES</strong>
      <span>View Details</span>
    </a>
  );
}

export default InspectionServicesRentalBanner;
