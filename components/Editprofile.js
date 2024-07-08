// import * as ImagePicker from 'expo-image-picker';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {USER_ID, USER_TOKEN} from './Signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiService} from '../src/services/api-service';
import ActionSheet from 'react-native-actions-sheet';
import CameraIcon from '../assets/svg/camera';
import { set } from 'date-fns';

const EditProfile = ({data, onChange, navigation, route}) => {
  const {doctorInfo = {}} = route.params;
  const [name, setName] = useState(doctorInfo?.user?.fullName || '');
  const [medical, setMedical] = useState(doctorInfo?.doctor?.medicalName || '');
  const [degree, setDegree] = useState('');
  const [registration, setRegistration] = useState(
    doctorInfo?.doctor?.registrationNo || '',
  );
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setgender] = useState(doctorInfo?.doctor?.gender || '');
  const [religion, setReligion] = useState(doctorInfo?.doctor?.religion || '');
  const [phone, setPhone] = useState(doctorInfo?.user?.phone || '');
  const [email, setEmail] = useState(doctorInfo?.user?.email || '');
  const [preadress, setPreadress] = useState('');
  const [prestate, setPrestate] = useState('');
  const [precity, setPrecity] = useState('');
  const [preapertment, setPreapertment] = useState('');
  const [profilePicture, setProfilePicture] = useState(
    doctorInfo?.doctor?.image || null,
  );
  const [doctors, setDoctors] = useState({});
  const [error, setError] = useState('');

  const getDoc = async () => {
    const id = await AsyncStorage.getItem(USER_ID);
    const token = await AsyncStorage.getItem(USER_TOKEN);
    await apiService
      .getDoctor(token)
      .then(res => {
        console.log('res.data.user', res.data)
        setDoctors(res.data.user);
      })
      .catch(err => console.log('get doctor fail:', err.response.data));
  };

  useEffect(() => {
    getDoc();
    
  }, [doctorInfo]);


  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        // setImageUri(source.uri);
        setProfilePicture(source.uri);
      }
    });
  };

  const parseDate = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    const formatted = date.toISOString().split('T')[0];

    return formatted;
  };

  const handleAddDoctor = async () => {
    console.log('I hit')
    if (
      !name ||
      !medical ||
      !degree ||
      !profilePicture ||
      !registration ||
      !day ||
      !month ||
      !year ||
      !gender ||
      !religion ||
      !phone ||
      !email
    ) {
      setError('Please fill all fields and select a profile picture');
      return;
    }


    const data = {
      fullName: name,
      phone: phone,
      email: email,
      image: profilePicture,
      dateOfBirth: parseDate(year, month, day),
      gender: gender,
      religion: religion,
      medicalName: medical,
      degrees: [
        degree
      ],
      registrationNo: registration,
      presentAddress: {
        address: preadress,
        country: 'BD',
        state: prestate,
        city: precity,
        zip: '',
        apartment: preapertment,
      },
      permanentAddress: {
        address: preadress,
        country: 'BD',
        state: prestate,
        city: precity,
        zip: '',
        apartment: preapertment,
      },
    };

    console.log('data', data)

    const token = await AsyncStorage.getItem(USER_TOKEN);
    try {
      await apiService
        .updateDoctor(data, token)
        .then(res => {
          console.log('update doctor response ::::', res.data);
          navigation.navigate('dashboard');
        })
    } catch (err) {
      console.log('Try:', err);
      setError('Error adding doctor, please try again');
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <View style={styles.main}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.profile}>
              {profilePicture ? (
                <Image source={{uri: profilePicture}} style={styles.imge} />
              ) : (
                <View style={styles.imge} />
              )}
              <View
                style={{
                  position: 'absolute',
                  bottom: 1,
                  left: '60%',
                }}>
                <CameraIcon />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.editable}>
            <View>
              <Text style={styles.name}>Full Name * </Text>

              <TextInput
                placeholder="Name"
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
                placeholder="Degree"
                style={styles.input1}
                value={degree}
                onChangeText={setDegree}
              />
            </View>

            <View>
              <Text style={styles.name}>Registration NO * </Text>

              <TextInput
                placeholder="Registration No"
                style={styles.input1}
                value={registration}
                onChangeText={setRegistration}
              />
            </View>

            <View>
              <Text style={styles.name}>Date of Birth * </Text>

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
              <Text style={styles.name}>Present Address * </Text>

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
            
            <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 15,
              }}>
              <TouchableOpacity style={styles.buton} onPress={handleAddDoctor}>
                <Text style={[styles.txt, {color: '#fff'}]}>
                  Update Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  editable: {
    marginVertical: 20,
  },
  inputContainer: {
    marginVertical: 5,
  },
  main: {
    flex: 1,
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: -40,
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
    fontFamily: 'Poppins Regular',
    fontSize: 14,
    marginLeft: 20,
    color: '#868D7E',
  },
  input1: {
    width: '90%',
    height: 52,
    paddingLeft: 10,
    left: 10,
    margin: 7,
    fontFamily: 'Poppins Regular',
    color: '#454F37',
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
    width: '28%',
    height: 52,
    left: 9,
    margin: 7,
    fontFamily: 'Poppins Regular',
    paddingLeft: 10,
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
    width: '43%',
    height: 52,
    left: 9,
    margin: 7,
    fontFamily: 'Poppins Regular',
    paddingLeft: 10,
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
    height: 50,
    width: '90%',
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    padding: 12,
  },

  txt: {
    fontFamily: 'Poppins Regular',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.05,
    textAlign: 'center',
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
    fontFamily: 'Poppins Regular',
  },
});
export default EditProfile;
