import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import { errorToast, successToast } from '../../../../utils/customToast';

const { width, height } = Dimensions.get('window');

// Brand Colors (same as cart screen for consistency)
const BRAND_COLORS = {
  primaryGradient: ['#F58021', '#862E92'],
  primaryDark: '#862E92',
  primaryLight: '#F58021',
  accent: '#FFD700',
  background: '#F5F5F5',
  textDark: '#2D3436',
  textLight: '#FFFFFF',
  cardBg: '#FFFFFF',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  gray: '#757575',
  lightGray: '#E0E0E0',
  inputBg: '#FFFFFF',
  inputBorder: '#E0E0E0',
};

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Get cart data from route params
  const cartItems = route.params?.cartItems || [];
  const totalAmount = route.params?.totalAmount || 0;
  
  const [orderItems, setOrderItems] = useState(cartItems);
  const [subTotal, setSubTotal] = useState(totalAmount);
  const [shippingFee, setShippingFee] = useState(99);
  const [tax, setTax] = useState(calculateTax(totalAmount));
  const [grandTotal, setGrandTotal] = useState(calculateGrandTotal(totalAmount, 99));
  
  // Form states
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: 'John Doe',
    phone: '+91 9876543210',
    address: '123 Main Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    country: 'India'
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '**** **** **** 1234',
    expiryDate: '12/25',
    cvv: '***'
  });
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();

    calculateOrderSummary();
  }, []);

  // Helper functions for calculations
  function calculateTax(amount) {
    return Math.round(amount * 0.18); // 18% GST
  }

  function calculateGrandTotal(subTotal, shipping) {
    const taxAmount = calculateTax(subTotal);
    return subTotal + shipping + taxAmount;
  }

  function calculateOrderSummary() {
    const newTax = calculateTax(subTotal);
    const newGrandTotal = calculateGrandTotal(subTotal, shippingFee);
    
    setTax(newTax);
    setGrandTotal(newGrandTotal);
  }

  // Update shipping method
  const updateShipping = (method) => {
    let fee = 99; // Standard shipping
    
    if (method === 'express') {
      fee = 199;
    } else if (method === 'free') {
      fee = 0;
    }
    
    setShippingFee(fee);
    const newGrandTotal = calculateGrandTotal(subTotal, fee);
    setGrandTotal(newGrandTotal);
  };

  // Update payment method
  const updatePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  // Place order function
  const placeOrder = () => {
    // Validate form
    if (!deliveryAddress.fullName || !deliveryAddress.phone || !deliveryAddress.address) {
       errorToast("Please fill in all required delivery details")
      return;
    }

    // Show confirmation
    Alert.alert(
      'Confirm Order',
      `Are you sure you want to place this order for ₹${grandTotal}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Order',
          style: 'default',
          onPress: () => {
            // Process order
            const orderId = generateOrderId();
            
            // Navigate to order confirmation
            navigation.navigate(ScreenNameEnum.OrderConfirmationScreen, {
              orderId: orderId,
              orderItems: orderItems,
              totalAmount: grandTotal,
              deliveryAddress: deliveryAddress,
              paymentMethod: paymentMethod
            });
            
            successToast("Your order has been placed successfully.")
            // Show success message
            Alert.alert(
              'Order Placed!',
              `Your order #${orderId} has been placed successfully.`,
              [{ text: 'OK', onPress: () => {} }]
            );
          }
        }
      ]
    );
  };

  // Generate random order ID
  const generateOrderId = () => {
    return 'ORD' + Math.floor(100000 + Math.random() * 900000);
  };

  // Render order summary item
  const renderOrderItem = ({ item, index }) => {
    const animationDelay = index * 100;
    const itemAnimation = {
      opacity: fadeAnim,
      transform: [
        {
          translateX: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0],
          }),
        },
      ],
    };

    return (
      <Animated.View style={[styles.orderItemContainer, itemAnimation]}>
        <View style={styles.orderItem}>
          <Image
            source={{ uri: item.image }}
            style={styles.orderItemImage}
          />
          
          <View style={styles.orderItemDetails}>
            <Text style={styles.orderItemTitle} numberOfLines={2}>
              {item.title || item.name}
            </Text>
            <Text style={styles.orderItemBrand}>{item.brand}</Text>
            <Text style={styles.orderItemQty}>Qty: {item.quantity || 1}</Text>
          </View>
          
          <Text style={styles.orderItemPrice}>₹{item.price}</Text>
        </View>
        
        {index < orderItems.length - 1 && <View style={styles.divider} />}
      </Animated.View>
    );
  };

  // Render delivery address section
  const renderAddressSection = () => (
    <Animated.View style={[styles.sectionContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.sectionHeader}>
        <Icon name="location-on" size={24} color={BRAND_COLORS.primaryDark} />
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <TouchableOpacity style={styles.editButton}>
          <Icon name="edit" size={20} color={BRAND_COLORS.gray} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.addressCard}>
        <View style={styles.addressHeader}>
          <Text style={styles.addressName}>{deliveryAddress.fullName}</Text>
          <Text style={styles.addressPhone}>{deliveryAddress.phone}</Text>
        </View>
        
        <Text style={styles.addressText}>
          {deliveryAddress.address}, {deliveryAddress.city}
        </Text>
        <Text style={styles.addressText}>
          {deliveryAddress.state} - {deliveryAddress.pincode}
        </Text>
        <Text style={styles.addressText}>{deliveryAddress.country}</Text>
      </View>
    </Animated.View>
  );

  // Render shipping method section
  const renderShippingSection = () => (
    <Animated.View style={[styles.sectionContainer, { opacity: fadeAnim }]}>
      <View style={styles.sectionHeader}>
        <Icon name="local-shipping" size={24} color={BRAND_COLORS.primaryDark} />
        <Text style={styles.sectionTitle}>Shipping Method</Text>
      </View>
      
      <View style={styles.shippingOptions}>
        <TouchableOpacity
          style={[styles.shippingOption, shippingFee === 0 && styles.shippingOptionSelected]}
          onPress={() => updateShipping('free')}
        >
          <View style={styles.shippingRadio}>
            {shippingFee === 0 && <View style={styles.shippingRadioSelected} />}
          </View>
          <View style={styles.shippingInfo}>
            <Text style={styles.shippingTitle}>Free Shipping</Text>
            <Text style={styles.shippingTime}>5-7 business days</Text>
          </View>
          <Text style={styles.shippingPrice}>₹0</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.shippingOption, shippingFee === 99 && styles.shippingOptionSelected]}
          onPress={() => updateShipping('standard')}
        >
          <View style={styles.shippingRadio}>
            {shippingFee === 99 && <View style={styles.shippingRadioSelected} />}
          </View>
          <View style={styles.shippingInfo}>
            <Text style={styles.shippingTitle}>Standard Shipping</Text>
            <Text style={styles.shippingTime}>3-5 business days</Text>
          </View>
          <Text style={styles.shippingPrice}>₹99</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.shippingOption, shippingFee === 199 && styles.shippingOptionSelected]}
          onPress={() => updateShipping('express')}
        >
          <View style={styles.shippingRadio}>
            {shippingFee === 199 && <View style={styles.shippingRadioSelected} />}
          </View>
          <View style={styles.shippingInfo}>
            <Text style={styles.shippingTitle}>Express Shipping</Text>
            <Text style={styles.shippingTime}>1-2 business days</Text>
          </View>
          <Text style={styles.shippingPrice}>₹199</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  // Render payment method section
  const renderPaymentSection = () => (
    <Animated.View style={[styles.sectionContainer, { opacity: fadeAnim }]}>
      <View style={styles.sectionHeader}>
        <Icon name="payment" size={24} color={BRAND_COLORS.primaryDark} />
        <Text style={styles.sectionTitle}>Payment Method</Text>
      </View>
      
      <View style={styles.paymentOptions}>
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === 'credit_card' && styles.paymentOptionSelected]}
          onPress={() => updatePaymentMethod('credit_card')}
        >
          <Icon name="credit-card" size={24} color={paymentMethod === 'credit_card' ? BRAND_COLORS.primaryDark : BRAND_COLORS.gray} />
          <Text style={[styles.paymentText, paymentMethod === 'credit_card' && styles.paymentTextSelected,
            {
              textAlign:"center"
            }
          ]}>
            Credit/Debit Card
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === 'upi' && styles.paymentOptionSelected,{
                          textAlign:"center"

          }]}
          onPress={() => updatePaymentMethod('upi')}
        >
          <Icon name="account-balance-wallet" size={24} color={paymentMethod === 'upi' ? BRAND_COLORS.primaryDark : BRAND_COLORS.gray} />
          <Text style={[styles.paymentText, paymentMethod === 'upi' && styles.paymentTextSelected,{
                          textAlign:"center"

          }]}>
            UPI
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === 'cod' && styles.paymentOptionSelected]}
          onPress={() => updatePaymentMethod('cod')}
        >
          <Icon name="money" size={24} color={paymentMethod === 'cod' ? BRAND_COLORS.primaryDark : BRAND_COLORS.gray} />
          <Text style={[styles.paymentText, paymentMethod === 'cod' && styles.paymentTextSelected,{
                          textAlign:"center"

          }]}>
            Cash on Delivery
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Card Details (show only if credit card selected) */}
   
    </Animated.View>
  );

  // Render order summary section
  const renderOrderSummary = () => (
    <Animated.View style={[styles.sectionContainer, { opacity: fadeAnim }]}>
      <View style={styles.sectionHeader}>
        <Icon name="receipt" size={24} color={BRAND_COLORS.primaryDark} />
        <Text style={styles.sectionTitle}>Order Summary</Text>
      </View>
      
      <View style={styles.orderSummary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹{subTotal}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>₹{shippingFee}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax (18%)</Text>
          <Text style={styles.summaryValue}>₹{tax}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={[styles.summaryRow, styles.grandTotalRow]}>
          <Text style={styles.grandTotalLabel}>Grand Total</Text>
          <Text style={styles.grandTotalValue}>₹{grandTotal}</Text>
        </View>
      </View>
    </Animated.View>
  );

  // Render header
  const renderHeader = () => (
    <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <LinearGradient
        colors={BRAND_COLORS.primaryGradient}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <View style={styles.headerContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Checkout</Text>
          <Text style={styles.headerSubtitle}>
            {orderItems.length} item{orderItems.length !== 1 ? 's' : ''}
          </Text>
        </View>
        
        <View style={styles.progressContainer}>
          
         </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Order Items */}
          <Animated.View style={[styles.sectionContainer, { opacity: fadeAnim }]}>
            <View style={styles.sectionHeader}>
              <Icon name="shopping-cart" size={24} color={BRAND_COLORS.primaryDark} />
              <Text style={styles.sectionTitle}>Order Items</Text>
            </View>
            
            <View style={styles.orderItemsContainer}>
              {orderItems.slice(0, 3).map((item, index) => renderOrderItem({ item, index }))}
              
              {orderItems.length > 3 && (
                <View style={styles.moreItems}>
                  <Text style={styles.moreItemsText}>
                    +{orderItems.length - 3} more item{orderItems.length - 3 !== 1 ? 's' : ''}
                  </Text>
                </View>
              )}
            </View>
          </Animated.View>
          
          {/* {renderAddressSection()} */}
          {renderShippingSection()}
          {renderPaymentSection()}
          {renderOrderSummary()}
          
          {/* Terms & Conditions */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </Text>
          </View>
          
          {/* Spacer for footer */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>
      
      {/* Checkout Footer */}
      <Animated.View style={[styles.checkoutFooter, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={BRAND_COLORS.primaryGradient}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        
        <View style={styles.footerContent}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>₹{grandTotal}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={placeOrder}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FFFFFF', '#F0F0F0']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            <View style={styles.placeOrderContent}>
              <Text style={styles.placeOrderText}>PLACE ORDER</Text>
              <Icon name="arrow-forward" size={20} color={BRAND_COLORS.primaryDark} />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 10,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: BRAND_COLORS.textLight,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  progressContainer: {
    alignItems: 'flex-end',
  },
  progressBar: {
    width: 100,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: BRAND_COLORS.accent,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
    color: BRAND_COLORS.textLight,
  },
  sectionContainer: {
    backgroundColor: BRAND_COLORS.cardBg,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BRAND_COLORS.textDark,
    marginLeft: 12,
    flex: 1,
  },
  editButton: {
    padding: 4,
  },
  addressCard: {
    backgroundColor: BRAND_COLORS.background,
    borderRadius: 8,
    padding: 12,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.textDark,
  },
  addressPhone: {
    fontSize: 14,
    color: BRAND_COLORS.gray,
  },
  addressText: {
    fontSize: 14,
    color: BRAND_COLORS.textDark,
    marginBottom: 4,
  },
  shippingOptions: {
    marginTop: 8,
  },
  shippingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: BRAND_COLORS.lightGray,
    borderRadius: 8,
    marginBottom: 8,
  },
  shippingOptionSelected: {
    borderColor: BRAND_COLORS.primaryDark,
    backgroundColor: 'rgba(134, 46, 146, 0.05)',
  },
  shippingRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: BRAND_COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  shippingRadioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BRAND_COLORS.primaryDark,
  },
  shippingInfo: {
    flex: 1,
  },
  shippingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.textDark,
    marginBottom: 2,
  },
  shippingTime: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
  },
  shippingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BRAND_COLORS.primaryDark,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  paymentOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: BRAND_COLORS.lightGray,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  paymentOptionSelected: {
    borderColor: BRAND_COLORS.primaryDark,
    backgroundColor: 'rgba(134, 46, 146, 0.05)',
  },
  paymentText: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    marginTop: 8,
  },
  paymentTextSelected: {
    color: BRAND_COLORS.primaryDark,
    fontWeight: '600',
  },
  cardDetailsContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: BRAND_COLORS.background,
    borderRadius: 8,
  },
  cardDetailsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.textDark,
    marginBottom: 8,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 14,
    color: BRAND_COLORS.gray,
  },
  changeCardButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: BRAND_COLORS.lightGray,
    borderRadius: 4,
  },
  changeCardText: {
    fontSize: 12,
    color: BRAND_COLORS.primaryDark,
    fontWeight: '600',
  },
  orderItemsContainer: {
    backgroundColor: BRAND_COLORS.background,
    borderRadius: 8,
    padding: 8,
  },
  orderItemContainer: {
    paddingVertical: 8,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: BRAND_COLORS.lightGray,
  },
  orderItemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  orderItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.textDark,
    marginBottom: 4,
  },
  orderItemBrand: {
    fontSize: 12,
    color: BRAND_COLORS.primaryDark,
  },
  orderItemQty: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    marginTop: 2,
  },
  orderItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BRAND_COLORS.primaryDark,
  },
  moreItems: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  moreItemsText: {
    fontSize: 14,
    color: BRAND_COLORS.gray,
  },
  orderSummary: {
    backgroundColor: BRAND_COLORS.background,
    borderRadius: 8,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: BRAND_COLORS.textDark,
  },
  summaryValue: {
    fontSize: 14,
    color: BRAND_COLORS.textDark,
    fontWeight: '600',
  },
  grandTotalRow: {
    marginTop: 8,
  },
  grandTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BRAND_COLORS.textDark,
  },
  grandTotalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: BRAND_COLORS.primaryDark,
  },
  termsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  termsText: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    lineHeight: 18,
  },
  bottomSpacer: {
    height: 100,
  },
  checkoutFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    color: BRAND_COLORS.textLight,
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: BRAND_COLORS.accent,
  },
  placeOrderButton: {
    borderRadius: 8,
    overflow: 'hidden',
    minWidth: 150,
  },
  placeOrderContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderText: {
    color: BRAND_COLORS.primaryDark,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: BRAND_COLORS.lightGray,
    marginVertical: 8,
  },
});

export default CheckoutScreen;