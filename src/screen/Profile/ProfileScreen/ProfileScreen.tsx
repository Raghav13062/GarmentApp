import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import { color, navigateToScreen } from "../../../constant";
import { styles } from "./style";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../component/StatusBarCompoent";
import ScreenNameEnum from "../../../routes/screenName.enum";
import LogoutModal from "../../../component/LogoutModal";
import useProfile from "./useProfile";

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

const PERKS = [
  { icon: 'shopping-bag', title: 'Orders', desc: 'Fast Tracking' },
  { icon: 'heart', title: 'Wishlist', desc: 'Save Styles' },
  { icon: 'tag', title: 'Offers', desc: 'Member Price' },
  { icon: 'award', title: 'Points', desc: 'Earn Rewards' },
];

const UserProfileScreen = () => {
  const { loading,
    userData,
    profileImg,
    showLogoutModal, setshowLogoutModal,
    navigation,
    handleLogout } = useProfile()

  const renderPerks = () => (
    <View style={styles.perksSection}>
      <Text style={styles.perksTitle}>Membership Perks</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {PERKS.map((item, index) => (
          <View key={index} style={styles.perkCard}>
            <View style={styles.perkIconWrap}>
              <Icon name={item.icon} size={20} color={color.primary} />
            </View>
            <Text style={styles.perkTitle}>{item.title}</Text>
            <Text style={styles.perkDesc}>{item.desc}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  if (!userData?.isLogin) {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        <StatusBarComponent barStyle="light-content" backgroundColor="transparent" translucent={true} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <LinearGradient
            colors={[...color.primaryGradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.guestHeader,
              {
                height: 280 + STATUSBAR_HEIGHT,
                paddingTop: STATUSBAR_HEIGHT,
              },
            ]}
          >
            <View style={styles.guestAvatar}>
              <Icon name="user" size={50} color={color.white} />
            </View>
            <Text style={styles.guestTitle}>Welcome, Guest</Text>
            <Text style={styles.guestSubtitle}>Your style journey starts here</Text>
          </LinearGradient>

          <View style={styles.loginCard}>
            <Text style={styles.loginCardText}>
              Login to access your orders, wishlist, and personalized offers.
            </Text>

            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => navigateToScreen(ScreenNameEnum.LoginScreen)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[...color.primaryGradient]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loginButton}
              >
                <Text style={styles.loginButtonText}>
                  Login in / Sing up
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {renderPerks()}
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <StatusBarComponent barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <LinearGradient
        colors={[...color.primaryGradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.headerGradient, { paddingTop: STATUSBAR_HEIGHT + 5 }]}
      >
        <View style={styles.profileHeaderContainer}>
          <View style={styles.profileImgWrapper}>
            <Image
              source={
                profileImg
                  ? { uri: profileImg }
                  : { uri: "https://i.pravatar.cc/500?img=12" }
              }
              style={styles.profileImage}
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userData?.userData?.fullName || "Ram"}</Text>
            <View style={styles.verifiedBadge}>
              <Icon name="check-circle" size={14} color={color.success} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setshowLogoutModal(true)}
            style={styles.headerIcon}>
            <Icon name="log-out" size={24} color={color.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderPerks()}
        <View style={{ height: 40 }} />

        <LogoutModal
          visible={showLogoutModal}
          onClose={() => {
            setshowLogoutModal(false);
          }}
          onConfirm={async () => {
            await handleLogout();
            setshowLogoutModal(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;
