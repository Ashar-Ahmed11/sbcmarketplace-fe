import 'react-datepicker/dist/react-datepicker.css';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import TruckForm from '../TruckForm';

function AdminRentalTruckView() {
  const {
    categories,
    getCategories,
    getRentalTruckById,
    getSubCategories,
    pakistanCities,
    subCategories,
    truckBrands,
    updateRentalTruckStatus,
  } = useContext(AppContext);
  const { rentalTruckId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getCategories('truck');
    getRentalTruckById(rentalTruckId).then((truck) => {
      setData({
        ...truck,
        category: truck.category?._id || truck.category || '',
        subcategory: truck.subcategory?._id || truck.subcategory || '',
      });
      if (truck.category?._id || truck.category) {
        getSubCategories(truck.category?._id || truck.category);
      }
    });
  }, [getCategories, getRentalTruckById, getSubCategories, rentalTruckId]);

  if (!data) return null;

  return (
    <TruckForm
      brands={truckBrands}
      categories={categories}
      cities={pakistanCities}
      data={data}
      documentPreviews={data.documentImages || []}
      imagePreviews={data.images || []}
      isAdminView
      isStatusVisible
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
      onSubmit={() => updateRentalTruckStatus(rentalTruckId, { approvalStatus: data.approvalStatus, rejectionReason: data.rejectionReason })}
      onTextChange={(event) => setData((current) => ({ ...current, [event.target.name]: event.target.value }))}
      showConditionField={false}
      showPriceField={false}
      showQuantityField={false}
      showRentalFields
      statusActionLabel="Update Listing Status"
      subCategories={subCategories}
      submitLabel="View Rental Truck Listing"
    />
  );
}

export default AdminRentalTruckView;
