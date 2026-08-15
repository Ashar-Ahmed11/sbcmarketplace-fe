import { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AppContext from '../../context/appContext';
import FinanceTruckTable from '../FinanceTruckTable';

function UserTruckFinancePage() {
  const { getUserFinanceTrucks, userFinanceTrucks } = useContext(AppContext);
  const { url } = useRouteMatch();

  useEffect(() => {
    getUserFinanceTrucks();
  }, [getUserFinanceTrucks]);

  return (
    <FinanceTruckTable
      actionLabel="Create Truck Finance"
      actionTo={`${url}/create`}
      rows={userFinanceTrucks}
      subtitle="Truck finance listings created by you."
      title="Truck Finance"
      viewBasePath="/user-dashboard/finance/edit-truck-finance"
    />
  );
}

export default UserTruckFinancePage;
