import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import imageIndex from '../../../assets/imageIndex';
import CustomInput from '../../../component/CustomInput';
import Icon from '../../../component/Icon';
import LoadingModal from '../../../utils/Loader';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { color } from '../../../constant';
import useSignup from './useSignup';
import { styles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import StatusBarComponent from '../../../component/StatusBarCompoent';

export default function Signup() {
  const {
    fullName,
    email,
    mobileNo,
    address,
    password,
    fullNameError,
    emailError,
    mobileNoError,
    addressError,
    passwordError,
    loading,
    checked,
    setChecked,
    handleFullNameChange,
    handleEmailChange,
    handleMobileNoChange,
    handleAddressChange,
    handlePasswordChange,
    handleSignup,
    navigation,
  } = useSignup();

  return (
    <SafeAreaView style={styles.bgContainer}>
      <StatusBarComponent translucent={true} backgroundColor="transparent" />
      {loading && <LoadingModal />}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            contentContainerStyle={styles.scrollContainer} 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.mainContainer}>
              <View style={styles.headerSection}>
                <Text style={styles.txtHeading}>Create Account</Text>
                <Text style={styles.txtDes}>Join Surat Garment today</Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                  <CustomInput
                    placeholder="Full Name"
                    leftIcon={<Icon source={imageIndex.user} size={20} color={color.primary} />}
                    value={fullName}
                    onChangeText={handleFullNameChange}
                    containerStyle={styles.inputContainer}
                  />
                  {fullNameError ? <Text style={styles.errorText}>{fullNameError}</Text> : null}
                </View>

                <View style={styles.inputWrapper}>
                  <CustomInput
                    placeholder="Email Address"
                    leftIcon={<Icon source={imageIndex.email} size={20} color={color.primary} />}
                    value={email}
                    onChangeText={handleEmailChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    containerStyle={styles.inputContainer}
                  />
                  {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                </View>

                <View style={styles.inputWrapper}>
                  <CustomInput
                    placeholder="Mobile Number"
                    leftIcon={<Icon source={imageIndex.phone} size={20} color={color.primary} />}
                    value={mobileNo}
                    onChangeText={handleMobileNoChange}
                    keyboardType='phone-pad'
                    maxLength={10}
                    containerStyle={styles.inputContainer}
                  />
                  {mobileNoError ? <Text style={styles.errorText}>{mobileNoError}</Text> : null}
                </View>

                <View style={styles.inputWrapper}>
                  <CustomInput
                    placeholder="Shop Address / Location"
                    leftIcon={<Icon source={imageIndex.location} size={20} color={color.primary} />}
                    value={address}
                    onChangeText={handleAddressChange}
                    containerStyle={styles.inputContainer}
                  />
                  {addressError ? <Text style={styles.errorText}>{addressError}</Text> : null}
                </View>

                <View style={styles.inputWrapper}>
                  <CustomInput
                    placeholder="Password"
                    secureTextEntryToggle
                    leftIcon={<Icon source={imageIndex.lock} size={20} color={color.primary} />}
                    value={password}
                    onChangeText={handlePasswordChange}
                    containerStyle={styles.inputContainer}
                  />
                  {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                </View>

                <View style={styles.termsContainer}>
                  <TouchableOpacity 
                    onPress={() => setChecked(!checked)}
                    style={[styles.checkbox, checked && styles.checkboxActive]}
                  >
                    {checked && <View style={styles.checkboxInner} />}
                  </TouchableOpacity>

                  <Text style={styles.termsText}>
                    I agree to the <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
                  </Text>
                </View>

                <TouchableOpacity 
                  style={styles.signupButton}
                  onPress={handleSignup}
                >
                  <LinearGradient
                    colors={color.buttLinearGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.buttonText}>SIGN UP</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.loginLinkContainer}
                onPress={() => navigation.navigate(ScreenNameEnum.LoginScreen)}
              >
                <Text style={styles.loginLinkText}>
                  Already have an account? <Text style={styles.loginLinkHighlight}>Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
