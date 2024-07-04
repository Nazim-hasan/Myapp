// import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { USER_ID, USER_TOKEN } from "./Signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiService } from "../src/services/api-service";
import ActionSheet from "react-native-actions-sheet";

const EditProfile = ({ data, onChange, navigation, route }) => {
  const { doctorInfo } = route.params;

  console.log("doctor infor at editprofile :", doctorInfo)
  const [name, setName] = useState(doctorInfo?.user?.fullName || '');
  const [medical, setMedical] = useState(doctorInfo?.doctor?.medicalName || '');
  const [degree, setDegree] = useState('');
  const [registration, setRegistration] = useState(doctorInfo.doctor.registrationNo || '');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setgender] = useState(doctorInfo.doctor.gender || '');
  const [religion, setReligion] = useState(doctorInfo.doctor.religion || '');
  const [phone, setPhone] = useState(doctorInfo.user.phone||'');
  const [email, setEmail] = useState(doctorInfo.user.email||'');
  const [preadress, setPreadress] = useState('');
  const [prestate, setPrestate] = useState('');
  const [precity, setPrecity] = useState('');
  const [preapertment, setPreapertment] = useState('');
  const [profilePicture, setProfilePicture] = useState(doctorInfo.doctor.image || null);
  const [error, setError] = useState('');

  // const pickImage = () => {
  //   const options = ['Select from Library', 'Take a Photo', 'Cancel'];
  //   const cancelButtonIndex = 2;

  //   ActionSheet(
  //     {
  //       options,
  //       cancelButtonIndex,
  //     },
  //     buttonIndex => {
  //       if (buttonIndex === 0) {
  //         launchImageLibrary({
  //           mediaType: 'photo',
  //           maxWidth: 300,
  //           maxHeight: 300,
  //           quality: 1,
  //         }, response => {
  //           handleImageResponse(response);
  //         });
  //       } else if (buttonIndex === 1) {
  //         launchCamera({
  //           mediaType: 'photo',
  //           maxWidth: 300,
  //           maxHeight: 300,
  //           quality: 1,
  //         }, response => {
  //           handleImageResponse(response);
  //         });
  //       }
  //     }
  //   );
  // };

  // const handleImageResponse = (response) => {
  //   if (response.didCancel) {
  //     console.log('User cancelled image picker');
  //   } else if (response.error) {
  //     console.log('ImagePicker Error: ', response.error);
  //   } else {
  //     const source = { uri: response.assets[0].uri };
  //     setProfilePicture(source.uri);
  //   }
  // };

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        // setImageUri(source.uri);
        setProfilePicture(source.uri);

      }
    });
  }



  const parseDate = (year, month, day) => {

    const date = new Date(year, month - 1, day);
    const formatted = date.toISOString().split('T')[0];

    return formatted;
  };

  const handleAddDoctor = async () => {

    if (!name || !medical || !degree || !profilePicture || !registration || !day
      || !month || !year || !gender || !religion || !phone || !email

    ) {
      setError('Please fill all fields and select a profile picture');
      return;
    }

    // const formData = new FormData();
    // formData.append('name', name);
    // formData.append('medical', medical);
    // formData.append('degree', degree);
    // formData.append('registration', registration);
    // formData.append('day', day);
    // formData.append('month', month);
    // formData.append('year', year);
    // formData.append('gender', gender);
    // formData.append('religion', religion);
    // formData.append('phone', phone);
    // formData.append('email', email);
    // formData.append('preadress', preadress);
    // formData.append('prestate', prestate);
    // formData.append('precity', precity);
    // formData.append('preapertment', preapertment);
    // formData.append('profilePicture', {
    //   uri: profilePicture,
    //   type: 'image/jpeg',
    //   name: 'profile.jpg',
    // });

    const data = {
      fullName: name,
      phone: phone,
      email: email,
      image: profilePicture,
      dateOfBirth: parseDate(year, month, day),
      gender: gender,
      religion: religion,
      presentAddress: {
        address: preadress,
        country: "BD",
        state: prestate,
        city: precity,
        zip: "",
        apartment: preapertment
      },
      permanentAddress: {
        address: preadress,
        country: "BD",
        state: prestate,
        city: precity,
        zip: '',
        apartment: preapertment
      }
    }

    const token = await AsyncStorage.getItem(USER_TOKEN);
    try {
      await apiService.updateDoctor(data, token).then((res) => {
        console.log("update doctor response ::::", res.data)
        // navigation.navigate('patientdashboard');
      }).catch(err => console.log('Catch update doctor error:', err))
    } catch (err) {
      console.log("Try:", err);
      setError('Error adding doctor, please try again');
    }
  };


  return (
    <>
      <ScrollView>
        <View style={styles.main}>

          <TouchableOpacity onPress={pickImage}>
            <View style={styles.profile}>

              {profilePicture ? (
                <Image source={{ uri: profilePicture }} style={styles.imge} />
              ) : (
                <View style={styles.imge} />
              )}
              <Image source={require('../assets/editprofile/camera.png')} style={styles.icon} />

            </View>
          </TouchableOpacity>


          <View style={styles.editable}>

            <View>
              <Text style={styles.name}>Full Name * </Text>

              <TextInput
                placeholder="Email or Phone"
                style={styles.input1}
                value={name}
                onChangeText={setName}
              />

            </View>


            <View>
              <Text style={styles.name}>My Medical Name * </Text>

              <TextInput

                style={styles.input1}
                value={medical}
                onChangeText={setMedical}
              />

            </View>



            <View>
              <Text style={styles.name}>Degree * </Text>

              <TextInput
                placeholder="Email or Phone"
                style={styles.input1}
                value={degree}
                onChangeText={setDegree}
              />

            </View>




            <View>
              <Text style={styles.name}>Registration NO * </Text>

              <TextInput
                placeholder="Email or Phone"
                style={styles.input1}
                value={registration}
                onChangeText={setRegistration}
              />

            </View>



            <View>
              <Text style={styles.name}>Date of Birth  * </Text>

              <View style={styles.date}>
                <TextInput
                  placeholder="Day"
                  style={styles.birth}
                  value={day}
                  onChangeText={setDay}
                />

                <TextInput
                  placeholder="Month"
                  style={styles.birth}
                  value={month}
                  onChangeText={setMonth}
                />

                <TextInput
                  placeholder="Year"
                  style={styles.birth}
                  value={year}
                  onChangeText={setYear}
                />

              </View>


            </View>


            <View>
              <Text style={styles.name}>Gender * </Text>

              <TextInput

                style={styles.input1}
                value={gender}
                onChangeText={setgender}
              />

            </View>


            <View>
              <Text style={styles.name}>Phone * </Text>

              <TextInput

                style={styles.input1}
                value={phone}
                onChangeText={setPhone}
              />

            </View>

            <View>
              <Text style={styles.name}>Email * </Text>

              <TextInput

                style={styles.input1}
                value={email}
                onChangeText={setEmail}
              />

            </View>


            <View>
              <Text style={styles.name}>Religion * </Text>

              <TextInput

                style={styles.input1}
                value={religion}
                onChangeText={setReligion}
              />

            </View>


            <View>
              <Text style={styles.name}>Present Address  * </Text>

              <TextInput
                placeholder="Country"
                style={styles.input1}
                value={preadress}
                onChangeText={setPreadress}
              />

            </View>

            <View style={styles.date}>
              <TextInput
                placeholder="State"
                style={styles.birth1}
                value={prestate}
                onChangeText={setPrestate}
              />

              <TextInput
                placeholder="City"
                style={styles.birth1}
                value={precity}
                onChangeText={setPrecity}
              />


            </View>
            <View>
              <TextInput
                placeholder="Apertment , suite etc."
                style={styles.input1}
                value={preapertment}
                onChangeText={setPreapertment}
              />
            </View>

            <View>
              <TouchableOpacity onPress={() => {
                // navigation.navigate("profile")
                handleAddDoctor()
              }}
              >
                <Text style={styles.buton}>Update Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    </>

  );




};

