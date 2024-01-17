import { StyleSheet, View } from "react-native";
import OutlineButton from "../ui/OutlinedButton";
import { Colors } from "../../lib/constants";

const LocationPicker = () => {
  const handleGetLocation = () => {};

  const handlePickOnMap = () => {};

  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={handleGetLocation}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={handlePickOnMap}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default LocationPicker;
