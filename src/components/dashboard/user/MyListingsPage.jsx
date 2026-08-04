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
      label: "Rental Truck",
      text: "Manage your rental truck listings.",
      to: `${url}/truck-rental`,
      icon: "fa fa-truck",
    },
    {
      label: "Rental Construction Machinery",
      text: "Manage your rental construction machinery listings.",
      to: `${url}/construction-machinery-rental`,
      icon: "fa fa-industry",
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
    {
      label: "Construction Services",
      text: "Manage your construction services listings.",
      to: `${url}/construction-services`,
      icon: "fa fa-building",
    },
    {
      label: "Inspection Services",
      text: "Manage your inspection services listings.",
      to: `${url}/inspection-services`,
      icon: "fa fa-search",
    },
    {
      label: "Repair Services",
      text: "Manage your repair services listings.",
      to: `${url}/repair-services`,
      icon: "fa fa-wrench",
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
