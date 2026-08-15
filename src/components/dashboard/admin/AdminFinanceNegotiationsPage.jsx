import { useRouteMatch } from 'react-router-dom';
import ListingTypeCards from '../ListingTypeCards';

function AdminFinanceNegotiationsPage() {
  const { url } = useRouteMatch();

  return (
    <ListingTypeCards
      items={[
        { label: 'Truck Finance', text: 'Review all truck finance negotiations.', to: `${url}/trucks`, icon: 'fa fa-money' },
        { label: 'Machinery Finance', text: 'This module will follow next.', to: `${url}/trucks`, icon: 'fa fa-money' },
        { label: 'Construction Material Finance', text: 'This module will follow next.', to: `${url}/trucks`, icon: 'fa fa-money' },
        { label: 'Spare Part Finance', text: 'This module will follow next.', to: `${url}/trucks`, icon: 'fa fa-money' },
      ]}
      subtitle="Choose a finance negotiation module to review."
      title="Finance Negotiations"
    />
  );
}

export default AdminFinanceNegotiationsPage;
