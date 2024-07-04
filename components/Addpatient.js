import { CheckBox } from '@rneui/base';
import axios from 'axios';
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { apiService } from '../src/services/api-service';
import { USER_ID, USER_TOKEN } from './Signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



const Addpatient = (props) => {

  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setgender] = useState('Male');
  const [religion, setReligion] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preadress, setPreadress] = useState('');
  const [prestate, setPrestate] = useState('');
  const [precity, setPrecity] = useState('');
  const [preapertment, setPreapertment] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [checked, setChecked] = useState(false);

  const [permanentAddress, setPermanentAddress] = useState('');
  const [permanentCountry, setPermanentCountry] = useState('');
  const [permanentZip, setPermanentZip] = useState('');
  const [permanentState, setPermanentState] = useState('');
  const [permanentCity, setPermanentCity] = useState('');
  const [permanentApertment, setPermanentApertment] = useState('');

  const navigation = useNavigation();
  const handleAddpatient = async () => {

    const tokenId = await AsyncStorage.getItem(USER_TOKEN);

    if (!name || !day
      || !month || !year || !gender || !religion || !phone || !email

    ) {
      setError('Please fill all fields and select a profile picture');
      return;
    }

    const data = {
      // userId: userId,
      // doctorId: userId,
      image: profilePicture,
      fullName: name,
      email: email,
      phone: phone,
      dateOfBirth: `${day}-${month}-${year}`,
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
        address: permanentAddress,
        country: permanentCountry ? permanentCountry : "BD",
        state: permanentState,
        city: permanentCity,
        zip: permanentZip,
        apartment: permanentApertment
      }
    }

    try {
      await apiService.addPatient(data, tokenId).then((res) => {
        console.log("add patient response ::::", res.data)
        navigation.navigate('patientdashboard');
      }).catch(err => console.log("error occur while adding patient:", err.response.data))
    } catch (err) {
      console.log("Error adding patient, please try again", err);
      setError('Error adding patient, please try again');
    }
  };


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
        console.log("image :", source)
        // setImageUri(source.uri);
        setProfilePicture(source.uri);

      }
    });
  }


  const togglePermanentAddress = () => {
    setChecked(!checked);
    if (checked) {
      setPermanentCountry("BD")
      setPermanentAddress(preadress);
      setPermanentCity(precity);
      setPermanentState(prestate);
      setPermanentZip(permanentZip);
      setPermanentApertment(preapertment);
    } else {
      setPermanentAddress('');
      setPermanentCity('');
      setPermanentState('');
      setPermanentZip('');
      setPermanentApertment('');
    }
  }

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

            {/* parmanent address */}

            <View style={{ marginTop: 30, }}>
              <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                <Text>Permanent Address* </Text>

                <TouchableOpacity
                  style={{ flexDirection: 'row', paddingRight: 20 }}
                  onPress={() => togglePermanentAddress()}
                >
                  <View style={[styles.checkbox, checked && styles.checked]}>
                    {checked && <Text style={styles.checkmark}>✔</Text>}
                  </View>
                  <Text style={styles.label}>Same As</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ display: checked ? 'none' : 'flex' }}>
              <View >
                <TextInput
                  placeholder="Country"
                  style={styles.input1}
                  value={permanentCountry}
                  onChangeText={setPermanentCountry}
                  editable={checked ? false : true}
                />
              </View>

              <View style={styles.date}>
                <TextInput
                  placeholder="State"
                  style={styles.birth1}
                  value={permanentState}
                  onChangeText={setPermanentState}
                  editable={checked ? false : true}
                />

                <TextInput
                  placeholder="City"
                  style={styles.birth1}
                  value={permanentCity}
                  onChangeText={setPermanentCity}
                  editable={checked ? false : true}
                />


              </View>
              <View>
                <TextInput
                  placeholder="Apertment , suite etc."
                  style={styles.input1}
                  value={permanentApertment}
                  onChangeText={setPermanentApertment}
                  editable={checked ? false : true}
                />
              </View>
            </View>

            <View>
              <TouchableOpacity onPress={handleAddpatient}>
                <Text style={styles.buton}>Next</Text>
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

  ///

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#ebebeb',
  },
  checkmark: {
    color: '#000',
    fontSize: 14,
  },
  label: {
    marginLeft: 2,
    fontSize: 14,
  },

});
export default Addpatient; 