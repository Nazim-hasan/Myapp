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
  Modal,
  TouchableWithoutFeedback,
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
import {format, subDays} from 'date-fns';
import PatientIcon from '../assets/svg/patient';
import AddIcon from '../assets/svg/add';
import FinanceIcon from '../assets/svg/finance';
import ProfileIcon from '../assets/svg/profile';
import HomeInactiveIcon from '../assets/svg/home-inactive';

const Patientdashboard = ({route}) => {
  const [selectedOption, setSelectedOption] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [allPatients, setAllPatients] = React.useState([]);
  const [filteredPatients, setFilteredPatients] = React.useState([]);
  const [isDeleteSuccess, setIsDeleteSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [totalMalePatients, setTotalMalePatients] = React.useState('');
  const [totalFemalePatients, setTotalFemalePatients] = React.useState('');
  const [dateFilter, setDateFilter] = React.useState('Last 7 Days');
  const [showDateModal, setShowDateModal] = React.useState(false);
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [genderFilter, setGenderFilter] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const dateOptions = ['Last 3 Days', 'Last 7 Days', 'Last 10 Days'];

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
    setModalVisible(false);
    console.log(`Deleting item: ${selectedItem.name}`);
  };

  React.useEffect(() => {
    setLoading(true);
    loadPatient();
    getTotalFemalePatient();
    getTotalMalePatient();
  }, [isDeleteSuccess]);

  React.useEffect(() => {
    applyFilters();
  }, [allPatients, dateFilter, genderFilter, searchQuery]);

  const loadPatient = async () => {
    const token = await AsyncStorage.getItem(USER_TOKEN);
    await apiService
      .getAllPatient(token)
      .then(res => {
        const data = res.data.patients.map(item => {
          return {id: item._id, ...item};
        });
        setAllPatients(data);
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
      })
      .catch(error => {
        console.error(
          'Error at total male patient get request:',
          error.response.data,
        );
      });
  };

  const getTotalFemalePatient = async () => {
    const token = await AsyncStorage.getItem(USER_TOKEN);

    await apiService
      .getAllFemalePatient(token)
      .then(response => {
        let patientCount = response.data.data.totalFemale;
        setTotalFemalePatients(patientCount);
      })
      .catch(error => {
        console.error(
          'Error at total female patient get request:',
          error.response.data,
        );
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

  const applyFilters = () => {
    let filtered = allPatients;

    // Apply date filter
    const currentDate = new Date();
    let daysToSubtract;
    switch (dateFilter) {
      case 'Last 3 Days':
        daysToSubtract = 3;
        break;
      case 'Last 7 Days':
        daysToSubtract = 7;
        break;
      case 'Last 10 Days':
        daysToSubtract = 10;
        break;
      default:
        daysToSubtract = 7;
    }
    const filterDate = subDays(currentDate, daysToSubtract);
    filtered = filtered.filter(patient => new Date(patient.createdAt) >= filterDate);

    // Apply gender filter
    if (genderFilter !== 'All') {
      filtered = filtered.filter(patient => patient.gender === genderFilter);
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(
        patient =>
          patient.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.phone.includes(searchQuery)
      );
    }

    setFilteredPatients(filtered);
  };

  const patientItem = ({item}) => (
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

  return (
    <>
      <View style={styles.main}>
        <View style={styles.finoverview}>
          <View style={styles.overviewHeader}>
            <Text style={styles.txt11}> Patient Overview </Text>
            <ArrowUpIcon />
          </View>
          <View style={styles.line}></View>

          <View style={styles.overview}>
            <View style={styles.overview1}>
              <TotalPatientIcon />
              <Text style={styles.num}>{allPatients.length}</Text>
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
          <SearchIcon />
          <TextInput
            placeholder="Search by name or phone"
            style={styles.inputStyles}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.info}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowDateModal(true)}>
            <Text style={styles.filterButtonText}>{dateFilter}</Text>
            <ArrowDownIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}>
            <Text style={styles.filterButtonText}>Filter</Text>
            <FilterIcon />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={'blue'} size={'large'} />
          </View>
        ) : (
          <FlatList
            style={{flex: 1}}
            data={filteredPatients}
            renderItem={patientItem}
            keyExtractor={(item) => item.id.toString()}
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

      <Modal
        visible={showDateModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDateModal(false)}>
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowDateModal(false)}>
          <View style={styles.modalContent}>
            <TouchableWithoutFeedback>
              <View>
                {dateOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.modalOption}
                    onPress={() => {
                      setDateFilter(option);
                      setShowDateModal(false);
                    }}>
                    <Text style={styles.modalOptionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFilterModal(false)}>
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowFilterModal(false)}>
          <View style={styles.modalContent}>
            <TouchableWithoutFeedback>
              <View>
                <Text style={styles.modalTitle}>Filter by Gender</Text>
                <TouchableOpacity 
                  style={styles.modalOption} 
                  onPress={() => {
                    setGenderFilter('All');
                    setShowFilterModal(false);
                  }}>
                  <Text style={styles.modalOptionText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.modalOption} 
                  onPress={() => {
                    setGenderFilter('Male');
                    setShowFilterModal(false);
                  }}>
                  <Text style={styles.modalOptionText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.modalOption} 
                  onPress={() => {
                    setGenderFilter('Female');
                    setShowFilterModal(false);
                  }}>
                  <Text style={styles.modalOptionText}>Female</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.btmnav}>
        <TouchableOpacity
          style={styles.navItemContainer}
          onPress={() => navigation.navigate('dashboard')}>
          <HomeInactiveIcon />
          <Text style={styles.navTitleInActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemContainer}>
          <PatientIcon color="#F7BB07" />
          <Text style={styles.navTitleActive}>Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addIconContainer}
          onPress={() => navigation.navigate('addpatient')}>
          <AddIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItemContainer}
          onPress={() => navigation.navigate('finance')}>
          <FinanceIcon />
          <Text style={styles.navTitleInActive}>Finance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItemContainer}
          onPress={() => navigation.navigate('profile')}>
          <ProfileIcon />
          <Text style={styles.navTitleInActive}>Profile</Text>
        </TouchableOpacity>
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
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 10,
  },
  filterButton: {
    backgroundColor: '#E3FFEF',
    padding: 10,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  filterButtonText: {
    fontFamily: 'Poppins Medium',
    fontSize: 14,
    color: '#192608',
    marginRight: 8,
  },
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalOptionText: {
    fontFamily: 'Poppins Regular',
    fontSize: 16,
    color: '#192608',
  },
  modalTitle: {
    fontFamily: 'Poppins Medium',
    fontSize: 18,
    color: '#192608',
    marginBottom: 15,
  },
});

export default Patientdashboard;