import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import imageIndex from '../assets/imageIndex';
import { color, fonts } from '../constant';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

interface HeaderBarProps {
  genderOptions?: string[];
  currentGender?: string;
  setGender?: (gender: string) => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  genderOptions = [],
  currentGender,
  setGender,
}) => {
  const navigator = useNavigation<any>();
  const wishlistCount = useSelector((state: any) => state.wishlist?.items?.length || 0);
  const user = useSelector((state: any) => state.auth?.user);

  const displayName = user?.name || 'ashish mahant';
  const displayAddress = user?.address || 'Plot no. 114, lin...';

  const handleWishlistPress = React.useCallback(() => {
    navigator.navigate(ScreenNameEnum.WishList);
  }, [navigator]);

  return (
    <View style={styles.mainContainer}>
      {/* Address Bar */}
      <View style={styles.addressBar}>
        <Icon name="location-sharp" size={14} color="#333" />
        <Text style={styles.addressText} numberOfLines={1}>
          Deliver to <Text style={styles.boldText}>{displayName} - {displayAddress}</Text>
        </Text>
        <Icon name="chevron-down" size={16} color="#333" />
      </View>

      {/* Search & Icons Row */}
      <View style={styles.headerRow}>
        <View style={styles.searchWrapper}>
          <Image source={imageIndex.logo} style={styles.myntraLogo} resizeMode="contain" />
          <Text style={styles.searchText}>"Shirts"</Text>
          <Icon name="search-outline" size={20} color="#666" />
        </View>

        <View style={styles.rightIcons}>
          <View style={styles.iconItem}>
            <Icon name="notifications-outline" size={26} color="#333" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleWishlistPress} style={styles.iconItem}>
            <Icon name="heart-outline" size={26} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconItem}>
            <Icon name="person-outline" size={26} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs Row */}
      <View style={styles.tabsContainer}>
        <View style={styles.bottomLine} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {genderOptions.map((item) => {
            const isActive = currentGender === item;
            const label = item?.toUpperCase();
            return (
              <TouchableOpacity
                key={item}
                onPress={() => setGender && setGender(item)}
                style={[styles.tab, isActive && styles.activeTab]}
              >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={styles.gridIconWrapper}>
          <View style={styles.gridIcon}>
            <Icon name="apps" size={18} color="#fff" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFF0F3', // Light pink background from image
    paddingTop: 5,
  },
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  addressText: {
    fontSize: 12,
    color: '#444',
    marginHorizontal: 4,
    fontFamily: fonts.regular,
  },
  boldText: {
    fontFamily: fonts.bold,
    color: '#000',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 45,
    borderRadius: 25,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 10,
  },
  myntraLogo: {
    width: 24,
    height: 24,
  },
  searchText: {
    flex: 1,
    marginLeft: 10,
    color: '#999',
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconItem: {
    marginLeft: 15,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3F6C',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontFamily: fonts.bold,
  },
  tabsContainer: {
    height: 45,
    position: 'relative',
    marginTop: 5,
  },
  bottomLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: '#FF3F6C',
    zIndex: 1,
  },
  scrollContent: {
    paddingHorizontal: 10,
    alignItems: 'flex-end',
  },
  tab: {
    paddingHorizontal: 20,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  activeTab: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 1.5,
    borderColor: '#FF3F6C',
    borderBottomWidth: 0,
    height: 40,
    zIndex: 2,
    marginBottom: -1.5, // Overlap the bottom line
  },
  tabText: {
    fontSize: 13,
    fontFamily: fonts.bold,
    color: '#444',
    letterSpacing: 0.5,
  },
  activeTabText: {
    color: '#FF3F6C',
  },
  gridIconWrapper: {
    position: 'absolute',
    right: 15,
    bottom: 8,
    zIndex: 3,
  },
  gridIcon: {
    backgroundColor: '#333',
    padding: 4,
    borderRadius: 6,
  },
});

export default React.memo(HeaderBar);
