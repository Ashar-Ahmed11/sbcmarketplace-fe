import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthFormCard from './AuthFormCard';
import AuthPageLayout from './AuthPageLayout';
import AppContext from '../context/appContext';

function SignupPage() {
  const history = useHistory();
  const { signupUser } = useContext(AppContext);
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
      await signupUser(fields);
      history.push('/user-dashboard');
    } catch (submissionError) {
      setError(submissionError.message || 'Unable to create account right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageLayout
      asideText="Create your marketplace credentials so you can submit requirements, explore protected features, and continue into the buyer-seller flow."
      asideTitle="Create your account"
      description="Register with your email and password to get started with SBC Marketplace."
      eyebrow="JOIN SBC"
      title="Signup for SBC Marketplace"
    >
      <AuthFormCard
        alternateCta="Login"
        alternateLabel="Already have an account?"
        alternateTo="/login"
        error={error}
        fields={fields}
        footerNote="We currently use your email field as the backend username for authentication."
        helperText="Enter your email and password to create your account."
        isSubmitting={isSubmitting}
        onChange={onChange}
        onSubmit={onSubmit}
        submitLabel="SIGN UP"
        title="Create account"
      />
      <Link className="auth-back-link" to="/">← Back to home</Link>
    </AuthPageLayout>
  );
}

export default SignupPage;
