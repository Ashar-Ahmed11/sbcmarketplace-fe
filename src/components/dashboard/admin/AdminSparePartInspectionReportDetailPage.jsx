import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/appContext';
import { getSparePartInspectionOverallScore } from '../sparePartInspectionReports/sparePartInspectionReportUtils';
import SparePartInspectionReportPreview from '../sparePartInspectionReports/SparePartInspectionReportPreview';

function AdminSparePartInspectionReportDetailPage() {
  const { sparePartInspectionReportId } = useParams();
  const { getSparePartInspectionReportById, updateSparePartInspectionReportStatus } = useContext(AppContext);
  const [row, setRow] = useState(null);

  useEffect(() => {
    getSparePartInspectionReportById(sparePartInspectionReportId).then(setRow);
  }, [getSparePartInspectionReportById, sparePartInspectionReportId]);

  if (!row) return null;

  return (
    <>
      <section className="dashboard-section-card form-card-panel">
        <div className="dashboard-section-head"><div><h1>Spare Part Inspection Report</h1><p>{row.sparePartInspectionNegotiation?.sparePart?.title || 'Inspection report'}</p></div></div>
        <div className="dashboard-form-grid mb-4">
          <div className="form-field"><label>Status</label><select onChange={(event) => setRow((current) => ({ ...current, status: event.target.value }))} value={row.status}><option value="pending approval">Pending Approval</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select></div>
          <div className="form-field"><label>Rejection Reason</label><input onChange={(event) => setRow((current) => ({ ...current, rejectionReason: event.target.value }))} type="text" value={row.rejectionReason || ''} /></div>
        </div>
        <div className="truck-purchase-order__meta mb-4"><span>Inspection Date: {row.inspectionDate ? new Date(row.inspectionDate).toLocaleDateString() : '—'}</span><span>Overall Score: {getSparePartInspectionOverallScore(row)}%</span></div>
        <div className="dashboard-form-actions mt-4"><button className="dashboard-action-btn" onClick={async () => setRow(await updateSparePartInspectionReportStatus(sparePartInspectionReportId, { status: row.status, rejectionReason: row.rejectionReason || '' }))} type="button">Update</button></div>
      </section>
      <SparePartInspectionReportPreview form={row} overallScore={getSparePartInspectionOverallScore(row)} selectedNegotiation={row.sparePartInspectionNegotiation} />
    </>
  );
}

export default AdminSparePartInspectionReportDetailPage;
