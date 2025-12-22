import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import imageIndex from '../../assets/imageIndex';
import CustomButton from '../../component/CustomButton';
 import ScreenNameEnum from '../../routes/screenName.enum';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color, fonts } from '../../constant';

const { width, height } = Dimensions.get('window');

interface Slide {
    id: string;
    title: string;
    description: string;
    image: string;
}

const slides: Slide[] = [
  {
    id: '1',
    title: 'Welcome to ',
    description: 'Connectify lets you share moments, follow friends, and stay connected with people who matter most.',
    image: imageIndex.onboarding,
  },
  {
    id: '2',
    title: 'Share Your World',
    description: 'Post photos, videos, and updates in real-time and engage with your community instantly.',
    image: imageIndex.onboarding,
  },
  {
    id: '3',
    title: 'Stay in the Loop',
    description: 'Get notifications, discover new trends, and never miss what’s happening in your network.',
    image: imageIndex.onboarding,
  }
]


const OnboardingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const flatListRef = useRef<FlatList>(null);

    const updateCurrentIndex = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setCurrentIndex(index);
    };

    const handleNextPress = () => {
        if (currentIndex < slides.length - 1) {
            const nextIndex = currentIndex + 1;
            flatListRef.current?.scrollToIndex({ index: nextIndex });
            setCurrentIndex(nextIndex);
        } else {
            navigation.replace(navigation.navigate(ScreenNameEnum.LoginScreen));  // Last slide pe Home ya Login pe navigate karna
        }
    };

    const renderSlide = ({ item, index }: { item: Slide, index: number }) => (
        <View style={styles.slide}>
            {/* <ImageBackground source={item.image} style={styles.image} resizeMode='contain'  >
                <TouchableOpacity onPress={() => navigation.replace(ScreenNameEnum.ChooseRoleScreen)} style={styles.skipButton}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </ImageBackground> */}
            <Text style={styles.title}>{item.title}{index == 0 && <Text style={{color:color.primary}}> HarjeetOverseas</Text> }</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            
            <ImageBackground source={imageIndex.onboarding} style={styles.image} resizeMode='contain'  >

            </ImageBackground>
            </View>
            <View style={{}}>
            <FlatList
                data={slides}
                horizontal
                pagingEnabled
                ref={flatListRef}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={renderSlide}
                onScroll={updateCurrentIndex}
                scrollEventThrottle={16}
            />
            <View style={{
                
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginBottom:20
            }}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>
            {/* Next Button */}
            <CustomButton
                title={'Next'}
                onPress={handleNextPress}
                style={{ width: '90%', alignSelf: 'center', marginBottom: 35 }}
            />
            </View>
        </SafeAreaView>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    slide: {
        width,
        // backgroundColor:'red',
        justifyContent:'flex-end',
        paddingBottom:20

    },
    image: {
        width: "100%",
        height:'100%'

    },
    title: {
        fontSize: 26,
        // fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
         lineHeight:50
    },
    description: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        paddingHorizontal: 16,
        lineHeight: 25,
     },
    pagination: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 80,
        backgroundColor: "red"
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 10,
        marginHorizontal: 3,
    },
    activeDot: {
        backgroundColor: color.primary,
        width: 18,
        height: 8,
    },
    inactiveDot: {
        backgroundColor: 'gray',
        height: 8,
        width: 8,
    },
    skipButton: {
        position: 'absolute',
        top: 15,
        right: 20,
        zIndex: 1,
    },
    skipText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 16,
    },
});
