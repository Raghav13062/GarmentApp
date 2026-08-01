import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import imageIndex from '../../../../assets/imageIndex';
import CustomBackHeader from '../../../../component/CustomBackHeader';
import { color, fonts, spacing, radius } from '../../../../constant';
import CustomButton from '../../../../component/CustomButton';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import StepProgress from '../../../../component/StepProgress';

const AddressScreen = () => {
  const navigation = useNavigation()
  const addresses = [
    {
      id: 1,
      title: 'Home',
      description: 'PV2M+H46, No.8, Residency Area, 200 Road...',
      icon: imageIndex.homeCircle, // Replace with actual image/icon if needed
    },
    {
      id: 2,
      title: 'Office',
      description: 'Sapphire House, 402 A, B, C, Sapna San...',
      icon: imageIndex.office,
    },
    {
      id: 3,
      title: 'Favorites',
      description: 'New York',
      icon: imageIndex.favorite,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <CustomBackHeader menuIcon={imageIndex.back} label={"Address"} />
        <StepProgress
          steps={["Cart", "Address", "Payment"]}
          currentStep={2}
        />

        {/* Address Cards */}
        {addresses.map(item => (
          <View key={item.id} style={styles.card}>
            <Image source={item.icon} style={styles.iconCircle} />

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc} numberOfLines={1}>
                {item.description}
              </Text>
            </View>
          </View>
        ))}

        {/* Add New Button */}
        <TouchableOpacity style={styles.addNew} onPress={() => navigation.navigate(ScreenNameEnum.NewAddress)}>
          <Text style={styles.addNewText}>Add New</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Continue Button */}
      <CustomButton title={'Continue'} onPress={() => navigation.navigate(ScreenNameEnum.paymentMethod)} style={styles.continueBtn} />
    </SafeAreaView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: 50,
    backgroundColor: color.primarySoft,
    marginRight: 10,
  },


  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: color.borderLight,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    backgroundColor: color.card,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: color.textDark,
  },
  cardDesc: {
    fontSize: 13,
    color: color.textMedium,
    marginTop: 2,
    fontFamily: fonts.regular
  },
  addNew: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: color.primary,
    borderRadius: radius.pill,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: color.primarySoft,
  },
  addNewText: {
    fontSize: 15,
    fontFamily: fonts.bold,
    color: color.primary
  },
  continueBtn: {
    position: 'absolute',
    bottom: 30,
    left: spacing.lg,
    right: spacing.lg,
    width: '90%'
  },
});
