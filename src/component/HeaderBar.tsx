import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { color, fonts } from '../constant';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const HeaderBar: React.FC = () => {
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

  return (
    <View style={styles.mainContainer}>
      {/* Address Bar */}
      <TouchableOpacity 
        style={styles.addressBar} 
        onPress={handleAddressPress}
        activeOpacity={0.8}
      >
        <Icon name="location-sharp" size={15} color={color.primary} />
        <Text style={styles.addressText} numberOfLines={1}>
          Deliver to <Text style={styles.boldText}>{displayName} - {displayAddress}</Text>
        </Text>
        <Icon name="chevron-down" size={14} color={color.textMedium} style={{ marginLeft: 2 }} />
      </TouchableOpacity>

      {/* Search & Icons Row */}
      <View style={styles.headerRow}>
        <TouchableOpacity 
          style={styles.searchWrapper}
          onPress={handleSearchPress}
          activeOpacity={0.9}
        >
          <Icon name="search-outline" size={18} color={color.textMedium} />
          <Text style={styles.searchText}>Search for products, brands and more...</Text>
        </TouchableOpacity>

        <View style={styles.rightIcons}>
          {/* Wishlist */}
          <TouchableOpacity onPress={handleWishlistPress} style={styles.iconItem} activeOpacity={0.7}>
            <Icon name="heart-outline" size={25} color={color.textDark} />
            {wishlistCount > 0 && (
              <LinearGradient 
                colors={color.primaryGradient}
                style={styles.badge}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.badgeText}>{wishlistCount}</Text>
              </LinearGradient>
            )}
          </TouchableOpacity>

          {/* Cart */}
          <TouchableOpacity onPress={handleCartPress} style={styles.iconItem} activeOpacity={0.7}>
            <Icon name="bag-outline" size={25} color={color.textDark} />
            {cartCount > 0 && (
              <LinearGradient 
                colors={color.primaryGradient}
                style={styles.badge}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.badgeText}>{cartCount}</Text>
              </LinearGradient>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Themed Bottom Line Separator */}
      <LinearGradient 
        colors={color.primaryGradient}
        style={styles.bottomLine}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFF9F6', // Light warm orange matching primary
    paddingTop: 5,
  },
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  addressText: {
    fontSize: 12,
    color: color.textDark,
    marginHorizontal: 5,
    fontFamily: fonts.regular,
    flex: 1,
  },
  boldText: {
    fontFamily: fonts.bold,
    color: color.black,
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
    borderWidth: 1,
    borderColor: color.borderLight,
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
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: color.white,
    paddingHorizontal: 3,
  },
  badgeText: {
    color: color.white,
    fontSize: 8.5,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  bottomLine: {
    height: 2,
    width: '100%',
    marginTop: 4,
  },
});

export default React.memo(HeaderBar);
