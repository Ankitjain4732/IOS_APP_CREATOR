// import { BottomTabBar } from "@react-navigation/bottom-tabs";
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PolicyScreen from './PolicyScreen';
import TermScreen from './TermScreen';

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator initialRouteName="TermScreen">
      <Tab.Screen
        name="Custom Color"
        component={TermScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <Image
                style={{width: 30, height: 30}}
                source={require('./Img/contract.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Saved Color"
        component={PolicyScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <Image
                style={{width: 25, height: 25}}
                source={require('./Img/privacy.png')}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default MainScreen;
