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
  const navigator = useNavigation();

  return (
    <View style={styles.mainContainer}>
      {/* Top Row: Logo, Search, and Icons */}
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigator.navigate(ScreenNameEnum.Dashboard)}>
          <Image
            source={imageIndex.logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={16} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#888"
            style={styles.searchInput}
            editable={false} // Make it clickable to navigate to search screen
          />
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="heart-outline" size={22} color={color.black} />
          </TouchableOpacity>
          <TouchableOpacity 
             style={styles.iconButton}
             onPress={() => navigator.navigate(ScreenNameEnum.Cart)}
          >
            <View>
              <Icon name="bag-outline" size={22} color={color.black} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>0</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigator.navigate(ScreenNameEnum.EditProfile)}
          >
            <Image
              style={styles.profileImage}
              source={{
                uri: "https://i.pravatar.cc/500?img=12"
              }}
            />
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
                      <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>NEW</Text>
                      </View>
                    )}
                  </View>
                  {isActive && <View style={styles.activeIndicator} />}
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
    borderBottomColor: '#f5f5f5',
    paddingTop: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    height: 60,
  },
  logo: {
    width: 32,
    height: 32,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 10,
    paddingHorizontal: 8,
    height: 36,
  },
  searchIcon: {
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: color.black,
    paddingVertical: 0,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 6,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ff3f6c',
    borderRadius: 8,
    minWidth: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: color.white,
    fontSize: 8,
    fontWeight: 'bold',
  },
  profileButton: {
    marginLeft: 4,
  },
  profileImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#eee',
  },
  tabsWrapper: {
    marginTop: 0,
  },
  tabsContainer: {
    paddingHorizontal: 12,
  },
  tab: {
    marginRight: 18,
    paddingVertical: 10,
    position: 'relative',
  },
  activeTab: {},
  tabContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tabText: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: '#777',
    letterSpacing: 0.8,
  },
  activeTabText: {
    color: '#282c3f',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#ff3f6c',
  },
  newBadge: {
    backgroundColor: '#ff3f6c',
    borderRadius: 4,
    paddingHorizontal: 3,
    paddingVertical: 1,
    marginLeft: 2,
    marginTop: -4,
  },
  newBadgeText: {
    color: color.white,
    fontSize: 6,
    fontWeight: 'bold',
  },
});


export default HeaderBar;

