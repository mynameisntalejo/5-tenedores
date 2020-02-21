import React from "react";
import {StyleSheet, View} from "react-native";
import {Input} from "react-native-elements";

export default function AddRestaurantInputs(props) {
  const {setRestaurantName, setRestaurantAddress, setRestaurantDescription, setIsVisibleMap, locationRestaurant} = props;

  return (
    <View style={styles.viewForm}>
      <Input placeholder="Nombre del restaurante"
             containerStyle={styles.input}
             onChange={(event) => setRestaurantName(event.nativeEvent.text)}
      />
      <Input placeholder="Dirección"
             containerStyle={styles.input}
             rightIcon={{
               type: "material-community",
               name: "google-maps",
               color: locationRestaurant ? "#00a680" : "#c2c2c2",
               onPress: () => setIsVisibleMap(true),
             }}
             onChange={(event) => setRestaurantAddress(event.nativeEvent.text)}
      />
      <Input placeholder="Descripción"
             multiline={true}
             inputContainerStyle={styles.textArea}
             onChange={(event) => setRestaurantDescription(event.nativeEvent.text)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  }
});