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
          text: 'Review all machinery inspection service negotiations.',
          to: `${url}/machinery-inspection`,
          icon: 'fa fa-cogs',
        },
        {
          label: 'Spare Part Inspection',
          text: 'Review all spare part inspection service negotiations.',
          to: `${url}/spare-part-inspection`,
          icon: 'fa fa-wrench',
        },
        {
          label: 'Material Inspection',
          text: 'Review all construction material inspection service negotiations.',
          to: `${url}/construction-material-inspection`,
          icon: 'fa fa-cubes',
        },
      ]}
      subtitle="Choose an inspection negotiation module to review."
      title="Inspection Negotiations"
    />
  );
}

export default AdminInspectionNegotiationsPage;
