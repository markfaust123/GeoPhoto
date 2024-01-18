import PlaceForm from "../components/Places/PlaceForm";
import type { Place } from "../lib/types";

const AddPlace = ({ navigation }: { navigation: any }) => {
  const handleCreatePlace = (place: Place) => {
    navigation.navigate("AllPlaces", { place: place });
  };
  return <PlaceForm onCreatePlace={handleCreatePlace} />;
};

export default AddPlace;
