import React, { useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  useSharedValue, 
  withTiming,
  interpolateColor
} from "react-native-reanimated";
import { color, fonts } from "../constant";
import imageIndex from "../assets/imageIndex";

const { width } = Dimensions.get("window");

const TabItem = ({ route, isFocused, onPress, index }: any) => {
  const icons: any = {
    Home: "home-outline",
    Cart: "cart-outline",
    Under: "business-outline",
    Profile: "person-outline",
  };

  // Animation values
  const scale = useSharedValue(isFocused ? 1.15 : 1);
  const opacity = useSharedValue(isFocused ? 1 : 0.7);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1.15 : 1, { damping: 12, stiffness: 100 });
    opacity.value = withTiming(isFocused ? 1 : 0.7);
  }, [isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.tab}
    >
      <Animated.View style={[styles.iconWrapper, animatedIconStyle]}>
        {route.name === "Cart" ? (
          <Image
            source={imageIndex.under}
            style={styles.cartImage}
            resizeMode="contain"
          />
        ) : (
          <Ionicons
            name={icons[route.name] || "ellipse"}
            size={24}
            color={isFocused ? color.StatusBar : "#555"}
          />
        )}
      </Animated.View>
      
      {route.name !== "Cart" && (
        <Animated.Text
          style={[
            styles.label,
            { color: isFocused ? color.StatusBar : "#555" },
            animatedTextStyle
          ]}
        >
          {route.name}
        </Animated.Text>
      )}
    </TouchableOpacity>
  );
};

const BottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const totalTabs = state.routes.length;
  const tabWidth = width / totalTabs;
  
  // Indicator animation
  const translateX = useSharedValue(state.index * tabWidth);

  useEffect(() => {
    translateX.value = withSpring(state.index * tabWidth, {
      damping: 15,
      stiffness: 120,
    });
  }, [state.index, tabWidth]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.outerContainer}>
      <View style={styles.tabBar}>
        {/* Sliding Indicator (Line at the bottom) */}
        <Animated.View style={[styles.indicator, { width: tabWidth }, indicatorStyle]}>
          <View style={styles.indicatorLine} />
        </Animated.View>

        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          return (
            <TabItem
              key={route.key}
              route={route}
              isFocused={isFocused}
              index={index}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: color.white,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  tabBar: {
    flexDirection: "row",
    height: 65,
    backgroundColor: color.white,
    paddingBottom: 5,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 11,
    fontFamily: fonts.semiBold,
    marginTop: 4,
  },
  cartImage: {
    width: 48,
    height: 48,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorLine: {
    width: '40%',
    height: '100%',
    backgroundColor: color.StatusBar,
    borderRadius: 2,
  },
});
