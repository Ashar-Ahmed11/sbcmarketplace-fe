import { Link, NavLink } from 'react-router-dom';
import logo from '../SBC LOGO.png';
import requirementIcon from '../../assets/figma/requirements-icon.png';
import importIcon from '../../assets/figma/import-icon.png';

const routeItems = [
  { label: 'Home', to: '/', exact: true },
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Contact', to: '/contact' },
];

const anchorItems = [
  { label: 'Services', href: '/#services' },
  { label: 'Rentals', href: '/#marketplace' },
  { label: 'News', href: '/#testimonials' },
];

function Navbar() {
  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="container-xl d-flex align-items-center justify-content-between gap-3">
          <div><i className="fa fa-link me-2" aria-hidden="true" /><u>Latest Updates</u><span className="d-none d-md-inline ms-2">Get Up to 45% Off The Best Constructions Equipment Deals At SBC Marketplace</span></div>
          <div className="top-strip-right d-none d-lg-flex"><span><i className="fa fa-clock-o" /> Mon - Sat 9.00 - 18.00</span><span><i className="fa fa-user" /> Login or Register</span><span className="social-dots">● ● ● ● ●</span></div>
        </div>
      </div>
      <nav className="navbar navbar-expand-xl bg-white p-0" aria-label="Main navigation">
        <div className="container-xl nav-inner">
          <Link className="navbar-brand sbc-brand" to="/">
            <img src={logo} alt="SBC Marketplace" />
            <span><strong>SBC</strong><small>MARKETPLACE</small></span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sbcNav" aria-controls="sbcNav" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
          <div className="collapse navbar-collapse" id="sbcNav">
            <ul className="navbar-nav mx-auto mb-2 mb-xl-0">
              {routeItems.map((item) => (
                <li className="nav-item" key={item.label}>
                  <NavLink className="nav-link" activeClassName="active" exact={item.exact} to={item.to}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
              {anchorItems.map((item) => (
                <li className="nav-item" key={item.label}>
                  <a className="nav-link" href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="nav-actions d-none d-xl-flex">
              <a className="nav-service" href="/marketplace#requirement"><img src={requirementIcon} alt="" /><span><small>RFQ</small><b>Post a Requirement</b></span></a>
              <a className="nav-service" href="/marketplace"><img src={importIcon} alt="" /><b>SBC Import</b></a>
              <button className="avatar-btn" aria-label="Account"><i className="fa fa-user-o" /></button>
              <button className="cart-btn" aria-label="Shopping cart"><i className="fa fa-shopping-cart" /><sup>2</sup></button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
