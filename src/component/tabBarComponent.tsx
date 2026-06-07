import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { color, fonts } from "../constant";

const TAB_CONFIG: Record<string, { label: string; icon: string; activeIcon: string }> = {
  Home: {
    label: "Home",
    icon: "home-outline",
    activeIcon: "home",
  },
  Cart: {
    label: "Category",
    icon: "grid-outline",
    activeIcon: "grid",
  },
  ViewCart: {
    label: "Cart",
    icon: "bag-outline",
    activeIcon: "bag",
  },
  Under: {
    label: "B2B",
    icon: "business-outline",
    activeIcon: "business",
  },
  Profile: {
    label: "Profile",
    icon: "person-outline",
    activeIcon: "person",
  },
};

const TabItem = ({
  route,
  isFocused,
  onPress,
  onLongPress,
  badgeCount,
}: any) => {
  const tab = TAB_CONFIG[route.name] || {
    label: route.name,
    icon: "ellipse-outline",
    activeIcon: "ellipse",
  };

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tab}
    >
      <View style={styles.iconSlot}>
        {isFocused ? (

          <Ionicons name={tab.activeIcon} size={22} color={color.primary} />

        ) : (
          <View style={styles.inactiveIconBox}>
            <Ionicons name={tab.icon} size={23} color={color.textMedium} />
          </View>
        )}

        {route.name === "ViewCart" && badgeCount > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {badgeCount > 99 ? "99+" : badgeCount}
            </Text>
          </View>
        ) : null}
      </View>

      <Text
        numberOfLines={1}
        style={[
          styles.label,
          isFocused ? styles.activeLabel : styles.inactiveLabel,
        ]}
      >
        {tab.label}
      </Text>
    </TouchableOpacity>
  );
};

const BottomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const cartCount = useSelector((reduxState: any) => reduxState.cart?.totalItems || 0);

  return (
    <View style={[styles.outerContainer, { paddingBottom: Math.max(insets.bottom, 10) }]}>



      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const options = descriptors[route.key]?.options;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TabItem
              key={route.key}
              route={route}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              badgeCount={cartCount}
              accessibilityLabel={options?.tabBarAccessibilityLabel}
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
    top: 11,
  },
  tabBar: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: color.white,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",


  },
  tab: {
    flex: 1,
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  iconSlot: {
    width: 42,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  activeIconBox: {
    width: 40,
    height: 34,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",

  },
  inactiveIconBox: {
    width: 33,
    height: 33,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    maxWidth: "100%",
    fontSize: 10,
    marginTop: 3,
    textAlign: "center",
  },
  activeLabel: {
    color: color.primary,
    fontFamily: fonts.bold,
  },
  inactiveLabel: {
    color: color.textMedium,
    fontFamily: fonts.semiBold,
  },
  badge: {
    position: "absolute",
    top: -2,
    right: 0,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: color.error,
    borderWidth: 1.5,
    borderColor: color.white,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: color.white,
    fontSize: 8,
    fontFamily: fonts.bold,
    includeFontPadding: false,
  },
});
