import { useContext, useEffect } from 'react';
import TruckNegotiationTable from '../TruckNegotiationTable';
import AppContext from '../../context/appContext';

function AdminTruckNegotiationsPage() {
  const { allTruckNegotiations, getAllTruckNegotiations } = useContext(AppContext);

  useEffect(() => {
    getAllTruckNegotiations();
  }, [getAllTruckNegotiations]);

  return (
    <TruckNegotiationTable
      rows={allTruckNegotiations}
      subtitle="All truck negotiations across the marketplace."
      title="Truck Negotiations"
      viewBasePath="/admin-dashboard/negotiation-detail"
    />
  );
}

export default AdminTruckNegotiationsPage;
