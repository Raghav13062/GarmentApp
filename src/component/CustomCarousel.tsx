import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";

const { width } = Dimensions.get("window");

interface Banner {
  _id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  linkType: string;
  linkId: string;
  displayOrder: number;
  isActive: boolean;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface CustomCarouselProps {
  banners: Banner[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  height?: number;
  onBannerPress?: (banner: Banner) => void;
}

export default function CustomCarousel({
  banners,
  autoPlay = true,
  autoPlayInterval = 3000,
  height = 180,
  onBannerPress,
}: CustomCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
const activeBanners = banners
  ?.filter(banner => banner.isActive !== false)
  .sort((a, b) => a?.displayOrder - b.displayOrder);


  useEffect(() => {
    if (autoPlay && activeBanners.length > 1) {
      startAutoPlay();
      return () => stopAutoPlay();
    }
  }, [activeIndex, autoPlay, activeBanners.length]);

  const startAutoPlay = () => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= activeBanners.length) nextIndex = 0;

      flatListRef.current?.scrollToIndex({ 
        index: nextIndex, 
        animated: true 
      });
      setActiveIndex(nextIndex);
    }, autoPlayInterval);
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / slideSize);
    if (index !== activeIndex) setActiveIndex(index);
  };

  const handleBannerPress = (banner: Banner) => {
    if (onBannerPress) {
      onBannerPress(banner);
    } else {
      console.log("Banner pressed:", banner);
      // You can add default navigation logic here
    }
  };

  const renderBannerItem = ({ item }: { item: Banner }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => handleBannerPress(item)}
      style={{ width: width - 30 }}
    >
      <Image
        source={{ uri: item.image }}
        style={[styles.image, { height }]}
        resizeMode="cover"
      />
      {/* Title Overlay */}
      <View style={styles.titleOverlay}>
        <View style={styles.titleBackground}>
          <Text style={styles.titleText} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.descriptionText} numberOfLines={1}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (activeBanners.length === 0) {
    return (
      <View style={[styles.wrapper, { height }]}>
        <Text style={styles.noBannersText}>No banners available</Text>
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, { height }]}>
      <FlatList
        ref={flatListRef}
        data={activeBanners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollBeginDrag={stopAutoPlay}
        onScrollEndDrag={startAutoPlay}
        renderItem={renderBannerItem}
      />

      {/* Pagination Dots - Only show if more than 1 banner */}
      {activeBanners.length > 1 && (
        <View style={styles.paginationContainer}>
          {activeBanners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      )}
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
    marginBottom: 10,
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
    borderRadius: 15,
  },

  titleOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },

  titleBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderRadius: 8,
  },

  titleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Helvetica" : "Roboto",
  },

  descriptionText: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 13,
    marginTop: 3,
    fontFamily: Platform.OS === "ios" ? "Helvetica" : "Roboto",
  },

  paginationContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },

  activeDot: {
    width: 22,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },

  noBannersText: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    padding: 20,
    fontFamily: Platform.OS === "ios" ? "Helvetica" : "Roboto",
  },
});