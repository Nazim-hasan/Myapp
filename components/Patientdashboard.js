import * as React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import PatientModal from './modals/PatientModal';
import {useNavigation} from '@react-navigation/native';
import ContextModal from './modals/ContextModal';
import {apiService} from '../src/services/api-service';
import {USER_ID, USER_TOKEN} from './Signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TotalPatientIcon from '../assets/svg/total-paitent';
import MaleIcon from '../assets/svg/male';
import FemaleIcon from '../assets/svg/female';
import SearchIcon from '../assets/svg/search';
import ArrowUpIcon from '../assets/svg/arrow-up';
import ArrowDownIcon from '../assets/svg/arrow-down';
import FilterIcon from '../assets/svg/filter';
import {format} from 'date-fns';
import PatientIcon from '../assets/svg/patient';
import AddIcon from '../assets/svg/add';
import FinanceIcon from '../assets/svg/finance';
import ProfileIcon from '../assets/svg/profile';
import HomeInactiveIcon from '../assets/svg/home-inactive';

const Patientdashboard = ({route}) => {
  const [selectedOption, setSelectedOption] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [allPatient, setAllPatient] = React.useState([]);
  const [isDeleteSuccess, setIsDeleteSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [totalMalePatients, setTotalMalePatients] = React.useState('');
  const [totalFemalePatients, setTotalFemalePatients] = React.useState('');

  const navigation = useNavigation();
  const closeModal = () => {
    setSelectedOption('');
    setModalVisible(false);
  };

  const handleOption = item => {
    setSelectedItem(item);
    setModalVisible(!modalVisible);
  };

  const confirmDelete = () => {
    // Perform deletion logic here
    setModalVisible(false);
    console.log(`Deleting item: ${selectedItem.name}`);
  };

  React.useEffect(() => {
    setLoading(true);
    loadPatient();
    getTotalFemalePatient();
    getTotalMalePatient();
  }, [isDeleteSuccess]);

  const loadPatient = async () => {
    const token = await AsyncStorage.getItem(USER_TOKEN);
    await apiService
      .getAllPatient(token)
      .then(res => {
        const data = res.data.patients.map(item => {
          return {id: item._id, ...item};
        });
        setAllPatient(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log('patient dashboard data loading :', err);
      });
  };
  const getTotalMalePatient = async () => {
    const token = await AsyncStorage.getItem(USER_TOKEN);

    await apiService
      .getAllMalePatient(token)
      .then(response => {
        let patientCount = response.data.data.totalMale;
        setTotalMalePatients(patientCount);
        setLoading(false);
      })
      .catch(error => {
        console.error(
          'Error at totall male patient get request:',
          error.response.data,
        );
        setLoading(false);
      });
  };

  const getTotalFemalePatient = async () => {
    const token = await AsyncStorage.getItem(USER_TOKEN);

    await apiService
      .getAllFemalePatient(token)
      .then(response => {
        let patientCount = response.data.data.totalFemale;
        setTotalFemalePatients(patientCount);
        setLoading(false);
      })
      .catch(error => {
        console.error(
          'Error at totall male patient get request:',
          error.response.data,
        );
        setLoading(false);
      });
  };

  const deletePatientHandler = async id => {
    setLoading(true);
    const token = await AsyncStorage.getItem(USER_TOKEN);
    await apiService
      .deletePatient(id, token)
      .then(() => {
        setIsDeleteSuccess(true);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log('error occur while deleting patient', err.response.data);
      });
  };

  const patientItem = data => {
    const {item} = data;
    return (
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate('patient', {item})}>
        <Image style={styles.avatar} />
        <View style={styles.infoContainer}>
          <View style={styles.dateTime}>
            <Text style={styles.dateTimeText}>
              {format(new Date(item?.dateOfBirth), 'dd MMM yyyy')}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.name}>{item?.fullName}</Text>
            <Text style={styles.name}>{item?.gender}</Text>
            <Text style={styles.name}>{item?.phone}</Text>
          </View>
        </View>
        <ContextModal item={item} deletePatientHandler={deletePatientHandler} />
      </Pressable>
    );
  };

  return (
    <>
      <View style={styles.main}>
        <View style={styles.finoverview}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Text style={styles.txt11}> Patient Overview </Text>
            <ArrowUpIcon />
          </View>
          <View style={styles.line}></View>

          <View style={styles.overview}>
            <View style={styles.overview1}>
              <TotalPatientIcon />
              <Text style={styles.num}>{allPatient.length}</Text>
              <Text style={styles.txt}>Total Patient </Text>
            </View>
            <View style={styles.overview2}>
              <MaleIcon />
              <Text style={styles.num}>{totalMalePatients}</Text>
              <Text style={styles.txt}> Male </Text>
            </View>
            <View style={styles.overview3}>
              <FemaleIcon />
              <Text style={styles.num}>{totalFemalePatients}</Text>
              <Text style={styles.txt}> Female </Text>
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          {/* <EmailIcon /> */}
          <SearchIcon />
          <TextInput
            placeholder="Search by name or phone"
            style={styles.inputStyles}
          />
        </View>

        <View style={styles.info}>
          <View
            style={{
              backgroundColor: '#E3FFEF',
              padding: 5,
              borderRadius: 3,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 2,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins Medium',
                fontSize: 14,
                color: '#192608',
                marginRight: 8,
              }}>
              Last 7 Days
            </Text>
            <ArrowDownIcon />
          </View>
          <View
            style={{
              backgroundColor: '#E3FFEF',
              padding: 5,
              borderRadius: 3,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 2,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins Medium',
                fontSize: 14,
                color: '#192608',
                marginRight: 8,
              }}>
              Filter
            </Text>
            <FilterIcon />
          </View>
        </View>

        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={'blue'} size={'large'} />
          </View>
        ) : (
          <FlatList
            style={{flex: 1}}
            data={allPatient}
            renderItem={patientItem}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={() => <View style={{height: 100}} />}
            ListHeaderComponent={() => <View style={{marginTop: 20}} />}
          />
        )}
      </View>

      <PatientModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        selectedItem={selectedItem}
        confirmDelete={confirmDelete}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <View style={styles.btmnav}>
        <View>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => {
              navigation.navigate('dashboard');
            }}>
            <HomeInactiveIcon />
            <Text style={styles.navTitleInActive}>Home</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.navItemContainer}>
            <PatientIcon color="#F7BB07" />
            <Text style={styles.navTitleActive}>Patient</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={{
              top: -16,
              left: 10,
            }}
            onPress={() => navigation.navigate('addpatient')}>
            <AddIcon />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('finance')}>
            <FinanceIcon />

            <Text style={styles.navTitleInActive}>Finance</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('profile')}>
            <ProfileIcon />
            <Text style={styles.navTitleInActive}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: 20,
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
    width: '90%',
    marginLeft: 20,
    marginTop: 60,
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

  finoverview: {
    width: '95%',
    height: 204,
    top: 20,
    left: 10,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    borderColor: '#83838340',
    borderWidth: 1,
    borderRadius: 6,
  },
  txt11: {
    fontFamily: 'Poppins Medium',
    color: '#4F4F4F',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 5,
  },

  line: {
    width: '100%',
    borderWidth: 0.4,
    borderColor: '#AFD59F',
    marginTop: 5,
  },

  overview: {
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 5,
  },
  overview1: {
    width: '30%',
    height: 115,
    backgroundColor: '#FAFFFC',
    borderRadius: 6,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    borderColor: '#42D782',
    borderTopColor: 'white',
  },

  overview2: {
    width: '30%',
    height: 115,
    backgroundColor: '#FAFFFC',
    borderRadius: 6,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    borderColor: '#42D782',
    borderTopColor: 'white',
  },

  overview3: {
    width: '30%',
    height: 115,
    backgroundColor: '#FAFFFC',
    borderRadius: 6,
    margin: 2,
    top: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    borderColor: '#42D782',
    borderTopColor: 'white',
  },

  men: {
    width: 27.86,
    height: 30,
    top: 12,
    left: 40.07,
  },
  num: {
    width: 35,
    height: 23,
    left: 45,
    fontSize: 18,
    fontWeight: '600',
    top: 23,
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

  input1: {
    width: 342,
    height: 52,
    top: '55%',
    left: 3,
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

  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 10,
  },
  info1: {
    top: 50,
    left: 10,
  },
  seven: {
    borderRadius: 3,
    elevation: 4,
    backgroundColor: '#E3FFEF',
    fontSize: 13,
  },

  info2: {
    top: 50,
    left: 136,
  },
  tcxt1: {
    width: 80,
    height: 31,
    borderRadius: 3,
    elevation: 4,
    backgroundColor: '#E3FFEF',
    color: '#192608',
    fontSize: 14,

    left: 5,
  },
  ///
  item: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: 'lightgray',
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  dateTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  dateTimeText: {
    fontFamily: 'Poppins Regular',
    fontSize: 12,
    color: '#717967',
    marginBottom: -2,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  name: {
    fontFamily: 'Poppins Regular',
    fontSize: 14,
    color: '#192608',
  },
  separator: {
    height: 0.2,
    width: '100%',
    backgroundColor: '#ccc',
  },
  num: {
    fontFamily: 'Poppins Medium',
    color: '#192608',
    fontSize: 18,
    marginTop: 15,
  },
  txt: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19.5,
    fontFamily: 'Poppins Regular',
    color: '#4F4F4F',
    marginBottom: 10,
  },
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
});
export default Patientdashboard;
