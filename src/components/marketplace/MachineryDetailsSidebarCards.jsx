import { useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/appContext';
import ConfirmModal from '../dashboard/ConfirmModal';
import TruckDetailsFinancing from './TruckDetailsFinancing';

function MachineryDetailsSidebarCards({ machinery }) {
  const history = useHistory();
  const { createMachineryNegotiation, currentUser, userToken } = useContext(AppContext);
  const [offer, setOffer] = useState({
    machineryCost: '',
    sellerDelivery: false,
    buyerDeliveryCity: '',
    buyerDeliveryAddress: '',
    deliveryCost: '',
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const availableDeliveryCities = useMemo(
    () => (machinery?.deliveryLocations || []).filter((item) => item?.city),
    [machinery?.deliveryLocations]
  );
  const selectedDeliveryLocation = useMemo(
    () => availableDeliveryCities.find((item) => item.city === offer.buyerDeliveryCity) || null,
    [availableDeliveryCities, offer.buyerDeliveryCity]
  );
  const summaryText = useMemo(() => {
    const deliveryText = offer.sellerDelivery
      ? `Seller delivery to ${offer.buyerDeliveryCity || 'selected city'}`
      : 'SBC delivery';
    return `Submit an offer of Rs. ${offer.machineryCost || 0} for ${machinery?.title || 'this machinery'} with ${deliveryText}?`;
  }, [offer.buyerDeliveryCity, offer.machineryCost, offer.sellerDelivery, machinery?.title]);

  const handleSubmit = async () => {
    if (!userToken) {
      history.push('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await createMachineryNegotiation({
        constructionMachineryId: machinery._id,
        sellerDelivery: offer.sellerDelivery,
        buyerDeliveryAddress: offer.sellerDelivery ? offer.buyerDeliveryAddress : '',
        buyerDeliveryCity: offer.sellerDelivery ? offer.buyerDeliveryCity : '',
        machineryCost: Number(offer.machineryCost) || 0,
        deliveryCost: offer.sellerDelivery ? (Number(offer.deliveryCost) || 0) : null,
      });
      setShowConfirm(false);
      history.push(`/user-dashboard/machinery-negotiation/${created._id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOwner = String(currentUser?._id) === String(machinery?.user?._id);

  return (
    <div className="truck-figma-sidebar-stack">
      <section className="truck-figma-price-card">
        <small>Total Estimated Price</small>
        <span>Incl. Taxes &amp; Handling</span>
        <strong>{machinery?.price ? `Rs. ${Number(machinery.price).toLocaleString()}` : 'N/A'}</strong>
        <button className="truck-figma-cta truck-figma-cta--primary" type="button">Request for Meeting</button>
        <button className="truck-figma-cta truck-figma-cta--ghost" type="button">Download Spec Sheet</button>
      </section>

      <section className="truck-figma-offer-card">
        <h3>Submit Your Machinery Offer</h3>
        <div className="truck-figma-field">
          <label>Offer Machinery Amount (PKR)</label>
          <input onChange={(event) => setOffer((current) => ({ ...current, machineryCost: event.target.value }))} placeholder="Enter your offer" type="number" value={offer.machineryCost} />
        </div>
        <div className="truck-figma-field">
          <label>Select Delivery Type</label>
          <div className="truck-figma-delivery-options">
            <button
              className={offer.sellerDelivery ? 'active' : ''}
              disabled={!machinery?.deliveryProvided}
              onClick={() => machinery?.deliveryProvided && setOffer((current) => ({ ...current, sellerDelivery: true, deliveryCost: current.deliveryCost || String(selectedDeliveryLocation?.price || '') }))}
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
        <button className="truck-figma-cta truck-figma-cta--primary" disabled={!offer.machineryCost || isSubmitting || isOwner} onClick={() => setShowConfirm(true)} type="button">
          <i className="fa fa-calendar-check-o" aria-hidden="true" />
          <span>{isOwner ? 'Your Listing' : isSubmitting ? 'Submitting...' : 'Submit Offer'}</span>
        </button>
      </section>

      <section className="truck-figma-trust-card">
        <div className="truck-figma-trust-icon">
          <i className="fa fa-shield" aria-hidden="true" />
        </div>
        <div>
          <h4>Verified Machinery</h4>
          <p>{machinery?.machineStatus ? `${machinery.machineStatus} status documented for buyers.` : 'Inspection details available on request.'}</p>
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

export default MachineryDetailsSidebarCards;
