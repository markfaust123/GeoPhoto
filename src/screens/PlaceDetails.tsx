import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../components/ui/OutlinedButton";
import { Colors } from "../lib/constants";
import { useEffect, useState } from "react";
import type { Place } from "../lib/types";
import { fetchPlaceDetails } from "../util/database";

const PlaceDetails = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const [fetchedPlace, setFetchedPlace] = useState<Place>();
  const handleShowOnMap = () => {};

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    const loadPlaceData = async () => {
      try {
        const place: Place = await fetchPlaceDetails(selectedPlaceId);
        setFetchedPlace(place as Place);
        navigation.setOptions({
          title: place.title,
        });
      } catch (error) {
        Alert.alert("Error getting place!", "Please try again later...");
      }
    };
    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image source={{ uri: fetchedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlineButton icon="map" onPress={handleShowOnMap}>
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PlaceDetails;
