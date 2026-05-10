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
import { color, navigateToScreen } from "../../../constant";
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
      <SafeAreaView style={[styles.container, { backgroundColor: '#FDFBFA' }]}>
        <StatusBarComponent />
        
        {/* Header - same as logged in user */}
        <LinearGradient
          colors={color.buttLinearGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.headerGradient, { paddingBottom: 60 }]}
        >
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>My Profile</Text>
          </View>
        </LinearGradient>

        <View style={{ flex: 1, marginTop: -40, paddingHorizontal: 20 }}>
          {/* Guest Card */}
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            padding: 30,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: 10,
          }}>
            <View style={{
              width: 90, height: 90, borderRadius: 45, backgroundColor: '#FEF3F2', 
              justifyContent: 'center', alignItems: 'center', marginBottom: 20,
            }}>
              <Icon name="user" size={40} color="#F58021" />
              <View style={{
                position: 'absolute', bottom: 0, right: 0, backgroundColor: '#111', 
                borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center',
                borderWidth: 2, borderColor: '#fff'
              }}>
                <Icon name="lock" size={10} color="#fff" />
              </View>
            </View>

            <Text style={{ fontSize: 22, fontWeight: '800', color: '#111', marginBottom: 8, textAlign: 'center' }}>
              Guest User
            </Text>
            
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 24, textAlign: 'center', lineHeight: 22 }}>
              Log in to unlock all features and manage your personalized fashion experience.
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
                  paddingVertical: 14,
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 1 }}>
                  LOGIN / SIGN UP
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Benefits Section */}
          <View style={{ marginTop: 30, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 20 }}>
              Why log in?
            </Text>

            {[
              { icon: 'shopping-bag', title: 'Manage Orders', desc: 'Track, return, or cancel your orders' },
              { icon: 'heart', title: 'Wishlist & Save', desc: 'Save your favorite items for later' },
              { icon: 'tag', title: 'Exclusive Offers', desc: 'Get access to personalized discounts' },
            ].map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <View style={{
                  width: 46, height: 46, borderRadius: 23, backgroundColor: '#FDFBFA',
                  justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#EEE'
                }}>
                  <Icon name={item.icon} size={20} color="#F58021" />
                </View>
                <View style={{ marginLeft: 16, flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#111', marginBottom: 2 }}>{item.title}</Text>
                  <Text style={{ fontSize: 13, color: '#666' }}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
          
        </View>
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
            <Icon name="log-out" size={24} color="#fff" />
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
                <Icon name="camera" size={18} color="#fff" />
              </TouchableOpacity>
            </LinearGradient> */}
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userData?.userData?.fullName || ""}</Text>
            <Text style={styles.userEmail}> {userData?.userData?.email || "Email"}</Text>
            <View style={styles.verifiedBadge}>
              <Icon name="check-circle" size={14} color="#4CAF50" />
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
              <Icon name="user" size={18} color="#fff" />
            </LinearGradient>
            <Text style={styles.cardTitle}>Personal Information</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Icon name="user" size={16} color="#F58021" style={styles.rowIcon} />
              <Text style={styles.label}>Full Name</Text>
            </View>
            <Text style={styles.value}>{userData?.userData?.fullName}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Icon name="phone" size={16} color="#F58021" style={styles.rowIcon} />
              <Text style={styles.label}>Phone</Text>
            </View>
            <Text style={styles.value}>{userData?.userData?.mobileNo}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Icon name="mail" size={16} color="#F58021" style={styles.rowIcon} />
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
              <Icon name="settings" size={18} color="#fff" />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.cardTitle}>Account Settings</Text>
          </View>

          {[
            { icon: "edit-2", text: "Edit Profile", screen: ScreenNameEnum.EditProfile },
            { icon: "shopping-bag", text: "My Orders", screen: ScreenNameEnum.MyOrders },
            // { icon: "map-pin", text: "Saved Addresses",screen: ScreenNameEnum.EditProfile },
            { icon: "credit-card", text: "Payment Histort", screen: ScreenNameEnum.PaymentHistory },
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
                    <Icon name={item.icon} size={16} color="#fff" />
                  </LinearGradient>
                  <Text allowFontScaling={false} style={styles.menuText}>{item.text}</Text>
                </View>
                <Icon name="chevron-right" size={20} color="#999" />
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
            <Icon name="log-out" size={20} color="#fff" />
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
