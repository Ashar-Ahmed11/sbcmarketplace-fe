import { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/appContext';
import ConfirmModal from '../dashboard/ConfirmModal';
import TruckDetailsFinancing from './TruckDetailsFinancing';

function InspectionServiceDetailsSidebarCards({ inspectionService }) {
  const history = useHistory();
  const {
    createTruckInspectionServiceNegotiation,
    currentUser,
    pakistanCities,
    searchNegotiationEligibleTrucks,
    userToken,
  } = useContext(AppContext);
  const [offer, setOffer] = useState({
    selectedTruckId: '',
    onSite: false,
    buyerAddress: '',
    buyerCity: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const data = await searchNegotiationEligibleTrucks(inspectionService?._id, searchQuery);
      if (mounted) setResults(Array.isArray(data) ? data : []);
    };
    load();
    return () => { mounted = false; };
  }, [inspectionService?._id, searchNegotiationEligibleTrucks, searchQuery]);

  const availableCities = useMemo(
    () => (inspectionService?.inspectionAreas || []).map((item) => item?.city).filter(Boolean),
    [inspectionService?.inspectionAreas]
  );

  const selectedTruck = useMemo(
    () => results.find((item) => String(item._id) === String(offer.selectedTruckId)),
    [offer.selectedTruckId, results]
  );
  const visibleResults = useMemo(
    () => results.filter((item) => String(item._id) !== String(offer.selectedTruckId)),
    [offer.selectedTruckId, results]
  );

  const summaryText = useMemo(
    () => `Submit a truck inspection request for ${selectedTruck?.title || 'the selected truck'} in ${offer.onSite ? (offer.buyerCity || 'selected city') : 'workshop mode'}?`,
    [offer.buyerCity, offer.onSite, selectedTruck?.title]
  );

  const handleSubmit = async () => {
    if (!userToken) {
      history.push('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await createTruckInspectionServiceNegotiation({
        inspectionServiceId: inspectionService._id,
        truckId: offer.selectedTruckId,
        onSite: offer.onSite,
        buyerAddress: offer.onSite ? offer.buyerAddress : '',
        buyerCity: offer.onSite ? offer.buyerCity : '',
      });
      setShowConfirm(false);
      history.push(`/user-dashboard/truck-inspection-negotiation/${created._id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOwner = String(currentUser?._id) === String(inspectionService?.user?._id);

  return (
    <div className="truck-figma-sidebar-stack">
      <section className="truck-figma-price-card">
        <small>Inspection Pricing</small>
        <span>Shared after requirement review</span>
        <strong>Call for Quote</strong>
        <button className="truck-figma-cta truck-figma-cta--primary" type="button">Book Inspection</button>
        <button className="truck-figma-cta truck-figma-cta--ghost" type="button">Download Profile</button>
      </section>

      <section className="truck-figma-offer-card">
        <h3>Submit Inspection Request</h3>
        <div className="truck-figma-field">
          <label>Offer Truck Inspection Service Amount</label>
          <input disabled type="text" value="Labour charges will be negotiated later" />
        </div>
        <div className="truck-figma-field">
          <label>Search Truck</label>
          <input onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search truck title, brand or location" type="text" value={searchQuery} />
          {selectedTruck ? (
            <div className="inspection-search-selected mt-2">
              <div>
                <strong>{selectedTruck.title || selectedTruck.brand || 'Selected Truck'}</strong>
                <span>{selectedTruck.location || 'Pakistan'}</span>
              </div>
              <button
                className="inspection-search-selected__clear"
                onClick={() => setOffer((current) => ({ ...current, selectedTruckId: '' }))}
                type="button"
              >
                ×
              </button>
            </div>
          ) : null}
          {searchQuery.trim() ? (
            <div className="inspection-search-results">
              {visibleResults.length ? visibleResults.map((item) => (
                <button
                  className="inspection-search-result"
                  key={item._id}
                  onClick={() => setOffer((current) => ({ ...current, selectedTruckId: item._id }))}
                  type="button"
                >
                  <strong>{item.title || item.brand || 'Truck'}</strong>
                  <span>{[item.brand, item.location].filter(Boolean).join(' • ') || 'Pakistan'}</span>
                </button>
              )) : (
                <div className="inspection-search-empty">No matching trucks found.</div>
              )}
            </div>
          ) : null}
        </div>
        <div className="truck-figma-field">
          <label>Select Delivery Type</label>
          <div className="truck-figma-delivery-options">
            <button className={offer.onSite ? 'active' : ''} disabled={!inspectionService?.offerOnsiteInspection} onClick={() => inspectionService?.offerOnsiteInspection && setOffer((current) => ({ ...current, onSite: true }))} type="button">On-Site</button>
            <button className={!offer.onSite ? 'active' : ''} onClick={() => setOffer((current) => ({ ...current, onSite: false, buyerAddress: '', buyerCity: '' }))} type="button">Workshop</button>
          </div>
        </div>
        {offer.onSite ? (
          <>
            <div className="truck-figma-field">
              <label>Buyer Delivery City</label>
              <select className="truck-figma-select" onChange={(event) => setOffer((current) => ({ ...current, buyerCity: event.target.value }))} value={offer.buyerCity}>
                <option value="">Select city</option>
                {(availableCities.length ? availableCities : pakistanCities).map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
            <div className="truck-figma-field">
              <label>Buyer Delivery Address</label>
              <input onChange={(event) => setOffer((current) => ({ ...current, buyerAddress: event.target.value }))} placeholder="Enter address" type="text" value={offer.buyerAddress} />
            </div>
          </>
        ) : null}
        <button className="truck-figma-cta truck-figma-cta--primary" disabled={isSubmitting || isOwner || !offer.selectedTruckId} onClick={() => setShowConfirm(true)} type="button">
          <i className="fa fa-calendar-check-o" aria-hidden="true" />
          <span>{isOwner ? 'Your Listing' : isSubmitting ? 'Submitting...' : 'Submit Offer'}</span>
        </button>
      </section>

      <section className="truck-figma-trust-card">
        <div className="truck-figma-trust-icon">
          <i className="fa fa-shield" aria-hidden="true" />
        </div>
        <div>
          <h4>Verified Inspector</h4>
          <p>{inspectionService?.offerOnsiteInspection ? 'Onsite inspections available in listed coverage areas.' : 'Workshop-based inspection coordination available.'}</p>
        </div>
      </section>
      <TruckDetailsFinancing />

      <ConfirmModal
        body={summaryText}
        confirmLabel={isSubmitting ? 'Submitting...' : 'Submit Offer'}
        onClose={() => !isSubmitting && setShowConfirm(false)}
        onConfirm={handleSubmit}
        open={showConfirm}
        title="Confirm Offer Submission"
      />
    </div>
  );
}

export default InspectionServiceDetailsSidebarCards;
