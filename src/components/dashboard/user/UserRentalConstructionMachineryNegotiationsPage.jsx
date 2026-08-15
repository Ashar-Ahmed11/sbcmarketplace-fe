import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import RentalConstructionMachineryNegotiationTable from '../RentalConstructionMachineryNegotiationTable';

function UserRentalConstructionMachineryNegotiationsPage() {
  const {
    getUserRentalConstructionMachineryNegotiations,
    userRentalConstructionMachineryNegotiations,
  } = useContext(AppContext);

  useEffect(() => {
    getUserRentalConstructionMachineryNegotiations();
  }, [getUserRentalConstructionMachineryNegotiations]);

  return (
    <RentalConstructionMachineryNegotiationTable
      rows={userRentalConstructionMachineryNegotiations}
      subtitle="Negotiations where you are either the buyer or seller."
      title="Rental Construction Machinery Negotiations"
      viewBasePath="/user-dashboard/rental-construction-machinery-negotiation"
    />
  );
}

export default UserRentalConstructionMachineryNegotiationsPage;
