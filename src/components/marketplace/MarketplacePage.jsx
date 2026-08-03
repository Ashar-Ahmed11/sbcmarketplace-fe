import { useContext, useEffect, useMemo, useState } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import AppContext from '../context/appContext';
import MarketplaceBrands from './MarketplaceBrands';
import MarketplaceHero from './MarketplaceHero';
import MarketplaceMachineryCatalog from './MarketplaceMachineryCatalog';
import MarketplaceMaterialsCatalog from './MarketplaceMaterialsCatalog';
import MarketplaceSafety from './MarketplaceSafety';
import MarketplaceSparePartsCatalog from './MarketplaceSparePartsCatalog';
import MarketplaceTrucksCatalog from './MarketplaceTrucksCatalog';

const marketplaceTabs = ['trucks', 'construction-machinery', 'construction-material', 'spare-parts'];

function MarketplacePage() {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const {
    allMachineries,
    allMaterials,
    allSpareParts,
    allTrucks,
    getApprovedMachineries,
    getApprovedMaterials,
    getApprovedSpareParts,
    getApprovedTrucks,
  } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const activeTab = useMemo(() => {
    const slug = location.pathname.replace(`${url}/`, '');
    return marketplaceTabs.includes(slug) ? slug : 'trucks';
  }, [location.pathname, url]);

  useEffect(() => {
    if (activeTab === 'trucks') {
      getApprovedTrucks();
    }
    if (activeTab === 'construction-machinery') {
      getApprovedMachineries();
    }
    if (activeTab === 'construction-material') {
      getApprovedMaterials();
    }
    if (activeTab === 'spare-parts') {
      getApprovedSpareParts();
    }
  }, [activeTab, getApprovedMachineries, getApprovedMaterials, getApprovedSpareParts, getApprovedTrucks]);

  const filteredListings = useMemo(() => {
    const source = activeTab === 'trucks'
      ? allTrucks
      : activeTab === 'construction-machinery'
        ? allMachineries
        : activeTab === 'construction-material'
          ? allMaterials
          : allSpareParts;

    const normalizedQuery = searchTerm.trim().toLowerCase();
    if (!normalizedQuery) {
      return source;
    }

    return source.filter((item) => {
      const searchFields = [
        item.title,
        item.description,
        item.brand,
        item.grade,
        item.sellerType,
        item.location,
        item.category?.name,
        item.subcategory?.name,
      ].filter(Boolean);

      return searchFields.some((field) => field.toLowerCase().includes(normalizedQuery));
    });
  }, [activeTab, allMachineries, allMaterials, allSpareParts, allTrucks, searchTerm]);

  return (
    <main className="marketplace-page">
      <MarketplaceHero
        activeTab={activeTab}
        onSearchChange={setSearchTerm}
        onTabChange={(tab) => history.push(`${url}/${tab}`)}
        searchTerm={searchTerm}
      />
      <MarketplaceBrands />
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${url}/trucks`} />
        </Route>
        <Route exact path={`${path}/trucks`}>
          <MarketplaceTrucksCatalog listings={filteredListings} />
        </Route>
        <Route exact path={`${path}/construction-machinery`}>
          <MarketplaceMachineryCatalog listings={filteredListings} />
        </Route>
        <Route exact path={`${path}/construction-material`}>
          <MarketplaceMaterialsCatalog listings={filteredListings} />
        </Route>
        <Route exact path={`${path}/spare-parts`}>
          <MarketplaceSparePartsCatalog listings={filteredListings} />
        </Route>
        <Redirect to="/404" />
      </Switch>
      <MarketplaceSafety />
    </main>
  );
}

export default MarketplacePage;
