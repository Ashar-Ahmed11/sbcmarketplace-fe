import ecosystemIcons from '../../assets/figma/ecosystem-icons.png';

function Ecosystem() {
  return (
    <section className="ecosystem-section">
      <div className="ecosystem-icons"><img src={ecosystemIcons} alt="Industrial equipment, transport and material services" /></div>
      <p>Who we are</p>
      <span>Verified Industrial Equipment, Material &amp; Services Secured At Negotiated Rates Nearby</span>
      <h2>The Complete Industrial<br />Ecosystem</h2>
      <div className="stripe-rule" />
    </section>
  );
}

export default Ecosystem;
