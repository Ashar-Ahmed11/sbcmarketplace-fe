import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import MachineryInspectionNegotiationTable from '../MachineryInspectionNegotiationTable';

function UserMachineryInspectionNegotiationsPage() {
  const { getUserMachineryInspectionNegotiations, userMachineryInspectionNegotiations } = useContext(AppContext);

  useEffect(() => {
    getUserMachineryInspectionNegotiations();
  }, [getUserMachineryInspectionNegotiations]);

  return (
    <MachineryInspectionNegotiationTable
      rows={userMachineryInspectionNegotiations}
      subtitle="Machinery inspection negotiations where you are either the buyer or seller."
      title="Machinery Inspection Negotiations"
      viewBasePath="/user-dashboard/machinery-inspection-negotiation"
    />
  );
}

export default UserMachineryInspectionNegotiationsPage;
