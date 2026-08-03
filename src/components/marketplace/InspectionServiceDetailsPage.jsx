import { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import AppContext from '../context/appContext';
import InspectionServiceDetailsOverview from './InspectionServiceDetailsOverview';
import MarketplaceSafety from './MarketplaceSafety';
import TruckDetailsHero from './TruckDetailsHero';

function InspectionServiceDetailsPage() {
  const { inspectionServiceId } = useParams();
  const { getInspectionServiceById } = useContext(AppContext);
  const [inspectionService, setInspectionService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadInspectionService = async () => {
      try {
        const response = await getInspectionServiceById(inspectionServiceId);
        if (mounted) setInspectionService(response);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadInspectionService();
    return () => { mounted = false; };
  }, [getInspectionServiceById, inspectionServiceId]);

  if (loading) {
    return (
      <main className="marketplace-page">
        <TruckDetailsHero truck={null} />
        <section className="truck-details-section">
          <div className="container-xl">
            <div className="marketplace-empty-state">
              <h3>Loading inspection service details...</h3>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!inspectionService || inspectionService.approvalStatus !== 'approved') {
    return <Redirect to="/404" />;
  }

  return (
    <main className="marketplace-page">
      <InspectionServiceDetailsOverview inspectionService={inspectionService} />
      <MarketplaceSafety />
    </main>
  );
}

export default InspectionServiceDetailsPage;
