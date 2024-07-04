
import { useState } from 'react';
import {
    FlatList, Image, Modal, StyleSheet, Text, View, TouchableOpacity,
    Pressable,
} from 'react-native';
import draftDoc from '../testdata/draft-data';
import PatientModal from './modals/PatientModal';
import ContextModal from './modals/ContextModal';

const Drafts = (props) => {
    const [selectedOption, setSelectedOption] = useState('');
    // const [optionVisible, setOptionVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const closeModal = () => {
        setSelectedOption('');
        setModalVisible(false);
    };

    const handleOption = () => {
        // setSelectedItem(item);
        setModalVisible(!modalVisible);
    };

    const confirmDelete = () => {
        // Perform deletion logic here
        setModalVisible(false);
        console.log(`Deleting item: ${selectedItem.name}`);
    };

    const draftItem = (data) => {
        const { item } = data;
        return (
            <View style={styles.item}>
                <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
                <View style={styles.infoContainer}>
                    <View style={styles.dateTime}>
                        <Text style={styles.dateTimeText}>{item.date}</Text>
                        <Text style={styles.dateTimeText}>{item.time}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text>{item.experience}</Text>
                        <Text>{item.location}</Text>
                    </View>
                </View>
                <ContextModal handleOption={handleOption} />
                {/* <TouchableOpacity onPress={() => handleOption(item)}
                    style={{ paddingLeft: 10, width: 10, justifyContent: 'center' }}>
                    <Image source={require('../assets/draft/dot.png')} />
                </TouchableOpacity> */}

            </View>
        )
    }
    return (
        <>
            <View style={styles.main} >
                <View style={styles.info} >
                    <View style={styles.info1}>
                        <Text style={styles.seven}> Last 7 Days </Text>
                    </View>

                    <View style={styles.info2}>
                        <Text style={styles.tcxt1}> filter</Text>
                    </View>
                </View>

                <FlatList
                    data={draftDoc}
                    renderItem={draftItem}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </View>

            <PatientModal modalVisible={modalVisible} closeModal={closeModal} selectedItem={selectedItem} confirmDelete={confirmDelete} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </>

    );




};

const styles = StyleSheet.create({

    main: {
        backgroundColor: 'white',
        flex: 1,
        width: "100%",
        height: 920,
        overflow: "hidden",
    },
    info: {
        flexDirection: 'row',

    },
    info1: {
        top: 40,
        left: 16,
    },
    seven: {
        width: 133,
        height: 31,
        borderRadius: 3,
        elevation: 4,
        backgroundColor: '#E3FFEF',
        fontSize: 13,

        left: 5,

    },

    info2: {
        top: 40,
        left: 136,

    },
    tcxt1: {
        width: 80,
        height: 31,
        borderRadius: 3,
        elevation: 4,
        backgroundColor: '#E3FFEF',
        // color: ' #192608',
        fontSize: 14,

        left: 5,

    },
    img: {
        top: 90,
        left: '90%',

    },

    ///
    item: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginVertical: 8,
        justifyContent: 'space-between'
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    dateTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10
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


});
export default Drafts; 
