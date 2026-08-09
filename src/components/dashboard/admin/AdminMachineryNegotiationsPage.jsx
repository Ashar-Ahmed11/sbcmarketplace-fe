import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import MachineryNegotiationTable from '../MachineryNegotiationTable';

function AdminMachineryNegotiationsPage() {
  const { allMachineryNegotiations, getAllMachineryNegotiations } = useContext(AppContext);

  useEffect(() => {
    getAllMachineryNegotiations();
  }, [getAllMachineryNegotiations]);

  return (
    <MachineryNegotiationTable
      rows={allMachineryNegotiations}
      subtitle="All construction machinery negotiations across the marketplace."
      title="Construction Machinery Negotiations"
      viewBasePath="/admin-dashboard/machinery-negotiation-detail"
    />
  );
}

export default AdminMachineryNegotiationsPage;
