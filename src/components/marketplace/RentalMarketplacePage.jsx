import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useContext, useEffect, useMemo, useState } from 'react';
import AppContext from '../context/appContext';
import MarketplaceBrands from './MarketplaceBrands';
import MarketplaceHero from './MarketplaceHero';
import MarketplaceSafety from './MarketplaceSafety';
import RentalConstructionMachineryCatalog from './RentalConstructionMachineryCatalog';
import RentalTrucksCatalog from './RentalTrucksCatalog';

const rentalPills = [
  { key: 'rental-trucks', label: 'Rental Trucks', icon: 'fa fa-truck' },
  { key: 'rental-construction-machinery', label: 'Rental Construction Machinery', icon: 'fa fa-industry' },
];

function RentalMarketplacePage() {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const {
    allRentalMachineries,
    allRentalTrucks,
    getApprovedRentalMachineries,
    getApprovedRentalTrucks,
  } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const activeTab = useMemo(() => {
    const slug = location.pathname.replace(`${url}/`, '');
    return rentalPills.some((pill) => pill.key === slug) ? slug : 'rental-trucks';
  }, [location.pathname, url]);

  useEffect(() => {
    if (activeTab === 'rental-trucks') {
      getApprovedRentalTrucks();
    }
    if (activeTab === 'rental-construction-machinery') {
      getApprovedRentalMachineries();
    }
  }, [activeTab, getApprovedRentalMachineries, getApprovedRentalTrucks]);

  const filteredListings = useMemo(() => {
    const source = activeTab === 'rental-trucks' ? allRentalTrucks : allRentalMachineries;
    const normalizedQuery = searchTerm.trim().toLowerCase();

    if (!normalizedQuery) {
      return source;
    }

    return source.filter((item) => {
      const searchFields = [
        item.title,
        item.description,
        item.brand,
        item.location,
        item.category?.name,
        item.subcategory?.name,
      ].filter(Boolean);

      return searchFields.some((field) => field.toLowerCase().includes(normalizedQuery));
    });
  }, [activeTab, allRentalMachineries, allRentalTrucks, searchTerm]);

  return (
    <main className="marketplace-page">
      <MarketplaceHero
        activeTab={activeTab}
        onSearchChange={setSearchTerm}
        onTabChange={(tab) => history.push(`${url}/${tab}`)}
        pills={rentalPills}
        searchTerm={searchTerm}
        title="Rental Marketplace"
      />
      <MarketplaceBrands />
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${url}/rental-trucks`} />
        </Route>
        <Route exact path={`${path}/rental-trucks`}>
          <RentalTrucksCatalog listings={filteredListings} />
        </Route>
        <Route exact path={`${path}/rental-construction-machinery`}>
          <RentalConstructionMachineryCatalog listings={filteredListings} />
        </Route>
        <Redirect to="/404" />
      </Switch>
      <MarketplaceSafety />
    </main>
  );
}

export default RentalMarketplacePage;
