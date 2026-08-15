import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import RentalConstructionMachineryNegotiationTable from '../RentalConstructionMachineryNegotiationTable';

function AdminRentalConstructionMachineryNegotiationsPage() {
  const {
    allRentalConstructionMachineryNegotiations,
    getAllRentalConstructionMachineryNegotiations,
  } = useContext(AppContext);

  useEffect(() => {
    getAllRentalConstructionMachineryNegotiations();
  }, [getAllRentalConstructionMachineryNegotiations]);

  return (
    <RentalConstructionMachineryNegotiationTable
      rows={allRentalConstructionMachineryNegotiations}
      subtitle="All rental construction machinery negotiations across the marketplace."
      title="Rental Construction Machinery Negotiations"
      viewBasePath="/admin-dashboard/rental-construction-machinery-negotiation-detail"
    />
  );
}

export default AdminRentalConstructionMachineryNegotiationsPage;
