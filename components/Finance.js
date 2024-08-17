import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {apiService} from '../src/services/api-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_ID, USER_TOKEN} from './Signin';
import PatientIcon from '../assets/svg/patient';
import AddIcon from '../assets/svg/add';
import ProfileIcon from '../assets/svg/profile';
import FinanceActiveIcon from '../assets/svg/finance-active';
import HomeInactiveIcon from '../assets/svg/home-inactive';
import MoneyCashIcon from '../assets/svg/money-cash';
import CalenderClockIcon from '../assets/svg/calender-clock';
import ArrowDownIcon from '../assets/svg/arrow-down';
import FilterIcon from '../assets/svg/filter';
import BillingContextModal from './modals/BillingModal';

const Finance = props => {
  const navigation = useNavigation();
  const [bills, setBills] = useState(null);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleOption = item => {
    setSelectedItem(item);
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    
    loadBillings();
  }, []);
  const loadBillings = async () => {
    const token = await AsyncStorage.getItem(USER_TOKEN);
    apiService.getFinance(token).then((res) => {
      setBills(res?.data || [])
    }).catch(err => console.log(err))
  }

  function getLast10Chars(str) {
    if (typeof str !== 'string') {
      throw new TypeError('Input must be a string');
    }
    return str.slice(-10);
  }

  console.log('bills', bills)


  const billedItem = data => {
    const {item} = data;
    console.log('item', item)
    return (
      <Pressable
        style={styles.item}
        onPress={() => {
          return;
          navigation.navigate('patient', {item})
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 10,
          }}>
          <Text style={styles.name}>{item?.patient?.fullName}</Text>
          <Text style={styles.name}>{item?.billing?.totalAmount}</Text>
          <Text style={styles.name}>{item?.billing?.receivedAmount}</Text>
          <Text style={styles.name}>{item?.billing?.dueAmount}</Text>
          {/* <TouchableOpacity>
          <MoreIcon />
          </TouchableOpacity> */}

          <BillingContextModal
            prescriptionId={item?._id}
            billingInfo={item}
            handleOption={handleOption}
          />

        </View>
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
              padding: 15,
            }}>
            <Text style={styles.txt1}> Finance Overview </Text>
            <Text style={styles.txt2}> Today's </Text>
          </View>
          <View style={styles.line}></View>

          <View style={styles.scndoverview}>
            <View style={styles.overvieww1}>
              <MoneyCashIcon />
              <Text style={styles.num}>{bills?.totalEarnings}</Text>
              <Text style={styles.txt}>Todays Earning </Text>
            </View>

            <View style={styles.overvieww2}>
              <CalenderClockIcon />
              <Text style={styles.num}>{bills?.totalDue}</Text>
              <Text style={styles.txt}>Due </Text>
            </View>
          </View>
        </View>

        <View style={{
          marginLeft: 10,
        }}>
          <Text style={styles.bill}>Patient Billing </Text>
          <View style={styles.line1}></View>
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
              elevation: 2
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
              elevation: 2
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
        <View style={styles.table}>
          <Text style={styles.tableHeader}>Patient</Text>
          <Text style={styles.tableHeader}> Total </Text>
          <Text style={styles.tableHeader}> Recieve</Text>
          <Text style={styles.tableHeader}> Due </Text>
        </View>
        <View style={styles.separator}></View>

        <FlatList
          style={{flex: 1,}}
          data={bills?.prescriptionsWithPatients || []}
          renderItem={billedItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      <View style={styles.btmnav}>
        <View>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => props.navigation.navigate('dashboard')}>
            <HomeInactiveIcon />
            <Text style={styles.navTitleInActive}>Home</Text>
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
            <FinanceActiveIcon />

            <Text style={styles.navTitleActive}>Finance</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() =>
              props.navigation.navigate('profile', {doctorInfo: null})
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
  name: {
    fontFamily: 'Poppins Regular',

  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#AFD59F',
  },
  item: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 8,
  },
  main: {
    flex: 1,
  },

  finoverview: {
    marginHorizontal: 10,
    marginVertical: 20,
    elevation: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 6,
  },
  txt1: {
    fontFamily: 'Poppins Regular',
    fontSize: 16,
    color: '#4F4F4F',
  },

  txt2: {
    fontFamily: 'Poppins Regular',
    fontSize: 13,
    color: '#4F4F4F',
  },

  line: {
    // marginTop: 10,
    borderWidth: 0.8,
    borderColor: '#AFD59F',
    // marginBottom: 10,
  },

  scndoverview: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  overvieww1: {
    width: '45%',
    height: 125,
    backgroundColor: '#FAFFFC',
    borderRadius: 6,
    margin: 5,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFFFC',
    borderBottomWidth: 0.8,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    borderColor: '#42D782',
    borderTopColor: 'white',
  },
  overvieww2: {
    width: '45%',
    height: 125,
    marginVertical: 20,
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
    borderTopColor: 'white',
  },

  bill1: {
    width: 27.86,
    height: 30,
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
    fontFamily: 'Poppins',
    width: 105,
    height: 20,
    top: 28,
    left: 20,
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

  bill: {
    fontFamily: 'Poppins Regular',
    fontSize: 17,
    color: '#4F4F4F',
    marginBottom: 5,
    
  },

  line1: {
    width: '95%',

    
    borderWidth: 0.8,
    borderColor: '#AFD59F',
  },

  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 10,
  },
  info1: {
    top: 60,
    left: 7,
  },
  seven: {
    width: 133,
    height: 31,
    borderRadius: 3,
    elevation: 4,
    backgroundColor: '#E3FFEF',
    fontSize: 13,

    left: 5,
  },

  info2: {
    top: 60,
    left: 126,
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

  table: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingBottom: 10,
  },

  img: {
    top: 90,
    left: '90%',
  },
  modal: {
    width: 150,
    height: 85,
    backgroundColor: '#FFF',
    elevation: 3,
    top: '78%',
    left: 170,
    borderRadius: 6,
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

  btnavbar: {
    top: 9,
    left: 10,
    margin: 10,
  },
  paymenthis: {
    margin: 5,
    fontSize: 16,
    color: '#F7BB07',
    fontWeight: '400',
    borderColor: '#A8A8A866',
    borderBottomWidth: 1,
  },
  navTitleActive: {
    fontFamily: 'Poppins Regular',
    color: '#192608',
  },
  navTitleInActive: {
    fontFamily: 'Poppins Regular',
    color: '#868D7E',
  },
  navItemContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 5,
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
  tableHeader: {
    fontFamily: 'Poppins Regular',
    color: '#717967',
    fontSize: 13
  }
});
export default Finance;
