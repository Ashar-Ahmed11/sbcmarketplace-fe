import { Link } from 'react-router-dom';

function AuthFormCard({
  alternateCta,
  alternateLabel,
  alternateTo,
  error,
  fields,
  footerNote,
  helperText,
  isSubmitting,
  onChange,
  onSubmit,
  submitLabel,
  title,
}) {
  return (
    <section className="auth-form-card">
      <div className="auth-form-header">
        <span>ACCOUNT ACCESS</span>
        <h2>{title}</h2>
        <p>{helperText}</p>
      </div>

      <form onSubmit={onSubmit}>
        {error ? <p className="form-error">{error}</p> : null}

        <div className="form-field">
          <label htmlFor="auth-email">Email</label>
          <input
            id="auth-email"
            name="email"
            onChange={onChange}
            placeholder="Enter your email"
            type="email"
            value={fields.email}
          />
        </div>

        <div className="form-field">
          <label htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            minLength="6"
            name="password"
            onChange={onChange}
            placeholder="Enter your password"
            type="password"
            value={fields.password}
          />
        </div>

        <button className="submit-button auth-submit-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Please wait...' : submitLabel}
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <div className="auth-form-footer">
        <p>{footerNote}</p>
        <Link to={alternateTo}>{alternateLabel} <span>{alternateCta}</span></Link>
      </div>
    </section>
  );
}

export default AuthFormCard;
