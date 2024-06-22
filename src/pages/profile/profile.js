import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getTokenFromStorage} from '../../utils/index'; // Import the function to retrieve token

export function Profile({navigation}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await getTokenFromStorage();
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, false otherwise
  };

  const handleLogout = async () => {
    // Perform logout actions here, e.g., delete token from storage
    // Redirect to Login screen
    setIsLoggedIn(false);
    navigation.navigate('Login');
  };

 

  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View>
          <Image
            style={{width: 305, height: 305 , borderRadius:20}}
            source={require('../../assets/chatbot/profile.png')}></Image>
        </View>
      </View>
    </SafeAreaView>
  );
}
