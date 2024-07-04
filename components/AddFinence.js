import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list';
import { apiService } from '../src/services/api-service';
import { useNavigation } from '@react-navigation/native';


const AddFinence = () => {
    const navigation = useNavigation()
    const [selectedPatient, setSelectedPatient] = React.useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [remainingDue, setRemainingDue] = useState(0);
    const [receivedAmount, setReceivedAmount] = useState(0);
    const [allPatient, setAllPatient] = useState([])


    React.useEffect(() => {
        apiService.getAllPatient().then(res => {
            const data = res.data.map(item => { return { key: item._id, value: item.fullName } })
            setAllPatient(data)
        })
    }, []);


    React.useEffect(() => {
        if (totalAmount > receivedAmount) {
            const due = totalAmount - receivedAmount
            setRemainingDue(due);
        }
        console.log(totalAmount - receivedAmount)
    }, [totalAmount, receivedAmount]);


    const submitBill = async() => {
        const bill = {
            patientId: selectedPatient,
            totalBill: totalAmount.toString(),
            receivedBill: receivedAmount.toString(),
            draft: true
        }

        try {
            await apiService.addBill(bill).then((res) => {
              console.log("add patient response ::::", res.data)
              navigation.navigate('finance');
            }).catch(err=> console.log('Catch:',err, err.message))
          } catch (err) {
            console.log("Try:",err);
            setError('Error adding doctor, please try again');
          }
    }

    return (
        <View>
            {/* <View>
        <Text>Patient</Text>
        <Text>Total</Text>
        <Text>Patient</Text>
        <Text>Patient</Text>
      </View> */}

            <View style={{ marginTop: 50 }}>
                <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>Add Bill</Text>

                <SelectList
                    setSelected={(val: string) => setSelectedPatient(val)}
                    data={allPatient}
                    save="key"
                    dropdownTextStyles={{ color: 'black', textTransform: 'capitalize' }}
                    dropdownStyles={{ backgroundColor: '#fff', position: 'absolute', width: '90%', opacity: 1, zIndex: 11111, alignSelf: 'center', top: 30 }}
                    // placeholder='Loss Sector'
                    boxStyles={{ padding: 0, height: 40, margin: 0, marginHorizontal: 15, }}
                    inputStyles={{ height: 30, color: 'black' }}

                />

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'column', width: '48%' }}>
                        <Text style={styles.label}>Todal</Text>
                        <TextInput
                            style={styles.inputBox}
                            placeholder='0'

                            keyboardType='number-pad'
                            value={totalAmount}
                            onChangeText={setTotalAmount}
                        />
                    </View>

                    <View style={{ flexDirection: 'column', width: '48%' }}>
                        <Text style={styles.label}>Received</Text>
                        <TextInput
                            style={styles.inputBox}
                            placeholder='0'
                            keyboardType='number-pad'
                            value={receivedAmount}
                            onChangeText={setReceivedAmount}

                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'column', paddingHorizontal: 15 }}>
                    <Text style={styles.label}>Remaining Due</Text>
                    {/* <TextInput
                        style={styles.inputBox}
                        placeholder='0'
                        value={remainingDue}
                        editable={false}
                    /> */}
                    <Text style={styles.inputBox}>{remainingDue}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                    <TouchableOpacity onPress={submitBill} style={{ width: '80%', backgroundColor: '#4CAF50', height: 52, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AddFinence

const styles = StyleSheet.create({

    inputBox: {
        height: 52,
        marginTop: 15,
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 26,
        letterSpacing: 0,
        textAlign: 'left',
        borderWidth: 1,
        borderColor: '#AFD59F',
        borderRadius: 6,
        marginHorizontal: 10,
        padding: 10
    },
    label: {
        fontSize: 14,
        fontWeight: '300',
        marginTop: 20
    }
})