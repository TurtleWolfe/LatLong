//Expo Default Tabs Template.. Components Folder will have React & React Native
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
// expo install expo-location
import * as Location from 'expo-location';

export default function AppUseLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('null');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      //maybe better for mobile, unresponsive in FireFox browser
      // let location = await Location.getLastKnownPositionAsync({});
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);// useLocation Effect

  let text = 'Waiting..';
  let long = 'Waiting..';
  if (!location) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords.latitude);
    long = JSON.stringify(location.coords.longitude);
    // console.log(location.coords)
  }
  return (
    // location.coords
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <Text style={styles.paragraph}>{long}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // fontSize: 20,
    // fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});   //  app Use Location styles