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
  Share,
  StatusBar,
  Modal,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

// Brand Colors
const BRAND_COLORS = {
  primaryGradient: ['#F58021', '#862E92'],
  primaryGradient1: ['#16f564ff', '#01e761ff'],
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
  successLight: 'rgba(76, 175, 80, 0.1)',
  infoLight: 'rgba(33, 150, 243, 0.1)',
};

const OrderConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Get order data from route params
  const orderData = route.params || {
    orderId: 'ORD' + Math.floor(100000 + Math.random() * 900000),
    orderItems: [],
    totalAmount: 0,
    deliveryAddress: {},
    paymentMethod: 'credit_card',
    orderDate: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
  
  // Sample order items if none provided
  const sampleItems = orderData.orderItems && orderData.orderItems.length > 0 
    ? orderData.orderItems 
    : [
        {
          id: 1,
          title: "Wireless Bluetooth Headphones",
          brand: "AudioTech",
          price: 2999,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
        },
        {
          id: 2,
          title: "Sports Running Shoes",
          brand: "SportFlex",
          price: 2499,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
        }
      ];
  
  const [order, setOrder] = useState({
    id: orderData.orderId || 'ORD' + Math.floor(100000 + Math.random() * 900000),
    items: sampleItems,
    total: orderData.totalAmount || 5498,
    address: orderData.deliveryAddress || {
      fullName: 'John Doe',
      address: '123 Main Street, Andheri East',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 9876543210',
    },
    payment: {
      method: orderData.paymentMethod || 'credit_card',
      status: 'Paid',
      transactionId: 'TXN' + Math.floor(100000000 + Math.random() * 900000000),
    },
    status: 'Processing',
    date: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    shipping: {
      method: 'Standard Shipping',
      cost: 99,
      trackingNumber: 'TRK' + Math.floor(1000000000 + Math.random() * 9000000000),
    },
  });
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(true);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Create multiple confetti pieces
  const confettiPieces = Array.from({ length: 20 }).map(() => ({
    x: useRef(new Animated.Value(Math.random() * width)).current,
    y: useRef(new Animated.Value(-10)).current,
    rotation: useRef(new Animated.Value(0)).current,
    scale: useRef(new Animated.Value(0)).current,
  }));

  useEffect(() => {
    // Start entrance animations
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
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Show success animation after entrance
      setTimeout(() => {
        animateCheckmark();
        animateConfetti();
      }, 300);
    });

    // Simulate order status updates
    const timers = [
      setTimeout(() => {
        setOrder(prev => ({ ...prev, status: 'Confirmed' }));
      }, 1500),
      setTimeout(() => {
        setOrder(prev => ({ ...prev, status: 'Processing' }));
      }, 3000),
      setTimeout(() => {
        setOrder(prev => ({ ...prev, status: 'Shipped' }));
      }, 5000),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Animate checkmark
  const animateCheckmark = () => {
    Animated.spring(checkmarkScale, {
      toValue: 1,
      tension: 100,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  // Animate confetti
  const animateConfetti = () => {
    const animations = confettiPieces.map((piece, index) =>
      Animated.sequence([
        Animated.delay(index * 30),
        Animated.parallel([
          Animated.timing(piece.y, {
            toValue: height * 0.7,
            duration: 1500 + Math.random() * 1000,
            easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            useNativeDriver: true,
          }),
          Animated.timing(piece.rotation, {
            toValue: Math.random() * 360,
            duration: 1000 + Math.random() * 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.spring(piece.scale, {
            toValue: 1,
            tension: 200,
            friction: 5,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    
    Animated.stagger(50, animations).start();
  };

  // Download invoice
  const downloadInvoice = async () => {
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      Alert.alert(
        'Invoice Downloaded',
        `Invoice for Order #${order.id} has been saved to your device.`,
        [{ text: 'OK', style: 'default' }]
      );
    }, 1500);
  };

  // Share order details
  const shareOrder = async () => {
    setIsSharing(true);
    
    try {
      const shareContent = {
        title: `Order Confirmation - ${order.id}`,
        message: `🎉 Order Confirmed!\n\nOrder ID: ${order.id}\nTotal Amount: ₹${order.total}\nStatus: ${order.status}\nEstimated Delivery: ${order.estimatedDelivery}\n\nThank you for your purchase!`,
        url: 'https://yourwebsite.com/order-tracking',
      };
      
      const result = await Share.share(shareContent);
      
      if (result.action === Share.sharedAction) {
        console.log('Order shared successfully');
      }
    } catch (error) {
      console.error('Error sharing order:', error);
    } finally {
      setIsSharing(false);
    }
  };

  // Track order
  const trackOrder = () => {
    Alert.alert(
      'Track Your Order',
      `Tracking Number: ${order.shipping.trackingNumber}\n\nYou can track your order using the tracking number above.`,
      [
        { text: 'Copy Tracking No', onPress: () => console.log('Copied') },
        { text: 'OK', style: 'default' }
      ]
    );
  };

  // Continue shopping
  const continueShopping = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  };

  // View order details
  const viewOrderDetails = () => {
    Alert.alert(
      'Order Details',
      `Order ID: ${order.id}\nDate: ${order.date}\nStatus: ${order.status}\nTotal: ₹${order.total}\nItems: ${order.items.length}`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  // Contact support
  const contactSupport = () => {
    Linking.openURL('mailto:support@shoppingapp.com?subject=Order Inquiry: ' + order.id);
  };

  // Render success animation
  const renderSuccessAnimation = () => (
    <View style={styles.successAnimationContainer}>
      {/* Confetti Pieces */}
      {confettiPieces.map((piece, index) => (
        <Animated.View
          key={index}
          style={[
            styles.confettiPiece,
            {
              backgroundColor: [
                '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
                '#FFEAA7', '#DDA0DD', '#98D8C8'
              ][index % 8],
              transform: [
                { translateX: piece.x },
                { translateY: piece.y },
                { rotate: piece.rotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg']
                  }) 
                },
                { scale: piece.scale },
              ],
            },
          ]}
        />
      ))}
      
      {/* Success Icon */}
      <Animated.View style={[styles.successIconContainer, { transform: [{ scale: checkmarkScale }] }]}>
        <LinearGradient
          colors={BRAND_COLORS.primaryGradient1}
          style={styles.successIconGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Icon name="check" size={60} color="#ffffffff" />
        </LinearGradient>
      </Animated.View>
    </View>
  );

  // Render order item
  const renderOrderItem = ({ item, index }) => {
    const animationDelay = index * 100;
    const itemAnimation = {
      opacity: fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
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
      <Animated.View style={[styles.orderItemContainer, { animationDelay }, itemAnimation]}>
        <View style={styles.orderItem}>
          <Image
            source={{ uri: item.image }}
            style={styles.orderItemImage}
            defaultSource={{ uri: 'https://via.placeholder.com/100' }}
          />
          
          <View style={styles.orderItemDetails}>
            <Text style={styles.orderItemTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.orderItemBrand}>{item.brand}</Text>
            <View style={styles.orderItemMeta}>
              <Text style={styles.orderItemQty}>Qty: {item.quantity || 1}</Text>
              <Text style={styles.orderItemPrice}>₹{item.price}</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

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
          <Text style={styles.headerTitle}>Order Confirmed!</Text>
          <Text style={styles.headerSubtitle}>Thank you for your purchase</Text>
        </View>
        
        {/* <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.headerIconButton}
            onPress={shareOrder}
            disabled={isSharing}
          >
            {isSharing ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Icon name="share" size={22} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View> */}
      </View>
    </Animated.View>
  );

  // Render order status
  const renderOrderStatus = () => (
    <Animated.View style={[styles.statusContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
      <LinearGradient
        colors={BRAND_COLORS.primaryGradient}
        style={styles.statusGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.statusContent}>
          <View style={styles.statusHeader}>
            <Icon name="local-shipping" size={28} color="#FFFFFF" />
            <Text style={styles.statusTitle}>Order Status</Text>
          </View>
          
          <Text style={styles.orderId}>Order #: {order.id}</Text>
          
          <View style={styles.statusIndicator}>
            <Animated.View style={[styles.statusProgress, {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            }]} />
          </View>
          
          <View style={styles.statusSteps}>
            <View style={[styles.statusStep, styles.statusStepActive]}>
              <View style={styles.statusStepIcon}>
                <Icon name="shopping-cart" size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.statusStepText}>Ordered</Text>
            </View>
            
            <View style={[styles.statusStep, order.status === 'Confirmed' || order.status === 'Processing' || order.status === 'Shipped' ? styles.statusStepActive : {}]}>
              <View style={[styles.statusStepIcon, (order.status === 'Confirmed' || order.status === 'Processing' || order.status === 'Shipped') && styles.statusStepIconActive]}>
                <Icon name="check-circle" size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.statusStepText}>Confirmed</Text>
            </View>
            
            <View style={[styles.statusStep, order.status === 'Processing' || order.status === 'Shipped' ? styles.statusStepActive : {}]}>
              <View style={[styles.statusStepIcon, (order.status === 'Processing' || order.status === 'Shipped') && styles.statusStepIconActive]}>
                <Icon name="build" size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.statusStepText}>Processing</Text>
            </View>
            
            <View style={[styles.statusStep, order.status === 'Shipped' ? styles.statusStepActive : {}]}>
              <View style={[styles.statusStepIcon, order.status === 'Shipped' && styles.statusStepIconActive]}>
                <Icon name="local-shipping" size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.statusStepText}>Shipped</Text>
            </View>
          </View>
          
          <Text style={styles.currentStatus}>Current Status: {order.status}</Text>
          <Text style={styles.estimatedDelivery}>Estimated Delivery: {order.estimatedDelivery}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  // Render order summary
  const renderOrderSummary = () => (
    <Animated.View style={[styles.summaryContainer, { opacity: fadeAnim }]}>
      <View style={styles.sectionHeader}>
        <Icon name="receipt" size={24} color={BRAND_COLORS.primaryDark} />
        <Text style={styles.sectionTitle}>Order Summary</Text>
      </View>
      
      <View style={styles.orderItemsList}>
        {order.items.slice(0, 2).map((item, index) => renderOrderItem({ item, index }))}
        
        {order.items.length > 2 && (
          <View style={styles.moreItems}>
            <Text style={styles.moreItemsText}>
              +{order.items.length - 2} more item{order.items.length - 2 !== 1 ? 's' : ''}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.summaryDetails}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹{order.total - order.shipping.cost}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>₹{order.shipping.cost}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax (18%)</Text>
          <Text style={styles.summaryValue}>₹{Math.round((order.total - order.shipping.cost) * 0.18)}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={[styles.summaryRow, styles.grandTotalRow]}>
          <Text style={styles.grandTotalLabel}>Grand Total</Text>
          <Text style={styles.grandTotalValue}>₹{order.total}</Text>
        </View>
        
        <View style={styles.paymentMethod}>
          <Icon 
            name={order.payment.method === 'credit_card' ? 'credit-card' : 
                  order.payment.method === 'upi' ? 'account-balance-wallet' : 'money'} 
            size={20} 
            color={BRAND_COLORS.primaryDark} 
          />
          <Text style={styles.paymentText}>
            Paid via {order.payment.method === 'credit_card' ? 'Credit Card' : 
                     order.payment.method === 'upi' ? 'UPI' : 'Cash on Delivery'}
          </Text>
        </View>
      </View>
    </Animated.View>
  );

  // Render delivery address
  const renderDeliveryAddress = () => (
    <Animated.View style={[styles.addressContainer, { opacity: fadeAnim }]}>
      <View style={styles.sectionHeader}>
        <Icon name="location-on" size={24} color={BRAND_COLORS.primaryDark} />
        <Text style={styles.sectionTitle}>Delivery Address</Text>
      </View>
      
      <View style={styles.addressCard}>
        <View style={styles.addressHeader}>
          <Text style={styles.addressName}>{order.address.fullName}</Text>
          <Text style={styles.addressPhone}>{order.address.phone}</Text>
        </View>
        
        <Text style={styles.addressText}>{order.address.address}</Text>
        {order.address.city && <Text style={styles.addressText}>{order.address.city}, {order.address.state} - {order.address.pincode}</Text>}
        
        <TouchableOpacity style={styles.editAddressButton}>
          <Text style={styles.editAddressText}>Edit Address</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  // Render action buttons
  const renderActionButtons = () => (
    <Animated.View style={[styles.actionsContainer, { opacity: fadeAnim }]}>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.trackButton]}
          onPress={trackOrder}
          activeOpacity={0.8}
        >
          <Icon name="my-location" size={20} color={BRAND_COLORS.primaryDark} />
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.downloadButton]}
          onPress={downloadInvoice}
          disabled={isDownloading}
          activeOpacity={0.8}
        >
          {isDownloading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Icon name="download" size={20} color="#FFFFFF" />
              <Text style={styles.downloadButtonText}>Download Invoice</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        style={[styles.actionButton, styles.detailsButton]}
        onPress={viewOrderDetails}
        activeOpacity={0.8}
      >
        <Icon name="info" size={20} color={BRAND_COLORS.primaryDark} />
        <Text style={styles.detailsButtonText}>View Order Details</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={BRAND_COLORS.primaryDark} barStyle="light-content" />
      
      {renderHeader()}
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Animation */}
        {showSuccess && renderSuccessAnimation()}
        
        {/* Order Status */}
        {/* {renderOrderStatus()} */}
        
        {/* Order Summary */}
        {renderOrderSummary()}
        
        {/* Delivery Address */}
        {renderDeliveryAddress()}
        
        {/* Action Buttons */}
        {/* {renderActionButtons()} */}
        
        {/* Continue Shopping Button */}
    
        {/* Footer Spacer */}
        {/* <View style={styles.footerSpacer} /> */}
      </ScrollView>
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
    paddingBottom: 40,
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
  headerIcons: {
    flexDirection: 'row',
  },
  headerIconButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    marginLeft: 8,
  },
  successAnimationContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    height: 200,
    position: 'relative',
    overflow: 'hidden',
  },
  confettiPiece: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 2,
    top: 0,
  },
  successIconContainer: {
    marginTop: 20,
  },
  successIconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
     shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  statusContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusGradient: {
    padding: 20,
  },
  statusContent: {
    alignItems: 'center',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: BRAND_COLORS.textLight,
    marginLeft: 10,
  },
  orderId: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusIndicator: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: 30,
    overflow: 'hidden',
  },
  statusProgress: {
    height: '100%',
    backgroundColor: BRAND_COLORS.accent,
    borderRadius: 3,
  },
  statusSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  statusStep: {
    alignItems: 'center',
    flex: 1,
  },
  statusStepActive: {
    opacity: 1,
  },
  statusStepIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusStepIconActive: {
    backgroundColor: BRAND_COLORS.accent,
  },
  statusStepText: {
    fontSize: 10,
    color: BRAND_COLORS.textLight,
    textAlign: 'center',
  },
  currentStatus: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.accent,
    marginBottom: 8,
  },
  estimatedDelivery: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  summaryContainer: {
    backgroundColor: BRAND_COLORS.cardBg,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
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
  },
  orderItemsList: {
    marginBottom: 20,
  },
  orderItemContainer: {
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.background,
    borderRadius: 12,
    padding: 12,
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
    marginBottom: 4,
  },
  orderItemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItemQty: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
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
    fontStyle: 'italic',
  },
  summaryDetails: {
    backgroundColor: BRAND_COLORS.background,
    borderRadius: 12,
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
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: BRAND_COLORS.lightGray,
  },
  paymentText: {
    fontSize: 14,
    color: BRAND_COLORS.primaryDark,
    marginLeft: 8,
    fontWeight: '600',
  },
  addressContainer: {
    backgroundColor: BRAND_COLORS.cardBg,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  addressCard: {
    backgroundColor: BRAND_COLORS.background,
    borderRadius: 12,
    padding: 16,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
    marginBottom: 6,
    lineHeight: 20,
  },
  editAddressButton: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  editAddressText: {
    fontSize: 14,
    color: BRAND_COLORS.primaryDark,
    fontWeight: '600',
  },
  actionsContainer: {
    backgroundColor: BRAND_COLORS.cardBg,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 6,
  },
  trackButton: {
    backgroundColor: 'rgba(134, 46, 146, 0.1)',
    borderWidth: 1,
    borderColor: BRAND_COLORS.primaryDark,
  },
  trackButtonText: {
    fontSize: 14,
    color: BRAND_COLORS.primaryDark,
    fontWeight: '600',
    marginLeft: 8,
  },
  downloadButton: {
    backgroundColor: BRAND_COLORS.primaryDark,
  },
  downloadButtonText: {
    fontSize: 14,
    color: BRAND_COLORS.textLight,
    fontWeight: '600',
    marginLeft: 8,
  },

})
export default OrderConfirmationScreen