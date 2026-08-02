import { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import AppContext from '../context/appContext';
import MarketplaceSafety from './MarketplaceSafety';
import MaterialDetailsOverview from './MaterialDetailsOverview';
import TruckDetailsHero from './TruckDetailsHero';

function MaterialDetailsPage() {
  const { materialId } = useParams();
  const { getMaterialById } = useContext(AppContext);
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadMaterial = async () => {
      try {
        const response = await getMaterialById(materialId);
        if (mounted) {
          setMaterial(response);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadMaterial();

    return () => {
      mounted = false;
    };
  }, [getMaterialById, materialId]);

  if (loading) {
    return (
      <main className="marketplace-page">
        <TruckDetailsHero truck={null} />
        <section className="truck-details-section">
          <div className="container-xl">
            <div className="marketplace-empty-state">
              <h3>Loading material details...</h3>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!material || material.approvalStatus !== 'approved') {
    return <Redirect to="/404" />;
  }

  return (
    <main className="marketplace-page">
      <MaterialDetailsOverview material={material} />
      <MarketplaceSafety />
    </main>
  );
}

export default MaterialDetailsPage;
