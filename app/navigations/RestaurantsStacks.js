import {createStackNavigator} from "react-navigation-stack";
import RestaurantsScreen from "../screens/Restaurants/Restaurants";
import AddRestaurantScreen from "../screens/Restaurants/AddRestaurant";

const RestaurantsScreenStacks = createStackNavigator(
  {
    AddRestaurant: {
      screen: AddRestaurantScreen,
      navigationOptions: () => ({
        title: "Nuevo restaurante"
      })
    },
    Restaurants: {
      screen: RestaurantsScreen,
      navigationOptions: () => ({
        title: "Restaurantes"
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

export default RestaurantsScreenStacks;