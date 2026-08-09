import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import SparePartNegotiationTable from '../SparePartNegotiationTable';

function AdminSparePartNegotiationsPage() {
  const { allSparePartNegotiations, getAllSparePartNegotiations } = useContext(AppContext);

  useEffect(() => {
    getAllSparePartNegotiations();
  }, [getAllSparePartNegotiations]);

  return (
    <SparePartNegotiationTable
      rows={allSparePartNegotiations}
      subtitle="All spare part negotiations across the marketplace."
      title="Spare Part Negotiations"
      viewBasePath="/admin-dashboard/spare-part-negotiation-detail"
    />
  );
}

export default AdminSparePartNegotiationsPage;
