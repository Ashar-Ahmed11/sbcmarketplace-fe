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
          text: 'Create and manage machinery inspection reports.',
          to: `${url}/machinery-inspection`,
          icon: 'fa fa-cogs',
        },
        {
          label: 'Spare Part Inspection',
          text: 'Create and manage spare part inspection reports.',
          to: `${url}/spare-part-inspection`,
          icon: 'fa fa-wrench',
        },
        {
          label: 'Material Inspection',
          text: 'Create and manage construction material inspection reports.',
          to: `${url}/construction-material-inspection`,
          icon: 'fa fa-cubes',
        },
      ]}
      subtitle="Choose an inspection module."
      title="Inspection"
    />
  );
}

export default UserInspectionHubPage;
