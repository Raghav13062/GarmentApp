import React from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { color, fonts } from '../../../constant';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { toggleWishlist } from '../../../redux/feature/wishlistSlice';

const { width } = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;
const CARD_GAP = 12;
const CARD_WIDTH = (width - 44) / 2;

const getProductId = (item: any) => String(item?._id || item?.id || item?.productId || '');

const getProductInfo = (item: any) => {
  const mrp = Number(item?.pricing?.mrp || item?.mrp || item?.originalPrice || item?.price || 0);
  const sellingPrice = Number(
    item?.pricing?.sellingPrice ||
      item?.sellingPrice ||
      item?.discountPrice ||
      item?.price ||
      mrp ||
      0,
  );
  const rawImage =
    item?.images?.[0] ||
    item?.baseImages?.[0] ||
    item?.image ||
    'https://via.placeholder.com/300';

  return {
    title: item?.title || item?.name || 'Product',
    brand: item?.brand?.name || item?.brand || item?.categoryId?.name || 'Kimbo',
    image: typeof rawImage === 'string' ? rawImage.replace(/\.avif$/i, '.webp') : rawImage,
    mrp,
    sellingPrice,
    discount:
      mrp > sellingPrice
        ? Math.round(((mrp - sellingPrice) / mrp) * 100)
        : item?.pricing?.discountPercentage || item?.discountPercentage || 0,
    rating: item?.ratings?.average || item?.rating || 4.2,
  };
};

const WishlistScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: any) => state.wishlist?.items || []);

  const handleProductPress = React.useCallback(
    (item: any) => {
      navigation.navigate(ScreenNameEnum.ProductDetails, { item });
    },
    [navigation],
  );

  const handleToggleFavorite = React.useCallback(
    (item: any) => {
      dispatch(toggleWishlist(item));
    },
    [dispatch],
  );

  const renderItem = ({ item }: { item: any }) => {
    const product = getProductInfo(item);

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() => handleProductPress(item)}
      >
        <View style={styles.imageWrap}>
          <FastImage
            source={{ uri: product.image, priority: FastImage.priority.normal }}
            style={styles.productImage}
            resizeMode={FastImage.resizeMode.cover}
          />

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.favoriteButton}
            onPress={() => handleToggleFavorite(item)}
          >
            <Ionicons name="heart" size={18} color={color.error} />
          </TouchableOpacity>

          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Ionicons name="star" size={10} color="#1A9C4A" />
          </View>
        </View>

        <View style={styles.cardBody}>
          <Text numberOfLines={1} style={styles.brandText}>
            {product.brand}
          </Text>
          <Text numberOfLines={2} style={styles.titleText}>
            {product.title}
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceText}>₹{product.sellingPrice}</Text>
            {product.mrp > product.sellingPrice && (
              <>
                <Text style={styles.mrpText}>₹{product.mrp}</Text>
                <Text style={styles.discountText}>{product.discount}% OFF</Text>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <Ionicons name="heart-outline" size={56} color={color.primary} />
      </View>
      <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
      <Text style={styles.emptySubtitle}>
        Favourite styles will appear here so you can find them quickly later.
      </Text>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.shopNowButton}
        onPress={() => navigation.navigate(ScreenNameEnum.BottomTabs)}
      >
        <LinearGradient
          colors={color.primaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.shopNowText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBarComponent barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <LinearGradient
        colors={color.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.headerGradient, { paddingTop: STATUSBAR_HEIGHT + 10 }]}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerIcon}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color={color.white} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>My Wishlist</Text>
            <Text style={styles.headerSubtitle}>
              {wishlistItems.length} favourite {wishlistItems.length === 1 ? 'item' : 'items'}
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons name="heart" size={21} color={color.white} />
          </View>
        </View>
      </LinearGradient>

      <FlatList
        data={wishlistItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => getProductId(item) || String(index)}
        numColumns={2}
        contentContainerStyle={[
          styles.listContainer,
          wishlistItems.length === 0 && styles.emptyListContainer,
        ]}
        columnWrapperStyle={wishlistItems.length > 0 ? styles.columnWrapper : undefined}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundLight,
  },
  headerGradient: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    elevation: 5,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  header: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: color.white,
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: 'rgba(255,255,255,0.86)',
    marginTop: 2,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
  },
  emptyListContainer: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  columnWrapper: {
    gap: CARD_GAP,
    marginBottom: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: color.white,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: color.borderLight,
    elevation: 2,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: color.lightGray,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.94)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  ratingBadge: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    fontFamily: fonts.bold,
    color: color.textDark,
  },
  cardBody: {
    padding: 10,
  },
  brandText: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: color.textDark,
  },
  titleText: {
    minHeight: 34,
    fontSize: 12,
    color: color.textMedium,
    lineHeight: 17,
    marginTop: 3,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 7,
    gap: 4,
  },
  priceText: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: color.textDark,
  },
  mrpText: {
    fontSize: 11,
    color: color.textLight,
    textDecorationLine: 'line-through',
  },
  discountText: {
    fontSize: 10,
    fontFamily: fonts.bold,
    color: color.primary,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  emptyIconCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    elevation: 3,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  emptyTitle: {
    fontSize: 21,
    fontFamily: fonts.bold,
    color: color.textDark,
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: color.textMedium,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 28,
  },
  shopNowButton: {
    minWidth: 150,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopNowText: {
    color: color.white,
    fontSize: 15,
    fontFamily: fonts.bold,
  },
});

export default WishlistScreen;
