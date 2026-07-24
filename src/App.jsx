import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import ComingSoon from './components/ComingSoon';
import SubmissionSuccess from './components/SubmissionSuccess';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ComingSoon} />
      <Route path="/success" exact component={SubmissionSuccess} />
      <Redirect to="/" />
    </Switch>
  );
}

export default App;
