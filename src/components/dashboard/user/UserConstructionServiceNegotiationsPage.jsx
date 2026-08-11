import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import ConstructionServiceNegotiationTable from '../ConstructionServiceNegotiationTable';

function UserConstructionServiceNegotiationsPage() {
  const { getUserConstructionServiceNegotiations, userConstructionServiceNegotiations } = useContext(AppContext);

  useEffect(() => {
    getUserConstructionServiceNegotiations();
  }, [getUserConstructionServiceNegotiations]);

  return (
    <ConstructionServiceNegotiationTable
      rows={userConstructionServiceNegotiations}
      subtitle="Negotiations where you are either the buyer or seller."
      title="Construction Service Negotiations"
      viewBasePath="/user-dashboard/construction-service-negotiation"
    />
  );
}

export default UserConstructionServiceNegotiationsPage;
