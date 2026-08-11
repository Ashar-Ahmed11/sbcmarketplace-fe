import { useContext, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/appContext';
import ConfirmModal from '../dashboard/ConfirmModal';
import TruckDetailsFinancing from './TruckDetailsFinancing';

function RepairServiceDetailsSidebarCards({ repairService }) {
  const history = useHistory();
  const fileInputRef = useRef(null);
  const { createRepairServiceNegotiation, currentUser, uploadImage, userToken } = useContext(AppContext);
  const [offer, setOffer] = useState({
    partsResponsibility: 'buyer',
    faultDescription: '',
    faultImages: [],
    onSite: false,
    buyerAddress: '',
    buyerCity: '',
  });
  const [isUploading, setIsUploading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const availableCities = useMemo(
    () => (repairService?.repairAreas || []).filter((item) => item?.city),
    [repairService?.repairAreas]
  );
  const summaryText = useMemo(
    () => `Submit a repair request for ${repairService?.title || 'this service'} in ${offer.onSite ? (offer.buyerCity || 'selected city') : 'workshop mode'}?`,
    [offer.buyerCity, offer.onSite, repairService?.title]
  );

  const onFileChange = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setIsUploading(true);
    try {
      const uploaded = await Promise.all(files.map(async (file) => ({ url: await uploadImage(file) })));
      setOffer((current) => ({ ...current, faultImages: [...current.faultImages, ...uploaded] }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!userToken) {
      history.push('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await createRepairServiceNegotiation({
        repairServiceId: repairService._id,
        faultDescription: offer.faultDescription,
        faultImages: offer.faultImages,
        onSite: offer.onSite,
        buyerAddress: offer.onSite ? offer.buyerAddress : '',
        buyerCity: offer.onSite ? offer.buyerCity : '',
        partsResponsibility: offer.partsResponsibility,
      });
      setShowConfirm(false);
      history.push(`/user-dashboard/repair-service-negotiation/${created._id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOwner = String(currentUser?._id) === String(repairService?.user?._id);

  return (
    <div className="truck-figma-sidebar-stack">
      <section className="truck-figma-price-card">
        <small>Repair Pricing</small>
        <span>Shared after fault review</span>
        <strong>Call for Quote</strong>
        <button className="truck-figma-cta truck-figma-cta--primary" type="button">Request Repair Support</button>
        <button className="truck-figma-cta truck-figma-cta--ghost" type="button">Download Profile</button>
      </section>

      <section className="truck-figma-offer-card">
        <h3>Submit Repair Requirement</h3>
        {/* <div className="truck-figma-field">
          <label>Offer Repair Service Amount</label>
          <input disabled placeholder="Labour charges will be negotiated later" type="text" value="0" />
        </div> */}
       
        <div className="truck-figma-field">
          <label>Repair Mode</label>
          <div className="truck-figma-delivery-options">
            <button className={offer.onSite ? 'active' : ''} disabled={!repairService?.offerOnsiteRepair} onClick={() => repairService?.offerOnsiteRepair && setOffer((current) => ({ ...current, onSite: true }))} type="button">On-Site</button>
            <button className={!offer.onSite ? 'active' : ''} onClick={() => setOffer((current) => ({ ...current, onSite: false, buyerAddress: '', buyerCity: '' }))} type="button">Workshop</button>
          </div>
        </div>
        <div className="truck-figma-field">
          <label>Fault Details</label>
          <textarea onChange={(event) => setOffer((current) => ({ ...current, faultDescription: event.target.value }))} placeholder="Describe the repair need" rows="5" value={offer.faultDescription} />
        </div>
        {offer.onSite ? (
          <>
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
          </>
        ) : null}
        <div className="dashboard-upload-block mt-3">
          <div className="dashboard-upload-head">
            <div><h2>Fault Images</h2></div>
            <div className="dashboard-upload-actions">
              <button className="dashboard-secondary-btn" onClick={() => fileInputRef.current?.click()} type="button">Upload Image</button>
              <button className="dashboard-secondary-btn" onClick={() => setOffer((current) => ({ ...current, faultImages: [] }))} type="button">Remove Images</button>
            </div>
            <input className="d-none" multiple onChange={onFileChange} ref={fileInputRef} type="file" />
          </div>
          <div className="row py-2">
            {offer.faultImages.map((image, index) => (
              <div className="upload-preview-card col-md-6 my-2" key={`${image.url}-${index}`}>
                <img alt="Fault" src={image.url} />
                <button onClick={() => setOffer((current) => ({ ...current, faultImages: current.faultImages.filter((_, itemIndex) => itemIndex !== index) }))} type="button">×</button>
              </div>
            ))}
          </div>
        </div>
         <div className="truck-figma-field pb-3">
          <label>Parts Responsibility</label>
          <select className="truck-figma-select" onChange={(event) => setOffer((current) => ({ ...current, partsResponsibility: event.target.value }))} value={offer.partsResponsibility}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <button className="truck-figma-cta truck-figma-cta--primary" disabled={isUploading || isSubmitting || isOwner || !offer.faultDescription} onClick={() => setShowConfirm(true)} type="button">
          <i className="fa fa-calendar-check-o" aria-hidden="true" />
          <span>{isOwner ? 'Your Listing' : isSubmitting ? 'Submitting...' : isUploading ? 'Uploading...' : 'Send Requirement'}</span>
        </button>
      </section>

      <section className="truck-figma-trust-card">
        <div className="truck-figma-trust-icon">
          <i className="fa fa-shield" aria-hidden="true" />
        </div>
        <div>
          <h4>Verified Repair Team</h4>
          <p>{repairService?.offerOnsiteRepair ? 'Onsite repair support available across listed areas.' : 'Workshop-based repair coordination available.'}</p>
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

export default RepairServiceDetailsSidebarCards;
