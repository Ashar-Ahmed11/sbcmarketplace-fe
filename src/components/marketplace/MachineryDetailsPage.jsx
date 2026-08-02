import { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import AppContext from '../context/appContext';
import MarketplaceSafety from './MarketplaceSafety';
import MachineryDetailsOverview from './MachineryDetailsOverview';
import TruckDetailsHero from './TruckDetailsHero';

function MachineryDetailsPage() {
  const { machineryId } = useParams();
  const { getMachineryById } = useContext(AppContext);
  const [machinery, setMachinery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadMachinery = async () => {
      try {
        const response = await getMachineryById(machineryId);
        if (mounted) {
          setMachinery(response);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadMachinery();

    return () => {
      mounted = false;
    };
  }, [getMachineryById, machineryId]);

  if (loading) {
    return (
      <main className="marketplace-page">
        <TruckDetailsHero truck={null} />
        <section className="truck-details-section">
          <div className="container-xl">
            <div className="marketplace-empty-state">
              <h3>Loading machinery details...</h3>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!machinery || machinery.approvalStatus !== 'approved') {
    return <Redirect to="/404" />;
  }

  return (
    <main className="marketplace-page">
      <MachineryDetailsOverview machinery={machinery} />
      <MarketplaceSafety />
    </main>
  );
}

export default MachineryDetailsPage;
