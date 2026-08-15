import { useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/appContext';
import ConfirmModal from '../dashboard/ConfirmModal';
import TruckDetailsFinancing from './TruckDetailsFinancing';
import TruckFinancingRequestModal from './TruckFinancingRequestModal';
import TruckMeetingRequestModal from './TruckMeetingRequestModal';

function TruckDetailsSidebarCards({ truck }) {
  const history = useHistory();
  const { createFinanceTruckRequest, createTruckMeeting, createTruckNegotiation, currentUser, pakistanCities, userToken } = useContext(AppContext);
  const [offer, setOffer] = useState({
    truckCost: '',
    sellerDelivery: false,
    buyerDeliveryCity: '',
    buyerDeliveryAddress: '',
    deliveryCost: '',
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showFinanceModal, setShowFinanceModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMeetingSubmitting, setIsMeetingSubmitting] = useState(false);
  const [isFinanceSubmitting, setIsFinanceSubmitting] = useState(false);
  const [financeRequestCount, setFinanceRequestCount] = useState(0);
  const availableDeliveryCities = useMemo(
    () => (truck?.deliveryLocations || []).filter((item) => item?.city),
    [truck?.deliveryLocations]
  );
  const selectedDeliveryLocation = useMemo(
    () => availableDeliveryCities.find((item) => item.city === offer.buyerDeliveryCity) || null,
    [availableDeliveryCities, offer.buyerDeliveryCity]
  );

  const summaryText = useMemo(() => {
    const deliveryText = offer.sellerDelivery
      ? `Seller delivery to ${offer.buyerDeliveryCity || 'selected city'}`
      : 'SBC delivery';
    return `Submit an offer of Rs. ${offer.truckCost || 0} for ${truck?.title || 'this truck'} with ${deliveryText}?`;
  }, [offer.buyerDeliveryCity, offer.sellerDelivery, offer.truckCost, truck?.title]);

  const handleSubmit = async () => {
    if (!userToken) {
      history.push('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await createTruckNegotiation({
        truckId: truck._id,
        sellerDelivery: offer.sellerDelivery,
        buyerDeliveryAddress: offer.sellerDelivery ? offer.buyerDeliveryAddress : '',
        buyerDeliveryCity: offer.sellerDelivery ? offer.buyerDeliveryCity : '',
        truckCost: Number(offer.truckCost) || 0,
        deliveryCost: offer.sellerDelivery ? (Number(offer.deliveryCost) || 0) : null,
      });
      setShowConfirm(false);
      history.push(`/user-dashboard/truck-negotiation/${created._id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMeetingRequest = async (payload) => {
    if (!userToken) {
      history.push('/login');
      return;
    }

    setIsMeetingSubmitting(true);
    try {
      const created = await createTruckMeeting({
        truckId: truck._id,
        ...payload,
      });
      setShowMeetingModal(false);
      history.push(`/user-dashboard/truck-meeting/${created._id}`);
    } finally {
      setIsMeetingSubmitting(false);
    }
  };

  const handleFinanceRequest = async (payload) => {
    if (!userToken) {
      history.push('/login');
      return;
    }

    setIsFinanceSubmitting(true);
    try {
      const response = await createFinanceTruckRequest({
        truckId: truck._id,
        ...payload,
      });
      setFinanceRequestCount(Number(response?.createdCount) || 0);
    } finally {
      setIsFinanceSubmitting(false);
    }
  };

  const isOwner = String(currentUser?._id) === String(truck?.user?._id);

  return (
    <div className="truck-figma-sidebar-stack">
      <section className="truck-figma-price-card">
        <small>Total Estimated Price</small>
        <span>Incl. Taxes &amp; Handling</span>
        <strong>{truck?.price ? `Rs. ${Number(truck.price).toLocaleString()}` : 'N/A'}</strong>
        <button className="truck-figma-cta truck-figma-cta--primary" disabled={isOwner} onClick={() => setShowMeetingModal(true)} type="button">
          {isOwner ? 'Your Listing' : 'Request for Meeting'}
        </button>
        <button className="truck-figma-cta truck-figma-cta--ghost" type="button">Download Spec Sheet</button>
      </section>

      <section className="truck-figma-offer-card">
        <h3>Submit Your Offer</h3>
        <div className="truck-figma-field">
          <label>Offer Truck Amount (PKR)</label>
          <input onChange={(event) => setOffer((current) => ({ ...current, truckCost: event.target.value }))} placeholder="Enter your offer" type="number" value={offer.truckCost} />
        </div>
        <div className="truck-figma-field">
          <label>Select Delivery Type</label>
          <div className="truck-figma-delivery-options">
            <button
              className={offer.sellerDelivery ? 'active' : ''}
              disabled={!truck?.deliveryProvided}
              onClick={() => truck?.deliveryProvided && setOffer((current) => ({ ...current, sellerDelivery: true, deliveryCost: current.deliveryCost || String(selectedDeliveryLocation?.price || '') }))}
              type="button"
            >
              Seller Delivery
            </button>
            <button className={!offer.sellerDelivery ? 'active' : ''} onClick={() => setOffer((current) => ({ ...current, sellerDelivery: false, buyerDeliveryCity: '', buyerDeliveryAddress: '', deliveryCost: '' }))} type="button">SBC Delivery</button>
          </div>
        </div>
        {offer.sellerDelivery ? (
          <>
            <div className="truck-figma-field">
              <label>Buyer Delivery City</label>
              <select
                className="truck-figma-select"
                onChange={(event) => {
                  const selected = availableDeliveryCities.find((item) => item.city === event.target.value);
                  setOffer((current) => ({
                    ...current,
                    buyerDeliveryCity: event.target.value,
                    deliveryCost: selected?.price ? String(selected.price) : '',
                  }));
                }}
                value={offer.buyerDeliveryCity}
              >
                <option value="">Select city</option>
                {availableDeliveryCities.map((item) => <option key={item.city} value={item.city}>{item.city}</option>)}
              </select>
            </div>
            <div className="truck-figma-field">
              <label>Buyer Delivery Address</label>
              <input onChange={(event) => setOffer((current) => ({ ...current, buyerDeliveryAddress: event.target.value }))} placeholder="Enter delivery address" type="text" value={offer.buyerDeliveryAddress} />
            </div>
            <div className="truck-figma-field">
              <label>Delivery Cost (PKR)</label>
              <input onChange={(event) => setOffer((current) => ({ ...current, deliveryCost: event.target.value }))} placeholder="Enter delivery cost" type="number" value={offer.deliveryCost} />
              <small className="truck-figma-field-hint">
                Suggested Seller Delivery Cost: {selectedDeliveryLocation?.price ? `Rs. ${Number(selectedDeliveryLocation.price).toLocaleString()}` : '—'}
              </small>
            </div>
          </>
        ) : null}
        <button className="truck-figma-cta truck-figma-cta--primary" disabled={!offer.truckCost || isSubmitting} onClick={() => setShowConfirm(true)} type="button">
          <i className="fa fa-calendar-check-o" aria-hidden="true" />
          <span>{isSubmitting ? 'Submitting...' : 'Submit Offer'}</span>
        </button>
      </section>

      <section className="truck-figma-trust-card">
        <div className="truck-figma-trust-icon">
          <i className="fa fa-shield" aria-hidden="true" />
        </div>
        <div>
          <h4>Verified Equipment</h4>
          <p>Last inspected 14 days ago by certified engineer.</p>
        </div>
      </section>
      <TruckDetailsFinancing
        onCheckEligibility={() => setShowFinanceModal(true)}
        onRequestFinancing={() => setShowFinanceModal(true)}
      />
      <ConfirmModal
        body={summaryText}
        confirmLabel={isSubmitting ? 'Submitting...' : 'Submit Offer'}
        onClose={() => !isSubmitting && setShowConfirm(false)}
        onConfirm={handleSubmit}
        open={showConfirm}
        title="Confirm Offer Submission"
      />
      <TruckMeetingRequestModal
        isSubmitting={isMeetingSubmitting}
        onClose={() => !isMeetingSubmitting && setShowMeetingModal(false)}
        onSubmit={handleMeetingRequest}
        open={showMeetingModal}
        truckTitle={truck?.title}
      />
      <TruckFinancingRequestModal
        cities={pakistanCities}
        isSubmitting={isFinanceSubmitting}
        onClose={() => { setShowFinanceModal(false); setFinanceRequestCount(0); }}
        onSubmit={handleFinanceRequest}
        open={showFinanceModal}
        submittedCount={financeRequestCount}
      />
      {showFinanceModal && financeRequestCount ? (
        <div className="dashboard-form-actions mt-3">
          <button className="dashboard-action-btn" onClick={() => history.push('/user-dashboard/my-negotiations/finance')} type="button">View Requests</button>
        </div>
      ) : null}
    </div>
  );
}

export default TruckDetailsSidebarCards;
