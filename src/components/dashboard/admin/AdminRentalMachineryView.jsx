import 'react-datepicker/dist/react-datepicker.css';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import MachineryForm from '../MachineryForm';

function AdminRentalMachineryView() {
  const {
    categories,
    countryOptions,
    getCategories,
    getRentalMachineryById,
    getSubCategories,
    machineryBrands,
    pakistanCities,
    subCategories,
    updateRentalMachineryStatus,
  } = useContext(AppContext);
  const { rentalMachineryId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getCategories('machinery');
    getRentalMachineryById(rentalMachineryId).then((machinery) => {
      setData({
        ...machinery,
        category: machinery.category?._id || machinery.category || '',
        subcategory: machinery.subcategory?._id || machinery.subcategory || '',
      });
      if (machinery.category?._id || machinery.category) {
        getSubCategories(machinery.category?._id || machinery.category);
      }
    });
  }, [getCategories, getRentalMachineryById, getSubCategories, rentalMachineryId]);

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
      machineryStatuses={[]}
      onAddDeliveryLocation={() => {}}
      onCategoryChange={() => {}}
      onCheckboxChange={() => {}}
      onClearUploads={() => {}}
      onDeliveryLocationChange={() => {}}
      onFeatureChange={() => {}}
      onFileChange={() => {}}
      onNestedChange={() => {}}
      onRentalDurationChange={() => {}}
      onRemoveDeliveryLocation={() => {}}
      onRemovePreview={() => {}}
      onStatusChange={(event) => setData((current) => ({ ...current, approvalStatus: event.target.value }))}
      onSubmit={() => updateRentalMachineryStatus(rentalMachineryId, { approvalStatus: data.approvalStatus, rejectionReason: data.rejectionReason })}
      onTextChange={(event) => setData((current) => ({ ...current, [event.target.name]: event.target.value }))}
      showPriceField={false}
      showRentalFields
      statusActionLabel="Update Listing Status"
      subCategories={subCategories}
      submitLabel="View Rental Construction Machinery Listing"
      useRentalStatuses
    />
  );
}

export default AdminRentalMachineryView;
