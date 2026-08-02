import { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AppContext from '../../context/appContext';
import TruckTable from '../TruckTable';

function UserMaterialsPage() {
  const { getUserMaterials, userMaterials } = useContext(AppContext);
  const { url } = useRouteMatch();

  useEffect(() => {
    getUserMaterials();
  }, [getUserMaterials]);

  return (
    <TruckTable
      actionLabel="Create"
      actionTo={`${url.replace('/construction-material', '')}/create-material`}
      rows={userMaterials}
      subtitle="All construction material listings created under your account."
      title="Construction Material"
      viewBasePath={`${url.replace('/construction-material', '')}/edit-material`}
    />
  );
}

export default UserMaterialsPage;
