import {createStackNavigator} from "react-navigation-stack";
import MyAccountScreen from "../screens/Account/MyAccount";
import LoginScreen from "../screens/Account/Login";
import RegisterScreen from "../screens/Account/Register";

const MyAccountScreenStacks = createStackNavigator(
  {
    MyAccount: {
      screen: MyAccountScreen,
      navigationOptions: () => ({
        title: "Mi cuenta"
      })
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        title: "Login"
      })
    },
    Registro: {
      screen: RegisterScreen,
      navigationOptions: () => ({
        title: "Registro"
      })
    },
  },
  {
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: "#fff",
      }
    }
  }
);

export default MyAccountScreenStacks;