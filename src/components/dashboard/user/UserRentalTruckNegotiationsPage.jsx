import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import RentalTruckNegotiationTable from '../RentalTruckNegotiationTable';

function UserRentalTruckNegotiationsPage() {
  const { getUserRentalTruckNegotiations, userRentalTruckNegotiations } = useContext(AppContext);

  useEffect(() => {
    getUserRentalTruckNegotiations();
  }, [getUserRentalTruckNegotiations]);

  return (
    <RentalTruckNegotiationTable
      rows={userRentalTruckNegotiations}
      subtitle="Negotiations where you are either the buyer or seller."
      title="Rental Truck Negotiations"
      viewBasePath="/user-dashboard/rental-truck-negotiation"
    />
  );
}

export default UserRentalTruckNegotiationsPage;
