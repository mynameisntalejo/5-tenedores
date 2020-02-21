import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Button, Input} from "react-native-elements";
import * as firebase from "firebase";
import {reauthenticate} from "../../utils/Api";

export default function ChangeEmailForm(props) {
  const {email, setIsVisibleModal, setReloadData, toastRef} = props;
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const updateEmail = () => {
    setError({});
    if (!newEmail || email === newEmail) {
      setError({email: "El email no ha cambiado"});
    } else {
      setIsLoading(true);
      reauthenticate(password)
        .then(
          () => {
            firebase
              .auth()
              .currentUser
              .updateEmail(newEmail)
              .then(
                () => {
                  setIsLoading(false);
                  setReloadData(true);
                  toastRef.current.show("Correo electrónico actualizado correctamente");
                  setIsVisibleModal(false);
                }
              )
              .catch(
                () => {
                  setError({email: "Error al actualizar el correo electrónico"});
                  setIsLoading(false);
                }
              )
          }
        )
        .catch(
          () => {
            setError({password: "La contraseña es incorrecta"});
            setIsLoading(false);
          }
        )
    }
  };

  return (
    <View style={styles.view}>
      <Input placeholder="Correo electrónico"
             containerStyle={styles.input}
             defaultValue={email && email}
             onChange={(event) => setNewEmail(event.nativeEvent.text)}
             rightIcon={{
               type: "material-community",
               name: "at",
               color: "#c2c2c2",
             }}
             errorMessage={error.email}
      />
      <Input placeholder="Contraseña"
             password={true}
             secureTextEntry={hidePassword}
             containerStyle={styles.input}
             onChange={(event) => setPassword(event.nativeEvent.text)}
             rightIcon={{
               type: "material-community",
               name: hidePassword ? "eye-outline" : "eye-off-outline",
               color: "#c2c2c2",
               onPress: () => setHidePassword(!hidePassword)
             }}
             errorMessage={error.password}
      />
      <Button title="Cambiar email"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btn}
              onPress={updateEmail}
              loading={isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  }
});