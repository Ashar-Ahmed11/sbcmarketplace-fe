import { useRouteMatch } from 'react-router-dom';
import ListingTypeCards from '../ListingTypeCards';

function ViewNegotiationsPage() {
  const { url } = useRouteMatch();

  return (
    <ListingTypeCards
      items={[
        {
          label: 'Truck Negotiations',
          text: 'Review all buyer-seller truck negotiations and payment status flows.',
          to: `${url}/trucks`,
          icon: 'fa fa-comments',
        },
      ]}
      subtitle="Choose a negotiation module to review."
      title="View Negotiations"
    />
  );
}

export default ViewNegotiationsPage;
