import React, { useState, useRef, useEffect } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { color, fonts } from '../../../../constant';
import StatusBarComponent from '../../../../component/StatusBarCompoent';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = 100;

// --- Mock Data ---
const CATEGORIES = [
  { id: 'sale', title: 'SALE' },
  { id: 'tops', title: 'TOPS' },
  { id: 'dresses', title: 'DRESSES' },
  { id: 'bottoms', title: 'BOTTOMS' },
  { id: 'one-pieces', title: 'ONE-PIECES & CO-ORDS' },
  { id: 'denim', title: 'DENIM' },
  { id: 'inclusive', title: 'INCLUSIVE' },
  { id: 'lingerie', title: 'LINGERIE & LOUNGEWEAR' },
  { id: 'activewear', title: 'ACTIVEWEAR' },
  { id: 'outerwear', title: 'OUTERWEAR' },
  { id: 'knitwear', title: 'KNITWEAR' },
  { id: 'bags', title: 'BAGS' },
  { id: 'accessories', title: 'ACCESSORIES' },
];

const CONTENT_DATA: any = {
  sale: [
    {
      id: 's1',
      title: 'SALE',
      items: [
        { id: 'i1', name: 'Sale Dresses', image: 'https://images.unsplash.com/photo-1539008835757-830ca09eb82c?q=80&w=500&auto=format&fit=crop' },
        { id: 'i2', name: 'Sale Tops', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500&auto=format&fit=crop' },
      ],
    },
    {
      id: 's2',
      title: '',
      items: [
        { id: 'i3', name: 'Sale Bottoms', image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=500&auto=format&fit=crop' },
        { id: 'i4', name: 'Sale Denim', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=500&auto=format&fit=crop' },
      ],
    },
  ],
  tops: [
    {
      id: 't1',
      title: 'TOPS',
      items: [
        { id: 'i5', name: 'Graphic Tees', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop' },
        { id: 'i6', name: 'Crop Tops', image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=500&auto=format&fit=crop' },
      ],
    },
  ],
};

const Under = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('sale');
  const scrollRef = useRef<ScrollView>(null);

  const handleCategoryPress = (id: string) => {
    setActiveCategory(id);
    // In a real app, we might scroll the right content or fetch new data
  };

  const renderSidebarItem = ({ item }: any) => {
    const isActive = activeCategory === item.id;
    return (
      <TouchableOpacity
        onPress={() => handleCategoryPress(item.id)}
        style={[styles.sidebarItem, isActive && styles.sidebarItemActive]}
      >
        {isActive && <View style={styles.activeIndicator} />}
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
          <Ionicons name="arrow-forward" size={14} color="#333" />
        </View>
      </View>
      <Text style={styles.gridLabel}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderSection = (section: any) => (
    <View key={section.id} style={styles.sectionContainer}>
      {section.title !== '' && (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all {'>'}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.gridRow}>
        {section.items.map((item: any) => renderGridItem(item))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBarComponent barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Top Search Bar */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Bikini"
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.headerIconButton}>
            <Ionicons name="camera-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

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
          {CONTENT_DATA[activeCategory] ? (
            CONTENT_DATA[activeCategory].map((section: any) => renderSection(section))
          ) : (
            <View style={styles.placeholderContent}>
              <Text style={styles.sectionTitle}>{CATEGORIES.find(c => c.id === activeCategory)?.title}</Text>
              <Text style={styles.placeholderText}>Coming soon...</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    height: 48,
    paddingLeft: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: fonts.regular,
  },
  headerIconButton: {
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#000',
    height: '100%',
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: '#F9F9F9',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  sidebarItem: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    position: 'relative',
    justifyContent: 'center',
  },
  sidebarItemActive: {
    backgroundColor: '#fff',
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 20,
    bottom: 20,
    width: 4,
    backgroundColor: '#FF3F6C',
  },
  sidebarText: {
    fontSize: 12,
    color: '#333',
    fontFamily: fonts.semiBold,
    textTransform: 'uppercase',
  },
  sidebarTextActive: {
    color: '#FF3F6C',
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
    fontSize: 22,
    fontFamily: fonts.bold,
    color: '#000',
    textTransform: 'uppercase',
  },
  viewAll: {
    fontSize: 14,
    color: '#666',
    fontFamily: fonts.regular,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: (width - SIDEBAR_WIDTH - 32 - 12) / 2, // Width - sidebar - horizontal padding - gap
    alignItems: 'center',
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 0.8,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gridLabel: {
    fontSize: 13,
    color: '#333',
    fontFamily: fonts.regular,
    textAlign: 'center',
  },
  placeholderContent: {
    paddingTop: 40,
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 10,
    color: '#999',
    fontFamily: fonts.regular,
  },
});