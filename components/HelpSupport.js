import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
const HelpSupport = props => {
  return (
    <>
      <View style={styles.main}>
        <View>
          <Text style={styles.bill}>Help & Support </Text>
        </View>

        <View style={styles.editable}>
          <View>
            <Text style={styles.name}>Full Name </Text>

            <TextInput placeholder="Zahir Raihan" style={styles.input1} />
          </View>

          <View>
            <Text style={styles.name}>Email </Text>

            <TextInput placeholder="you@company.com" style={styles.input1} />
          </View>

          <View>
            <Text style={styles.name}>Phone number </Text>

            <TextInput placeholder="+1 (555) 000-0000" style={styles.input1} />
          </View>

          <View>
            <Text style={styles.name}>Message </Text>

            <TextInput
              placeholder="Leave us a message..."
              style={styles.input2}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.buton}>
              <Text style={[styles.txt, {color: '#fff'}]}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  editable: {},

  bill: {
    fontFamily: 'Poppins Medium',
    fontSize: 14,
    color: '#192608',
  },

  name: {
    fontFamily: 'Poppins Regular',

    fontSize: 14,
    fontWeight: '500',

    color: '#344054',
    marginTop: 15,
  },
  input1: {
    width: '98%',
    height: 52,
    fontFamily: 'Poppins Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 26,
    letterSpacing: 0,
    textAlign: 'left',
    borderWidth: 1,
    borderColor: '#AFD59F',
    borderRadius: 6,

    paddingLeft: 10,
  },

  input2: {
    width: '98%',
    height: 72,
    fontFamily: 'Poppins Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 26,
    letterSpacing: 0,
    textAlign: 'left',
    borderWidth: 1,
    borderColor: '#AFD59F',
    borderRadius: 6,

    paddingLeft: 10,
  },

  buton: {
    height: 50,
    width: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    padding: 12,
    marginTop: 50,
  },
  txt: {
    fontFamily: 'Poppins Regular',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.05,
    textAlign: 'center',
  },
});
export default HelpSupport;
