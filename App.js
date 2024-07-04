/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Addpatient from './components/Addpatient';
import Createacount from './components/Createacount';
import Drafts from './components/Drafts';
import Drprofile from './components/Drprofile';
import Editpatient from './components/Editpatient';
import Editprofile from "./components/Editprofile";
import Finance from './components/Finance';
import HelpSupport from './components/HelpSupport';
import Maindashboard from './components/Maindashboard';
import Onboard from "./components/Onboard";
import Patientdashboard from './components/Patientdashboard';
import Patientprofile from './components/Patientprofile';
import PaymentHisotry from './components/PaymentHisotry';
import Profile from './components/Profile';
import Signin, { USER_TOKEN } from "./components/Signin";
import Terms from './components/Terms';
import Verfication from "./components/Verfications";
import Patient from './components/Patient';
import AddFinence from './components/AddFinence';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SheetProvider} from 'react-native-actions-sheet';

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

  return (
    <SheetProvider>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen name='Home' component={Onboard} options={{
            headerShown: false
          }}/>
          <stack.Screen name='signin' component={Signin} />
          <stack.Screen name='create' component={Createacount} />
          <stack.Screen name='verify' component={Verfication} />
          <stack.Screen name='dashboard' component={Maindashboard} />
          <stack.Screen name='drafts' component={Drafts} />
          <stack.Screen name='drprofile' component={Drprofile} />
          <stack.Screen name='profile' component={Profile} />
          <stack.Screen name='editprofile' component={Editprofile} />
          <stack.Screen name='finance' component={Finance} />
          <stack.Screen name='paymenthistory' component={PaymentHisotry} />
          <stack.Screen name='patientdashboard' component={Patientdashboard} />
          <stack.Screen name='addpatient' component={Addpatient} />
          <stack.Screen name='patientprofile' component={Patientprofile} />
          <stack.Screen name='editpatient' component={Editpatient} />
          <stack.Screen name='helpsupport' component={HelpSupport} />
          <stack.Screen name='terms' component={Terms} />
          <stack.Screen name='patient' component={Patient} />
          <stack.Screen name='addfinance' component={AddFinence} />
        </stack.Navigator>
      </NavigationContainer>

    </SheetProvider>
  );

}



export default App;

