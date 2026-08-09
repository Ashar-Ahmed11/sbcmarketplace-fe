import './App.css';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './components/home/HomePage';
import ConstructionServiceDetailsPage from './components/marketplace/ConstructionServiceDetailsPage';
import InspectionServiceDetailsPage from './components/marketplace/InspectionServiceDetailsPage';
import MachineryDetailsPage from './components/marketplace/MachineryDetailsPage';
import MarketplacePage from './components/marketplace/MarketplacePage';
import MaterialDetailsPage from './components/marketplace/MaterialDetailsPage';
import RepairServiceDetailsPage from './components/marketplace/RepairServiceDetailsPage';
import RentalMachineryDetailsPage from './components/marketplace/RentalMachineryDetailsPage';
import RentalMarketplacePage from './components/marketplace/RentalMarketplacePage';
import RentalTruckDetailsPage from './components/marketplace/RentalTruckDetailsPage';
import ServicesPage from './components/marketplace/ServicesPage';
import SparePartDetailsPage from './components/marketplace/SparePartDetailsPage';
import TruckDetailsPage from './components/marketplace/TruckDetailsPage';
import BlogsPage from './components/blogs/BlogsPage';
import ContactPage from './components/contact/ContactPage';
import AdminLoginPage from './components/auth/AdminLoginPage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import AdminDashboard from './components/dashboard/AdminDashboard';
import UserDashboard from './components/dashboard/UserDashboard';
import SubmissionSuccess from './components/SubmissionSuccess';
import ProtectedRoute from './components/dashboard/ProtectedRoute';
import NotFoundPage from './components/NotFoundPage';
import ComingSoon from './components/ComingSoon';

function App() {
  const location = useLocation();
  const hideSiteChrome = location.pathname.startsWith('/user-dashboard') || location.pathname.startsWith('/admin-dashboard');
  const userToken = localStorage.getItem('sbc_auth_token');
  const adminToken = localStorage.getItem('sbc_admin_auth_token');

  return (
    <div className="site-shell">
      {!hideSiteChrome ? <Navbar /> : null}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/marketplace" component={MarketplacePage} />
        <Route path="/rentals" component={RentalMarketplacePage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/truck-details/:truckId" exact component={TruckDetailsPage} />
        <Route path="/machinery-details/:machineryId" exact component={MachineryDetailsPage} />
        <Route path="/rental-truck-details/:rentalTruckId" exact component={RentalTruckDetailsPage} />
        <Route path="/rental-machinery-details/:rentalMachineryId" exact component={RentalMachineryDetailsPage} />
        <Route path="/material-details/:materialId" exact component={MaterialDetailsPage} />
        <Route path="/spare-part-details/:sparePartId" exact component={SparePartDetailsPage} />
        <Route path="/construction-services-details/:constructionServiceId" exact component={ConstructionServiceDetailsPage} />
        <Route path="/inspection-services-details/:inspectionServiceId" exact component={InspectionServiceDetailsPage} />
        <Route path="/repair-services-details/:repairServiceId" exact component={RepairServiceDetailsPage} />
        <Route path="/404" exact component={NotFoundPage} />
        <Route path="/blogs" exact component={BlogsPage} />
        <Route path="/contact" exact component={ContactPage} />
        <Route path="/admin" exact component={AdminLoginPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/signup" exact component={SignupPage} />
        <ProtectedRoute component={UserDashboard} path="/user-dashboard" redirectTo="/login" token={userToken} />
        <ProtectedRoute component={AdminDashboard} path="/admin-dashboard" redirectTo="/admin" token={adminToken} />
        <Route path="/success" exact component={SubmissionSuccess} />
        <Redirect to="/404" />
      </Switch>
      {!hideSiteChrome ? <Footer /> : null}
    </div>
  );
}

export default App;
