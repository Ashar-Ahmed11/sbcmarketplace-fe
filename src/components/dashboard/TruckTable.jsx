import { Link } from 'react-router-dom';

function TruckTable({ rows, viewBasePath, title, subtitle, actionLabel, actionTo }) {
  return (
    <section className="dashboard-section-card">
      <div className="dashboard-section-head">
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {actionLabel && actionTo ? <Link className="dashboard-action-btn" to={actionTo}>{actionLabel}</Link> : null}
      </div>
      <div className="dashboard-table-wrap" style={{border:'1px solid #E4E7EC'}}>
        <table className="table dashboard-table">
          <thead>
            <tr>
              <th className='py-3'>Title</th>
              <th className='py-3'>Category</th>
              <th className='py-3'>Brand</th>
              <th className='py-3'>Price</th>
              <th className='py-3'>Status</th>
              <th className='py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((truck) => (
              <tr key={truck._id}>
                <td className='py-3'>{truck.title || 'Untitled listing'}</td>
                <td className='py-3'>{truck.category?.name || '—'}</td>
                <td className='py-3'>{truck.brand || '—'}</td>
                <td className='py-3'>{truck.price ? `Rs. ${Number(truck.price).toLocaleString()}` : '—'}</td>
                <td className='py-3'><span className={`status-badge ${truck.approvalStatus}`}>{truck.approvalStatus || 'pending'}</span></td>
                <td className='py-3'><Link className="dashboard-inline-link" to={`${viewBasePath}/${truck._id}`}>View →</Link></td>
              </tr>
            )) : (
              <tr><td colSpan="6" className="text-center py-4">No listings found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TruckTable;
