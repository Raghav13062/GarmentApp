import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBackHeader from "../../../../component/CustomBackHeader";
import imageIndex from "../../../../assets/imageIndex";
import CustomButton from "../../../../component/CustomButton";
import { color, fonts } from "../../../../constant";
import ScreenNameEnum from "../../../../routes/screenName.enum";

export default function AboutLimit({ navigation }) {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginLeft:15}}>
            <CustomBackHeader menuIcon={imageIndex.back} label={""} />
</View>
            {/* Scrollable Terms */}
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.heading}>customers undertaking and confirmations</Text>
                <Text style={styles.paragraph}>
                    By clicking the "Confirm and Continue" button, I hereby expressly,
                    irrevocably and unconditionally confirm and agree the following:
                </Text>
                <Text style={styles.paragraph}>
                    1. I hereby apply for a LazyPlus facility ("Facility") from PayU
                    Finance India Private Limited ("Lender") that can be drawn down or
                    utilized, as permitted by the Lender: (a) for making payments to any
                    merchant selling goods and/or services offline and/or online by
                    scanning QR codes at Source Platforms ("Scan and Pay"), and/or (b) for
                    funding Prepaid Payment Instruments issued by PPI issuers as approved
                    by the Lender ("PPI"), and/or (c) for making payment to any merchant
                    selling goods and/or services on any Source Platform in equated
                    monthly instalments ("EMI Checkout"), and/or (d) for making payment to
                    any merchant selling goods and/or services online on any Source
                    Platform resulting from any transaction concluded by the Borrower
                    using the deferred payment option ("DPO Checkout"), and/or (e) as a
                    one-time payment option for settling of any outstanding amounts due by
                    me to various merchant(s) resulting from any payment transactions
                    concluded by me using the buy-now-pay-later option offered by such
                    merchant(s) using any services or facilities provided by or through
                    LazyPay Private Limited to such merchant(s) ("BNPL Settlement"),
                    and/or (f) as a one-time payment option...
                </Text>
            </ScrollView>
<View style={{backgroundColor:"#FFFFF7", elevation:7}}>
            {/* Checkbox */}
            <View style={styles.checkboxContainer}>
                {/* <CheckBox
          value={isChecked}
          onValueChange={setIsChecked}
          tintColors={{ true: "#FF9F00", false: "#FF9F00" }}
        /> */}
        <Image source={imageIndex.checkO} style={{height:25, width:25, marginRight:5}}/>
                <Text style={styles.checkboxText}>
                    By continuing, I accept the above mentioned{" "}
                    <Text
                        style={styles.linkText}
                        onPress={() => Linking.openURL("https://example.com/most-important-terms")}
                    >
                        Most Important Terms and Conditions
                    </Text>{" "}
                    and the{" "}
                    <Text
                        style={styles.linkText}
                        onPress={() => Linking.openURL("https://example.com/general-terms")}
                    >
                        General Terms and Conditions
                    </Text>.
                </Text>
            </View>

         
         <CustomButton title="Accept & Continue" style={styles.button} onPress={()=>navigation.navigate(ScreenNameEnum.LimitDetail)}/>
      </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f2f2f2" },
    scrollContainer: { flex: 1, paddingHorizontal: 16, marginTop: 10,  },
    heading: {
         fontSize: 16, 
         textTransform: "lowercase", 
         marginBottom: 10 ,
             fontFamily:fonts.bold,
        },
    paragraph: { fontSize: 14, color: "#9DB2BF", lineHeight: 22, marginBottom: 10, 
             fontFamily:fonts.regular,

     },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingHorizontal: 16,
        marginBottom: 10,
        paddingTop:15,
        backgroundColor:"#fff",
        
    },
    checkboxText: { flex: 1, fontSize: 13, color: "#909090", fontFamily:fonts.regular, lineHeight:20 },
    linkText: { color: color.primary, fontFamily:fonts.semiBold  },
    button: {
        width:'90%',
        alignSelf:'center',
        marginBottom:15
    },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
