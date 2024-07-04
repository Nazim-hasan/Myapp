import React, { useState } from 'react'
import { Image, Text, Modal, Pressable, View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'

const UpdatePrescriptionModal = ({ modalVisible, closeModal, submitPrescription }) => {

    const [symptoms, setSymptoms] = useState('');
    const [prescription, setPrescription] = useState('');
    const [comment, setComment] = useState('');
    const [billing, setBilling] = useState({
        totalAmount: '',
        receivedAmount: '',
        dueAmount: '',
        billingDate: Date.now(),
    });

    const handleBillingChange = (name, value) => {
        setBilling({
            ...billing,
            [name]: value
        });
    };

    const handlePrescription = () => {

        const data = {
            // userId,
            // doctorId,
            // patientId,
            symptoms,
            prescription,
            comment,
            billing: {
                totalAmount: parseInt(billing.totalAmount),
                receivedAmount: parseInt(billing.receivedAmount),
                dueAmount: parseInt(billing.dueAmount),
            },
        };

        submitPrescription(data)
    }
    
    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            animationType="slide"
            onRequestClose={closeModal}
        >
            <ScrollView contentContainerStyle={styles.modalOverlay}>

                <View style={styles.modalContainer}>
                    <Pressable style={{ position: 'absolute', top: 10, right: 10 }}
                        onPress={closeModal}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>⨉</Text>
                    </Pressable>
                    <Pressable style={styles.flex_row}>
                        <Text style={styles.modalTitle}>New Prescription</Text>
                    </Pressable>
                    <View style={styles.separator} />

                    <View style={[styles.px15, styles.mt10, { width: '100%' }]}>
                        <View style={[{ flexDirection: 'row', justifyContent: 'space-between', }]}>
                            <Text style={{ fontWeight: 'bold' }}>Symptoms</Text>
                            <Text style={{ fontWeight: 'bold' }}>12 may 2024</Text>
                        </View>
                        <TextInput
                            style={[styles.textarea, styles.mt10, { height: 80 }]}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="বাতের ব্যথার সাথে জ্বর । নড়াচড়া করলে উপশম বৃদ্ধি পায়, খাবারে রুচি হয় না, পেট ফুলে থাকে।"
                            value={symptoms}
                            onChangeText={setSymptoms}
                        />
                    </View>

                    <View style={[styles.px15, styles.mt10, { width: '100%' }]}>
                        <View style={[{ flexDirection: 'row', justifyContent: 'space-between', }]}>
                            <Text style={{ fontWeight: 'bold' }}>Prescription</Text>
                        </View>
                        <TextInput
                            style={[styles.textarea,]}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Rush Tox 200 + 2 bottle + 2 Span, K.P 30x 6 Tab. 2 Times a day"
                            value={prescription}
                            onChangeText={setPrescription}
                        />
                    </View>

                    <View style={[styles.px15, styles.mt10, { width: '100%' }]}>
                        <View style={[{ flexDirection: 'row', justifyContent: 'space-between', }]}>
                            <Text style={{ fontWeight: 'bold' }}>Comment</Text>
                        </View>
                        <TextInput
                            style={[styles.textarea, { height: 70 }]}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Rush Tox 200 + 2 bottle + 2 Span, K.P 30x 6 Tab. 2 Times a day"
                            value={comment}
                            onChangeText={setComment}
                        />
                    </View>


                    <View style={[styles.px15, styles.mt10, { width: '100%' }]}>
                        <View style={[{ flexDirection: 'row', justifyContent: 'space-between', }]}>
                            <Text style={{ fontWeight: 'bold' }}>Billing Amount</Text>
                            <Text style={{ fontWeight: 'bold' }}>⋀</Text>
                        </View>
                        <View style={[styles.separator, { marginVertical: 20 }]} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'column', width: '47%' }}>
                                <Text>Totall amount</Text>
                                <TextInput
                                    style={[styles.inputText,]}
                                    placeholder="৳ 900"
                                    value={billing.totalAmount}
                                    onChangeText={(value) => handleBillingChange('totalAmount', value)}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={{ flexDirection: 'column', width: '47%' }}>
                                <Text>Received</Text>
                                <TextInput
                                    style={[styles.inputText,]}
                                    placeholder="৳ 650"
                                    value={billing.receivedAmount}
                                    onChangeText={(value) => handleBillingChange('receivedAmount', value)}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'column', width: '100%', paddingVertical: 20 }}>
                            <Text>Due Amount</Text>
                            <TextInput
                                style={[styles.inputText,]}
                                placeholder="৳ 250"
                                value={billing.dueAmount}
                                onChangeText={(value) => handleBillingChange('dueAmount', value)}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <View style={[styles.justifyBetween, styles.px15, { width: '100%' }]}>
                        <Pressable style={styles.inputText}>
                            <Text style={{ paddingHorizontal: 20 }}>Save as draft</Text>
                        </Pressable>

                        <Pressable style={[styles.inputText, { backgroundColor: '#00A746' }]}
                            onPress={handlePrescription}
                        >
                            <Text style={{ paddingHorizontal: 10, color: '#fff' }}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </Modal >
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        paddingVertical: 10
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },

    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#ccc'
    },
    justifyBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    px15: {
        paddingHorizontal: 15
    },

    mt10: {
        marginTop: 10
    },

    bgWhite: {
        backgroundColor: '#f9f9f9',
    },
    flex_row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },

    listIcon: {
        height: 20,
        // width:20,

    },

    textarea: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top', // for Android to ensure text starts at the top
    },

    inputText: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top', // for Android to ensure text starts at the top
    },
})
export default UpdatePrescriptionModal