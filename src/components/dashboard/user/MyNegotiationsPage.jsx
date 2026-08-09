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
        {
          label: 'Machinery Negotiations',
          text: 'Review and continue your active buyer-seller construction machinery negotiations.',
          to: `${url}/construction-machinery`,
          icon: 'fa fa-comments-o',
        },
        {
          label: 'Construction Material Negotiations',
          text: 'Review and continue your active buyer-seller construction material negotiations.',
          to: `${url}/construction-material`,
          icon: 'fa fa-comments-o',
        },
        {
          label: 'Spare Part Negotiations',
          text: 'Review and continue your active buyer-seller spare part negotiations.',
          to: `${url}/spare-parts`,
          icon: 'fa fa-comments-o',
        },
      ]}
      subtitle="Choose a negotiation module to continue."
      title="My Negotiations"
    />
  );
}

export default MyNegotiationsPage;
