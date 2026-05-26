import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Animated,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Loading from '../../../utils/Loader';
import imageIndex from '../../../assets/imageIndex';
import CustomInput from '../../../component/CustomInput';
import useLogin from './useLogin';
import { styles } from './style';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import ErrorText from '../../../component/ErrorText';
import { color } from '../../../constant';
import CustomButton from '../../../component/CustomButton';
import ScreenNameEnum from '../../../routes/screenName.enum';

export default function Login() {
  const slideAnim = useRef(new Animated.Value(100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

  const {
    mobileNo,
    mobileNoError,
    loading,
    handleMobileNoChange,
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
          <StatusBarComponent translucent={true} backgroundColor="transparent" barStyle="light-content" />
          <ImageBackground
            source={imageIndex.loginBg}
            style={styles.backgroundOverlay}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']}
              style={styles.darkOverlay}
            />
          </ImageBackground>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
              <Animated.View style={[styles.topSection, { transform: [{ translateY: slideAnim }] }]}>


                <Text style={styles.appName}>SFS GARMENT</Text>
                <Text style={styles.appTagline}>Fashion Hub at Your Fingertips</Text>
              </Animated.View>

              <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slideAnim }] }]}>

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
                      placeholder="Mobile Number"
                      placeholderTextColor={color.textLight}
                      leftIcon={<MaterialIcon name="phone" size={20} color={color.primary} />}
                      value={mobileNo}
                      onChangeText={handleMobileNoChange}
                      keyboardType="phone-pad"
                      autoCapitalize="none"
                      containerStyle={styles.inputContainer}
                      inputStyle={styles.inputField}
                      maxLength={10}
                    />
                    <ErrorText error={mobileNoError} />
                  </View>




                  <View style={styles.buttonSection}>
                    <CustomButton
                      title="Send OTP"
                      onPress={handleLogin}
                      disabled={mobileNo.length !== 10}
                    />
                  </View>

                  <View style={styles.footerContainer}>
                    <Text allowFontScaling={false} style={styles.termsText}>
                      By continuing, you agree to our{' '}
                      <Text style={styles.termsLink}>Terms</Text> &{' '}
                      <Text style={styles.termsLink}>Privacy Policy</Text>
                    </Text>
                  </View>

                </View>
              </Animated.View>
            </Animated.View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}