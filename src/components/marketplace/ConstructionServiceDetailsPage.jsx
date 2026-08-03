import { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import AppContext from '../context/appContext';
import ConstructionServiceDetailsOverview from './ConstructionServiceDetailsOverview';
import MarketplaceSafety from './MarketplaceSafety';
import TruckDetailsHero from './TruckDetailsHero';

function ConstructionServiceDetailsPage() {
  const { constructionServiceId } = useParams();
  const { getConstructionServiceById } = useContext(AppContext);
  const [constructionService, setConstructionService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadConstructionService = async () => {
      try {
        const response = await getConstructionServiceById(constructionServiceId);
        if (mounted) {
          setConstructionService(response);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadConstructionService();

    return () => {
      mounted = false;
    };
  }, [constructionServiceId, getConstructionServiceById]);

  if (loading) {
    return (
      <main className="marketplace-page">
        <TruckDetailsHero truck={null} />
        <section className="truck-details-section">
          <div className="container-xl">
            <div className="marketplace-empty-state">
              <h3>Loading construction service details...</h3>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!constructionService || constructionService.approvalStatus !== 'approved') {
    return <Redirect to="/404" />;
  }

  return (
    <main className="marketplace-page">
      <ConstructionServiceDetailsOverview constructionService={constructionService} />
      <MarketplaceSafety />
    </main>
  );
}

export default ConstructionServiceDetailsPage;
