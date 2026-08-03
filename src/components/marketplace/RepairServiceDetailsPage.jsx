import { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import AppContext from '../context/appContext';
import MarketplaceSafety from './MarketplaceSafety';
import RepairServiceDetailsOverview from './RepairServiceDetailsOverview';
import TruckDetailsHero from './TruckDetailsHero';

function RepairServiceDetailsPage() {
  const { repairServiceId } = useParams();
  const { getRepairServiceById } = useContext(AppContext);
  const [repairService, setRepairService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadRepairService = async () => {
      try {
        const response = await getRepairServiceById(repairServiceId);
        if (mounted) setRepairService(response);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadRepairService();
    return () => { mounted = false; };
  }, [getRepairServiceById, repairServiceId]);

  if (loading) {
    return (
      <main className="marketplace-page">
        <TruckDetailsHero truck={null} />
        <section className="truck-details-section">
          <div className="container-xl">
            <div className="marketplace-empty-state">
              <h3>Loading repair service details...</h3>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!repairService || repairService.approvalStatus !== 'approved') return <Redirect to="/404" />;

  return (
    <main className="marketplace-page">
      <RepairServiceDetailsOverview repairService={repairService} />
      <MarketplaceSafety />
    </main>
  );
}

export default RepairServiceDetailsPage;
