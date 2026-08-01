function ContactMap() {
  return (
    <section className="contact-map-section" id="contact-map">
      <div className="container-xl">
        <div className="contact-map-frame">
          <iframe
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=66.94%2C24.79%2C67.20%2C24.98&layer=mapnik&marker=24.8607%2C67.0011"
            title="SBC Marketplace location map"
          />
        </div>
      </div>
    </section>
  );
}

export default ContactMap;
