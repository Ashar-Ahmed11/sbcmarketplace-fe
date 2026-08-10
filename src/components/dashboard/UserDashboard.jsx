import { useContext } from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import AppContext from '../context/appContext';
import ConstructionServiceCreatePage from './user/ConstructionServiceCreatePage';
import DashboardSidebar from './DashboardSidebar';
import InspectionServiceCreatePage from './user/InspectionServiceCreatePage';
import MachineryCreatePage from './user/MachineryCreatePage';
import MyListingsPage from './user/MyListingsPage';
import MyNegotiationsPage from './user/MyNegotiationsPage';
import MaterialCreatePage from './user/MaterialCreatePage';
import MyMeetingsPage from './user/MyMeetingsPage';
import RentalMachineryCreatePage from './user/RentalMachineryCreatePage';
import RentalTruckCreatePage from './user/RentalTruckCreatePage';
import RepairServiceCreatePage from './user/RepairServiceCreatePage';
import SparePartCreatePage from './user/SparePartCreatePage';
import TruckCreatePage from './user/TruckCreatePage';
import UserConstructionServicesPage from './user/UserConstructionServicesPage';
import UserHome from './user/UserHome';
import UserBasicInfoPage from './user/UserBasicInfoPage';
import UserInspectionServicesPage from './user/UserInspectionServicesPage';
import UserMachineriesPage from './user/UserMachineriesPage';
import UserConstructionMaterialNegotiationDetailPage from './user/UserConstructionMaterialNegotiationDetailPage';
import UserConstructionMaterialNegotiationsPage from './user/UserConstructionMaterialNegotiationsPage';
import UserMachineryNegotiationDetailPage from './user/UserMachineryNegotiationDetailPage';
import UserMachineryNegotiationsPage from './user/UserMachineryNegotiationsPage';
import UserMaterialsPage from './user/UserMaterialsPage';
import UserRentalTruckNegotiationDetailPage from './user/UserRentalTruckNegotiationDetailPage';
import UserRentalTruckNegotiationsPage from './user/UserRentalTruckNegotiationsPage';
import UserRentalMachineriesPage from './user/UserRentalMachineriesPage';
import UserRentalTrucksPage from './user/UserRentalTrucksPage';
import UserRepairServicesPage from './user/UserRepairServicesPage';
import UserSparePartNegotiationDetailPage from './user/UserSparePartNegotiationDetailPage';
import UserSparePartNegotiationsPage from './user/UserSparePartNegotiationsPage';
import UserSparePartsPage from './user/UserSparePartsPage';
import UserTruckMeetingDetailPage from './user/UserTruckMeetingDetailPage';
import UserTruckMeetingsPage from './user/UserTruckMeetingsPage';
import UserTruckNegotiationDetailPage from './user/UserTruckNegotiationDetailPage';
import UserTruckNegotiationsPage from './user/UserTruckNegotiationsPage';
import UserTrucksPage from './user/UserTrucksPage';

