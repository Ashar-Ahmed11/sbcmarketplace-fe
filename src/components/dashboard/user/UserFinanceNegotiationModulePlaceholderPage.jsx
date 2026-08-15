import { Link, useLocation, useRouteMatch } from 'react-router-dom';

const moduleContent = {
  machinery: {
    title: 'Machinery Finance Negotiations',
    description: 'Machinery finance negotiations will appear here once this module is wired up.',
  },
  'construction-material': {
    title: 'Construction Material Finance Negotiations',
    description: 'Construction material finance negotiations will appear here once this module is wired up.',
  },
  'spare-parts': {
    title: 'Spare Part Finance Negotiations',
    description: 'Spare part finance negotiations will appear here once this module is wired up.',
  },
};

function UserFinanceNegotiationModulePlaceholderPage() {
  const location = useLocation();
  const { url } = useRouteMatch();
  const moduleKey = location.pathname.split('/').pop();
  const financeNegotiationsBasePath = url.split('/').slice(0, -1).join('/');
  const content = moduleContent[moduleKey] || {
    title: 'Finance Negotiations',
    description: 'This finance negotiation module will appear here once it is ready.',
  };

  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head">
        <div>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
        </div>
      </div>

      <div className="truck-empty-state">
        <div className="truck-empty-state__icon"><i aria-hidden="true" className="fa fa-money" /></div>
        <h2>This module is not connected yet</h2>
        <p>For now, the truck finance negotiation module is available and fully connected.</p>
        <div className="dashboard-form-actions justify-content-center mt-3">
          <Link className="dashboard-action-btn" to={`${financeNegotiationsBasePath}/trucks`}>
            View Truck Finance Negotiations
          </Link>
        </div>
      </div>
    </section>
  );
}

export default UserFinanceNegotiationModulePlaceholderPage;
