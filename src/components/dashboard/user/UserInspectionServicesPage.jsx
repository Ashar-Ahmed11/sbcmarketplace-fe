import { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AppContext from '../../context/appContext';
import TruckTable from '../TruckTable';

function UserInspectionServicesPage() {
  const { getUserInspectionServices, userInspectionServices } = useContext(AppContext);
  const { url } = useRouteMatch();

  useEffect(() => {
    getUserInspectionServices();
  }, [getUserInspectionServices]);

  return (
    <TruckTable
      actionLabel="Create"
      actionTo={`${url.replace('/inspection-services', '')}/create-inspection-service`}
      rows={userInspectionServices}
      subtitle="All inspection services listings created under your account."
      title="Inspection Services"
      viewBasePath={`${url.replace('/inspection-services', '')}/edit-inspection-service`}
    />
  );
}

export default UserInspectionServicesPage;
