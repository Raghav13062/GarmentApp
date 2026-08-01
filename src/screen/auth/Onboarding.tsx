import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../component/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';
import { color, fonts, spacing, radius } from '../../constant';
 
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
      highlight: ' Garment App',
      description:
        'Discover the latest fashion trends with premium quality garments at the best prices.',
      image: "https://img.pikbest.com/png-images/20191028/e-commerce-shopping-festival-shopping-gif_2515306.png!bw700"

    }, {
      id: '2',
      title: 'Shop Trendy',
      highlight: ' Clothing',
      description:
        'Explore men, women, and kids wear. Easy browsing, quick add to cart, and smooth checkout.',
      image: "https://img.pikbest.com/png-images/20191028/little-girl-pushing-a-shopping-cart-to-buy-things-gif_2515300.png!sw800"
    },
    {
      id: '3',
      title: 'Fast & Reliable',
      highlight: ' Delivery',
      description:
        'Get your favorite outfits delivered quickly with order tracking and dedicated support.',
      image: "https://miro.medium.com/1*D-ZiKd0B00tdifaB2X3tKQ.gif"
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
      navigation.replace(ScreenNameEnum.BottomTabs);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={color.background} />

      {currentIndex < slides.length - 1 && (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.replace(ScreenNameEnum.BottomTabs)}
        >
          <Text allowFontScaling={false} style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* <FlatList
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

            <FastImage
              style={styles.image}
              source={{
                uri: item?.image,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />

            <Text allowFontScaling={false} style={styles.title}>
              {item.title}
              <Text allowFontScaling={false} style={styles.highlight}>{item.highlight}</Text>
            </Text>

            <Text allowFontScaling={false} style={styles.description}>{item.description}</Text>
          </View>
        )}
      /> */}

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
    backgroundColor: color.background,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: spacing.xl,
    zIndex: 10,
  },
  skipText: {
    fontSize: 17,
    fontFamily: fonts.medium,
    color: color.textDark,
  },
  slide: {
    width,
    alignItems: 'center',
    paddingTop: height * 0.1,
    paddingHorizontal: spacing.xxxl,
  },
  image: {
    width: width * 0.70,
    height: height * 0.45,
    borderRadius: radius.md,
    marginBottom: spacing.xxxl,
  },
  title: {
    fontSize: 25,
    fontFamily: fonts.bold,
    color: color.textDark,
    textAlign: 'center',
  },
  highlight: {
    color: color.primary,
  },
  description: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: color.textMedium,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    bottom: spacing.xxxl + 8,
    width: '100%',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xxl,
  },
  dot: {
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: color.borderLight,
    marginHorizontal: spacing.xs,
  },
  activeDot: {
    width: 22,
    backgroundColor: color.primary,
  },
  button: {
    width: width * 0.85,
    height: 48,
    borderRadius: radius.md,
  },
  buttonText: {
    fontSize: 17,
    fontFamily: fonts.semiBold,
  },
});