const styles = StyleSheet.create({

  main: {
    backgroundColor: 'white',
    flex: 1,
    width: "100%",
    height: 1250,
    overflow: "hidden",
  },
  profile: {
    top: 20,
    left: 90,
  },
  imge: {
    width: 100,
    height: 100,
    left: 20,
    backgroundColor: 'lightgray',

    borderRadius: 50,
    padding: 10,



  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 12,
    alignSelf: 'center',
  },
  icon: {
    top: -35,
    left: 95,
  },

  name: {
    fontSize: 14,
    fontWeight: '500',
    top: 20,
    left: 20,
    color: '#868D7E',
  },
  input1: {

    width: 322,
    height: 52,
    top: '25%',
    left: 10,
    margin: 7,
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 26,
    letterSpacing: 0,
    textAlign: 'left',
    borderWidth: 1,
    borderColor: '#AFD59F',
    borderRadius: 6,

  },

  date: {
    flexDirection: 'row',

  },

  birth: {

    width: 100,
    height: 52,
    top: '6%',
    left: 9,
    margin: 7,
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 26,
    letterSpacing: 0,
    textAlign: 'left',
    borderWidth: 1,
    borderColor: '#AFD59F',
    borderRadius: 6,

  },
  birth1: {


    width: 155,
    height: 52,
    top: '6%',
    left: 9,
    margin: 7,
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 26,
    letterSpacing: 0,
    textAlign: 'left',
    borderWidth: 1,
    borderColor: '#AFD59F',
    borderRadius: 6,



  },

  buton: {
    height: 52,
    width: 332,
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    left: 12,
    top: 50,
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins',
    lineHeight: 20.8,

    padding: 12,

  },

});
export default EditProfile; 