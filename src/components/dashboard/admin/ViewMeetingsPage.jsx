import { useRouteMatch } from 'react-router-dom';
import ListingTypeCards from '../ListingTypeCards';

function ViewMeetingsPage() {
  const { url } = useRouteMatch();

  return (
    <ListingTypeCards
      items={[
        {
          label: 'Truck Meetings',
          text: 'Review all scheduled truck meetings and their approval workflow.',
          to: `${url}/trucks`,
          icon: 'fa fa-calendar',
        },
      ]}
      subtitle="Choose a meeting module to review."
      title="View Meetings"
    />
  );
}

export default ViewMeetingsPage;
