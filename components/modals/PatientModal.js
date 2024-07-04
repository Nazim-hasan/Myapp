import {
    StyleSheet, Text, View, FlatList, Image, Modal,TouchableOpacity,
    Pressable,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const PatientModal = ({ modalVisible, closeModal, selectedItem, selectedOption, confirmDelete, setSelectedOption }) => {
    const navigation = useNavigation();
    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            animationType="slide"
            onRequestClose={closeModal}
        >
            <Pressable style={styles.modalOverlay} onPress={closeModal}>
                <View style={styles.modalContainer}>
                    {/* {selectedOption == 'delete' && (
                        <> */}
                            <Text style={{ color: 'red', fontSize: 30 }}>⨻</Text>
                            <Text style={styles.modalTitle}>Confirm Deletion</Text>
                            <Text style={styles.modalMessage}>Are you sure you want to delete {selectedItem?.name}?</Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={closeModal}>
                                    <Text style={styles.buttonText}>No</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={confirmDelete}>
                                    <Text style={styles.buttonText}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                        {/* </>
                    )}

                    {selectedOption == '' && (
                        <>
                            <Text style={styles.modalMessage}>Edit or delete {selectedItem?.name}..</Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => {
                                    closeModal();
                                    navigation.navigate('editprofile')
                                }}>
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => setSelectedOption('delete')}>
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )} */}
                </View>
            </Pressable>
        </Modal>
    )
}

export default PatientModal

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
})