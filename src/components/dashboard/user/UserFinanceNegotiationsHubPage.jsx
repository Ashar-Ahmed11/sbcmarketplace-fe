import { useRouteMatch } from 'react-router-dom';
import ListingTypeCards from '../ListingTypeCards';

function UserFinanceNegotiationsHubPage() {
  const { url } = useRouteMatch();

  return (
    <ListingTypeCards
      items={[
        {
          label: 'Truck Finance',
          text: 'Review and continue your active truck finance negotiations.',
          to: `${url}/trucks`,
          icon: 'fa fa-money',
        },
        {
          label: 'Machinery Finance',
          text: 'Review and continue your active machinery finance negotiations.',
          to: `${url}/machinery`,
          icon: 'fa fa-money',
        },
        {
          label: 'Construction Material Finance',
          text: 'Review and continue your active construction material finance negotiations.',
          to: `${url}/construction-material`,
          icon: 'fa fa-money',
        },
        {
          label: 'Spare Part Finance',
          text: 'Review and continue your active spare part finance negotiations.',
          to: `${url}/spare-parts`,
          icon: 'fa fa-money',
        },
      ]}
      subtitle="Choose a finance negotiation module to continue."
      title="Finance Negotiations"
    />
  );
}

export default UserFinanceNegotiationsHubPage;
