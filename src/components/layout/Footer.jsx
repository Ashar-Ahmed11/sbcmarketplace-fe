import logo from '../SBC LOGO.png';

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container-xl">
        <div className="footer-newsletter row align-items-center g-4">
          <div className="col-lg-2 footer-logo"><img src={logo} alt="SBC" /><span><b>SBC</b><small>Marketplace</small></span></div>
          <div className="col-lg-4 footer-news-copy"><h3>Newsletter Subscription</h3><p>Get Latest Deals from SBC Marketplace</p></div>
          <div className="col-lg-6"><form className="newsletter-form"><input type="email" aria-label="Email address" placeholder="Enter your email" /><button type="submit">SUBSCRIBE <span>→</span></button></form></div>
        </div>
        <div className="footer-divider" />
        <div className="container-fluid">
        <div className="row g-5 footer-columns">
          <div className="col-sm-6 col-lg-3"><h4>ABOUT SBC</h4><span className="heading-mark" /><p>Pakistan’s #1 Marketplace of Building Construction and Equipment</p><div className="footer-socials"><i className="fa fa-twitter" /><i className="fa fa-google" /><i className="fa fa-facebook" /><i className="fa fa-linkedin" /><i className="fa fa-vimeo" /></div></div>
          <div className="col-sm-6 col-lg-3"><h4>USEFUL LINKS</h4><span className="heading-mark" /><ul><li>About SBC Group</li><li>Latest News</li><li>Our Process</li><li>Terms & Conditions</li><li>Protections & Coverages</li></ul></div>
          <div className="col-sm-6 col-lg-3"><h4>EXPLORE SBC</h4><span className="heading-mark" /><ul><li>Signup or Register</li><li>Get Equipments</li><li>Rental Pricing</li><li>Quick User Guide</li><li>Read FAQ’s</li></ul></div>
          <div className="col-sm-6 col-lg-3"><h4>GET IN TOUCH</h4><span className="heading-mark" /><div className="contact-row"><i className="fa fa-phone" /><span><small>For Support</small>+92(236)799 5500 / 6600</span></div><div className="contact-row"><i className="fa fa-clock-o" /><span><small>The Office Hours</small>Mon - Sat 8am to 6pm</span></div><div className="contact-row"><i className="fa fa-envelope-o" /><span><small>Send Us Email</small>info@sbcmarketplace.com</span></div></div>
        </div>
        </div>
        {/* <a className="go-top position-absolute end-0" href="#top"><span>🚜</span>GO TO TOP</a> */}
      </div>
    </footer>
  );
}

export default Footer;
