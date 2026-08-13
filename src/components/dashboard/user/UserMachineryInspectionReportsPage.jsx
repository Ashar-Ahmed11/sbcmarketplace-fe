import { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AppContext from '../../context/appContext';
import MachineryInspectionReportTable from '../MachineryInspectionReportTable';

function UserMachineryInspectionReportsPage() {
  const { getUserMachineryInspectionReports, userMachineryInspectionReports } = useContext(AppContext);
  const { url } = useRouteMatch();

  useEffect(() => {
    getUserMachineryInspectionReports();
  }, [getUserMachineryInspectionReports]);

  return (
    <MachineryInspectionReportTable
      actionLabel="Create Report"
      actionTo={`${url}/create`}
      rows={userMachineryInspectionReports}
      subtitle="Machinery inspection reports visible to you as requester or inspector."
      title="Machinery Inspection Reports"
      viewBasePath="/user-dashboard/machinery-inspection-report"
    />
  );
}

export default UserMachineryInspectionReportsPage;
