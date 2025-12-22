import React, { useState } from 'react';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const { width } = Dimensions.get('window');
const primaryGradient = ['#F58021', '#862E92'];

const B2BBulkScreen = () => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState('Saree');
  const [showDetails, setShowDetails] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const products = [
    { id: 1, name: 'Saree', basePrice: 1000, bulkPrice: 500, minBulkQty: 10 },
    { id: 2, name: 'Kurti', basePrice: 800, bulkPrice: 400, minBulkQty: 15 },
    { id: 3, name: 'Lehenga', basePrice: 2500, bulkPrice: 1500, minBulkQty: 5 },
    { id: 4, name: 'Salwar Suit', basePrice: 1200, bulkPrice: 700, minBulkQty: 12 },
  ];

  const pricingTiers = [
    { range: '1 – 9', price: '₹1,000', status: 'Normal Price' },
    { range: '10 – 49', price: '₹500', status: 'Bulk Price' },
    { range: '50 – 99', price: '₹450', status: 'Premium Bulk' },
    { range: '100+', price: '₹400', status: 'Wholesale Price' },
  ];

  const calculatePrice = () => {
    const product = products.find(p => p.name === selectedProduct);
    if (!product) return 0;
    
    if (selectedQuantity >= product.minBulkQty) {
      return selectedQuantity * product.bulkPrice;
    }
    return selectedQuantity * product.basePrice;
  };

  const getPricePerUnit = () => {
    const product = products.find(p => p.name === selectedProduct);
    if (!product) return 0;
    
    return selectedQuantity >= product.minBulkQty ? product.bulkPrice : product.basePrice;
  };

  const handleQuantityChange = (value) => {
    const numValue = parseInt(value) || 1;
    setSelectedQuantity(Math.max(1, numValue));
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      fadeAnim.setValue(0);
    });
  };

  const handleBulkOrder = () => {
    const product = products.find(p => p.name === selectedProduct);
    const isBulk = selectedQuantity >= product.minBulkQty;
    
    Alert.alert(
      'Order Summary',
      `Product: ${selectedProduct}\nQuantity: ${selectedQuantity}\nPrice per unit: ₹${getPricePerUnit()}\nTotal: ₹${calculatePrice()}\nStatus: ${isBulk ? 'B2B Bulk Order 🎉' : 'Regular Order'}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm Order', onPress: () => generateInvoice() },
      ]
    );
  };

  const generateInvoice = () => {
    Alert.alert(
      'Invoice Generated!',
      'Your B2B invoice has been generated and sent to your email. Automated billing applied successfully.',
      [{ text: 'OK' }]
    );
  };

  const incrementQuantity = () => {
    setSelectedQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setSelectedQuantity(prev => Math.max(1, prev - 1));
  };

  const BulkPriceIndicator = () => {
    const product = products.find(p => p.name === selectedProduct);
    const isBulkEligible = selectedQuantity >= product.minBulkQty;
    
    return (
      <Animated.View 
        style={[
          styles.bulkBadge,
          {
            transform: [{
              scale: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1]
              })
            }]
          }
        ]}
      >
        <LinearGradient
          colors={isBulkEligible ? ['#4CAF50', '#2E7D32'] : ['#ff9800', '#f57c00']}
          style={styles.bulkBadgeGradient}
        >
          <MaterialIcons 
            name={isBulkEligible ? "verified" : "attach-money"} 
            size={20} 
            color="white" 
          />
          <Text style={styles.bulkBadgeText}>
            {isBulkEligible ? 'B2B PRICE ACTIVE' : `Add ${product.minBulkQty - selectedQuantity} more for bulk`}
          </Text>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={primaryGradient} style={styles.header}>
        <View style={styles.headerContent}>
          <MaterialIcons name="business" size={32} color="white" />
          <Text style={styles.headerTitle}>B2B Bulk Purchasing</Text>
          <Text style={styles.headerSubtitle}>Exclusive Franchise Offers</Text>
        </View>
      </LinearGradient>

      {/* Main Features */}
      <View style={styles.featuresContainer}>
        <View style={styles.featureRow}>
          <View style={styles.featureItem}>
            <FontAwesome5 name="boxes" size={24} color="#F58021" />
            <Text style={styles.featureText}>Bulk Buying</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="business" size={24} color="#862E92" />
            <Text style={styles.featureText}>Franchise Offers</Text>
          </View>
          <View style={styles.featureItem}>
            <Entypo name="price-tag" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Smart Pricing</Text>
          </View>
        </View>
        
        <LinearGradient colors={['#e3f2fd', '#bbdefb']} style={styles.taglineCard}>
          <MaterialIcons name="auto-awesome" size={22} color="#1976d2" />
          <Text style={styles.taglineText}>
            Buy more, pay less with automated B2B billing
          </Text>
        </LinearGradient>
      </View>

      {/* Product Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Product</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScroll}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[
                styles.productCard,
                selectedProduct === product.name && styles.productCardSelected,
              ]}
              onPress={() => setSelectedProduct(product.name)}
            >
              <LinearGradient
                colors={selectedProduct === product.name ? primaryGradient : ['#f5f5f5', '#e0e0e0']}
                style={styles.productGradient}
              >
                <Text style={[
                  styles.productName,
                  selectedProduct === product.name && styles.productNameSelected
                ]}>
                  {product.name}
                </Text>
                <Text style={styles.productPrice}>
                  ₹{product.basePrice} / ₹{product.bulkPrice}
                </Text>
                <Text style={styles.productMinQty}>
                  Min {product.minBulkQty}+ for bulk
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Quantity Selector */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Quantity</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={decrementQuantity}
          >
            <MaterialIcons name="remove" size={24} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.quantityDisplay}>
            <TextInput
              style={styles.quantityInput}
              value={selectedQuantity.toString()}
              onChangeText={handleQuantityChange}
              keyboardType="numeric"
            />
            <Text style={styles.quantityLabel}>Units</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={incrementQuantity}
          >
            <MaterialIcons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <BulkPriceIndicator />
      </View>

      {/* Pricing Table */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.collapseHeader}
          onPress={() => setShowDetails(!showDetails)}
        >
          <Text style={styles.sectionTitle}>Bulk Pricing Example</Text>
          <MaterialIcons 
            name={showDetails ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
            size={24} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showDetails && (
          <View style={styles.pricingTable}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 2 }]}>Quantity</Text>
              <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 2 }]}>Price per Piece</Text>
              <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 1.5 }]}>Status</Text>
            </View>
            
            {pricingTiers.map((tier, index) => (
              <View 
                key={index} 
                style={[
                  styles.tableRow,
                  selectedQuantity >= parseInt(tier.range.split('–')[0]) && 
                  selectedQuantity <= parseInt(tier.range.split('–')[1] || '999') && 
                  styles.highlightedRow
                ]}
              >
                <Text style={[styles.tableCell, styles.tableData]}>{tier.range}</Text>
                <Text style={[styles.tableCell, styles.tableData]}>{tier.price}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: tier.status.includes('Bulk') ? '#4CAF50' : '#ff9800' }
                ]}>
                  <Text style={styles.statusText}>{tier.status}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
        
        <View style={styles.noteBox}>
          <MaterialIcons name="info" size={18} color="#1976d2" />
          <Text style={styles.noteText}>
            Minimum 10 units required to unlock B2B price
          </Text>
        </View>
      </View>

      {/* How It Works */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepsContainer}>
          {[
            { icon: 'shopping-cart', text: 'Product select करें' },
            { icon: 'format-list-numbered', text: 'Quantity enter करें' },
            { icon: 'auto-awesome', text: 'App auto check करेगा bulk eligibility' },
            { icon: 'discount', text: 'Scheme auto apply होगी' },
            { icon: 'receipt', text: 'Final bill instant generate' },
          ].map((step, index) => (
            <View key={index} style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <MaterialIcons name={step.icon} size={24} color="#F58021" style={styles.stepIcon} />
              <Text style={styles.stepText}>{step.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Price Summary */}
      <LinearGradient colors={['#f8f9fa', '#e9ecef']} style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Selected Product:</Text>
          <Text style={styles.summaryValue}>{selectedProduct}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Quantity:</Text>
          <Text style={styles.summaryValue}>{selectedQuantity} units</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Price per unit:</Text>
          <Text style={[styles.summaryValue, styles.priceHighlight]}>
            ₹{getPricePerUnit()}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalAmount}>₹{calculatePrice()}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.orderButton} 
          onPress={handleBulkOrder}
        >
          <LinearGradient colors={primaryGradient} style={styles.orderButtonGradient}>
            <MaterialIcons name="shopping-bag" size={22} color="white" />
            <Text style={styles.orderButtonText}>
              {selectedQuantity >= 10 ? 'PLACE B2B ORDER' : 'PLACE REGULAR ORDER'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 5,
  },
  featuresContainer: {
    paddingHorizontal: 20,
    marginTop: -15,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  featureItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  featureText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    color: '#333',
  },
  taglineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  taglineText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976d2',
    marginLeft: 10,
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  productScroll: {
    flexDirection: 'row',
  },
  productCard: {
    width: 120,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  productCardSelected: {
    transform: [{ scale: 1.05 }],
  },
  productGradient: {
    padding: 15,
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  productNameSelected: {
    color: 'white',
  },
  productPrice: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  productMinQty: {
    fontSize: 10,
    color: '#888',
    marginTop: 3,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#F58021',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityDisplay: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  quantityInput: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    width: 100,
  },
  quantityLabel: {
    fontSize: 14,
    color: '#666',
  },
  bulkBadge: {
    marginTop: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
  bulkBadgeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  bulkBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  collapseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pricingTable: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  highlightedRow: {
    backgroundColor: '#e8f5e9',
  },
  tableCell: {
    padding: 12,
    fontSize: 14,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color: '#333',
  },
  tableData: {
    color: '#555',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'center',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  noteText: {
    color: '#1976d2',
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  stepsContainer: {
    marginTop: 10,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 10,
  },
  stepNumber: {
    backgroundColor: '#F58021',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: 'white',
    fontWeight: 'bold',
  },
  stepIcon: {
    marginHorizontal: 15,
  },
  stepText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  summaryCard: {
    margin: 20,
    padding: 25,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 40,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#555',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  priceHighlight: {
    color: '#F58021',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#862E92',
  },
  orderButton: {
    marginTop: 25,
    borderRadius: 15,
    overflow: 'hidden',
  },
  orderButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default B2BBulkScreen;