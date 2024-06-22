import React, {useState, useEffect} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Setting({navigation}) {
  const [appVersion, setAppVersion] = useState(1);

  useEffect(() => {
    fetchAppVersion();
  }, []);

  const fetchAppVersion = async () => {
    // try {
    //   const response = await fetch(
    //     'https://jyssrSport X.pythonanywhere.com/api/get_version',
    //   );
    //   const data = await response.json();
    //   setAppVersion(data.data.version);
    // } catch (error) {
    //   console.error('Error fetching app version:', error);
    // }
  };
  return (
    <ScrollView>
      <SafeAreaView
        style={{
          padding: 20,
          paddingTop: 20,
          flex: 1,
          //   backgroundColor: 'white',
        }}>
        {true && (
          <>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  style={{width: 40, height: 40, opacity: 0.3}}
                  source={require('../../assets/home/GoBackb.png')}
                />
              </TouchableOpacity>
              <Text style={{fontSize: 26, color: 'black', marginLeft: 10}}>
                Parametres
              </Text>
            </View>
            <View style={{marginTop: 20, paddingLeft: 5}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChangePassword');
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('../../assets/home/password.png')}></Image>
                  <Text style={{color: 'black', fontSize: 20, marginLeft: 15}}>
                    Changer mon mot de passe
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Help');
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('../../assets/home/help.png')}></Image>
                  <Text style={{color: 'black', fontSize: 20, marginLeft: 15}}>
                    Aide
                  </Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../../assets/home/delete.png')}></Image>
                <Text style={{color: 'black', fontSize: 20, marginLeft: 15}}>
                  Demand de suppression de compte
                </Text>
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
