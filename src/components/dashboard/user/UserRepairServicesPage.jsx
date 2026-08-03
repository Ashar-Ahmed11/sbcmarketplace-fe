import { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AppContext from '../../context/appContext';
import TruckTable from '../TruckTable';

function UserRepairServicesPage() {
  const { getUserRepairServices, userRepairServices } = useContext(AppContext);
  const { url } = useRouteMatch();

  useEffect(() => {
    getUserRepairServices();
  }, [getUserRepairServices]);

  return (
    <TruckTable
      actionLabel="Create"
      actionTo={`${url.replace('/repair-services', '')}/create-repair-service`}
      rows={userRepairServices}
      subtitle="All repair services listings created under your account."
      title="Repair Services"
      viewBasePath={`${url.replace('/repair-services', '')}/edit-repair-service`}
    />
  );
}

export default UserRepairServicesPage;
