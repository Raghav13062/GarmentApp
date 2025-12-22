import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import imageIndex from '../../../../assets/imageIndex';
import CustomBackHeader from '../../../../component/CustomBackHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../../../component/CustomButton';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import { color, fonts } from '../../../../constant';
import { useNavigation } from '@react-navigation/native';
 import StepProgress from '../../../../component/StepProgress';
import { hp, wp } from '../../../../utils/Constant';

const paymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState('Cash');
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false);

  const paymentMethods = [
    { label: 'Cash', key: 'Cash', icon: imageIndex.cash },
  ];

  const cards = [
    { label: 'Add Card', key: 'Card', icon: imageIndex.card2 },
  ];

  const creditLimit = [
    { label: 'Credit Limit', key: 'Credit', icon: imageIndex.card, onPress: () => navigation.navigate(ScreenNameEnum.creditLimit) },
  ];

  const morePayments = [
    { label: 'Phonepe', key: 'Phonepe', icon: imageIndex.pe },
    { label: 'Google Pay', key: 'GooglePay', icon: imageIndex.gpay },
    { label: 'Paytm', key: 'Paytm', icon: imageIndex.paytm },
  ];

  const renderItem = ({ label, key, icon, onPress }, hasRadio = true, showArrow = false,) => (
    <TouchableOpacity
      key={key}
      onPress={() => {
        hasRadio && setSelectedMethod(key)
        onPress && onPress()
      }}
      style={styles.optionContainer}>
      <View style={styles.leftSection}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.optionText}>{label}</Text>
      </View>
      {showArrow ? (
        // <Text style={styles.arrow}>{'›'}</Text>
        <Image source={imageIndex.arrowRight} style={{ height: 25, width: 25 }} />
      ) : (
        hasRadio && (
          <View style={styles.radioOuter}>
            {selectedMethod === key && <View style={styles.radioInner} />}
          </View>
        )
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomBackHeader menuIcon={imageIndex.back} label={"Payment Method"} />
      <StepProgress
        steps={["Cart", "Address", "Payment"]}
        currentStep={3}
      />
      <Text style={styles.title}>Cash</Text>
      {paymentMethods.map((item) => renderItem(item))}

      <Text style={styles.title}>Credit & Debit Card</Text>
      {cards.map((item) => renderItem(item, false, true))}

      <Text style={styles.title}>Credit Limit</Text>
      {creditLimit.map((item) => renderItem(item, false, true))}

      <Text style={styles.title}>More Payment Options</Text>
      {morePayments.map((item) => renderItem(item))}

          {/* <View style={styles.section}>
                <View style={styles.row}>
                  <Text style={styles.paymentHeader}>Catalogue Sample</Text>
                  <View style={styles.qtyControlSmall}>
                    <TouchableOpacity>
                      <Image source={imageIndex.minus} style={styles.qtyIconSmall} />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>01</Text>
                    <TouchableOpacity>
                      <Image source={imageIndex.plus} style={styles.qtyIconSmall} />
                    </TouchableOpacity>
                  </View>
                </View>
      
                <Text style={styles.paymentHeader}>Payment Detail</Text>
      
                <View style={styles.row}>
                  <Text style={styles.label}>GST @18%</Text>
                  <Text style={styles.value}>$260.00</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Catalogue Sample</Text>
                  <Text style={styles.value}>$30.00</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Shipping</Text>
                  <Text style={styles.value}>$0.00</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Discount</Text>
                  <Text style={styles.value}>$0.00</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Shipping</Text>
                  <Text style={styles.value}>$0.00</Text>
                </View>
                <View style={[styles.row, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>$26.98</Text>
                </View>
      
                <Text style={styles.promoLabel}>Promo Code</Text>
               
              </View> */}

      <CustomButton title={'Confirm Payment'}
        onPress={() => setVisible(true)}
        style={styles.continueBtn} />
 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 16,
    marginBottom: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 0.2,
    borderColor: 'grey',
    height: 55
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    backgroundColor: color.primary,
    borderRadius: 5,
  },
  arrow: {
    fontSize: 20,
    color: '#aaa',
  },
  continueBtn: {
    position: 'absolute',
    bottom: 30,
    width: '95%',
    alignSelf: 'center'
  },

    section: {
      paddingHorizontal: wp(4),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
      alignItems: 'center',
    },
    label: {
      fontFamily: fonts.regular,
      fontSize: wp(3.6),
    },
    value: {
      fontFamily: fonts.medium,
      fontSize: wp(3.6),
    },
    paymentHeader: {
      fontSize: wp(4),
      fontFamily: fonts.bold,
      marginVertical: hp(2),
    },
    totalRow: {
      marginTop: hp(1),
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
      paddingTop: hp(1),
    },
    totalLabel: {
      fontFamily: fonts.bold,
      fontSize: wp(4),
    },
    totalValue: {
      fontFamily: fonts.bold,
      fontSize: wp(4),
    },
    promoLabel: {
      fontFamily: fonts.bold,
      fontSize: wp(4),
      marginTop: hp(3),
      marginBottom: hp(1),
    },
    promoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:'#F8F8F8',
      padding:15,
      borderRadius:15
    },
    promoInput: {
      flex: 1,
      // borderWidth: 1,
      // borderColor: '#ddd',
      borderRadius: wp(2),
      padding: wp(3),
      fontSize: wp(3.6),
      fontFamily: fonts.regular,
    },
    applyBtn: {
      backgroundColor: color.primary,
      paddingHorizontal: wp(4),
      paddingVertical: hp(1.5),
      borderRadius: wp(2),
      marginLeft: wp(2),
    },
    applyText: {
      color: '#fff',
      fontFamily: fonts.medium,
      fontSize: wp(3.6),
    },
});

export default paymentMethod;
