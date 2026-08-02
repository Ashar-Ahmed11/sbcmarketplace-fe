import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import SparePartForm from '../SparePartForm';

function AdminSparePartView() {
  const {
    categories,
    countryOptions,
    getCategories,
    getSparePartById,
    getSubCategories,
    machineryBrands,
    pakistanCities,
    subCategories,
    updateSparePartStatus,
  } = useContext(AppContext);
  const { sparePartId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getCategories('spareParts');
    getSparePartById(sparePartId).then((sparePart) => {
      setData({
        ...sparePart,
        category: sparePart.category?._id || sparePart.category || '',
        subcategory: sparePart.subcategory?._id || sparePart.subcategory || '',
        compatibleBrands: sparePart.compatibleBrands?.length ? sparePart.compatibleBrands : [{ brand: '' }],
      });
      if (sparePart.category?._id || sparePart.category) {
        getSubCategories(sparePart.category?._id || sparePart.category);
      }
    });
  }, [getCategories, getSparePartById, getSubCategories, sparePartId]);

  if (!data) return null;

  return (
    <SparePartForm
      categories={categories}
      cities={pakistanCities}
      countryOptions={countryOptions}
      data={data}
      imagePreviews={data.images || []}
      isAdminView
      machineryBrands={machineryBrands}
      onAddCompatibleBrand={() => {}}
      onAddDeliveryLocation={() => {}}
      onCategoryChange={() => {}}
      onCheckboxChange={() => {}}
      onClearUploads={() => {}}
      onCompatibleBrandChange={() => {}}
      onDeliveryLocationChange={() => {}}
      onFileChange={() => {}}
      onRemoveCompatibleBrand={() => {}}
      onRemoveDeliveryLocation={() => {}}
      onRemovePreview={() => {}}
      onStatusChange={(event) => setData((current) => ({ ...current, approvalStatus: event.target.value }))}
      onSubmit={() => updateSparePartStatus(sparePartId, { approvalStatus: data.approvalStatus, rejectionReason: data.rejectionReason })}
      onTextChange={(event) => setData((current) => ({ ...current, [event.target.name]: event.target.value }))}
      statusActionLabel="Update Listing Status"
      subCategories={subCategories}
      submitLabel="View Spare Part Listing"
    />
  );
}

export default AdminSparePartView;
