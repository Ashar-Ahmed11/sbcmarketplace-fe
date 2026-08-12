import { useRouteMatch } from 'react-router-dom';
import ListingTypeCards from '../ListingTypeCards';

function UserInspectionHubPage() {
  const { url } = useRouteMatch();

  return (
    <ListingTypeCards
      items={[
        {
          label: 'Truck Inspection',
          text: 'Create and manage truck inspection reports.',
          to: `${url}/truck-inspection`,
          icon: 'fa fa-search',
        },
        {
          label: 'Machinery Inspection',
          text: 'Dedicated report workflow will be added here next.',
          to: `${url}/truck-inspection`,
          icon: 'fa fa-cogs',
        },
        {
          label: 'Spare Part Inspection',
          text: 'Dedicated report workflow will be added here next.',
          to: `${url}/truck-inspection`,
          icon: 'fa fa-wrench',
        },
        {
          label: 'Material Inspection',
          text: 'Dedicated report workflow will be added here next.',
          to: `${url}/truck-inspection`,
          icon: 'fa fa-cubes',
        },
      ]}
      subtitle="Choose an inspection module."
      title="Inspection"
    />
  );
}

export default UserInspectionHubPage;
