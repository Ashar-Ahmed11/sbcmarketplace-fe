import 'react-datepicker/dist/react-datepicker.css';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import MachineryForm from '../MachineryForm';

function RentalMachineryCreatePage({ editMode = false }) {
  const {
    categories,
    countryOptions,
    createRentalMachinery,
    deleteRentalMachinery,
    getCategories,
    getRentalMachineryById,
    getSubCategories,
    machineryBrands,
    pakistanCities,
    rentalMachineryInitialForm,
    subCategories,
    updateRentalMachinery,
    uploadImage,
  } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const { rentalMachineryId } = useParams();
  const [form, setForm] = useState(rentalMachineryInitialForm);

  const listingsRoute = useMemo(
    () => (location.pathname.includes('/user-dashboard/my-listings') ? '/user-dashboard/my-listings/construction-machinery-rental' : '/user-dashboard/construction-machinery-rental'),
    [location.pathname]
  );

  useEffect(() => {
    setForm(rentalMachineryInitialForm);
  }, [rentalMachineryInitialForm]);

  useEffect(() => {
    getCategories('machinery');
  }, [getCategories]);

  useEffect(() => {
    if (editMode && rentalMachineryId) {
      getRentalMachineryById(rentalMachineryId).then((data) => {
        setForm((current) => ({
          ...current,
          ...data,
          category: data.category?._id || data.category || '',
          subcategory: data.subcategory?._id || data.subcategory || '',
          images: data.images || [],
          documentImages: data.documentImages || [],
          deliveryLocations: data.deliveryLocations || [],
          availableRentalDuration: {
            fromDate: data.availableRentalDuration?.fromDate || '',
            toDate: data.availableRentalDuration?.toDate || '',
          },
        }));
      });
    }
  }, [editMode, getRentalMachineryById, rentalMachineryId]);

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
  const onRentalDurationChange = (key, value) => setForm((current) => ({
    ...current,
    availableRentalDuration: { ...current.availableRentalDuration, [key]: value },
  }));
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
    if (editMode && rentalMachineryId) {
      await updateRentalMachinery(rentalMachineryId, buildPayload());
      history.push(listingsRoute);
      return;
    }

    await createRentalMachinery(buildPayload());
    history.push(listingsRoute);
  };

  const onDelete = async () => {
    await deleteRentalMachinery(rentalMachineryId);
    history.push(listingsRoute);
  };

  return (
    <>
      <MachineryForm
        categories={categories}
        cities={pakistanCities}
        countryOptions={countryOptions}
        data={form}
        documentPreviews={form.documentImages || []}
        imagePreviews={form.images || []}
        isAdminView={false}
        machineryBrands={machineryBrands}
        machineryStatuses={[]}
        onAddDeliveryLocation={onAddDeliveryLocation}
        onCategoryChange={onCategoryChange}
        onCheckboxChange={onCheckboxChange}
        onClearUploads={onClearUploads}
        onDeliveryLocationChange={onDeliveryLocationChange}
        onFeatureChange={onFeatureChange}
        onFileChange={onFileChange}
        onNestedChange={onNestedChange}
        onRentalDurationChange={onRentalDurationChange}
        onRemoveDeliveryLocation={onRemoveDeliveryLocation}
        onRemovePreview={onRemovePreview}
        onSubmit={onSubmit}
        onTextChange={onTextChange}
        showPriceField={false}
        showRentalFields
        statusActionLabel=""
        subCategories={subCategories}
        submitLabel={editMode ? 'Edit Rental Construction Machinery Listing' : 'Create Rental Construction Machinery Listing'}
        useRentalStatuses
      />
      {editMode ? <div className="dashboard-form-actions mt-3"><button className="dashboard-danger-btn" onClick={onDelete} type="button">Delete Listing</button></div> : null}
    </>
  );
}

export default RentalMachineryCreatePage;
