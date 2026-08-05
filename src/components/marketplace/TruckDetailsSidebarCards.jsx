import { useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/appContext';
import ConfirmModal from '../dashboard/ConfirmModal';
import TruckDetailsFinancing from './TruckDetailsFinancing';

function TruckDetailsSidebarCards({ truck }) {
  const history = useHistory();
  const { createTruckNegotiation, pakistanCities, userToken } = useContext(AppContext);
  const [offer, setOffer] = useState({
    truckCost: '',
    sellerDelivery: false,
    buyerDeliveryCity: '',
    buyerDeliveryAddress: '',
    deliveryCost: '',
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <div className="truck-figma-sidebar-stack">
      <section className="truck-figma-price-card">
        <small>Total Estimated Price</small>
        <span>Incl. Taxes &amp; Handling</span>
        <strong>{truck?.price ? `Rs. ${Number(truck.price).toLocaleString()}` : 'N/A'}</strong>
        <button className="truck-figma-cta truck-figma-cta--primary" type="button">Request for Meeting</button>
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
            <button className={offer.sellerDelivery ? 'active' : ''} onClick={() => setOffer((current) => ({ ...current, sellerDelivery: true }))} type="button">Seller Delivery</button>
            <button className={!offer.sellerDelivery ? 'active' : ''} onClick={() => setOffer((current) => ({ ...current, sellerDelivery: false, buyerDeliveryCity: '', buyerDeliveryAddress: '', deliveryCost: '' }))} type="button">SBC Delivery</button>
          </div>
        </div>
        {offer.sellerDelivery ? (
          <>
            <div className="truck-figma-field">
              <label>Buyer Delivery City</label>
              <select className="truck-figma-select" onChange={(event) => setOffer((current) => ({ ...current, buyerDeliveryCity: event.target.value }))} value={offer.buyerDeliveryCity}>
                <option value="">Select city</option>
                {pakistanCities.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
            <div className="truck-figma-field">
              <label>Buyer Delivery Address</label>
              <input onChange={(event) => setOffer((current) => ({ ...current, buyerDeliveryAddress: event.target.value }))} placeholder="Enter delivery address" type="text" value={offer.buyerDeliveryAddress} />
            </div>
            <div className="truck-figma-field">
              <label>Delivery Cost (PKR)</label>
              <input onChange={(event) => setOffer((current) => ({ ...current, deliveryCost: event.target.value }))} placeholder="Enter delivery cost" type="number" value={offer.deliveryCost} />
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
      <TruckDetailsFinancing/>
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

export default TruckDetailsSidebarCards;
