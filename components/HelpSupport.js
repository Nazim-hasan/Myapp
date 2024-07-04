import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
const HelpSupport = (props) => {

  return (
    <>

      <View style={styles.main}>
        <View >
          <Text style={styles.bill}>Help & Support </Text>
        </View>

        <View style={styles.editable}>

          <View>
            <Text style={styles.name}>Full Name  </Text>

            <TextInput
              placeholder="Email or Phone"
              style={styles.input1}
            />

          </View>













          <View>
            <Text style={styles.name}>Email  </Text>

            <TextInput

              style={styles.input1}
            />

          </View>




          <View>
            <Text style={styles.name}>Phone number  </Text>

            <TextInput

              style={styles.input1}
            />

          </View>




          <View>
            <Text style={styles.name}>Message </Text>

            <TextInput

              style={styles.input2}
            />

          </View>

          <View>
            <TouchableOpacity >
              <Text style={styles.buton}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>







      </View>

    </>

  );




};

const styles = StyleSheet.create({

  main: {
    backgroundColor: 'white',
    flex: 1,
    width: "100%",
    height: 1250,
    overflow: "hidden",
  },

  bill: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '700',
    top: 10,
    left: 20,
    color: '#192608',
  },

  name: {
    fontSize: 14,
    fontWeight: '500',
    top: 20,
    left: 20,
    color: '#868D7E',
  },
  input1: {

    width: 322,
    height: 52,
    top: '25%',
    left: 10,
    margin: 7,
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 26,
    letterSpacing: 0,
    textAlign: 'left',
    borderWidth: 1,
    borderColor: '#AFD59F',
    borderRadius: 6,

  },

  input2: {

    width: 322,
    height: 72,
    top: '25%',
    left: 10,
    margin: 7,
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 26,
    letterSpacing: 0,
    textAlign: 'left',
    borderWidth: 1,
    borderColor: '#AFD59F',
    borderRadius: 6,

  },


  buton: {
    height: 52,
    width: 332,
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    left: 12,
    top: 50,
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins',
    lineHeight: 20.8,

    padding: 12,

  },

});
export default HelpSupport; 