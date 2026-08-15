import { useRouteMatch } from 'react-router-dom';
import ListingTypeCards from '../ListingTypeCards';

function ViewInstallmentsPage() {
  const { url } = useRouteMatch();

  return (
    <ListingTypeCards
      items={[
        { label: 'Truck Installments', text: 'Review all truck finance installments.', to: `${url}/trucks`, icon: 'fa fa-calendar' },
        { label: 'Machinery Installments', text: 'Review all machinery finance installments.', to: `${url}/machinery`, icon: 'fa fa-calendar' },
        { label: 'Construction Material Installments', text: 'Review all construction material finance installments.', to: `${url}/construction-material`, icon: 'fa fa-calendar' },
        { label: 'Spare Part Installments', text: 'Review all spare part finance installments.', to: `${url}/spare-parts`, icon: 'fa fa-calendar' },
      ]}
      subtitle="Choose an installment module to review."
      title="View Installments"
    />
  );
}

export default ViewInstallmentsPage;
