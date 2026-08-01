import { color, fonts, spacing } from "../../../constant";

import React, { useEffect, useState } from 'react'
import {
    Image, ScrollView, View,
    StyleSheet,
    useWindowDimensions,
    Text
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
 import Loading from '../../../utils/Loader';
import imageIndex from '../../../assets/imageIndex'
import StatusBarComponent from '../../../component/StatusBarCompoent';
import CustomHeader from '../../../component/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { hp } from '../../../utils/Constant';
const Privacy = () => {
    const [isLoading, setLoading] = useState(false)
    const navigation = useNavigation()
    const [faqData, setFaqData] = useState([])
    useEffect(() => {
        // get_states_list()
    }, []);

    const { width } = useWindowDimensions();

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <Loading /> : null}
            <StatusBarComponent />
            <CustomHeader
                leftPress={true}
                navigation={navigation}
                menuIcon={imageIndex.back}
                label="Privacy" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                <View style={styles.illustrationWrapper}>
                    <Image
                        source={imageIndex.aboutus}
                        style={styles.illustration}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.body}>
                    <Text style={styles.sectionTitle}>Condition of Use</Text>
                    <Text style={styles.bodyText}>This Privacy Policy describes Our policies and procedures on the
                        collection, use and disclosure of Your information when You use the
                        Service and tells You about Your privacy rights and how the law protects
                        You.We use Your Personal data to provide and improve the Service.
                        By using the Service, You agree to the collection and use of information
                        in accordance with this Privacy Policy.
                        This Privacy Policy has been created with the help of the</Text>


                    <Text style={[styles.sectionTitle, styles.sectionSpacing]}>Terms of Use</Text>
                    <Text style={styles.bodyText}>This Privacy Policy describes Our policies and procedures on the
                        collection, use and disclosure of Your information when You use the
                        Service and tells You about Your privacy rights and how the law protects
                        You.We use Your Personal data to provide and improve the Service.
                        By using the Service, You agree to the collection and use of information
                        in accordance with this Privacy Policy.
                        This Privacy Policy has been created with the help of the</Text>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    htmlStyles: {
        p: {
            fontSize: 14,
            fontFamily: fonts.medium,
            color: color.textDark,
            lineHeight: 24,
            textAlign: 'justify',
            marginTop: spacing.sm,
        },
        h1: {
            fontSize: 22,
            fontFamily: fonts.medium,
            color: color.textDark,
            marginBottom: spacing.sm + 2,
        },
        h2: {
            fontSize: 18,
            fontFamily: fonts.medium,
            color: color.textDark,
            marginBottom: spacing.sm,
        },
        a: {
            color: color.primary,
        },
    },
    container: {
        flex: 1,
        backgroundColor: color.background,
    },
    contentContainer: {
        padding: spacing.md,
    },
    illustrationWrapper: {
        alignItems: 'center',
    },
    illustration: {
        width: '80%',
        height: hp(30),
    },
    body: {
        paddingHorizontal: spacing.md + 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: fonts.extraBold,
        color: color.primary,
        marginBottom: spacing.sm,
    },
    sectionSpacing: {
        marginTop: spacing.xxxl + 8,
    },
    bodyText: {
        fontSize: 14,
        fontFamily: fonts.regular,
        lineHeight: 22,
        color: color.textMedium,
        textAlign: 'justify',
    },

});

export default Privacy
