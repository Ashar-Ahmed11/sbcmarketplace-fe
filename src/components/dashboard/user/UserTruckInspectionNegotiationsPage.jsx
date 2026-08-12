import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import TruckInspectionNegotiationTable from '../TruckInspectionNegotiationTable';

function UserTruckInspectionNegotiationsPage() {
  const { getUserTruckInspectionServiceNegotiations, userTruckInspectionServiceNegotiations } = useContext(AppContext);

  useEffect(() => {
    getUserTruckInspectionServiceNegotiations();
  }, [getUserTruckInspectionServiceNegotiations]);

  return (
    <TruckInspectionNegotiationTable
      rows={userTruckInspectionServiceNegotiations}
      subtitle="Inspection negotiations where you are either the buyer or seller."
      title="Truck Inspection Negotiations"
      viewBasePath="/user-dashboard/truck-inspection-negotiation"
    />
  );
}

export default UserTruckInspectionNegotiationsPage;
