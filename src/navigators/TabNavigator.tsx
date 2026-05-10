import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabBar from "../component/tabBarComponent";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../routes/screenName.enum";

import HomeScreen from "../screen/BottomTab/Dashboard/DashboardScreen";
import Under from "../screen/BottomTab/Cart/Under/Under";
import ProfileScreen from "../screen/Profile/ProfileScreen/ProfileScreen";
import B2BBulkScreen from "../screen/BottomTab/B2BBulkScreen/B2BBulkScreen";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const isLogin = useSelector((state: any) => state.auth.isLogin);
  const navigation = useNavigation<any>();

  const protectedTabListener = ({ navigation, route }: any) => ({
    tabPress: (e: any) => {
      if (!isLogin) {
        e.preventDefault();
        navigation.navigate(ScreenNameEnum.LoginScreen);
      }
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
 
      <Tab.Screen name="Cart" component={Under} listeners={protectedTabListener} />
      <Tab.Screen name="Under" component={B2BBulkScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
