import { useRouteMatch } from 'react-router-dom';
import ListingTypeCards from '../ListingTypeCards';

function MyNegotiationsPage() {
  const { url } = useRouteMatch();

  return (
    <ListingTypeCards
      items={[
        {
          label: 'Truck Negotiations',
          text: 'Review and continue your active buyer-seller truck negotiations.',
          to: `${url}/trucks`,
          icon: 'fa fa-comments',
        },
      ]}
      subtitle="Choose a negotiation module to continue."
      title="My Negotiations"
    />
  );
}

export default MyNegotiationsPage;
