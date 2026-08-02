import { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AppContext from '../../context/appContext';
import TruckTable from '../TruckTable';

function UserMachineriesPage() {
  const { getUserMachineries, userMachineries } = useContext(AppContext);
  const { url } = useRouteMatch();

  useEffect(() => {
    getUserMachineries();
  }, [getUserMachineries]);

  return (
    <TruckTable
      actionLabel="Create"
      actionTo={`${url.replace('/construction-machinery', '')}/create-machinery`}
      rows={userMachineries}
      subtitle="All construction machinery listings created under your account."
      title="Construction Machinery"
      viewBasePath={`${url.replace('/construction-machinery', '')}/edit-machinery`}
    />
  );
}

export default UserMachineriesPage;
