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
                      placeholder="Phone Number"
                      placeholderTextColor={color.textLight}
                      leftIcon={<MaterialIcon name="phone-iphone" size={20} color={color.primary} />}
                      value={phone}
                      onChangeText={handlePhoneChange}
                      keyboardType="phone-pad"
                      maxLength={10}
                      autoCapitalize="none"
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
                      {agreed && <MaterialIcon name="check" size={22} color={color.white} />}
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={styles.termsText}>
                      I agree to the{' '}
                      <Text
                        style={styles.termsLink}
                        onPress={() => navigation.navigate(ScreenNameEnum.Privacy)}
                      >
                        Terms & Conditions
                      </Text>
                      {' '}and{' '}
                      <Text
                        style={styles.termsLink}
                        onPress={() => navigation.navigate(ScreenNameEnum.Privacy)}
                      >
                        Privacy Policy
                      </Text>
                    </Text>
                  </View>

                  <View style={styles.buttonSection}>
                    <TouchableOpacity
                      style={[
                        styles.loginButtonBase,
                        (!agreed || phone.length !== 10) && styles.loginButtonDisabled
                      ]}
                      onPress={handleLogin}
                      disabled={!agreed || phone.length !== 10}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={agreed && phone.length === 10 ? color.buttLinearGradient : ['#D3D3D3', '#D3D3D3']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.loginButtonGradient}
                      >
                        <Text allowFontScaling={false} style={styles.loginButtonText}>Login</Text>
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
