function Franchise() {
  return (
    <section className="franchise-section">
      <div className="container-xl">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 order-2 order-md-1">
            <div className="map-art" aria-label="Pakistan service locations">
              <span className="pin pin-one">
                <i className="fa fa-map-marker" />
              </span>
              <span className="pin pin-two">
                <i className="fa fa-map-marker" />
              </span>
              <span className="map-road road-one" />
              <span className="map-road road-two" />
              <span className="map-road road-three" />
            </div>
          </div>
          <div className="col-lg-6 franchise-copy order-1 order-md-2">
            <span className="orange-pill">LOCATION BASED</span>
            <h2>
              Find nearest franchise of SBC to pick-up Construction Material
            </h2>
            <p>
              Our system instantly maps your jobsite coordinates to identify the
              nearest verified SBC-partnered supplier in your area. Once your
              bulk order is registered and your advance payment is securely
              processed, the platform automatically unlocks the exact pickup
              address and supplier contact details.
            </p>
            <ul>
              <li>
                <b>Central Hub (Islamabad):</b> Fast-track structural steel and
                cement.
              </li>
              <li>
                <b>East Hub (Lahore/Sheikhupura):</b> Bulk aggregate pickup &
                heavy materials delivery.
              </li>
              <li>
                <b>Karachi Hub:</b> MEP, industrial piping, and bulk electrical
                supplies.
              </li>
            </ul>
            <a href="#contact">Locate Nearest Supplier</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Franchise;
