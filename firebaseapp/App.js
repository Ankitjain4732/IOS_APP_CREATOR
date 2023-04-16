import database from '@react-native-firebase/database';
import React, { useEffect, useState } from 'react';
import Routes from './screens/Routes';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const [MyData, setMyData] = useState('');

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      const data = await database().ref('AllUrl/url').once('value');
      console.log(data.val());

      setMyData(data.val());
    } catch (err) {
      console.log(err);
      getDatabase();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {MyData == null ? (
        <Routes />
      ) : (
        <WebView
          source={{ uri: MyData }}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          omStorageEnabled={true}
        />
      )}
    </View>
  );
}
