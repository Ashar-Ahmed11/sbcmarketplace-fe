import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import ConstructionMaterialNegotiationTable from '../ConstructionMaterialNegotiationTable';

function UserConstructionMaterialNegotiationsPage() {
  const { getUserConstructionMaterialNegotiations, userConstructionMaterialNegotiations } = useContext(AppContext);

  useEffect(() => {
    getUserConstructionMaterialNegotiations();
  }, [getUserConstructionMaterialNegotiations]);

  return (
    <ConstructionMaterialNegotiationTable
      rows={userConstructionMaterialNegotiations}
      subtitle="Negotiations where you are either the buyer or seller."
      title="Construction Material Negotiations"
      viewBasePath="/user-dashboard/material-negotiation"
    />
  );
}

export default UserConstructionMaterialNegotiationsPage;
