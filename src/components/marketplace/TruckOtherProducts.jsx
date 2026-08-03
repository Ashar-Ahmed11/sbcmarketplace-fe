import equipmentExcavator from '../../assets/figma/equipment-excavator.jpg';
import equipmentForklift from '../../assets/figma/equipment-forklift.jpg';
import equipmentLoader from '../../assets/figma/equipment-loader.png';

const otherProducts = [
  { title: 'Excavator CAT', image: equipmentExcavator },
  { title: 'ROAD-ROLLER ACE', image: equipmentForklift },
  { title: 'ACE neo Fork Lift', image: equipmentLoader },
  { title: 'Concrete Mixer Truck', image: equipmentExcavator },
];

function TruckOtherProducts() {
  return (
    <>
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
            <img alt={product.title} src={product.image} />
            <h4>{product.title}</h4>
            <div className="marketplace-other-footer">
              <span>Call for Price</span>
              <button type="button">Buy</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default TruckOtherProducts;
