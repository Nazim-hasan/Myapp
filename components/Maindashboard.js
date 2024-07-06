import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {apiService} from '../src/services/api-service';
import {USER_ID, USER_TOKEN} from './Signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import HomeIcon from '../assets/svg/home';
import PatientIcon from '../assets/svg/patient';
import AddIcon from '../assets/svg/add';
import FinanceIcon from '../assets/svg/finance';
import ProfileIcon from '../assets/svg/profile';
import SunRiseIcon from '../assets/svg/sunrise';
import VerifiedIcon from '../assets/svg/verified';
import TotalPatientIcon from '../assets/svg/total-paitent';
import MaleIcon from '../assets/svg/male';
import FemaleIcon from '../assets/svg/female';
import MoneyIcon from '../assets/svg/money';
import CalenderIcon from '../assets/svg/calender';
import DraftIcon from '../assets/svg/draft';

const Maindashboard = props => {
  const [doctorInfo, setDoctorInfo] = React.useState({});
  const [totalPatients, setTotalPatients] = React.useState('');
  const [totalMalePatients, setTotalMalePatients] = React.useState('');
  const [totalFemalePatients, setTotalFemalePatients] = React.useState('');

  React.useEffect(() => {
    getDoc();
    getTotalPatient();
    getTotalMalePatient();
    getTotalFemalePatient();
  }, []);

  const getDoc = async () => {
    const id = await AsyncStorage.getItem(USER_ID);
    const token = await AsyncStorage.getItem(USER_TOKEN);

    await apiService
      .getDoctor(token)
      .then(res => {
        setDoctorInfo(res.data);
      })
      .catch(err => console.log('get doctor fail:', err.response.data));
  };

  console.log('doctorInfo', doctorInfo)

  const getTotalPatient = async () => {
    const token = await AsyncStorage.getItem(USER_TOKEN);

    // await axios.get(`${baseUrl}api/patients`, {
    //   headers: { token }
    // })
    await apiService
      .getAllPatient(token)
      .then(response => {
        let patientCount = response.data.patients?.length;
        setTotalPatients(patientCount);
      })
      .catch(error => {
        console.error(
          'Error making GET totall patinet request rrrr:',
          error.response.data,
        );
      });
  };

  const getTotalMalePatient = async () => {
    const token = await AsyncStorage.getItem(USER_TOKEN);

    // await axios.get(`${baseUrl}api/patients/male`, { headers: { token } })
    await apiService
      .getAllMalePatient(token)
      .then(response => {
        let patientCount = response.data.data.totalMale;
        setTotalMalePatients(patientCount);
      })
      .catch(error => {
        console.error(
          'Error at totall male patient get request:',
          error.response.data,
        );
      });
  };

  const getTotalFemalePatient = async () => {
    const token = await AsyncStorage.getItem(USER_TOKEN);

    // await axios.get(`${baseUrl}api/patients/female`, { headers: { token } })
    await apiService
      .getAllFemalePatient(token)
      .then(response => {
        let patientCount = response.data.data.totalFemale;
        setTotalFemalePatients(patientCount);
      })
      .catch(error => {
        console.error(
          'Error at totall male patient get request:',
          error.response.data,
        );
      });
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <View style={styles.main}>
          <View style={styles.profile}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('drprofile')}>
              {doctorInfo?.doctor?.image.length > 20 ? (
                <Image
                  source={{uri: doctorInfo?.doctor?.image}}
                  style={styles.imge}
                />
              ) : (
                <Image
                  source={require('../assets/social/doctor.png')}
                  style={styles.imge}
                />
              )}
            </TouchableOpacity>

            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <View style={{
              flex: 1,
              marginLeft: 10
            }}>
              <Text style={styles.prtxt}> Welcome back, </Text>
              <View style={styles.verified}>
                <Text style={styles.dctr} numberOfLines={1}>{doctorInfo?.user?.fullName || 'Dr. Ariful Haque'}</Text>
                <View style={{
                  marginTop: 2
                }}>
                <VerifiedIcon />
                </View>
              </View>
              <Text style={styles.titl}>{doctorInfo?.doctor?.medicalName || 'B.H.M.S, DU'}</Text>
            </View>
            <View style={{
              flex: 1,
              alignItems: 'flex-end',
                alignItems: 'center'
            }}>
                
              <SunRiseIcon />
              <Text style={styles.gomor}> Good Morning </Text>
            </View>
            </View>
          </View>

          <View style={styles.slide}>
            <Image
              source={require('../assets/dashboard/quote.png')}
              style={styles.pic}
            />
          </View>

          <View>
            <Text style={styles.pateint}>Patient Overview </Text>
          </View>

          <View style={styles.overview}>
            <View style={styles.overview1}>
              <TotalPatientIcon />
              <Text style={styles.num}>{totalPatients || '00'}</Text>
              <Text style={styles.txt}>Total Patient </Text>
            </View>
            <View style={styles.overview2}>
              
              <MaleIcon />
              <Text style={styles.num}>{totalMalePatients || '00'}</Text>
              <Text style={styles.txt}> Male </Text>
            </View>
            <View style={styles.overview3}>
              <FemaleIcon />
              <Text style={styles.num}>{totalFemalePatients || '00'}</Text>
              <Text style={styles.txt}> Female </Text>
            </View>
          </View>

          <View>
            <Text style={styles.pateint}>Billing Overview </Text>
          </View>

          <View style={styles.scndoverview}>
            <View style={styles.overvieww1}>
              
              <MoneyIcon />
              <Text style={styles.num}>0</Text>
              <Text style={styles.txt}> 7 days Earning </Text>
            </View>

            <View style={styles.overvieww2}>
              
              <CalenderIcon />
              <Text style={styles.num}>0</Text>
              <Text style={styles.txt}> Due </Text>
            </View>
          </View>

          <View>
            <Text style={styles.pateint}>Draft Data </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.draft}
            onPress={() => props.navigation.navigate('drafts')}>

              <DraftIcon />
            <Text style={styles.num}>0</Text>
            <Text style={styles.txt}>Total Draft Patient </Text>
          </TouchableOpacity>

        </View>
        
        <View style={{
            height: 50, 
            width: 10,
            flex: 1
          }}/>
      </ScrollView>

      <View style={styles.btmnav}>
        <View>
          <TouchableOpacity style={styles.navItemContainer}>
            <HomeIcon />
            <Text style={styles.navTitleActive}>Home</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => props.navigation.navigate('patientdashboard')}>
            <PatientIcon />
            <Text style={styles.navTitleInActive}>Patient</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={{
              top: -16,
              left: 10,
            }}
            onPress={() => props.navigation.navigate('addpatient')}>
            <AddIcon />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => props.navigation.navigate('finance')}>
            <FinanceIcon />

            <Text style={styles.navTitleInActive}>Finance</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() =>
              props.navigation.navigate('profile')
            }>
            <ProfileIcon />
            <Text style={styles.navTitleInActive}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navItemContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 5,
  },
  navTitleActive: {
    fontFamily: 'Poppins Regular',
    color: '#192608',
  },
  navTitleInActive: {
    fontFamily: 'Poppins Regular',
    color: '#868D7E',
  },
  main: {
    backgroundColor: '#FAFFFC',
    flex: 1,
    width: '100%',
    height: 890,
  },
  profile: {
    flexDirection: 'row',
    top: 20,
    left: 10,
  },
  imge: {
    width: 60,
    height: 60,

    backgroundColor: 'lightgray',
    borderRadius: 50,
    padding: 10,
  },
  drinfo: {
    flexDirection: 'column',
  },

  verified: {
    flexDirection: 'row',
    marginTop: 2
  },
  prtxt: {
    fontFamily: 'Poppins Regular',
    color: '#4F4F4F',
    fontSize: 13,
    textAlign: 'left',
    marginLeft: 2
  },
  dctr: {
    fontFamily: 'Poppins SemiBold',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
    color: '#192608',
    marginHorizontal: 5
    
  },
  icon: {
    width: 13.89,
    height: 14,
    right: 8,
    top: 4,
  },
  titl: {
    color: '#4F4F4F',
    fontFamily: 'Poppins Medium',
    fontSize: 12,
    marginLeft: 8
  },
  icn: {
    width: 30,
    height: 35,
    left: 30,
  },
  gomor: {
    color: '#4F4F4F',
    fontFamily: 'Poppins Regular',
    fontSize: 12,
    
  },
  sun: {
    // flexDirection: 'column',
  },
  pic: {
    width: '95%',
    height: 195,
    marginTop: 40,
    alignSelf: 'center'
    // marginLeft: 10
  },
  pateint: {
    fontFamily: 'Poppins Medium',
    color: '#4F4F4F',
    fontSize: 18,
    marginTop: 30,
    marginLeft: 20
  },
  overview: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: '5%'
  },
  overview1: {
    width: 112,
    height: 130,
    backgroundColor: '#FAFFFC',
    borderRadius: 6,
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    borderColor: '#42D782',
    borderTopColor: 'white'
  },

  overview2: {
    width: 112,
    height: 130,
    backgroundColor: '#FAFFFC',
    borderRadius: 6,
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    borderColor: '#42D782',
    borderTopColor: 'white'
  },

  overview3: {
    width: 112,
    height: 130,
    backgroundColor: '#FAFFFC',
    borderRadius: 6,
    margin: 3,
    top: 3,
    justifyContent: 'center',
    alignItems: 'center',
    
    borderBottomWidth: 0.8,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    borderColor: '#42D782',
    borderTopColor: 'white'
  },

  
  
  txt: {
    fontFamily: 'Poppins',
    width: 85,
    height: 20,
    top: 28,
    left: 16,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.5,
  },
  num: {
    
    fontFamily: 'Poppins Medium',
    color: '#192608',
    fontSize: 18,
    marginTop: 15

  },
  txt: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19.5,
    fontFamily: 'Poppins Regular',
    color: '#4F4F4F',
    marginBottom: 10
  },
  txt1: {
    fontFamily: 'Poppins',
    width: 85,
    height: 20,
    top: 28,
    left: 32,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.5,
  },
  txt2: {
    fontFamily: 'Poppins',
    width: 85,
    height: 20,
    top: 28,
    left: 25,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.5,
  },
  bill: {
    fontFamily: 'Poppins Regular',
    fontSize: 18,
    fontWeight: '500',
  },
  scndoverview: {
    flexDirection: 'row',
    fontFamily: 'Poppins Medium',
    color: '#4F4F4F',
    fontSize: 18,
    marginTop: 10,
    marginLeft: '6%',
  },
  overvieww1: {
    width: 165,
    height: 120,
    backgroundColor: '#FAFFFC',
    borderRadius: 6,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFFFC',
    borderBottomWidth: 0.8,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    borderColor: '#42D782',
    borderTopColor: 'white'
  },
  overvieww2: {
    width: 165,
    height: 120,
    backgroundColor: '#FAFFFC',
    borderRadius: 6,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    borderColor: '#42D782',
    borderTopColor: 'white'
  },

  bill1: {
    width: 27.86,
    height: 30,
    top: 12,
    left: 65,
  },
  num1: {
    width: 35,
    height: 23,
    left: 75,
    fontSize: 18,
    fontWeight: '600',
    top: 23,
  },
  billtxt: {
    fontFamily: 'Poppins Regular',

    top: 28,
    left: 25,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.5,
  },

  billtxt1: {
    fontFamily: 'Poppins',
    width: 95,
    height: 20,
    top: 28,
    left: 55,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.5,
  },
  drft: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '500',
    top: 90,
    left: 13,
  },
  draft: {
    width: '90%',
    height: 140,
    backgroundColor: '#FAFFFC',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    borderColor: '#42D782',
    borderTopColor: 'white',
    marginLeft: 20
    
  },
  drimg: {
    width: 27.86,
    height: 30,
    top: 22,
    left: 135,
  },
  drf1: {
    width: 35,
    height: 23,
    left: 140,
    fontSize: 18,
    fontWeight: '600',
    top: 33,
  },

  drtxt: {
    fontFamily: 'Poppins',
    width: 125,
    height: 20,
    top: 42,
    left: 85,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.5,
  },

  btmnav: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#B0B0B040',
    justifyContent: 'space-evenly',
    
    elevation: 24,
    // top: 125,
  },

  btnavbar: {
    top: 9,
    left: 10,
    margin: 10,
  },
});
export default Maindashboard;
