import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import { getSparePartInspectionOverallScore } from '../sparePartInspectionReports/sparePartInspectionReportUtils';
import SparePartInspectionReportPreview from '../sparePartInspectionReports/SparePartInspectionReportPreview';

function UserSparePartInspectionReportDetailPage() {
  const { sparePartInspectionReportId } = useParams();
  const { currentUser, fetchUser, getSparePartInspectionReportById } = useContext(AppContext);
  const [row, setRow] = useState(null);

  useEffect(() => {
    fetchUser();
    getSparePartInspectionReportById(sparePartInspectionReportId).then(setRow);
  }, [fetchUser, getSparePartInspectionReportById, sparePartInspectionReportId]);

  if (!row) return null;
  const canView = String(currentUser?._id) === String(row.inspectionRequester?._id) || String(currentUser?._id) === String(row.inspector?._id);
  if (!canView) return null;

  return (
    <>
      <section className="dashboard-section-card form-card-panel">
        <div className="dashboard-section-head">
          <div><h1>Spare Part Inspection Report</h1><p>{row.sparePartInspectionNegotiation?.sparePart?.title || 'Inspection report'}</p></div>
          <span className={`status-badge ${String(row.status || '').replace(/\s+/g, '-')}`}>{row.status}</span>
        </div>
        <div className="truck-purchase-order__meta mb-4">
          <span>Inspection Date: {row.inspectionDate ? new Date(row.inspectionDate).toLocaleDateString() : '—'}</span>
          <span>Overall Score: {getSparePartInspectionOverallScore(row)}%</span>
        </div>
      </section>
      <SparePartInspectionReportPreview form={row} overallScore={getSparePartInspectionOverallScore(row)} selectedNegotiation={row.sparePartInspectionNegotiation} />
    </>
  );
}

export default UserSparePartInspectionReportDetailPage;
