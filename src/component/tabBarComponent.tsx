import React, { useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text, Dimensions, Platform } from "react-native";
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
const TAB_WIDTH = width / 4;

const TabItem = ({ route, isFocused, onPress }: any) => {
  const icons: any = {
    Home: isFocused ? "home" : "home-outline",
    Cart: isFocused ? "pricetag" : "pricetag-outline",
    ViewCart: isFocused ? "cart" : "cart-outline",
    Under: isFocused ? "business" : "business-outline",
    Profile: isFocused ? "person" : "person-outline",
  };

  const scale = useSharedValue(1);

  useEffect(() => {
    if (isFocused) {
      scale.value = withSpring(1.1, { damping: 12, stiffness: 100 });
    } else {
      scale.value = withSpring(1);
    }
  }, [isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    color: isFocused ? '#F58021' : '#555',
  }));

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.tab}
    >
      <View style={styles.iconContainer}>
        <Animated.View style={animatedIconStyle}>
          <Ionicons
            name={icons[route.name] || "ellipse"}
            size={24}
            color={isFocused ? '#F58021' : '#555'}
          />
        </Animated.View>
      </View>

      <Text
        style={[
          styles.label,
          {
            color: isFocused ? '#FF3F6C' : '#555',
            fontFamily: isFocused ? fonts.bold : fonts.semiBold
          }
        ]}
      >
        {route.name === "Under" ? "B2B" : route.name === "Cart" ? "Under 999" : route.name === "ViewCart" ? "Cart" : route.name}
      </Text>
    </TouchableOpacity>
  );
};

const BottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const tabWidth = width / state.routes.length;
  const translateX = useSharedValue(state.index * tabWidth);

  useEffect(() => {
    translateX.value = withSpring(state.index * tabWidth, {
      damping: 18,
      stiffness: 150,
    });
  }, [state.index, tabWidth]);

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.outerContainer}>
      <View style={styles.tabBar}>
        {/* Sliding Pill Background */}
        <Animated.View style={[styles.pillContainer, { width: tabWidth }, pillStyle]}>
          <View style={styles.pill} />
        </Animated.View>

        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          return (
            <TabItem
              key={route.key}
              route={route}
              isFocused={isFocused}
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  tabBar: {
    flexDirection: "row",
    height: 65,
    backgroundColor: color.white,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    zIndex: 1,
  },
  iconContainer: {
    width: 45,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillContainer: {
    position: 'absolute',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8, // Align with icons
  },
  pill: {
    width: 45,
    height: 32,
    backgroundColor: '#FFF0F3',
    borderRadius: 16,
    position: 'absolute',
    top: 8, // Match iconContainer position
  },
  label: {
    fontSize: 10,
    fontFamily: fonts.semiBold,
    marginTop: 4,
    letterSpacing: 0.2,
  },
});
