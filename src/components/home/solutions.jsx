import saleIcon from '../../assets/figma/solutions-sale.png';
import rentalIcon from '../../assets/figma/solutions-rental.svg';
import inspectionIcon from '../../assets/figma/inspection-solution.png';
import financeIcon from '../../assets/figma/solutions-finance.svg';
import servicesIcon from '../../assets/figma/solutions-services.svg';

const solutions = [
  { title: 'Equipment Sale', text: 'New and used heavy machinery from verified sellers, negotiated safely on-platform.', action: 'Browse Machines', icon: saleIcon },
  { title: 'Equipment Rental', text: 'Hourly to monthly rentals with live availability and owner-managed contracts.', action: 'Find Rentals', icon: rentalIcon },
  { title: 'Inspection & Repair', text: 'Certified mechanics and inspectors, dispatched by your location and machine type.', action: 'Book a Mechanic', icon: inspectionIcon },
  { title: 'Investment & Financing', text: 'Installment-based financing for machines, projects and material supply.', action: 'Get Financing', icon: financeIcon },
  { title: 'Construction Services', text: 'Verified contractors, subcontractors, labour and engineers for any project size.', action: 'Hire a Contractor', icon: servicesIcon },
];

function Solutions() {
  return (
    <section className="solutions-section" id="services">
      <div className="container-xl">
        <div className="section-kicker"><span />What We Do Best</div>
        <h2>From foundation to finishing, we deliver complete construction<br className="d-none d-lg-block" /> solutions tailored to your needs.</h2>
        <div className="solutions-grid">
          {solutions.map((item) => <article className="solution-card" key={item.title}><img src={item.icon} alt="" /><h3>{item.title}</h3><p>{item.text}</p><a href="#marketplace">{item.action}</a></article>)}
          <a className="more-services" href="#construction-services"><span>Check<br />More<br />Services</span><b>→</b></a>
        </div>
      </div>
    </section>
  );
}

export default Solutions;
