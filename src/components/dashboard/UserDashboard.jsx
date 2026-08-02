import { useContext } from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import AppContext from '../context/appContext';
import DashboardSidebar from './DashboardSidebar';
import MachineryCreatePage from './user/MachineryCreatePage';
import MyListingsPage from './user/MyListingsPage';
import MaterialCreatePage from './user/MaterialCreatePage';
import SparePartCreatePage from './user/SparePartCreatePage';
import TruckCreatePage from './user/TruckCreatePage';
import UserHome from './user/UserHome';
import UserMachineriesPage from './user/UserMachineriesPage';
import UserMaterialsPage from './user/UserMaterialsPage';
import UserSparePartsPage from './user/UserSparePartsPage';
import UserTrucksPage from './user/UserTrucksPage';

function UserDashboard() {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const { logoutUser, userToken } = useContext(AppContext);

  if (!userToken) return <Redirect to="/login" />;

  const links = [
    { label: 'Home', to: `${url}`, exact: true, icon: 'fa fa-home' },
    { label: 'My Listings', to: `${url}/my-listings`, icon: 'fa fa-list' },
    { label: 'Construction Machinery', to: `${url}/construction-machinery`, icon: 'fa fa-cogs' },
    { label: 'Construction Material', to: `${url}/construction-material`, icon: 'fa fa-cubes' },
    { label: 'Spare Parts', to: `${url}/spare-parts`, icon: 'fa fa-cogs' },
  ];

  return (
    <main className="dashboard-page">
      <DashboardSidebar links={links} onLogout={() => { logoutUser(); history.push('/login'); }} title="User Dashboard" />
      <div className="container-fluid dashboard-grid">
        <section className="dashboard-main">
          <Switch>
            <Route component={UserHome} exact path={path} />
            <Route component={MyListingsPage} exact path={`${path}/my-listings`} />
            <Route component={UserTrucksPage} exact path={`${path}/trucks`} />
            <Route component={UserTrucksPage} exact path={`${path}/my-listings/trucks`} />
            <Route component={UserMachineriesPage} exact path={`${path}/construction-machinery`} />
            <Route component={UserMachineriesPage} exact path={`${path}/my-listings/construction-machinery`} />
            <Route component={UserMaterialsPage} exact path={`${path}/construction-material`} />
            <Route component={UserMaterialsPage} exact path={`${path}/my-listings/construction-material`} />
            <Route component={UserSparePartsPage} exact path={`${path}/spare-parts`} />
            <Route component={UserSparePartsPage} exact path={`${path}/my-listings/spare-parts`} />
            <Route component={TruckCreatePage} exact path={`${path}/create-truck`} />
            <Route component={TruckCreatePage} exact path={`${path}/my-listings/create-truck`} />
            <Route component={MachineryCreatePage} exact path={`${path}/create-machinery`} />
            <Route component={MachineryCreatePage} exact path={`${path}/my-listings/create-machinery`} />
            <Route component={MaterialCreatePage} exact path={`${path}/create-material`} />
            <Route component={MaterialCreatePage} exact path={`${path}/my-listings/create-material`} />
            <Route component={SparePartCreatePage} exact path={`${path}/create-spare-part`} />
            <Route component={SparePartCreatePage} exact path={`${path}/my-listings/create-spare-part`} />
            <Route exact path={`${path}/edit-truck/:truckId`}>{() => <TruckCreatePage editMode />}</Route>
            <Route exact path={`${path}/my-listings/edit-truck/:truckId`}>{() => <TruckCreatePage editMode />}</Route>
            <Route exact path={`${path}/edit-machinery/:machineryId`}>{() => <MachineryCreatePage editMode />}</Route>
            <Route exact path={`${path}/my-listings/edit-machinery/:machineryId`}>{() => <MachineryCreatePage editMode />}</Route>
            <Route exact path={`${path}/edit-material/:materialId`}>{() => <MaterialCreatePage editMode />}</Route>
            <Route exact path={`${path}/my-listings/edit-material/:materialId`}>{() => <MaterialCreatePage editMode />}</Route>
            <Route exact path={`${path}/edit-spare-part/:sparePartId`}>{() => <SparePartCreatePage editMode />}</Route>
            <Route exact path={`${path}/my-listings/edit-spare-part/:sparePartId`}>{() => <SparePartCreatePage editMode />}</Route>
          </Switch>
        </section>
      </div>
    </main>
  );
}

export default UserDashboard;
