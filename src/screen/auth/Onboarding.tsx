import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../component/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';
import { color, fonts } from '../../constant';

const { width, height } = Dimensions.get('window');

interface Slide {
  id: string;
  title: string;
  highlight?: string;
  description: string;
  image: string;
}

const OnboardingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

const slides: Slide[] = [
  {
    id: '1',
    title: 'Welcome to',
    highlight: ' GarmentApp',
    description:
      'Discover the latest fashion trends with premium quality garments at the best prices.',
    image:
      'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAzL3N0YXJ0dXBpbWFnZXNfcGhvdG9fb2ZfYXNpYW5fd29tYW5fd2l0aF9zaG9wcGluZ19iYWdfc21pbGVfYW5kX19hMGE3YTBkZS03YTNjLTQzMTYtOGU2Ny1jMzc4NTVmZmJlN2Etcm0xNjgzLTAxYV8xLnBuZw.png',
  },
  {
    id: '2',
    title: 'Shop Trendy',
    highlight: ' Clothing',
    description:
      'Explore men, women, and kids wear. Easy browsing, quick add to cart, and smooth checkout.',
    image:
      'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAzL3N0YXJ0dXBpbWFnZXNfcGhvdG9fb2ZfYXNpYW5fd29tYW5fd2l0aF9zaG9wcGluZ19iYWdfc21pbGVfYW5kX19hMGE3YTBkZS03YTNjLTQzMTYtOGU2Ny1jMzc4NTVmZmJlN2Etcm0xNjgzLTAxYV8xLnBuZw.png',
  },
  {
    id: '3',
    title: 'Fast & Reliable',
    highlight: ' Delivery',
    description:
      'Get your favorite outfits delivered quickly with order tracking and dedicated support.',
    image:"https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAyLzI5Ny10ZWQ0NDgxLXRlZGR5LWpvYjE3MDJfMS5wbmc.png"
   },
];


  const onScroll = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const onNextPress = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.replace(ScreenNameEnum.LoginScreen);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={color.white} />

      {currentIndex < slides.length - 1 && (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.replace(ScreenNameEnum.LoginScreen)}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.title}>
              {item.title}
              <Text style={styles.highlight}>{item.highlight}</Text>
            </Text>

            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <CustomButton
          title={
            currentIndex === slides.length - 1
              ? 'Start Shopping'
              : 'Next'
          }
          onPress={onNextPress}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#6B7280',
  },
  slide: {
    width,
    alignItems: 'center',
    paddingTop: height * 0.1,
    paddingHorizontal: 30,
  },
  image: {
    width: width * 0.75,
    height: height * 0.35,
    borderRadius: 16,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontFamily: fonts.bold,
    color: '#111827',
    textAlign: 'center',
  },
  highlight: {
    color: color.primary,
  },
  description: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 22,
    backgroundColor: color.primary,
  },
  button: {
    width: width * 0.85,
    height: 54,
    borderRadius: 28,
   },
  buttonText: {
    fontSize: 17,
    fontFamily: fonts.semiBold,
  },
});
