import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import imageIndex from '../../../assets/imageIndex';
import { styles } from './style';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import {
  CodeField,
  Cursor,
} from 'react-native-confirmation-code-field';
import useOtpVerification from './useOTPVerification';
import { color } from '../../../constant';
import Loading from '../../../utils/Loader';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function OtpVerification() {
  const {
    phone,
    code,
    getCellOnLayoutHandler,
    ref,
    resendTimer,
    setCode,
    handleVerifyOtp,
    handleResendOtp,
    handleChangePhone,
    loading,
    props
  } = useOtpVerification();

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

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.backButton}
            onPress={handleChangePhone}
          >
            <Ionicons name="arrow-back" size={24} color={color.white} />
          </TouchableOpacity>

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
                      OTP Verification
                    </Text>
                    <Text style={styles.subHeaderText}>
                      We have sent a verification code to
                    </Text>
                    <Text style={styles.subHeaderText}>
                      <Text style={styles.phoneHighlight}>+91 {phone}</Text>
                    </Text>
                    <TouchableOpacity onPress={handleChangePhone}>
                      <Text style={styles.changeButtonText}>Change Number</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.otpSection}>
                    <CodeField
                      ref={ref}
                      {...props}
                      value={code}
                      onChangeText={(text) => {
                        const numericText = text.replace(/[^0-9]/g, '').slice(0, 5);
                        setCode(numericText);
                      }}
                      cellCount={5}
                      rootStyle={styles.codeFieldRoot}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      autoFocus
                      renderCell={({ index, symbol, isFocused }) => (
                        <View
                          key={index}
                          onLayout={getCellOnLayoutHandler(index)}
                          style={[
                            styles.cell,
                            isFocused && styles.focusCell,
                            symbol && styles.filledCell,
                          ]}
                        >
                          <Text style={styles.cellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                          </Text>
                        </View>
                      )}
                    />

                    <View style={styles.resendContainer}>
                      {resendTimer > 0 ? (
                        <Text style={styles.resendText}>
                          Resend code in <Text style={styles.timerText}>{resendTimer}s</Text>
                        </Text>
                      ) : (
                        <TouchableOpacity onPress={handleResendOtp}>
                          <Text style={styles.resendButtonText}>Resend Code</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>

                  <View style={styles.buttonSection}>
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={handleVerifyOtp}
                      disabled={code.length !== 5 || loading}
                      style={[
                        styles.verifyButton,
                        (code.length !== 5 || loading) && styles.verifyButtonDisabled,
                      ]}
                    >
                      <LinearGradient
                        colors={code.length === 5 && !loading ? color.buttLinearGradient || ['#FF6B6B', '#FF8E53'] : ['#D3D3D3', '#D3D3D3']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.verifyButtonGradient}
                      >
                        <Text style={styles.verifyButtonText}>Verify & Continue</Text>
                        <Ionicons name="arrow-forward" size={18} color={color.white} />
                      </LinearGradient>
                    </TouchableOpacity>
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
