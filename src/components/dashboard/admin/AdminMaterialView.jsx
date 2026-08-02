import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import MaterialForm from '../MaterialForm';

function AdminMaterialView() {
  const { categories, getCategories, getMaterialById, getSubCategories, materialGrades, materialSellerTypes, materialUnits, pakistanCities, subCategories, updateMaterialStatus } = useContext(AppContext);
  const { materialId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getCategories('material');
    getMaterialById(materialId).then((material) => {
      setData({
        ...material,
        category: material.category?._id || material.category || '',
        subcategory: material.subcategory?._id || material.subcategory || '',
      });
      if (material.category?._id || material.category) {
        getSubCategories(material.category?._id || material.category);
      }
    });
  }, [getCategories, getMaterialById, getSubCategories, materialId]);

  if (!data) return null;

  return (
    <MaterialForm
      categories={categories}
      cities={pakistanCities}
      data={data}
      imagePreviews={data.images || []}
      isAdminView
      materialGrades={materialGrades}
      materialSellerTypes={materialSellerTypes}
      materialUnits={materialUnits}
      onAddDeliveryLocation={() => {}}
      onCategoryChange={() => {}}
      onCheckboxChange={() => {}}
      onClearUploads={() => {}}
      onDeliveryLocationChange={() => {}}
      onFileChange={() => {}}
      onRemoveDeliveryLocation={() => {}}
      onRemovePreview={() => {}}
      onStatusChange={(event) => setData((current) => ({ ...current, approvalStatus: event.target.value }))}
      onSubmit={() => updateMaterialStatus(materialId, { approvalStatus: data.approvalStatus, rejectionReason: data.rejectionReason })}
      onTextChange={(event) => setData((current) => ({ ...current, [event.target.name]: event.target.value }))}
      statusActionLabel="Update Listing Status"
      subCategories={subCategories}
      submitLabel="View Construction Material Listing"
    />
  );
}

export default AdminMaterialView;
