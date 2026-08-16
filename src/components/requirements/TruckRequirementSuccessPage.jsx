import { Redirect, useHistory, useLocation } from 'react-router-dom';
import './requirements.css';

function TruckRequirementSuccessPage() {
  const history = useHistory();
  const location = useLocation();
  const createdCount = location.state?.createdCount || 0;
  const previewSellers = location.state?.previewSellers || [];

  if (!location.state) {
    return <Redirect to="/post-a-requirement" />;
  }

  return (
    <main className="requirement-page">
      <div className="container-xl requirement-shell">
    

        <section className="requirement-success">
          <div className="requirement-success__icon">
            <i aria-hidden="true" className="fa fa-check" />
          </div>
          <h1 className="requirement-success__title">Your requirement is live</h1>
          <p className="requirement-success__text">
            We&apos;re notifying matching sellers. Your request has been sent to <strong>{createdCount} sellers</strong>.
          </p>

          <div className="requirement-success__card">
            <div className="requirement-success__card-title">
              <i aria-hidden="true" className="fa fa-users" style={{ color: '#ff7609' }} />
              <span>Top Sellers Notified</span>
            </div>

            {previewSellers.length ? previewSellers.map((seller, index) => (
              <div className="requirement-success__seller" key={`${seller.sellerId || seller.fullName}-${index}`}>
                <div className="d-flex align-items-center gap-3">
                  <i aria-hidden="true" className="fa fa-user-o" style={{ color: '#584237' }} />
                  <div>
                    <div className="requirement-success__seller-name">{seller.fullName}</div>
                    <div className="requirement-success__seller-meta">
                      {seller.city || 'Matched Seller'}{seller.truckTitle ? ` • ${seller.truckTitle}` : ''}
                    </div>
                  </div>
                </div>
                <div className="requirement-success__rating">
                  <i aria-hidden="true" className="fa fa-star" style={{ color: '#ff7609' }} /> {4.9 - (index * 0.2)}
                </div>
              </div>
            )) : (
              <div className="requirement-success__seller" style={{ justifyContent: 'center' }}>
                <div className="requirement-success__seller-meta">No matching sellers were found for this requirement yet.</div>
              </div>
            )}
          </div>

          <div className="requirement-success__actions">
            <button className="dashboard-action-btn" onClick={() => history.push('/user-dashboard')} type="button">
              Go to My Dashboard
            </button>
            <button className="dashboard-secondary-btn" onClick={() => history.push('/user-dashboard/my-negotiations/trucks')} type="button">
              View Negotiations
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default TruckRequirementSuccessPage;
