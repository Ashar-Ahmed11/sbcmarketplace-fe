import { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import AppContext from '../context/appContext';
import MarketplaceSafety from './MarketplaceSafety';
import RentalTruckDetailsOverview from './RentalTruckDetailsOverview';
import TruckDetailsHero from './TruckDetailsHero';

function RentalTruckDetailsPage() {
  const { rentalTruckId } = useParams();
  const { getRentalTruckById } = useContext(AppContext);
  const [rentalTruck, setRentalTruck] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadRentalTruck = async () => {
      try {
        const response = await getRentalTruckById(rentalTruckId);
        if (mounted) {
          setRentalTruck(response);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadRentalTruck();

    return () => {
      mounted = false;
    };
  }, [getRentalTruckById, rentalTruckId]);

  if (loading) {
    return (
      <main className="marketplace-page">
        <TruckDetailsHero truck={null} />
        <section className="truck-details-section">
          <div className="container-xl">
            <div className="marketplace-empty-state">
              <h3>Loading rental truck details...</h3>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!rentalTruck || rentalTruck.approvalStatus !== 'approved') {
    return <Redirect to="/404" />;
  }

  return (
    <main className="marketplace-page">
      <RentalTruckDetailsOverview rentalTruck={rentalTruck} />
      <MarketplaceSafety />
    </main>
  );
}

export default RentalTruckDetailsPage;
