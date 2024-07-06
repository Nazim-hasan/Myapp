import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import VerifiedIcon from '../assets/svg/verified';
import ExitIcon from '../assets/svg/exit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SocialIcons from '../assets/svg/social';
import { apiService } from '../src/services/api-service';
import { USER_ID, USER_TOKEN } from './Signin';
const Drprofile = props => {
  const [dctrname, setDctrname] = useState();

  const getDoc = async () => {
    const id = await AsyncStorage.getItem(USER_ID);
    const token = await AsyncStorage.getItem(USER_TOKEN);
    await apiService
      .getDoctor(token)
      .then(res => {
        setDctrname(res.data.user);
      })
      .catch(err => console.log('get doctor fail:', err.response.data));
  };

  useEffect(() => {
    getDoc();
  }, []);

  console.log('dctrname', dctrname);

  const handleLogout = async () => {
    
    await AsyncStorage.removeItem(USER_ID);
    await AsyncStorage.removeItem(USER_TOKEN);
    props.navigation.navigate('signin');
  }

  return (
    <>
      <View style={styles.main}>
        <View style={styles.profile}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('drprofile')}>
            <Image style={styles.imge} />
          </TouchableOpacity>

          <View style={styles.drinfo}>
            <View style={styles.verified}>
              <Text style={styles.dctr}>
                {dctrname?.fullName || 'Dr. Ariful Haque'}
              </Text>
              <View
                style={{
                  marginTop: 3,
                  marginLeft: 5,
                }}>
                <VerifiedIcon />
              </View>
            </View>

            <Text style={styles.titl}>
              {' '}
              {dctrname?.email || 'ariful.uxd@gmail.com'}
            </Text>
            <View style={styles.eyes}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('profile')}
                style={styles.viewprof}>
                <Text style={styles.btnn}>View Profile </Text>
                <Image
                  source={require('../assets/drprofile/eyes.png')}
                  style={styles.eye}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('profile')
                }></TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.setting}>
          <View style={styles.acc}>
            <TouchableOpacity>
              <Image source={require('../assets/drprofile/user.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.tit}>Account Settings</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.acc}>
            <TouchableOpacity>
              <Image source={require('../assets/drprofile/privacy.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.tit}>Account Privacy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.acc}>
            <TouchableOpacity>
              <Image source={require('../assets/drprofile/policy.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('terms')}>
              <Text style={styles.tit}>Privacy & Policy </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.acc}>
            <TouchableOpacity>
              <Image source={require('../assets/drprofile/help.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('helpsupport')}>
              <Text style={styles.tit}>Help & Support </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.acc}>
            <TouchableOpacity>
              <Image source={require('../assets/drprofile/share.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.tit}> Share App </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.acc}>
            <TouchableOpacity>
              <Image source={require('../assets/drprofile/rating.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.tit}> Rating Us </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.acc}>
            <ExitIcon />
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logclr}>Log out </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '100%',
              borderWidth: 0.2,
              borderColor: '#717967',
              marginBottom: 20,
            }}
          />
          <SocialIcons />
          <Text
            style={{
              fontFamily: 'Poppins Regular',
              textAlign: 'center',
              marginTop: 10,
            }}>
            www.homeoly.com
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btnn: {
    fontFamily: 'Poppins Regular',
    color: '#00A746',
    fontSize: 14,
  },
  main: {
    flex: 1,
  },
  profile: {
    flexDirection: 'row',
    top: 20,
    left: 10,
  },

  imge: {
    width: 100,
    height: 100,

    backgroundColor: 'lightgray',
    borderRadius: 50,
    padding: 10,
  },
  drinfo: {
    flexDirection: 'column',
    left: 8,
  },

  verified: {
    flexDirection: 'row',
  },

  dctr: {
    fontFamily: 'Poppins Medium',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'left',
    color: '#192608',
  },

  icon: {
    width: 13.89,
    height: 14,
    right: 8,
    top: 14,
  },
  titl: {
    fontFamily: 'Poppins Regular',
    color: '#4F4F4F',
    FontSize: 14,
    marginTop: 5,
  },

  eyes: {
    flexDirection: 'row',
  },

  eye: {},

  viewprof: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#00A746',
    padding: 5,
    marginTop: 10,
  },

  setting: {
    flexDirection: 'column',
    margin: 10,
    marginTop: 30,
  },

  acc: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },

  tit: {
    fontFamily: 'Poppins Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 26,
    letterSpacing: 0.05,
    textAlign: 'left',
    left: 10,
    margin: 10,
    color: '#192608',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
  },
  logclr: {
    fontFamily: 'Poppins Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 26,
    letterSpacing: 0.05,
    textAlign: 'left',
    left: 10,
    margin: 10,
    color: 'red',
  },
});
export default Drprofile;
