import { useRouteMatch } from 'react-router-dom';
import ListingTypeCards from '../ListingTypeCards';

function AdminListings() {
  const { url } = useRouteMatch();
  const items = [
    { label: 'Trucks and Transport Vehicle', text: 'Review all user truck listings.', to: `${url}/trucks`, icon: 'fa fa-truck' },
    { label: 'Construction Machinery', text: 'Review all user construction machinery listings.', to: `${url}/construction-machinery`, icon: 'fa fa-cogs' },
    { label: 'Construction Material', text: 'Review all user construction material listings.', to: `${url}/construction-material`, icon: 'fa fa-cubes' },
    { label: 'Spare Parts', text: 'Review all user spare parts listings.', to: `${url}/spare-parts`, icon: 'fa fa-cogs' },
    { label: 'Construction Services', text: 'Review all user construction services listings.', to: `${url}/construction-services`, icon: 'fa fa-building' },
    { label: 'Inspection Services', text: 'Review all user inspection services listings.', to: `${url}/inspection-services`, icon: 'fa fa-search' },
    { label: 'Repair Services', text: 'Review all user repair services listings.', to: `${url}/repair-services`, icon: 'fa fa-wrench' },
  ];

  return <ListingTypeCards items={items} subtitle="Choose a listing module to review." title="View Listings" />;
}

export default AdminListings;
