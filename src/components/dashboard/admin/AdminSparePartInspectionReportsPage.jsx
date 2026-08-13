import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import SparePartInspectionReportTable from '../SparePartInspectionReportTable';

function AdminSparePartInspectionReportsPage() {
  const { allSparePartInspectionReports, getAllSparePartInspectionReports } = useContext(AppContext);

  useEffect(() => {
    getAllSparePartInspectionReports();
  }, [getAllSparePartInspectionReports]);

  return (
    <SparePartInspectionReportTable
      rows={allSparePartInspectionReports}
      subtitle="All spare part inspection reports across the marketplace."
      title="Spare Part Inspection Reports"
      viewBasePath="/admin-dashboard/spare-part-inspection-report"
    />
  );
}

export default AdminSparePartInspectionReportsPage;
