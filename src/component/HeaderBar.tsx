import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import imageIndex from '../assets/imageIndex';
import { color, fonts } from '../constant';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import Svg, {
  Text as SvgText,
  Defs,
  LinearGradient as SvgGradient,
  Stop,
} from 'react-native-svg';

interface HeaderBarProps {
  genderOptions?: string[];
  currentGender?: string;
  setGender?: (gender: string) => void;
}


const GradientText = ({ text, colors }: { text: string; colors: string[] }) => {
  return (
    <Svg height="40" width="160">
      <Defs>
        <SvgGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={colors[0]} stopOpacity="1" />
          <Stop offset="1" stopColor={colors[1]} stopOpacity="1" />
        </SvgGradient>
      </Defs>
      <SvgText
        fill="url(#grad)"
        fontSize="28"
        fontFamily={fonts.bold}
        x="80"
        fontWeight={"700"}
        y="30"
        textAnchor="middle"
        letterSpacing="2"
      >
        {text?.toUpperCase()}
      </SvgText>
    </Svg>
  );
};

const HeaderBar: React.FC<HeaderBarProps> = ({
  genderOptions = [],
  currentGender,
  setGender,
}) => {
  const navigator = useNavigation();

  return (
    <View style={styles.mainContainer}>
      {/* Top Row: SHEIN Style */}
      <View style={styles.topRow}>
        {/* Left: Message Icon */}
        <View style={styles.leftSection}>
          <TouchableOpacity style={styles.iconButton}>
            <View>
              <Icon name="mail-outline" size={28} color={color.black} />
              <LinearGradient
                colors={['#ff4d4d', color.error]}
                style={styles.badge}
              >
                <Text style={styles.badgeText}>9+</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>

        {/* Center: Logo */}
        <View style={styles.centerSection}>
          <TouchableOpacity onPress={() => navigator.navigate(ScreenNameEnum.Dashboard)}>
            <GradientText text="Garment" colors={color.buttLinearGradient} />
          </TouchableOpacity>
        </View>

        {/* Right: Icons */}
        <View style={styles.rightSection}>
          {/* <TouchableOpacity style={styles.iconButton}>
            <Icon name="search-outline" size={28} color={color.black} />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.iconButton}
          // onPress={() => navigator.navigate(ScreenNameEnum.WishList)}
          >
            <View>
              <Icon name="heart-outline" size={28} color={color.black} />
              {0 > 0 && (
                <LinearGradient
                  colors={['#ff4d4d', color.error]}
                  style={styles.badge}
                >
                  <Text style={styles.badgeText}>0</Text>
                </LinearGradient>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigator.navigate(ScreenNameEnum.ViewCartScreen)}
          >
            <View>
              <Icon name="cart-outline" size={28} color={color.black} />
              <LinearGradient
                colors={['#ff4d4d', color.error]}
                style={styles.badge}
              >
                <Text style={styles.badgeText}>0</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Row: Gender/Category Tabs */}
      {genderOptions.length > 0 && (
        <View style={styles.tabsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContainer}
          >
            {genderOptions.map((item) => {
              const isActive = currentGender === item;
              const isStudio = item?.toUpperCase() === 'STUDIO';
              const label = item?.toUpperCase() === 'ALL' ? 'FOR YOU' : item?.toUpperCase();

              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.tab, isActive && styles.activeTab]}
                  onPress={() => setGender && setGender(item)}
                >
                  <View style={styles.tabContent}>
                    <Text
                      style={[
                        styles.tabText,
                        isActive && styles.activeTabText,
                      ]}
                    >
                      {label}
                    </Text>
                    {isStudio && (
                      <LinearGradient
                        colors={color.buttLinearGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.newBadge}
                      >
                        <Text style={styles.newBadgeText}>NEW</Text>
                      </LinearGradient>
                    )}
                  </View>
                  {isActive && (
                    <LinearGradient
                      colors={color.buttLinearGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.activeIndicator}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: color.white,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
  },
  leftSection: {
    width: 80,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    padding: 6,
    marginLeft: 4,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    borderRadius: 12,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    borderWidth: 2,
    borderColor: color.white,
  },
  badgeText: {
    color: color.white,
    fontSize: 9,
    fontFamily: fonts.bold,
  },
  tabsWrapper: {
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#f9f9f9',
  },
  tabsContainer: {
    paddingHorizontal: 16,
  },
  tab: {
    marginRight: 22,
    paddingVertical: 12,
    position: 'relative',
  },
  activeTab: {},
  tabContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tabText: {
    fontSize: 13,
    fontFamily: fonts.semiBold,
    color: color.textMedium,
    letterSpacing: 0.5,
  },
  activeTabText: {
    color: color.black,
    fontFamily: fonts.bold,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  newBadge: {
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
    marginLeft: 2,
    marginTop: -4,
  },
  newBadgeText: {
    color: color.white,
    fontSize: 7,
    fontWeight: 'bold',
  },
});

export default HeaderBar;




