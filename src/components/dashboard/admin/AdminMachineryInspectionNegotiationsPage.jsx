import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import MachineryInspectionNegotiationTable from '../MachineryInspectionNegotiationTable';

function AdminMachineryInspectionNegotiationsPage() {
  const { allMachineryInspectionNegotiations, getAllMachineryInspectionNegotiations } = useContext(AppContext);

  useEffect(() => {
    getAllMachineryInspectionNegotiations();
  }, [getAllMachineryInspectionNegotiations]);

  return (
    <MachineryInspectionNegotiationTable
      rows={allMachineryInspectionNegotiations}
      subtitle="All machinery inspection service negotiations across the marketplace."
      title="Machinery Inspection Negotiations"
      viewBasePath="/admin-dashboard/machinery-inspection-negotiation-detail"
    />
  );
}

export default AdminMachineryInspectionNegotiationsPage;
