import { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/appContext';
import ConfirmModal from '../dashboard/ConfirmModal';
import './requirements.css';

const truckRequirementInitialForm = {
  category: '',
  brand: '',
  condition: 'both',
  budget: '',
  deliveryType: 'sbc',
  buyerDeliveryCity: '',
  buyerDeliveryAddress: '',
};

function TruckRequirementPage() {
  const history = useHistory();
  const {
    categories,
    createTruckRequirement,
    getCategories,
    pakistanCities,
    truckBrands,
    userToken,
  } = useContext(AppContext);
  const [form, setForm] = useState(truckRequirementInitialForm);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const truckCategories = useMemo(
    () => (categories || []).filter((item) => item?.categoryType === 'truck'),
    [categories]
  );

  const canSubmit = Boolean(
    form.category
    && form.budget
    && (
      form.deliveryType === 'sbc'
        ? true
        : form.buyerDeliveryCity && form.buyerDeliveryAddress.trim()
    )
  );

  const handleSubmit = async () => {
    if (!userToken) {
      history.push('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createTruckRequirement(form);
      history.push('/post-a-requirement/trucks/success', {
        createdCount: response?.createdCount || 0,
        previewSellers: response?.previewSellers || [],
      });
    } finally {
      setIsSubmitting(false);
      setShowConfirm(false);
    }
  };

  return (
    <main className="requirement-page">
      <div className="container-xl requirement-shell">
        

        <div className="requirement-content">
          <div className="requirement-breadcrumb">SBC / Post a Requirement / <strong>Truck</strong></div>

          <section className="mb-4">
            <h1 className="requirement-hero__title" style={{ fontSize: '2.25rem', maxWidth: 'unset' }}>
              Describe what you&apos;re looking for
            </h1>
            <p className="requirement-hero__text mb-0">
              The more detail you give, the better SBC can match you to the right truck sellers.
            </p>
          </section>

          <div className="requirement-tabs">
            <button className="requirement-tab active" type="button">Truck</button>
            <button className="requirement-tab" disabled type="button">Construction Machinery</button>
            <button className="requirement-tab" disabled type="button">Construction Material</button>
            <button className="requirement-tab" disabled type="button">Spare Part</button>
          </div>

          <div className="requirement-progress">
            <div className="requirement-progress__bars">
              <span className="requirement-progress__bar active-primary" />
              <span className="requirement-progress__bar active-secondary" />
              <span className="requirement-progress__bar" />
            </div>
            <div className="requirement-progress__labels">
              <span>Service</span>
              <span className="active">Requirement Details</span>
              <span style={{ textAlign: 'right' }}>Review &amp; Submit</span>
            </div>
          </div>

          <section className="requirement-form-card">
            <div className="requirement-form-section">
              <h2 className="requirement-form-section__title">Truck Details</h2>
              <div className="row g-3">
                <div className="col-md-6 col-12 requirement-field">
                  <label>Truck Category</label>
                  <select onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} value={form.category}>
                    <option value="">Select category</option>
                    {truckCategories.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
                  </select>
                </div>
                <div className="col-md-6 col-12 requirement-field">
                  <label>Brand</label>
                  <select onChange={(event) => setForm((current) => ({ ...current, brand: event.target.value }))} value={form.brand}>
                    <option value="">Select brand</option>
                    {truckBrands.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
                <div className="col-md-6 col-12 requirement-field">
                  <label>New / Used</label>
                  <div className="requirement-toggle-group">
                    {[
                      ['new', 'New'],
                      ['used', 'Used'],
                      ['both', 'Both'],
                    ].map(([value, label]) => (
                      <button
                        className={`requirement-toggle${form.condition === value ? ' active' : ''}`}
                        key={value}
                        onClick={() => setForm((current) => ({ ...current, condition: value }))}
                        type="button"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="requirement-form-section">
              <h2 className="requirement-form-section__title">Budget</h2>
              <div className="row g-3">
                <div className="col-12 requirement-field">
                  <label>Budget</label>
                  <input onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))} type="number" value={form.budget} />
                </div>
              </div>
            </div>

            <div className="requirement-form-section">
              <h2 className="requirement-form-section__title">Delivery</h2>
              <div className="row g-3">
                <div className="col-12 requirement-field">
                  <label>Delivery Type</label>
                  <div className="requirement-toggle-group">
                    {[
                      ['sbc', 'SBC Delivery'],
                      ['seller', 'Seller Delivery'],
                    ].map(([value, label]) => (
                      <button
                        className={`requirement-toggle${form.deliveryType === value ? ' active' : ''}`}
                        key={value}
                        onClick={() => setForm((current) => ({ ...current, deliveryType: value }))}
                        type="button"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                {form.deliveryType !== 'sbc' ? (
                  <>
                    <div className="col-md-6 col-12 requirement-field">
                      <label>Delivery City</label>
                      <select onChange={(event) => setForm((current) => ({ ...current, buyerDeliveryCity: event.target.value }))} value={form.buyerDeliveryCity}>
                        <option value="">Select city</option>
                        {pakistanCities.map((city) => <option key={city} value={city}>{city}</option>)}
                      </select>
                    </div>
                    <div className="col-md-6 col-12 requirement-field">
                      <label>Delivery Address</label>
                      <input onChange={(event) => setForm((current) => ({ ...current, buyerDeliveryAddress: event.target.value }))} type="text" value={form.buyerDeliveryAddress} />
                    </div>
                  </>
                ) : null}
              </div>

              <div className="requirement-match-note">
                <strong>How matching works:</strong> once submitted, SBC matches your truck requirement with approved truck listings by budget, category and delivery preference, then notifies the matching sellers.
              </div>
            </div>

            <div className="requirement-actions">
              <button className="dashboard-secondary-btn" onClick={() => history.push('/post-a-requirement')} type="button">← Back</button>
              <button className="dashboard-action-btn" disabled={!canSubmit || isSubmitting} onClick={() => setShowConfirm(true)} type="button">
                {isSubmitting ? 'Submitting...' : 'Submit Requirement →'}
              </button>
            </div>
          </section>
        </div>

        <ConfirmModal
          body="Are you sure you want to submit this requirement? SBC will notify matching truck sellers and initiate negotiations on your behalf."
          confirmLabel={isSubmitting ? 'Submitting...' : 'Submit Requirement'}
          onClose={() => !isSubmitting && setShowConfirm(false)}
          onConfirm={handleSubmit}
          open={showConfirm}
          title="Confirm Requirement Submission"
        />
      </div>
    </main>
  );
}

export default TruckRequirementPage;
