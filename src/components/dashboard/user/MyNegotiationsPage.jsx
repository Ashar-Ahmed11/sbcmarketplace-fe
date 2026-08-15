import { useRouteMatch } from 'react-router-dom';
import ListingTypeCards from '../ListingTypeCards';

function MyNegotiationsPage() {
  const { url } = useRouteMatch();

  return (
    <ListingTypeCards
      items={[
        {
          label: 'Inspection Negotiations',
          text: 'Review and continue your active truck inspection service negotiations.',
          to: `${url}/inspection-services`,
          icon: 'fa fa-search',
        },
        {
          label: 'Finance Negotiations',
          text: 'Review and continue your active truck finance negotiations.',
          to: `${url}/finance`,
          icon: 'fa fa-money',
        },
        {
          label: 'Truck Negotiations',
          text: 'Review and continue your active buyer-seller truck negotiations.',
          to: `${url}/trucks`,
          icon: 'fa fa-comments',
        },
        {
          label: 'Machinery Negotiations',
          text: 'Review and continue your active buyer-seller construction machinery negotiations.',
          to: `${url}/construction-machinery`,
          icon: 'fa fa-comments-o',
        },
        {
          label: 'Construction Material Negotiations',
          text: 'Review and continue your active buyer-seller construction material negotiations.',
          to: `${url}/construction-material`,
          icon: 'fa fa-comments-o',
        },
        {
          label: 'Construction Service Negotiations',
          text: 'Review and continue your active buyer-seller construction service negotiations.',
          to: `${url}/construction-services`,
          icon: 'fa fa-comments-o',
        },
        {
          label: 'Rental Truck Negotiations',
          text: 'Review and continue your active buyer-seller rental truck negotiations.',
          to: `${url}/rental-trucks`,
          icon: 'fa fa-comments-o',
        },
        {
          label: 'Rental Machinery Negotiations',
          text: 'Review and continue your active buyer-seller rental construction machinery negotiations.',
          to: `${url}/rental-construction-machinery`,
          icon: 'fa fa-comments-o',
        },
        {
          label: 'Repair Service Negotiations',
          text: 'Review and continue your active buyer-seller repair service negotiations.',
          to: `${url}/repair-services`,
          icon: 'fa fa-comments-o',
        },
        {
          label: 'Spare Part Negotiations',
          text: 'Review and continue your active buyer-seller spare part negotiations.',
          to: `${url}/spare-parts`,
          icon: 'fa fa-comments-o',
        },
      ]}
      subtitle="Choose a negotiation module to continue."
      title="My Negotiations"
    />
  );
}

export default MyNegotiationsPage;
