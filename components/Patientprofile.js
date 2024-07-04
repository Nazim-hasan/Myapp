import { FAB } from '@rneui/base';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable } from 'react-native';
import PrescriptionModal from './modals/PrescriptionModal';

const Patientprofile = (props) => {
  const [patient, setPatient] = useState({});

  const [selectedOption, setSelectedOption] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patient');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors', error);
      }
    };
    fetchDoctors();
  }, []);


  const closeModal = () => {
    setSelectedOption('');
    setModalVisible(false);
  };
  return (
    <>
      <View style={styles.main}>
        <View>
          <TouchableOpacity onPress={() => props.navigation.navigate("editpatient")}>
            <Image source={require('../assets/drprofile/edit.png')} style={styles.edit} />
          </TouchableOpacity>

        </View>
        <View style={styles.viewpr} >


          {/* <Image source={require('../assets/social/patient.jpeg')} style={styles.imge} /> */}

          <View style={styles.verified}>
            <Text style={styles.dctr}>{patient.name} </Text>

          </View>

          <Text style={styles.title}> 21 Years Old </Text>
          <Text style={styles.reg}> Prescribe 5 Times  </Text>

        </View>

        <View style={styles.info}>
          <Text > Gender: {patient.gender}</Text>
          <Text > Date of Birth: {patient.day / patient.month / patient.year} </Text>
          <Text > Religion: {patient.religion}</Text>
          <Text> Phone: {patient.phone} </Text>
          <Text> Email: {patient.email} </Text>

          <Text> House: {patient.preadress}, {patient.prestate} ,{patient.precity}</Text>
        </View>

      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>
        <TouchableOpacity style={{ backgroundColor: '#00A746', width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 110 }}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: '#fff', fontSize: 35 }}>+</Text>
        </TouchableOpacity>
      </View>

      <PrescriptionModal closeModal={closeModal} modalVisible={modalVisible} />

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

  edit: {
    top: 30,
    left: 298,
  },

  viewpr: {
    top: 5,
    left: 110,
  },


  imge: {

    width: 100,
    height: 100,
    left: 20,
    backgroundColor: 'lightgray',
    borderRadius: 50,
    padding: 10,



  },

  verified: {
    flexDirection: 'row',
    top: 20,
  },


  icon: {
    width: 13.89,
    height: 14,
    right: 8,
    top: 5,
  },



  title: {
    fontSize: 16,
    fontWeight: '400',
    top: 25,
    left: 25,
  },

  dctr: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 21,
    textAlign: 'left',
    color: '#192608',
    width: 139,
    height: 23,
    left: 20,
  },
  reg: {
    fontWeight: '400',
    fontSize: 17,
    top: 35,
    right: 0,
  },
  info: {
    width: 332,
    height: 260,
    top: 55,
    left: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#AFD59F',

  },

  primg: {
    top: 15,
  },


  

});
export default Patientprofile; 
