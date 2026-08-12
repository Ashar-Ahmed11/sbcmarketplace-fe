import { useRouteMatch } from 'react-router-dom';
import ListingTypeCards from '../ListingTypeCards';

function UserInspectionNegotiationsPage() {
  const { url } = useRouteMatch();

  return (
    <ListingTypeCards
      items={[
        {
          label: 'Truck Inspection',
          text: 'Review and continue your truck inspection service negotiations.',
          to: `${url}/truck-inspection`,
          icon: 'fa fa-search',
        },
        {
          label: 'Machinery Inspection',
          text: 'Dedicated negotiation flow will be added here next.',
          to: `${url}/truck-inspection`,
          icon: 'fa fa-cogs',
        },
        {
          label: 'Spare Part Inspection',
          text: 'Dedicated negotiation flow will be added here next.',
          to: `${url}/truck-inspection`,
          icon: 'fa fa-wrench',
        },
        {
          label: 'Material Inspection',
          text: 'Dedicated negotiation flow will be added here next.',
          to: `${url}/truck-inspection`,
          icon: 'fa fa-cubes',
        },
      ]}
      subtitle="Choose an inspection negotiation module."
      title="Inspection Negotiations"
    />
  );
}

export default UserInspectionNegotiationsPage;
