import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import TruckTable from '../TruckTable';

function AdminInspectionServiceList() {
  const { allInspectionServices, getAllInspectionServices } = useContext(AppContext);

  useEffect(() => {
    getAllInspectionServices();
  }, [getAllInspectionServices]);

  return <TruckTable rows={allInspectionServices} subtitle="All inspection services listings submitted by users." title="All Inspection Services Listings" viewBasePath="/admin-dashboard/view-inspection-service" />;
}

export default AdminInspectionServiceList;
