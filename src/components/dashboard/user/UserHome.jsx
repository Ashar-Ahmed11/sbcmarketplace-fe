import { useContext } from 'react';
import AppContext from '../../context/appContext';
import KpiGrid from '../KpiGrid';

function UserHome() {
  const { dashboardKpis } = useContext(AppContext);

  return <KpiGrid items={dashboardKpis} subtitle="A quick look at your current marketplace activity." title="Dashboard Home" />;
}

export default UserHome;
