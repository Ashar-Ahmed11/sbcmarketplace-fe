import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/appContext';
import { getAcceptedFinanceTruckOffer } from '../financeTruckNegotiations/financeTruckNegotiationUtils';

function UserTruckInstallmentsPage() {
  const { getUserFinanceTruckInstallmentNegotiations, userFinanceTruckInstallmentNegotiations } = useContext(AppContext);

  useEffect(() => {
    getUserFinanceTruckInstallmentNegotiations();
  }, [getUserFinanceTruckInstallmentNegotiations]);

  const rows = userFinanceTruckInstallmentNegotiations.filter((item) => getAcceptedFinanceTruckOffer(item)?.installments?.length);

  return (
    <section className="dashboard-section-card">
      <div className="dashboard-section-head">
        <div>
          <h1>Truck Installments</h1>
          <p>Accepted truck finance installments where you are either the buyer or seller.</p>
        </div>
      </div>
      <div className="dashboard-table-wrap" style={{ border: '1px solid #E4E7EC' }}>
        <table className="table dashboard-table">
          <thead>
            <tr>
              <th className="py-3">Truck</th>
              <th className="py-3">Buyer</th>
              <th className="py-3">Financer</th>
              <th className="py-3">Installments</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((row) => (
              <tr key={row._id}>
                <td className="py-3">{row.truck?.title || '—'}</td>
                <td className="py-3">{row.buyer?.fullName || row.buyer?.username || '—'}</td>
                <td className="py-3">{row.seller?.fullName || row.seller?.username || '—'}</td>
                <td className="py-3">{getAcceptedFinanceTruckOffer(row)?.installments?.length || 0}</td>
                <td className="py-3"><Link className="dashboard-inline-link" to={`/user-dashboard/truck-installment/${row._id}`}>View →</Link></td>
              </tr>
            )) : <tr><td className="text-center py-4" colSpan="5">No truck installments found.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default UserTruckInstallmentsPage;
