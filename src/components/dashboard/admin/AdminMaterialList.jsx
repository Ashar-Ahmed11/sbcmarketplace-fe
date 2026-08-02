import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import TruckTable from '../TruckTable';

function AdminMaterialList() {
  const { allMaterials, getAllMaterials } = useContext(AppContext);

  useEffect(() => {
    getAllMaterials();
  }, [getAllMaterials]);

  return <TruckTable rows={allMaterials} subtitle="All construction material listings submitted by users." title="All Construction Material Listings" viewBasePath="/admin-dashboard/view-material" />;
}

export default AdminMaterialList;
