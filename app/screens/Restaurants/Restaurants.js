import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import * as firebase from "firebase";
import AddRestaurantButton from "../../components/Restaurants/AddRestaurantButton";

export default function Restaurants(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase
      .auth()
      .onAuthStateChanged(
        user => {
          setUser(user);
        })
  }, []);

  return (
    <View style={styles.viewBody}>
      <Text>Estamos en Restaurantes</Text>
      {
        user &&
        <AddRestaurantButton/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  }
});