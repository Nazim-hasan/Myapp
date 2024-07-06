
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { apiService } from '../src/services/api-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { USER_TOKEN } from './Signin';

const Editpatient = ({ route, navigation }) => {
  const [profilePicture, setProfilePicture] = useState('');
  const { item } = route.params;
  const dateOfBirthArray = item?.dateOfBirth.split('-');
  const dayValue = dateOfBirthArray[0];
  const monthValue = dateOfBirthArray[1];
  const yearValue = dateOfBirthArray[2];

  const [name, setName] = useState(item?.fullName);
  const [day, setDay] = useState(dayValue ?? '');
  const [month, setMonth] = useState(monthValue ?? '');
  const [year, setYear] = useState(yearValue ?? '');
  const [gender, setgender] = useState(item?.gender);
  const [religion, setReligion] = useState(item?.religion);
  const [phone, setPhone] = useState(item?.phone);
  const [email, setEmail] = useState(item?.email);
  const [preadress, setPreadress] = useState('');
  const [prestate, setPrestate] = useState(item?.presentAddress.state);
  const [precity, setPrecity] = useState(item?.presentAddress.city);
  const [preapertment, setPreapertment] = useState(item?.presentAddress.apartment);
  const [error, setError] = useState('');
  const [checked, setChecked] = useState(false);

  const [permanentAddress, setPermanentAddress] = useState('');
  const [permanentCountry, setPermanentCountry] = useState('');
  const [permanentZip, setPermanentZip] = useState('');
  const [permanentState, setPermanentState] = useState(item?.permanentAddress.state);
  const [permanentCity, setPermanentCity] = useState(item?.permanentAddress.city);
  const [permanentApertment, setPermanentApertment] = useState(item?.permanentAddress.apartment);


  const handleAddpatient = async () => {

    const token = await AsyncStorage.getItem(USER_TOKEN);
    console.log('name----', name);
    if (!name || !day
      || !month || !year || !gender || !religion || !phone || !email

    ) {
      setError('Please fill all fields and select a profile picture');
      return;
    }

    const data = {
      fullName: name,
      email: email,
      phone: phone,
      dateOfBirth: `${day}-${month}-${year}`,
      gender: gender,
      religion: religion,
      presentAddress: {
        address: preadress,
        country: "bd",
        state: prestate,
        city: precity,
        zip: "",
        apartment: preapertment
      },
      permanentAddress: {
        address: permanentAddress,
        country: "bd",
        state: permanentState,
        city: permanentCity,
        zip: permanentZip,
        apartment: permanentApertment
      }
    }

    console.log("patient data :", data, item?.id)
    try {
      await apiService.updatePatient(data, item?.id, token).then((res) => {
        console.log("update patient response ::::", res.data)
        navigation.navigate('patientdashboard');
      }).catch(err=> console.log('Catch:',err))
    } catch (err) {
      console.log("Try:",err);
      setError('Error adding doctor, please try again');
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
        // setImageUri(source.uri);
        setProfilePicture(source.uri);

      }
    });
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
                placeholder="Full name"
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
                value={gender}
                onChangeText={setgender}
                style={styles.input1}
              />

            </View>


            <View>
              <Text style={styles.name}>Phone * </Text>

              <TextInput
                value={phone}
                onChangeText={setPhone}
                style={styles.input1}
              />

            </View>

            <View>
              <Text style={styles.name}>Email * </Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input1}
              />

            </View>


            <View>
              <Text style={styles.name}>Religion * </Text>

              <TextInput
                value={religion}
                onChangeText={setReligion}
                style={styles.input1}
              />

            </View>


            <View>
              <Text style={styles.name}>Present Address  * </Text>

              <TextInput
                placeholder="Country"
                style={styles.input1}
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
              <TouchableOpacity onPress={handleAddpatient}>
                <Text style={styles.buton}>Update </Text>
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
    height: 1050,
    overflow: "hidden",
  },
  profile: {
    top: 20,
    left: '30%',
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
    fontWeight: '500',
    top: 20,
    left: 20,
    color: '#868D7E',
  },
  input1: {

    width: '92%',
    paddingLeft: 10,
    height: 52,
    top: '25%',
    left: 10,
    margin: 7,
    fontFamily: 'Poppins Regular',
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
    paddingLeft: 10,
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
    width: '95%',
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    left: 12,
    top: 52,
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins Regular',
    lineHeight: 20.8,

    padding: 12,
    paddingTop: 15,

  },

});
export default Editpatient; 