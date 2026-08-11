import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import RepairServiceNegotiationTable from '../RepairServiceNegotiationTable';

function UserRepairServiceNegotiationsPage() {
  const { getUserRepairServiceNegotiations, userRepairServiceNegotiations } = useContext(AppContext);

  useEffect(() => {
    getUserRepairServiceNegotiations();
  }, [getUserRepairServiceNegotiations]);

  return (
    <RepairServiceNegotiationTable
      rows={userRepairServiceNegotiations}
      subtitle="Negotiations where you are either the buyer or seller."
      title="Repair Service Negotiations"
      viewBasePath="/user-dashboard/repair-service-negotiation"
    />
  );
}

export default UserRepairServiceNegotiationsPage;
