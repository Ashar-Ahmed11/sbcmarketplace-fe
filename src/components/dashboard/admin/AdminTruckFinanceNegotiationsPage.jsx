import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import FinanceTruckNegotiationTable from '../FinanceTruckNegotiationTable';

function AdminTruckFinanceNegotiationsPage() {
  const { allFinanceTruckNegotiations, getAllFinanceTruckNegotiations } = useContext(AppContext);

  useEffect(() => {
    getAllFinanceTruckNegotiations();
  }, [getAllFinanceTruckNegotiations]);

  return (
    <FinanceTruckNegotiationTable
      rows={allFinanceTruckNegotiations}
      subtitle="All truck finance negotiations across the marketplace."
      title="Truck Finance Negotiations"
      viewBasePath="/admin-dashboard/finance-truck-negotiation-detail"
    />
  );
}

export default AdminTruckFinanceNegotiationsPage;
