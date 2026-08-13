import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import SparePartInspectionNegotiationTable from '../SparePartInspectionNegotiationTable';

function UserSparePartInspectionNegotiationsPage() {
  const { getUserSparePartInspectionNegotiations, userSparePartInspectionNegotiations } = useContext(AppContext);

  useEffect(() => {
    getUserSparePartInspectionNegotiations();
  }, [getUserSparePartInspectionNegotiations]);

  return (
    <SparePartInspectionNegotiationTable
      rows={userSparePartInspectionNegotiations}
      subtitle="Spare part inspection negotiations where you are either the buyer or seller."
      title="Spare Part Inspection Negotiations"
      viewBasePath="/user-dashboard/spare-part-inspection-negotiation"
    />
  );
}

export default UserSparePartInspectionNegotiationsPage;
