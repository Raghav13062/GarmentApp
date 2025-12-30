import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import imageIndex from "../../../assets/imageIndex";
import { color, navigateToScreen } from "../../../constant";
import { styles } from "./style";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../component/StatusBarCompoent";
import ScreenNameEnum from "../../../routes/screenName.enum";
import LogoutModal from "../../../component/LogoutModal";

const UserProfileScreen = () => {
  const [profileImg, setProfileImg] = useState(null);
const[showLogoutModal, setshowLogoutModal] = useState(false)
  const openPicker = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: "photo",
    })
      .then((img) => {
        setProfileImg(img.path);
      })
      .catch(() => {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent/>
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
                  : imageIndex.dummyProfile
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
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>john.doe@gmail.com</Text>
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
            <Text style={styles.value}>John Doe</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Icon name="phone" size={16} color="#F58021" style={styles.rowIcon} />
              <Text style={styles.label}>Phone</Text>
            </View>
            <Text style={styles.value}>+91 9876543210</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Icon name="mail" size={16} color="#F58021" style={styles.rowIcon} />
              <Text style={styles.label}>Email</Text>
            </View>
            <Text style={styles.value}>john.doe@gmail.com</Text>
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
            <Text style={styles.cardTitle}>Account Settings</Text>
          </View>

          {[
            { icon: "edit-2", text: "Edit Profile" , screen: ScreenNameEnum.EditProfile },
            { icon: "shopping-bag", text: "My Orders",screen: ScreenNameEnum.MyOrders },
            // { icon: "map-pin", text: "Saved Addresses",screen: ScreenNameEnum.EditProfile },
            { icon: "credit-card", text: "Payment Histort",screen: ScreenNameEnum.PaymentHistory },
            // { icon: "bell", text: "Notifications",screen: ScreenNameEnum.EditProfile },
            { icon: "shield", text: "Privacy & Security",screen: ScreenNameEnum.Privacy },
          ].map((item, index) => {
            return(
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
                <Text style={styles.menuText}>{item.text}</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#999" />
            </TouchableOpacity>
            )
          })}
        </View>

        {/* -------------------- LOGOUT BUTTON -------------------- */}
        <LinearGradient
                  colors={color.buttLinearGradient}

          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.logoutBtn}
        >
          {/* <TouchableOpacity style={styles.logoutTouchable} 
          onPress={() => setshowLogoutModal(false)}
          
          >
            <Icon name="log-out" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity> */}
        </LinearGradient>

        {/* -------------------- VERSION INFO -------------------- */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>

        <View style={{ height: 30 }} />
   
<LogoutModal
  visible={showLogoutModal}
  onClose={() => setshowLogoutModal(false)}
  onConfirm={() => setshowLogoutModal(false)}
 />
      </ScrollView>
     
    </SafeAreaView>
  );
};

export default UserProfileScreen;
 