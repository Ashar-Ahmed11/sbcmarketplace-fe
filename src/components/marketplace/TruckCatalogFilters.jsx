import { useEffect, useLayoutEffect, useRef, useState } from 'react';

function TruckCatalogFilters({
  categories = [],
  cities = [],
  filters = {},
  onChange = () => {},
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const collapseRef = useRef(null);
  const [collapseHeight, setCollapseHeight] = useState(0);
  const [modelYearDraft, setModelYearDraft] = useState({
    from: filters.modelYearFrom || '',
    to: filters.modelYearTo || '',
  });
  const [priceDraft, setPriceDraft] = useState({
    from: filters.priceFrom || '',
    to: filters.priceTo || '',
  });

  useLayoutEffect(() => {
    if (!collapseRef.current) return;
    setCollapseHeight(collapseRef.current.scrollHeight);
  }, [mobileOpen, categories.length, cities.length, filters]);

  useEffect(() => {
    setModelYearDraft({
      from: filters.modelYearFrom || '',
      to: filters.modelYearTo || '',
    });
  }, [filters.modelYearFrom, filters.modelYearTo]);

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

  return (
    <div className="marketplace-sidebar-shell position-relative">
      <div className="marketplace-sidebar-mobile-toggle d-xl-none">
        <button
          aria-controls="truckCatalogFiltersBody"
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
          id="truckCatalogFiltersBody"
          style={{ '--marketplace-collapse-height': `${collapseHeight}px` }}
        >
          <div className="marketplace-sidebar-inner" ref={collapseRef}>
            <div className="market-filter-group">
              <div className="market-filter-title"><span /> Categories <i className="fa fa-angle-down" /></div>
              <ul className="market-filter-list">
                <li>
                  <label className="d-flex align-items-center gap-2">
                    <input checked={!filters.category?.length} onChange={() => applyChanges({ category: [] })} type="checkbox" />
                    All Categories
                  </label>
                </li>
                {categories.map((item) => (
                  <li key={item._id}>
                    <label className="d-flex align-items-center gap-2">
                      <input checked={(filters.category || []).includes(item._id)} onChange={() => toggleSelection('category', item._id)} type="checkbox" />
                      {item.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="market-filter-group compact">
              <div className="market-filter-title"><span /> MODEL YEAR <i className="fa fa-angle-down" /></div>
              <div className="d-flex mt-3">
                <input
                  className="form-control rounded-0"
                  onChange={(event) => setModelYearDraft((current) => ({ ...current, from: event.target.value }))}
                  placeholder="From"
                  type="number"
                  value={modelYearDraft.from}
                />
                <input
                  className="form-control rounded-0 border-start-0"
                  onChange={(event) => setModelYearDraft((current) => ({ ...current, to: event.target.value }))}
                  placeholder="To"
                  type="number"
                  value={modelYearDraft.to}
                />
                <button
                  className="btn text-white rounded-0 px-3"
                  onClick={() => applyChanges({ modelYearFrom: modelYearDraft.from, modelYearTo: modelYearDraft.to })}
                  style={{ background: '#1f3f82', minWidth: '68px' }}
                  type="button"
                >
                  Go
                </button>
              </div>
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

export default TruckCatalogFilters;
