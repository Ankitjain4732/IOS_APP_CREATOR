import database from '@react-native-firebase/database';
import React, { useEffect, useState, Component } from 'react';
// import React, { Component } from "react";
import Routes from './screens/Routes'
import {
  Text,
  View, ScrollView, Alert
} from 'react-native';
import { WebView } from 'react-native-webview'

export default function App() {

  const [MyData, setMyData] = useState("");


  setInterval(() => {
    getDatabase();
  }, 1000)

  useEffect(() => {
    getDatabase();
  }, []);


  const getDatabase = async () => {
    try {
      const data = await database().ref("users/name").once("value");
      console.log(data);

      setMyData(data.val());

    } catch (err) {
      console.log(err);
    }

  };

  return (
    <View style={{ flex: 1 }}>
      {
        MyData == null
          ?
          <Routes />
          :
          <WebView
            source={{ uri: MyData }}
            startInLoadingState={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            omStorageEnabled={true}
          />

      }

    </View>

  );
}
