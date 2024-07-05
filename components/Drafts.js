import {useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import draftDoc from '../testdata/draft-data';
import PatientModal from './modals/PatientModal';
import ContextModal from './modals/ContextModal';
import ArrowDownIcon from '../assets/svg/arrow-down';
import FilterIcon from '../assets/svg/filter';

const Drafts = props => {
  const [selectedOption, setSelectedOption] = useState('');
  // const [optionVisible, setOptionVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const closeModal = () => {
    setSelectedOption('');
    setModalVisible(false);
  };

  const handleOption = () => {
    // setSelectedItem(item);
    setModalVisible(!modalVisible);
  };

  const confirmDelete = () => {
    // Perform deletion logic here
    setModalVisible(false);
    console.log(`Deleting item: ${selectedItem.name}`);
  };

  const draftItem = data => {
    const {item} = data;
    console.log('item.date', item.date)
    return (
      <View style={styles.item}>
        <Image source={{uri: item.avatarUrl}} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <View style={styles.dateTime}>
            <Text style={styles.dateTimeText}>{item.date}</Text>
            <Text style={styles.dateTimeText}>{item.time}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.name}>{item.experience}</Text>
            <Text style={styles.name}>{item.location}</Text>
          </View>
        </View>
        <ContextModal handleOption={handleOption} />
        {/* <TouchableOpacity onPress={() => handleOption(item)}
                    style={{ paddingLeft: 10, width: 10, justifyContent: 'center' }}>
                    <Image source={require('../assets/draft/dot.png')} />
                </TouchableOpacity> */}
      </View>
    );
  };
  return (
    <>
      <View style={styles.main}>
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
                fontFamily: 'Poppins Regular',
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
                fontFamily: 'Poppins Regular',
                fontSize: 14,
                color: '#192608',
                marginRight: 8,
              }}>
              Filter
            </Text>
            <FilterIcon />
          </View>
        </View>

        <FlatList
          data={draftDoc}
          renderItem={draftItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      <PatientModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        selectedItem={selectedItem}
        confirmDelete={confirmDelete}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
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
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  info1: {
    top: 40,
    left: 16,
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
    top: 40,
    left: 136,
  },
  tcxt1: {
    width: 80,
    height: 31,
    borderRadius: 3,
    elevation: 4,
    backgroundColor: '#E3FFEF',
    // color: ' #192608',
    fontSize: 14,

    left: 5,
  },
  img: {
    top: 90,
    left: '90%',
  },

  ///
  item: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 15,
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
    fontSize: 13,
    color: '#717967',
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
    height: 1,
    width: '100%',
    backgroundColor: '#AFD59F',
  },
});
export default Drafts;
