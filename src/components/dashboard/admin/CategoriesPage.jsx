import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import CategoryTable from '../CategoryTable';

function CategoriesPage() {
  const { categories, getCategories } = useContext(AppContext);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return <CategoryTable actionLabel="Create Category" actionTo="/admin-dashboard/create-category" basePath="/admin-dashboard" categories={categories} subtitle="Manage marketplace category modules." title="Categories" />;
}

export default CategoriesPage;
