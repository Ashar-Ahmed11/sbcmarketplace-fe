import { useContext, useEffect, useMemo, useState } from 'react';
import AppContext from '../context/appContext';
import MarketplaceHero from './MarketplaceHero';
import MarketplaceBrands from './MarketplaceBrands';
import MarketplaceCatalog from './MarketplaceCatalog';
import MarketplaceSafety from './MarketplaceSafety';

function MarketplacePage() {
  const { allMachineries, allMaterials, allSpareParts, allTrucks, getApprovedMachineries, getApprovedMaterials, getApprovedSpareParts, getApprovedTrucks } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('trucks');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (activeTab === 'trucks') {
      getApprovedTrucks();
    }
    if (activeTab === 'machinery') {
      getApprovedMachineries();
    }
    if (activeTab === 'material') {
      getApprovedMaterials();
    }
    if (activeTab === 'spare-parts') {
      getApprovedSpareParts();
    }
  }, [activeTab, getApprovedMachineries, getApprovedMaterials, getApprovedSpareParts, getApprovedTrucks]);

  const filteredListings = useMemo(() => {
    if (!['trucks', 'machinery', 'material', 'spare-parts'].includes(activeTab)) {
      return [];
    }

    const source = activeTab === 'trucks'
      ? allTrucks
      : activeTab === 'machinery'
        ? allMachineries
        : activeTab === 'material'
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
        onTabChange={setActiveTab}
        searchTerm={searchTerm}
      />
      <MarketplaceBrands />
      <MarketplaceCatalog activeTab={activeTab} listingsData={filteredListings} />
      <MarketplaceSafety />
    </main>
  );
}

export default MarketplacePage;
