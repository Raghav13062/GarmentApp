import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from './SearchBar';
import imageIndex from '../assets/imageIndex';

const GramerdHeder = ({
  showIcons = true,
  cartCount = 0,
  onNotificationPress,
  onCartPress,
  gradientColors = ['#F58021', '#862E92'],
  rightIcons = ['notifications', 'shopping-cart'],
  headerStyle,
  iconStyle,
}) => {
  /* ------------------ LOGO ANIMATION ------------------ */
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-2deg', '2deg'],
  });

  /* ------------------ ICON PRESS ANIMATION ------------------ */
  const renderIconButton = (icon, onPress) => {
    const pressAnim = new Animated.Value(1);

    const onPressIn = () =>
      Animated.spring(pressAnim, {
        toValue: 0.9,
        useNativeDriver: true,
      }).start();

    const onPressOut = () =>
      Animated.spring(pressAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();

    return (
      <Animated.View style={{ transform: [{ scale: pressAnim }] }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={onPress}
          style={[styles.iconButton, iconStyle]}
        >
          <Icon name={icon} size={24} color="#fff" />
          {icon === 'shopping-cart' && cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {cartCount > 9 ? '9+' : cartCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.gradientContainer, headerStyle]}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
           <Animated.View
            style={[
              styles.logoWrapper,
              { transform: [{ scale: scaleAnim }, { rotate }] },
            ]}
          >
            <Image source={imageIndex.logo} style={styles.logo} />
            {/* <Text style={styles.appName}>Gramerd</Text> */}
          </Animated.View>

           {showIcons && (
            <View style={styles.headerIcons}>
              {rightIcons.includes('notifications') &&
                renderIconButton('notifications', onNotificationPress)}
              {rightIcons.includes('shopping-cart') &&
                renderIconButton('shopping-cart', onCartPress)}
            </View>
          )}
        </View>

        {/* -------- SEARCH -------- */}
        <SearchBar />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default GramerdHeder;
const styles = StyleSheet.create({
  gradientContainer: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 8,
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
  },

  /* LOGO */
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },

  /* ICONS */
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 14,
    padding: 6,
  },

  /* BADGE */
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});
