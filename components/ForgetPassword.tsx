import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {EmailIcon} from '../assets/svg/email';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { apiService } from '../src/services/api-service';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const {navigate} = useNavigation();

  const [isOTPSend, setIsOTPSend] = useState(false);

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const sendOTP = async () => {
    await apiService.forgotPassword({
      email
    }).then((res) => {
      console.log('res', res)
      Toast.show({
        type: 'success',
        text1: 'OTP Send Successfully, Please Check Your Email',
      });
      setIsOTPSend(true);
    }).catch((err) => {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'This Email is not registered',
      });
    }
    );
  };

  const verifyOTP = async () => {
    await apiService.forgotPasswordVerifyOTP ({
      email,
      otp: otp.join('')
    }).then((res) => {
      console.log('res', res)
      Toast.show({
        type: 'success',
        text1: 'Password Reset Successfully, Please Login',
      });
      setIsOTPSend(true);
      navigate('changePassword', {
        token: res.data.token,
      });
    }).catch((err) => {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'OTP is not correct',
      });
    });
  }

  const handleSendOTPEmail = () => {
    if (!isOTPSend) {
      if (email.length > 5) {
        sendOTP();
      }
    } else {
      verifyOTP();
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
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      focusPreviousInput(index);
    }
  };

  return (
    <View style={styles.main}>
      <View
        style={{
          flex: 0.8,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Text style={styles.welcome}>Forget Password! </Text>
      </View>
      <View
        style={{
          flex: 3,
          marginTop: 20,
          paddingHorizontal: 20,
        }}>
        <View style={styles.inputContainer}>
          <EmailIcon />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.inputStyles}
            keyboardType="email-address"
          />
        </View>
        {isOTPSend && (
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
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <TouchableOpacity style={styles.buton} onPress={handleSendOTPEmail}>
          <Text style={[styles.txt, {color: '#fff'}]}>
            {isOTPSend ? `Verify` : `Send OTP`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  welcome: {
    fontFamily: 'Poppins Medium',
    fontSize: 24,
    color: '#192608',
    lineHeight: 31,
    letterSpacing: 0.05,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#AFD59F',
    borderRadius: 6,
    marginTop: 7,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  inputStyles: {
    fontFamily: 'Poppins Regular',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 26,
    letterSpacing: 0,
    width: '87%',
    marginLeft: 5,
  },
  txt: {
    fontFamily: 'Poppins Regular',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.05,
    textAlign: 'center',
  },
  buton: {
    height: 50,
    width: '90%',
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    padding: 12,
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
    marginTop: 20,
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
});
