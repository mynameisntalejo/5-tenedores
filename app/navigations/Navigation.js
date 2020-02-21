import React from "react";
import {Icon} from "react-native-elements";
import {createAppContainer} from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";
import RestaurantsScreenStacks from "./RestaurantsStacks";
import TopRestaurantsScreenStacks from "./TopRestaurantsStacks";
import SearchScreenStacks from "./SearchStacks";
import MyAccountScreenStacks from "./MyAccountStacks";

const NavigationStacks = createBottomTabNavigator(
  {
    Restaurants: {
      screen: RestaurantsScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Restaurantes",
        tabBarIcon: ({tintColor}) => (
          <Icon type="material-community"
                name="compass-outline"
                size={22}
                color={tintColor}
          />
        )
      })
    },
    TopRestaurants: {
      screen: TopRestaurantsScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Ranking",
        tabBarIcon: ({tintColor}) => (
          <Icon type="material-community"
                name="star-outline"
                size={22}
                color={tintColor}
          />
        )
      })
    },
    Search: {
      screen: SearchScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Buscar",
        tabBarIcon: ({tintColor}) => (
          <Icon type="material-community"
                name="magnify"
                size={22}
                color={tintColor}
          />
        )
      })
    },
    MyAccount: {
      screen: MyAccountScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Mi cuenta",
        tabBarIcon: ({tintColor}) => (
          <Icon type="material-community"
                name="home-outline"
                size={22}
                color={tintColor}
          />
        )
      })
    },
  },
  {
    initialRouteName: "Restaurants",
    order: ["Restaurants", "TopRestaurants", "Search", "MyAccount"],
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680",
    },
    card: {
      backgroundColor: "#fff",
    }
  }
);

export default createAppContainer(NavigationStacks);