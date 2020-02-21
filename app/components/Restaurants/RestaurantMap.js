import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import Modal from "../Modal";
import MapView from "react-native-maps";
import {Button} from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export default function RestaurantMap(props) {
  const {isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef} = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const resultPermission = await Permissions.askAsync(Permissions.LOCATION);
      const resultPermissionLocation = resultPermission.permissions.location.status;

      if (resultPermissionLocation === "denied") {
        toastRef.current.show("Es necesario aceptar los permisos de la localición");
      } else {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        })
      }
    })()
  }, []);

  const confirmLocation = () => {
    setLocationRestaurant(location);
    toastRef.current.show("Localización guardada correctamente");
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap}
           setIsVisible={setIsVisibleMap}
    >
      <View>
        {
          location &&
          <MapView style={styles.mapStyle}
                   initialRegion={location}
                   showsUserLocation={true}
                   onRegionChange={(region) => setLocation(region)}
          >
            <MapView.Marker draggable
                            coordinate={{
                              latitude: location.latitude,
                              longitude: location.longitude
                            }}
            />
          </MapView>
        }
        <View style={styles.viewMapBtn}>
          <Button title="Cancelar"
                  containerStyle={styles.mapBtnContainerCancel}
                  buttonStyle={styles.mapBtnCancel}
                  onPress={() => setIsVisibleMap(false)}
          />
          <Button title="Guardar ubicación"
                  containerStyle={styles.mapBtnContainerSave}
                  buttonStyle={styles.mapBtnSave}
                  onPress={confirmLocation}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  mapStyle: {
    width: "100%",
    height: 550,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  mapBtnContainerCancel: {
    paddingRight: 5,
    width: "50%",
  },
  mapBtnCancel: {
    backgroundColor: "#a60d0d",
  },
  mapBtnContainerSave: {
    paddingLeft: 5,
    width: "50%",
  },
  mapBtnSave: {
    backgroundColor: "#00a680",
  }
});