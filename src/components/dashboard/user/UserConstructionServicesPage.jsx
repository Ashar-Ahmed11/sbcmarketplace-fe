import { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AppContext from '../../context/appContext';
import TruckTable from '../TruckTable';

function UserConstructionServicesPage() {
  const { getUserConstructionServices, userConstructionServices } = useContext(AppContext);
  const { url } = useRouteMatch();

  useEffect(() => {
    getUserConstructionServices();
  }, [getUserConstructionServices]);

  return (
    <TruckTable
      actionLabel="Create"
      actionTo={`${url.replace('/construction-services', '')}/create-construction-service`}
      rows={userConstructionServices}
      subtitle="All construction services listings created under your account."
      title="Construction Services"
      viewBasePath={`${url.replace('/construction-services', '')}/edit-construction-service`}
    />
  );
}

export default UserConstructionServicesPage;
