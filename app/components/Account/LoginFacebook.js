import React, {useState} from "react";
import {SocialIcon} from "react-native-elements";
import * as Facebook from "expo-facebook";
import * as firebase from "firebase";
import {FacebookApi} from "../../utils/Social";
import Loading from "../Loading";
import {withNavigation} from "react-navigation";

function LoginFacebook(props) {
  const {toastRef, navigation} = props;
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const login = async () => {
    setIsVisibleLoading(true);

    await Facebook.initializeAsync(FacebookApi.application_id, undefined);
    const {type, token} = await Facebook.logInWithReadPermissionsAsync({permissions: FacebookApi.permissions});

    if (type === "success") {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInWithCredential(credentials)
        .then(
          () => {
            navigation.navigate("MyAccount")
          }
        )
        .catch(
          () => {
            toastRef.current.show("Error al iniciar sesión")
          }
        )
    } else if (type === "cancel") {
      toastRef.current.show("Inicio de sesión cancelado")
    } else {
      toastRef.current.show("Error desconocido")
    }
    setIsVisibleLoading(false);
  };

  return (
    <>
      <SocialIcon button
                  type="facebook"
                  title="Ingresar con Facebook"
                  onPress={login}
      />
      <Loading text="Iniciando sesión"
               isVisible={isVisibleLoading}
      />
    </>
  )
}

export default withNavigation(LoginFacebook);