import { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import SparePartForm from '../SparePartForm';

function SparePartCreatePage({ editMode = false }) {
  const {
    categories,
    countryOptions,
    createSparePart,
    deleteSparePart,
    getCategories,
    getSparePartById,
    getSubCategories,
    machineryBrands,
    pakistanCities,
    sparePartInitialForm,
    subCategories,
    updateSparePart,
    uploadImage,
  } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const { sparePartId } = useParams();
  const [form, setForm] = useState(sparePartInitialForm);

  const sparePartsRoute = useMemo(
    () => (location.pathname.includes('/user-dashboard/my-listings') ? '/user-dashboard/my-listings/spare-parts' : '/user-dashboard/spare-parts'),
    [location.pathname]
  );

  useEffect(() => {
    setForm(sparePartInitialForm);
  }, [sparePartInitialForm]);

  useEffect(() => {
    getCategories('spareParts');
  }, [getCategories]);

  useEffect(() => {
    if (editMode && sparePartId) {
      getSparePartById(sparePartId).then((data) => {
        setForm((current) => ({
          ...current,
          ...data,
          category: data.category?._id || data.category || '',
          subcategory: data.subcategory?._id || data.subcategory || '',
          images: data.images || [],
          compatibleBrands: data.compatibleBrands?.length ? data.compatibleBrands : [{ brand: '' }],
          deliveryLocations: data.deliveryLocations || [],
        }));
      });
    }
  }, [editMode, getSparePartById, sparePartId]);

  useEffect(() => {
    if (form.category) {
      getSubCategories(form.category);
    }
  }, [form.category, getSubCategories]);

  const onTextChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const onCategoryChange = (event) => setForm((current) => ({ ...current, category: event.target.value, subcategory: '' }));
  const onCheckboxChange = (name, value) => setForm((current) => ({ ...current, [name]: value }));
  const onAddCompatibleBrand = () => setForm((current) => ({ ...current, compatibleBrands: [...current.compatibleBrands, { brand: '' }] }));
  const onCompatibleBrandChange = (index, value) => setForm((current) => ({ ...current, compatibleBrands: current.compatibleBrands.map((item, itemIndex) => (itemIndex === index ? { ...item, brand: value } : item)) }));
  const onRemoveCompatibleBrand = (index) => setForm((current) => ({ ...current, compatibleBrands: current.compatibleBrands.filter((_, itemIndex) => itemIndex !== index) }));
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
    compatibleBrands: form.compatibleBrands.filter((item) => item.brand),
  });

  const onSubmit = async () => {
    if (editMode && sparePartId) {
      await updateSparePart(sparePartId, buildPayload());
      history.push(sparePartsRoute);
      return;
    }

    await createSparePart(buildPayload());
    history.push(sparePartsRoute);
  };

  const onDelete = async () => {
    await deleteSparePart(sparePartId);
    history.push(sparePartsRoute);
  };

  return (
    <>
      <SparePartForm
        categories={categories}
        cities={pakistanCities}
        countryOptions={countryOptions}
        data={form}
        imagePreviews={form.images || []}
        isAdminView={false}
        machineryBrands={machineryBrands}
        onAddCompatibleBrand={onAddCompatibleBrand}
        onAddDeliveryLocation={onAddDeliveryLocation}
        onCategoryChange={onCategoryChange}
        onCheckboxChange={onCheckboxChange}
        onClearUploads={onClearUploads}
        onCompatibleBrandChange={onCompatibleBrandChange}
        onDeliveryLocationChange={onDeliveryLocationChange}
        onFileChange={onFileChange}
        onRemoveCompatibleBrand={onRemoveCompatibleBrand}
        onRemoveDeliveryLocation={onRemoveDeliveryLocation}
        onRemovePreview={onRemovePreview}
        onSubmit={onSubmit}
        onTextChange={onTextChange}
        statusActionLabel=""
        subCategories={subCategories}
        submitLabel={editMode ? 'Edit Spare Part Listing' : 'Create Spare Part Listing'}
      />
      {editMode ? <div className="dashboard-form-actions mt-3"><button className="dashboard-danger-btn" onClick={onDelete} type="button">Delete Listing</button></div> : null}
    </>
  );
}

export default SparePartCreatePage;
