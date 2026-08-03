import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import TruckTable from '../TruckTable';

function AdminConstructionServiceList() {
  const { allConstructionServices, getAllConstructionServices } = useContext(AppContext);

  useEffect(() => {
    getAllConstructionServices();
  }, [getAllConstructionServices]);

  return <TruckTable rows={allConstructionServices} subtitle="All construction services listings submitted by users." title="All Construction Services Listings" viewBasePath="/admin-dashboard/view-construction-service" />;
}

export default AdminConstructionServiceList;
