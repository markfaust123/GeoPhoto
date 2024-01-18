import { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import type { Location } from "../lib/types";

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location>();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleSelectLocation = (event: MapPressEvent) => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ latitude: latitude, longitude: longitude });
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={handleSelectLocation}
    >
        {selectedLocation && <Marker title="Picked location" coordinate={selectedLocation}/>}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
