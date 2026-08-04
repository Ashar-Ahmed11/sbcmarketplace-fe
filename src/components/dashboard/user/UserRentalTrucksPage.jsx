import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../../context/appContext';
import RentalTruckTable from '../RentalTruckTable';

function UserRentalTrucksPage() {
  const { getUserRentalTrucks, userRentalTrucks } = useContext(AppContext);
  const location = useLocation();
  const baseRoute = location.pathname.includes('/my-listings') ? '/user-dashboard/my-listings' : '/user-dashboard';

  useEffect(() => {
    getUserRentalTrucks();
  }, [getUserRentalTrucks]);

  return (
    <RentalTruckTable
      actionLabel="Create"
      actionTo={`${baseRoute}/create-rental-truck`}
      rows={userRentalTrucks}
      subtitle="All rental truck listings created under your account."
      title="Rental Trucks"
      viewBasePath={`${baseRoute}/edit-rental-truck`}
    />
  );
}

export default UserRentalTrucksPage;
