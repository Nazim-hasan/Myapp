import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {apiService} from '../src/services/api-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData} from '../src/utils/localSgorage';
import {EmailIcon} from '../assets/svg/email';
import {LockIcon} from '../assets/svg/lock';
import CheckBox from '@react-native-community/checkbox';
import {Image} from '@rneui/base';
import GoogleIcon from '../assets/svg/google';
import FacebookIcon from '../assets/svg/facebook';
import AppleIcon from '../assets/svg/apple';
import EyeSlashIcon from '../assets/svg/eye';

export const USER_ID = '@user_id';
export const USER_TOKEN = '@user_token';

const Signin = ({navigation, props}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(true);

  const [secureText, setSecureText] = useState(true);
  const handleSecureText = () => {
    setSecureText(prev => !prev);
  };

  useEffect(() => {
    const getToken = async () => {
      let tokn = await getData(USER_TOKEN);
      console.log('token at useEffect :', tokn);
      if (tokn) {
        navigation.reset({
          index: 0,
          routes: [
            {
              // @ts-ignore
              name: 'dashboard',
            },
          ],
        });
      }
    };
    getToken();
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const formData = {
        email: email,
        password: password,
      };

      await apiService
        .signin(formData)
        .then(async res => {
          console.log('login success');
          await AsyncStorage.setItem(USER_ID, res.data.data.id);
          await AsyncStorage.setItem(USER_TOKEN, res.data.token);
          setLoading(false);
          navigation.reset({
            index: 0,
            routes: [
              {
                // @ts-ignore
                name: 'dashboard',
              },
            ],
          });
        })
        .catch(err => {
          setLoading(false);
          console.log('error in login :', err);
        });
    } catch (err) {
      setLoading(false);
      console.log('error in login at try-catch:', err);
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
          <Text style={styles.welcome}>Welcome Back! </Text>
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
              placeholder="Email / Phone"
              value={email}
              onChangeText={setEmail}
              style={styles.inputStyles}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <LockIcon />

            <TextInput
              placeholder="Password"
              style={styles.inputStyles}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureText}
            />
            <Pressable onPress={handleSecureText}>
              <EyeSlashIcon />
            </Pressable>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
                tintColors={{true: '#6BB64A', false: '#6BB64A'}}
              />

              <Text
                style={{
                  fontFamily: 'Poppins Regular',
                  color: '#4F4F4F',
                  fontSize: 13,
                }}>
                Remember me
              </Text>
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#6BB64A',
                  fontFamily: 'Poppins Regular',
                  fontSize: 13,
                }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
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
          <TouchableOpacity style={styles.buton} onPress={handleSignIn}>
            {loading ? (
              <Text style={[styles.txt, {color: '#fff'}]}>Signing in...</Text>
            ) : (
              <Text style={[styles.txt, {color: '#fff'}]}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <Text style={[styles.txt, {color: '#212121'}]}>
            Do you have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('create')}>
            <Text style={[styles.txt, {color: '#6BB64A'}]}>
              Create account{' '}
            </Text>
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

  input1: {
    height: 52,
    marginTop: 7,
    fontFamily: 'Poppins Regular',
    fontSize: 13,
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

  txt: {
    fontFamily: 'Poppins Regular',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.05,
    textAlign: 'center',
  },
});

export default Signin;
