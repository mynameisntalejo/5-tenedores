import {createStackNavigator} from "react-navigation-stack";
import TopRestaurantsScreens from "../screens/TopRestaurants";

const TopRestaurantsScreenStacks = createStackNavigator(
  {
    TopRestaurants: {
      screen: TopRestaurantsScreens,
      navigationOptions: () => ({
        title: "Los mejores restaurantes"
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

export default TopRestaurantsScreenStacks;