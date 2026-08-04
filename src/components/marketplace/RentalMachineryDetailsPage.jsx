import { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import AppContext from '../context/appContext';
import MarketplaceSafety from './MarketplaceSafety';
import RentalMachineryDetailsOverview from './RentalMachineryDetailsOverview';
import TruckDetailsHero from './TruckDetailsHero';

function RentalMachineryDetailsPage() {
  const { rentalMachineryId } = useParams();
  const { getRentalMachineryById } = useContext(AppContext);
  const [rentalMachinery, setRentalMachinery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadRentalMachinery = async () => {
      try {
        const response = await getRentalMachineryById(rentalMachineryId);
        if (mounted) {
          setRentalMachinery(response);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadRentalMachinery();

    return () => {
      mounted = false;
    };
  }, [getRentalMachineryById, rentalMachineryId]);

  if (loading) {
    return (
      <main className="marketplace-page">
        <TruckDetailsHero truck={null} />
        <section className="truck-details-section">
          <div className="container-xl">
            <div className="marketplace-empty-state">
              <h3>Loading rental construction machinery details...</h3>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!rentalMachinery || rentalMachinery.approvalStatus !== 'approved') {
    return <Redirect to="/404" />;
  }

  return (
    <main className="marketplace-page">
      <RentalMachineryDetailsOverview rentalMachinery={rentalMachinery} />
      <MarketplaceSafety />
    </main>
  );
}

export default RentalMachineryDetailsPage;
