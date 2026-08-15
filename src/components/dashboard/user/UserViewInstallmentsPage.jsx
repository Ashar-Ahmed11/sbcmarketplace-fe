import { useRouteMatch } from 'react-router-dom';
import ListingTypeCards from '../ListingTypeCards';

function UserViewInstallmentsPage() {
  const { url } = useRouteMatch();

  return (
    <ListingTypeCards
      items={[
        { label: 'Truck Installments', text: 'Review your truck finance installments.', to: `${url}/trucks`, icon: 'fa fa-calendar' },
        { label: 'Machinery Installments', text: 'Review your machinery finance installments.', to: `${url}/machinery`, icon: 'fa fa-calendar' },
        { label: 'Construction Material Installments', text: 'Review your construction material finance installments.', to: `${url}/construction-material`, icon: 'fa fa-calendar' },
        { label: 'Spare Part Installments', text: 'Review your spare part finance installments.', to: `${url}/spare-parts`, icon: 'fa fa-calendar' },
      ]}
      subtitle="Choose an installment module to continue."
      title="My Installments"
    />
  );
}

export default UserViewInstallmentsPage;
