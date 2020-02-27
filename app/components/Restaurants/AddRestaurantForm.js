import React, {useState} from "react";
import {ScrollView, StyleSheet} from "react-native";
import {withNavigation} from "react-navigation";
import UploadImage from "./UploadImage";
import ImageRestaurant from "./ImageRestaurant";
import AddRestaurantInputs from "./AddRestaurantInputs";
import RestaurantMap from "./RestaurantMap";
import {Button} from "react-native-elements";
import uuid from "uuid/v4";
import {firebaseApp} from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

function AddRestaurantForm(props) {
  const {navigation, toastRef, setIsLoading} = props;
  const [imagesSelected, setImagesSelected] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationRestaurant, setLocationRestaurant] = useState(null);

  const addRestaurant = () => {
    if (!restaurantName || !restaurantAddress || !restaurantDescription) {
      toastRef.current.show("Todos los campos del formulario son obligatorios");
    } else if (!imagesSelected.length) {
      toastRef.current.show("El restaurante tiene que tener al menos una foto");
    } else if (!locationRestaurant) {
      toastRef.current.show("El restaurante tiene que tener ubicación en el mapa");
    } else {
      setIsLoading(true);
      uploadImageRestaurant(imagesSelected)
        .then(
          (arrayImages) => {
            console.log(arrayImages)
            db.collection("restaurants")
              .add({
                name: restaurantName,
                address: restaurantAddress,
                description: restaurantDescription,
                location: locationRestaurant,
                images: arrayImages,
                rating: 0,
                ratingTotal: 0,
                quantityVoting: 0,
                createAt: new Date(),
                createBy: firebaseApp.auth().currentUser.uid
              })
              .then(
                () => {
                  console.log("then");
                  setIsLoading(false);
                  navigation.navigate("Restaurants");
                }
              )
              .catch(
                () => {
                  console.log("catch");
                  setIsLoading(false);
                  toastRef.current.show("Error al crear el restaurante")
                }
              )
          }
        );
    }
  };

  const uploadImageRestaurant = async (imagesArray) => {
    const imagesBlob = [];
    await Promise.all(
      imagesArray.map(
        async (image) => {
          const response = await fetch(image);
          const blob = await response.blob();
          const ref = firebase.storage().ref("restaurant-img").child(uuid());
          await ref.put(blob)
            .then(
              (result) => {
                imagesBlob.push(result.metadata.name);
              }
            );
        }
      )
    );
    return imagesBlob;
  };

  return (
    <ScrollView>
      <ImageRestaurant imageRestaurant={imagesSelected[0]}/>
      <AddRestaurantInputs setRestaurantName={setRestaurantName}
                           setRestaurantAddress={setRestaurantAddress}
                           setRestaurantDescription={setRestaurantDescription}
                           setIsVisibleMap={setIsVisibleMap}
                           locationRestaurant={locationRestaurant}
      />
      <UploadImage imagesSelected={imagesSelected}
                   setImagesSelected={setImagesSelected}
                   toastRef={toastRef}
      />
      <Button title="Crear restaurante"
              buttonStyle={styles.btnAddRestaurant}
              onPress={addRestaurant}
      />
      <RestaurantMap isVisibleMap={isVisibleMap}
                     setIsVisibleMap={setIsVisibleMap}
                     setLocationRestaurant={setLocationRestaurant}
                     toastRef={toastRef}
      />
    </ScrollView>
  )
}

export default withNavigation(AddRestaurantForm);

const styles = StyleSheet.create({
  btnAddRestaurant: {
    backgroundColor: "#00a680",
    margin: 20,
  },
});