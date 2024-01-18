import PlaceForm from "../components/Places/PlaceForm";
import type { Place } from "../lib/types";
import { insertPlace } from "../util/database";

const AddPlace = ({ navigation }: { navigation: any }) => {
  const handleCreatePlace = async (place: Place) => {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  };
  return <PlaceForm onCreatePlace={handleCreatePlace} />;
};

export default AddPlace;
