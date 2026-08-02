import { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AppContext from '../../context/appContext';
import TruckTable from '../TruckTable';

function UserSparePartsPage() {
  const { getUserSpareParts, userSpareParts } = useContext(AppContext);
  const { url } = useRouteMatch();

  useEffect(() => {
    getUserSpareParts();
  }, [getUserSpareParts]);

  return (
    <TruckTable
      actionLabel="Create"
      actionTo={`${url.replace('/spare-parts', '')}/create-spare-part`}
      rows={userSpareParts}
      subtitle="All spare parts listings created under your account."
      title="Spare Parts"
      viewBasePath={`${url.replace('/spare-parts', '')}/edit-spare-part`}
    />
  );
}

export default UserSparePartsPage;
