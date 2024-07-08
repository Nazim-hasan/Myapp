import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import VerifiedIcon from '../assets/svg/verified';
import EditIcon from '../assets/svg/edit';
import {USER_ID, USER_TOKEN} from './Signin';
import {apiService} from '../src/services/api-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = props => {
  const [doctors, setDoctors] = useState({});
  const [refresh, setRefresh] = useState(false);

  const getDoc = async () => {
    const id = await AsyncStorage.getItem(USER_ID);
    const token = await AsyncStorage.getItem(USER_TOKEN);
    await apiService
      .getDoctor(token)
      .then(res => {
        setDoctors(res.data.user);
      })
      .catch(err => console.log('get doctor fail:', err.response.data));
  };

  useEffect(() => {
    setRefresh(true);
    getDoc();
    setRefresh(false);
  }, []);


  return (
    <ScrollView
      style={styles.main}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={getDoc} />
      }>
      <View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 15,
            top: 12,
          }}
          onPress={() =>
            props.navigation.navigate('editprofile', {
              doctorInfo: doctors,
            })
          }>
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.viewpr}>
        <Image style={styles.imge} />

        <View style={styles.verified}>
          <Text style={styles.dctr}>
            {doctors.fullName || 'Dr. Ariful Haque'}
          </Text>
          <View
            style={{
              marginTop: 3,
              marginLeft: 5,
            }}>
            <VerifiedIcon />
          </View>
        </View>

        <Text style={styles.title}> {doctors.degree || 'B.H.M.S, DU'}</Text>
        <Text style={styles.reg}>
          Registration No:
          {doctors.registration || '254654'}
        </Text>
      </View>

      <View style={styles.info}>
        <Text
          style={{
            fontFamily: 'Poppins Medium',
            fontSize: 16,
            color: '#4F4F4F',
          }}>
          {' '}
          {doctors.medical || 'Shafi Homeo Care'}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins Regular',
            color: '#5B6550',
          }}>
          Phone: {doctors.phone || '+880 1610 123112'}{' '}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins Regular',
            color: '#5B6550',
          }}>
          Email: {doctors.email || ' ariful.uxd@gmail.com'}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins Regular',
            color: '#5B6550',
            textAlign: 'center',
            marginTop: 20,
          }}>
          {' '}
          {doctors.precity ||
            'House: 32/1, Road: 03,Shyamoli, Dhaka-1207, Bangladesh'}{' '}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  edit: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  viewpr: {
    // top: 20,
    // left: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -30,
    marginTop: 20,
  },

  imge: {
    width: 100,
    height: 100,
    backgroundColor: 'lightgray',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  verified: {
    flexDirection: 'row',
    marginTop: 20,
  },

  title: {
    fontFamily: 'Poppins Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#5B6550',
  },

  dctr: {
    fontFamily: 'Poppins Medium',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'left',
    color: 'black',
    marginBottom: 5,
  },
  reg: {
    fontFamily: 'Poppins Regular',
    color: '#5B6550',
    fontSize: 16,
    marginTop: -5,
  },
  info: {
    marginTop: 20,
    paddingVertical: 20,
    marginLeft: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#AFD59F',
  },

  primg: {
    top: 15,
  },
});
export default Profile;
