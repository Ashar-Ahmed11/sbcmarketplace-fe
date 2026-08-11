import { useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/appContext';
import ConfirmModal from '../dashboard/ConfirmModal';
import TruckDetailsFinancing from './TruckDetailsFinancing';

function ConstructionServiceDetailsSidebarCards({ constructionService }) {
  const history = useHistory();
  const { createConstructionServiceNegotiation, currentUser, userToken } = useContext(AppContext);
  const [offer, setOffer] = useState({
    constructionServiceDescription: '',
    buyerCity: '',
    buyerAddress: '',
    duration: { fromDate: '', toDate: '' },
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const availableCities = useMemo(
    () => (constructionService?.serviceAreas || []).filter((item) => item?.city),
    [constructionService?.serviceAreas]
  );
  const summaryText = useMemo(
    () => `Submit a construction service request for ${constructionService?.title || 'this service'} in ${offer.buyerCity || 'selected city'}?`,
    [constructionService?.title, offer.buyerCity]
  );

  const handleSubmit = async () => {
    if (!userToken) {
      history.push('/login');
      return;
    }
    setIsSubmitting(true);
    try {
      const created = await createConstructionServiceNegotiation({
        constructionServiceId: constructionService._id,
        constructionServiceDescription: offer.constructionServiceDescription,
        buyerAddress: offer.buyerAddress,
        buyerCity: offer.buyerCity,
        duration: offer.duration,
      });
      setShowConfirm(false);
      history.push(`/user-dashboard/construction-service-negotiation/${created._id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOwner = String(currentUser?._id) === String(constructionService?.user?._id);

  return (
    <div className="truck-figma-sidebar-stack">
      <section className="truck-figma-price-card">
        <small>Service Pricing</small>
        <span>Shared after requirement review</span>
        <strong>Call for Quote</strong>
        <button className="truck-figma-cta truck-figma-cta--primary" type="button">Request Consultation</button>
        <button className="truck-figma-cta truck-figma-cta--ghost" type="button">Download Profile</button>
      </section>

      <section className="truck-figma-offer-card">
        <h3>Submit Project Requirement</h3>
        {/* <div className="truck-figma-field">
          <label>Offer Construction Service</label>
          <input disabled placeholder="Labour charges will be negotiated later" type="text" value="0" />
        </div> */}
        <div className="truck-figma-field">
          <label>Service Type</label>
          <div className="truck-figma-delivery-options">
            <button className="active" type="button">On-Site</button>
          </div>
        </div>
        <div className="truck-figma-field">
          <label>Construction Service Description</label>
          <textarea onChange={(event) => setOffer((current) => ({ ...current, constructionServiceDescription: event.target.value }))} placeholder="Share your project need" rows="5" value={offer.constructionServiceDescription} />
        </div>
        <div className="truck-figma-field">
          <label>From Date</label>
          <input onChange={(event) => setOffer((current) => ({ ...current, duration: { ...current.duration, fromDate: event.target.value } }))} type="date" value={offer.duration.fromDate} />
        </div>
        <div className="truck-figma-field">
          <label>To Date</label>
          <input onChange={(event) => setOffer((current) => ({ ...current, duration: { ...current.duration, toDate: event.target.value } }))} type="date" value={offer.duration.toDate} />
        </div>
        <div className="truck-figma-field">
          <label>Buyer City</label>
          <select className="truck-figma-select" onChange={(event) => setOffer((current) => ({ ...current, buyerCity: event.target.value }))} value={offer.buyerCity}>
            <option value="">Select city</option>
            {availableCities.map((item) => <option key={item.city} value={item.city}>{item.city}</option>)}
          </select>
        </div>
        <div className="truck-figma-field">
          <label>Buyer Address</label>
          <input onChange={(event) => setOffer((current) => ({ ...current, buyerAddress: event.target.value }))} placeholder="Enter address" type="text" value={offer.buyerAddress} />
        </div>
        <button className="truck-figma-cta truck-figma-cta--primary" disabled={!offer.constructionServiceDescription || isSubmitting || isOwner} onClick={() => setShowConfirm(true)} type="button">
          <i className="fa fa-calendar-check-o" aria-hidden="true" />
          <span>{isOwner ? 'Your Listing' : isSubmitting ? 'Submitting...' : 'Send Requirement'}</span>
        </button>
      </section>

      <section className="truck-figma-trust-card">
        <div className="truck-figma-trust-icon">
          <i className="fa fa-shield" aria-hidden="true" />
        </div>
        <div>
          <h4>Verified Service Team</h4>
          <p>{constructionService?.offerOnsiteService ? 'Onsite service available for qualified projects.' : 'Remote coordination available before deployment.'}</p>
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

export default ConstructionServiceDetailsSidebarCards;
