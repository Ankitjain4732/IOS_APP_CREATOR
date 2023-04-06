import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './SplashScreen';
import MainScreen from './MainScreen';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown: false}} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

export default Routes;