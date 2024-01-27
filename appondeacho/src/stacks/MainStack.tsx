import 'react-native-gesture-handler'
import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Preload from '../screens/Preload'
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import { Text } from 'react-native';
const {Navigator,Screen} = createNativeStackNavigator()



export default function MainStack() {
  return (
    <Navigator
      initialRouteName='Preload'
      screenOptions={{
        headerShown:false
      }}
    >
      <Screen name="Preload" component={Preload} />
      {/* <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} /> */}
<Text>tetetett</Text>
    </Navigator>
  );
}
