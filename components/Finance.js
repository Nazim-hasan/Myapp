import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { apiService } from '../src/services/api-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_ID, USER_TOKEN } from './Signin';


const Finance = (props) => {
  const [allPatient, setAllPatient] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const [bills, setBills] = useState([])

  useEffect(() => {
    // const userId = AsyncStorage.getItem(USER_ID);
    // apiService.getAllBill({ userId }).then((res) => {
    //   console.log("Finance: ", res.data.data);
    //   setBills(res?.data?.data || [])
    // }).catch(err => console.log(err))
    loadPatient();
  }, [])


  const loadPatient = async () => {
    const token = await AsyncStorage.getItem(USER_TOKEN);

    await apiService.getAllPatient(token).then((res) => {
      const data = res.data.patients.map(item => { return { id: item._id, ...item } });
      console.log("token at finance", data)
      setAllPatient(data);
      setLoading(false)
    }).catch((err) => {
      setLoading(false);
      console.log("patient dashboard data loading :", err);
    });
  }

  const billedItem = (data) => {
    const { item } = data;
    console.log("item :", item)
    return (
      <Pressable style={styles.item} onPress={() => navigation.navigate('patient', { item })} >
        <View style={{flexDirection:'row', justifyContent:'space-around', paddingVertical:10}}>
            <Text style={styles.name}>{item.fullName}</Text>
            <Text style={styles.name}>{item?.totalBill}</Text>
            <Text style={styles.name}>{item?.receivedBill}</Text>
            <Text style={styles.name}>{item?.DueBill}</Text>
          
        </View>
      </Pressable>
    )
  }


  return (
    <>
      <View style={styles.main}>
        <View style={styles.finoverview}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding:15 }}>
            <Text style={styles.txt1}> Finance Overview </Text>
            <Text style={styles.txt2}> Today's </Text>
          </View>
          <View style={styles.line}></View>

          <View style={styles.scndoverview}>
            <View style={styles.overvieww1}>
              <Image source={require('../assets/dashboard/dollar.png')} style={styles.bill1} />
              <Text style={styles.num1}>0</Text>
              <Text style={styles.billtxt}>Todays Earning </Text>
            </View>

            <View style={styles.overvieww2}>
              <Image source={require('../assets/dashboard/calender.png')} style={styles.bill1} />
              <Text style={styles.num1}>0</Text>
              <Text style={styles.billtxt1}>Due </Text>
            </View>
          </View>

        </View>

        <View >
          <Text style={styles.bill}>Patient Billing  </Text>
          <View style={styles.line1}></View>
        </View>


        <View style={styles.info} >
          <View style={styles.info1}>
            <Text style={styles.seven}> Last 7 Days </Text>
          </View>

          <View style={styles.info2}>
            <Text style={styles.tcxt1}> filter</Text>
          </View>
        </View>
        <View style={styles.table}>
          <Text >Patient </Text>
          <Text> Total </Text>
          <Text> Recieve</Text>
          <Text> Due </Text>

        </View>
        <View style={styles.separator}></View>

        <FlatList
          style={{ flex: 1 }}
          data={allPatient}
          renderItem={billedItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

        {/* <View>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Image source={require('../assets/draft/dot.png')} style={styles.img} />
          </TouchableOpacity>
          <Modal transparent visible={visible} animationType='fade'>
            <View style={styles.modal}>
              <Text style={{
                fontSize: 16, color: '#4F4F4F', fontWeight: '400', borderColor: '#A8A8A866', borderBottomWidth: 1,
              }}>Update Due </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate("paymenthistory")} >
                <Text style={styles.paymenthis}> Payment History
                </Text>
              </TouchableOpacity>

              <Text style={{
                margin: 5, fontSize: 16, color: '#4F4F4F', fontWeight: '400',
              }}>   Text/Call </Text>
            </View>

          </Modal>
        </View> */}


        <View style={{ ...styles.btmnav, }}>
          <View>
            <TouchableOpacity>
              <Image source={require('../assets/finance/home.png')} style={styles.btnavbar} />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity>
              <Image source={require('../assets/dashboard/patient.png')} style={styles.btnavbar} />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => {
              navigation.navigate('addfinance')
            }}>
              <Image source={require('../assets/dashboard/addicon.png')} style={{ top: -16, left: 10, }} />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity>
              <Image source={require('../assets/finance/finan.png')} style={styles.btnavbar} />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity>
              <Image source={require('../assets/dashboard/profile.png')} style={styles.btnavbar} />
            </TouchableOpacity>
          </View>

        </View>




      </View>
    </>

  );




};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc'
  },
  item: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginVertical: 8,
  },
  main: {
    backgroundColor: 'white',
    flex: 1,
    width: "100%",
    overflow: "hidden",
    paddingHorizontal: 15
  },

  finoverview: {
    elevation: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#83838340',
    borderWidth: 1,
    borderRadius: 6,

  },
  txt1: {
    color: '#4F4F4F',

  },

  txt2: {
    color: '#4F4F4F',

  },

  line: {
    marginTop: 20,
    borderWidth: 0.8,
    borderColor: '#AFD59F',


  },

  scndoverview: {
    flexDirection: 'row',
  },
  overvieww1: {
    width: 152,
    height: 120,
    backgroundColor: '#FAFFFC',
    elevation: 10,
    borderRadius: 6,
    margin: 5,
  },
  overvieww2: {
    width: 165,
    height: 120,
    backgroundColor: '#FAFFFC',
    elevation: 10,
    borderRadius: 6,
    margin: 5,
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
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '500',
    top: 35,
    left: 13,

  },


  line1: {
    width: 330,
    top: 48,
    left: 10,
    borderWidth: 0.8,
    borderColor: '#AFD59F',


  },


  info: {
    flexDirection: 'row',

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
    justifyContent:'space-around',
    marginTop: 90,
    paddingBottom:10
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
    position:'absolute',
    bottom:10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#B0B0B040',
    width:'100%',
    justifyContent:'center'
  },

  btnavbar: {
    top: 9,
    left: 10,
    margin: 10,
  },
  paymenthis: {
    margin: 5, fontSize: 16,
    color: '#F7BB07',
    fontWeight: '400',
    borderColor: '#A8A8A866',
    borderBottomWidth: 1,
  },

});
export default Finance; 