import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import TruckForm from '../TruckForm';

function AdminTruckView() {
  const { categories, getCategories, getSubCategories, getTruckById, pakistanCities, subCategories, truckBrands, updateTruckStatus } = useContext(AppContext);
  const { truckid } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getCategories('truck');
    getTruckById(truckid).then((truck) => {
      setData({
        ...truck,
        category: truck.category?._id || truck.category || '',
        subcategory: truck.subcategory?._id || truck.subcategory || '',
      });
      if (truck.category?._id || truck.category) {
        getSubCategories(truck.category?._id || truck.category);
      }
    });
  }, [getCategories, getSubCategories, getTruckById, truckid]);

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
      onRemoveDeliveryLocation={() => {}}
      onRemovePreview={() => {}}
      onStatusChange={(event) => setData((current) => ({ ...current, approvalStatus: event.target.value }))}
      onSubmit={() => updateTruckStatus(truckid, { approvalStatus: data.approvalStatus, rejectionReason: data.rejectionReason })}
      onTextChange={(event) => setData((current) => ({ ...current, [event.target.name]: event.target.value }))}
      statusActionLabel="Update Listing Status"
      subCategories={subCategories}
      submitLabel="View Truck Listing"
    />
  );
}

export default AdminTruckView;
