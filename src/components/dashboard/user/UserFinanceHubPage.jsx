import { useRouteMatch } from 'react-router-dom';
import ListingTypeCards from '../ListingTypeCards';

function UserFinanceHubPage() {
  const { url } = useRouteMatch();

  return (
    <ListingTypeCards
      items={[
        { label: 'Truck Finance', text: 'Create and manage truck finance listings.', to: `${url}/trucks`, icon: 'fa fa-money' },
        { label: 'Machinery Finance', text: 'This module will follow next.', to: `${url}/trucks`, icon: 'fa fa-money' },
        { label: 'Construction Material Finance', text: 'This module will follow next.', to: `${url}/trucks`, icon: 'fa fa-money' },
        { label: 'Spare Part Finance', text: 'This module will follow next.', to: `${url}/trucks`, icon: 'fa fa-money' },
      ]}
      subtitle="Choose a finance module."
      title="Finance"
    />
  );
}

export default UserFinanceHubPage;
