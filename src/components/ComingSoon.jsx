import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from './SBC LOGO.png';

const partnerModules = [
  'Machinery Sale & Purchase',
  'Machinery Rental',
  'Construction Materials',
  'Spare Parts Marketplace',
  'Inspection Services',
  'Construction Services',
  'Logistics & Transportation',
  'Investment & Financing',
];

function ComingSoon() {
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/info@sbcplace.com',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error('The form could not be submitted.');
      }

      const result = await response.json();
      if (result.success === false) {
        throw new Error(result.message || 'The form could not be submitted.');
      }

      history.push('/success');
    } catch (submissionError) {
      setError(
        'We could not submit your application right now. Please try again, or email us directly at sbcmarketplace@outlook.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="coming-soon-page">
      <header className="site-header">
        <div className="announcement-bar">
          <div className="page-container announcement-content">
            <span>Pakistan&apos;s #1 Construction Marketplace</span>
            <span className="announcement-secondary">
              Website &amp; mobile app launching soon
            </span>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <div className="page-container nav-content">
            <a className="brand" href="#top" aria-label="SBC Marketplace home">
              <img src={logo} alt="SBC Marketplace logo" />
              <span>
                <strong>SBC</strong>
                <small>MARKETPLACE</small>
              </span>
            </a>
            <a className="nav-cta" href="#partner-form">
              Apply for City Partnership
            </a>
          </div>
        </nav>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-grid-pattern" aria-hidden="true" />
        <div className="page-container hero-content">
          <div className="hero-copy">
            <span className="eyebrow">Coming soon across Pakistan</span>
            <h1>
              Building Pakistan&apos;s
              <span> Construction Network.</span>
            </h1>
            <p>
              Pakistan&apos;s first dedicated marketplace connecting construction
              businesses, professionals, machinery, materials, and services—all
              in one trusted place.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#partner-form">
                Become a City Partner
                <span aria-hidden="true">→</span>
              </a>
              <span className="launch-status">
                <span className="status-dot" aria-hidden="true" />
                Coming Soon
              </span>
            </div>
          </div>

          <div className="hero-card" aria-label="SBC Marketplace launch offer">
            <img src={logo} alt="" />
            <p>Official City Partnership</p>
            <strong>Launch Offer</strong>
            <span>No partnership fee for selected applicants</span>
          </div>
        </div>
      </section>

      <section className="opportunity-section">
        <div className="page-container opportunity-grid">
          <div className="opportunity-copy">
            <span className="section-label">A first-mover opportunity</span>
            <h2>FREE City Partnership Opportunity – Limited Time Only!</h2>
            <p className="lead">
              Would you like to become part of Pakistan&apos;s first dedicated
              construction marketplace?
            </p>
            <p>
              SBC Marketplace will soon be launching its website and mobile app.
              Our platform is currently in the testing phase, and before the
              official launch, we are selecting Official City Partners for
              different cities across Pakistan.
            </p>

            <div className="info-card launch-card">
              <span className="info-icon" aria-hidden="true">🎁</span>
              <div>
                <h3>Launch Offer</h3>
                <p>
                  Selected City Partners will not be charged any partnership
                  fee. To represent SBC Marketplace in your city, submit the
                  information in the application form.
                </p>
              </div>
            </div>

            <div className="info-card process-card">
              <span className="info-icon" aria-hidden="true">📩</span>
              <div>
                <h3>What happens next?</h3>
                <p>
                  After reviewing all applications, our team will contact
                  selected candidates, explain the complete business model, and
                  grant the City Partnership after verification.
                </p>
              </div>
            </div>

            <div className="limited-note">
              <span aria-hidden="true">⚠️</span>
              <p>
                <strong>Limited Opportunities:</strong> A limited number of City
                Partners will be selected for each city and each module.
              </p>
            </div>
          </div>

          <div className="form-card" id="partner-form">
            <div className="form-heading">
              <span>City Partner Application</span>
              <h2>Represent SBC Marketplace in your city</h2>
              <p>Complete the form below. All fields are required.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="_subject"
                value="New SBC Marketplace City Partner Application"
              />
              <input type="hidden" name="_template" value="box" />

              <div className="form-field">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="City"
                    type="text"
                    placeholder="e.g. Lahore"
                    autoComplete="address-level2"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    id="mobile"
                    name="Mobile Number"
                    type="tel"
                    placeholder="+92 3XX XXXXXXX"
                    autoComplete="tel"
                    pattern="[+0-9 ()-]{7,20}"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="company">Company or Business Name</label>
                <input
                  id="company"
                  name="Company or Business Name"
                  type="text"
                  placeholder="Enter your company or business name"
                  autoComplete="organization"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="workType">Type of work you do</label>
                <input
                  id="workType"
                  name="Type of Work"
                  type="text"
                  placeholder="e.g. Machinery rental, contractor"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="experience">Years of Experience</label>
                <input
                  id="experience"
                  name="Years of Experience"
                  type="number"
                  min="0"
                  max="70"
                  placeholder="Enter number of years"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="module">
                  Become City Partner for which module?
                </label>
                <select id="module" name="Partnership Module" defaultValue="" required>
                  <option value="" disabled>Select a marketplace module</option>
                  {partnerModules.map((module) => (
                    <option key={module} value={module}>
                      {module}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="form-error" role="alert">
                  {error}
                </div>
              )}

              <button
                className="submit-button"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting Application…' : 'Submit Application'}
                {!isSubmitting && <span aria-hidden="true">→</span>}
              </button>
              <p className="privacy-note">
                Your information will only be used to review your partnership
                application.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="modules-section">
        <div className="page-container">
          <div className="modules-heading">
            <span className="section-label">Marketplace modules</span>
            <h2>One network. Every construction need.</h2>
          </div>
          <div className="module-grid">
            {partnerModules.map((module, index) => (
              <div className="module-item" key={module}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{module}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-container footer-content">
          <div className="footer-brand">
            <img src={logo} alt="SBC Marketplace logo" />
            <div>
              <strong>SBC Marketplace</strong>
              <p>Building Pakistan&apos;s Construction Network.</p>
            </div>
          </div>
          <a href="mailto:sbcmarketplace@outlook.com">
          info@sbcplace.com
          </a>
        </div>
      </footer>
    </main>
  );
}

export default ComingSoon;
