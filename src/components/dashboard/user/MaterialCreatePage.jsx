import { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import MaterialForm from '../MaterialForm';

function MaterialCreatePage({ editMode = false }) {
  const {
    categories,
    createMaterial,
    deleteMaterial,
    getCategories,
    getMaterialById,
    getSubCategories,
    materialGrades,
    materialInitialForm,
    materialSellerTypes,
    materialUnits,
    pakistanCities,
    subCategories,
    updateMaterial,
    uploadImage,
  } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const { materialId } = useParams();
  const [form, setForm] = useState(materialInitialForm);

  const materialsRoute = useMemo(
    () => (location.pathname.includes('/user-dashboard/my-listings') ? '/user-dashboard/my-listings/construction-material' : '/user-dashboard/construction-material'),
    [location.pathname]
  );

  useEffect(() => {
    setForm(materialInitialForm);
  }, [materialInitialForm]);

  useEffect(() => {
    getCategories('material');
  }, [getCategories]);

  useEffect(() => {
    if (editMode && materialId) {
      getMaterialById(materialId).then((data) => {
        setForm((current) => ({
          ...current,
          ...data,
          category: data.category?._id || data.category || '',
          subcategory: data.subcategory?._id || data.subcategory || '',
          images: data.images || [],
          deliveryLocations: data.deliveryLocations || [],
        }));
      });
    }
  }, [editMode, getMaterialById, materialId]);

  useEffect(() => {
    if (form.category) {
      getSubCategories(form.category);
    }
  }, [form.category, getSubCategories]);

  const onTextChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const onCategoryChange = (event) => setForm((current) => ({ ...current, category: event.target.value, subcategory: '' }));
  const onCheckboxChange = (name, value) => setForm((current) => ({ ...current, [name]: value }));
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
    if (editMode && materialId) {
      await updateMaterial(materialId, buildPayload());
      history.push(materialsRoute);
      return;
    }

    await createMaterial(buildPayload());
    history.push(materialsRoute);
  };

  const onDelete = async () => {
    await deleteMaterial(materialId);
    history.push(materialsRoute);
  };

  return (
    <>
      <MaterialForm
        categories={categories}
        cities={pakistanCities}
        data={form}
        imagePreviews={form.images || []}
        isAdminView={false}
        materialGrades={materialGrades}
        materialSellerTypes={materialSellerTypes}
        materialUnits={materialUnits}
        onAddDeliveryLocation={onAddDeliveryLocation}
        onCategoryChange={onCategoryChange}
        onCheckboxChange={onCheckboxChange}
        onClearUploads={onClearUploads}
        onDeliveryLocationChange={onDeliveryLocationChange}
        onFileChange={onFileChange}
        onRemoveDeliveryLocation={onRemoveDeliveryLocation}
        onRemovePreview={onRemovePreview}
        onSubmit={onSubmit}
        onTextChange={onTextChange}
        statusActionLabel=""
        subCategories={subCategories}
        submitLabel={editMode ? 'Edit Construction Material Listing' : 'Create Construction Material Listing'}
      />
      {editMode ? <div className="dashboard-form-actions mt-3"><button className="dashboard-danger-btn" onClick={onDelete} type="button">Delete Listing</button></div> : null}
    </>
  );
}

export default MaterialCreatePage;
