import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import RentalTruckNegotiationTable from '../RentalTruckNegotiationTable';

function AdminRentalTruckNegotiationsPage() {
  const { allRentalTruckNegotiations, getAllRentalTruckNegotiations } = useContext(AppContext);

  useEffect(() => {
    getAllRentalTruckNegotiations();
  }, [getAllRentalTruckNegotiations]);

  return (
    <RentalTruckNegotiationTable
      rows={allRentalTruckNegotiations}
      subtitle="All rental truck negotiations across the marketplace."
      title="Rental Truck Negotiations"
      viewBasePath="/admin-dashboard/rental-truck-negotiation-detail"
    />
  );
}

export default AdminRentalTruckNegotiationsPage;
