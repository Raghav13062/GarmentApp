import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { color } from "../constant";
import imageIndex from "../assets/imageIndex";

const BottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const icons: any = {
  Home: "home-outline",
  Cart: "cart-outline", // not used (image used)
  Under: "business-outline",
  Profile: "person-outline",
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(route.name)}
            >
              {route.name === "Cart" ? (
                <View style={styles.cartWrapper}>
                  <Image
                    source={imageIndex.under}
                    style={styles.cartImage}
                    resizeMode="contain"
                  />
                  
                </View>
              ) : (
                <Ionicons
                  name={icons[route.name] || "ellipse"}
                  size={25}
                  color={isFocused ? color.StatusBar : "#000"}
                />
              )}

              {route.name !== "Cart" && (
                <Text
                  style={[
                    styles.label,
                    { color: isFocused ? color.StatusBar : "#000" },
                  ]}
                >
                  {route.name}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 5,
  },
  tabBar: {
    flexDirection: "row",
    paddingVertical: 12,
    justifyContent: "space-around",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 13,
    marginTop:5
  },
  cartWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  cartImage: {
    width: 55,
    height: 55,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
