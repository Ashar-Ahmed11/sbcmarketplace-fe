import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ component: Component, token, redirectTo, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (token ? <Component {...props} /> : <Redirect to={redirectTo} />)}
    />
  );
}

export default ProtectedRoute;
