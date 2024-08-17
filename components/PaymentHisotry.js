import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PaymentHisotry = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <View style={styles.main}>
        <View style={styles.profile}>
          <Image style={styles.imge} />

          <View style={styles.drinfo}>
            <Text
              style={{
                fontFamily: 'Poppins Medium',
                color: '#192608',
                fontSize: 15,
              }}>
              Zahir Raihan, (21 Y)
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins Regular',
                color: '#4F4F4F',
                fontSize: 14,
              }}>
              Datmondol, Haluagat, Nasirnagar
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins Regular',
                color: '#4F4F4F',
                fontSize: 14,
              }}>
              Chattogram, Bangladesh
            </Text>
            {/* <Image source={require('../assets/pjh.png')}/>  */}
          </View>
        </View>

        <View style={styles.table}>
          <Text style={styles.prtable}>Date</Text>
          <Text style={styles.table1}>Total</Text>
          <Text style={styles.table1}>Received</Text>
          <Text style={styles.table1}>Due </Text>
        </View>
        <View style={styles.line2}></View>

        <View>
        <View style={{
         flexDirection: 'row',
         justifyContent: 'space-around',
         marginTop: 10,
        }}>
          <Text style={styles.prtable1}>22 Mar 2023</Text>
          <Text style={styles.table2}>780</Text>
          <Text style={styles.table2}>500</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text style={styles.table2}>280 </Text>
          <Image
              source={require('../assets/draft/dot.png')}
              style={styles.img}
            />
          </View>
        </View>
          <TouchableOpacity onPress={() => setVisible(true)}>

            
            
          </TouchableOpacity>

          <Modal transparent visible={visible} animationType="fade">
            {/* <SafeAreaView style={styles.modal} onTouchStart={()=> setVisible(false)}> */}
            <View style={styles.modal}>
              <TouchableOpacity
                onPress={() => navigation.navigate('paymenthistory')}>
                <Text style={styles.paymenthis}> Update Bill</Text>
              </TouchableOpacity>

              <Text
                style={{
                  margin: 5,
                  fontSize: 16,
                  color: '#4F4F4F',
                  fontWeight: '400',
                }}>
                {' '}
                Text/Call{' '}
              </Text>
            </View>
            {/* </SafeAreaView> */}
          </Modal>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    height: 920,
    overflow: 'hidden',
  },
  profile: {
    flexDirection: 'row',
    marginTop: 40,
    marginHorizontal: 10,
  },

  imge: {
    width: 75,
    height: 75,
    backgroundColor: 'lightgray',
    borderRadius: 50,
    padding: 10,
    marginTop: 5,
  },
  drinfo: {
    marginLeft: 10,
    marginTop: 10,
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 40,
  },
  prtable: {
   fontFamily: 'Poppins Medium',
   color: '#717967'
  },
  prtable1: {
   fontFamily: 'Poppins Medium',
   color: '#717967',
   textAlign: 'center',
   width: '25%'
  },
  table1: {
   fontFamily: 'Poppins Medium',
   color: '#717967'
  },
  table2: {
   fontFamily: 'Poppins Regular',
   color: '#192608',
   textAlign: 'center',
   width: '25%'
  },

  line2: {
    width: '95%',
    borderWidth: 0.2,
    borderColor: '#AFD59F',
  },
  img: {
   
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
});
export default PaymentHisotry;
