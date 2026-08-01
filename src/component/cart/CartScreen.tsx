import { color, fonts, radius, spacing } from "../../constant";
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Casual T-Shirt',
      price: 499,
      originalPrice: 799,
      image: 'https://via.placeholder.com/100/FF6B6B/FFFFFF?text=T-Shirt',
      color: color.error,
      size: 'M',
      quantity: 2,
    },
    {
      id: 2,
      name: 'Formal Shirt',
      price: 899,
      originalPrice: 1299,
      image: 'https://via.placeholder.com/100/4ECDC4/FFFFFF?text=Shirt',
      color: 'Blue',
      size: 'L',
      quantity: 1,
    },
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = id => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode === 'SAVE20') {
      setAppliedCoupon({
        code: 'SAVE20',
        discount: 20,
        maxDiscount: 200,
      });
      setCouponApplied(true);
      Alert.alert('Success', 'Coupon applied successfully!');
    } else {
      Alert.alert('Invalid', 'Invalid coupon code');
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
    let discount = 0;
    if (appliedCoupon) {
      const couponDiscount = (calculateSubtotal() * appliedCoupon.discount) / 100;
      discount = Math.min(couponDiscount, appliedCoupon.maxDiscount);
    }
    return discount;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const proceedToPayment = () => {
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart ({cartItems.length})</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={28} color={color.textDark} />
        </TouchableOpacity>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Icon name="shopping-cart" size={100} color={color.borderLight} />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Cart Items */}
          {cartItems.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemDetail}>Color: {item.color}</Text>
                  <Text style={styles.itemDetail}>Size: {item.size}</Text>
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Icon name="remove" size={20} color={color.textDark} />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Icon name="add" size={20} color={color.textDark} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeItem(item.id)}
                  >
                    <Icon name="delete" size={24} color={color.error} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          {/* Coupon Section */}
          <View style={styles.couponSection}>
            <Text style={styles.sectionTitle}>Apply Coupon</Text>
            <View style={styles.couponInputContainer}>
              <TextInput
                style={styles.couponInput}
                placeholder="Enter coupon code"
                value={couponCode}
                onChangeText={setCouponCode}
                editable={!couponApplied}
              />
              <TouchableOpacity
                style={[
                  styles.applyButton,
                  couponApplied && styles.applyButtonDisabled,
                ]}
                onPress={applyCoupon}
                disabled={couponApplied}
              >
                <Text style={styles.applyButtonText}>
                  {couponApplied ? 'Applied' : 'Apply'}
                </Text>
              </TouchableOpacity>
            </View>
            {appliedCoupon && (
              <View style={styles.couponApplied}>
                <Icon name="check-circle" size={20} color={color.success} />
                <Text style={styles.couponAppliedText}>
                  {appliedCoupon.code} applied! Save {appliedCoupon.discount}%
                </Text>
              </View>
            )}
          </View>

          {/* Price Details */}
          <View style={styles.priceDetails}>
            <Text style={styles.sectionTitle}>Price Details</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Subtotal</Text>
              <Text style={styles.priceValue}>₹{calculateSubtotal()}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Delivery Charges</Text>
              <Text style={styles.deliveryFree}>FREE</Text>
            </View>
            {appliedCoupon && (
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>
                  Discount ({appliedCoupon.code})
                </Text>
                <Text style={styles.discountValue}>-₹{calculateDiscount()}</Text>
              </View>
            )}
            <View style={[styles.priceRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{calculateTotal()}</Text>
            </View>
          </View>

          {/* Savings Info */}
          <View style={styles.savingsInfo}>
            <Icon name="savings" size={24} color={color.success} />
            <Text style={styles.savingsText}>
              You save ₹{calculateSubtotal() - calculateTotal()} on this order
            </Text>
          </View>

          {/* Loyalty Points */}
          <View style={styles.loyaltyCard}>
            <Icon name="card-giftcard" size={30} color={color.primary} />
            <View style={styles.loyaltyInfo}>
              <Text style={styles.loyaltyTitle}>Earn Loyalty Points</Text>
              <Text style={styles.loyaltyPoints}>
                You will earn {Math.floor(calculateTotal() / 10)} points
              </Text>
              <Text style={styles.loyaltyNote}>
                1 point = ₹1, redeemable on next purchase
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>₹{calculateTotal()}</Text>
            <Text style={styles.totalLabel}>Total Amount</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={proceedToPayment}
          >
            <Text style={styles.checkoutButtonText}>PROCEED TO PAYMENT</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: color.card,
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: color.borderLight,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.textDark,
  },
  emptyCart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 18,
    color: color.textMedium,
    marginTop: 20,
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: color.primary,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
  },
  shopButtonText: {
    color: color.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: color.card,
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: color.borderLight,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.textDark,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.primary,
    marginBottom: 10,
  },
  itemDetails: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  itemDetail: {
    fontSize: 14,
    color: color.textMedium,
    marginRight: 15,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.borderLight,
    borderRadius: 4,
  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: color.textDark,
  },
  removeButton: {
    marginLeft: 'auto',
  },
  couponSection: {
    backgroundColor: color.white,
    marginHorizontal: 10,
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.textDark,
    marginBottom: 10,
  },
  couponInputContainer: {
    flexDirection: 'row',
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: color.borderLight,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: color.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  applyButtonDisabled: {
    backgroundColor: color.gray,
  },
  applyButtonText: {
    color: color.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  couponApplied: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.successSoft,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  couponAppliedText: {
    marginLeft: 10,
    color: color.success,
    fontSize: 14,
  },
  priceDetails: {
    backgroundColor: color.card,
    marginHorizontal: 10,
    marginTop: 15,
    padding: 15,
    borderRadius: radius.lg,
    elevation: 2,
    borderWidth: 1,
    borderColor: color.borderLight,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: color.lightGray,
  },
  priceLabel: {
    fontSize: 14,
    color: color.textMedium,
  },
  priceValue: {
    fontSize: 14,
    color: color.textDark,
    fontWeight: '500',
  },
  deliveryFree: {
    fontSize: 14,
    color: color.success,
    fontWeight: 'bold',
  },
  discountValue: {
    fontSize: 14,
    color: color.success,
    fontWeight: 'bold',
  },
  totalRow: {
    borderBottomWidth: 0,
    paddingTop: 15,
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.textDark,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.primary,
  },
  savingsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.card,
    marginHorizontal: 10,
    marginTop: 15,
    padding: 15,
    borderRadius: radius.lg,
    elevation: 2,
    borderWidth: 1,
    borderColor: color.borderLight,
  },
  savingsText: {
    marginLeft: 10,
    fontSize: 14,
    color: color.success,
    fontWeight: '500',
  },
  loyaltyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.card,
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 100,
    padding: 15,
    borderRadius: radius.lg,
    elevation: 2,
    borderWidth: 1,
    borderColor: color.borderLight,
  },
  loyaltyInfo: {
    flex: 1,
    marginLeft: 15,
  },
  loyaltyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: color.textDark,
    marginBottom: 5,
  },
  loyaltyPoints: {
    fontSize: 12,
    color: color.primary,
    marginBottom: 3,
  },
  loyaltyNote: {
    fontSize: 10,
    color: color.textMedium,
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: color.card,
    paddingHorizontal: 15,
    paddingVertical: 15,
    elevation: 8,
    borderTopWidth: 1,
    borderTopColor: color.borderLight,
  },
  totalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: color.primary,
  },
  totalLabel: {
    fontSize: 12,
    color: color.textMedium,
  },
  checkoutButton: {
    flex: 1,
    backgroundColor: color.primary,
    paddingVertical: 15,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonText: {
    color: color.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});