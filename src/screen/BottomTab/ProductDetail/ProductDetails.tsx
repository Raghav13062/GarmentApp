import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
   ScrollView,
  Dimensions,
 } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import { useRoute } from "@react-navigation/native";
import { color, navigateToScreen, navigationBack } from "../../../constant";
import ScreenNameEnum from "../../../routes/screenName.enum";
 import Loading from "../../../utils/Loader";
import { TopProductDetail } from "../../../Api/auth/ApiGetCategories";
import { styles } from "./style";

const { width } = Dimensions.get("window");
export default function ProductDetails() {
  const route = useRoute();
  const { item, gender } = route.params as any;
  const [activeImage, setActiveImage] = useState(0);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    TopProductDetail(item.id)
      .then(res => {
        if (res) {
          setProduct(res);
        }
      })
      .catch(err => console.log("API Error:", err));
  }, [item.id,]);

  if (!product) {
    return (
      <View style={styles.loader}>
       <Loading /> 
      </View>
    );
  }
 
  const discountPercent = Math.round(
  ((product.price - product.discountPrice) / item.price) * 100
);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* IMAGE SLIDER */}
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) =>
              setActiveImage(
                Math.round(e.nativeEvent.contentOffset.x / width)
              )
            }
          >
            {product?.images?.map((img: string, index: number) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={styles.mainImage}
              />
            ))}
          </ScrollView>

          {/* BACK BUTTON */}
          <TouchableOpacity style={styles.backButton} onPress={navigationBack}>
            <LinearGradient
              colors={color.buttLinearGradient}
              style={styles.backBtn}
            >
              <Ionicons name="arrow-back" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>

          {/* DOT INDICATOR */}
          <View style={styles.indicatorRow}>
            {product?.images?.map((_: any, i: number) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  activeImage === i && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* PRODUCT INFO */}
        <View style={styles.section}>
          <Text style={styles.brand}>{product.name}</Text>
           <Text style={[styles.off,{
            marginTop:2
           }]}>{discountPercent}% OFF</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.ratingCount}>
              {product.reviewCount || 0} Ratings
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.discountPrice}</Text>
            <Text style={styles.mrp}>₹{product.price}</Text>

            <LinearGradient
              colors={color.buttLinearGradient}
              style={styles.discountBadge}
            >
              <Text style={styles.discount}>
                Stock {product.stock}
              </Text>
            </LinearGradient>
          </View>
          
        </View>
         
        {/* DESCRIPTION */}
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.desc}>{product?.description}</Text>
        </View>

      </ScrollView>

      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() =>
            navigateToScreen(ScreenNameEnum.CheckoutScreen, { product })
          }
        >
          <LinearGradient
            colors={color.buttLinearGradient}
            style={styles.cartGradient}
          >
            <Text style={styles.cartText}>Add to Bag</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyBtn}>
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
 