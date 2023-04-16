import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

const SplashScreen = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('MainScreen');
    }, 2000);
  });
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{ height: '100%', width: '100%' }}
        source={require('./Img/splash.png')}
        resizeMode="cover"
      />
    </View>
  );
};

export default SplashScreen;
