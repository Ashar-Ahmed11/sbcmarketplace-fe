import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import RepairServiceNegotiationTable from '../RepairServiceNegotiationTable';

function AdminRepairServiceNegotiationsPage() {
  const { allRepairServiceNegotiations, getAllRepairServiceNegotiations } = useContext(AppContext);

  useEffect(() => {
    getAllRepairServiceNegotiations();
  }, [getAllRepairServiceNegotiations]);

  return (
    <RepairServiceNegotiationTable
      rows={allRepairServiceNegotiations}
      subtitle="All repair service negotiations across the marketplace."
      title="Repair Service Negotiations"
      viewBasePath="/admin-dashboard/repair-service-negotiation-detail"
    />
  );
}

export default AdminRepairServiceNegotiationsPage;
