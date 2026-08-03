import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import ServiceSpecialistForm from '../ServiceSpecialistForm';

function AdminInspectionServiceView() {
  const { categories, getCategories, getInspectionServiceById, inspectionServiceInitialForm, pakistanCities, serviceCategoryTypes, updateInspectionServiceStatus } = useContext(AppContext);
  const { inspectionServiceId } = useParams();
  const [data, setData] = useState(inspectionServiceInitialForm);

  useEffect(() => {
    getCategories();
    getInspectionServiceById(inspectionServiceId).then((inspectionService) => {
      setData({
        ...inspectionService,
        category: Array.isArray(inspectionService.category) ? inspectionService.category.map((item) => item._id || item) : [],
      });
    });
  }, [getCategories, getInspectionServiceById, inspectionServiceId, inspectionServiceInitialForm]);

  return (
    <ServiceSpecialistForm
      areaField="inspectionAreas"
      areaLabel="Inspection Areas"
      categories={categories.filter((item) => serviceCategoryTypes.includes(item.categoryType))}
      categoryLabel="Categories"
      certificationPreviews={data.certificationsImages || []}
      cities={pakistanCities}
      data={data}
      imagePreviews={data.images || []}
      isAdminView
      onCategoryMultiChange={() => {}}
      onClearUploads={() => {}}
      onFileChange={() => {}}
      onOfferChange={() => {}}
      onRemovePreview={() => {}}
      onStatusChange={(event) => setData((current) => ({ ...current, approvalStatus: event.target.value }))}
      onSubmit={() => updateInspectionServiceStatus(inspectionServiceId, { approvalStatus: data.approvalStatus, rejectionReason: data.rejectionReason })}
      onTextChange={(event) => setData((current) => ({ ...current, [event.target.name]: event.target.value }))}
      selectedCategoryIds={data.category || []}
      statusActionLabel="Update Listing Status"
      submitLabel="View Inspection Service Listing"
    />
  );
}

export default AdminInspectionServiceView;
