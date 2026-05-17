import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,

  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import imageIndex from "../../../assets/imageIndex";
import { color, fonts, navigateToScreen } from "../../../constant";
import { styles } from "./style";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../component/StatusBarCompoent";
import ScreenNameEnum from "../../../routes/screenName.enum";
import LogoutModal from "../../../component/LogoutModal";
import useProfile from "./useProfile";

const UserProfileScreen = () => {
  const { loading,
    userData,
    profileImg, setProfileImg,
    showLogoutModal, setshowLogoutModal,
    navigation,
    handleLogout } = useProfile()

  if (!userData?.isLogin) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#F9F9F9' }]}>
        <StatusBarComponent barStyle={"dark-content"} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}


        >
          {/* Modern Header Section */}
          <LinearGradient
            colors={color.buttLinearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: 280,
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 40,
            }}
          >
            <View style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: 'rgba(255,255,255,0.2)',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: 'rgba(255,255,255,0.5)',
            }}>
              <Icon name="user" size={50} color={color.white} />
            </View>
            <Text style={{
              color: color.white,
              fontSize: 28,
              marginTop: 15,
              letterSpacing: 1
            }}>
              Welcome, Guest
            </Text>
            <Text style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: 14,
              marginTop: 5,
            }}>
              Your style journey starts here
            </Text>
          </LinearGradient>

          {/* Login Card */}
          <View style={{
            marginTop: -60,
            marginHorizontal: 24,
            backgroundColor: color.white,
            borderRadius: 24,
            padding: 30,
            shadowColor: color.black,
            shadowOffset: { width: 0, height: 15 },
            shadowOpacity: 0.1,
            shadowRadius: 20,
            elevation: 10,
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 18,
              color: color.textDark,
              textAlign: 'center',
              fontFamily: fonts.semiBold,
              lineHeight: 26,
              marginBottom: 24
            }}>
              Login to access your orders, wishlist, and personalized offers.
            </Text>

            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => navigateToScreen(ScreenNameEnum.LoginScreen)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={color.buttLinearGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  paddingVertical: 16,
                  borderRadius: 30,
                  shadowColor: color.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                <Text style={{
                  color: color.white,
                  fontSize: 16,
                  fontFamily: fonts.bold,
                  textAlign: 'center',
                  letterSpacing: 1.5
                }}>
                  Login in / Sing up
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Premium Benefits Grid */}
          <View style={{ padding: 24, marginTop: 10 }}>
            <Text style={{
              fontSize: 18,
              fontFamily: fonts.bold,
              color: '#111',
              marginBottom: 20,
              marginLeft: 5
            }}>
              Membership Perks
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {[
                { icon: 'shopping-bag', title: 'Orders', desc: 'Fast Tracking' },
                { icon: 'heart', title: 'Wishlist', desc: 'Save Styles' },
                { icon: 'tag', title: 'Offers', desc: 'Member Price' },
                { icon: 'award', title: 'Points', desc: 'Earn Rewards' },
              ].map((item, index) => (
                <View key={index} style={{
                  width: '48%',
                  backgroundColor: color.white,
                  borderRadius: 20,
                  padding: 20,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: color.lightGray,
                  alignItems: 'center'
                }}>
                  <View style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: '#FFF5EE',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 12
                  }}>
                    <Icon name={item.icon} size={20} color={color.primary} />
                  </View>
                  <Text style={{ fontSize: 14, fontFamily: fonts.bold, color: '#111' }}>{item.title}</Text>
                  <Text style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{item.desc}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <LinearGradient
        colors={color.buttLinearGradient}

        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity
            onPress={() => setshowLogoutModal(true)}
            style={styles.headerIcon}>
            <Icon name="log-out" size={24} color={color.white} />
          </TouchableOpacity>
        </View>

        {/* -------------------- PROFILE SECTION IN HEADER -------------------- */}
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
            {/* <LinearGradient
                      colors={color.buttLinearGradient}

              style={styles.editIconGradient}
            >
              <TouchableOpacity onPress={openPicker}>
                <Icon name="camera" size={18} color={color.white} />
              </TouchableOpacity>
            </LinearGradient> */}
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userData?.userData?.fullName || ""}</Text>
            <Text style={styles.userEmail}> {userData?.userData?.email || "Email"}</Text>
            <View style={styles.verifiedBadge}>
              <Icon name="check-circle" size={14} color={color.success} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* -------------------- USER INFO CARD -------------------- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <LinearGradient
              colors={color.buttLinearGradient}

              style={styles.cardIconGradient}
            >
              <Icon name="user" size={18} color={color.white} />
            </LinearGradient>
            <Text style={styles.cardTitle}>Personal Information</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Icon name="user" size={16} color={color.primary} style={styles.rowIcon} />
              <Text style={styles.label}>Full Name</Text>
            </View>
            <Text style={styles.value}>{userData?.userData?.fullName}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Icon name="phone" size={16} color={color.primary} style={styles.rowIcon} />
              <Text style={styles.label}>Phone</Text>
            </View>
            <Text style={styles.value}>{userData?.userData?.mobileNo}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Icon name="mail" size={16} color={color.primary} style={styles.rowIcon} />
              <Text allowFontScaling={false} style={styles.label}>Email</Text>
            </View>
            <Text style={styles.value}>{userData?.userData?.email}</Text>
          </View>
        </View>

        {/* -------------------- SETTINGS CARD -------------------- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <LinearGradient
              colors={color.buttLinearGradient}

              style={styles.cardIconGradient}
            >
              <Icon name="settings" size={18} color={color.white} />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.cardTitle}>Account Settings</Text>
          </View>

          {[
            { icon: "edit-2", text: "Edit Profile", screen: ScreenNameEnum.EditProfile },
            // { icon: "map-pin", text: "Saved Addresses",screen: ScreenNameEnum.EditProfile },
            // { icon: "bell", text: "Notifications",screen: ScreenNameEnum.EditProfile },
            { icon: "shield", text: "Privacy & Security", screen: ScreenNameEnum.Privacy },
          ].map((item, index) => {
            return (
              <TouchableOpacity key={index} style={styles.menuItem}

                onPress={() => {
                  navigateToScreen(item.screen);


                }}
              >
                <View style={styles.menuLeft}>
                  <LinearGradient
                    colors={color.buttLinearGradient}

                    style={styles.menuIconGradient}
                  >
                    <Icon name={item.icon} size={16} color={color.white} />
                  </LinearGradient>
                  <Text allowFontScaling={false} style={styles.menuText}>{item.text}</Text>
                </View>
                <Icon name="chevron-right" size={20} color={color.textLight} />
              </TouchableOpacity>
            )
          })}
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setshowLogoutModal(true)}
        >
          <LinearGradient
            colors={color.buttLinearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logoutTouchable}
          >
            <Icon name="log-out" size={20} color={color.white} />
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 30 }} />

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
