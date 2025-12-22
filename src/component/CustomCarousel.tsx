import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
   Platform,
} from "react-native";

const { width } = Dimensions.get("window");

interface CustomCarouselProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  height?: number;
}

export default function CustomCarousel({
  images,
  autoPlay = true,
  autoPlayInterval = 3000,
  height = 150,
}: CustomCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoPlay && images.length > 1) {
      startAutoPlay();
      return () => stopAutoPlay();
    }
  }, [activeIndex, autoPlay, images.length]);

  const startAutoPlay = () => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= images.length) nextIndex = 0;

      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, autoPlayInterval);
  };

  const stopAutoPlay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / slideSize);
    if (index !== activeIndex) setActiveIndex(index);
  };

  return (
    <View style={[styles.wrapper, { height }]}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={{ width: width - 10 }}>
            <Image
              source={{ uri: item }}
              style={[styles.image, { height }]}
              resizeMode="stretch"
            />
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: width - 30,
    alignSelf: "center",
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#eaeaea",
    marginTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
      },
      android: {
        elevation: 6,
      },
    }),
  },

  image: {
    width: "100%",
    borderRadius: 1,
  },

  paginationContainer: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 4,
  },

  activeDot: {
    width: 22,
    height: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});
