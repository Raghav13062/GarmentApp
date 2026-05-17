import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Loading from '../../../utils/Loader';
import imageIndex from '../../../assets/imageIndex';
import CustomInput from '../../../component/CustomInput';
import useLogin from './useLogin';
import { styles } from './style';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import ErrorText from '../../../component/ErrorText';
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../../../constant';
import ScreenNameEnum from '../../../routes/screenName.enum';

export default function Login() {
  const [agreed, setAgreed] = React.useState(true);

  const {
    email,
    password,
    emailError,
    passwordError,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    navigation,
  } = useLogin();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.main}>
          <StatusBarComponent translucent={true} backgroundColor="transparent" />
          <ImageBackground
            source={imageIndex.loginBg}
            style={styles.backgroundOverlay}
            resizeMode="cover"
          >
            <View style={styles.darkOverlay} />
          </ImageBackground>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentContainer}>
              <View style={styles.topSection}>

                <Text style={styles.appName}>SFS GARMENT</Text>
                <Text style={styles.appTagline}>Fashion Hub at Your Fingertips</Text>
              </View>

              <View style={styles.bottomSheet}>
                <View style={styles.handleBar} />

                <View style={styles.bottomSheetContent}>
                  {loading && <Loading />}

                  <View style={styles.headerContainer}>
                    <Text allowFontScaling={false} style={styles.welcomeText}>
                      Welcome Back
                    </Text>
                    <Text style={styles.subHeaderText}>Login to your account</Text>
                  </View>

                  <View style={styles.inputSection}>
                    <CustomInput
                      placeholder="Email Address"
                      placeholderTextColor={color.textLight}
                      leftIcon={<MaterialIcon name="mail-outline" size={20} color={color.primary} />}
                      value={email}
                      onChangeText={handleEmailChange}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      containerStyle={styles.inputContainer}
                      inputStyle={styles.inputField}
                    />
                    <ErrorText error={emailError} />

                    <View style={{ height: 15 }} />

                    <CustomInput
                      placeholder="Password"
                      placeholderTextColor={color.textLight}
                      leftIcon={<MaterialIcon name="lock-outline" size={20} color={color.primary} />}
                      value={password}
                      onChangeText={handlePasswordChange}
                      secureTextEntryToggle
                      containerStyle={styles.inputContainer}
                      inputStyle={styles.inputField}
                    />
                    <ErrorText error={passwordError} />
                  </View>

                  <View style={styles.forgotPasswordContainer}>
                    <TouchableOpacity>
                      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.termsRow}>
                    <TouchableOpacity
                      style={[styles.checkbox, agreed && styles.checkboxActive]}
                      onPress={() => setAgreed(!agreed)}
                      activeOpacity={0.8}
                    >
                      {agreed && <View style={styles.checkboxInner} />}
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={styles.termsText}>
                      I agree to the <Text style={styles.termsLink}>Terms</Text> & <Text style={styles.termsLink}>Privacy Policy</Text>
                    </Text>
                  </View>

                  <View style={styles.buttonSection}>
                    <TouchableOpacity
                      style={[
                        styles.loginButtonBase,
                        (!agreed || email.length === 0 || password.length === 0) && styles.loginButtonDisabled
                      ]}
                      onPress={handleLogin}
                      disabled={!agreed || email.length === 0 || password.length === 0}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={agreed && email.length > 0 && password.length > 0 ? color.buttLinearGradient : ['#D3D3D3', '#D3D3D3']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.loginButtonGradient}
                      >
                        <Text allowFontScaling={false} style={styles.loginButtonText}>Login</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.footerContainer}>
                    <Text allowFontScaling={false} style={styles.footerText}>
                      Don't have an account?{' '}
                      <Text
                        style={styles.footerLink}
                        onPress={() => navigation.navigate(ScreenNameEnum.SignUpScreen)}
                      >
                        Sign Up
                      </Text>
                    </Text>
                  </View>




                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}