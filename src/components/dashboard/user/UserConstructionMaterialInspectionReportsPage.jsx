import { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AppContext from '../../context/appContext';
import ConstructionMaterialInspectionReportTable from '../ConstructionMaterialInspectionReportTable';

function UserConstructionMaterialInspectionReportsPage() {
  const { getUserConstructionMaterialInspectionReports, userConstructionMaterialInspectionReports } = useContext(AppContext);
  const { url } = useRouteMatch();

  useEffect(() => {
    getUserConstructionMaterialInspectionReports();
  }, [getUserConstructionMaterialInspectionReports]);

  return (
    <ConstructionMaterialInspectionReportTable
      actionLabel="Create Report"
      actionTo={`${url}/create`}
      rows={userConstructionMaterialInspectionReports}
      subtitle="Construction material inspection reports visible to you as requester or inspector."
      title="Construction Material Inspection Reports"
      viewBasePath="/user-dashboard/construction-material-inspection-report"
    />
  );
}

export default UserConstructionMaterialInspectionReportsPage;
