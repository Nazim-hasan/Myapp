import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {apiService} from '../src/services/api-service';
import CreatePrescriptionModal from './modals/CreatePrescriptionModal';
import PrescriptionItem from './PrescriptionItem';
import {USER_TOKEN} from './Signin';
import { differenceInYears, parseISO } from 'date-fns';

const Patient = ({route, navigation}) => {
  const {item} = route.params;
  const [selectedOption, setSelectedOption] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [createPrescriptionModalVisible, setCreatePrescriptionModalVisible] =
    React.useState(false);
  const [patientPrescriptions, setPatientPrescriptions] = React.useState([]);

  // console.log("item at patient:", item);

  useEffect(() => {
    loadPrescriptions(item?._id);
  }, []);

  const closeCreatePrescriptionModal = () => {
    setCreatePrescriptionModalVisible(false);
  };

  const submitPrescription = async data => {
    const userToken = await AsyncStorage.getItem(USER_TOKEN);

    const updateData = {
      ...data,
      patientId: item?._id,
    };

    try {
      await apiService
        .addPrescription(updateData, userToken)
        .then(res => {
          console.log('add prescription response ::::', res.data);
          //   navigation.navigate('patientdashboard');
        })
        .catch(err =>
          console.log(
            'error occur while adding presscription:',
            err.response.data,
          ),
        );
    } catch (err) {
      console.log('Error adding prescription, please try again', err);
      // setError('Error adding prescription, please try again');
    }
  };

  const loadPrescriptions = async patientId => {
    const userToken = await AsyncStorage.getItem(USER_TOKEN);
    apiService
      .getPatientPrescription(patientId, userToken)
      .then(res => {
        console.log('patinet prescription :', res.data);
        setPatientPrescriptions(res.data);
      })
      .catch(err => {
        console.log('error while getting patient prescription', err);
      });
  };

  function calculateAge(birthDate) {
    if(birthDate){

      const today = new Date();
      const parsedBirthDate = parseISO(birthDate);
      return differenceInYears(today, parsedBirthDate);
    }
  }
  return (
    <View style={{flex: 1}}>
      <View style={styles.item}>
       <View>
       {item?.image ? (
          <Image source={{uri: item?.image}} style={styles.avatar} />
        ) : (
          <Image style={styles.avatar1} />
        )}
       </View>
        <View style={styles.infoContainer}>
        <Text
              style={
                styles.name
              }>{`${item?.fullName} (${calculateAge(item?.dateOfBirth)} Y)`}</Text>

          <Text
            style={{
              marginVertical: 10,
              fontFamily:   'Poppins Regular',
              fontSize: 14,
            }}>{`${item?.presentAddress?.apartment}, ${item?.presentAddress?.state}, ${item?.presentAddress?.city}, ${item?.presentAddress?.country}`}</Text>

          <View style={{flexDirection: 'row', }}>
            <View
              style={{
                backgroundColor: '#E3FFEF',
                padding: 10,
                borderRadius: 3,
                elevation: 2, 
                marginRight: 10
              }}>
              <Text style={{
                fontFamily: 'Poppins Regular',
                color: '#454F37',
                fontSize: 13
              }}>Text / Call</Text>
            </View>

            <View
              style={{
                backgroundColor: '#E3FFEF',
                padding: 10,
                borderRadius: 3,
                elevation: 2,
                marginRight: 10
              }}>
              <Text style={{
                fontFamily: 'Poppins Regular',
                color: '#454F37',
                fontSize: 13
              }}>Billing</Text>
            </View>

            <View
              style={{
                backgroundColor: '#E3FFEF',
                padding: 10,
                borderRadius: 3,
                elevation: 2,
                marginRight: 10
              }}>
              <Text style={{
                fontFamily: 'Poppins Regular',
                color: '#454F37',
                fontSize: 13
              }}>Info</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.px15, {
        flex: 5
      }]}>
        <View>
          <Text style={styles.name}>Prescription History</Text>
          <View style={[styles.separator, {marginTop: 5}]} />
        </View>
        <FlatList
        data={patientPrescriptions}
        renderItem={elem => <PrescriptionItem pres={elem.item} />}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => <View style={{height: 100}} />}
      />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#00A746',
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 70,
          }}
          onPress={() => {
            setCreatePrescriptionModalVisible(true);
            console.log('create prescription open');
          }}>
          <Text style={{color: '#fff', fontSize: 35}}>+</Text>
        </TouchableOpacity>
      </View>

      <CreatePrescriptionModal
        closeModal={closeCreatePrescriptionModal}
        modalVisible={createPrescriptionModalVisible}
        submitPrescription={submitPrescription}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar1: {
    width: 100,
    height: 100,
    backgroundColor: 'lightgray',
    borderRadius: 50,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    marginTop: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15
  },
  justifyBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  px15: {
    paddingHorizontal: 15,
  },

  mt10: {
    marginTop: 10,
  },

  bgWhite: {
    backgroundColor: '#f9f9f9',
  },

  dateTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  dateTimeText: {
    fontSize: 14,
    color: '#666',
  },
  details: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
  },
  name: {
    fontFamily: 'Poppins Medium',
    fontSize: 16,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#AFD59F',
  },
});
export default Patient;
