import { useContext } from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import AppContext from '../context/appContext';
import DashboardSidebar from './DashboardSidebar';
import AdminConstructionServiceList from './admin/AdminConstructionServiceList';
import AdminInspectionServiceList from './admin/AdminInspectionServiceList';
import AdminHome from './admin/AdminHome';
import AdminListings from './admin/AdminListings';
import AdminMachineryList from './admin/AdminMachineryList';
import AdminMaterialList from './admin/AdminMaterialList';
import AdminRentalMachineryList from './admin/AdminRentalMachineryList';
import AdminRentalTruckList from './admin/AdminRentalTruckList';
import AdminRepairServiceList from './admin/AdminRepairServiceList';
import AdminSparePartList from './admin/AdminSparePartList';
import AdminTruckList from './admin/AdminTruckList';
import AdminConstructionServiceView from './admin/AdminConstructionServiceView';
import AdminInspectionServiceView from './admin/AdminInspectionServiceView';
import AdminMachineryView from './admin/AdminMachineryView';
import AdminMaterialView from './admin/AdminMaterialView';
import AdminRentalMachineryView from './admin/AdminRentalMachineryView';
import AdminRentalTruckView from './admin/AdminRentalTruckView';
import AdminRepairServiceView from './admin/AdminRepairServiceView';
import AdminSparePartView from './admin/AdminSparePartView';
import AdminTruckView from './admin/AdminTruckView';
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
            <Route component={AdminRepairServiceView} exact path={`${path}/view-repair-service/:repairServiceId`} />
          </Switch>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;
