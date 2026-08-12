import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import TruckInspectionReportTable from '../TruckInspectionReportTable';

function AdminTruckInspectionReportsPage() {
  const { allTruckInspectionReports, getAllTruckInspectionReports } = useContext(AppContext);

  useEffect(() => {
    getAllTruckInspectionReports();
  }, [getAllTruckInspectionReports]);

  return (
    <TruckInspectionReportTable
      rows={allTruckInspectionReports}
      subtitle="All truck inspection reports across the marketplace."
      title="Truck Inspection Reports"
      viewBasePath="/admin-dashboard/truck-inspection-report"
    />
  );
}

export default AdminTruckInspectionReportsPage;
