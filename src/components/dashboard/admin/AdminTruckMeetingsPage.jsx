import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import TruckMeetingTable from '../TruckMeetingTable';

function AdminTruckMeetingsPage() {
  const { allTruckMeetings, getAllTruckMeetings } = useContext(AppContext);

  useEffect(() => {
    getAllTruckMeetings();
  }, [getAllTruckMeetings]);

  return (
    <TruckMeetingTable
      rows={allTruckMeetings}
      subtitle="All truck meetings across the marketplace."
      title="Truck Meetings"
      viewBasePath="/admin-dashboard/truck-meeting-detail"
    />
  );
}

export default AdminTruckMeetingsPage;
