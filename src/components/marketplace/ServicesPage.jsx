import { useContext, useEffect, useMemo, useState } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import AppContext from '../context/appContext';
import ConstructionServicesCatalog from './ConstructionServicesCatalog';
import InspectionServicesCatalog from './InspectionServicesCatalog';
import MarketplaceBrands from './MarketplaceBrands';
import MarketplaceHero from './MarketplaceHero';
import MarketplaceSafety from './MarketplaceSafety';
import RepairServicesCatalog from './RepairServicesCatalog';

const servicePills = [
  { key: 'construction-services', label: 'Construction Services', icon: 'fa fa-building' },
  { key: 'inspection-services', label: 'Inspections', icon: 'fa fa-search' },
  { key: 'repair-services', label: 'Repairs', icon: 'fa fa-wrench' },
];

const serviceTabs = ['construction-services', 'inspection-services', 'repair-services'];

function ServicesPage() {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const {
    allConstructionServices,
    allInspectionServices,
    allRepairServices,
    getApprovedConstructionServices,
    getApprovedInspectionServices,
    getApprovedRepairServices,
  } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const activeTab = useMemo(() => {
    const slug = location.pathname.replace(`${url}/`, '');
    return serviceTabs.includes(slug) ? slug : 'construction-services';
  }, [location.pathname, url]);

  useEffect(() => {
    if (activeTab === 'construction-services') {
      getApprovedConstructionServices();
    }
    if (activeTab === 'inspection-services') {
      getApprovedInspectionServices();
    }
    if (activeTab === 'repair-services') {
      getApprovedRepairServices();
    }
  }, [activeTab, getApprovedConstructionServices, getApprovedInspectionServices, getApprovedRepairServices]);

  const filteredListings = useMemo(() => {
    const source = activeTab === 'construction-services'
      ? allConstructionServices
      : activeTab === 'inspection-services'
        ? allInspectionServices
        : allRepairServices;

    const normalizedQuery = searchTerm.trim().toLowerCase();
    if (!normalizedQuery) {
      return source;
    }

    return source.filter((item) => {
      const searchFields = [
        item.title,
        item.description,
        item.companyType,
        item.location,
        item.category?.name,
      ].filter(Boolean);

      return searchFields.some((field) => field.toLowerCase().includes(normalizedQuery));
    });
  }, [activeTab, allConstructionServices, allInspectionServices, allRepairServices, searchTerm]);

  return (
    <main className="marketplace-page">
      <MarketplaceHero
        activeTab={activeTab}
        onSearchChange={setSearchTerm}
        onTabChange={(tab) => history.push(`${url}/${tab}`)}
        pills={servicePills}
        searchTerm={searchTerm}
        title="Service Marketplace"
      />
      <MarketplaceBrands />
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${url}/construction-services`} />
        </Route>
        <Route exact path={`${path}/construction-services`}>
          <ConstructionServicesCatalog listings={filteredListings} />
        </Route>
        <Route exact path={`${path}/inspection-services`}>
          <InspectionServicesCatalog listings={filteredListings} />
        </Route>
        <Route exact path={`${path}/repair-services`}>
          <RepairServicesCatalog listings={filteredListings} />
        </Route>
        <Redirect to="/404" />
      </Switch>
      <MarketplaceSafety />
    </main>
  );
}

export default ServicesPage;
