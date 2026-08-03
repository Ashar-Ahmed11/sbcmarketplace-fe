import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import TruckTable from '../TruckTable';

function AdminRepairServiceList() {
  const { allRepairServices, getAllRepairServices } = useContext(AppContext);

  useEffect(() => {
    getAllRepairServices();
  }, [getAllRepairServices]);

  return <TruckTable rows={allRepairServices} subtitle="All repair services listings submitted by users." title="All Repair Services Listings" viewBasePath="/admin-dashboard/view-repair-service" />;
}

export default AdminRepairServiceList;
