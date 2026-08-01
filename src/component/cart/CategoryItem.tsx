import { color, fonts, radius } from "../../constant";
import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
 import ScreenNameEnum from '../../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 3; // 3 items per row with spacing

const CategoryItem = ({ item }: any) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate(ScreenNameEnum.OtherCategoryData, { 
          categoryId: item.id,
          categoryName: item.title 
        });
      }}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: typeof item.image === 'string' ? item.image.replace(/\.avif$/i, '.webp') : item.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        {item.isNew && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>NEW</Text>
          </View>
        )}
        
        {/* Gradient overlay for better text visibility */}
        <LinearGradient
          colors={[color.transparent, color.overlay]}
          style={styles.gradient}
        />
      </View>
      
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      
      {item.count && (
        <Text style={styles.count}>
          {item.count} items
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  imageContainer: {
    width: ITEM_WIDTH - 20,
    height: ITEM_WIDTH - 20,
    borderRadius: radius.lg,
    backgroundColor: color.imagePlaceholder,
    overflow: 'hidden',
    marginBottom: 10,
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
     position: 'relative',
    borderWidth: 1,
    borderColor: color.borderLight,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: radius.lg,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    borderRadius: radius.lg,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: color.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  badgeText: {
    color: color.white,
    fontSize: 10,
    fontFamily: fonts.bold,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: color.textDark,
    textAlign: 'center',
    marginBottom: 4,
    maxWidth: '100%',
  },
  count: {
    fontSize: 12,
    color: color.textLight,
    fontFamily: fonts.medium,
  },
});

// Alternative minimalist style (uncomment to use):
/*
const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  imageContainer: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: color.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: color.lightGray,
  },
  image: {
    width: '70%',
    height: '70%',
    borderRadius: 42.5,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: color.textDark,
    textAlign: 'center',
    maxWidth: 90,
  },
});
*/