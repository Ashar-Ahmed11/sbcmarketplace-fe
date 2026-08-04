import { Link } from 'react-router-dom';

function RentalMachineryTable({ rows, title, subtitle, actionLabel, actionTo, viewBasePath }) {
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
              <th className="py-3">Title</th>
              <th className="py-3">Category</th>
              <th className="py-3">Brand</th>
              <th className="py-3">Per Hour Rent</th>
              <th className="py-3">Rental Status</th>
              <th className="py-3">Approval</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((machinery) => (
              <tr key={machinery._id}>
                <td className="py-3">{machinery.title || 'Untitled listing'}</td>
                <td className="py-3">{machinery.category?.name || '—'}</td>
                <td className="py-3">{machinery.brand || '—'}</td>
                <td className="py-3">{machinery.perHourRentalCharges ? `Rs. ${Number(machinery.perHourRentalCharges).toLocaleString()}` : '—'}</td>
                <td className="py-3">{machinery.machineStatus || 'available'}</td>
                <td className="py-3"><span className={`status-badge ${machinery.approvalStatus}`}>{machinery.approvalStatus || 'pending'}</span></td>
                <td className="py-3">
                  {viewBasePath ? <Link className="dashboard-inline-link" to={`${viewBasePath}/${machinery._id}`}>View →</Link> : '—'}
                </td>
              </tr>
            )) : (
              <tr><td className="text-center py-4" colSpan="7">No rental construction machinery listings found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RentalMachineryTable;
