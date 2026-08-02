import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import CategoryForm from '../CategoryForm';
import ConfirmModal from '../ConfirmModal';

function CategoryEditor({ isEdit = false }) {
  const { createCategory, deleteCategory, getCategoryById, updateCategory } = useContext(AppContext);
  const history = useHistory();
  const { categoryID } = useParams();
  const [category, setCategory] = useState({ name: '', categoryType: 'truck' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isEdit && categoryID) {
      getCategoryById(categoryID).then((data) => setCategory({ name: data.name || '', categoryType: data.categoryType || 'truck' }));
    }
  }, [categoryID, getCategoryById, isEdit]);

  const onSubmit = async () => {
    if (isEdit) {
      await updateCategory(categoryID, category);
      history.push('/admin-dashboard/categories');
    } else {
      await createCategory(category);
      history.push('/admin-dashboard/categories');
    }
  };

  const confirmDelete = async () => {
    await deleteCategory(categoryID);
    history.push('/admin-dashboard/categories');
  };

  return (
    <>
      <CategoryForm
        actionLabel={isEdit ? 'Edit Category' : 'Create Category'}
        category={category}
        onChange={(event) => setCategory((current) => ({ ...current, [event.target.name]: event.target.value }))}
        onDelete={() => setShowModal(true)}
        onSubmit={onSubmit}
        showDelete={isEdit}
      />
      <ConfirmModal body="Are you sure you want to delete this category?" confirmLabel="Delete" onClose={() => setShowModal(false)} onConfirm={confirmDelete} open={showModal} title="Delete Category" />
    </>
  );
}

export default CategoryEditor;
