import React from "react";
import {Alert, StyleSheet, View} from "react-native";
import {Avatar, Icon} from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function UploadImage(props) {
  const {imagesSelected, setImagesSelected, toastRef} = props;

  const imageSelected = async () => {
    const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos de la galeria");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (result.cancelled) {
        toastRef.current.show("Se ha cerrado la galeria");
      } else {
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  };

  const removeImage = (image) => {
    const arrayImages = imagesSelected;
    Alert.alert(
      "Eliminar imagen",
      "¿Estás seguro de que quieres eliminar la imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => setImagesSelected(arrayImages.filter(imageUrl => imageUrl !== image)),
        }
      ],
      {
        cancelable: false
      }
    )
  };

  return (
    <View style={styles.viewImages}>
      {
        imagesSelected.length < 5 &&
        <Icon type="material-community"
              name="camera"
              color="#7a7a7a"
              containerStyle={styles.containerIcon}
              onPress={imageSelected}
        />
      }
      {
        imagesSelected.map(
          (imageRestaurant, index) => (
            <Avatar key={index}
                    style={styles.miniatureStyle}
                    source={{uri: imageRestaurant}}
                    onPress={() => removeImage(imageRestaurant)}
            />
          )
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  }
});