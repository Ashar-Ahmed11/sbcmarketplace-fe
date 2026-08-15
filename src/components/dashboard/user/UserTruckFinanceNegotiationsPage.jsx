import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import FinanceTruckNegotiationTable from '../FinanceTruckNegotiationTable';

function UserTruckFinanceNegotiationsPage() {
  const { getUserFinanceTruckNegotiations, userFinanceTruckNegotiations } = useContext(AppContext);

  useEffect(() => {
    getUserFinanceTruckNegotiations();
  }, [getUserFinanceTruckNegotiations]);

  return (
    <FinanceTruckNegotiationTable
      rows={userFinanceTruckNegotiations}
      subtitle="Truck finance negotiations where you are either the buyer or seller."
      title="Truck Finance Negotiations"
      viewBasePath="/user-dashboard/truck-finance-negotiation"
    />
  );
}

export default UserTruckFinanceNegotiationsPage;
