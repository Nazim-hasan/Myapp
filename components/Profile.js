import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const Profile = (props) => {
  const [doctors, setDoctors] = useState({});

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors', error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <>
      <View style={styles.main}>
        <View>
          <TouchableOpacity onPress={() => props.navigation.navigate("editprofile")}>
            <Image source={require('../assets/drprofile/edit.png')} style={styles.edit} />
          </TouchableOpacity>

        </View>
        <View style={styles.viewpr} >


          <Image style={styles.imge} />

          <View style={styles.verified}>
            <Text style={styles.dctr}>{doctors.name}</Text>
            <Image source={require('../assets/dashboard/check.png')} style={styles.icon} />
          </View>

          <Text style={styles.title}> {doctors.degree}</Text>
          <Text style={styles.reg}> {doctors.registration} </Text>




        </View>

        <View style={styles.info}>

          <Text > {doctors.medical}</Text>
          <Text > {doctors.phone} </Text>
          <Text > {doctors.preadress}</Text>
          <Text> {doctors.precity} </Text>

        </View>

      </View>
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
    top: 20,
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
    fontWeight: '600',
    lineHeight: 21,
    textAlign: 'left',
    color: ' #192608',
    width: 139,
    height: 23,

  },
  reg: {
    fontWeight: '400',
    fontSize: 16,
    top: 35,
    right: 18,
  },
  info: {
    width: 332,
    height: 180,
    top: 95,
    left: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#AFD59F',

  },

  primg: {
    top: 15,
  },
});
export default Profile; 
