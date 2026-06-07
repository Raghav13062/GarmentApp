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
  StatusBar,
  Linking,
  Platform,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import RazorpayCheckout from 'react-native-razorpay';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import { color, fonts } from '../../../constant';
import Loading from '../../../utils/Loader';

const { width, height } = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

const PRIMARY = color.primary;        // #F58021
const SECONDARY = color.secondary;   // #862E92
const SUCCESS = '#00C853';
const BG = '#F7F8FC';
const CARD = '#FFFFFF';
const TEXT_DARK = '#1A1A2E';
const TEXT_MEDIUM = '#5A5A7A';
const TEXT_LIGHT = '#9B9BB4';
const BORDER = '#EBEBF5';

const getPaymentMethodLabel = (method: string) => {
  switch (method) {
    case 'credit_card':
    case 'card':
      return 'Credit / Debit Card';
    case 'upi':
      return 'UPI';
    case 'cod':
      return 'Cash on Delivery';
    default:
      return method || 'Online Payment';
  }
};

const getPaymentIcon = (method: string) => {
  if (method === 'credit_card' || method === 'card') return 'credit-card';
  if (method === 'upi') return 'account-balance-wallet';
  return 'money';
};

const ORDER_STEPS = [
  { key: 'ordered', label: 'Ordered', icon: 'shopping-bag' },
  { key: 'confirmed', label: 'Confirmed', icon: 'check-circle' },
  { key: 'processing', label: 'Processing', icon: 'autorenew' },
  { key: 'shipped', label: 'Shipped', icon: 'local-shipping' },
  { key: 'delivered', label: 'Delivered', icon: 'home' },
];

const STEP_MAP: Record<string, number> = {
  Ordered: 0,
  Confirmed: 1,
  Processing: 2,
  Shipped: 3,
  Delivered: 4,
};

const OrderConfirmationScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const orderData = route.params || {};

  const sampleItems =
    orderData.orderItems && orderData.orderItems.length > 0
      ? orderData.orderItems
      : [
          {
            id: 1,
            title: 'Wireless Bluetooth Headphones',
            brand: 'AudioTech',
            price: 2999,
            quantity: 1,
            image:
              'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
          },
          {
            id: 2,
            title: 'Sports Running Shoes',
            brand: 'SportFlex',
            price: 2499,
            quantity: 2,
            image:
              'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
          },
        ];

  const [order, setOrder] = useState({
    id:
      orderData.orderId ||
      'ORD' + Math.floor(100000 + Math.random() * 900000),
    items: sampleItems,
    total: orderData.totalAmount || 7597,
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
      status:
        orderData.paymentStatus ||
        (orderData.paymentMethod === 'cod' ? 'Pending' : 'Paid'),
      transactionId:
        orderData.transactionId || orderData.razorpayPaymentId || '',
    },
    status: 'Ordered',
    date: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    estimatedDelivery: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    ).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    shippingCost: 99,
    trackingNumber:
      'TRK' + Math.floor(1000000000 + Math.random() * 9000000000),
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;
  const ringAnim = useRef(new Animated.Value(0)).current;
  const confettiItems = useRef(
    Array.from({ length: 18 }).map(() => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(-20),
      rot: new Animated.Value(0),
      sc: new Animated.Value(0),
      color: [
        '#F58021', '#862E92', '#00C853', '#2196F3',
        '#FF4081', '#FFD600', '#00BCD4', '#FF5722',
      ][Math.floor(Math.random() * 8)],
      size: 8 + Math.random() * 8,
      isCircle: Math.random() > 0.5,
    })),
  ).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Check badge pop
    setTimeout(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 120,
        friction: 8,
        useNativeDriver: true,
      }).start();

      // Ring pulse
      Animated.loop(
        Animated.sequence([
          Animated.timing(ringAnim, {
            toValue: 1,
            duration: 900,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(ringAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 3 },
      ).start();

      // Check draw
      Animated.timing(checkAnim, {
        toValue: 1,
        duration: 400,
        delay: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();

      // Confetti burst
      confettiItems.forEach((piece, i) => {
        Animated.sequence([
          Animated.delay(i * 40),
          Animated.parallel([
            Animated.timing(piece.y, {
              toValue: height * 0.55 + Math.random() * 100,
              duration: 1200 + Math.random() * 800,
              easing: Easing.bezier(0.22, 0.61, 0.36, 1),
              useNativeDriver: true,
            }),
            Animated.timing(piece.rot, {
              toValue: Math.random() > 0.5 ? 360 : -360,
              duration: 1000 + Math.random() * 600,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.spring(piece.sc, {
              toValue: 1,
              tension: 200,
              friction: 5,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      });
    }, 300);

    // Step progression
    const timers = [
      setTimeout(() => setOrder(p => ({ ...p, status: 'Confirmed' })), 1800),
      setTimeout(() => setOrder(p => ({ ...p, status: 'Processing' })), 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const payWithRazorpay = async () => {
    setIsProcessingPayment(true);
    const options = {
      key: 'rzp_test_SvVqvXhLv2LPB8',
      amount: Math.round(order.total * 100),
      currency: 'INR',
      name: 'Kimbo',
      description: `Payment for Order #${order.id}`,
      prefill: {
        email: orderData.deliveryAddress?.email || '',
        contact: order.address.phone || '',
        name: order.address.fullName || '',
      },
      notes: { order_id: order.id },
      theme: { color: PRIMARY },
    };
    try {
      const paymentDetails: any = await RazorpayCheckout.open(options);
      setOrder(prev => ({
        ...prev,
        payment: {
          ...prev.payment,
          status: 'Paid',
          transactionId:
            paymentDetails?.razorpay_payment_id || prev.payment.transactionId,
        },
      }));
      Alert.alert('✅ Payment Successful', `Payment ID: ${paymentDetails?.razorpay_payment_id || '—'}\n\nThank you for your order!`, [{ text: 'OK' }]);
    } catch (error: any) {
      const msg =
        error?.description ||
        error?.error?.description ||
        'Payment was cancelled or failed.';
      Alert.alert('❌ Payment Failed', msg, [
        { text: 'Retry', onPress: payWithRazorpay },
        { text: 'Cancel', style: 'cancel' },
      ]);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const downloadInvoice = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      Alert.alert('Invoice Downloaded', `Invoice for Order #${order.id} has been saved.`, [{ text: 'OK' }]);
    }, 1500);
  };

  const shareOrder = async () => {
    try {
      await Share.share({
        title: `Order Confirmation - ${order.id}`,
        message: `🎉 Order Confirmed!\n\nOrder ID: ${order.id}\nTotal: ₹${order.total}\nEstimated Delivery: ${order.estimatedDelivery}\n\nThank you for shopping with us!`,
      });
    } catch (e) {}
  };

  const continueShopping = () => {
    navigation.reset({ index: 0, routes: [{ name: 'HomeScreen' }] });
  };

  const currentStep = STEP_MAP[order.status] ?? 0;
  const subtotal = order.total - order.shippingCost;
  const tax = Math.round(subtotal * 0.18);

  return (
    <SafeAreaView style={styles.root} edges={[]}>
      <StatusBarComponent
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      {/* ── HEADER ── */}
      <LinearGradient
        colors={[PRIMARY, SECONDARY]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.header, { paddingTop: STATUSBAR_HEIGHT + 8 }]}
      >
        <TouchableOpacity
          style={styles.headerBack}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back-ios" size={20} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Order Confirmed</Text>
          <Text style={styles.headerSub}>#{order.id}</Text>
        </View>

        <TouchableOpacity
          style={styles.headerShare}
          onPress={shareOrder}
          activeOpacity={0.7}
        >
          <Icon name="share" size={20} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ── SUCCESS BADGE ── */}
        <View style={styles.badgeWrapper}>
          {/* Confetti */}
          {confettiItems.map((piece, i) => (
            <Animated.View
              key={i}
              style={[
                styles.confetti,
                {
                  width: piece.size,
                  height: piece.size,
                  borderRadius: piece.isCircle ? piece.size / 2 : 2,
                  backgroundColor: piece.color,
                  transform: [
                    { translateX: piece.x },
                    { translateY: piece.y },
                    {
                      rotate: piece.rot.interpolate({
                        inputRange: [-360, 360],
                        outputRange: ['-360deg', '360deg'],
                      }),
                    },
                    { scale: piece.sc },
                  ],
                },
              ]}
            />
          ))}
 

          {/* Badge */}
          <Animated.View
            style={[
              styles.badgeCircle,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <LinearGradient
              colors={['#00C853', '#00E676']}
              style={styles.badgeGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Animated.View style={{ opacity: checkAnim, transform: [{ scale: checkAnim }] }}>
                <Icon name="check" size={52} color="#fff" />
              </Animated.View>
            </LinearGradient>
          </Animated.View>

          <Text style={styles.badgeTitle}>Order Placed Successfully!</Text>
          <Text style={styles.badgeDate}>Placed on {order.date}</Text>
        </View>

        {/* ── ORDER STATUS STEPPER ── */}
        <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.sectionRow}>
            <Icon name="local-shipping" size={20} color={PRIMARY} />
            <Text style={styles.sectionTitle}>Order Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{order.status}</Text>
            </View>
          </View>

          <Text style={styles.deliveryEta}>
            🚀 Estimated Delivery: <Text style={styles.deliveryEtaDate}>{order.estimatedDelivery}</Text>
          </Text>

          {/* Stepper */}
          <View style={styles.stepper}>
            {ORDER_STEPS.map((step, i) => {
              const isActive = i <= currentStep;
              const isLast = i === ORDER_STEPS.length - 1;
              return (
                <View key={step.key} style={styles.stepItem}>
                  {/* Line before */}
                  {i > 0 && (
                    <View
                      style={[
                        styles.stepLine,
                        { backgroundColor: i <= currentStep ? PRIMARY : BORDER },
                      ]}
                    />
                  )}

                  {/* Dot */}
                  <View
                    style={[
                      styles.stepDot,
                      isActive
                        ? { backgroundColor: PRIMARY, borderColor: PRIMARY }
                        : { backgroundColor: '#fff', borderColor: BORDER },
                    ]}
                  >
                    <Icon
                      name={step.icon}
                      size={12}
                      color={isActive ? '#fff' : TEXT_LIGHT}
                    />
                  </View>

                  <Text
                    style={[
                      styles.stepLabel,
                      { color: isActive ? PRIMARY : TEXT_LIGHT, fontWeight: isActive ? '700' : '400' },
                    ]}
                  >
                    {step.label}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Tracking Row */}
          <View style={styles.trackingRow}>
            <Icon name="qr-code" size={16} color={TEXT_MEDIUM} />
            <Text style={styles.trackingText}>
              Tracking No:{' '}
              <Text style={styles.trackingNo}>{order.trackingNumber}</Text>
            </Text>
          </View>
        </Animated.View>

        {/* ── ORDER ITEMS ── */}
        <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.sectionRow}>
            <Icon name="inventory-2" size={20} color={PRIMARY} />
            <Text style={styles.sectionTitle}>
              Order Items ({order.items.length})
            </Text>
          </View>

          {order.items.map((item: any, index: number) => (
            <View
              key={item.id || index}
              style={[
                styles.itemRow,
                index < order.items.length - 1 && styles.itemBorder,
              ]}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.itemImage}
                resizeMode="cover"
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>
                  {item.title || item.name}
                </Text>
                {!!item.brand && (
                  <Text style={styles.itemBrand}>{item.brand}</Text>
                )}
                <View style={styles.itemMeta}>
                  <View style={styles.qtyBadge}>
                    <Text style={styles.qtyText}>Qty: {item.quantity || 1}</Text>
                  </View>
                  <Text style={styles.itemPrice}>₹{item.price?.toLocaleString('en-IN')}</Text>
                </View>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* ── PRICE BREAKDOWN ── */}
        <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.sectionRow}>
            <Icon name="receipt-long" size={20} color={PRIMARY} />
            <Text style={styles.sectionTitle}>Price Details</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>
              Price ({order.items.length} item{order.items.length > 1 ? 's' : ''})
            </Text>
            <Text style={styles.priceValue}>₹{subtotal.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery Charges</Text>
            <Text style={[styles.priceValue, { color: SUCCESS }]}>
              {order.shippingCost === 0 ? 'FREE' : `₹${order.shippingCost}`}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>GST (18%)</Text>
            <Text style={styles.priceValue}>₹{tax.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.priceDivider} />

          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{order.total.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.savingsBanner}>
            <Icon name="local-offer" size={14} color={SUCCESS} />
            <Text style={styles.savingsText}>
              You saved ₹{Math.round(subtotal * 0.1).toLocaleString('en-IN')} on this order!
            </Text>
          </View>
        </Animated.View>

        {/* ── PAYMENT INFO ── */}
        <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.sectionRow}>
            <Icon name="payments" size={20} color={PRIMARY} />
            <Text style={styles.sectionTitle}>Payment</Text>
            <View
              style={[
                styles.payStatusBadge,
                {
                  backgroundColor:
                    order.payment.status === 'Paid'
                      ? 'rgba(0,200,83,0.12)'
                      : 'rgba(255,152,0,0.12)',
                },
              ]}
            >
              <View
                style={[
                  styles.payStatusDot,
                  {
                    backgroundColor:
                      order.payment.status === 'Paid' ? SUCCESS : color.warning,
                  },
                ]}
              />
              <Text
                style={[
                  styles.payStatusText,
                  {
                    color:
                      order.payment.status === 'Paid' ? SUCCESS : color.warning,
                  },
                ]}
              >
                {order.payment.status}
              </Text>
            </View>
          </View>

          <View style={styles.paymentDetail}>
            <View style={styles.paymentIconBox}>
              <Icon
                name={getPaymentIcon(order.payment.method)}
                size={22}
                color={SECONDARY}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.paymentMethod}>
                {getPaymentMethodLabel(order.payment.method)}
              </Text>
              {!!order.payment.transactionId && (
                <Text style={styles.txnId}>
                  Txn ID: {order.payment.transactionId}
                </Text>
              )}
            </View>
          </View>

          {order.payment.status !== 'Paid' &&
            order.payment.method !== 'cod' && (
              <TouchableOpacity
                style={styles.payNowBtn}
                onPress={payWithRazorpay}
                disabled={isProcessingPayment}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={[PRIMARY, SECONDARY]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.payNowGradient}
                >
                  {isProcessingPayment ? (
                    <Loading fullScreen={false} size="small" color="#fff" />
                  ) : (
                    <>
                      <Icon name="lock" size={16} color="#fff" />
                      <Text style={styles.payNowText}>Pay Securely Now</Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            )}
        </Animated.View>

        {/* ── DELIVERY ADDRESS ── */}
        <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.sectionRow}>
            <Icon name="location-on" size={20} color={PRIMARY} />
            <Text style={styles.sectionTitle}>Delivery Address</Text>
          </View>

          <View style={styles.addressBox}>
            <View style={styles.addressLeft}>
              <View style={styles.addressIconBox}>
                <Icon name="home" size={18} color={SECONDARY} />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.addressName}>{order.address.fullName}</Text>
              <Text style={styles.addressLine}>{order.address.address}</Text>
              {!!order.address.city && (
                <Text style={styles.addressLine}>
                  {order.address.city}, {order.address.state} - {order.address.pincode}
                </Text>
              )}
              <View style={styles.phoneRow}>
                <Icon name="phone" size={13} color={TEXT_MEDIUM} />
                <Text style={styles.addressPhone}>{order.address.phone}</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* ── NEED HELP ── */}
        <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.helpTitle}>Need Help?</Text>
          <Text style={styles.helpSub}>We're here 24/7 for you</Text>
          <TouchableOpacity
            style={styles.helpBtn}
            onPress={() =>
              Linking.openURL(
                `mailto:support@kimbo.com?subject=Order Inquiry: ${order.id}`,
              )
            }
            activeOpacity={0.8}
          >
            <Icon name="support-agent" size={18} color={SECONDARY} />
            <Text style={styles.helpBtnText}>Contact Support</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ── BOTTOM ACTIONS ── */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.invoiceBtn}
            onPress={downloadInvoice}
            disabled={isDownloading}
            activeOpacity={0.8}
          >
            {isDownloading ? (
              <Loading fullScreen={false} size="small" color={SECONDARY} />
            ) : (
              <>
                <Icon name="picture-as-pdf" size={18} color={SECONDARY} />
                <Text style={styles.invoiceBtnText}>Download Invoice</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shopBtn}
            onPress={continueShopping}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[PRIMARY, SECONDARY]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.shopBtnGradient}
            >
              <Icon name="storefront" size={18} color="#fff" />
              <Text style={styles.shopBtnText}>Continue Shopping</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },

  // ── HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  headerBack: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  headerSub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 1,
  },
  headerShare: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── SCROLL
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  // ── BADGE
  badgeWrapper: {
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 28,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 220,
  },
  confetti: {
    position: 'absolute',
    top: 0,
  },
  ring: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: SUCCESS,
    top: 36,
  },
  badgeCircle: {
    marginBottom: 16,
    shadowColor: SUCCESS,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  badgeGradient: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: TEXT_DARK,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  badgeDate: {
    fontSize: 13,
    color: TEXT_MEDIUM,
  },

  // ── CARD
  card: {
    backgroundColor: CARD,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_DARK,
    marginLeft: 8,
    flex: 1,
  },

  // ── STATUS STEPPER
  statusBadge: {
    backgroundColor: 'rgba(245,128,33,0.12)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: PRIMARY,
  },
  deliveryEta: {
    fontSize: 13,
    color: TEXT_MEDIUM,
    marginBottom: 20,
  },
  deliveryEtaDate: {
    fontWeight: '700',
    color: TEXT_DARK,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepItem: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  stepLine: {
    position: 'absolute',
    top: 12,
    right: '50%',
    left: '-50%',
    height: 2,
  },
  stepDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    zIndex: 1,
  },
  stepLabel: {
    fontSize: 9,
    textAlign: 'center',
    lineHeight: 13,
  },
  trackingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BG,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  trackingText: {
    fontSize: 12,
    color: TEXT_MEDIUM,
    marginLeft: 8,
  },
  trackingNo: {
    fontWeight: '700',
    color: TEXT_DARK,
  },

  // ── ITEMS
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  itemImage: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: BG,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 14,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_DARK,
    lineHeight: 18,
    marginBottom: 4,
  },
  itemBrand: {
    fontSize: 11,
    color: PRIMARY,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyBadge: {
    backgroundColor: BG,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  qtyText: {
    fontSize: 11,
    color: TEXT_MEDIUM,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: TEXT_DARK,
  },

  // ── PRICE BREAKDOWN
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 13,
    color: TEXT_MEDIUM,
  },
  priceValue: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_DARK,
  },
  priceDivider: {
    height: 1,
    backgroundColor: BORDER,
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: TEXT_DARK,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: PRIMARY,
  },
  savingsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,200,83,0.08)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
  },
  savingsText: {
    fontSize: 12,
    color: SUCCESS,
    fontWeight: '700',
    marginLeft: 6,
  },

  // ── PAYMENT
  payStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  payStatusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 5,
  },
  payStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  paymentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BG,
    borderRadius: 12,
    padding: 14,
  },
  paymentIconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(134,46,146,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentMethod: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  txnId: {
    fontSize: 11,
    color: TEXT_MEDIUM,
    marginTop: 2,
  },
  payNowBtn: {
    marginTop: 14,
    borderRadius: 12,
    overflow: 'hidden',
  },
  payNowGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  payNowText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 8,
  },

  // ── ADDRESS
  addressBox: {
    flexDirection: 'row',
    backgroundColor: BG,
    borderRadius: 12,
    padding: 14,
  },
  addressLeft: {
    marginRight: 12,
  },
  addressIconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(134,46,146,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressName: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 4,
  },
  addressLine: {
    fontSize: 13,
    color: TEXT_MEDIUM,
    lineHeight: 19,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  addressPhone: {
    fontSize: 12,
    color: TEXT_MEDIUM,
    marginLeft: 4,
  },

  // ── HELP
  helpTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 4,
  },
  helpSub: {
    fontSize: 12,
    color: TEXT_MEDIUM,
    marginBottom: 14,
  },
  helpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: SECONDARY,
    borderRadius: 12,
    paddingVertical: 12,
  },
  helpBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: SECONDARY,
    marginLeft: 8,
  },

  // ── BOTTOM ACTIONS
  bottomActions: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 4,
    gap: 10,
  },
  invoiceBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: SECONDARY,
    borderRadius: 14,
    paddingVertical: 14,
    backgroundColor: CARD,
  },
  invoiceBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: SECONDARY,
    marginLeft: 6,
  },
  shopBtn: {
    flex: 1.4,
    borderRadius: 14,
    overflow: 'hidden',
  },
  shopBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  shopBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 6,
  },
});

export default OrderConfirmationScreen;
