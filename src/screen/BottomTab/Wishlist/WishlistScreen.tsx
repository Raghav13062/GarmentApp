import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,

  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color, fonts } from '../../../constant';
import ScreenNameEnum from '../../../routes/screenName.enum';
import ProductCard from '../../../component/cart/ProductCard';
import { toggleWishlist } from '../../../redux/feature/wishlistSlice';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const WishlistScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: any) => state.wishlist?.items || []);

  const handleProductPress = React.useCallback((item: any) => {
    navigation.navigate(ScreenNameEnum.ProductDetails, { item });
  }, [navigation]);

  const handleRemoveItem = React.useCallback((item: any) => {
    dispatch(toggleWishlist(item));
  }, [dispatch]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cardWrapper}>
      <ProductCard
        item={item}
        onPress1={() => handleProductPress(item)}
      />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item)}
      >
        <View style={styles.removeIconCircle}>
          <Ionicons name="close" size={16} color={color.white} />
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <FastImage
        style={styles.emptyImage}
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/5089/5089733.png', // Or any relevant placeholder
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
      <Text style={styles.emptySubtitle}>
        Save items that you like in your wishlist to review them later and buy.
      </Text>
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => navigation.navigate(ScreenNameEnum.Dashboard)}
      >
        <Text style={styles.shopNowText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={color.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <View style={styles.headerRight}>
          <Text style={styles.itemCount}>{wishlistItems.length} Items</Text>
        </View>
      </View>

      <FlatList
        data={wishlistItems}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id || item._id)}
        numColumns={2}
        contentContainerStyle={[
          styles.listContainer,
          wishlistItems.length === 0 && { flex: 1 },
        ]}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: color.black,
  },
  headerRight: {
    minWidth: 40,
    alignItems: 'flex-end',
  },
  itemCount: {
    fontSize: 12,
    color: color.textMedium,
    fontFamily: fonts.medium,
  },
  listContainer: {
    padding: 12,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  cardWrapper: {
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  removeIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 24,
    opacity: 0.6,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: color.black,
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 14,
    color: color.textMedium,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  shopNowButton: {
    backgroundColor: color.black,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
  },
  shopNowText: {
    color: color.white,
    fontSize: 16,
    fontFamily: fonts.bold,
  },
});

export default WishlistScreen;
