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
        {
          label: 'Machinery Negotiations',
          text: 'Review all buyer-seller construction machinery negotiations and payment status flows.',
          to: `${url}/construction-machinery`,
          icon: 'fa fa-comments-o',
        },
        {
          label: 'Construction Material Negotiations',
          text: 'Review all buyer-seller construction material negotiations and payment status flows.',
          to: `${url}/construction-material`,
          icon: 'fa fa-comments-o',
        },
        {
          label: 'Spare Part Negotiations',
          text: 'Review all buyer-seller spare part negotiations and payment status flows.',
          to: `${url}/spare-parts`,
          icon: 'fa fa-comments-o',
        },
      ]}
      subtitle="Choose a negotiation module to review."
      title="View Negotiations"
    />
  );
}

export default ViewNegotiationsPage;
