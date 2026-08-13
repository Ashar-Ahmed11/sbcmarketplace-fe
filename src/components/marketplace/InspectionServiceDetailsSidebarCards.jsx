import { useContext, useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/appContext';
import ConfirmModal from '../dashboard/ConfirmModal';
import TruckDetailsFinancing from './TruckDetailsFinancing';

function InspectionServiceDetailsSidebarCards({ inspectionService }) {
  const history = useHistory();
  const {
    createConstructionMaterialInspectionNegotiation,
    createMachineryInspectionNegotiation,
    createSparePartInspectionNegotiation,
    createTruckInspectionServiceNegotiation,
    currentUser,
    pakistanCities,
    searchNegotiationEligibleConstructionMaterials,
    searchNegotiationEligibleMachineries,
    searchNegotiationEligibleSpareParts,
    searchNegotiationEligibleTrucks,
    userToken,
  } = useContext(AppContext);
  const [offer, setOffer] = useState({
    selectedTruckId: '',
    onSite: false,
    buyerAddress: '',
    buyerCity: '',
    inspectionDate: null,
    inspectionTime: '09:00',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const supportedCategoryTypes = useMemo(
    () => Array.from(new Set((inspectionService?.category || []).map((item) => item?.categoryType).filter(Boolean))),
    [inspectionService?.category]
  );
  const supportsTruck = supportedCategoryTypes.includes('truck');
  const supportsMachinery = supportedCategoryTypes.includes('machinery');
  const supportsSparePart = supportedCategoryTypes.includes('spareParts');
  const supportsConstructionMaterial = supportedCategoryTypes.includes('material');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const [truckResults, machineryResults, constructionMaterialResults] = await Promise.all([
        supportsTruck ? searchNegotiationEligibleTrucks(inspectionService?._id, searchQuery) : Promise.resolve([]),
        supportsMachinery ? searchNegotiationEligibleMachineries(inspectionService?._id, searchQuery) : Promise.resolve([]),
        supportsConstructionMaterial ? searchNegotiationEligibleConstructionMaterials(inspectionService?._id, searchQuery) : Promise.resolve([]),
      ]);
      const sparePartResults = supportsSparePart ? await searchNegotiationEligibleSpareParts(inspectionService?._id, searchQuery) : [];

      const mergedResults = [
        ...(Array.isArray(truckResults) ? truckResults.map((item) => ({ ...item, __inspectionListingType: 'truck' })) : []),
        ...(Array.isArray(machineryResults) ? machineryResults.map((item) => ({ ...item, __inspectionListingType: 'machinery' })) : []),
        ...(Array.isArray(constructionMaterialResults) ? constructionMaterialResults.map((item) => ({ ...item, __inspectionListingType: 'constructionMaterial' })) : []),
        ...(Array.isArray(sparePartResults) ? sparePartResults.map((item) => ({ ...item, __inspectionListingType: 'sparePart' })) : []),
      ];

      if (mounted) setResults(mergedResults);
    };
    load();
    return () => { mounted = false; };
  }, [
    inspectionService?._id,
    searchNegotiationEligibleConstructionMaterials,
    searchNegotiationEligibleMachineries,
    searchNegotiationEligibleSpareParts,
    searchNegotiationEligibleTrucks,
    searchQuery,
    supportsConstructionMaterial,
    supportsSparePart,
    supportsMachinery,
    supportsTruck,
  ]);

  const availableCities = useMemo(
    () => (inspectionService?.inspectionAreas || []).map((item) => item?.city).filter(Boolean),
    [inspectionService?.inspectionAreas]
  );

  const selectedListing = useMemo(
    () => results.find((item) => String(item._id) === String(offer.selectedTruckId)),
    [offer.selectedTruckId, results]
  );
  const visibleResults = useMemo(
    () => results.filter((item) => String(item._id) !== String(offer.selectedTruckId)),
    [offer.selectedTruckId, results]
  );

  const summaryText = useMemo(
    () => `Submit an inspection request for ${selectedListing?.title || 'the selected listing'} in ${offer.onSite ? (offer.buyerCity || 'selected city') : 'workshop mode'} on ${offer.inspectionDate ? new Date(offer.inspectionDate).toLocaleDateString() : 'the selected date'} at ${offer.inspectionTime || 'the selected time'}?`,
    [offer.buyerCity, offer.inspectionDate, offer.inspectionTime, offer.onSite, selectedListing?.title]
  );
  const selectedType = selectedListing?.__inspectionListingType
    || (supportsMachinery && !supportsTruck && !supportsConstructionMaterial ? 'machinery' : null)
    || (supportsConstructionMaterial && !supportsTruck && !supportsMachinery ? 'constructionMaterial' : null)
    || (supportsSparePart && !supportsTruck && !supportsMachinery && !supportsConstructionMaterial ? 'sparePart' : null)
    || 'truck';
  const listingLabel = selectedType === 'machinery'
    ? 'Machinery'
    : selectedType === 'sparePart'
      ? 'Spare Part'
      : selectedType === 'constructionMaterial'
        ? 'Construction Material'
        : 'Truck';
  const searchTargets = [
    supportsTruck ? 'Truck' : null,
    supportsMachinery ? 'Machinery' : null,
    supportsConstructionMaterial ? 'Construction Material' : null,
    supportsSparePart ? 'Spare Part' : null,
  ].filter(Boolean);
  const searchLabel = `Search ${searchTargets.join(' or ') || 'Truck'}`;
  const searchPlaceholder = `Search ${(searchTargets.length ? searchTargets.join(', ') : 'truck').toLowerCase()} title, brand or location`;
  const offerLabel = selectedType === 'machinery'
    ? 'Offer Machinery Inspection Service Amount'
    : selectedType === 'sparePart'
      ? 'Offer Spare Part Inspection Service Amount'
      : selectedType === 'constructionMaterial'
        ? 'Offer Construction Material Inspection Service Amount'
        : 'Offer Truck Inspection Service Amount';

  const handleSubmit = async () => {
    if (!userToken) {
      history.push('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = selectedType === 'machinery'
        ? await createMachineryInspectionNegotiation({
          inspectionServiceId: inspectionService._id,
          machineryId: offer.selectedTruckId,
          onSite: offer.onSite,
          buyerAddress: offer.onSite ? offer.buyerAddress : '',
          buyerCity: offer.onSite ? offer.buyerCity : '',
          inspectionDate: offer.inspectionDate,
          inspectionTime: offer.inspectionTime,
        })
        : selectedType === 'sparePart'
          ? await createSparePartInspectionNegotiation({
            inspectionServiceId: inspectionService._id,
            sparePartId: offer.selectedTruckId,
            onSite: offer.onSite,
            buyerAddress: offer.onSite ? offer.buyerAddress : '',
            buyerCity: offer.onSite ? offer.buyerCity : '',
            inspectionDate: offer.inspectionDate,
            inspectionTime: offer.inspectionTime,
          })
        : selectedType === 'constructionMaterial'
          ? await createConstructionMaterialInspectionNegotiation({
            inspectionServiceId: inspectionService._id,
            constructionMaterialId: offer.selectedTruckId,
            onSite: offer.onSite,
            buyerAddress: offer.onSite ? offer.buyerAddress : '',
            buyerCity: offer.onSite ? offer.buyerCity : '',
            inspectionDate: offer.inspectionDate,
            inspectionTime: offer.inspectionTime,
          })
        : await createTruckInspectionServiceNegotiation({
          inspectionServiceId: inspectionService._id,
          truckId: offer.selectedTruckId,
          onSite: offer.onSite,
          buyerAddress: offer.onSite ? offer.buyerAddress : '',
          buyerCity: offer.onSite ? offer.buyerCity : '',
          inspectionDate: offer.inspectionDate,
          inspectionTime: offer.inspectionTime,
        });
      setShowConfirm(false);
      history.push(
        selectedType === 'machinery'
          ? `/user-dashboard/machinery-inspection-negotiation/${created._id}`
          : selectedType === 'sparePart'
            ? `/user-dashboard/spare-part-inspection-negotiation/${created._id}`
            : selectedType === 'constructionMaterial'
              ? `/user-dashboard/construction-material-inspection-negotiation/${created._id}`
          : `/user-dashboard/truck-inspection-negotiation/${created._id}`
      );
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
          <label>{offerLabel}</label>
          <input disabled type="text" value="Labour charges will be negotiated later" />
        </div>
        <div className="truck-figma-field">
          <label>{searchLabel}</label>
          <input onChange={(event) => setSearchQuery(event.target.value)} placeholder={searchPlaceholder} type="text" value={searchQuery} />
          {selectedListing ? (
            <div className="inspection-search-selected mt-2">
              <div>
                <strong>{selectedListing.title || selectedListing.brand || `Selected ${listingLabel}`}</strong>
                <span>{selectedListing.location || 'Pakistan'}</span>
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
                  <strong>{item.title || item.brand || (item.__inspectionListingType === 'machinery' ? 'Machinery' : item.__inspectionListingType === 'constructionMaterial' ? 'Construction Material' : 'Truck')}</strong>
                  <span>{[item.brand, item.location].filter(Boolean).join(' • ') || 'Pakistan'}</span>
                </button>
              )) : (
                <div className="inspection-search-empty">No matching results found.</div>
              )}
            </div>
          ) : null}
        </div>
        <div className="truck-figma-field">
          <label>Inspection Date</label>
          <DatePicker
            className="form-control"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            onChange={(value) => setOffer((current) => ({ ...current, inspectionDate: value }))}
            selected={offer.inspectionDate}
          />
        </div>
        <div className="truck-figma-field">
          <label>Inspection Time</label>
          <TimePicker
            className="truck-time-picker"
            disableClock
            format="HH:mm a"
            onChange={(value) => setOffer((current) => ({ ...current, inspectionTime: value || '09:00' }))}
            value={offer.inspectionTime}
          />
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
        <button className="truck-figma-cta truck-figma-cta--primary" disabled={isSubmitting || isOwner || !offer.selectedTruckId || !offer.inspectionDate || !offer.inspectionTime || (offer.onSite && (!offer.buyerCity || !offer.buyerAddress.trim()))} onClick={() => setShowConfirm(true)} type="button">
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
