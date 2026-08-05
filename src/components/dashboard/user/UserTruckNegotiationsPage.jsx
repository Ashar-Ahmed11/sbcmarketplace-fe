import { useContext, useEffect } from 'react';
import TruckNegotiationTable from '../TruckNegotiationTable';
import AppContext from '../../context/appContext';

function UserTruckNegotiationsPage() {
  const { getUserTruckNegotiations, userTruckNegotiations } = useContext(AppContext);

  useEffect(() => {
    getUserTruckNegotiations();
  }, [getUserTruckNegotiations]);

  return (
    <TruckNegotiationTable
      rows={userTruckNegotiations}
      subtitle="Negotiations where you are either the buyer or seller."
      title="Truck Negotiations"
      viewBasePath="/user-dashboard/truck-negotiation"
    />
  );
}

export default UserTruckNegotiationsPage;
