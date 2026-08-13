import { useContext } from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import AppContext from '../context/appContext';
import DashboardSidebar from './DashboardSidebar';
import AdminConstructionServiceList from './admin/AdminConstructionServiceList';
import AdminInspectionHubPage from './admin/AdminInspectionHubPage';
import AdminInspectionServiceList from './admin/AdminInspectionServiceList';
import AdminInspectionNegotiationsPage from './admin/AdminInspectionNegotiationsPage';
import AdminBasicInfoPage from './admin/AdminBasicInfoPage';
import AdminHome from './admin/AdminHome';
import AdminListings from './admin/AdminListings';
import AdminMachineryList from './admin/AdminMachineryList';
import AdminMachineryInspectionNegotiationDetailPage from './admin/AdminMachineryInspectionNegotiationDetailPage';
import AdminMachineryInspectionNegotiationsPage from './admin/AdminMachineryInspectionNegotiationsPage';
import AdminMachineryInspectionReportDetailPage from './admin/AdminMachineryInspectionReportDetailPage';
import AdminMachineryInspectionReportsPage from './admin/AdminMachineryInspectionReportsPage';
import AdminConstructionMaterialInspectionNegotiationDetailPage from './admin/AdminConstructionMaterialInspectionNegotiationDetailPage';
import AdminConstructionMaterialInspectionNegotiationsPage from './admin/AdminConstructionMaterialInspectionNegotiationsPage';
import AdminConstructionMaterialInspectionReportDetailPage from './admin/AdminConstructionMaterialInspectionReportDetailPage';
import AdminConstructionMaterialInspectionReportsPage from './admin/AdminConstructionMaterialInspectionReportsPage';
import AdminSparePartInspectionNegotiationDetailPage from './admin/AdminSparePartInspectionNegotiationDetailPage';
import AdminSparePartInspectionNegotiationsPage from './admin/AdminSparePartInspectionNegotiationsPage';
import AdminSparePartInspectionReportDetailPage from './admin/AdminSparePartInspectionReportDetailPage';
import AdminSparePartInspectionReportsPage from './admin/AdminSparePartInspectionReportsPage';
import AdminMaterialList from './admin/AdminMaterialList';
import AdminRentalMachineryList from './admin/AdminRentalMachineryList';
import AdminRentalTruckList from './admin/AdminRentalTruckList';
import AdminRepairServiceList from './admin/AdminRepairServiceList';
import AdminSparePartList from './admin/AdminSparePartList';
import AdminTruckList from './admin/AdminTruckList';
import AdminConstructionServiceView from './admin/AdminConstructionServiceView';
import AdminInspectionServiceView from './admin/AdminInspectionServiceView';
import AdminTruckInspectionNegotiationDetailPage from './admin/AdminTruckInspectionNegotiationDetailPage';
import AdminTruckInspectionNegotiationsPage from './admin/AdminTruckInspectionNegotiationsPage';
import AdminTruckInspectionReportDetailPage from './admin/AdminTruckInspectionReportDetailPage';
import AdminTruckInspectionReportsPage from './admin/AdminTruckInspectionReportsPage';
import AdminMachineryView from './admin/AdminMachineryView';
import AdminMaterialView from './admin/AdminMaterialView';
import AdminConstructionMaterialNegotiationDetailPage from './admin/AdminConstructionMaterialNegotiationDetailPage';
import AdminConstructionMaterialNegotiationsPage from './admin/AdminConstructionMaterialNegotiationsPage';
import AdminConstructionServiceNegotiationDetailPage from './admin/AdminConstructionServiceNegotiationDetailPage';
import AdminConstructionServiceNegotiationsPage from './admin/AdminConstructionServiceNegotiationsPage';
import AdminMachineryNegotiationDetailPage from './admin/AdminMachineryNegotiationDetailPage';
import AdminMachineryNegotiationsPage from './admin/AdminMachineryNegotiationsPage';
import AdminRentalTruckNegotiationDetailPage from './admin/AdminRentalTruckNegotiationDetailPage';
import AdminRentalTruckNegotiationsPage from './admin/AdminRentalTruckNegotiationsPage';
import AdminRepairServiceNegotiationDetailPage from './admin/AdminRepairServiceNegotiationDetailPage';
import AdminRepairServiceNegotiationsPage from './admin/AdminRepairServiceNegotiationsPage';
import AdminRentalMachineryView from './admin/AdminRentalMachineryView';
import AdminRentalTruckView from './admin/AdminRentalTruckView';
import AdminRepairServiceView from './admin/AdminRepairServiceView';
import AdminSparePartNegotiationDetailPage from './admin/AdminSparePartNegotiationDetailPage';
import AdminSparePartNegotiationsPage from './admin/AdminSparePartNegotiationsPage';
import AdminSparePartView from './admin/AdminSparePartView';
import AdminTruckNegotiationDetailPage from './admin/AdminTruckNegotiationDetailPage';
import AdminTruckMeetingDetailPage from './admin/AdminTruckMeetingDetailPage';
import AdminTruckMeetingsPage from './admin/AdminTruckMeetingsPage';
import AdminTruckNegotiationsPage from './admin/AdminTruckNegotiationsPage';
import AdminTruckView from './admin/AdminTruckView';
import ViewMeetingsPage from './admin/ViewMeetingsPage';
import ViewNegotiationsPage from './admin/ViewNegotiationsPage';
import CategoriesPage from './admin/CategoriesPage';
import CategoryEditor from './admin/CategoryEditor';
import SubCategoriesPage from './admin/SubCategoriesPage';
import SubCategoryEditor from './admin/SubCategoryEditor';

