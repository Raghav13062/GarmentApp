import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;
import { color, fonts, radius, spacing } from '../constant';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  SharedValue,
} from 'react-native-reanimated';

interface HeaderBarProps {
  scrollY?: SharedValue<number>;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const HeaderBar: React.FC<HeaderBarProps> = ({ scrollY }) => {
  const navigator = useNavigation<any>();
  const wishlistCount = useSelector((state: any) => state.wishlist?.items?.length || 0);
  const cartCount = useSelector((state: any) => state.cart?.totalItems || 0);
  const isLogin = useSelector((state: any) => state.auth?.isLogin);
  const userData = useSelector((state: any) => state.auth?.userData);

  const displayName = isLogin && userData?.fullName ? userData.fullName : 'Guest';
  const displayAddress =
    isLogin && userData?.address ? userData.address : 'Select delivery location';

  const handleWishlistPress = React.useCallback(() => {
    navigator.navigate(ScreenNameEnum.WishList);
  }, [navigator]);

  const handleCartPress = React.useCallback(() => {
    navigator.navigate(ScreenNameEnum.ViewCartScreen);
  }, [navigator]);

  const handleSearchPress = React.useCallback(() => {
    navigator.navigate(ScreenNameEnum.SearchProduct);
  }, [navigator]);

  const handleAddressPress = React.useCallback(() => {
    navigator.navigate(ScreenNameEnum.Address);
  }, [navigator]);

  const addressBarAnimatedStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};
    const height = interpolate(scrollY.value, [0, 50], [30, 0], Extrapolate.CLAMP);
    const opacity = interpolate(scrollY.value, [0, 40], [1, 0], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [0, 50], [0, -15], Extrapolate.CLAMP);
    return {
      height,
      opacity,
      transform: [{ translateY }],
      overflow: 'hidden' as const,
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};
    const elevation = interpolate(scrollY.value, [0, 50], [0, 4], Extrapolate.CLAMP);
    const shadowOpacity = interpolate(scrollY.value, [0, 50], [0, 0.08], Extrapolate.CLAMP);
    return {
      elevation,
      shadowOpacity,
      shadowColor: color.black,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      zIndex: 10,
    };
  });

  const headerRowAnimatedStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};
    const paddingVertical = interpolate(scrollY.value, [0, 50], [8, 4], Extrapolate.CLAMP);
    return { paddingVertical };
  });

  const searchWrapperAnimatedStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};
    const height = interpolate(scrollY.value, [0, 50], [40, 34], Extrapolate.CLAMP);
    return { height };
  });

  const rightIconsAnimatedStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};
    const scale = interpolate(scrollY.value, [0, 50], [1, 0.92], Extrapolate.CLAMP);
    return { transform: [{ scale }] };
  });

  return (
    <Animated.View style={[styles.shell, headerAnimatedStyle]}>
      <View style={styles.mainContainer}>
        <Animated.View style={addressBarAnimatedStyle}>
          <TouchableOpacity
            style={styles.addressBar}
            onPress={handleAddressPress}
            activeOpacity={0.8}
          >
            <Icon name="location-sharp" size={14} color={color.primary} />
            <Text style={styles.addressText} numberOfLines={1}>
              Deliver to{' '}
              <Text style={styles.boldText}>
                {displayName} - {displayAddress}
              </Text>
            </Text>
            <Icon name="chevron-down" size={14} color={color.primary} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.headerRow, headerRowAnimatedStyle]}>
          <Text style={styles.brandLogo}>SareeLoom</Text>

          <AnimatedTouchableOpacity
            style={[styles.searchWrapper, searchWrapperAnimatedStyle]}
            onPress={handleSearchPress}
            activeOpacity={0.9}
          >
            <Icon name="search-outline" size={18} color={color.textMedium} />
            <Text style={styles.searchText}>Search sarees</Text>
          </AnimatedTouchableOpacity>

          <Animated.View style={[styles.rightIcons, rightIconsAnimatedStyle]}>
            <TouchableOpacity
              onPress={handleWishlistPress}
              style={styles.iconItem}
              activeOpacity={0.7}
            >
              <Icon name="heart-outline" size={24} color={color.primary} />
              {wishlistCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{wishlistCount}</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCartPress}
              style={styles.iconItem}
              activeOpacity={0.7}
            >
              <Icon name="bag-outline" size={24} color={color.primary} />
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  shell: {
    backgroundColor: color.background,
    borderBottomWidth: 1,
    borderBottomColor: color.borderLight,
  },
  mainContainer: {
    paddingTop: STATUSBAR_HEIGHT + 4,
    paddingBottom: spacing.sm,
    backgroundColor: color.background,
  },
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: 4,
  },
  addressText: {
    fontSize: 11,
    color: color.textMedium,
    marginHorizontal: 5,
    fontFamily: fonts.regular,
    flex: 1,
  },
  boldText: {
    fontFamily: fonts.semiBold,
    color: color.textDark,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  brandLogo: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: color.primary,
    marginRight: spacing.sm,
    letterSpacing: 0.3,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    height: 40,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: color.borderLight,
  },
  searchText: {
    flex: 1,
    marginLeft: spacing.sm,
    color: color.textLight,
    fontSize: 13,
    fontFamily: fonts.regular,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconItem: {
    marginLeft: spacing.md,
    position: 'relative',
    padding: 2,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: color.primary,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: color.white,
    fontSize: 9,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
});

export default React.memo(HeaderBar);
