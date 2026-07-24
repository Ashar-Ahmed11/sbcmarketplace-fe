import { Link } from 'react-router-dom';
import logo from './SBC LOGO.png';

function SubmissionSuccess() {
  return (
    <main className="success-page">
      <div className="success-card">
        <img src={logo} alt="SBC Marketplace logo" />
        <div className="success-icon" aria-hidden="true">✓</div>
        <span className="section-label">Application received</span>
        <h1>Successfully submitted!</h1>
        <p>
          Thank you for your interest in becoming an SBC Marketplace City
          Partner. Our team will review your information and contact you shortly
          if your application is selected.
        </p>
        <Link className="primary-button" to="/">
          Back to home
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}

export default SubmissionSuccess;
