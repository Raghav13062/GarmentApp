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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import { errorToast, successToast } from '../../../../utils/customToast';
import { styles } from './style';

const { width } = Dimensions.get('window');

const BRAND_COLORS = {
  primaryGradient: ['#F58021', '#862E92'],
  primaryDark: '#862E92',
  primaryLight: '#F58021',
  background: '#F5F5F5',
  textDark: '#2D3436',
  textLight: '#FFFFFF',
  cardBg: '#FFFFFF',
  gray: '#757575',
  lightGray: '#E0E0E0',
};

const TAX_PERCENT = 0.18;

const CheckoutScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const product = route.params?.product;
  const cartItems = route.params?.cartItems;
  const totalAmountFromCart = route.params?.totalAmount || 0;

  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [subTotal, setSubTotal] = useState(0);
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
      setSubTotal(totalAmountFromCart);
      const t = calculateTax(totalAmountFromCart);
      setTax(t);
      setGrandTotal(calculateGrandTotal(totalAmountFromCart, shippingFee));
    } else if (product) {
      const formattedProduct = {
        _id: product._id,
        name: product.name,
        price: product.discountPrice || product.price,
        quantity: 1,
        image: product.images?.[0],
        brand: product.categoryId?.name || '',
      };

      setOrderItems([formattedProduct]);
      setSubTotal(formattedProduct.price);
      const t = calculateTax(formattedProduct.price);
      setTax(t);
      setGrandTotal(formattedProduct.price);

      // setGrandTotal(calculateGrandTotal(formattedProduct.price, shippingFee));
    }
  };

  /** ---------------- ORDER ---------------- */

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
          onPress: () => {
            const orderId = 'ORD' + Math.floor(100000 + Math.random() * 900000);
            successToast('Order placed successfully');

            navigation.navigate(ScreenNameEnum.OrderConfirmationScreen, {
              orderId,
              orderItems,
              totalAmount: grandTotal,
              paymentMethod,
            });
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
          uri: item.image?.startsWith('http')
            ? item.image
            : `https://your-api-base-url/${item.image}`,
        }}
        style={styles.image}
      />

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.title}>{item.name}</Text>
        {!!item.brand && <Text style={styles.brand}>{item.brand}</Text>}
        <Text style={styles.qty}>Qty: {item.quantity}</Text>
      </View>

      <Text style={styles.price}>
        ₹{item.price * item.quantity}
      </Text>
    </View>
  );
  const discountPercent = Math.round(
    ((product.price - product.discountPrice) / product.price) * 100
  );
    // <Text style={[styles.off, {
    //           marginTop: 2,
    //           right: 5
    //         }]}>{discountPercent}% OFF</Text>
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <LinearGradient colors={BRAND_COLORS.primaryGradient} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View />
      </LinearGradient>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          {/* ITEMS */}
          <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <Text style={styles.sectionTitle}>Order Items</Text>
            {orderItems.map(renderItem)}
          </Animated.View>

          {/* PAYMENT */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Payment Method</Text>

            {['cod', 'upi', 'card'].map(method => (
              <TouchableOpacity
                key={method}
                style={[
                  styles.paymentOption,
                  paymentMethod === method && styles.paymentSelected,
                ]}
                onPress={() => setPaymentMethod(method)}
              >
                <Text style={styles.paymentText}>
                  {method.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* SUMMARY */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Order Summary</Text>

            <SummaryRow label="Price" value={product.price} />
          
            <SummaryRow label="Discount Price" value={subTotal} />

            <View style={styles.divider} />

            <SummaryRow label="Grand Total" value={grandTotal} bold />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerAmount}>₹{grandTotal}</Text>
        <TouchableOpacity style={styles.orderBtn} onPress={placeOrder}>
          <Text style={styles.orderText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

/** ---------------- SMALL COMPONENT ---------------- */

const SummaryRow = ({ label, value, bold }: any) => (
  <View style={styles.row}>
    <Text style={[styles.label, bold && styles.bold]}>{label}</Text>
    <Text style={[styles.value, bold && styles.bold]}>₹{value}</Text>
  </View>
);

/** ---------------- STYLES ---------------- */

 

export default CheckoutScreen;
