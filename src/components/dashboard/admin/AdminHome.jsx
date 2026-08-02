import { useContext } from 'react';
import AppContext from '../../context/appContext';
import KpiGrid from '../KpiGrid';

function AdminHome() {
  const { dashboardKpis } = useContext(AppContext);

  return <KpiGrid items={dashboardKpis.map((item) => ({ ...item, value: Number(item.value) + 4 }))} subtitle="Operational overview for admin users." title="Admin Home" />;
}

export default AdminHome;
