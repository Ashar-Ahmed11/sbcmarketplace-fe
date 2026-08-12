import { useRouteMatch } from 'react-router-dom';
import ListingTypeCards from '../ListingTypeCards';

function AdminInspectionNegotiationsPage() {
  const { url } = useRouteMatch();

  return (
    <ListingTypeCards
      items={[
        {
          label: 'Truck Inspection',
          text: 'Review all truck inspection service negotiations.',
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
      subtitle="Choose an inspection negotiation module to review."
      title="Inspection Negotiations"
    />
  );
}

export default AdminInspectionNegotiationsPage;
