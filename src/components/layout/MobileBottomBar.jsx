import { useMemo, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { anchorItems, routeItems } from './navConfig';

function MobileBottomBar() {
  const history = useHistory();
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);

  const menuItems = useMemo(() => ([
    ...routeItems.map((item) => ({ label: item.label, to: item.to })),
    ...anchorItems.map((item) => ({ label: item.label, href: item.href })),
  ]), []);

  const isHome = location.pathname === '/';
  const isMyAds = location.pathname.startsWith('/user-dashboard/my-listings');
  const isAccount = location.pathname.startsWith('/user-dashboard') && !isMyAds;

  return (
    <>
      <nav className="mobile-bottom-bar d-lg-none" aria-label="Mobile quick actions">
        <Link className={`mobile-bottom-bar__item ${isHome ? 'active' : ''}`} to="/">
          <i aria-hidden="true" className="fa fa-home" />
          <span>Home</span>
        </Link>

        <Link className={`mobile-bottom-bar__item ${isMyAds ? 'active' : ''}`} to="/user-dashboard/my-listings">
          <i aria-hidden="true" className="fa fa-bullhorn" />
          <span>My Ads</span>
        </Link>

        <button className="mobile-bottom-bar__sell" onClick={() => history.push('/user-dashboard/my-listings')} type="button">
          <i aria-hidden="true" className="fa fa-plus" />
          <span>Sell</span>
        </button>

        <Link className={`mobile-bottom-bar__item ${isAccount ? 'active' : ''}`} to="/user-dashboard">
          <i aria-hidden="true" className="fa fa-user-o" />
          <span>Account</span>
        </Link>

        <button className="mobile-bottom-bar__item" onClick={() => setSheetOpen(true)} type="button">
          <i aria-hidden="true" className="fa fa-ellipsis-h" />
          <span>More</span>
        </button>
      </nav>

      <div
        className={`mobile-sheet-backdrop d-lg-none ${sheetOpen ? 'show' : ''}`}
        onClick={() => setSheetOpen(false)}
        role="presentation"
      />

      <div className={`mobile-more-sheet d-lg-none ${sheetOpen ? 'show' : ''}`}>
        <div className="mobile-more-sheet__handle" />
        <div className="mobile-more-sheet__head">
          <h3>More</h3>
          <button aria-label="Close" onClick={() => setSheetOpen(false)} type="button">
            <i aria-hidden="true" className="fa fa-times" />
          </button>
        </div>

        <div className="mobile-more-sheet__list">
          {menuItems.map((item) => (
            item.to ? (
              <Link className="mobile-more-sheet__link" key={item.label} onClick={() => setSheetOpen(false)} to={item.to}>
                <span>{item.label}</span>
                <i aria-hidden="true" className="fa fa-angle-right" />
              </Link>
            ) : (
              <a className="mobile-more-sheet__link" href={item.href} key={item.label} onClick={() => setSheetOpen(false)}>
                <span>{item.label}</span>
                <i aria-hidden="true" className="fa fa-angle-right" />
              </a>
            )
          ))}
        </div>
      </div>
    </>
  );
}

export default MobileBottomBar;
