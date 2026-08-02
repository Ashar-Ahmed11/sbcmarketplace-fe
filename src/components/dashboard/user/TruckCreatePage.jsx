import { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import TruckForm from '../TruckForm';

function TruckCreatePage({ editMode = false }) {
  const {
    categories,
    createTruck,
    deleteTruck,
    getCategories,
    getSubCategories,
    getTruckById,
    pakistanCities,
    subCategories,
    truckBrands,
    truckInitialForm,
    updateTruck,
    uploadImage,
  } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const { truckId } = useParams();
  const [form, setForm] = useState(truckInitialForm);

  const trucksRoute = useMemo(
    () => (location.pathname.includes('/user-dashboard/my-listings') ? '/user-dashboard/my-listings/trucks' : '/user-dashboard/trucks'),
    [location.pathname]
  );

  useEffect(() => {
    setForm(truckInitialForm);
  }, [truckInitialForm]);

  useEffect(() => {
    getCategories('truck');
  }, [getCategories]);

  useEffect(() => {
    if (editMode && truckId) {
      getTruckById(truckId).then((data) => {
        setForm((current) => ({
          ...current,
          ...data,
          category: data.category?._id || data.category || '',
          subcategory: data.subcategory?._id || data.subcategory || '',
          images: data.images || [],
          documentImages: data.documentImages || [],
          deliveryLocations: data.deliveryLocations || [],
        }));
      });
    }
  }, [editMode, getTruckById, truckId]);

  useEffect(() => {
    if (form.category) {
      getSubCategories(form.category);
    }
  }, [form.category, getSubCategories]);

  const onTextChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const onCategoryChange = (event) => setForm((current) => ({ ...current, category: event.target.value, subcategory: '' }));
  const onNestedChange = (section, key, value) => setForm((current) => ({ ...current, [section]: { ...current[section], [key]: value } }));
  const onCheckboxChange = (name, value) => setForm((current) => ({ ...current, [name]: value }));
  const onFeatureChange = (key, value) => setForm((current) => ({ ...current, features: { ...current.features, [key]: value } }));
  const onAddDeliveryLocation = () => setForm((current) => ({ ...current, deliveryLocations: [...current.deliveryLocations, { city: '', price: '' }] }));
  const onDeliveryLocationChange = (index, key, value) => setForm((current) => ({ ...current, deliveryLocations: current.deliveryLocations.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)) }));
  const onRemoveDeliveryLocation = (index) => setForm((current) => ({ ...current, deliveryLocations: current.deliveryLocations.filter((_, itemIndex) => itemIndex !== index) }));
  const onFileChange = async (event, field) => {
    const files = Array.from(event.target.files || []);
    const uploaded = await Promise.all(files.map(async (file) => ({ url: await uploadImage(file) })));
    setForm((current) => ({ ...current, [field]: [...current[field], ...uploaded] }));
  };
  const onRemovePreview = (field, index) => setForm((current) => ({ ...current, [field]: current[field].filter((_, itemIndex) => itemIndex !== index) }));
  const onClearUploads = (field) => setForm((current) => ({ ...current, [field]: [] }));

  const buildPayload = () => ({
    ...form,
    subcategory: form.subcategory || null,
  });

  const onSubmit = async () => {
    if (editMode && truckId) {
      await updateTruck(truckId, buildPayload());
      history.push(trucksRoute);
      return;
    }

    await createTruck(buildPayload());
    history.push(trucksRoute);
  };

  const onDelete = async () => {
    await deleteTruck(truckId);
    history.push(trucksRoute);
  };

  return (
    <>
      <TruckForm
        brands={truckBrands}
        categories={categories}
        cities={pakistanCities}
        data={form}
        documentPreviews={form.documentImages || []}
        imagePreviews={form.images || []}
        isAdminView={false}
        isStatusVisible={false}
        onAddDeliveryLocation={onAddDeliveryLocation}
        onCategoryChange={onCategoryChange}
        onCheckboxChange={onCheckboxChange}
        onClearUploads={onClearUploads}
        onDeliveryLocationChange={onDeliveryLocationChange}
        onFeatureChange={onFeatureChange}
        onFileChange={onFileChange}
        onNestedChange={onNestedChange}
        onRemoveDeliveryLocation={onRemoveDeliveryLocation}
        onRemovePreview={onRemovePreview}
        onSubmit={onSubmit}
        onTextChange={onTextChange}
        statusActionLabel=""
        subCategories={subCategories}
        submitLabel={editMode ? 'Edit Truck Listing' : 'Create Truck Listing'}
      />
      {editMode ? <div className="dashboard-form-actions mt-3"><button className="dashboard-danger-btn" onClick={onDelete} type="button">Delete Listing</button></div> : null}
    </>
  );
}

export default TruckCreatePage;
