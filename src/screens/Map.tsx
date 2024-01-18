import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import type { Location } from "../lib/types";
import IconButton from "../components/ui/IconButton";

const Map = ({ navigation, route }: { navigation: any; route: any }) => {
  const initialLocation = route.params && {
    latitude: route.params.initialLat,
    longitude: route.params.initialLong,
  };

  const [selectedLocation, setSelectedLocation] =
    useState<Location>(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.latitude : 37.78,
    longitude: initialLocation ? initialLocation.longitude : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleSelectLocation = (event: MapPressEvent) => {
    if (initialLocation) {
      return;
    }
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ latitude: latitude, longitude: longitude });
  };

  const handleSavePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picekd!",
        "You have to pick a location (by tapping on the map) first!"
      );
      return;
    }
    navigation.navigate("AddPlace", { pickedLocation: selectedLocation });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }: { tintColor: string }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={handleSavePickedLocation}
        />
      ),
    });
  }, [navigation, handleSavePickedLocation, initialLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={handleSelectLocation}
    >
      {selectedLocation && (
        <Marker title="Picked location" coordinate={selectedLocation} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
