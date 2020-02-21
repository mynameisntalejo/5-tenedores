import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Avatar} from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Loading from "../Loading";

export default function InfoUser(props) {
  const {
    userInfo: {uid, displayName, email, photoURL},
    setReloadData,
    toastRef
  } = props;
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const changeAvatar = async () => {
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
        uploadImage(result.uri, uid)
          .then(
            () => {
              updatePhotoUri(uid);
            }
          );
      }
    }
  };

  const uploadImage = async (uri, nameImage) => {
    setIsVisibleLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref("avatar").child(nameImage);
    return ref.put(blob);
  };

  const updatePhotoUri = (uid) => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(
        async (result) => {
          const update = {
            photoURL: result
          };
          await firebase.auth().currentUser.updateProfile(update);
          setReloadData(true);
          setIsVisibleLoading(false);
        }
      )
      .catch(
        () => {
          toastRef.current.show("Error al recuperar el avatar del servidor");
        }
      )
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar rounded
              size="large"
              showEditButton
              onEditPress={changeAvatar}
              containerStyle={styles.userInfoAvatar}
              source={{
                uri: photoURL ? photoURL : "https://api.adorable.io/avatars/285/abott@adorable.png"
              }}
      />
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anónimo"}
        </Text>
        <Text>
          {email ? email : "Social Login"}
        </Text>
      </View>
      <Loading text="Actualizando avatar"
               isVisible={isVisibleLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
  },
});