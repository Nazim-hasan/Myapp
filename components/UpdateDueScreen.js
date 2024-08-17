import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_TOKEN} from './Signin';
import {apiService} from '../src/services/api-service';

const UpdateDueScreen = () => {
  const [totalDue, setTotalDue] = useState(0);
  const [received, setReceived] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const billingInfo = route.params.billingInfo;

  const handleSubmit = async () => {
    const payload = {
      billing: {
        totalAmount: totalDue,
        receivedAmount: received,
        dueAmount: totalDue - received,
      },
    };
    console.log('payload', payload);
    const token = await AsyncStorage.getItem(USER_TOKEN);
    try {
      await apiService
        .updateDue(payload, token, billingInfo?._id)
        .then(res => {
          console.log('update due response ::::', res.data);
          navigation.navigate('finance');
        })
        .catch(err => console.log('Catch update billing error:', err.message));
    } catch (err) {
      console.log('Try:', err);
      setError('Error adding doctor, please try again');
    }
  };

  useEffect(() => {
    if (billingInfo) {
      setTotalDue(billingInfo.billing?.totalAmount);
      setReceived(billingInfo?.billing?.receivedAmount);
    }
  }, [billingInfo]);

  return (
    <View
      style={{
        margin: 20,
        flex: 1,
      }}>
      <View
        style={{
          flex: 0.6,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Text style={styles.text}>Patient</Text>
          <Text>Total</Text>
          <Text>Received</Text>
          <Text>Due</Text>
        </View>
        <View
          style={{
            marginVertical: 10,
            borderWidth: 0.2,
            borderColor: '#AFD59F',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Text style={styles.text}>{billingInfo?.patient?.fullName}</Text>
          <Text style={styles.text}>{billingInfo.billing?.totalAmount}</Text>
          <Text style={styles.text}>
            {' '}
            {billingInfo?.billing?.receivedAmount}
          </Text>
          <Text style={styles.text}>{billingInfo?.billing?.dueAmount}</Text>
        </View>
      </View>

      <View
        style={{
          flex: 3.5,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins Medium',
            fontSize: 16,
            marginBottom: 10,
          }}>
          Update Due
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 1,
              marginRight: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins Regular',
                fontSize: 14,
              }}>
              Total Due
            </Text>
            <TextInput
              placeholder={`${totalDue}`}
              value={totalDue}
              onChangeText={setTotalDue}
              style={{
                borderWidth: 1,
                borderColor: '#AFD59F',
                borderRadius: 8,
                paddingLeft: 10,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins Regular',
                fontSize: 14,
              }}>
              Received
            </Text>
            <TextInput
              placeholder={`${received}`}
              value={received}
              onChangeText={setReceived}
              style={{
                borderWidth: 1,
                borderColor: '#AFD59F',
                borderRadius: 8,
                paddingLeft: 10,
              }}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 15,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins Regular',
              fontSize: 14,
              marginBottom: 5,
            }}>
            Remaining Due
          </Text>
          <View
            style={{
              backgroundColor: '#DFE1DE',
              borderRadius: 8,
              paddingLeft: 10,
              paddingVertical: 12,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins Regular',
                fontSize: 14,
              }}>
              {totalDue - received}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: '#4CAF50',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins Regular',
            color: 'white',
            textAlign: 'center',
          }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateDueScreen;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins Regular',
    textAlign: 'center',
  },
});
