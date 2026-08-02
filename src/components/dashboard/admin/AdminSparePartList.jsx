import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import TruckTable from '../TruckTable';

function AdminSparePartList() {
  const { allSpareParts, getAllSpareParts } = useContext(AppContext);

  useEffect(() => {
    getAllSpareParts();
  }, [getAllSpareParts]);

  return <TruckTable rows={allSpareParts} subtitle="All spare parts listings submitted by users." title="All Spare Parts Listings" viewBasePath="/admin-dashboard/view-spare-part" />;
}

export default AdminSparePartList;
