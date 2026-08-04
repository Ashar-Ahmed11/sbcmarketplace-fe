import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import RentalMachineryTable from '../RentalMachineryTable';

function AdminRentalMachineryList() {
  const { allRentalMachineries, getAllRentalMachineries } = useContext(AppContext);

  useEffect(() => {
    getAllRentalMachineries();
  }, [getAllRentalMachineries]);

  return (
    <RentalMachineryTable
      rows={allRentalMachineries}
      subtitle="All rental construction machinery listings submitted by users."
      title="All Rental Construction Machinery Listings"
      viewBasePath="/admin-dashboard/view-rental-machinery"
    />
  );
}

export default AdminRentalMachineryList;
