import { useRouteMatch } from "react-router-dom";
import ListingTypeCards from "../ListingTypeCards";

function MyListingsPage() {
  const { url } = useRouteMatch();
  const items = [
    {
      label: "Trucks and Transport Vehicle",
      text: "Manage your truck and transport listings.",
      to: `${url}/trucks`,
      icon: "fa fa-truck",
    },
    {
      label: "Construction Machinery",
      text: "Manage your construction machinery listings.",
      to: `${url}/construction-machinery`,
      icon: "fa fa-cogs",
    },
    {
      label: "Construction Material",
      text: "Manage your construction material listings.",
      to: `${url}/construction-material`,
      icon: "fa fa-cubes",
    },
    {
      label: "Spare Parts",
      text: "Manage your spare parts listings.",
      to: `${url}/spare-parts`,
      icon: "fa fa-cogs",
    },
  ];

  return (
    <ListingTypeCards
      actionLabel="Create New Listing"
      actionTo={`${url}/create-truck`}
      items={items}
      subtitle="Choose a listing module to continue."
      title="My Listings"
    />
  );
}

export default MyListingsPage;
