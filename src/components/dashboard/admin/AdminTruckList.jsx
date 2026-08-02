import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import TruckTable from '../TruckTable';

function AdminTruckList() {
  const { getAllTrucks, allTrucks } = useContext(AppContext);

  useEffect(() => {
    getAllTrucks();
  }, [getAllTrucks]);

  return <TruckTable rows={allTrucks} subtitle="All truck listings submitted by users." title="All Truck Listings" viewBasePath="/admin-dashboard/view-truck" />;
}

export default AdminTruckList;
