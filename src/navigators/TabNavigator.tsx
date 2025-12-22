import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabBar from "../component/tabBarComponent";

import HomeScreen from "../screen/BottomTab/Dashboard/DashboardScreen";
import Under from "../screen/BottomTab/Cart/Under/Under";
 import ProfileScreen from "../screen/Profile/ProfileScreen/ProfileScreen";
import B2BBulkScreen from "../screen/BottomTab/B2BBulkScreen/B2BBulkScreen";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
 
      <Tab.Screen name="Cart" component={Under} />
      <Tab.Screen name="Under" component={B2BBulkScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
