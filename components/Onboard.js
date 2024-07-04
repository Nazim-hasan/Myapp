import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";

const dimention = Dimensions.get('screen');
const Onboard = (props) => {

  return (
    <View style={styles.onboard}>
      <Image
        style={styles.images}
        source={require('../assets/logo.png')}
      />
      <View>
        <Text style={styles.head}>Hundreds of years of patient data will now be protected.  </Text>

        <Image
          style={[styles.coverimage,{marginTop: dimention.height/4}]}
          source={require('../assets/cover.png')}
        />
      </View>
      <TouchableOpacity style={styles.buttonWrapper} onPress={() => props.navigation.navigate("signin")}>
          <Text style={styles.buton}>Get Started </Text>
        </TouchableOpacity>
    </View>

  );


};

const styles = StyleSheet.create({

  onboard: {
    backgroundColor: '#fff',
    flex: 1,
    width: "100%",
    overflow: "hidden",
    position:'relative'
  },
  images: {
    height: 38,
    width: 187,
    top: 103,
    marginLeft: 90,

  },
  head: {
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
    paddingHorizontal:20

  },
  coverimage: {
    height: 190,
    width: 240,
    alignSelf: 'center'

  },
  buton: {
    height: 52,
    width: 332,
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins',
    lineHeight: 20.8,
    padding: 12,
    marginTop: 20,
    alignSelf:'center'
  },
  buttonWrapper:{
    marginTop:50
  }

});
export default Onboard;

