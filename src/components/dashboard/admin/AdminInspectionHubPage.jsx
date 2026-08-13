import { useRouteMatch } from 'react-router-dom';
import ListingTypeCards from '../ListingTypeCards';

function AdminInspectionHubPage() {
  const { url } = useRouteMatch();

  return (
    <ListingTypeCards
      items={[
        {
          label: 'Truck Inspection',
          text: 'Review all truck inspection reports.',
          to: `${url}/truck-inspection`,
          icon: 'fa fa-search',
        },
        {
          label: 'Machinery Inspection',
          text: 'Review all machinery inspection reports.',
          to: `${url}/machinery-inspection`,
          icon: 'fa fa-cogs',
        },
        {
          label: 'Spare Part Inspection',
          text: 'Review all spare part inspection reports.',
          to: `${url}/spare-part-inspection`,
          icon: 'fa fa-wrench',
        },
        {
          label: 'Material Inspection',
          text: 'Review all construction material inspection reports.',
          to: `${url}/construction-material-inspection`,
          icon: 'fa fa-cubes',
        },
      ]}
      subtitle="Choose an inspection module to review."
      title="Inspection"
    />
  );
}

export default AdminInspectionHubPage;
