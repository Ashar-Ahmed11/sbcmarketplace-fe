import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import SparePartNegotiationTable from '../SparePartNegotiationTable';

function UserSparePartNegotiationsPage() {
  const { getUserSparePartNegotiations, userSparePartNegotiations } = useContext(AppContext);

  useEffect(() => {
    getUserSparePartNegotiations();
  }, [getUserSparePartNegotiations]);

  return (
    <SparePartNegotiationTable
      rows={userSparePartNegotiations}
      subtitle="Negotiations where you are either the buyer or seller."
      title="Spare Part Negotiations"
      viewBasePath="/user-dashboard/spare-part-negotiation"
    />
  );
}

export default UserSparePartNegotiationsPage;
