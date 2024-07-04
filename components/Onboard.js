import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const dimention = Dimensions.get('screen');
const Onboard = props => {
  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <SafeAreaView style={styles.onboard}>
        {/* Image container  */}
        <View
          style={{
            flex: 0.4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image style={styles.images} source={require('../assets/logo.png')} />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              marginBottom: 10,
            }}>
            <Text style={styles.head}>
              Hundreds of years of patient data will
            </Text>
            <Text style={styles.head}>now be protected.</Text>
          </View>
          <Image
            style={[styles.coverImage, {marginTop: 12}]}

            source={require('../assets/cover.png')}
          />
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => props.navigation.navigate('signin')}>
            <Text style={styles.buton}>Get Started </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  onboard: {
    backgroundColor: '#fff',
    flex: 1,
  },
  images: {
    height: 38,
    width: 187,
  },
  head: {
    fontSize: 17,
    lineHeight: 27,
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
    color: '#192608',
  },
  coverImage: {
    height: 250,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  buton: {
    width: '95%',
    backgroundColor: '#4CAF50',
    borderRadius: 13,
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Poppins Medium',
    lineHeight: 20.8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
});
export default Onboard;
