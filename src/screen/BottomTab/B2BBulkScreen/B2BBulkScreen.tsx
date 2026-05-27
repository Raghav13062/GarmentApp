import React, { useState, useEffect } from 'react';
import { color, fonts } from '../../../constant';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  Animated,
  Platform,
  StatusBar,
} from 'react-native';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const BRAND_COLORS = {
  primaryGradient: [color.primary, color.secondary],
  accent: color.star,
  background: '#F8F9FB',
  white: '#FFFFFF',
  textDark: '#1A1A1A',
  textMedium: '#666666',
  success: color.success,
  warning: color.warning,
};

const B2BBulkScreen = () => {
  const [selectedQuantity, setSelectedQuantity] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState('Saree');
  const [showDetails, setShowDetails] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const products = [
    { id: 1, name: 'Saree', basePrice: 1000, bulkPrice: 500, minBulkQty: 10, icon: 'layers' },
    { id: 2, name: 'Kurti', basePrice: 800, bulkPrice: 400, minBulkQty: 15, icon: 'style' },
    { id: 3, name: 'Lehenga', basePrice: 2500, bulkPrice: 1500, minBulkQty: 5, icon: 'stars' },
    { id: 4, name: 'Salwar Suit', basePrice: 1200, bulkPrice: 700, minBulkQty: 12, icon: 'checkroom' },
  ];

  const pricingTiers = [
    { range: '1 – 9', price: '₹1,000', status: 'Retail' },
    { range: '10 – 49', price: '₹500', status: 'Bulk' },
    { range: '50 – 99', price: '₹450', status: 'Premium' },
    { range: '100+', price: '₹400', status: 'Wholesale' },
  ];

  const currentProduct = products.find(p => p.name === selectedProduct);

  const calculatePrice = () => {
    if (!currentProduct) return 0;
    if (selectedQuantity >= currentProduct.minBulkQty) {
      return selectedQuantity * currentProduct.bulkPrice;
    }
    return selectedQuantity * currentProduct.basePrice;
  };

  const getPricePerUnit = () => {
    if (!currentProduct) return 0;
    return selectedQuantity >= currentProduct.minBulkQty ? currentProduct.bulkPrice : currentProduct.basePrice;
  };

  const handleQuantityChange = (value: string) => {
    const numValue = parseInt(value) || 1;
    setSelectedQuantity(Math.max(1, numValue));

    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const handleBulkOrder = () => {
    const isBulk = selectedQuantity >= currentProduct.minBulkQty;
    Alert.alert(
      'Confirm B2B Order',
      `You are placing an order for ${selectedQuantity} units of ${selectedProduct}.\n\nPrice: ₹${getPricePerUnit()}/unit\nTotal: ₹${calculatePrice()}\n\nProceed to generate B2B invoice?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes, Place Order', onPress: () => Alert.alert('Success', 'B2B Invoice generated and sent to your email!') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBarComponent translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Modern Header */}
        <LinearGradient colors={BRAND_COLORS.primaryGradient} style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerIconContainer}>
              <MaterialIcons name="business" size={28} color={BRAND_COLORS.white} />
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>B2B Wholesale</Text>
              <Text style={styles.headerSubtitle}>Exclusive Franchise Solutions</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>50%</Text>
              <Text style={styles.statLabel}>Max Margin</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24h</Text>
              <Text style={styles.statLabel}>Priority Dispatch</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>100%</Text>
              <Text style={styles.statLabel}>GST Invoice</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Product Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productScroll}>
              {products.map((product) => {
                const isSelected = selectedProduct === product.name;
                return (
                  <TouchableOpacity
                    key={product.id}
                    onPress={() => setSelectedProduct(product.name)}
                    activeOpacity={0.9}
                    style={[styles.productCard, isSelected && styles.productCardSelected]}
                  >
                    <LinearGradient
                      colors={isSelected ? BRAND_COLORS.primaryGradient : [BRAND_COLORS.white, BRAND_COLORS.white]}
                      style={styles.productGradient}
                    >
                      <MaterialIcons
                        name={product.icon as any}
                        size={24}
                        color={isSelected ? BRAND_COLORS.white : color.primary}
                      />
                      <Text style={[styles.productName, isSelected && styles.textWhite]}>{product.name}</Text>
                      <Text style={[styles.productPrice, isSelected && styles.textWhiteOpacity]}>Starts ₹{product.bulkPrice}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Quantity Configurator */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Configure Quantity</Text>
              {selectedQuantity >= currentProduct.minBulkQty && (
                <View style={styles.bulkActiveBadge}>
                  <MaterialIcons name="verified" size={14} color={BRAND_COLORS.white} />
                  <Text style={styles.bulkActiveText}>BULK DEAL ON</Text>
                </View>
              )}
            </View>

            <View style={styles.stepperContainer}>
              <TouchableOpacity
                style={styles.stepButton}
                onPress={() => setSelectedQuantity(q => Math.max(1, q - 1))}
              >
                <MaterialIcons name="remove" size={24} color={color.primary} />
              </TouchableOpacity>

              <View style={styles.quantityDisplay}>
                <TextInput
                  style={styles.quantityInput}
                  value={selectedQuantity.toString()}
                  onChangeText={handleQuantityChange}
                  keyboardType="numeric"
                  maxLength={4}
                />
                <Text style={styles.unitLabel}>UNITS</Text>
              </View>

              <TouchableOpacity
                style={styles.stepButton}
                onPress={() => setSelectedQuantity(q => q + 1)}
              >
                <MaterialIcons name="add" size={24} color={color.primary} />
              </TouchableOpacity>
            </View>

            {selectedQuantity < currentProduct?.minBulkQty && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${(selectedQuantity / currentProduct.minBulkQty) * 100}%` }
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  Add <Text style={styles.boldText}>{currentProduct.minBulkQty - selectedQuantity}</Text> more units for wholesale prices
                </Text>
              </View>
            )}
          </View>

          {/* Pricing Tiers Table */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.expandHeader}
              onPress={() => setShowDetails(!showDetails)}
            >
              <Text style={styles.sectionTitle}>Wholesale Pricing Tiers</Text>
              <MaterialIcons name={showDetails ? "expand-less" : "expand-more"} size={24} color={BRAND_COLORS.textMedium} />
            </TouchableOpacity>

            {showDetails && (
              <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderCell}>Range</Text>
                  <Text style={styles.tableHeaderCell}>Price/pc</Text>
                  <Text style={styles.tableHeaderCell}>Level</Text>
                </View>
                {pricingTiers.map((tier, idx) => {
                  const rangeParts = tier.range.split('–');
                  const min = parseInt(rangeParts[0]);
                  const max = rangeParts[1] ? parseInt(rangeParts[1]) : 9999;
                  const isActive = selectedQuantity >= min && selectedQuantity <= max;

                  return (
                    <View key={idx} style={[styles.tableRow, isActive && styles.activeRow]}>
                      <Text style={[styles.tableCell, isActive && styles.activeTableCell]}>{tier.range}</Text>
                      <Text style={[styles.tableCell, isActive && styles.activeTableCell]}>{tier.price}</Text>
                      <View style={[styles.statusTag, isActive ? styles.activeTag : styles.inactiveTag]}>
                        <Text style={styles.statusTagText}>{tier.status}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {/* Why Partner With Us */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>B2B Benefits</Text>
            <View style={styles.benefitsGrid}>
              {[
                { icon: 'local-shipping', title: 'Fast Delivery', desc: 'Doorstep dispatch' },
                { icon: 'verified', title: 'Quality Assured', desc: 'SFS Premium Check' },
                { icon: 'support-agent', title: 'Account Manager', desc: 'Dedicated support' },
                { icon: 'receipt-long', title: 'GST Ready', desc: 'Automated billing' },
              ].map((item, index) => (
                <View key={index} style={styles.benefitCard}>
                  <View style={styles.benefitIconBg}>
                    <MaterialIcons name={item.icon as any} size={20} color={color.primary} />
                  </View>
                  <Text style={styles.benefitTitle}>{item.title}</Text>
                  <Text style={styles.benefitDesc}>{item.desc}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Sticky Checkout Summary */}
      {/* <View style={styles.stickyFooter}>
        <LinearGradient colors={['rgba(255,255,255,0.9)', '#FFFFFF']} style={styles.footerGradient}>
          <View style={styles.summaryInfo}>
            <View>
              <Text style={styles.totalLabel}>Grand Total</Text>
              <Text style={styles.totalValue}>₹{calculatePrice().toLocaleString()}</Text>
            </View>
            <View style={styles.summaryBadge}>
              <Text style={styles.badgeLabel}>₹{getPricePerUnit()}/pc</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.mainButton} onPress={handleBulkOrder}>
            <LinearGradient colors={BRAND_COLORS.primaryGradient} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>PLACE B2B ORDER</Text>
              <MaterialIcons name="arrow-forward" size={20} color={BRAND_COLORS.white} />
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_COLORS.background,
  },
  header: {
    paddingTop: STATUSBAR_HEIGHT + 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  headerIconContainer: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BRAND_COLORS.white,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BRAND_COLORS.white,
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  content: {
    marginTop: -20,
  },
  section: {
    backgroundColor: BRAND_COLORS.white,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BRAND_COLORS.textDark,
  },
  productScroll: {
    paddingVertical: 10,
  },
  productCard: {
    width: 130,
    height: 100,
    marginRight: 15,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  productCardSelected: {
    borderColor: color.primary,
    elevation: 8,
  },
  productGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: BRAND_COLORS.textDark,
    marginTop: 8,
  },
  productPrice: {
    fontSize: 11,
    color: BRAND_COLORS.textMedium,
    marginTop: 4,
  },
  textWhite: { color: BRAND_COLORS.white },
  textWhiteOpacity: { color: 'rgba(255,255,255,0.8)' },

  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F8FA',
    borderRadius: 20,
    padding: 10,
  },
  stepButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quantityDisplay: {
    alignItems: 'center',
  },
  quantityInput: {
    fontSize: 32,
    fontWeight: 'bold',
    color: BRAND_COLORS.textDark,
    textAlign: 'center',
  },
  unitLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: BRAND_COLORS.textMedium,
    letterSpacing: 1,
  },
  bulkActiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.success,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  bulkActiveText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: BRAND_COLORS.white,
    marginLeft: 5,
  },
  progressContainer: {
    marginTop: 20,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: color.primary,
  },
  progressText: {
    fontSize: 12,
    color: BRAND_COLORS.textMedium,
    marginTop: 10,
    textAlign: 'center',
  },
  boldText: { fontWeight: 'bold', color: color.primary },

  expandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableContainer: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 15,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F7F8FA',
    paddingVertical: 12,
  },
  tableHeaderCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: BRAND_COLORS.textMedium,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  activeRow: {
    backgroundColor: 'rgba(76, 175, 80, 0.05)',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: BRAND_COLORS.textDark,
    fontWeight: '500',
  },
  activeTableCell: {
    color: BRAND_COLORS.success,
    fontWeight: 'bold',
  },
  statusTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  activeTag: { backgroundColor: BRAND_COLORS.success },
  inactiveTag: { backgroundColor: '#EEEEEE' },
  statusTagText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: BRAND_COLORS.white,
    textAlign: 'center',
  },

  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: '48%',
    backgroundColor: '#F9FAFC',
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  benefitIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  benefitTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: BRAND_COLORS.textDark,
    textAlign: 'center',
  },
  benefitDesc: {
    fontSize: 10,
    color: BRAND_COLORS.textMedium,
    textAlign: 'center',
    marginTop: 4,
  },

  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: BRAND_COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 20,
  },
  footerGradient: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 35 : 20,
  },
  summaryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 12,
    color: BRAND_COLORS.textMedium,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: BRAND_COLORS.textDark,
  },
  summaryBadge: {
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  badgeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: color.primary,
  },
  mainButton: {
    height: 56,
    borderRadius: 18,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    letterSpacing: 1,
  },
});

export default B2BBulkScreen;