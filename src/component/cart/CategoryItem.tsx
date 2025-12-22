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
          source={{ uri: item.image }} 
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
          colors={['transparent', 'rgba(0,0,0,0.1)']}
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
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
     position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    borderRadius: 12,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D1D1F',
    textAlign: 'center',
    marginBottom: 4,
    maxWidth: '100%',
  },
  count: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
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
    backgroundColor: '#f5f5f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  image: {
    width: '70%',
    height: '70%',
    borderRadius: 42.5,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    maxWidth: 90,
  },
});
*/