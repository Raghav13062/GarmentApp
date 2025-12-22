import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';
import imageIndex from '../../../../assets/imageIndex';
import CustomBackHeader from '../../../../component/CustomBackHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color, fonts } from '../../../../constant';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../../routes/screenName.enum';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CreditLimit = () => {
  const [expanded, setExpanded] = useState(null);
const navigation = useNavigation()
  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === index ? null : index);
  };

  const infoCards = [
    {
      icon: imageIndex.credit,
      text: 'Instant Credit Up To 60,000 Pay Next Month Or in EMIs',
    },
    {
      icon: imageIndex.fast,
      text: 'Fast & Easy 1-Click Payments',
    },
    {
      icon: imageIndex.doc,
      text: 'Pay For Shopping & Bills Pay On Favorite Apps',
    },
    {
      icon: imageIndex.rs,
      text: 'No Hidden Charges No Annual Fees',
    },
  ];

  const faqs = [
    {
      question: 'How do I apply for credit limit?',
      answer:
        'Credit limits are available at the time of purchase on any of our applications. Interested in working with one of our partners & applying for a credit limit? Reach out to our support team (email) directly & we’ll be happy to push you in the right direction!',
    },
    {
      question: 'How does the Application process work?',
      answer:
        'Our application process is fast and simple. Just follow the instructions in the app, verify your KYC, and get your credit approved instantly.',
    },
    {
      question: 'How does the Application process work?',
      answer:
        'Our application process is fast and simple. Just follow the instructions in the app, verify your KYC, and get your credit approved instantly.',
    },
  ];

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
       <CustomBackHeader menuIcon={imageIndex.back} label={"Credit Limit"} />

      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Pay Later</Text>
          <Text style={styles.headerSubtitle}>Buy now, Pay next month or in EMIs</Text>
        </View>
        <Image source={imageIndex.payleter} style={styles.headerImage} />
      </View>
 <TouchableOpacity style={styles.header} onPress={()=>{navigation.navigate(ScreenNameEnum.AboutLimit)}}>
   <Text style={styles.headerTitle}>About your limit</Text>
   <View style={{flexDirection:'row'}}>
          <Text style={styles.headerTitle}>Go </Text>
          <Image source={imageIndex.rightw} style={{height:25, width:30}} />
          </View>
      </TouchableOpacity>
      {infoCards.map((item, index) => (
        <View key={index} style={styles.infoCard}>
          <Image source={item.icon} style={styles.cardIcon} />
          <Text style={styles.cardText}>{item.text}</Text>
        </View>
      ))}

      <Text style={styles.infoText}>
        Currently, you are not eligible to register for Harjeet Overseas Pay Later.
      </Text>
      <Text style={styles.infoText}>
        We are working towards making it available for you as soon as possible.
      </Text>

      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqContainer}>
          <TouchableOpacity
            onPress={() => toggleExpand(index)}
            style={styles.faqQuestion}>
            <Text style={styles.faqText}>{faq.question}</Text>
            <Image source={expanded === index ?imageIndex.top: imageIndex.down} style={styles.faqArrow}/>
          </TouchableOpacity>
          {expanded === index && (
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          )}
        </View>
      ))}
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom:30,
  },
  header: {
    backgroundColor: color.primary,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:20,
    paddingVertical:23
  },
  headerTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily:fonts.bold,
    color: '#fff',
  },
 
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    fontFamily:fonts.regular,

  },
  headerImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  infoCard: {
    backgroundColor: '#FFF2D7',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
    resizeMode: 'contain',
  },
  cardText: {
    flex: 1,
    fontSize: 14,
    color: '#32343E',
    fontFamily:fonts.semiBold

  },
  infoText: {
    fontSize: 13,
    color: '#484C52',
    marginTop: 16,
    fontFamily:fonts.semiBold,
    marginHorizontal:10
  },
  faqContainer: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 10,
    padding: 10,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    fontFamily:fonts.medium

  },
  faqArrow: {
   height:20,
   width:20
  },
  faqAnswer: {
    marginTop: 10,
    fontSize: 14,
    color: '#000',
    fontFamily:fonts.regular,
    lineHeight:18

  },
});

export default CreditLimit;
