import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {apiService} from '../src/services/api-service';
import PersonIcon from '../assets/svg/person';
import {EmailIcon} from '../assets/svg/email';
import {LockIcon} from '../assets/svg/lock';
import PhoneIcon from '../assets/svg/phone';
import GoogleIcon from '../assets/svg/google';
import FacebookIcon from '../assets/svg/facebook';
import AppleIcon from '../assets/svg/apple';
import EyeSlashIcon from '../assets/svg/eye';

const Createacount = props => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const [error, setError] = useState('');

  const handleSecureText = () => {
    setSecureText(prev => !prev);
  };

  // const handleSignUp = async () => {
  //   try {
  //     const user = {
  //       fullName: name,
  //       email: email,
  //       password: password,
  //       phone: phone
  //     }
  //     console.log("user before create accont:",user)
  //     await apiService.signup(user).then((res) => {
  //       console.log("signup success",res)
  //       navigation.navigate('verify', { email });
  //     }).catch((err) => {
  //       console.log("error while signing up (after then) :", err)
  //     });
  //   } catch (err) {
  //     console.log("error while signing up :", err);
  //   }
  // };

  const handleSignUp = async () => {
    try {
      const user = {
        fullName: name,
        email: email,
        password: password,
        phone: phone,
      };
      console.log('user before create accont:', user);
      await apiService
        .signup(user)
        .then(res => {
          console.log('signup success', res);
          navigation.navigate('verify', {email});
        })
        .catch(err => {
          console.log('error while signing up (after then) :', err);
        });
    } catch (err) {
      console.log('error while signing up :', err);
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
          <Text style={styles.create}>Create Account</Text>
        </View>

        <View
          style={{
            flex: 3,
            marginTop: 20,
            paddingHorizontal: 20,
          }}>
          <View style={styles.inputContainer}>
            <PersonIcon />
            <TextInput
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              style={styles.inputStyles}
            />
          </View>
          <View style={styles.inputContainer}>
            <EmailIcon />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.inputStyles}
            />
          </View>
          <View style={styles.inputContainer}>
            <PhoneIcon />
            <TextInput
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              style={styles.inputStyles}
            />
          </View>
          <View style={styles.inputContainer}>
            <LockIcon />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.inputStyles}
              secureTextEntry={secureText}
            />
            <Pressable onPress={handleSecureText}>
              <EyeSlashIcon />
            </Pressable>
          </View>

          <View
            style={{
              // backgroundColor: 'red',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginTop: 70,
            }}>
            <View>
              <View
                style={{
                  borderWidth: 0.2,
                  borderColor: '#8DC63F',
                  width: 80,
                }}
              />
            </View>
            <Text style={styles.cont}>Or Continue with</Text>
            <View>
              <View
                style={{
                  borderWidth: 0.2,
                  borderColor: '#8DC63F',
                  width: 80,
                }}
              />
            </View>
          </View>

          <View style={{paddingHorizontal: '20%', marginTop: 10}}>
            <View style={styles.social}>
              <View style={styles.rect}>
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: 12,
                  }}>
                  <GoogleIcon />
                </View>
              </View>
              <View style={styles.rect}>
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: 12,
                  }}>
                  <FacebookIcon />
                </View>
              </View>
              <View style={styles.rect}>
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: 12,
                  }}>
                  <AppleIcon />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity style={styles.buton} onPress={handleSignUp}>
            <Text style={[styles.txt, {color: '#fff'}]}>Create Account</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <Text style={[styles.txt, {color: '#212121'}]}>
            Already have an account ?
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('signin')}>
            <Text style={[styles.txt, {color: '#6BB64A'}]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  create: {
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

  input1: {
    width: 322,
    height: 52,
    top: '13%',
    left: 13,
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
  cont: {
    fontFamily: 'Poppins Regular',
    color: '#6A6A6A',
    fontSize: 13,
    lineHeight: 21,
    letterSpacing: 0.05,
    textAlign: 'center',
  },

  social: {
    flexDirection: 'row',
  },

  rect: {
    width: 52,
    height: 52,
    borderRadius: 50,
    borderWidth: 0.6,
    backgroundColor: 'none',
    borderColor: '#9DA296',
    margin: 13,
  },

  buton: {
    height: 50,
    width: '90%',
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    padding: 12,
  },

  lstext: {
    flexDirection: 'row',
    left: 70,
  },
  txt: {
    fontFamily: 'Poppins Regular',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.05,
    textAlign: 'center',
  },
  sign: {
    color: '#AFD59F',
  },
});

export default Createacount;
