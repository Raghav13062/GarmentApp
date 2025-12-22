import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    Modal,
    TouchableWithoutFeedback,
    Image,
} from 'react-native';
import { color, fonts } from '../../../../constant';
import CustomButton from '../../../../component/CustomButton';
import imageIndex from '../../../../assets/imageIndex';

const { width, height } = Dimensions.get('window');

export default function CreditLimitModal({ visible, onClose }) {
    const [select, setSelect] = useState('')
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
        <TouchableWithoutFeedback onPress={onClose}>

            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Header handle */}
                    <Text style={styles.amount}>Credit Limit Card</Text>
                    {/* Card */}
                    <View style={styles.card}>
                        <Text style={styles.progressText}>₹ 2,50,000 / ₹ 500,000</Text>
                        <View style={styles.progressBarBackground}>
                            <View style={[styles.progressBarFill, { width: '50%' }]} />
                        </View>
                        <View style={styles.rowBetween}>
                            <Text style={styles.progressText}>Outstanding Amount</Text>
                            <Text style={styles.progressText}>₹ 2,50,000</Text>
                        </View>
                        <View style={styles.rowBetween}>
                            <Text style={styles.progressText}>Next Billing Date</Text>
                            <Text style={styles.progressText}>15 Aug 2025</Text>
                        </View>
                    </View>

                    {/* Payment Options */}
                    <View style={styles.paymentOptions}>
                        <Text style={styles.amount}>Select Payment Amount</Text>

                        <TouchableOpacity style={styles.rowBetween} onPress={()=>setSelect('0')}>
                            <View>
                            <Text style={styles.progressText}>Minimum Due</Text>
                            <Text>₹ 5,000</Text>
                            </View>
                            <Image source={select == "0"?imageIndex.radioCheck : imageIndex.redio} style={{height:20, width:20}}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.rowBetween} onPress={()=>setSelect('1')}>
                            <View>
                            <Text style={styles.progressText}>Full Due</Text>
                            <Text>₹ 2,50,000</Text>
                            </View>
                            <Image source={select == "1"?imageIndex.radioCheck : imageIndex.redio}  style={{height:20, width:20,}}/>

                        </TouchableOpacity>

                        <Text style={[styles.sectionTitle, { color: color.primary }]}>
                            Custom Amount
                        </Text>
                        <TextInput style={styles.input} placeholder="₹ Custom Amount" />
                 <CustomButton title='Pay Bill' style={{marginTop:20}} onPress={onClose}/>
                    </View>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </Modal>
        
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
        height: 'auto',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    handle: {
        width: 50,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#ccc',
        marginBottom: 15,
    },
    progressWrapper: {
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#555',
    },
    amount: {
        fontSize: 20,
        fontFamily:fonts.bold
    },
    card: {
        width: width - 40,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 15,
        marginTop: 20,
        borderColor: "#f2f2f2",
        borderWidth: 1
    },
    progressText: {
        fontSize: 14,
        marginBottom: 6,
        color:'black',
        fontFamily:fonts.bold
    },
    progressBarBackground: {
        height: 7,
        backgroundColor: '#E0E0E0',
        borderRadius: 3.5,
        marginVertical: 6,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: 7,
        backgroundColor: color.primary,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        alignItems:'center',
        paddingRight:5
    },
    paymentOptions: {
        width: width - 40,
    },
    sectionTitle: {
        
        marginVertical: 8,
        fontFamily:fonts.bold
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 10,
        marginTop: 6,
        height:50
    },
});
