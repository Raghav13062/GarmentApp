import { color } from "../../../../constant";
import React, { useEffect, useRef, useState } from 'react';
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
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import { errorToast, successToast } from '../../../../utils/customToast';
import { styles } from './style';
import RazorpayCheckout from 'react-native-razorpay';
// import { RAZORPAY_KEY_ID } from '@env';
import StatusBarComponent from '../../../../component/StatusBarCompoent';

const { width } = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

const BRAND_COLORS = {
  primaryGradient: [color.primary, color.secondary],
  primaryDark: color.secondary,
  primaryLight: color.primary,
  background: color.backgroundLight,
  textDark: '#2D3436',
  textLight: color.white,
  cardBg: color.white,
  gray: '#757575',
  lightGray: color.borderLight,
};

const TAX_PERCENT = 0.18;
const ONLINE_PAYMENT_METHODS = ['upi', 'card'];

const paymentMethodLabels: Record<string, string> = {
  cod: 'Cash on Delivery',
  upi: 'UPI',
  card: 'Credit / Debit Card',
};

const CheckoutScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const product = route.params?.product;
  const cartItems = route.params?.cartItems;
  const totalAmountFromCart = route.params?.totalAmount || 0;
  const subtotalFromCart = route.params?.subtotal || totalAmountFromCart;
  const discountFromCart = route.params?.discount || 0;

  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [tax, setTax] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    prepareOrderItems();
  }, []);

  /** ---------------- CALCULATIONS ---------------- */

  const calculateTax = (amount: number) => Math.round(amount * TAX_PERCENT);

  const calculateGrandTotal = (sub: number, ship: number) =>
    sub + ship + calculateTax(sub);

  /** ---------------- DATA PREP ---------------- */

  const prepareOrderItems = () => {
    if (cartItems && cartItems.length > 0) {
      setOrderItems(cartItems);
      setSubTotal(subtotalFromCart);
      setDiscount(discountFromCart);
      setGrandTotal(totalAmountFromCart);
    } else if (product) {
      const price = parseFloat(product.price || 0);
      const discountPrice = parseFloat(product.discountPrice || product.price || 0);

      const formattedProduct = {
        _id: product._id,
        name: product.name || product.title,
        price: discountPrice,
        originalPrice: price,
        quantity: 1,
        image: product.images?.[0] || product.baseImages?.[0],
        brand: product.brand || product.categoryId?.name || '',
      };

      setOrderItems([formattedProduct]);
      setSubTotal(price);
      setDiscount(price - discountPrice);
      setGrandTotal(discountPrice);
    }
  };

  /** ---------------- ORDER ---------------- */

  const getRazorpayKey = () => {
    // if (typeof RAZORPAY_KEY_ID === 'string' && RAZORPAY_KEY_ID.trim()) {
    //   return RAZORPAY_KEY_ID.trim();
    // }

    return '';
  };

  const navigateToConfirmation = (paymentDetails?: any) => {
    const orderId = 'ORD' + Math.floor(100000 + Math.random() * 900000);

    navigation.navigate(ScreenNameEnum.OrderConfirmationScreen, {
      orderId,
      orderItems,
      totalAmount: grandTotal,
      paymentMethod,
      paymentStatus: paymentDetails ? 'Paid' : paymentMethod === 'cod' ? 'Pending' : 'Paid',
      transactionId: paymentDetails?.razorpay_payment_id,
      razorpayPaymentId: paymentDetails?.razorpay_payment_id,
      razorpayOrderId: paymentDetails?.razorpay_order_id,
      razorpaySignature: paymentDetails?.razorpay_signature,
    });
  };

  const openRazorpayCheckout = async () => {
    const razorpayKey = getRazorpayKey();

    if (!razorpayKey) {
      Alert.alert(
        'Razorpay Key Missing',
        'Please add RAZORPAY_KEY_ID in .env before accepting online payments.',
      );
      return;
    }

    const options = {
      key: razorpayKey,
      amount: Math.round(grandTotal * 100),
      currency: 'INR',
      name: 'Kimbo',
      description: `Payment for ${orderItems.length} item${orderItems.length > 1 ? 's' : ''}`,
      prefill: {
        email: route.params?.deliveryAddress?.email || '',
        contact: route.params?.deliveryAddress?.phone || '',
        name: route.params?.deliveryAddress?.fullName || '',
      },
      notes: {
        payment_method: paymentMethodLabels[paymentMethod],
      },
      theme: {
        color: color.primary,
      },
      method: paymentMethod === 'upi' ? { upi: true } : { card: true },
    };

    try {
      const paymentDetails = await RazorpayCheckout.open(options);
      successToast('Payment successful');
      navigateToConfirmation(paymentDetails);
    } catch (error: any) {
      const message = error?.description || error?.error?.description || 'Payment was cancelled or failed';
      Alert.alert('Payment Failed', message);
    }
  };

  const placeOrder = () => {
    if (!orderItems.length) {
      errorToast('No items found');
      return;
    }

    Alert.alert(
      'Confirm Order',
      `Pay ₹${grandTotal}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            if (ONLINE_PAYMENT_METHODS.includes(paymentMethod)) {
              await openRazorpayCheckout();
              return;
            }

            successToast('Order placed successfully');
            navigateToConfirmation();
          },
        },
      ],
    );
  };

  /** ---------------- RENDER ---------------- */

  const renderItem = (item: any, index: number) => (
    <View key={index} style={styles.orderItem}>
      <Image
        source={{
          uri: item?.image?.startsWith('http')
            ? item?.image
            : `https://your-api-base-url/${item.image}`,
        }}
        style={styles.image}
      />

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.title}>{item?.name}</Text>
        {!!item?.brand && <Text style={styles.brand}>{item.brand}</Text>}
        <Text style={styles.qty}>Qty: {item?.quantity}</Text>
      </View>

      <Text style={styles.price}>
        ₹{item.price * item.quantity}
      </Text>
    </View>
  );
  const discountPercent = Math.round(
    ((product?.price - product?.discountPrice) / product?.price) * 100
  );
  // <Text style={[styles.off, {
  //           marginTop: 2,
  //           right: 5
  //         }]}>{discountPercent}% OFF</Text>
  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBarComponent barStyle="light-content" backgroundColor="transparent" translucent={true} />
      {/* HEADER */}
      <LinearGradient
        colors={color.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.headerGradient, { paddingTop: STATUSBAR_HEIGHT + 10 }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Icon name="arrow-back" size={24} color={color.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          {/* ITEMS */}
          <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <Text style={styles.sectionTitle}>Order Items</Text>
            {orderItems?.map(renderItem)}
          </Animated.View>

          {/* PAYMENT */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Payment Method</Text>

            {[
              { id: 'cod', title: 'Cash on Delivery', icon: 'payments' },
              { id: 'upi', title: 'UPI Payment', icon: 'qr-code-scanner' },
              { id: 'card', title: 'Credit / Debit Card', icon: 'credit-card' },
            ].map(method => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentOption,
                  paymentMethod === method.id && styles.paymentSelected,
                ]}
                onPress={() => setPaymentMethod(method.id)}
                activeOpacity={0.8}
              >
                <View style={styles.paymentOptionLeft}>
                  <View style={[styles.iconContainer, paymentMethod === method.id && styles.iconContainerSelected]}>
                    <Icon
                      name={method.icon}
                      size={20}
                      color={paymentMethod === method.id ? BRAND_COLORS.primaryLight : BRAND_COLORS.gray}
                    />
                  </View>
                  <Text style={[styles.paymentText, paymentMethod === method.id && styles.paymentTextSelected]}>
                    {method.title}
                  </Text>
                </View>
                <View style={[styles.radioCircle, paymentMethod === method.id && styles.radioCircleSelected]}>
                  {paymentMethod === method.id && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* SUMMARY */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Order Summary</Text>

            <SummaryRow label="Subtotal (MRP)" value={subTotal} />
            {discount > 0 && (
              <SummaryRow label="Discount" value={discount} isDiscount />
            )}
            <SummaryRow label="Delivery Charges" value="FREE" isText />

            <View style={styles.divider} />

            <SummaryRow label="Total Amount" value={grandTotal} bold />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Total Amount</Text>
          <Text style={styles.footerAmount}>₹{grandTotal}</Text>
        </View>
        <TouchableOpacity
          style={styles.orderBtn}
          onPress={placeOrder}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={BRAND_COLORS.primaryGradient}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          <View style={styles.orderBtnContent}>
            <Text style={styles.orderText}>PLACE ORDER</Text>
            <Icon name="arrow-forward" size={18} color={color.white} style={{ marginLeft: 6 }} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

/** ---------------- SMALL COMPONENT ---------------- */

const SummaryRow = ({ label, value, bold, isDiscount, isText }: any) => (
  <View style={styles.row}>
    <Text style={[styles.label, bold && styles.bold]}>{label}</Text>
    <Text style={[
      styles.value,
      bold && styles.bold,
      isDiscount && { color: color.success }
    ]}>
      {isText ? value : `${isDiscount ? '-' : ''}₹${value}`}
    </Text>
  </View>
);

/** ---------------- STYLES ---------------- */



export default CheckoutScreen;
