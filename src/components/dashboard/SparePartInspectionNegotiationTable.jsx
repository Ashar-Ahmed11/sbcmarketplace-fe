import { Link } from 'react-router-dom';
import { getSparePartInspectionReportStatus } from './sparePartInspectionNegotiations/sparePartInspectionNegotiationUtils';

function getLatestOffer(item) {
  if (!item?.negotiation?.length) return null;
  return item.negotiation[item.negotiation.length - 1];
}

function SparePartInspectionNegotiationTable({ rows, title, subtitle, viewBasePath }) {
  return (
    <section className="dashboard-section-card">
      <div className="dashboard-section-head">
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      <div className="dashboard-table-wrap" style={{ border: '1px solid #E4E7EC' }}>
        <table className="table dashboard-table">
          <thead>
            <tr>
              <th className="py-3">Service</th>
              <th className="py-3">Spare Part</th>
              <th className="py-3">Buyer</th>
              <th className="py-3">Seller</th>
              <th className="py-3">Latest Offer</th>
              <th className="py-3">Report Status</th>
              <th className="py-3">Final Status</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((item) => {
              const latest = getLatestOffer(item);
              return (
                <tr key={item._id}>
                  <td className="py-3">{item.inspectionService?.title || 'Inspection Negotiation'}</td>
                  <td className="py-3">{item.sparePart?.title || '—'}</td>
                  <td className="py-3">{item.buyer?.fullName || item.buyer?.username || '—'}</td>
                  <td className="py-3">{item.seller?.fullName || item.seller?.username || '—'}</td>
                  <td className="py-3">{latest?.labourCharges ? `Rs. ${Number(latest.labourCharges).toLocaleString()}` : '—'}</td>
                  <td className="py-3"><span className={`status-badge ${getSparePartInspectionReportStatus(item).replace(/\s+/g, '-')}`}>{getSparePartInspectionReportStatus(item)}</span></td>
                  <td className="py-3"><span className={`status-badge ${item.finalPaymentStatus}`}>{item.finalPaymentStatus || 'unpaid'}</span></td>
                  <td className="py-3"><Link className="dashboard-inline-link" to={`${viewBasePath}/${item._id}`}>View →</Link></td>
                </tr>
              );
            }) : (
              <tr><td className="text-center py-4" colSpan="8">No spare part inspection negotiations found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default SparePartInspectionNegotiationTable;
