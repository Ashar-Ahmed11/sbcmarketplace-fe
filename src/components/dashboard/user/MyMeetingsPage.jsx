import { useRouteMatch } from 'react-router-dom';
import ListingTypeCards from '../ListingTypeCards';

function MyMeetingsPage() {
  const { url } = useRouteMatch();

  return (
    <ListingTypeCards
      items={[
        {
          label: 'Truck Meetings',
          text: 'Review and manage your meeting requests with truck buyers and sellers.',
          to: `${url}/trucks`,
          icon: 'fa fa-calendar',
        },
      ]}
      subtitle="Choose a meeting module to continue."
      title="My Meetings"
    />
  );
}

export default MyMeetingsPage;
