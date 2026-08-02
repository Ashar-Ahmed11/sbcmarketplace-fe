import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import ConfirmModal from '../ConfirmModal';
import SubCategoryForm from '../SubCategoryForm';

function SubCategoryEditor({ isEdit = false }) {
  const { createSubCategory, deleteSubCategory, getSubCategoryById, updateSubCategory } = useContext(AppContext);
  const history = useHistory();
  const { categoryID, subcategoryID } = useParams();
  const [name, setName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryID || '');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isEdit && subcategoryID) {
      getSubCategoryById(subcategoryID).then((data) => {
        setName(data.name || '');
        setSelectedCategoryId(data.category?._id || data.category || '');
      });
    }
  }, [getSubCategoryById, isEdit, subcategoryID]);

  const onSubmit = async () => {
    if (isEdit) {
      await updateSubCategory(subcategoryID, { name });
      history.push(`/admin-dashboard/view-subcategories/${selectedCategoryId}`);
    } else {
      await createSubCategory({ name, category: categoryID });
      history.push(`/admin-dashboard/view-subcategories/${categoryID}`);
    }
  };

  const confirmDelete = async () => {
    await deleteSubCategory(subcategoryID);
    history.push('/admin-dashboard/categories');
  };

  return (
    <>
      <SubCategoryForm actionLabel={isEdit ? 'Edit Subcategory' : 'Create Subcategory'} name={name} onChange={(event) => setName(event.target.value)} onDelete={() => setShowModal(true)} onSubmit={onSubmit} showDelete={isEdit} />
      <ConfirmModal body="Are you sure you want to delete this subcategory?" confirmLabel="Delete" onClose={() => setShowModal(false)} onConfirm={confirmDelete} open={showModal} title="Delete Subcategory" />
    </>
  );
}

export default SubCategoryEditor;
