import { NavLink } from 'react-router-dom';
import logo from '../SBC LOGO.png';

function DashboardSidebar({ links, title, onLogout }) {
  const offcanvasId = `dashboardSidebar-${title.replace(/\s+/g, '-').toLowerCase()}`;

  const navContent = (
    <>
      <div className="dashboard-sidebar-head">
        <div className="dashboard-sidebar-brand">
          <img alt="SBC Marketplace" src={logo} />
          <div>
            {/* <span className="orange-pill">SBC Workspace</span> */}
            <h2>{title}</h2>
          </div>
        </div>
      </div>
      <nav className="dashboard-nav">
        {links.map((link) => (
          <NavLink activeClassName="active" className="dashboard-nav-link" exact={link.exact} key={link.to} to={link.to}>
            <i className={link.icon} aria-hidden="true" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <button className="dashboard-logout" onClick={onLogout} type="button">Logout</button>
    </>
  );

  return (
    <>
      <nav className="dashboard-mobile-nav navbar navbar-dark">
        <div className="container-fluid">
          <div className="dashboard-mobile-brand">
            <img alt="SBC Marketplace" src={logo} />
            <span>{title}</span>
          </div>
          <button aria-controls={offcanvasId} aria-label="Open dashboard menu" className="btn dashboard-menu-toggle" data-bs-target={`#${offcanvasId}`} data-bs-toggle="offcanvas" type="button">
            <i className="fa fa-bars" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <aside className="dashboard-sidebar d-none d-lg-flex">
        {navContent}
      </aside>

      <div aria-labelledby={`${offcanvasId}-label`} className="offcanvas offcanvas-start dashboard-offcanvas" id={offcanvasId} tabIndex="-1">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id={`${offcanvasId}-label`}>{title}</h5>
          <button aria-label="Close" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" type="button" />
        </div>
        <div className="offcanvas-body">
          <div className="dashboard-sidebar dashboard-sidebar-mobile">
            {navContent}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardSidebar;
