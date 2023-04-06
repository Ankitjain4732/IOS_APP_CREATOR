import database from '@react-native-firebase/database';
import React, {useEffect, useState, Component, useRef} from 'react';
// import React, { Component } from "react";
import Routes from './screens/Routes';
import {Text, View, ScrollView, Alert, BackHandler} from 'react-native';
import {WebView} from 'react-native-webview';

export default function App() {
  const [MyData, setMyData] = useState('');
  const webviewRef = useRef(null);

  setInterval(() => {
    getDatabase();
  }, 1000);

  useEffect(() => {
    getDatabase();
  }, []);

  const handleBackButton = () => {
    if (webviewRef.current) {
      webviewRef.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const getDatabase = async () => {
    try {
      const data = await database().ref('users/name').once('value');
      console.log(data);

      setMyData(data.val());
    } catch (err) {
      console.log(err);
    }
  };

  const onNavigationStateChange = navState => {
    console.log(navState);
    // track navigation state changes here
  };

  return (
    <View style={{flex: 1}}>
      {MyData == null ? (
        <Routes />
      ) : (
        <WebView
          ref={webviewRef}
          source={{uri: MyData}}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          omStorageEnabled={true}
          onNavigationStateChange={onNavigationStateChange}
        />
      )}
    </View>
  );
}
