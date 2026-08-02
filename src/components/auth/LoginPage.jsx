import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthFormCard from './AuthFormCard';
import AuthPageLayout from './AuthPageLayout';
import AppContext from '../context/appContext';

function LoginPage() {
  const history = useHistory();
  const { loginUser } = useContext(AppContext);
  const [fields, setFields] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (event) => {
    setFields((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await loginUser(fields);
      history.push('/user-dashboard');
    } catch (submissionError) {
      setError(submissionError.message || 'Unable to login right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageLayout
      asideText="Access your marketplace account to manage requirements, review listings, and continue from where you left off."
      asideTitle="Sign in to continue"
      description="Use your SBC Marketplace credentials to access the construction marketplace dashboard."
      eyebrow="WELCOME BACK"
      title="Login to SBC Marketplace"
    >
      <AuthFormCard
        alternateCta="Create account"
        alternateLabel="New here?"
        alternateTo="/signup"
        error={error}
        fields={fields}
        footerNote="Your credentials are securely verified through the SBC Marketplace backend."
        helperText="Enter your email and password to continue."
        isSubmitting={isSubmitting}
        onChange={onChange}
        onSubmit={onSubmit}
        submitLabel="LOGIN"
        title="Sign in"
      />
      <Link className="auth-back-link" to="/">← Back to home</Link>
    </AuthPageLayout>
  );
}

export default LoginPage;
