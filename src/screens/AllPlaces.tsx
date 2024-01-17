import PlacesList from "../components/Places/PlacesList";
import { PLACES } from "../lib/data";

const AllPlaces = () => {
  return <PlacesList places={PLACES} />;
};

export default AllPlaces;
