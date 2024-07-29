/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {StatusBar, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Addpatient from './components/Addpatient';
import Createacount from './components/Createacount';
import Drafts from './components/Drafts';
import Drprofile from './components/Drprofile';
import Editpatient from './components/Editpatient';
import Editprofile from './components/Editprofile';
import Finance from './components/Finance';
import HelpSupport from './components/HelpSupport';
import Maindashboard from './components/Maindashboard';
import Onboard from './components/Onboard';
import Patientdashboard from './components/Patientdashboard';
import Patientprofile from './components/Patientprofile';
import PaymentHisotry from './components/PaymentHisotry';
import Profile from './components/Profile';
import Signin, {USER_TOKEN} from './components/Signin';
import Terms from './components/Terms';
import Verfication from './components/Verfications';
import Patient from './components/Patient';
import AddFinence from './components/AddFinence';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SheetProvider} from 'react-native-actions-sheet';
import UpdateDueScreen from './components/UpdateDueScreen';
import UpdateBillScreen from './components/UpdateBillScreen';
import Toast from 'react-native-toast-message';
import ForgetPassword from './components/ForgetPassword';

const stack = createNativeStackNavigator();

function App() {
  // const [token, setToken] = useState("");
  // useEffect(() => {
  //   const loadToken = async () => {
  //     const tkn = await AsyncStorage.getItem(USER_TOKEN);
  //     setToken(tkn)
  //   }
  //   loadToken();
  //   console.log("user token at app.js :",token)
  // }, []);

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  return (
    <SheetProvider>
      <NavigationContainer theme={navTheme}>
        <stack.Navigator>
          <stack.Screen
            name="Home"
            component={Onboard}
            options={{
              headerShown: false,
            }}
          />
          <stack.Screen
            name="signin"
            component={Signin}
            options={{
              headerShown: false,
            }}
          />
          <stack.Screen
            name="forgetPassword"
            component={ForgetPassword}
            options={{
              headerShown: false,
            }}
          />
          <stack.Screen
            name="create"
            component={Createacount}
            options={{
              headerShown: false,
            }}
          />
          <stack.Screen
            name="verify"
            component={Verfication}
            options={{
              headerShown: false,
            }}
          />
          <stack.Screen
            name="dashboard"
            component={Maindashboard}
            options={{
              headerShown: false,
              statusBarColor: '#006735',
            }}
          />

          <stack.Screen
            name="finance"
            component={Finance}
            options={{
              headerShown: false,
              statusBarColor: '#006735',
            }}
          />

          <stack.Screen
            name="patientdashboard"
            component={Patientdashboard}
            options={{
              headerShown: false,
              statusBarColor: '#006735',
            }}
          />

          <stack.Screen
            name="addpatient"
            component={Addpatient}
            options={{
              statusBarColor: '#006735',
              headerStyle: {
                backgroundColor: '#00A746',
              },
              headerTintColor: 'white',
              headerTitle: props => (
                <Text
                  style={{
                    fontFamily: 'Poppins Regular',
                    color: 'white',
                    fontSize: 14,
                    marginLeft: -25,
                    marginTop: 3,
                  }}>
                  Add new patient
                </Text>
              ),
            }}
          />

          <stack.Screen
            name="editprofile"
            component={Editprofile}
            options={{
              statusBarColor: '#006735',
              headerStyle: {
                backgroundColor: '#00A746',
              },
              headerTintColor: 'white',
              headerTitle: props => (
                <Text
                  style={{
                    fontFamily: 'Poppins Regular',
                    color: 'white',
                    fontSize: 14,
                    marginLeft: -25,
                    marginTop: 3,
                  }}>
                  Edit Profile
                </Text>
              ),
            }}
          />

          <stack.Screen
            name="profile"
            component={Profile}
            options={{
              statusBarColor: '#006735',
              headerStyle: {
                backgroundColor: '#00A746',
              },
              headerTintColor: 'white',
              headerTitle: props => (
                <Text
                  style={{
                    fontFamily: 'Poppins Regular',
                    color: 'white',
                    fontSize: 14,
                    marginLeft: -25,
                    marginTop: 3,
                  }}>
                  Profile
                </Text>
              ),
            }}
          />

          <stack.Screen
            name="drprofile"
            component={Drprofile}
            options={{
              statusBarColor: '#006735',
              headerStyle: {
                backgroundColor: '#00A746',
              },
              headerTintColor: 'white',
              headerTitle: props => (
                <Text
                  style={{
                    fontFamily: 'Poppins Regular',
                    color: 'white',
                    fontSize: 14,
                    marginLeft: -25,
                    marginTop: 3,
                  }}>
                  Dr Profile
                </Text>
              ),
            }}
          />

          <stack.Screen
            name="drafts"
            component={Drafts}
            options={{
              statusBarColor: '#006735',
              headerStyle: {
                backgroundColor: '#00A746',
              },
              headerTintColor: 'white',
              headerTitle: props => (
                <Text
                  style={{
                    fontFamily: 'Poppins Regular',
                    color: 'white',
                    fontSize: 14,
                    marginLeft: -25,
                    marginTop: 3,
                  }}>
                  Drafts Data
                </Text>
              ),
            }}
          />

          <stack.Screen
            name="helpsupport"
            component={HelpSupport}
            options={{
              statusBarColor: '#006735',
              headerStyle: {
                backgroundColor: '#00A746',
              },
              headerTintColor: 'white',
              headerTitle: props => (
                <Text
                  style={{
                    fontFamily: 'Poppins Regular',
                    color: 'white',
                    fontSize: 14,
                    marginLeft: -25,
                    marginTop: 3,
                  }}>
                  Help & Support
                </Text>
              ),
            }}
          />
          <stack.Screen
            name="terms"
            component={Terms}
            options={{
              statusBarColor: '#006735',
              headerStyle: {
                backgroundColor: '#00A746',
              },
              headerTintColor: 'white',
              headerTitle: props => (
                <Text
                  style={{
                    fontFamily: 'Poppins Regular',
                    color: 'white',
                    fontSize: 14,
                    marginLeft: -25,
                    marginTop: 3,
                  }}>
                  Terms & Conditions
                </Text>
              ),
            }}
          />
          <stack.Screen
            name="paymenthistory"
            component={PaymentHisotry}
            options={{
              statusBarColor: '#006735',
              headerStyle: {
                backgroundColor: '#00A746',
              },
              headerTintColor: 'white',
              headerTitle: props => (
                <Text
                  style={{
                    fontFamily: 'Poppins Regular',
                    color: 'white',
                    fontSize: 14,
                    marginLeft: -25,
                    marginTop: 3,
                  }}>
                  Payment History
                </Text>
              ),
            }}
          />

          <stack.Screen
            name="patient"
            component={Patient}
            options={{
              statusBarColor: '#006735',
              headerStyle: {
                backgroundColor: '#00A746',
              },
              headerTintColor: 'white',
              headerTitle: props => (
                <Text
                  style={{
                    fontFamily: 'Poppins Regular',
                    color: 'white',
                    fontSize: 14,
                    marginLeft: -25,
                    marginTop: 3,
                  }}>
                  Patient Profile
                </Text>
              ),
            }}
          />

          <stack.Screen
            name="editpatient"
            component={Editpatient}
            options={{
              statusBarColor: '#006735',
              headerStyle: {
                backgroundColor: '#00A746',
              },
              headerTintColor: 'white',
              headerTitle: props => (
                <Text
                  style={{
                    fontFamily: 'Poppins Regular',
                    color: 'white',
                    fontSize: 14,
                    marginLeft: -25,
                    marginTop: 3,
                  }}>
                  Edit Patient
                </Text>
              ),
            }}
          />

          <stack.Screen
            name="updateDue"
            component={UpdateDueScreen}
            options={{
              statusBarColor: '#006735',
              headerStyle: {
                backgroundColor: '#00A746',
              },
              headerTintColor: 'white',
              headerTitle: props => (
                <Text
                  style={{
                    fontFamily: 'Poppins Regular',
                    color: 'white',
                    fontSize: 14,
                    marginLeft: -25,
                    marginTop: 3,
                  }}>
                  Update Due
                </Text>
              ),
            }}
          />
          <stack.Screen
            name="updateBill"
            component={UpdateBillScreen}
            options={{
              statusBarColor: '#006735',
              headerStyle: {
                backgroundColor: '#00A746',
              },
              headerTintColor: 'white',
              headerTitle: props => (
                <Text
                  style={{
                    fontFamily: 'Poppins Regular',
                    color: 'white',
                    fontSize: 14,
                    marginLeft: -25,
                    marginTop: 3,
                  }}>
                  Update Bill
                </Text>
              ),
            }}
          />
          <stack.Screen name="patientprofile" component={Patientprofile} />

          <stack.Screen name="addfinance" component={AddFinence} />
        </stack.Navigator>
      </NavigationContainer>
    </SheetProvider>
  );
}

export default App;
