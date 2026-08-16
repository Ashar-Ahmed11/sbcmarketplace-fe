import { useContext, useEffect, useMemo, useRef, useState } from 'react';
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
    categories,
    globalLoader,
    getCategories,
    getMarketplaceMaterials,
    getMarketplaceMachineries,
    getMarketplaceSpareParts,
    getMarketplaceTrucks,
    getSubCategoriesByCategoryType,
    marketplaceSubCategories,
    pakistanCities,
  } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState(() => new URLSearchParams(location.search).get('q') || '');
  const [truckFilters, setTruckFilters] = useState({
    category: [],
    modelYearFrom: '',
    modelYearTo: '',
    priceFrom: '',
    priceTo: '',
    city: [],
  });
  const [machineryFilters, setMachineryFilters] = useState({
    category: [],
    modelYearFrom: '',
    modelYearTo: '',
    priceFrom: '',
    priceTo: '',
    city: [],
  });
  const [sparePartFilters, setSparePartFilters] = useState({
    category: [],
    modelYearFrom: '',
    modelYearTo: '',
    priceFrom: '',
    priceTo: '',
    city: [],
  });
  const [materialFilters, setMaterialFilters] = useState({
    category: [],
    subcategory: [],
    priceFrom: '',
    priceTo: '',
    city: [],
  });
  const [pendingTruckFilterScroll, setPendingTruckFilterScroll] = useState(false);
  const [pendingMachineryFilterScroll, setPendingMachineryFilterScroll] = useState(false);
  const [pendingSparePartFilterScroll, setPendingSparePartFilterScroll] = useState(false);
  const [pendingMaterialFilterScroll, setPendingMaterialFilterScroll] = useState(false);
  const previousGlobalLoaderRef = useRef(globalLoader);

  const activeTab = useMemo(() => {
    const slug = location.pathname.replace(`${url}/`, '');
    return marketplaceTabs.includes(slug) ? slug : 'trucks';
  }, [location.pathname, url]);

  useEffect(() => {
    const queryValue = new URLSearchParams(location.search).get('q') || '';
    setSearchTerm((current) => (current === queryValue ? current : queryValue));
  }, [location.search]);

  useEffect(() => {
    if (activeTab === 'trucks') {
      getCategories('truck');
      getMarketplaceTrucks(truckFilters);
    }
    if (activeTab === 'construction-machinery') {
      getCategories('machinery');
      getMarketplaceMachineries(machineryFilters);
    }
    if (activeTab === 'construction-material') {
      getCategories('material');
      getSubCategoriesByCategoryType('material');
      getMarketplaceMaterials(materialFilters);
    }
    if (activeTab === 'spare-parts') {
      getCategories('spareParts');
      getMarketplaceSpareParts(sparePartFilters);
    }
  }, [activeTab, getCategories, getMarketplaceMaterials, getMarketplaceMachineries, getMarketplaceSpareParts, getMarketplaceTrucks, getSubCategoriesByCategoryType, machineryFilters, materialFilters, sparePartFilters, truckFilters]);

  const truckCategories = useMemo(
    () => (categories || []).filter((item) => item?.categoryType === 'truck'),
    [categories]
  );

  const machineryCategories = useMemo(
    () => (categories || []).filter((item) => item?.categoryType === 'machinery'),
    [categories]
  );

  const sparePartCategories = useMemo(
    () => (categories || []).filter((item) => item?.categoryType === 'spareParts'),
    [categories]
  );

  const materialCategories = useMemo(
    () => (categories || []).filter((item) => item?.categoryType === 'material'),
    [categories]
  );

  useEffect(() => {
    const wasLoading = previousGlobalLoaderRef.current;
    const isLoading = globalLoader;

    if (pendingTruckFilterScroll && wasLoading && !isLoading) {
      if (window.innerWidth < 1200) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        const target = document.getElementById('truck-what-we-offer');
        if (target) {
          const top = window.scrollY + target.getBoundingClientRect().top;
          window.scrollTo({ top, behavior: 'instant' });
        }
      }
      setPendingTruckFilterScroll(false);
    }

    if (pendingMachineryFilterScroll && wasLoading && !isLoading) {
      if (window.innerWidth < 1200) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        const target = document.getElementById('machinery-what-we-offer');
        if (target) {
          const top = window.scrollY + target.getBoundingClientRect().top;
          window.scrollTo({ top, behavior: 'instant' });
        }
      }
      setPendingMachineryFilterScroll(false);
    }

    if (pendingSparePartFilterScroll && wasLoading && !isLoading) {
      if (window.innerWidth < 1200) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        const target = document.getElementById('spare-parts-what-we-offer');
        if (target) {
          const top = window.scrollY + target.getBoundingClientRect().top;
          window.scrollTo({ top, behavior: 'instant' });
        }
      }
      setPendingSparePartFilterScroll(false);
    }

    if (pendingMaterialFilterScroll && wasLoading && !isLoading) {
      if (window.innerWidth < 1200) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        const target = document.getElementById('material-what-we-offer');
        if (target) {
          const top = window.scrollY + target.getBoundingClientRect().top;
          window.scrollTo({ top, behavior: 'instant' });
        }
      }
      setPendingMaterialFilterScroll(false);
    }

    previousGlobalLoaderRef.current = globalLoader;
  }, [globalLoader, pendingMachineryFilterScroll, pendingMaterialFilterScroll, pendingSparePartFilterScroll, pendingTruckFilterScroll]);

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

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    const params = new URLSearchParams(location.search);
    const trimmedValue = value.trim();

    if (trimmedValue) {
      params.set('q', trimmedValue);
    } else {
      params.delete('q');
    }

    history.replace({
      pathname: location.pathname,
      search: params.toString() ? `?${params.toString()}` : '',
    });
  };

  const handleTabChange = (tab) => {
    const params = new URLSearchParams(location.search);
    history.push({
      pathname: `${url}/${tab}`,
      search: params.toString() ? `?${params.toString()}` : '',
    });
  };

  return (
    <main className="marketplace-page">
      <MarketplaceHero
        activeTab={activeTab}
        onSearchChange={handleSearchChange}
        onTabChange={handleTabChange}
        searchTerm={searchTerm}
      />
      <MarketplaceBrands />
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${url}/trucks`} />
        </Route>
        <Route exact path={`${path}/trucks`}>
          <MarketplaceTrucksCatalog
            categories={truckCategories}
            cities={pakistanCities}
            filters={truckFilters}
            listings={filteredListings}
            onFiltersChange={(updates) => {
              setPendingTruckFilterScroll(true);
              setTruckFilters((current) => ({ ...current, ...updates }));
            }}
          />
        </Route>
        <Route exact path={`${path}/construction-machinery`}>
          <MarketplaceMachineryCatalog
            categories={machineryCategories}
            cities={pakistanCities}
            filters={machineryFilters}
            listings={filteredListings}
            onFiltersChange={(updates) => {
              setPendingMachineryFilterScroll(true);
              setMachineryFilters((current) => ({ ...current, ...updates }));
            }}
          />
        </Route>
        <Route exact path={`${path}/construction-material`}>
          <MarketplaceMaterialsCatalog
            categories={materialCategories}
            cities={pakistanCities}
            filters={materialFilters}
            listings={filteredListings}
            onFiltersChange={(updates) => {
              setPendingMaterialFilterScroll(true);
              setMaterialFilters((current) => ({ ...current, ...updates }));
            }}
            subCategories={marketplaceSubCategories}
          />
        </Route>
        <Route exact path={`${path}/spare-parts`}>
          <MarketplaceSparePartsCatalog
            categories={sparePartCategories}
            cities={pakistanCities}
            filters={sparePartFilters}
            listings={filteredListings}
            onFiltersChange={(updates) => {
              setPendingSparePartFilterScroll(true);
              setSparePartFilters((current) => ({ ...current, ...updates }));
            }}
          />
        </Route>
        <Redirect to="/404" />
      </Switch>
      <MarketplaceSafety />
    </main>
  );
}

export default MarketplacePage;
