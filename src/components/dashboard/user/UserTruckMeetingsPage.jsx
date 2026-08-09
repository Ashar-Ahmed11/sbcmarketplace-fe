import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import TruckMeetingTable from '../TruckMeetingTable';

function UserTruckMeetingsPage() {
  const { getUserTruckMeetings, userTruckMeetings } = useContext(AppContext);

  useEffect(() => {
    getUserTruckMeetings();
  }, [getUserTruckMeetings]);

  return (
    <TruckMeetingTable
      rows={userTruckMeetings}
      subtitle="Meetings where you are either the buyer or seller."
      title="Truck Meetings"
      viewBasePath="/user-dashboard/truck-meeting"
    />
  );
}

export default UserTruckMeetingsPage;
