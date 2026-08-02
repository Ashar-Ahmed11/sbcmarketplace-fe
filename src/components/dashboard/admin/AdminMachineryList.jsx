import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import TruckTable from '../TruckTable';

function AdminMachineryList() {
  const { allMachineries, getAllMachineries } = useContext(AppContext);

  useEffect(() => {
    getAllMachineries();
  }, [getAllMachineries]);

  return <TruckTable rows={allMachineries} subtitle="All construction machinery listings submitted by users." title="All Construction Machinery Listings" viewBasePath="/admin-dashboard/view-machinery" />;
}

export default AdminMachineryList;
