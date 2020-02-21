import {createStackNavigator} from "react-navigation-stack";
import SearchScreen from "../screens/Search";

const SearchScreenStacks = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
      navigationOptions: () => ({
        title: "Busca tu restaurante"
      })
    }
  },
  {
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: "#fff",
      }
    }
  }
);

export default SearchScreenStacks;