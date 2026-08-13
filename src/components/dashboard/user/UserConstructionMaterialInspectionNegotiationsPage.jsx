import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import ConstructionMaterialInspectionNegotiationTable from '../ConstructionMaterialInspectionNegotiationTable';

function UserConstructionMaterialInspectionNegotiationsPage() {
  const { getUserConstructionMaterialInspectionNegotiations, userConstructionMaterialInspectionNegotiations } = useContext(AppContext);

  useEffect(() => {
    getUserConstructionMaterialInspectionNegotiations();
  }, [getUserConstructionMaterialInspectionNegotiations]);

  return (
    <ConstructionMaterialInspectionNegotiationTable
      rows={userConstructionMaterialInspectionNegotiations}
      subtitle="Construction material inspection negotiations where you are either the buyer or seller."
      title="Construction Material Inspection Negotiations"
      viewBasePath="/user-dashboard/construction-material-inspection-negotiation"
    />
  );
}

export default UserConstructionMaterialInspectionNegotiationsPage;
