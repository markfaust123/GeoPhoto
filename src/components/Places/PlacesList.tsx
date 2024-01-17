import { FlatList, StyleSheet, Text, View } from "react-native";
import type { Place } from "../../lib/types";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../lib/constants";
import { useNavigation } from "@react-navigation/native";

const PlacesList = ({ places }: { places: Place[] }) => {
  const navigation = useNavigation<any>();

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      renderItem={({ item }) => (
        <PlaceItem
          onSelect={() => {
            navigation.navigate("", { placeId: item.id });
          }}
          place={item}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    color: Colors.primary200,
    fontSize: 16,
  },
});

export default PlacesList;
