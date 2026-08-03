import { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import ServiceSpecialistForm from '../ServiceSpecialistForm';

function InspectionServiceCreatePage({ editMode = false }) {
  const {
    categories,
    createInspectionService,
    deleteInspectionService,
    getCategories,
    getInspectionServiceById,
    inspectionServiceInitialForm,
    pakistanCities,
    serviceCategoryTypes,
    updateInspectionService,
    uploadImage,
  } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const { inspectionServiceId } = useParams();
  const [form, setForm] = useState(inspectionServiceInitialForm);

  const inspectionServicesRoute = useMemo(
    () => (location.pathname.includes('/user-dashboard/my-listings') ? '/user-dashboard/my-listings/inspection-services' : '/user-dashboard/inspection-services'),
    [location.pathname]
  );

  const filteredCategories = useMemo(
    () => categories.filter((item) => serviceCategoryTypes.includes(item.categoryType)),
    [categories, serviceCategoryTypes]
  );

  useEffect(() => {
    setForm(inspectionServiceInitialForm);
  }, [inspectionServiceInitialForm]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    if (editMode && inspectionServiceId) {
      getInspectionServiceById(inspectionServiceId).then((data) => {
        setForm((current) => ({
          ...current,
          ...data,
          category: Array.isArray(data.category) ? data.category.map((item) => item._id || item) : [],
          images: data.images || [],
          certificationsImages: data.certificationsImages || [],
          inspectionAreas: data.inspectionAreas || [],
        }));
      });
    }
  }, [editMode, getInspectionServiceById, inspectionServiceId]);

  const onTextChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const onCategoryMultiChange = (values) => setForm((current) => ({ ...current, category: values }));
  const onOfferChange = (value) => setForm((current) => ({ ...current, offerOnsiteInspection: value }));
  const onFileChange = async (event, field) => {
    const files = Array.from(event.target.files || []);
    const uploaded = await Promise.all(files.map(async (file) => ({ url: await uploadImage(file) })));
    setForm((current) => ({ ...current, [field]: [...current[field], ...uploaded] }));
  };
  const onRemovePreview = (field, index) => setForm((current) => ({ ...current, [field]: current[field].filter((_, itemIndex) => itemIndex !== index) }));
  const onClearUploads = (field) => setForm((current) => ({ ...current, [field]: [] }));

  const onSubmit = async () => {
    if (editMode && inspectionServiceId) {
      await updateInspectionService(inspectionServiceId, form);
      history.push(inspectionServicesRoute);
      return;
    }
    await createInspectionService(form);
    history.push(inspectionServicesRoute);
  };

  const onDelete = async () => {
    await deleteInspectionService(inspectionServiceId);
    history.push(inspectionServicesRoute);
  };

  return (
    <>
      <ServiceSpecialistForm
        areaField="inspectionAreas"
        areaLabel="Inspection Areas"
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
        submitLabel={editMode ? 'Edit Inspection Service Listing' : 'Create Inspection Service Listing'}
      />
      {editMode ? <div className="dashboard-form-actions mt-3"><button className="dashboard-danger-btn" onClick={onDelete} type="button">Delete Listing</button></div> : null}
    </>
  );
}

export default InspectionServiceCreatePage;
