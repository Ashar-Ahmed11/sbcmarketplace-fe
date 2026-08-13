import { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AppContext from '../../context/appContext';
import SparePartInspectionReportTable from '../SparePartInspectionReportTable';

function UserSparePartInspectionReportsPage() {
  const { getUserSparePartInspectionReports, userSparePartInspectionReports } = useContext(AppContext);
  const { url } = useRouteMatch();

  useEffect(() => {
    getUserSparePartInspectionReports();
  }, [getUserSparePartInspectionReports]);

  return (
    <SparePartInspectionReportTable
      actionLabel="Create Report"
      actionTo={`${url}/create`}
      rows={userSparePartInspectionReports}
      subtitle="Spare part inspection reports visible to you as requester or inspector."
      title="Spare Part Inspection Reports"
      viewBasePath="/user-dashboard/spare-part-inspection-report"
    />
  );
}

export default UserSparePartInspectionReportsPage;
