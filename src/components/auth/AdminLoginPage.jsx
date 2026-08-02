import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../context/appContext';
import AuthFormCard from './AuthFormCard';
import AuthPageLayout from './AuthPageLayout';

function AdminLoginPage() {
  const history = useHistory();
  const { loginAdmin } = useContext(AppContext);
  const [fields, setFields] = useState({ email: 'admin@sbcplace.com', password: 'Karachi2025@' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await loginAdmin(fields);
      history.push('/admin-dashboard');
    } catch (submissionError) {
      setError(submissionError.message || 'Unable to login admin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageLayout
      asideText="Use the seeded admin credentials to access listings moderation, category management, and approval workflows."
      asideTitle="Admin control panel"
      description="This route is reserved for SBC Marketplace administrators."
      eyebrow="ADMIN ACCESS"
      title="Admin Login"
    >
      <AuthFormCard
        alternateCta="Back to website"
        alternateLabel="Need the public app?"
        alternateTo="/"
        error={error}
        fields={fields}
        footerNote="Admin credentials are authenticated against the dedicated admin auth route."
        helperText="Enter the admin email and password to continue."
        isSubmitting={isSubmitting}
        onChange={(event) => setFields((current) => ({ ...current, [event.target.name]: event.target.value }))}
        onSubmit={onSubmit}
        submitLabel="ADMIN LOGIN"
        title="Admin sign in"
      />
      <Link className="auth-back-link" to="/">← Back to home</Link>
    </AuthPageLayout>
  );
}

export default AdminLoginPage;