function UserDashboard() {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const { logoutUser, userToken } = useContext(AppContext);

  if (!userToken) return <Redirect to="/login" />;

  const links = [
    { label: 'Home', to: `${url}`, exact: true, icon: 'fa fa-home' },
    { label: 'My Listings', to: `${url}/my-listings`, icon: 'fa fa-list' },
    { label: 'My Negotiations', to: `${url}/my-negotiations`, icon: 'fa fa-comments' },
    { label: 'My Meetings', to: `${url}/my-meetings`, icon: 'fa fa-calendar' },
    { label: 'Basic Info', to: `${url}/basic-info`, icon: 'fa fa-user' },
  ];

  return (
    <main className="dashboard-page">
      <DashboardSidebar links={links} onLogout={() => { logoutUser(); history.push('/login'); }} title="User Dashboard" />
      <div className="container-fluid dashboard-grid">
        <section className="dashboard-main">
          <Switch>
            <Route component={UserHome} exact path={path} />
            <Route component={MyListingsPage} exact path={`${path}/my-listings`} />
            <Route component={MyNegotiationsPage} exact path={`${path}/my-negotiations`} />
            <Route component={MyMeetingsPage} exact path={`${path}/my-meetings`} />
            <Route component={UserBasicInfoPage} exact path={`${path}/basic-info`} />
            <Route component={UserTruckMeetingsPage} exact path={`${path}/my-meetings/trucks`} />
            <Route component={UserTruckNegotiationsPage} exact path={`${path}/my-negotiations/trucks`} />
            <Route component={UserMachineryNegotiationsPage} exact path={`${path}/my-negotiations/construction-machinery`} />
            <Route component={UserConstructionMaterialNegotiationsPage} exact path={`${path}/my-negotiations/construction-material`} />
            <Route component={UserRentalTruckNegotiationsPage} exact path={`${path}/my-negotiations/rental-trucks`} />
            <Route component={UserSparePartNegotiationsPage} exact path={`${path}/my-negotiations/spare-parts`} />
            <Route component={UserTruckMeetingDetailPage} exact path={`${path}/truck-meeting/:truckMeetingId`} />
            <Route component={UserTruckNegotiationDetailPage} exact path={`${path}/truck-negotiation/:truckNegotiationId`} />
            <Route component={UserMachineryNegotiationDetailPage} exact path={`${path}/machinery-negotiation/:machineryNegotiationId`} />
            <Route component={UserConstructionMaterialNegotiationDetailPage} exact path={`${path}/material-negotiation/:materialNegotiationId`} />
            <Route component={UserRentalTruckNegotiationDetailPage} exact path={`${path}/rental-truck-negotiation/:rentalTruckNegotiationId`} />
            <Route component={UserSparePartNegotiationDetailPage} exact path={`${path}/spare-part-negotiation/:sparePartNegotiationId`} />
            <Route component={UserTrucksPage} exact path={`${path}/trucks`} />
            <Route component={UserTrucksPage} exact path={`${path}/my-listings/trucks`} />
            <Route component={UserMachineriesPage} exact path={`${path}/construction-machinery`} />
            <Route component={UserMachineriesPage} exact path={`${path}/my-listings/construction-machinery`} />
            <Route component={UserRentalTrucksPage} exact path={`${path}/truck-rental`} />
            <Route component={UserRentalTrucksPage} exact path={`${path}/my-listings/truck-rental`} />
            <Route component={UserRentalMachineriesPage} exact path={`${path}/construction-machinery-rental`} />
            <Route component={UserRentalMachineriesPage} exact path={`${path}/my-listings/construction-machinery-rental`} />
            <Route component={UserMaterialsPage} exact path={`${path}/construction-material`} />
            <Route component={UserMaterialsPage} exact path={`${path}/my-listings/construction-material`} />
            <Route component={UserSparePartsPage} exact path={`${path}/spare-parts`} />
            <Route component={UserSparePartsPage} exact path={`${path}/my-listings/spare-parts`} />
            <Route component={UserConstructionServicesPage} exact path={`${path}/construction-services`} />
            <Route component={UserConstructionServicesPage} exact path={`${path}/my-listings/construction-services`} />
            <Route component={UserInspectionServicesPage} exact path={`${path}/inspection-services`} />
            <Route component={UserInspectionServicesPage} exact path={`${path}/my-listings/inspection-services`} />
            <Route component={UserRepairServicesPage} exact path={`${path}/repair-services`} />
            <Route component={UserRepairServicesPage} exact path={`${path}/my-listings/repair-services`} />
            <Route component={TruckCreatePage} exact path={`${path}/create-truck`} />
            <Route component={TruckCreatePage} exact path={`${path}/my-listings/create-truck`} />
            <Route component={MachineryCreatePage} exact path={`${path}/create-machinery`} />
            <Route component={MachineryCreatePage} exact path={`${path}/my-listings/create-machinery`} />
            <Route component={RentalTruckCreatePage} exact path={`${path}/create-rental-truck`} />
            <Route component={RentalTruckCreatePage} exact path={`${path}/my-listings/create-rental-truck`} />
            <Route component={RentalMachineryCreatePage} exact path={`${path}/create-rental-machinery`} />
            <Route component={RentalMachineryCreatePage} exact path={`${path}/my-listings/create-rental-machinery`} />
            <Route component={MaterialCreatePage} exact path={`${path}/create-material`} />
            <Route component={MaterialCreatePage} exact path={`${path}/my-listings/create-material`} />
            <Route component={SparePartCreatePage} exact path={`${path}/create-spare-part`} />
            <Route component={SparePartCreatePage} exact path={`${path}/my-listings/create-spare-part`} />
            <Route component={ConstructionServiceCreatePage} exact path={`${path}/create-construction-service`} />
            <Route component={ConstructionServiceCreatePage} exact path={`${path}/my-listings/create-construction-service`} />
            <Route component={InspectionServiceCreatePage} exact path={`${path}/create-inspection-service`} />
            <Route component={InspectionServiceCreatePage} exact path={`${path}/my-listings/create-inspection-service`} />
            <Route component={RepairServiceCreatePage} exact path={`${path}/create-repair-service`} />
            <Route component={RepairServiceCreatePage} exact path={`${path}/my-listings/create-repair-service`} />
            <Route exact path={`${path}/edit-truck/:truckId`}>{() => <TruckCreatePage editMode />}</Route>
            <Route exact path={`${path}/my-listings/edit-truck/:truckId`}>{() => <TruckCreatePage editMode />}</Route>
            <Route exact path={`${path}/edit-machinery/:machineryId`}>{() => <MachineryCreatePage editMode />}</Route>
            <Route exact path={`${path}/my-listings/edit-machinery/:machineryId`}>{() => <MachineryCreatePage editMode />}</Route>
            <Route exact path={`${path}/edit-rental-truck/:rentalTruckId`}>{() => <RentalTruckCreatePage editMode />}</Route>
            <Route exact path={`${path}/my-listings/edit-rental-truck/:rentalTruckId`}>{() => <RentalTruckCreatePage editMode />}</Route>
            <Route exact path={`${path}/edit-rental-machinery/:rentalMachineryId`}>{() => <RentalMachineryCreatePage editMode />}</Route>
            <Route exact path={`${path}/my-listings/edit-rental-machinery/:rentalMachineryId`}>{() => <RentalMachineryCreatePage editMode />}</Route>
            <Route exact path={`${path}/edit-material/:materialId`}>{() => <MaterialCreatePage editMode />}</Route>
            <Route exact path={`${path}/my-listings/edit-material/:materialId`}>{() => <MaterialCreatePage editMode />}</Route>
            <Route exact path={`${path}/edit-spare-part/:sparePartId`}>{() => <SparePartCreatePage editMode />}</Route>
            <Route exact path={`${path}/my-listings/edit-spare-part/:sparePartId`}>{() => <SparePartCreatePage editMode />}</Route>
            <Route exact path={`${path}/edit-construction-service/:constructionServiceId`}>{() => <ConstructionServiceCreatePage editMode />}</Route>
            <Route exact path={`${path}/my-listings/edit-construction-service/:constructionServiceId`}>{() => <ConstructionServiceCreatePage editMode />}</Route>
            <Route exact path={`${path}/edit-inspection-service/:inspectionServiceId`}>{() => <InspectionServiceCreatePage editMode />}</Route>
            <Route exact path={`${path}/my-listings/edit-inspection-service/:inspectionServiceId`}>{() => <InspectionServiceCreatePage editMode />}</Route>
            <Route exact path={`${path}/edit-repair-service/:repairServiceId`}>{() => <RepairServiceCreatePage editMode />}</Route>
            <Route exact path={`${path}/my-listings/edit-repair-service/:repairServiceId`}>{() => <RepairServiceCreatePage editMode />}</Route>
          </Switch>
        </section>
      </div>
    </main>
  );
}

export default UserDashboard;