function AdminDashboard() {
  const { adminToken, logoutAdmin } = useContext(AppContext);
  const { path, url } = useRouteMatch();
  const history = useHistory();

  if (!adminToken) return <Redirect to="/admin" />;

  const links = [
    { label: 'Home', to: `${url}`, exact: true, icon: 'fa fa-home' },
    { label: 'View Listings', to: `${url}/view-listings`, icon: 'fa fa-list' },
    { label: 'View Negotiations', to: `${url}/view-negotiations`, icon: 'fa fa-comments' },
    { label: 'Inspection', to: `${url}/inspection`, icon: 'fa fa-search' },
    { label: 'View Meetings', to: `${url}/view-meetings`, icon: 'fa fa-calendar' },
    { label: 'Basic Info', to: `${url}/basic-info`, icon: 'fa fa-sliders' },
    { label: 'Categories', to: `${url}/categories`, icon: 'fa fa-folder-open' },
  ];

  return (
    <main className="dashboard-page">
      <DashboardSidebar links={links} onLogout={() => { logoutAdmin(); history.push('/admin'); }} title="Admin Dashboard" />
      <div className="container-fluid dashboard-grid">
        <section className="dashboard-main">
          <Switch>
            <Route component={AdminHome} exact path={path} />
            <Route component={AdminListings} exact path={`${path}/view-listings`} />
            <Route component={ViewNegotiationsPage} exact path={`${path}/view-negotiations`} />
            <Route component={AdminInspectionHubPage} exact path={`${path}/inspection`} />
            <Route component={AdminTruckInspectionReportsPage} exact path={`${path}/inspection/truck-inspection`} />
            <Route component={AdminMachineryInspectionReportsPage} exact path={`${path}/inspection/machinery-inspection`} />
            <Route component={AdminConstructionMaterialInspectionReportsPage} exact path={`${path}/inspection/construction-material-inspection`} />
            <Route component={AdminSparePartInspectionReportsPage} exact path={`${path}/inspection/spare-part-inspection`} />
            <Route component={ViewMeetingsPage} exact path={`${path}/view-meetings`} />
            <Route component={AdminBasicInfoPage} exact path={`${path}/basic-info`} />
            <Route component={AdminInspectionNegotiationsPage} exact path={`${path}/view-negotiations/inspection-services`} />
            <Route component={AdminTruckInspectionNegotiationsPage} exact path={`${path}/view-negotiations/inspection-services/truck-inspection`} />
            <Route component={AdminMachineryInspectionNegotiationsPage} exact path={`${path}/view-negotiations/inspection-services/machinery-inspection`} />
            <Route component={AdminConstructionMaterialInspectionNegotiationsPage} exact path={`${path}/view-negotiations/inspection-services/construction-material-inspection`} />
            <Route component={AdminSparePartInspectionNegotiationsPage} exact path={`${path}/view-negotiations/inspection-services/spare-part-inspection`} />
            <Route component={AdminTruckMeetingsPage} exact path={`${path}/view-meetings/trucks`} />
            <Route component={AdminTruckNegotiationsPage} exact path={`${path}/view-negotiations/trucks`} />
            <Route component={AdminMachineryNegotiationsPage} exact path={`${path}/view-negotiations/construction-machinery`} />
            <Route component={AdminConstructionMaterialNegotiationsPage} exact path={`${path}/view-negotiations/construction-material`} />
            <Route component={AdminConstructionServiceNegotiationsPage} exact path={`${path}/view-negotiations/construction-services`} />
            <Route component={AdminRentalTruckNegotiationsPage} exact path={`${path}/view-negotiations/rental-trucks`} />
            <Route component={AdminRepairServiceNegotiationsPage} exact path={`${path}/view-negotiations/repair-services`} />
            <Route component={AdminSparePartNegotiationsPage} exact path={`${path}/view-negotiations/spare-parts`} />
            <Route component={AdminTruckList} exact path={`${path}/view-listings/trucks`} />
            <Route component={AdminMachineryList} exact path={`${path}/view-listings/construction-machinery`} />
            <Route component={AdminRentalTruckList} exact path={`${path}/view-listings/truck-rental`} />
            <Route component={AdminRentalMachineryList} exact path={`${path}/view-listings/construction-machinery-rental`} />
            <Route component={AdminMaterialList} exact path={`${path}/view-listings/construction-material`} />
            <Route component={AdminSparePartList} exact path={`${path}/view-listings/spare-parts`} />
            <Route component={AdminConstructionServiceList} exact path={`${path}/view-listings/construction-services`} />
            <Route component={AdminInspectionServiceList} exact path={`${path}/view-listings/inspection-services`} />
            <Route component={AdminRepairServiceList} exact path={`${path}/view-listings/repair-services`} />
            <Route component={CategoriesPage} exact path={`${path}/categories`} />
            <Route exact path={`${path}/create-category`}>{() => <CategoryEditor />}</Route>
            <Route exact path={`${path}/edit-category/:categoryID`}>{() => <CategoryEditor isEdit />}</Route>
            <Route component={SubCategoriesPage} exact path={`${path}/view-subcategories/:categoryID`} />
            <Route exact path={`${path}/create-subcategory/:categoryID`}>{() => <SubCategoryEditor />}</Route>
            <Route exact path={`${path}/edit-subcategory/:subcategoryID`}>{() => <SubCategoryEditor isEdit />}</Route>
            <Route component={AdminTruckView} exact path={`${path}/view-truck/:truckid`} />
            <Route component={AdminMachineryView} exact path={`${path}/view-machinery/:machineryId`} />
            <Route component={AdminRentalTruckView} exact path={`${path}/view-rental-truck/:rentalTruckId`} />
            <Route component={AdminRentalMachineryView} exact path={`${path}/view-rental-machinery/:rentalMachineryId`} />
            <Route component={AdminMaterialView} exact path={`${path}/view-material/:materialId`} />
            <Route component={AdminSparePartView} exact path={`${path}/view-spare-part/:sparePartId`} />
            <Route component={AdminConstructionServiceView} exact path={`${path}/view-construction-service/:constructionServiceId`} />
            <Route component={AdminInspectionServiceView} exact path={`${path}/view-inspection-service/:inspectionServiceId`} />
            <Route component={AdminTruckInspectionReportDetailPage} exact path={`${path}/truck-inspection-report/:truckInspectionReportId`} />
            <Route component={AdminMachineryInspectionReportDetailPage} exact path={`${path}/machinery-inspection-report/:machineryInspectionReportId`} />
            <Route component={AdminConstructionMaterialInspectionReportDetailPage} exact path={`${path}/construction-material-inspection-report/:constructionMaterialInspectionReportId`} />
            <Route component={AdminSparePartInspectionReportDetailPage} exact path={`${path}/spare-part-inspection-report/:sparePartInspectionReportId`} />
            <Route component={AdminRepairServiceView} exact path={`${path}/view-repair-service/:repairServiceId`} />
            <Route component={AdminTruckMeetingDetailPage} exact path={`${path}/truck-meeting-detail/:truckMeetingId`} />
            <Route component={AdminTruckInspectionNegotiationDetailPage} exact path={`${path}/truck-inspection-negotiation-detail/:truckInspectionServiceNegotiationId`} />
            <Route component={AdminMachineryInspectionNegotiationDetailPage} exact path={`${path}/machinery-inspection-negotiation-detail/:machineryInspectionNegotiationId`} />
            <Route component={AdminConstructionMaterialInspectionNegotiationDetailPage} exact path={`${path}/construction-material-inspection-negotiation-detail/:constructionMaterialInspectionNegotiationId`} />
            <Route component={AdminSparePartInspectionNegotiationDetailPage} exact path={`${path}/spare-part-inspection-negotiation-detail/:sparePartInspectionNegotiationId`} />
            <Route component={AdminTruckNegotiationDetailPage} exact path={`${path}/negotiation-detail/:truckNegotiationId`} />
            <Route component={AdminMachineryNegotiationDetailPage} exact path={`${path}/machinery-negotiation-detail/:machineryNegotiationId`} />
            <Route component={AdminConstructionMaterialNegotiationDetailPage} exact path={`${path}/material-negotiation-detail/:materialNegotiationId`} />
            <Route component={AdminConstructionServiceNegotiationDetailPage} exact path={`${path}/construction-service-negotiation-detail/:constructionServiceNegotiationId`} />
            <Route component={AdminRentalTruckNegotiationDetailPage} exact path={`${path}/rental-truck-negotiation-detail/:rentalTruckNegotiationId`} />
            <Route component={AdminRepairServiceNegotiationDetailPage} exact path={`${path}/repair-service-negotiation-detail/:repairServiceNegotiationId`} />
            <Route component={AdminSparePartNegotiationDetailPage} exact path={`${path}/spare-part-negotiation-detail/:sparePartNegotiationId`} />
          </Switch>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;
