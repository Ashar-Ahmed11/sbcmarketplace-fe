import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import MachineryInspectionReportTable from '../MachineryInspectionReportTable';

function AdminMachineryInspectionReportsPage() {
  const { allMachineryInspectionReports, getAllMachineryInspectionReports } = useContext(AppContext);

  useEffect(() => {
    getAllMachineryInspectionReports();
  }, [getAllMachineryInspectionReports]);

  return (
    <MachineryInspectionReportTable
      rows={allMachineryInspectionReports}
      subtitle="All machinery inspection reports across the marketplace."
      title="Machinery Inspection Reports"
      viewBasePath="/admin-dashboard/machinery-inspection-report"
    />
  );
}

export default AdminMachineryInspectionReportsPage;
