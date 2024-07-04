


import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { apiService } from '../src/services/api-service';
import CreatePrescriptionModal from './modals/CreatePrescriptionModal';
import PrescriptionItem from './PrescriptionItem';
import { USER_TOKEN } from './Signin';


const Patient = ({ route, navigation }) => {
     const { item } = route.params;
     const [selectedOption, setSelectedOption] = React.useState('');
     const [modalVisible, setModalVisible] = React.useState(false);
     const [selectedItem, setSelectedItem] = React.useState(null);
     const [createPrescriptionModalVisible, setCreatePrescriptionModalVisible] = React.useState(false);
     const [patientPrescriptions, setPatientPrescriptions] = React.useState([]);

     // console.log("item at patient:", item);

     useEffect(() => {
          loadPrescriptions(item._id)
     }, [])


     const closeCreatePrescriptionModal = () => {
          setCreatePrescriptionModalVisible(false);
     };



     const submitPrescription = async (data) => {
          const userToken = await AsyncStorage.getItem(USER_TOKEN);

          const updateData = {
               ...data,
               patientId: item._id,
          }

          try {
               await apiService.addPrescription(updateData, userToken).then((res) => {
                    console.log("add prescription response ::::", res.data)
                    //   navigation.navigate('patientdashboard');
               }).catch(err => console.log("error occur while adding presscription:", err.response.data))
          } catch (err) {
               console.log('Error adding prescription, please try again', err);
               // setError('Error adding prescription, please try again');
          }

     }

     const loadPrescriptions = async (patientId) => {
          const userToken = await AsyncStorage.getItem(USER_TOKEN);
          apiService.getPatientPrescription(patientId, userToken)
               .then((res) => {
                    console.log("patinet prescription :", res.data)
                    setPatientPrescriptions(res.data);
               }).catch((err) => {
                    console.log("error while getting patient prescription", err)
               })
     }


     return (
          <View style={{ flex: 1 }}>
               <View style={styles.item} >
                    <Image source={{ uri: item.image }} style={styles.avatar} />
                    <View style={styles.infoContainer}>
                         <View style={styles.details}>
                              <Text style={styles.name}>{`${item.fullName} (${item.dateOfBirth})`}</Text>
                         </View>

                         <Text style={{ marginVertical: 10 }}>{`${item.presentAddress.apartment}, ${item.presentAddress.state}, ${item.presentAddress.city}, ${item.presentAddress.country}`}</Text>

                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                              <View style={{ backgroundColor: '#E3FFEF', padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
                                   <Text>Text/call</Text>
                              </View>

                              <View style={{ backgroundColor: '#E3FFEF', padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
                                   <Text>Billing</Text>
                              </View>

                              <View style={{ backgroundColor: '#E3FFEF', padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
                                   <Text>Info</Text>
                              </View>
                         </View>
                    </View>

               </View>

               <View style={[styles.px15,]}>
                    <View style={[styles.bgWhite]}>
                         <Text style={styles.name}>Prescription History</Text>
                         <View style={[styles.separator, { marginTop: 5 }]} />
                    </View>
               </View>
               {/* <FlatList
                    style={{ flex: 1 }}
                    data={patientPrescriptions}
                    renderItem={PrescriptionItem}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListFooterComponent={() => <View style={{ height: 100 }} />}
               /> */}


               <FlatList
                    data={patientPrescriptions}
                    renderItem={(elem) => <PrescriptionItem pres={elem.item} />}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListFooterComponent={() => <View style={{ height: 100 }} />}
               />

               <View style={{ position: 'absolute', bottom: 0, right: 0, flexDirection: 'row', justifyContent: 'flex-end', }}>
                    <TouchableOpacity style={{ backgroundColor: '#00A746', width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 70 }}
                         onPress={() => {
                              setCreatePrescriptionModalVisible(true);
                              console.log("create prescription open")
                         }}
                    >
                         <Text style={{ color: '#fff', fontSize: 35 }}>+</Text>
                    </TouchableOpacity>
               </View>

               <CreatePrescriptionModal closeModal={closeCreatePrescriptionModal}
                    modalVisible={createPrescriptionModalVisible} submitPrescription={submitPrescription} />

          </View>
     )
};

const styles = StyleSheet.create({
     item: {
          flexDirection: 'row',
          padding: 20,
          backgroundColor: '#f9f9f9',
          borderRadius: 10,
          marginVertical: 8,
          justifyContent: 'space-between'
     },
     avatar: {
          width: 100,
          height: 100,
          borderRadius: 60,
          marginRight: 15
     },
     infoContainer: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',

     },
     justifyBetween: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: 10,

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
});
export default Patient;




