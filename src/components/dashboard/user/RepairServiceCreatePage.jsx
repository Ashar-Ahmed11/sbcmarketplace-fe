import { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import ServiceSpecialistForm from '../ServiceSpecialistForm';

function RepairServiceCreatePage({ editMode = false }) {
  const {
    categories,
    createRepairService,
    deleteRepairService,
    getCategories,
    getRepairServiceById,
    pakistanCities,
    repairServiceInitialForm,
    serviceCategoryTypes,
    updateRepairService,
    uploadImage,
  } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const { repairServiceId } = useParams();
  const [form, setForm] = useState(repairServiceInitialForm);

  const repairServicesRoute = useMemo(
    () => (location.pathname.includes('/user-dashboard/my-listings') ? '/user-dashboard/my-listings/repair-services' : '/user-dashboard/repair-services'),
    [location.pathname]
  );

  const filteredCategories = useMemo(
    () => categories.filter((item) => serviceCategoryTypes.includes(item.categoryType)),
    [categories, serviceCategoryTypes]
  );

  useEffect(() => {
    setForm(repairServiceInitialForm);
  }, [repairServiceInitialForm]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    if (editMode && repairServiceId) {
      getRepairServiceById(repairServiceId).then((data) => {
        setForm((current) => ({
          ...current,
          ...data,
          category: Array.isArray(data.category) ? data.category.map((item) => item._id || item) : [],
          images: data.images || [],
          certificationsImages: data.certificationsImages || [],
          repairAreas: data.repairAreas || [],
        }));
      });
    }
  }, [editMode, getRepairServiceById, repairServiceId]);

  const onTextChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const onCategoryMultiChange = (values) => setForm((current) => ({ ...current, category: values }));
  const onOfferChange = (value) => setForm((current) => ({ ...current, offerOnsiteRepair: value }));
  const onFileChange = async (event, field) => {
    const files = Array.from(event.target.files || []);
    const uploaded = await Promise.all(files.map(async (file) => ({ url: await uploadImage(file) })));
    setForm((current) => ({ ...current, [field]: [...current[field], ...uploaded] }));
  };
  const onRemovePreview = (field, index) => setForm((current) => ({ ...current, [field]: current[field].filter((_, itemIndex) => itemIndex !== index) }));
  const onClearUploads = (field) => setForm((current) => ({ ...current, [field]: [] }));

  const onSubmit = async () => {
    if (editMode && repairServiceId) {
      await updateRepairService(repairServiceId, form);
      history.push(repairServicesRoute);
      return;
    }
    await createRepairService(form);
    history.push(repairServicesRoute);
  };

  const onDelete = async () => {
    await deleteRepairService(repairServiceId);
    history.push(repairServicesRoute);
  };

  return (
    <>
      <ServiceSpecialistForm
        areaField="repairAreas"
        areaLabel="Repair Areas"
        categories={filteredCategories}
        categoryLabel="Categories"
        certificationPreviews={form.certificationsImages || []}
        cities={pakistanCities}
        data={form}
        imagePreviews={form.images || []}
        isAdminView={false}
        onCategoryMultiChange={onCategoryMultiChange}
        onClearUploads={onClearUploads}
        onFileChange={onFileChange}
        onOfferChange={onOfferChange}
        onRemovePreview={onRemovePreview}
        onSubmit={onSubmit}
        onTextChange={onTextChange}
        selectedCategoryIds={form.category}
        statusActionLabel=""
        submitLabel={editMode ? 'Edit Repair Service Listing' : 'Create Repair Service Listing'}
      />
      {editMode ? <div className="dashboard-form-actions mt-3"><button className="dashboard-danger-btn" onClick={onDelete} type="button">Delete Listing</button></div> : null}
    </>
  );
}

export default RepairServiceCreatePage;
