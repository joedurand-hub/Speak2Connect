import React from 'react';

import {NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CallScreen from './screens/CallScreen';

const Stack = createNativeStackNavigator()

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: true}}/>
        <Stack.Screen name="CallScreen" component={CallScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
