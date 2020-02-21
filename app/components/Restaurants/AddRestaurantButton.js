import React from "react";
import ActionButton from "react-native-action-button";
import {withNavigation} from "react-navigation";

function AddRestaurantButton(props) {
  const {navigation} = props;

  return (
    <ActionButton buttonColor="#00a680"
                  onPress={() => navigation.navigate("AddRestaurant")}
    />
  );
}

export default withNavigation(AddRestaurantButton);