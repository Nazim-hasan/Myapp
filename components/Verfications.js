import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import axios from 'axios';
import {apiService} from '../src/services/api-service';

const Verifications = ({navigation, route, props}) => {
  // const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const {email} = route.params;

  const handleVerifyOTP = async () => {
    try {
      await apiService.verifyOTP({email: email, otp: otp}).then(() => {
        navigation.navigate('Signin');
      });
    } catch (err) {
      setError('Invalid OTP, please try again');
    }
  };

  // my code

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const focusNextInput = index => {
    if (index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const focusPreviousInput = index => {
    if (index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '') {
      focusNextInput(index);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      focusPreviousInput(index);
    }
  };

  const handleSubmit = async () => {
    try {
      const finalOtp = otp.join('').toString();
      console.log('Entered OTP:', finalOtp);
      console.log('Entered email:', email, typeof finalOtp);
      await apiService
        .verifyOTP({email: email, otp: finalOtp})
        .then(() => {
          navigation.navigate('signin');
        })
        .catch(err => console.log('otp submit immediate block :', err));
    } catch (err) {
      console.log('otp submit error :', err);
      setError('Invalid OTP, please try again');
    }
  };

  return (
    <>
      <View style={styles.main}>
        <View
          style={{
            flex: 0.8,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.verify}>Verifications </Text>
        </View>

        <View
          style={{
            flex: 3,
            marginTop: 20,
            paddingHorizontal: 20,
          }}>
          <Text style={styles.head}>
            Please enter the 4-digit code in the email we just
          </Text>
          <Text style={styles.head}>
          sent to {email}
          </Text>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
            }}>
            {/* <Text style={styles.title}>Enter OTP</Text> */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  value={digit}
                  onChangeText={value => handleChange(value, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  style={styles.input}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={ref => (inputs.current[index] = ref)}
                />
              ))}
            </View>
          </View>

          <View style={styles.lstext}>
            <Text style={styles.txt}>Not you? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('create')}>
              <Text style={styles.email}>Change email/phone</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginVertical: 20,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.buton} onPress={handleSubmit}>
              <Text style={[styles.txt, {color: '#fff'}]}>Next</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity style={styles.butonResend}>
              <Text style={[styles.txt, {color: '#5B6550'}]}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  verify: {
    fontFamily: 'Poppins Medium',
    fontSize: 24,
    color: '#192608',
    lineHeight: 31,
    letterSpacing: 0.05,
  },

  head: {
    fontSize: 13,
    lineHeight: 21,
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'Poppins Medium',
  },
  code: {
    width: 342,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#fff',
    elevation: 10,
    top: 75,
    left: 10,
    flexDirection: 'row',
  },

  line: {
    width: 70,
    height: 40,
    borderColor: '#4F4F4F',
    borderBottomWidth: 1,
    margin: 6,
    top: 50,
    fontSize: 14,
  },

  lstext: {
    marginTop: 8,
    flexDirection: 'row',
  },
  txt: {
    fontFamily: 'Poppins Regular',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.05,
    textAlign: 'center',
  },
  email: {
    fontFamily: 'Poppins Regular',
    fontSize: 13,
    color: '#AFD59F',
  },
  btn: {
    marginTop: 50,
    flexDirection: 'colum',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  buton: {
    height: 50,
    width: '90%',
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    padding: 12,
    justifyContent: 'center',
  },
  butonResend: {
    height: 50,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    justifyContent: 'center',
    borderColor: '#6BB64A',
    borderWidth: 0.6,
  },

  buton1: {
    height: 52,
    width: 332,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 14,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins',
    lineHeight: 20.8,
    padding: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 0.2,
    borderRadius: 6,
    borderColor: '#8d8d8d',
  },
  input: {
    width: 50,
    height: 50,
    borderBottomWidth: 1.5,
    borderColor: '#ced4da',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 30,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
});

export default Verifications;
