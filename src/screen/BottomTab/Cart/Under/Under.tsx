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
  bottoms: [
    {
      id: 'b1',
      title: 'STYLISH BOTTOMS',
      items: [
        { id: 'b1_1', name: 'Pants @ ₹799', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=500&auto=format&fit=crop' },
        { id: 'b1_2', name: 'Shorts @ ₹499', image: 'https://images.unsplash.com/photo-1591369822095-fc2a42ce89a8?q=80&w=500&auto=format&fit=crop' },
      ]
    }
  ],
  denim: [
    {
      id: 'denim1',
      title: 'DENIM WEAR',
      items: [
        { id: 'denim_1', name: 'Jeans @ ₹999', image: 'https://images.unsplash.com/photo-1542272604-780c40fb05f6?q=80&w=500&auto=format&fit=crop' },
        { id: 'denim_2', name: 'Jackets @ ₹899', image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=500&auto=format&fit=crop' },
      ]
    }
  ],
  lingerie: [
    {
      id: 'l1',
      title: 'LINGERIE',
      items: [
        { id: 'l1_1', name: 'Sets @ ₹599', image: 'https://images.unsplash.com/photo-1568251188392-ae32f898cb3b?q=80&w=500&auto=format&fit=crop' },
      ]
    }
  ],
  activewear: [
    {
      id: 'aw1',
      title: 'ACTIVEWEAR',
      items: [
        { id: 'aw1_1', name: 'Sports Bra @ ₹399', image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=500&auto=format&fit=crop' },
        { id: 'aw1_2', name: 'Leggings @ ₹699', image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=500&auto=format&fit=crop' },
      ]
    }
  ],
  knitwear: [
    {
      id: 'kw1',
      title: 'KNITWEAR',
      items: [
        { id: 'kw1_1', name: 'Sweaters @ ₹899', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500&auto=format&fit=crop' },
      ]
    }
  ],
  bags: [
    {
      id: 'bag1',
      title: 'TRENDY BAGS',
      items: [
        { id: 'bag1_1', name: 'Handbags @ ₹799', image: 'https://images.unsplash.com/photo-1584917033904-493bb3c3c155?q=80&w=500&auto=format&fit=crop' },
        { id: 'bag1_2', name: 'Totes @ ₹599', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=500&auto=format&fit=crop' },
      ]
    }
  ],
  accessories: [
    {
      id: 'acc1',
      title: 'ACCESSORIES',
      items: [
        { id: 'acc1_1', name: 'Jewelry @ ₹299', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=500&auto=format&fit=crop' },
        { id: 'acc1_2', name: 'Sunglasses @ ₹399', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=500&auto=format&fit=crop' },
      ]
    }
  ],
};

const Under = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<ScrollView>(null);
  const sidebarRef = useRef<FlatList>(null);
  const sectionLayouts = useRef<{ [key: string]: number }>({});
  const isScrollingFromSidebar = useRef(false);

  const allCategoriesData = useMemo(() => {
    return CATEGORIES.map(cat => {
      const data = CONTENT_DATA[cat.id] || [];
      
      let filteredData = data;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filteredData = data.map((section: any) => ({
          ...section,
          items: section.items.filter((item: any) =>
            item.name.toLowerCase().includes(query)
          ),
        })).filter((section: any) => section.items.length > 0);
      }
      
      return {
        ...cat,
        sections: filteredData,
      };
    }).filter(cat => cat.sections.length > 0);
  }, [searchQuery]);

  const handleCategoryPress = (id: string, index: number) => {
    setActiveCategory(id);
    setSearchQuery('');
    isScrollingFromSidebar.current = true;
    
    // Scroll sidebar
    sidebarRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
    
    // Scroll content
    const yPos = sectionLayouts.current[id];
    if (yPos !== undefined) {
      scrollRef.current?.scrollTo({ y: yPos, animated: true });
    }
    
    // Reset flag after animation
    setTimeout(() => {
      isScrollingFromSidebar.current = false;
    }, 500);
  };

  const handleScroll = (event: any) => {
    if (isScrollingFromSidebar.current) return;
    
    const scrollY = event.nativeEvent.contentOffset.y;
    let currentCat = activeCategory;
    
    for (const cat of allCategoriesData) {
      const yPos = sectionLayouts.current[cat.id];
      if (yPos !== undefined && scrollY >= yPos - 100) {
        currentCat = cat.id;
      }
    }
    
    if (currentCat !== activeCategory) {
      setActiveCategory(currentCat);
      const catIndex = CATEGORIES.findIndex(c => c.id === currentCat);
      if (catIndex !== -1) {
        try {
          sidebarRef.current?.scrollToIndex({ index: catIndex, animated: true, viewPosition: 0.5 });
        } catch (e) {
          // Ignore scroll errors if items are not rendered
        }
      }
    }
  };

  const renderSidebarItem = ({ item, index }: any) => {
    const isActive = activeCategory === item.id;
    return (
      <TouchableOpacity
        onPress={() => handleCategoryPress(item.id, index)}
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

      <LinearGradient
        colors={color.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.headerGradient, { paddingTop: STATUSBAR_HEIGHT + 10 }]}
      >

        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search budget fashion..."
            style={styles.searchInput}
            placeholderTextColor={color.textMedium}
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
            ref={sidebarRef}
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
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {allCategoriesData.length > 0 ? (
            allCategoriesData.map((category) => (
              <View 
                key={category.id} 
                onLayout={(event) => {
                  sectionLayouts.current[category.id] = event.nativeEvent.layout.y;
                }}
              >
                {/* Category Header */}
                <View style={styles.categoryTitleContainer}>
                  <Text style={styles.categoryTitleText}>{category.title}</Text>
                </View>
                
                {category.sections.map((section: any) => renderSection(section))}
              </View>
            ))
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
    fontSize: 14,
    color: color.textDark,
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
    color: '#F48220',
    fontFamily: fonts.semiBold,
  },
  categoryTitleContainer: {
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 8,
  },
  categoryTitleText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: color.textDark,
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
