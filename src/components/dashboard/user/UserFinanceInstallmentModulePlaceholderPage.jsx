import { Link, useLocation, useRouteMatch } from 'react-router-dom';

const moduleContent = {
  machinery: {
    title: 'Machinery Installments',
    description: 'Machinery finance installments will appear here once this module is wired up.',
  },
  'construction-material': {
    title: 'Construction Material Installments',
    description: 'Construction material finance installments will appear here once this module is wired up.',
  },
  'spare-parts': {
    title: 'Spare Part Installments',
    description: 'Spare part finance installments will appear here once this module is wired up.',
  },
};

function UserFinanceInstallmentModulePlaceholderPage() {
  const location = useLocation();
  const { url } = useRouteMatch();
  const moduleKey = location.pathname.split('/').pop();
  const installmentsBasePath = url.split('/').slice(0, -1).join('/');
  const content = moduleContent[moduleKey] || {
    title: 'My Installments',
    description: 'This installment module will appear here once it is ready.',
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
        <div className="truck-empty-state__icon"><i aria-hidden="true" className="fa fa-calendar" /></div>
        <h2>This module is not connected yet</h2>
        <p>Truck installments are currently the live finance installment module in your dashboard.</p>
        <div className="dashboard-form-actions justify-content-center mt-3">
          <Link className="dashboard-action-btn" to={`${installmentsBasePath}/trucks`}>
            View Truck Installments
          </Link>
        </div>
      </div>
    </section>
  );
}

export default UserFinanceInstallmentModulePlaceholderPage;
