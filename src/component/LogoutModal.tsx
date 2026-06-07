import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import { color, fonts } from "../constant";

const { height } = Dimensions.get("window");

type LogoutModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: "default" | "danger" | "warning" | "success";
};

const LogoutModal = ({
  visible,
  onClose,
  onConfirm,
  title = "Logout?",
  message = "Are you sure you want to log out?",
  confirmText = "Logout",
  cancelText = "Cancel",
  type = "danger",
}: LogoutModalProps) => {
  const isDanger = type === "danger";
  const accentColor = color.primary;
  const softAccent = "#FFF5EE";
  const noteText = isDanger
    ? "You will need to login again to access your account."
    : "Please confirm before continuing.";

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.modalContainer}>
          <View style={styles.handleBarContainer}>
            <View style={styles.handleBar} />
          </View>

          <View style={styles.content}>
            <View style={[styles.iconOuter, { backgroundColor: softAccent }]}>
              <LinearGradient
                colors={color.primaryGradient}
                style={styles.iconGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name="log-out" size={30} color={color.white} />
              </LinearGradient>
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>

            <View style={[styles.warningNote, { backgroundColor: softAccent }]}>
              <Icon name="alert-circle" size={17} color={accentColor} />
              <Text style={[styles.warningText, { color: accentColor }]}>
                {noteText}
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelText}>{cancelText}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={onConfirm}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={color.primaryGradient}
                  style={styles.confirmGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Icon name="log-out" size={17} color={color.white} />
                  <Text style={styles.confirmText}>{confirmText}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.48)",
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: color.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingBottom: Platform.OS === "ios" ? 34 : 22,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 24,
    maxHeight: height * 0.72,
  },
  handleBarContainer: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 6,
  },
  handleBar: {
    width: 44,
    height: 5,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 8,
  },
  iconOuter: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  iconGradient: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: color.textDark,
    textAlign: "center",
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    color: color.textMedium,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 18,
    paddingHorizontal: 12,
  },
  warningNote: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    marginBottom: 22,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    marginLeft: 9,
    fontFamily: fonts.medium,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: color.primary,
    backgroundColor: color.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  cancelText: {
    fontSize: 15,
    fontFamily: fonts.semiBold,
    color: color.primary,
  },
  confirmButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: color.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 5,
  },
  confirmGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmText: {
    fontSize: 15,
    fontFamily: fonts.bold,
    color: color.white,
    marginLeft: 7,
  },
});

export default LogoutModal;
