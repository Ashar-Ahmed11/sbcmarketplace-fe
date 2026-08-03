import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import ConstructionServiceForm from '../ConstructionServiceForm';

function AdminConstructionServiceView() {
  const {
    categories,
    constructionServiceCompanyTypes,
    getCategories,
    getConstructionServiceById,
    getSubCategories,
    pakistanCities,
    subCategories,
    updateConstructionServiceStatus,
  } = useContext(AppContext);
  const { constructionServiceId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getCategories('constructionServices');
    getConstructionServiceById(constructionServiceId).then((constructionService) => {
      setData({
        ...constructionService,
        category: constructionService.category?._id || constructionService.category || '',
        subcategory: Array.isArray(constructionService.subcategory) ? constructionService.subcategory.map((item) => item._id || item) : [],
      });
      if (constructionService.category?._id || constructionService.category) {
        getSubCategories(constructionService.category?._id || constructionService.category);
      }
    });
  }, [constructionServiceId, getCategories, getConstructionServiceById, getSubCategories]);

  if (!data) return null;

  return (
    <ConstructionServiceForm
      categories={categories}
      certificationPreviews={data.certificationsImages || []}
      cities={pakistanCities}
      companyTypes={constructionServiceCompanyTypes}
      data={data}
      imagePreviews={data.images || []}
      isAdminView
      onCategoryChange={() => {}}
      onClearUploads={() => {}}
      onFileChange={() => {}}
      onMultiServiceAreaChange={() => {}}
      onMultiSubcategoryChange={() => {}}
      onOfferChange={() => {}}
      onRemovePreview={() => {}}
      onStatusChange={(event) => setData((current) => ({ ...current, approvalStatus: event.target.value }))}
      onSubmit={() => updateConstructionServiceStatus(constructionServiceId, { approvalStatus: data.approvalStatus, rejectionReason: data.rejectionReason })}
      onTextChange={(event) => setData((current) => ({ ...current, [event.target.name]: event.target.value }))}
      statusActionLabel="Update Listing Status"
      subCategories={subCategories}
      submitLabel="View Construction Service Listing"
    />
  );
}

export default AdminConstructionServiceView;
