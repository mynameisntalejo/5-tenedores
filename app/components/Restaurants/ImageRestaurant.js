import React from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import {Image} from "react-native-elements";

export default function ImageRestaurant(props) {
  const {imageRestaurant} = props;

  return (
    <View style={styles.viewPhoto}>
      {
        imageRestaurant ? (
          <Image source={{uri: imageRestaurant}}
                 style={styles.imageRestaurant}
          />
        ) : (
          <Image source={require("../../../assets/img/no-image.png")}
                 style={styles.imageRestaurant}
          />
        )
      }

    </View>
  )
}

const styles = StyleSheet.create({
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
  imageRestaurant: {
    width: Dimensions.get("window").width,
    height: 200,
  }
});