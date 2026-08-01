import logo from '../../assets/figma/cta-logo.png';

function Cta() {
  return <section className="fleet-cta"><div className="fleet-overlay" /><div className="container-xl"><div className="fleet-cta-card"><div className="fleet-logo-panel"><img src={logo} alt="SBC logo" /></div><div className="fleet-cta-copy"><p>Pakistan’s Premier Industrial Machinery Marketplace</p><h2>Buy, sell, or rent out your fleet securely under SBC's verified terms and conditions.</h2><a href="#contact">CONTACT US <span>→</span></a></div></div></div></section>;
}

export default Cta;
