import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Video from "react-native-video";

const { width } = Dimensions.get("window");

export default function VideoAd({ videoUrl }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sponsored</Text>
      <Video
        source={{ uri: videoUrl }} 

        style={styles.video}
        resizeMode="cover"
        repeat
        muted={true}
        controls={false} // play/pause button
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 220,
    marginVertical: 10,
     overflow: "hidden",
    backgroundColor: "#000", 
  },
  video: {
    width: "100%",
    height: "100%",
  },
  title: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
});
