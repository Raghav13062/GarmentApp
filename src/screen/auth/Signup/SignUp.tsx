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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CustomInput from '../../../component/CustomInput';
import LoadingModal from '../../../utils/Loader';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { color } from '../../../constant';
import useSignup from './useSignup';
import { styles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import ErrorText from '../../../component/ErrorText';

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
      <StatusBarComponent barStyle="dark-content" />
      {loading && <LoadingModal />}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
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
                <Text style={styles.txtDes}>Join SFS GARMENT family today</Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                  <CustomInput
                    placeholder="Full Name"
                    leftIcon={<MaterialIcon name="person-outline" size={20} color={color.primary} />}
                    value={fullName}
                    onChangeText={handleFullNameChange}
                    containerStyle={styles.inputContainer}
                  />
                  <ErrorText error={fullNameError} />
                </View>

                <View style={styles.inputWrapper}>
                  <CustomInput
                    placeholder="Email Address"
                    leftIcon={<MaterialIcon name="mail-outline" size={20} color={color.primary} />}
                    value={email}
                    onChangeText={handleEmailChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    containerStyle={styles.inputContainer}
                  />
                  <ErrorText error={emailError} />
                </View>

                <View style={styles.inputWrapper}>
                  <CustomInput
                    placeholder="Mobile Number"
                    leftIcon={<MaterialIcon name="phone-iphone" size={20} color={color.primary} />}
                    value={mobileNo}
                    onChangeText={handleMobileNoChange}
                    keyboardType='phone-pad'
                    maxLength={10}
                    containerStyle={styles.inputContainer}
                  />
                  <ErrorText error={mobileNoError} />
                </View>

                <View style={styles.inputWrapper}>
                  <CustomInput
                    placeholder="Shop Address / Location"
                    leftIcon={<MaterialIcon name="location-on" size={20} color={color.primary} />}
                    value={address}
                    onChangeText={handleAddressChange}
                    containerStyle={styles.inputContainer}
                  />
                  <ErrorText error={addressError} />
                </View>

                <View style={styles.inputWrapper}>
                  <CustomInput
                    placeholder="Password"
                    secureTextEntryToggle
                    leftIcon={<MaterialIcon name="lock-outline" size={20} color={color.primary} />}
                    value={password}
                    onChangeText={handlePasswordChange}
                    containerStyle={styles.inputContainer}
                  />
                  <ErrorText error={passwordError} />
                </View>

                <View style={styles.termsContainer}>
                  <TouchableOpacity 
                    onPress={() => setChecked(!checked)}
                    style={[styles.checkbox, checked && styles.checkboxActive]}
                  >
                    {checked && <MaterialIcon name="check" size={14} color={color.white} />}
                  </TouchableOpacity>

                  <Text style={styles.termsText}>
                    I agree to the <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
                  </Text>
                </View>

                <TouchableOpacity 
                  style={styles.signupButton}
                  onPress={handleSignup}
                  activeOpacity={0.8}
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
