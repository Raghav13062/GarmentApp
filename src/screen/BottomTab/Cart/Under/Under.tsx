import React, { useState, useRef, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { color, fonts } from '../../../../constant';
import StatusBarComponent from '../../../../component/StatusBarCompoent';

const { width } = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;
const SIDEBAR_WIDTH = 100;

// --- Expanded Mock Data with "Under 999" Theme ---
const CATEGORIES = [
  { id: 'all', title: 'UNDER 999' },
  { id: 'sale', title: 'SALE' },
  { id: 'tops', title: 'TOPS' },
  { id: 'dresses', title: 'DRESSES' },
  { id: 'bottoms', title: 'BOTTOMS' },
  { id: 'denim', title: 'DENIM' },
  { id: 'lingerie', title: 'LINGERIE' },
  { id: 'activewear', title: 'ACTIVEWEAR' },
  { id: 'knitwear', title: 'KNITWEAR' },
  { id: 'bags', title: 'BAGS' },
  { id: 'accessories', title: 'ACCESSORIES' },
];

const CONTENT_DATA: any = {
  all: [
    {
      id: 'a1',
      title: 'HOT DEALS UNDER 999',
      items: [
        { id: 'i101', name: 'Maxi @ ₹899', image: 'https://images.unsplash.com/photo-1539008835757-830ca09eb82c?q=80&w=500&auto=format&fit=crop' },
        { id: 'i102', name: 'Tops @ ₹399', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500&auto=format&fit=crop' },
        { id: 'i103', name: 'Denim @ ₹999', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=500&auto=format&fit=crop' },
        { id: 'i104', name: 'Tees @ ₹299', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop' },
      ],
    },
    {
      id: 'a2',
      title: 'BUDGET ACCESSORIES',
      items: [
        { id: 'i105', name: 'Bags @ ₹799', image: 'https://images.unsplash.com/photo-1584917033904-493bb3c3c155?q=80&w=500&auto=format&fit=crop' },
        { id: 'i106', name: 'Belts @ ₹199', image: 'https://images.unsplash.com/photo-1624222247344-550fbadcd973?q=80&w=500&auto=format&fit=crop' },
      ],
    },
  ],
  sale: [
    {
      id: 's1',
      title: 'CLEARANCE SALE',
      items: [
        { id: 'i1', name: 'Dresses @ ₹599', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500&auto=format&fit=crop' },
        { id: 'i2', name: 'Tops @ ₹199', image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=500&auto=format&fit=crop' },
      ],
    },
  ],
  tops: [
    {
      id: 't1',
      title: 'TRENDING TOPS',
      items: [
        { id: 'i5', name: 'Graphic @ ₹499', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop' },
        { id: 'i6', name: 'Crops @ ₹349', image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=500&auto=format&fit=crop' },
        { id: 'i7', name: 'Tanks @ ₹249', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500&auto=format&fit=crop' },
        { id: 'i8', name: 'Shirts @ ₹799', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?q=80&w=500&auto=format&fit=crop' },
      ],
    },
  ],
  dresses: [
    {
      id: 'd1',
      title: 'PARTY DRESSES',
      items: [
        { id: 'i9', name: 'Maxi @ ₹999', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=500&auto=format&fit=crop' },
        { id: 'i10', name: 'Mini @ ₹899', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500&auto=format&fit=crop' },
        { id: 'i11', name: 'Gowns @ ₹999', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=500&auto=format&fit=crop' },
        { id: 'i12', name: 'Skater @ ₹699', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=500&auto=format&fit=crop' },
      ],
    },
  ],
};

const Under = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const filteredSections = useMemo(() => {
    const data = CONTENT_DATA[activeCategory] || [];
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    return data.map((section: any) => ({
      ...section,
      items: section.items.filter((item: any) =>
        item.name.toLowerCase().includes(query)
      ),
    })).filter((section: any) => section.items.length > 0);
  }, [activeCategory, searchQuery]);

  const handleCategoryPress = (id: string) => {
    setActiveCategory(id);
    setSearchQuery('');
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const renderSidebarItem = ({ item }: any) => {
    const isActive = activeCategory === item.id;
    return (
      <TouchableOpacity
        onPress={() => handleCategoryPress(item.id)}
        style={[styles.sidebarItem, isActive && styles.sidebarItemActive]}
      >
        {isActive && <LinearGradient colors={color.primaryGradient} style={styles.activeIndicator} />}
        <Text
          style={[
            styles.sidebarText,
            isActive && styles.sidebarTextActive,
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderGridItem = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.gridCard}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.gridImage} />
        <View style={styles.arrowIcon}>
          <Ionicons name="arrow-forward" size={14} color={color.textDark} />
        </View>
        <LinearGradient colors={color.primaryGradient} style={styles.priceTag}>
          <Text style={styles.priceTagText}>₹999</Text>
        </LinearGradient>
      </View>
      <Text style={styles.gridLabel}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderSection = (section: any) => (
    <View key={section.id} style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all {'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridRow}>
        {section.items.map((item: any) => renderGridItem(item))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <StatusBarComponent barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {/* Top Search Bar */}
      <LinearGradient
        colors={color.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.headerGradient, { paddingTop: STATUSBAR_HEIGHT + 10 }]}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.headerIcon}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color={color.white} />
          </TouchableOpacity>

          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>Under 999</Text>
            <Text style={styles.headerSubtitle}>Budget fashion deals</Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons name="pricetag" size={21} color={color.white} />
          </View>
        </View>

        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search budget fashion..."
            style={styles.searchInput}
            placeholderTextColor={color.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <TouchableOpacity style={styles.searchButton}>
            <LinearGradient colors={color.primaryGradient} style={[StyleSheet.absoluteFill, { borderTopRightRadius: 2, borderBottomRightRadius: 2 }]} />
            <Ionicons name="search" size={24} color={color.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.mainContainer}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          <FlatList
            data={CATEGORIES}
            renderItem={renderSidebarItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Right Content Area */}
        <ScrollView
          ref={scrollRef}
          style={styles.contentArea}
          showsVerticalScrollIndicator={false}
        >
          {filteredSections.length > 0 ? (
            filteredSections.map((section: any) => renderSection(section))
          ) : (
            <View style={styles.placeholderContent}>
              <Ionicons name="pricetag-outline" size={60} color={color.borderLight} />
              <Text style={styles.placeholderText}>
                {searchQuery ? "No budget deals found matching your search." : "More budget deals coming soon!"}
              </Text>
            </View>
          )}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Under;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color.white,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: color.lightGray,
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
  headerTop: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrap: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  headerTitle: {
    color: color.white,
    fontSize: 20,
    fontFamily: fonts.bold,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.86)',
    fontSize: 12,
    fontFamily: fonts.medium,
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    borderRadius: 4,
    height: 48,
    paddingLeft: 12,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: color.textDark,
    fontFamily: fonts.regular,
  },
  headerIconButton: {
    paddingHorizontal: 10,
  },
  searchButton: {
    height: '100%',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    overflow: 'hidden',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: color.backgroundLight,
    borderRightWidth: 1,
    borderRightColor: color.borderLight,
  },
  sidebarItem: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    position: 'relative',
    justifyContent: 'center',
  },
  sidebarItemActive: {
    backgroundColor: color.white,
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 20,
    bottom: 20,
    width: 4,
  },
  sidebarText: {
    fontSize: 11,
    color: color.textDark,
    fontFamily: fonts.semiBold,
    textTransform: 'uppercase',
  },
  sidebarTextActive: {
    color: color.primary,
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: color.black,
    textTransform: 'uppercase',
  },
  viewAll: {
    fontSize: 12,
    color: color.textMedium,
    fontFamily: fonts.regular,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: (width - SIDEBAR_WIDTH - 32 - 12) / 2,
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 0.8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: color.backgroundLight,
    position: 'relative',
    marginBottom: 8,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  arrowIcon: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 2,
  },
  priceTag: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderBottomLeftRadius: 4,
  },
  priceTagText: {
    color: color.white,
    fontSize: 10,
    fontFamily: fonts.bold,
  },
  gridLabel: {
    fontSize: 12,
    color: color.textDark,
    fontFamily: fonts.semiBold,
    textAlign: 'center',
  },
  placeholderContent: {
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    marginTop: 15,
    color: color.textMedium,
    fontFamily: fonts.regular,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
