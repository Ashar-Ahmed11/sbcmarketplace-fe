import { useContext, useEffect } from 'react';
import AppContext from '../../context/appContext';
import TruckInspectionNegotiationTable from '../TruckInspectionNegotiationTable';

function AdminTruckInspectionNegotiationsPage() {
  const { allTruckInspectionServiceNegotiations, getAllTruckInspectionServiceNegotiations } = useContext(AppContext);

  useEffect(() => {
    getAllTruckInspectionServiceNegotiations();
  }, [getAllTruckInspectionServiceNegotiations]);

  return (
    <TruckInspectionNegotiationTable
      rows={allTruckInspectionServiceNegotiations}
      subtitle="All truck inspection service negotiations across the marketplace."
      title="Truck Inspection Negotiations"
      viewBasePath="/admin-dashboard/truck-inspection-negotiation-detail"
    />
  );
}

export default AdminTruckInspectionNegotiationsPage;
