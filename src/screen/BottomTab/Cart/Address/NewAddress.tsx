import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../../../component/CustomButton';
import imageIndex from '../../../../assets/imageIndex'; // Use actual icon for location if available
import CustomBackHeader from '../../../../component/CustomBackHeader';

import { color, fonts, spacing, radius } from '../../../../constant';


const AddressFormScreen = () => {
  const [activeTab, setActiveTab] = useState('Address');

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

         <CustomBackHeader menuIcon={imageIndex.back} label={"Address"} />

        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Address' && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab('Address')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Address' && styles.activeTabText,
              ]}
            >
              Address
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton,  activeTab === 'Preview' && styles.activeTabButton]}
            onPress={() => setActiveTab('Preview')}
          >
            <Text style={[styles.tabText, activeTab === 'Preview' && styles.activeTabText]}>Preview</Text>

      
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        {[
          'Company Name',
          'Phone No',
          'Gst / Adhaar No',
          'Address 1',
          'Address 2',
          'State',
          'City',
          'Pincode',
          'Transportation Mode',
        ].map((placeholder, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={`${placeholder}*`}
            placeholderTextColor={color.textLight}
          />
        ))}

        {/* Use My Location */}
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.locationText}>Use My Location</Text>
          <Image
            source={imageIndex.location} // your location icon
            style={styles.locationIcon}
          />
        </TouchableOpacity>
      </ScrollView>

      {/* Continue Button */}
      <CustomButton
        title="Continue"
        style={{ position: 'absolute', bottom: 35, width: '90%', alignSelf: 'center' }}

      />
    </SafeAreaView>
  );
};

export default AddressFormScreen;


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    backgroundColor: color.background,
  },
  tabRow: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: color.lightGray,
    borderRadius: radius.md,
    overflow: 'hidden',
    padding: 10,
    borderWidth: 1,
    borderColor: color.borderLight,
  },
  tabButton: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButton: {
    backgroundColor: color.primary,
    borderRadius: radius.md,
  },
  tabText: {
    fontSize: 14,
    color: color.primary,
    fontFamily: fonts.semiBold,
  },
  activeTabText: {
    color: color.white,
    fontFamily: fonts.bold,
  },
  input: {
    backgroundColor: color.card,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    fontSize: 14,
    color: color.textDark,
    marginBottom: spacing.md,
    fontFamily: fonts.regular,
    height: 55,
    borderWidth: 1,
    borderColor: color.borderLight,
  },
  locationBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  locationText: {
    color: color.primary,
    fontFamily: fonts.semiBold,
    fontSize: 15,
    marginRight: 6,
  },
  locationIcon: {
    width: 20,
    height: 20,
    tintColor: color.primary,
    marginRight: 6,
  },
});
