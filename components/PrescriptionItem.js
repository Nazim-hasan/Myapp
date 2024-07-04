import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PrescriptionContextModal from './modals/PrescriptionModal';

const PrescriptionItem = (pres) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);

    const handleOption = (item) => {
        setSelectedItem(item);
        setModalVisible(!modalVisible);
    };

    return (
        <View style={[styles.px15,]} key={pres.pres._id}>
            <View style={[styles.bgWhite]}>
                <View style={styles.dateTime}>
                    <Text style={styles.dateTimeText}>{pres.pres?.billing.billingDate.slice(0, 10)}</Text>
                    <Text style={styles.dateTimeText}>{pres.pres?.billing.billingDate.slice(11, 16)}</Text>
                </View>

                <View style={[{flexDirection:'row', justifyContent:'space-between' ,paddingVertical: 5, width:'100%', }]}>
                    <View>
                        <Text style={[styles.dateTimeText, { flex: 1, fontWeight: 'bold' }]}>{pres.pres.prescription}</Text>
                        <Text style={[styles.dateTimeText, { flex: 1, }]}>Total:{pres.pres.billing.totalAmount}</Text>
                        <Text style={[styles.dateTimeText, { flex: 1, }]}>Due:{pres.pres.billing.dueAmount}</Text>
                    </View>
                    <PrescriptionContextModal prescriptionId={pres._id} handleOption={handleOption} />
                </View>
            </View>
            <View style={[styles.separator, { marginTop: 5 }]} />
        </View>
    )
}

export default PrescriptionItem

const styles = StyleSheet.create({
    px15: {
        paddingHorizontal: 15
    },

    mt10: {
        marginTop: 10
    },

    bgWhite: {
        backgroundColor: '#f9f9f9',
    },

    dateTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },

    dateTimeText: {
        fontSize: 14,
        color: '#666'
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#ccc'
    },
})