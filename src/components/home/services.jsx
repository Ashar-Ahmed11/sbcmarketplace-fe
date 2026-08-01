import residential from '../../assets/figma/service-residential.png';
import commercial from '../../assets/figma/service-commercial.png';
import renovation from '../../assets/figma/service-renovation.png';

const services = [{title:'Residential Construction',image:residential,icon:'fa-home'},{title:'Commercial Construction',image:commercial,icon:'fa-building-o'},{title:'Renovation & Remodeling',image:renovation,icon:'fa-wrench'}];

function Services() {
  return (
    <section className="construction-section" id="construction-services"><div className="container-xl"><div className="construction-heading"><h2>Comprehensive Construction <span>Solutions</span> You Trust</h2><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p></div><div className="row g-4">{services.map((item)=><div className="col-md-4" key={item.title}><article className="construction-card"><h3>{item.title}</h3><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo.</p><div><img src={item.image} alt={item.title} /><span><i className={`fa ${item.icon}`} /></span></div></article></div>)}</div></div></section>
  );
}

export default Services;
