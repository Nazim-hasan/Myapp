import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SelectList} from 'react-native-dropdown-select-list';
import {USER_TOKEN} from './Signin';
import {apiService} from '../src/services/api-service';
import CameraIcon from '../assets/svg/camera';
import PhoneInput from 'react-native-phone-number-input';

const EditProfile = ({navigation, route}) => {
  const {doctorInfo = {}} = route.params;
  const [formData, setFormData] = useState({
    name: doctorInfo?.user?.fullName || '',
    medical: doctorInfo?.doctor?.medicalName || '',
    degree: '',
    registration: doctorInfo?.doctor?.registrationNo || '',
    day: '',
    month: '',
    year: '',
    gender: doctorInfo?.doctor?.gender || '',
    religion: doctorInfo?.doctor?.religion || '',
    phone: doctorInfo?.user?.phone || '',
    email: doctorInfo?.user?.email || '',
    address: '',
    state: '',
    city: '',
    apartment: '',
    profilePicture: doctorInfo?.doctor?.image || null,
  });

  const phoneInput = useRef(null);
  const [phone, setPhone] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    getDoctor();
  }, []);

  const getDoctor = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await apiService.getDoctor(token);
      console.log('Doctor data:', response.data.user);
    } catch (err) {
      console.log('Failed to get doctor:', err.response?.data || err.message);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prevState => ({...prevState, [field]: value}));
  };

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
        console.log('ImagePicker Error:', response.error);
      } else if (response.assets && response.assets[0]) {
        handleInputChange('profilePicture', response.assets[0].uri);
      }
    });
  };


  function parseDate(year, month, day) {
    console.log('year', year)
    console.log('month', month)
    console.log('day', day)
    
    // Adjust the month because JavaScript's Date object uses 0-based months
    const adjustedMonth = month - 1;
  
    // Return the new Date object
    return new Date(year, adjustedMonth, day);
  }

  const handleUpdateProfile = async () => {
    const requiredFields = [
      'name',
      'medical',
      'degree',
      'registration',
      'day',
      'month',
      'year',
      'gender',
      'religion',
      'email',
      'profilePicture',
    ];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      setError(`Please fill all required fields: ${missingFields.join(', ')}`);
      return;
    }

    const date = parseDate(formData.year, formData.month, formData.day);
    console.log('date', formData.year, formData.month, formData.day, date)

    const data = {
      fullName: formData.name,
      phone: phone,
      email: formData.email,
      image: formData.profilePicture,
      dateOfBirth: date,
      gender: formData.gender,
      religion: formData.religion,
      medicalName: formData.medical,
      degrees: [formData.degree],
      registrationNo: formData.registration,
      presentAddress: {
        address: formData.address,
        country: 'BD',
        state: formData.state,
        city: formData.city,
        zip: '',
        apartment: formData.apartment,
      },
      permanentAddress: {
        address: formData.address,
        country: 'BD',
        state: formData.state,
        city: formData.city,
        zip: '',
        apartment: formData.apartment,
      },
    };

    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await apiService.updateDoctor(data, token);
      console.log('Update doctor response:', response.data);
      Alert.alert('Success', 'Profile updated successfully');
      navigation.navigate('dashboard');
    } catch (err) {
      console.log('Update doctor error:', err);
      setError('Error updating profile. Please try again.');
    }
  };

  const renderInputField = (label, field) => (
    <View>
      <TextInput
        style={styles.input}
        value={formData[field]}
        onChangeText={value => handleInputChange(field, value)}
        placeholder={label}
      />
    </View>
  );

  const renderSelectList = (label, field, data) => (
    <View>
      <SelectList
        setSelected={val => handleInputChange(field, val)}
        data={data}
        save="value"
        search={false}
        boxStyles={styles.selectBox}
        inputStyles={styles.selectInput}
        dropdownStyles={styles.selectBox}
        dropdownTextStyles={styles.selectInput}
        placeholder={label}
      />
    </View>
  );

  const divisions = [
    {key: '1', value: 'Dhaka'},
    {key: '2', value: 'Chittagong'},
    {key: '3', value: 'Rajshahi'},
    {key: '4', value: 'Khulna'},
    {key: '5', value: 'Barisal'},
    {key: '6', value: 'Sylhet'},
    {key: '7', value: 'Rangpur'},
    {key: '8', value: 'Mymensingh'},
  ];

  const cities = [
    {key: '1', value: 'Dhaka'},
    {key: '2', value: 'Chittagong'},
    {key: '3', value: 'Khulna'},
    {key: '4', value: 'Rajshahi'},
    {key: '5', value: 'Sylhet'},
    {key: '6', value: 'Barisal'},
    {key: '7', value: 'Rangpur'},
    {key: '8', value: 'Mymensingh'},
    {key: '9', value: 'Comilla'},
    {key: '10', value: 'Narayanganj'},
    {key: '11', value: 'Gazipur'},
  ];

  const fullDate = [
    {
      key: 'day',
      value: Array.from({length: 31}, (_, index) => ({
        key: index + 1,
        value: String(index + 1).padStart(2, '0'),
      })),
    },
    {
      key: 'month',
      value: [
        {key: 1, value: 'January'},
        {key: 2, value: 'February'},
        {key: 3, value: 'March'},
        {key: 4, value: 'April'},
        {key: 5, value: 'May'},
        {key: 6, value: 'June'},
        {key: 7, value: 'July'},
        {key: 8, value: 'August'},
        {key: 9, value: 'September'},
        {key: 10, value: 'October'},
        {key: 11, value: 'November'},
        {key: 12, value: 'December'},
      ],
    },
    {
      key: 'year',
      value: Array.from({length: 41}, (_, index) => ({
        key: index + 1,
        value: (1970 + index).toString(),
      })),
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
      <View style={styles.container}>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={pickImage}>
            {formData.profilePicture ? (
              <Image
                source={{uri: formData.profilePicture}}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImagePlaceholder} />
            )}
            <View style={styles.cameraIconContainer}>
              <CameraIcon />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          {renderInputField('Full Name *', 'name')}
          {renderInputField('Medical Name *', 'medical')}
          {renderInputField('Degree *', 'degree')}
          {renderInputField('Registration NO *', 'registration')}

          <Text style={styles.label}>Date of Birth *</Text>
          <View style={styles.dateContainer}>
            {fullDate.map(item => (
              <View
                style={{
                  width: '30%',
                }}>
                {renderSelectList(item.key, item.key, item.value)}
              </View>
            ))}
          </View>

          {renderSelectList('Gender *', 'gender', [
            {key: '1', value: 'Male'},
            {key: '2', value: 'Female'},
          ])}
          <PhoneInput
            ref={phoneInput}
            defaultValue={phone}
            defaultCode="BD"
            layout="first"
            onChangeText={text => {
              setPhone(text);
            }}
            containerStyle={{
              width: '100%',
              borderWidth: 1,
              borderColor: '#AFD59F',
              borderRadius: 6,
              height: 52,
            }}
            textInputStyle={{
              height: 52,
              fontFamily: 'Poppins Regular',
              fontSize: 14,
              color: '#454F37',
            }}
            codeTextStyle={{
              fontFamily: 'Poppins Regular',
              fontSize: 15,
              color: '#454F37',
              marginTop: -6
            }}
            textContainerStyle={{
              height: 48,
              backgroundColor: '#fff',
            }}
          />
          {renderInputField('Email *', 'email')}

          {renderSelectList('Religion *', 'religion', [
            {key: '1', value: 'Islam'},
            {key: '2', value: 'Hindu'},
            {key: '3', value: 'Buddhist'},
            {key: '4', value: 'Christian'},
            {key: '5', value: 'Others'},
          ])}

          {renderSelectList('Present Address *', 'address', [
            {key: '1', value: 'Bangladesh'},
          ])}

          <View style={styles.rowContainer}>
            {renderSelectList('State', 'state', divisions)}
            {renderSelectList('City', 'city', cities)}
          </View>

          {renderInputField('Apartment, suite etc.', 'apartment')}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdateProfile}>
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'lightgray',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: -3,
    right: 0,
    left: 65,
  },
  form: {
    gap: 15,
  },
  label: {
    fontFamily: 'Poppins Regular',
    fontSize: 14,
    color: '#868D7E',
    marginBottom: 5,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#AFD59F',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontFamily: 'Poppins Regular',
    fontSize: 14,
    color: '#454F37',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    width: '30%',
    height: 52,
    borderWidth: 1,
    borderColor: '#AFD59F',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontFamily: 'Poppins Regular',
    fontSize: 14,
    color: '#454F37',
  },
  selectBox: {
    borderColor: '#AFD59F',
    borderRadius: 6,
  },
  selectInput: {
    fontFamily: 'Poppins Regular',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    padding: 15,
    alignItems: 'center',
  },
  updateButtonText: {
    fontFamily: 'Poppins Regular',
    fontSize: 16,
    color: '#fff',
  },
});

export default EditProfile;
