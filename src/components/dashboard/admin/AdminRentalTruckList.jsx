import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import RentalTruckTable from '../RentalTruckTable';

function AdminRentalTruckList() {
  const { allRentalTrucks, getAllRentalTrucks } = useContext(AppContext);

  useEffect(() => {
    getAllRentalTrucks();
  }, [getAllRentalTrucks]);

  return (
    <RentalTruckTable
      rows={allRentalTrucks}
      subtitle="All rental truck listings submitted by users."
      title="All Rental Truck Listings"
      viewBasePath="/admin-dashboard/view-rental-truck"
    />
  );
}

export default AdminRentalTruckList;
