import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import ConstructionMaterialNegotiationTable from '../ConstructionMaterialNegotiationTable';

function AdminConstructionMaterialNegotiationsPage() {
  const { allConstructionMaterialNegotiations, getAllConstructionMaterialNegotiations } = useContext(AppContext);

  useEffect(() => {
    getAllConstructionMaterialNegotiations();
  }, [getAllConstructionMaterialNegotiations]);

  return (
    <ConstructionMaterialNegotiationTable
      rows={allConstructionMaterialNegotiations}
      subtitle="All construction material negotiations across the marketplace."
      title="Construction Material Negotiations"
      viewBasePath="/admin-dashboard/material-negotiation-detail"
    />
  );
}

export default AdminConstructionMaterialNegotiationsPage;
