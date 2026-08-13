import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import SparePartInspectionNegotiationTable from '../SparePartInspectionNegotiationTable';

function AdminSparePartInspectionNegotiationsPage() {
  const { allSparePartInspectionNegotiations, getAllSparePartInspectionNegotiations } = useContext(AppContext);

  useEffect(() => {
    getAllSparePartInspectionNegotiations();
  }, [getAllSparePartInspectionNegotiations]);

  return (
    <SparePartInspectionNegotiationTable
      rows={allSparePartInspectionNegotiations}
      subtitle="All spare part inspection service negotiations across the marketplace."
      title="Spare Part Inspection Negotiations"
      viewBasePath="/admin-dashboard/spare-part-inspection-negotiation-detail"
    />
  );
}

export default AdminSparePartInspectionNegotiationsPage;
