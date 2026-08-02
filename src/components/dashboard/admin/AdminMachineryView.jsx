import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import MachineryForm from '../MachineryForm';

function AdminMachineryView() {
  const {
    categories,
    countryOptions,
    getCategories,
    getMachineryById,
    getSubCategories,
    machineryBrands,
    machineryStatuses,
    pakistanCities,
    subCategories,
    updateMachineryStatus,
  } = useContext(AppContext);
  const { machineryId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getCategories('machinery');
    getMachineryById(machineryId).then((machinery) => {
      setData({
        ...machinery,
        category: machinery.category?._id || machinery.category || '',
        subcategory: machinery.subcategory?._id || machinery.subcategory || '',
      });
      if (machinery.category?._id || machinery.category) {
        getSubCategories(machinery.category?._id || machinery.category);
      }
    });
  }, [getCategories, getMachineryById, getSubCategories, machineryId]);

  if (!data) return null;

  return (
    <MachineryForm
      categories={categories}
      cities={pakistanCities}
      countryOptions={countryOptions}
      data={data}
      documentPreviews={data.documentImages || []}
      imagePreviews={data.images || []}
      isAdminView
      machineryBrands={machineryBrands}
      machineryStatuses={machineryStatuses}
      onAddDeliveryLocation={() => {}}
      onCategoryChange={() => {}}
      onCheckboxChange={() => {}}
      onClearUploads={() => {}}
      onDeliveryLocationChange={() => {}}
      onFeatureChange={() => {}}
      onFileChange={() => {}}
      onNestedChange={() => {}}
      onRemoveDeliveryLocation={() => {}}
      onRemovePreview={() => {}}
      onStatusChange={(event) => setData((current) => ({ ...current, approvalStatus: event.target.value }))}
      onSubmit={() => updateMachineryStatus(machineryId, { approvalStatus: data.approvalStatus, rejectionReason: data.rejectionReason })}
      onTextChange={(event) => setData((current) => ({ ...current, [event.target.name]: event.target.value }))}
      statusActionLabel="Update Listing Status"
      subCategories={subCategories}
      submitLabel="View Construction Machinery Listing"
    />
  );
}

export default AdminMachineryView;
