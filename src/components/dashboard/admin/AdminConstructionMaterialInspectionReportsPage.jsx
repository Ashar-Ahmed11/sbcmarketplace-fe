import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import ConstructionMaterialInspectionReportTable from '../ConstructionMaterialInspectionReportTable';

function AdminConstructionMaterialInspectionReportsPage() {
  const { allConstructionMaterialInspectionReports, getAllConstructionMaterialInspectionReports } = useContext(AppContext);

  useEffect(() => {
    getAllConstructionMaterialInspectionReports();
  }, [getAllConstructionMaterialInspectionReports]);

  return (
    <ConstructionMaterialInspectionReportTable
      rows={allConstructionMaterialInspectionReports}
      subtitle="All construction material inspection reports submitted to SBC Marketplace."
      title="Construction Material Inspection Reports"
      viewBasePath="/admin-dashboard/construction-material-inspection-report"
    />
  );
}

export default AdminConstructionMaterialInspectionReportsPage;
