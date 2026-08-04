import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import AppContext from '../../context/appContext';
import RentalMachineryTable from '../RentalMachineryTable';

function UserRentalMachineriesPage() {
  const { getUserRentalMachineries, userRentalMachineries } = useContext(AppContext);
  const { url } = useRouteMatch();
  const location = useLocation();
  const baseRoute = location.pathname.includes('/my-listings') ? '/user-dashboard/my-listings' : '/user-dashboard';

  useEffect(() => {
    getUserRentalMachineries();
  }, [getUserRentalMachineries]);

  return (
    <RentalMachineryTable
      actionLabel="Create"
      actionTo={`${baseRoute}/create-rental-machinery`}
      rows={userRentalMachineries}
      subtitle="All rental construction machinery listings created under your account."
      title="Rental Construction Machinery"
      viewBasePath={`${baseRoute}/edit-rental-machinery`}
    />
  );
}

export default UserRentalMachineriesPage;
