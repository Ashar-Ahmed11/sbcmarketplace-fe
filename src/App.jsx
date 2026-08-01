import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './components/home/HomePage';
import MarketplacePage from './components/marketplace/MarketplacePage';
import BlogsPage from './components/blogs/BlogsPage';
import ContactPage from './components/contact/ContactPage';
import SubmissionSuccess from './components/SubmissionSuccess';

function App() {
  return (
    <div className="site-shell">
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/marketplace" exact component={MarketplacePage} />
        <Route path="/blogs" exact component={BlogsPage} />
        <Route path="/contact" exact component={ContactPage} />
        <Route path="/success" exact component={SubmissionSuccess} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
