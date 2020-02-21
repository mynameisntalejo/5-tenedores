import React, {useRef} from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Divider} from "react-native-elements";
import CreateAccount from "../../components/Account/CreateAccount";
import LoginForm from "../../components/Account/LoginForm";
import Toast from "react-native-easy-toast";
import LoginFacebook from "../../components/Account/LoginFacebook";

export default function Login() {
  const toastRef = useRef();

  return (
    <ScrollView>
      <Image source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
             style={styles.logo}
             resizeMode="contain"
      />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef}/>
        <CreateAccount/>
      </View>
      <Divider style={styles.divider}/>
      <View style={styles.viewContainer}>
        <LoginFacebook toastRef={toastRef}/>
      </View>
      <Toast ref={toastRef}
             position="center"
             opacity={0.5}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40,
  }
});