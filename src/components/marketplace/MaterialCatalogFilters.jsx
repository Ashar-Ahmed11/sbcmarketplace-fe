import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

function MaterialCatalogFilters({
  categories = [],
  cities = [],
  filters = {},
  onChange = () => {},
  subCategories = [],
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const collapseRef = useRef(null);
  const [collapseHeight, setCollapseHeight] = useState(0);
  const [priceDraft, setPriceDraft] = useState({
    from: filters.priceFrom || '',
    to: filters.priceTo || '',
  });

  useLayoutEffect(() => {
    if (!collapseRef.current) return;
    setCollapseHeight(collapseRef.current.scrollHeight);
  }, [mobileOpen, categories.length, cities.length, subCategories.length, filters]);

  useEffect(() => {
    setPriceDraft({
      from: filters.priceFrom || '',
      to: filters.priceTo || '',
    });
  }, [filters.priceFrom, filters.priceTo]);

  const applyChanges = (updates) => {
    onChange(updates);
    setMobileOpen(false);
  };

  const toggleSelection = (key, value) => {
    const currentValues = Array.isArray(filters[key]) ? filters[key] : [];
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    applyChanges({ [key]: nextValues });
  };

  const subCategoriesByCategory = useMemo(() => {
    const grouped = {};
    subCategories.forEach((item) => {
      const categoryId = String(item?.category?._id || item?.category || '');
      if (!categoryId) return;
      if (!grouped[categoryId]) grouped[categoryId] = [];
      grouped[categoryId].push(item);
    });
    return grouped;
  }, [subCategories]);

  return (
    <div className="marketplace-sidebar-shell position-relative">
      <div className="marketplace-sidebar-mobile-toggle d-xl-none">
        <button
          aria-controls="materialCatalogFiltersBody"
          aria-expanded={mobileOpen}
          className="marketplace-filter-toggle-btn"
          onClick={() => setMobileOpen((current) => !current)}
          type="button"
        >
          <span><i className="fa fa-filter" aria-hidden="true" /> Filters</span>
          <i className={`fa ${mobileOpen ? 'fa-angle-up' : 'fa-angle-down'}`} aria-hidden="true" />
        </button>
      </div>

      <div className="marketplace-side-tools" style={{ zIndex: 1 }}>
        <button aria-label="Zoom out" type="button"><i className="fa fa-search-minus" /></button>
        <button aria-label="Zoom in" type="button"><i className="fa fa-search-plus" /></button>
      </div>

      <aside className="marketplace-sidebar">
        <div
          aria-hidden={!mobileOpen}
          className={`collapse d-xl-block marketplace-mobile-collapse ${mobileOpen ? 'show' : ''}`}
          id="materialCatalogFiltersBody"
          style={{ '--marketplace-collapse-height': `${collapseHeight}px` }}
        >
          <div className="marketplace-sidebar-inner" ref={collapseRef}>
            <div className="market-filter-group">
              <div className="market-filter-title"><span /> Categories <i className="fa fa-angle-down" /></div>
              <ul className="market-filter-list">
                <li>
                  <label className="d-flex align-items-center gap-2">
                    <input
                      checked={!filters.category?.length && !filters.subcategory?.length}
                      onChange={() => applyChanges({ category: [], subcategory: [] })}
                      type="checkbox"
                    />
                    All Categories
                  </label>
                </li>
                {categories.map((item) => {
                  const nestedSubCategories = subCategoriesByCategory[String(item._id)] || [];

                  return (
                    <li key={item._id}>
                      <label className="d-flex align-items-center gap-2">
                        <input
                          checked={(filters.category || []).includes(item._id)}
                          onChange={() => toggleSelection('category', item._id)}
                          type="checkbox"
                        />
                        {item.name}
                      </label>

                      {nestedSubCategories.length ? (
                        <ul className="market-filter-sub-list">
                          {nestedSubCategories.map((subItem) => (
                            <li key={subItem._id}>
                              <label className="d-flex align-items-center gap-2">
                                <input
                                  checked={(filters.subcategory || []).includes(subItem._id)}
                                  onChange={() => toggleSelection('subcategory', subItem._id)}
                                  type="checkbox"
                                />
                                {subItem.name}
                              </label>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="market-filter-group compact">
              <div className="market-filter-title"><span /> PRICE RANGE <i className="fa fa-angle-down" /></div>
              <div className="d-flex mt-3">
                <input
                  className="form-control rounded-0"
                  onChange={(event) => setPriceDraft((current) => ({ ...current, from: event.target.value }))}
                  placeholder="From"
                  type="number"
                  value={priceDraft.from}
                />
                <input
                  className="form-control rounded-0 border-start-0"
                  onChange={(event) => setPriceDraft((current) => ({ ...current, to: event.target.value }))}
                  placeholder="To"
                  type="number"
                  value={priceDraft.to}
                />
                <button
                  className="btn text-white rounded-0 px-3"
                  onClick={() => applyChanges({ priceFrom: priceDraft.from, priceTo: priceDraft.to })}
                  style={{ background: '#1f3f82', minWidth: '68px' }}
                  type="button"
                >
                  Go
                </button>
              </div>
            </div>

            <div className="market-filter-group">
              <div className="market-filter-title"><span /> City <i className="fa fa-angle-down" /></div>
              <ul className="market-filter-list">
                <li>
                  <label className="d-flex align-items-center gap-2">
                    <input checked={!filters.city?.length} onChange={() => applyChanges({ city: [] })} type="checkbox" />
                    All Cities
                  </label>
                </li>
                {cities.map((city) => (
                  <li key={city}>
                    <label className="d-flex align-items-center gap-2">
                      <input checked={(filters.city || []).includes(city)} onChange={() => toggleSelection('city', city)} type="checkbox" />
                      {city}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default MaterialCatalogFilters;
