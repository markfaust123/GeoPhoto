import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../lib/constants";
import OutlineButton from "../ui/OutlinedButton";

const ImagePicker = ({}) => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [pickedImage, setPickedImage] = useState<string>();

  const verifyPermissions = async () => {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionRepsonse = await requestPermission();
      return permissionRepsonse.granted;
    } else if (
      cameraPermissionInformation?.status === PermissionStatus.DENIED
    ) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    } else {
      return true;
    }
  };

  const handleTakeImage = async () => {
    const hasPermission: boolean = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 19],
      quality: 0.5,
    });
    if (!result.canceled) {
      setPickedImage(result.assets![0].uri);
    }
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlineButton icon="camera" onPress={handleTakeImage}>
        Take Image
      </OutlineButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
