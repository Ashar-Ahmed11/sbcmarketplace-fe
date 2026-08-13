import { Link } from 'react-router-dom';
import { getSparePartInspectionOverallScore } from './sparePartInspectionReports/sparePartInspectionReportUtils';

function SparePartInspectionReportTable({ actionLabel, actionTo, rows, subtitle, title, viewBasePath }) {
  return (
    <section className="dashboard-section-card">
      <div className="dashboard-section-head">
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {actionLabel && actionTo ? <Link className="dashboard-action-btn" to={actionTo}>{actionLabel}</Link> : null}
      </div>
      <div className="dashboard-table-wrap" style={{ border: '1px solid #E4E7EC' }}>
        <table className="table dashboard-table">
          <thead>
            <tr>
              <th className="py-3">Spare Part</th>
              <th className="py-3">Requester</th>
              <th className="py-3">Inspector</th>
              <th className="py-3">Inspection Date</th>
              <th className="py-3">Overall Score</th>
              <th className="py-3">Status</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((item) => (
              <tr key={item._id}>
                <td className="py-3">{item.sparePartInspectionNegotiation?.sparePart?.title || 'Spare Part Inspection Report'}</td>
                <td className="py-3">{item.inspectionRequester?.fullName || item.inspectionRequester?.username || '—'}</td>
                <td className="py-3">{item.inspector?.fullName || item.inspector?.username || '—'}</td>
                <td className="py-3">{item.inspectionDate ? new Date(item.inspectionDate).toLocaleDateString() : '—'}</td>
                <td className="py-3">{getSparePartInspectionOverallScore(item)}%</td>
                <td className="py-3"><span className={`status-badge ${String(item.status || '').replace(/\s+/g, '-')}`}>{item.status || 'pending approval'}</span></td>
                <td className="py-3"><Link className="dashboard-inline-link" to={`${viewBasePath}/${item._id}`}>View →</Link></td>
              </tr>
            )) : (
              <tr><td className="text-center py-4" colSpan="7">No spare part inspection reports found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default SparePartInspectionReportTable;
