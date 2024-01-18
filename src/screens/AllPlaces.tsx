import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import type { Place } from "../lib/types";
import { useIsFocused } from "@react-navigation/native";

const AllPlaces = ({ route }: { route: any }) => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((currPlaces) => [...currPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
