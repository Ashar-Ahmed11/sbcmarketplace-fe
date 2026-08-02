import { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import AppContext from '../context/appContext';
import MarketplaceSafety from './MarketplaceSafety';
import TruckDetailsHero from './TruckDetailsHero';
import TruckDetailsOverview from './TruckDetailsOverview';

function TruckDetailsPage() {
  const { truckId } = useParams();
  const { getTruckById } = useContext(AppContext);
  const [truck, setTruck] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadTruck = async () => {
      try {
        const response = await getTruckById(truckId);
        if (mounted) {
          setTruck(response);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadTruck();

    return () => {
      mounted = false;
    };
  }, [getTruckById, truckId]);

  if (loading) {
    return (
      <main className="marketplace-page">
        <TruckDetailsHero truck={null} />
        <section className="truck-details-section">
          <div className="container-xl">
            <div className="marketplace-empty-state">
              <h3>Loading truck details...</h3>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!truck || truck.approvalStatus !== 'approved') {
    return <Redirect to="/404" />;
  }

  return (
    <main className="marketplace-page">
      {/* <TruckDetailsHero truck={truck} /> */}
      <TruckDetailsOverview truck={truck} />
      <MarketplaceSafety />
    </main>
  );
}

export default TruckDetailsPage;
