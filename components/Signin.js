import {Image} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {apiService} from '../src/services/api-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData} from '../src/utils/localSgorage';

export const USER_ID = '@user_id';
export const USER_TOKEN = '@user_token';
const dimension = Dimensions.get('screen');

const Signin = ({navigation, props}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
          <TextInput
            placeholder="Email / Phone"
            value={email}
            onChangeText={setEmail}
            style={styles.input1}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            style={styles.input1}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Remember me</Text>
            <TouchableOpacity>
              <Text style={{color: '#AFD59F'}}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/*

        <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'center', }}>
          

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Remember me</Text>
            <TouchableOpacity  >
              <Text style={{ color: '#AFD59F' }}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.cont}>Or Continue with</Text>
        </View>

        <View style={{ paddingHorizontal: '20%', marginTop: 10 }}>
          <View style={styles.social}>
            <View style={styles.rect}>
              <Image source={require('../assets/social/google.png')} style={{ height: '100%', width: '100%' }} />
            </View>
            <View style={styles.rect}>
              <Image source={require('../assets/social/facebook.png')} style={{ height: '100%', width: '100%' }} />

            </View>
            <View style={styles.rect}>
              <Image source={require('../assets/social/apple.png')} style={{ height: '100%', width: '100%' }} />
            </View>
          </View>
        </View>
        {error ? <Text>{error}</Text> : null}

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.buton} onPress={handleSignIn} >
            {loading?(<Text style={[styles.txt, { color: '#fff' }]}>Signing in...</Text>):
            (<Text style={[styles.txt, { color: '#fff' }]}>Sign In</Text>)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.txt}>Do you have an account ?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("create")}
          >
            <Text style={styles.sign}>Create account </Text>
          </TouchableOpacity>
        </View> */}
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
    marginTop: 50,
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
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
    marginTop: 20,
  },

  txt: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.05,
    textAlign: 'center',
  },
});

export default Signin;
