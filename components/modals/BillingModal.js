import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

const BillingContextModal = ({prescriptionId, handleOption, billingInfo}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({x: 0, y: 0});

  const navigation = useNavigation();


  const showModal = event => {
    setButtonPosition({x: event.nativeEvent.pageX, y: event.nativeEvent.pageY});
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dotButton} onPress={showModal}>
        <Text style={styles.dotText}>⋮</Text>
      </TouchableOpacity>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}>
        <TouchableOpacity style={styles.overlay} onPress={hideModal}>
          <View
            style={[
              styles.modalView,
              {top: buttonPosition.y, left: buttonPosition.x - 150},
            ]}>

            <TouchableOpacity
              onPress={() => {
                hideModal();
                navigation.navigate("updateDue",{
                  billingInfo
                })
              }}>
              <View style={styles.flex_row}>
                <Image
                  source={require('../../assets/social/pencil.png')}
                  style={styles.listIcon}
                />
                <Text style={styles.modalText}>Update Due</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.separator}></View>

            <TouchableOpacity
              onPress={() => {
                hideModal();
                
                navigation.navigate("updateBill", {
                  billingInfo
                })
              }}>
              <View style={styles.flex_row}>
                <Image
                  source={require('../../assets/social/shere.png')}
                  style={styles.listIcon}
                />
                <Text style={styles.modalText}>Update Bill</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.separator}></View>
            <TouchableOpacity
              onPress={() => {
                hideModal();
                handleOption();
              }}>
              <View style={styles.flex_row}>
                <Image
                  source={require('../../assets/social/delete.png')}
                  style={styles.listIcon}
                />
                <Text style={styles.modalText}>Text/Call</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: -10,
    top: -10,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  dotButton: {
    padding: 10,
    // backgroundColor: '#ddd',
    borderRadius: 5,
  },
  dotText: {
    fontSize: 24,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    position: 'absolute',
    width: 150,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  modalText: {
    fontFamily: 'Poppins Regular',
    fontSize: 13,
    marginVertical: 5,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
  flex_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
});

export default BillingContextModal;
