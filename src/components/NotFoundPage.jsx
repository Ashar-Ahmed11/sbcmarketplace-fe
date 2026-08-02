import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="page-hero-centered not-found-page">
      <div className="page-hero-shade" />
      <div className="container-xl">
        <span className="page-hero-eyebrow">404 Error</span>
        <h1>Page not found</h1>
        <p className="not-found-copy">The page or listing you&apos;re looking for is not available right now.</p>
        <div className="not-found-actions">
          <Link className="dashboard-action-btn" to="/">Go Home</Link>
          <Link className="dashboard-secondary-btn" to="/marketplace">Back to Marketplace</Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
