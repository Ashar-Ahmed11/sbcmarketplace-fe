import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import ConstructionServiceNegotiationTable from '../ConstructionServiceNegotiationTable';

function AdminConstructionServiceNegotiationsPage() {
  const { allConstructionServiceNegotiations, getAllConstructionServiceNegotiations } = useContext(AppContext);

  useEffect(() => {
    getAllConstructionServiceNegotiations();
  }, [getAllConstructionServiceNegotiations]);

  return (
    <ConstructionServiceNegotiationTable
      rows={allConstructionServiceNegotiations}
      subtitle="All construction service negotiations across the marketplace."
      title="Construction Service Negotiations"
      viewBasePath="/admin-dashboard/construction-service-negotiation-detail"
    />
  );
}

export default AdminConstructionServiceNegotiationsPage;
