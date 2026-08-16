import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../SBC LOGO.png';

const mobileSearchTabs = [
  { key: 'truck', label: 'Truck', path: '/marketplace/trucks' },
  { key: 'machinery', label: 'Machinery', path: '/marketplace/construction-machinery' },
  { key: 'material', label: 'Material', path: '/marketplace/construction-material' },
  { key: 'spare-part', label: 'Parts', path: '/marketplace/spare-parts' },
];

function MobileMarketplaceSearch() {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('truck');
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedTab = mobileSearchTabs.find((item) => item.key === activeTab) || mobileSearchTabs[0];
    const trimmedQuery = query.trim();

    history.push({
      pathname: selectedTab.path,
      search: trimmedQuery ? `?q=${encodeURIComponent(trimmedQuery)}` : '',
    });
  };

  return (
    <section className="mobile-marketplace-search d-lg-none">
      <div className="container-xl">
        <div className="">
          <div className="row align-items-center g-2 mobile-marketplace-search__top-row">
            <div className="col-4">
              <img alt="SBC Marketplace" className="mobile-marketplace-search__logo" src={logo} />
            </div>
            <div className="col-4 px-0">
              <Link className="mobile-marketplace-search__quick-link" to="/post-a-requirement">
                <i style={{fontSize:"20px"}} aria-hidden="true" className="fa fa-file-text-o" />
                <span style={{fontSize:"15px"}} className='fw-bold'>Post RFQ</span>
              </Link>
            </div>
            <div className="col-4 px-2">
              <Link className="mobile-marketplace-search__quick-link" to="/login">
                <i  style={{fontSize:"20px"}} aria-hidden="true" className="fa fa-user-o" />
                <span style={{fontSize:"15px"}} className='fw-bold'>Account</span>
              </Link>
            </div>
          </div>
          <h2 className="fw-bold">Find construction listings in Pakistan</h2>

          <div className="mobile-marketplace-search__tabs">
            {mobileSearchTabs.map((item) => (
              <button
                className={`mobile-marketplace-search__tab ${activeTab === item.key ? 'active' : ''}`}
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <form className="mobile-marketplace-search__form" onSubmit={handleSubmit}>
            <i aria-hidden="true" className="fa fa-search" />
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${mobileSearchTabs.find((item) => item.key === activeTab)?.label.toLowerCase() || 'listings'}`}
              type="text"
              value={query}
            />
            <button aria-label="Search" type="submit">
              <i aria-hidden="true" className="fa fa-arrow-right" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default MobileMarketplaceSearch;
