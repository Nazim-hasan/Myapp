import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import axios from 'axios';
import { apiService } from "../src/services/api-service";

const Verifications = ({ navigation, route, props }) => {

  // const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const { email } = route.params;

  const handleVerifyOTP = async () => {
    try {
      await apiService.verifyOTP({ email: email, otp: otp }).then(() => {
        navigation.navigate('Signin');
      })
    } catch (err) {
      setError('Invalid OTP, please try again');
    }
  };

  // my code

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const focusNextInput = (index) => {
    if (index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const focusPreviousInput = (index) => {
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
      await apiService.verifyOTP({ email: email, otp: finalOtp}).then(() => {
        navigation.navigate('signin');
      }).catch(err => console.log("otp submit immediate block :", err))
    } catch (err) {
      console.log("otp submit error :", err)
      setError('Invalid OTP, please try again');
    }
  };

  return (
    <>
      <View style={styles.main}>
        <Text style={styles.verify}> Verifications </Text>

        <Text style={styles.head}>Please enter the 4-digit code in the email we just sent to ariful.uxd@gmail.com  </Text>

        {/* <View style={styles.code}>

          <TextInput style={styles.line} value={otp}
            onChangeText={setOtp} />
          <TextInput style={styles.line} />
          <TextInput style={styles.line} />
          <TextInput style={styles.line} />

          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View> */}

        {/* new otp design */}
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
          <Text style={styles.title}>Enter OTP</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                value={digit}
                onChangeText={(value) => handleChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                style={styles.input}
                keyboardType="number-pad"
                maxLength={1}
                ref={(ref) => inputs.current[index] = ref}
              />
            ))}
          </View>
        </View>
        {/* new otp design */}

        <View style={styles.lstext}>
          <Text style={styles.txt}>Not you?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("create")}>
            <Text style={styles.email}>Change email/phone</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity onPress={handleSubmit} >
            <Text style={styles.buton}>Next </Text>
          </TouchableOpacity>

          <TouchableOpacity  >
            <Text style={styles.buton1}> Resend code </Text>
          </TouchableOpacity>
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
    // height: 920,
    overflow: "hidden",
  },
  verify: {
    width: '100%',
    fontFamily: 'poppins',
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    lineHeight: 31,
    letterSpacing: 0.05,
    textAlign: 'center',
    marginTop: 100
  },

  head: {

    fontSize: 13,
    lineHeight: 21,
    textAlign: 'center',
    fontWeight: '400',
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
    justifyContent: 'center'
  },
  txt: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.05,
    textAlign: 'center',

  },
  email: {
    color: '#AFD59F',
  },
  btn: {
    marginTop: 50,
    flexDirection: 'colum',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
  buton: {
    height: 52,
    width: 332,
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins',
    lineHeight: 20.8,
    padding: 12,

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
    width: '80%',
  },
  input: {
    width: 40,
    height: 50,
    borderWidth: 1,
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