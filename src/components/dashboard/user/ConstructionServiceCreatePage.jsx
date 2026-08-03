import { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import ConstructionServiceForm from '../ConstructionServiceForm';

function ConstructionServiceCreatePage({ editMode = false }) {
  const {
    categories,
    constructionServiceCompanyTypes,
    constructionServiceInitialForm,
    createConstructionService,
    deleteConstructionService,
    getCategories,
    getConstructionServiceById,
    getSubCategories,
    pakistanCities,
    subCategories,
    updateConstructionService,
    uploadImage,
  } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const { constructionServiceId } = useParams();
  const [form, setForm] = useState(constructionServiceInitialForm);

  const constructionServicesRoute = useMemo(
    () => (location.pathname.includes('/user-dashboard/my-listings') ? '/user-dashboard/my-listings/construction-services' : '/user-dashboard/construction-services'),
    [location.pathname]
  );

  useEffect(() => {
    setForm(constructionServiceInitialForm);
  }, [constructionServiceInitialForm]);

  useEffect(() => {
    getCategories('constructionServices');
  }, [getCategories]);

  useEffect(() => {
    if (editMode && constructionServiceId) {
      getConstructionServiceById(constructionServiceId).then((data) => {
        setForm((current) => ({
          ...current,
          ...data,
          category: data.category?._id || data.category || '',
          subcategory: Array.isArray(data.subcategory) ? data.subcategory.map((item) => item._id || item) : [],
          images: data.images || [],
          certificationsImages: data.certificationsImages || [],
          serviceAreas: data.serviceAreas || [],
        }));
      });
    }
  }, [constructionServiceId, editMode, getConstructionServiceById]);

  useEffect(() => {
    if (form.category) {
      getSubCategories(form.category);
    }
  }, [form.category, getSubCategories]);

  const onTextChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const onCategoryChange = (event) => setForm((current) => ({ ...current, category: event.target.value, subcategory: [] }));
  const onMultiSubcategoryChange = (values) => setForm((current) => ({ ...current, subcategory: values }));
  const onMultiServiceAreaChange = (values) => setForm((current) => ({ ...current, serviceAreas: values }));
  const onOfferChange = (value) => setForm((current) => ({ ...current, offerOnsiteService: value }));
  const onFileChange = async (event, field) => {
    const files = Array.from(event.target.files || []);
    const uploaded = await Promise.all(files.map(async (file) => ({ url: await uploadImage(file) })));
    setForm((current) => ({ ...current, [field]: [...current[field], ...uploaded] }));
  };
  const onRemovePreview = (field, index) => setForm((current) => ({ ...current, [field]: current[field].filter((_, itemIndex) => itemIndex !== index) }));
  const onClearUploads = (field) => setForm((current) => ({ ...current, [field]: [] }));

  const onSubmit = async () => {
    if (editMode && constructionServiceId) {
      await updateConstructionService(constructionServiceId, form);
      history.push(constructionServicesRoute);
      return;
    }

    await createConstructionService(form);
    history.push(constructionServicesRoute);
  };

  const onDelete = async () => {
    await deleteConstructionService(constructionServiceId);
    history.push(constructionServicesRoute);
  };

  return (
    <>
      <ConstructionServiceForm
        categories={categories}
        certificationPreviews={form.certificationsImages || []}
        cities={pakistanCities}
        companyTypes={constructionServiceCompanyTypes}
        data={form}
        imagePreviews={form.images || []}
        isAdminView={false}
        onCategoryChange={onCategoryChange}
        onClearUploads={onClearUploads}
        onFileChange={onFileChange}
        onMultiServiceAreaChange={onMultiServiceAreaChange}
        onMultiSubcategoryChange={onMultiSubcategoryChange}
        onOfferChange={onOfferChange}
        onRemovePreview={onRemovePreview}
        onSubmit={onSubmit}
        onTextChange={onTextChange}
        statusActionLabel=""
        subCategories={subCategories}
        submitLabel={editMode ? 'Edit Construction Service Listing' : 'Create Construction Service Listing'}
      />
      {editMode ? <div className="dashboard-form-actions mt-3"><button className="dashboard-danger-btn" onClick={onDelete} type="button">Delete Listing</button></div> : null}
    </>
  );
}

export default ConstructionServiceCreatePage;
