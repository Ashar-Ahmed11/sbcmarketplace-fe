import equipmentExcavator from '../../assets/figma/equipment-excavator.jpg';
import equipmentForklift from '../../assets/figma/equipment-forklift.jpg';
import equipmentLoader from '../../assets/figma/equipment-loader.png';

const otherServices = [
  { title: 'Excavation Service', image: equipmentExcavator },
  { title: 'Structural Team', image: equipmentForklift },
  { title: 'Site Equipment Crew', image: equipmentLoader },
  { title: 'Concrete Works Team', image: equipmentExcavator },
];

function ConstructionServicesOtherProducts() {
  return (
    <>
      <div className="marketplace-heading-row other-products">
        <h2>OTHER SERVICES</h2>
        <div className="marketplace-tabs">
          <span>BEST MATCHES</span>
          <span className="active simple">TOP RATED</span>
          <span>NEW ARRIVALS</span>
        </div>
      </div>
      <div className="marketplace-other-grid">
        {otherServices.map((product) => (
          <article className="marketplace-other-card" key={product.title}>
            <img alt={product.title} src={product.image} />
            <h4>{product.title}</h4>
            <div className="marketplace-other-footer">
              <span>Call for Quote</span>
              <button type="button">View</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default ConstructionServicesOtherProducts;
