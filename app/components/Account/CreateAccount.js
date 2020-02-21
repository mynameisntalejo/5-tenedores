import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {withNavigation} from "react-navigation";

function CreateAccount(props) {
  const {navigation} = props;

  return (
    <View>
      <Text style={styles.textRegister}>
        ¿Aún no tienes una cuenta?{" "}
      </Text>
      <Text style={styles.btnRegister}
            onPress={() => navigation.navigate("Registro")}
      >
        Regístrate
      </Text>
    </View>
  )
}

export default withNavigation(CreateAccount);

const styles = StyleSheet.create({
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold",
    textAlign: "center",
  },
});