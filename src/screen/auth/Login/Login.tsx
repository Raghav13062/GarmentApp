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
import Loading from '../../../utils/Loader';
import imageIndex from '../../../assets/imageIndex';
import CustomButton from '../../../component/CustomButton';
import CustomInput from '../../../component/CustomInput';
import Icon from '../../../component/Icon';
import useLogin from './useLogin';
import { styles } from './style';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorText from '../../../component/ErrorText';

export default function Login() {
  const [agreed, setAgreed] = React.useState(false);

  const {
    phone,
    phoneError,
    loading,
    handlePhoneChange,
    handleLogin,
    navigation,
  } = useLogin();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
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
                <Image
                  source={imageIndex.logo}
                  style={styles.logo}
                />

              </View>

              {/* Bottom   */}
              <View style={styles.bottomSheet}>
                <View style={styles.handleBar} />

                <View style={styles.bottomSheetContent}>
                  {loading && <Loading />}

                  <View style={styles.headerContainer}>
                    <Text allowFontScaling={false} style={styles.welcomeText}>
                      Login <Text style={styles.welcomeTextLight}>or</Text> Signup
                    </Text>
                  </View>

                  <View style={styles.inputSection}>
                    <CustomInput
                      placeholder="Mobile Number*"
                      placeholderTextColor="#999"
                      leftIcon={
                        <View style={styles.prefixContainer}>
                          <Text style={styles.prefixText}>+91</Text>
                          <View style={styles.verticalDivider} />
                        </View>
                      }
                      value={phone}
                      onChangeText={handlePhoneChange}
                      keyboardType="phone-pad"
                      maxLength={10}
                      containerStyle={styles.inputContainer}
                      inputStyle={styles.inputField}
                    />
                    <ErrorText error={phoneError} />
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
                      By continuing, I agree to the <Text style={styles.termsLink}>Terms of Use</Text> & <Text style={styles.termsLink}>Privacy Policy</Text> and I am above 18 years old.
                    </Text>
                  </View>

                  <View style={styles.buttonSection}>
                    <TouchableOpacity
                      style={[styles.loginButton, (!agreed || phone.length !== 10) && styles.loginButtonDisabled]}
                      onPress={handleLogin}
                      disabled={!agreed || phone.length !== 10}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.loginButtonText}>CONTINUE</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.footerContainer}>
                    <Text allowFontScaling={false} style={styles.footerText}>
                      Have trouble logging in? <Text style={styles.footerLink}>Get help</Text>
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