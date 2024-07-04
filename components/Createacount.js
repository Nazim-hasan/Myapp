import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { apiService } from '../src/services/api-service';

const Createacount = (props) => {

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        phone: phone
      }
      console.log("user before create accont:",user)
      await apiService.signup(user).then((res) => {
        console.log("signup success",res)
        navigation.navigate('verify', { email });
      }).catch((err) => {
        console.log("error while signing up (after then) :", err)
      });
    } catch (err) {
      console.log("error while signing up :", err);
    }
  };


  return (
    <>
      <View style={styles.main}>
        <Text style={styles.create}>Create Account </Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input1}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input1}
        />

        <TextInput
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          style={styles.input1}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input1}
          secureTextEntry={true}
        />

        <Text style={styles.cont}>Or Continue with</Text>

        <View style={{ paddingHorizontal: '20%', marginTop: 100 }}>
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

        <TouchableOpacity onPress={handleSignUp} >
          <Text style={styles.buton}>Create Account </Text>
        </TouchableOpacity>

        <View style={styles.lstext}>
          <Text style={styles.txt}>Already have an account ?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('signin')}>
            <Text style={styles.sign}>Sign In</Text>
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
    height: 920,
    overflow: "hidden",
  },
  create: {
    width: 208,
    height: 31,
    top: 44,
    left: 82,

    fontFamily: 'poppins',
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    lineHeight: 31,
    letterSpacing: 0.05,
    textAlign: 'center',



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
    width: 128,
    height: 21,
    left: 135,
    top: 90,

    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.05,
    textAlign: 'left',

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
    left: 12,
    top: 110,
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins',
    lineHeight: 20.8,

    padding: 12,

  },

  lstext: {
    flexDirection: 'row',
    top: '36%',
    left: 70,
  },
  txt: {

    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.05,
    textAlign: 'center',

  },
  sign: {
    color: '#AFD59F',
  },


});

export default Createacount; 