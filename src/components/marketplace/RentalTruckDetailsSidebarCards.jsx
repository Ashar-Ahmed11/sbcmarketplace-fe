import { useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/appContext';
import ConfirmModal from '../dashboard/ConfirmModal';
import TruckDetailsFinancing from './TruckDetailsFinancing';

function RentalTruckDetailsSidebarCards({ rentalTruck }) {
  const history = useHistory();
  const { createRentalTruckNegotiation, currentUser, userToken } = useContext(AppContext);
  const [offer, setOffer] = useState({
    perDayRentalCharges: '',
    securityDepositAmount: '',
    sellerDelivery: false,
    buyerDeliveryCity: '',
    buyerDeliveryAddress: '',
    deliveryCost: '',
    mobilizationCost: '',
    demobilizationCost: '',
    rentalDuration: { fromDate: '', toDate: '' },
    fuelResponsibility: 'buyer',
    maintenanceResponsibility: 'seller',
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const availableDeliveryCities = useMemo(
    () => (rentalTruck?.deliveryLocations || []).filter((item) => item?.city),
    [rentalTruck?.deliveryLocations]
  );
  const selectedDeliveryLocation = useMemo(
    () => availableDeliveryCities.find((item) => item.city === offer.buyerDeliveryCity) || null,
    [availableDeliveryCities, offer.buyerDeliveryCity]
  );
  const summaryText = useMemo(() => {
    const deliveryText = offer.sellerDelivery
      ? `Seller delivery to ${offer.buyerDeliveryCity || 'selected city'}`
      : 'SBC delivery';
    return `Submit a rental offer of Rs. ${offer.perDayRentalCharges || 0} per day for ${rentalTruck?.title || 'this rental truck'} with ${deliveryText}?`;
  }, [offer.buyerDeliveryCity, offer.perDayRentalCharges, offer.sellerDelivery, rentalTruck?.title]);

  const handleSubmit = async () => {
    if (!userToken) {
      history.push('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await createRentalTruckNegotiation({
        rentalTruckId: rentalTruck._id,
        sellerDelivery: offer.sellerDelivery,
        buyerDeliveryAddress: offer.sellerDelivery ? offer.buyerDeliveryAddress : '',
        buyerDeliveryCity: offer.sellerDelivery ? offer.buyerDeliveryCity : '',
        perDayRentalCharges: Number(offer.perDayRentalCharges) || 0,
        securityDepositAmount: Number(offer.securityDepositAmount) || 0,
        deliveryCost: offer.sellerDelivery ? (Number(offer.deliveryCost) || 0) : null,
        mobilizationCost: Number(offer.mobilizationCost) || 0,
        demobilizationCost: Number(offer.demobilizationCost) || 0,
        rentalDuration: {
          fromDate: offer.rentalDuration.fromDate || null,
          toDate: offer.rentalDuration.toDate || null,
        },
        fuelResponsibility: offer.fuelResponsibility,
        maintenanceResponsibility: offer.maintenanceResponsibility,
      });
      setShowConfirm(false);
      history.push(`/user-dashboard/rental-truck-negotiation/${created._id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOwner = String(currentUser?._id) === String(rentalTruck?.user?._id);

  return (
    <div className="truck-figma-sidebar-stack">
      <section className="truck-figma-price-card">
        <small>Per Hour Rental Charges</small>
        <span>Rental Marketplace Listing</span>
        <strong>{rentalTruck?.perHourRentalCharges ? `Rs. ${Number(rentalTruck.perHourRentalCharges).toLocaleString()}` : 'N/A'}</strong>
        <button className="truck-figma-cta truck-figma-cta--primary" type="button">Request for Meeting</button>
        <button className="truck-figma-cta truck-figma-cta--ghost" type="button">Download Spec Sheet</button>
      </section>

      <section className="truck-figma-offer-card">
        <h3>Submit Your Rental Offer</h3>
        <div className="truck-figma-field">
          <label>Offer Rental Amount</label>
          <input onChange={(event) => setOffer((current) => ({ ...current, perDayRentalCharges: event.target.value }))} placeholder="Enter your per day rental offer" type="number" value={offer.perDayRentalCharges} />
        </div>
        <div className="truck-figma-field">
          <label>Security Deposit Amount</label>
          <input onChange={(event) => setOffer((current) => ({ ...current, securityDepositAmount: event.target.value }))} placeholder="Enter security deposit amount" type="number" value={offer.securityDepositAmount} />
        </div>
        <div className="truck-figma-field">
          <label>Rental Duration From</label>
          <input onChange={(event) => setOffer((current) => ({ ...current, rentalDuration: { ...current.rentalDuration, fromDate: event.target.value } }))} type="date" value={offer.rentalDuration.fromDate} />
        </div>
        <div className="truck-figma-field">
          <label>Rental Duration To</label>
          <input onChange={(event) => setOffer((current) => ({ ...current, rentalDuration: { ...current.rentalDuration, toDate: event.target.value } }))} type="date" value={offer.rentalDuration.toDate} />
        </div>
        <div className="truck-figma-field">
          <label>Fuel Responsibility</label>
          <select className="truck-figma-select" onChange={(event) => setOffer((current) => ({ ...current, fuelResponsibility: event.target.value }))} value={offer.fuelResponsibility}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <div className="truck-figma-field">
          <label>Maintenance Responsibility</label>
          <select className="truck-figma-select" onChange={(event) => setOffer((current) => ({ ...current, maintenanceResponsibility: event.target.value }))} value={offer.maintenanceResponsibility}>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>
        <div className="truck-figma-field">
          <label>Select Delivery Type</label>
          <div className="truck-figma-delivery-options">
            <button
              className={offer.sellerDelivery ? 'active' : ''}
              disabled={!rentalTruck?.deliveryProvided}
              onClick={() => rentalTruck?.deliveryProvided && setOffer((current) => ({ ...current, sellerDelivery: true, deliveryCost: current.deliveryCost || String(selectedDeliveryLocation?.price || '') }))}
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
        <button className="truck-figma-cta truck-figma-cta--primary" disabled={!offer.perDayRentalCharges || isSubmitting || isOwner} onClick={() => setShowConfirm(true)} type="button">
          <i className="fa fa-calendar-check-o" aria-hidden="true" />
          <span>{isOwner ? 'Your Listing' : isSubmitting ? 'Submitting...' : 'Submit Offer'}</span>
        </button>
      </section>

      <section className="truck-figma-trust-card">
        <div className="truck-figma-trust-icon">
          <i className="fa fa-shield" aria-hidden="true" />
        </div>
        <div>
          <h4>Rental Availability Verified</h4>
          <p>{rentalTruck?.truckStatus ? `${rentalTruck.truckStatus} status shared by the listing owner.` : 'Availability can be confirmed by the seller.'}</p>
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

export default RentalTruckDetailsSidebarCards;
