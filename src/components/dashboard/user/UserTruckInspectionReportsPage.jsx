import { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AppContext from '../../context/appContext';
import TruckInspectionReportTable from '../TruckInspectionReportTable';

function UserTruckInspectionReportsPage() {
  const { getUserTruckInspectionReports, userTruckInspectionReports } = useContext(AppContext);
  const { url } = useRouteMatch();

  useEffect(() => {
    getUserTruckInspectionReports();
  }, [getUserTruckInspectionReports]);

  return (
    <TruckInspectionReportTable
      actionLabel="Create Report"
      actionTo={`${url}/create`}
      rows={userTruckInspectionReports}
      subtitle="Truck inspection reports where you are the requester or inspector."
      title="Truck Inspection Reports"
      viewBasePath="/user-dashboard/truck-inspection-report"
    />
  );
}

export default UserTruckInspectionReportsPage;
