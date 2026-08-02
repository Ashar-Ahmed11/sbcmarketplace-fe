import { useContext, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import AppContext from "../../context/appContext";
import TruckTable from "../TruckTable";

function UserTrucksPage() {
  const { getUserTrucks, userTrucks } = useContext(AppContext);
  const { url } = useRouteMatch();

  useEffect(() => {
    getUserTrucks();
  }, [getUserTrucks]);

  return (
    <TruckTable
      actionLabel="Create"
      actionTo={`${url.replace("/trucks", "")}/create-truck`}
      rows={userTrucks}
      subtitle="All truck listings created under your account."
      title="Trucks"
      viewBasePath={`${url.replace("/trucks", "")}/edit-truck`}
    />
  );
}

export default UserTrucksPage;
