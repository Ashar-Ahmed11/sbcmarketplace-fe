import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import MachineryNegotiationTable from '../MachineryNegotiationTable';

function UserMachineryNegotiationsPage() {
  const { getUserMachineryNegotiations, userMachineryNegotiations } = useContext(AppContext);

  useEffect(() => {
    getUserMachineryNegotiations();
  }, [getUserMachineryNegotiations]);

  return (
    <MachineryNegotiationTable
      rows={userMachineryNegotiations}
      subtitle="Negotiations where you are either the buyer or seller."
      title="Construction Machinery Negotiations"
      viewBasePath="/user-dashboard/machinery-negotiation"
    />
  );
}

export default UserMachineryNegotiationsPage;
