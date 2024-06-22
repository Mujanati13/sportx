import React, {useState, useEffect} from 'react';
import {Image, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';

export default function Help({navigation}) {
  const [deviceName, setDeviceName] = useState('');
  const [systemVersion, setSystemVersion] = useState('');

  useEffect(() => {
    async function fetchDeviceInfo() {
      const name = await DeviceInfo.getDeviceName();
      const version = await DeviceInfo.getSystemVersion();

      setDeviceName(name);
      setSystemVersion(version);
    }

    fetchDeviceInfo();
  }, []);

  return (
    <SafeAreaView
      style={{
        padding: 20,
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{width: 40, height: 40, opacity: 0.5}}
            source={require('../../assets/home/GoBackb.png')}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'black', marginLeft: 10}}>Aide</Text>
      </View>
      <View style={{marginTop: 30, marginLeft: 5}}>
        <Text style={{fontSize: 19, fontWeight: 600, color: 'black'}}>
          Version de l'application: 0.1
        </Text>
        <Text
          style={{
            fontSize: 19,
            fontWeight: 600,
            color: 'black',
            marginTop: 15,
          }}>
          Nom de l'appareil : {deviceName&&deviceName}
        </Text>
        <Text
          style={{
            fontSize: 19,
            fontWeight: 600,
            color: 'black',
            marginTop: 15,
          }}>
          Nom systeme : {systemVersion&&systemVersion}
        </Text>
      </View>
    </SafeAreaView>
  );
}
