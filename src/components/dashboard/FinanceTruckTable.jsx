import { Link } from 'react-router-dom';

function FinanceTruckTable({ actionLabel, actionTo, rows, subtitle, title, viewBasePath }) {
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
              <th className="py-3">Categories</th>
              <th className="py-3">Finance Amount</th>
              <th className="py-3">Cities</th>
              <th className="py-3">Date</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((row) => (
              <tr key={row._id}>
                <td className="py-3">{(row.categories || []).map((item) => item?.name || item).join(', ') || '—'}</td>
                <td className="py-3">{row.financeAmount ? `Rs. ${Number(row.financeAmount).toLocaleString()}` : '—'}</td>
                <td className="py-3">{(row.financeCities || []).map((item) => item?.city).filter(Boolean).join(', ') || '—'}</td>
                <td className="py-3">{row.date ? new Date(row.date).toLocaleDateString() : '—'}</td>
                <td className="py-3"><Link className="dashboard-inline-link" to={`${viewBasePath}/${row._id}`}>Edit →</Link></td>
              </tr>
            )) : <tr><td className="text-center py-4" colSpan="5">No truck finance listings found.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default FinanceTruckTable;
