import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  Image, 
  SafeAreaView, 
  Animated 
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useSelector } from 'react-redux';
import imageIndex from '../../assets/imageIndex';
import { color } from '../../constant';
import StatusBarComponent from '../../component/StatusBarCompoent';

type RootStackParamList = {
  Home: undefined;
  BottomTabs: undefined;
  LoginScreen: undefined;
};

const Splash: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isLogin = useSelector((state: any) => state.auth);
  
  // Simple fade animation
  const fadeAnim = new Animated.Value(0);

  const checkLogout = async () => {
    if (isLogin?.isLogin) {
      navigation.replace(ScreenNameEnum.BottomTabs);
    } else {
      navigation.replace(ScreenNameEnum.OnboardingScreen);
    }
  };

  useEffect(() => {
     Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

     const timer = setTimeout(() => {
      checkLogout();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
          }
        ]}
      >
        <Image 
          source={imageIndex.logo} 
          style={styles.logo} 
          resizeMode="contain" 
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.baground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 300,
    width: 300,
  },
});

export default Splash;