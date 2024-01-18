import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../../lib/constants";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import type { Location, Place } from "../../lib/types";

const PlaceForm = ({
  onCreatePlace,
}: {
  onCreatePlace: (data: Place) => void;
}) => {
  const [enteredTitle, setEnteredTitle] = useState<string>("");
  const [selectImage, setSelectImage] = useState<string>();
  const [pickedLocation, setPickedLocation] = useState<
    Location & { address: string }
  >();

  const handleChangeInputText = (text: string) => {
    setEnteredTitle(text);
  };

  const handleTakeImage = (imageUri: string) => {
    setSelectImage(imageUri);
  };

  const handlePickLocation = useCallback(
    (location: Location, address: string) => {
      setPickedLocation({ ...location, address: address });
    },
    []
  );

  const handleSavePlace = () => {
    if (selectImage && pickedLocation) {
      const placeData = {
        id: new Date().toString() + Math.random().toString(),
        title: enteredTitle,
        imageUri: selectImage,
        address: pickedLocation.address,
        location: pickedLocation,
      };
      onCreatePlace(placeData);
    } else {
      Alert.alert(
        "No image taken or location picked!",
        "Please set to continue."
      );
    }
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChangeInputText}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={handleTakeImage} />
      <LocationPicker onPickLocation={handlePickLocation} />
      <Button onPress={handleSavePlace}>Add Place</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});

export default PlaceForm;
