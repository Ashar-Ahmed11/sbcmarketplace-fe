import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import SubCategoryTable from '../SubCategoryTable';

function SubCategoriesPage() {
  const { getSubCategories, subCategories } = useContext(AppContext);
  const { categoryID } = useParams();

  useEffect(() => {
    getSubCategories(categoryID);
  }, [categoryID, getSubCategories]);

  return <SubCategoryTable createTo={`/admin-dashboard/create-subcategory/${categoryID}`} editBasePath="/admin-dashboard/edit-subcategory" items={subCategories} subtitle="Manage subcategories under the selected category." title="Subcategories" />;
}

export default SubCategoriesPage;
