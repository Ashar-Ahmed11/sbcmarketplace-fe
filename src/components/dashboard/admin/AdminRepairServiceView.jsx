import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import ServiceSpecialistForm from '../ServiceSpecialistForm';

function AdminRepairServiceView() {
  const { categories, getCategories, getRepairServiceById, pakistanCities, repairServiceInitialForm, serviceCategoryTypes, updateRepairServiceStatus } = useContext(AppContext);
  const { repairServiceId } = useParams();
  const [data, setData] = useState(repairServiceInitialForm);

  useEffect(() => {
    getCategories();
    getRepairServiceById(repairServiceId).then((repairService) => {
      setData({
        ...repairService,
        category: Array.isArray(repairService.category) ? repairService.category.map((item) => item._id || item) : [],
      });
    });
  }, [getCategories, getRepairServiceById, repairServiceId, repairServiceInitialForm]);

  return (
    <ServiceSpecialistForm
      areaField="repairAreas"
      areaLabel="Repair Areas"
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
      onSubmit={() => updateRepairServiceStatus(repairServiceId, { approvalStatus: data.approvalStatus, rejectionReason: data.rejectionReason })}
      onTextChange={(event) => setData((current) => ({ ...current, [event.target.name]: event.target.value }))}
      selectedCategoryIds={data.category || []}
      statusActionLabel="Update Listing Status"
      submitLabel="View Repair Service Listing"
    />
  );
}

export default AdminRepairServiceView;
