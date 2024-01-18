import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import type { Place } from "../lib/types";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

const AllPlaces = ({ route }: { route: any }) => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setLoadedPlaces(places as unknown as Place[])
    };
    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((currPlaces) => [...currPlaces, route.params.place]);
    }
    
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
