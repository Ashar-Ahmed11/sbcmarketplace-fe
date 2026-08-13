import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import ConstructionMaterialInspectionNegotiationTable from '../ConstructionMaterialInspectionNegotiationTable';

function AdminConstructionMaterialInspectionNegotiationsPage() {
  const { allConstructionMaterialInspectionNegotiations, getAllConstructionMaterialInspectionNegotiations } = useContext(AppContext);

  useEffect(() => {
    getAllConstructionMaterialInspectionNegotiations();
  }, [getAllConstructionMaterialInspectionNegotiations]);

  return (
    <ConstructionMaterialInspectionNegotiationTable
      rows={allConstructionMaterialInspectionNegotiations}
      subtitle="All construction material inspection negotiations across the marketplace."
      title="Construction Material Inspection Negotiations"
      viewBasePath="/admin-dashboard/construction-material-inspection-negotiation-detail"
    />
  );
}

export default AdminConstructionMaterialInspectionNegotiationsPage;
