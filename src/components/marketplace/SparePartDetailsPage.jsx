import { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import AppContext from '../context/appContext';
import MarketplaceSafety from './MarketplaceSafety';
import SparePartDetailsOverview from './SparePartDetailsOverview';
import TruckDetailsHero from './TruckDetailsHero';

function SparePartDetailsPage() {
  const { sparePartId } = useParams();
  const { getSparePartById } = useContext(AppContext);
  const [sparePart, setSparePart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadSparePart = async () => {
      try {
        const response = await getSparePartById(sparePartId);
        if (mounted) {
          setSparePart(response);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadSparePart();

    return () => {
      mounted = false;
    };
  }, [getSparePartById, sparePartId]);

  if (loading) {
    return (
      <main className="marketplace-page">
        <TruckDetailsHero truck={null} />
        <section className="truck-details-section">
          <div className="container-xl">
            <div className="marketplace-empty-state">
              <h3>Loading spare part details...</h3>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!sparePart || sparePart.approvalStatus !== 'approved') {
    return <Redirect to="/404" />;
  }

  return (
    <main className="marketplace-page">
      <SparePartDetailsOverview sparePart={sparePart} />
      <MarketplaceSafety />
    </main>
  );
}

export default SparePartDetailsPage;
