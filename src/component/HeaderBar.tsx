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
import { color, fonts } from '../constant';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useAnimatedStyle, interpolate, Extrapolate, SharedValue } from 'react-native-reanimated';

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

  const displayName = isLogin && userData?.fullName ? userData.fullName : 'ashish mahant';
  const displayAddress = isLogin && userData?.address ? userData.address : 'Plot no. 114, lin...';

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
      overflow: 'hidden',
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};
    const elevation = interpolate(scrollY.value, [0, 50], [0, 5], Extrapolate.CLAMP);
    const shadowOpacity = interpolate(scrollY.value, [0, 50], [0, 0.15], Extrapolate.CLAMP);
    return {
      elevation,
      shadowOpacity,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      zIndex: 10,
    };
  });

  const headerRowAnimatedStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};
    const paddingVertical = interpolate(scrollY.value, [0, 50], [8, 4], Extrapolate.CLAMP);
    return {
      paddingVertical,
    };
  });

  const searchWrapperAnimatedStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};
    const height = interpolate(scrollY.value, [0, 50], [40, 34], Extrapolate.CLAMP);
    return {
      height,
    };
  });

  const rightIconsAnimatedStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};
    const scale = interpolate(scrollY.value, [0, 50], [1, 0.92], Extrapolate.CLAMP);
    return {
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={headerAnimatedStyle}>
      <LinearGradient
        colors={color.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.mainContainer}
      >
        {/* Address Bar */}
        <Animated.View style={addressBarAnimatedStyle}>
          <TouchableOpacity
            style={styles.addressBar}
            onPress={handleAddressPress}
            activeOpacity={0.8}
          >
            <Icon name="location-sharp" size={15} color={color.white} />
            <Text style={styles.addressText} numberOfLines={1}>
              Deliver to <Text style={styles.boldText}>{displayName} - {displayAddress}</Text>
            </Text>
            <Icon name="chevron-down" size={14} color={color.white} style={{ marginLeft: 2 }} />
          </TouchableOpacity>
        </Animated.View>

        {/* Search & Icons Row */}
        <Animated.View style={[styles.headerRow, headerRowAnimatedStyle]}>
          <AnimatedTouchableOpacity
            style={[styles.searchWrapper, searchWrapperAnimatedStyle]}
            // onPress={handleSearchPress}
            activeOpacity={0.9}
          >
            <Icon name="search-outline" size={18} color={color.textMedium} />
            <Text style={styles.searchText}>Search </Text>
          </AnimatedTouchableOpacity>

          <Animated.View style={[styles.rightIcons, rightIconsAnimatedStyle]}>
            {/* Wishlist */}
            <TouchableOpacity

              onPress={handleWishlistPress}

              style={styles.iconItem} activeOpacity={0.7}>
              <Icon name="heart-outline" size={25} color={color.white} />
              {wishlistCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{wishlistCount}</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Cart */}
            <TouchableOpacity onPress={handleCartPress} style={styles.iconItem} activeOpacity={0.7}>
              <Icon name="bag-outline" size={25} color={color.white} />
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: STATUSBAR_HEIGHT + 5,
    paddingBottom: 8,
  },
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  addressText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 5,
    fontFamily: fonts.regular,
    flex: 1,
  },
  boldText: {
    fontFamily: fonts.bold,
    color: color.white,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchText: {
    flex: 1,
    marginLeft: 8,
    color: color.textLight,
    fontSize: 13,
    fontFamily: fonts.regular,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconItem: {
    marginLeft: 16,
    position: 'relative',
    padding: 2,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: color.white,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#862E92', // purple contrast color
    fontSize: 9,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
});

export default React.memo(HeaderBar);
