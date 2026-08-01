const contactDetails = [
  {
    icon: 'fa fa-map-marker',
    label: 'HeadOffice Address',
    value: 'Metroville, Karachi, Pakistan',
  },
  {
    icon: 'fa fa-phone',
    label: 'For Rental Support',
    value: '+92213123456789',
  },
  {
    icon: 'fa fa-globe',
    label: 'The Office Hours',
    value: 'Mon - Sat 8am to 6pm',
  },
  {
    icon: 'fa fa-envelope-o',
    label: 'Send Us Email',
    value: 'info@sbcmarketplace.com',
  },
];

function ContactPanel() {
  return (
    <section className="contact-panel-section">
      <div className="container-xl contact-panel-grid">
        <aside className="contact-details-card">
          <h2><span /> Contact Details</h2>
          {contactDetails.map((detail) => (
            <div className="contact-detail-row" key={detail.label}>
              <i className={detail.icon} aria-hidden="true" />
              <div>
                <small>{detail.label}</small>
                <p>{detail.value}</p>
              </div>
            </div>
          ))}
        </aside>

        <div className="contact-form-card">
          <h2>Send a Message</h2>
          <span className="contact-section-mark" aria-hidden="true" />
          <p>You Email Adress Will Not Be Published. Required Fields Are Marked With*</p>
          <form>
            <div className="row g-4">
              <div className="col-md-6"><input placeholder="Name *" type="text" /></div>
              <div className="col-md-6"><input placeholder="Email *" type="email" /></div>
              <div className="col-12"><input placeholder="Subject" type="text" /></div>
              <div className="col-12"><textarea placeholder="Your Message" rows="5" /></div>
            </div>
            <button type="submit">SEND MESSAGE <i className="fa fa-long-arrow-right" aria-hidden="true" /></button>
          </form>
        </div>
      </div>
      <div className="contact-map-cta">
        <h3>Get location on Google Maps</h3>
        <a href="#contact-map">Go to Maps <i className="fa fa-long-arrow-right" aria-hidden="true" /></a>
      </div>
    </section>
  );
}

export default ContactPanel;
