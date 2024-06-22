import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import {getToken, getUserData} from '../../utils/db';

export function ChangePassword({navigation}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idParent, setIdParent] = useState(null);
  const [Password, setPassword] = useState('');

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      if(userData.date_inscription == ""){
        Alert.alert("Must activite your account first")
        return;
      }      const token = await getToken();
      const idParentData = await getUserData();
      const {password, ...rest} = idParentData;
      const response = await fetch(
        `https://fithouse.pythonanywhere.com/api/clients/`,
        {
          method: 'PUT',
          headers: {
            // Include the Authorization header with the token
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...rest,
            password: Password,
          }),
        },
      );
      if (response.ok) {
        Alert.alert('Profil utilisateur mis à jour avec succès');
        navigation.navigate('Home');
      } else {
        console.log(response);
        Alert.alert('Failed to update user profile');
      }
    } catch (error) {
      console.error('Error updating user profile: ', error);
    } finally {
      setLoading(false);
    }
  };

  if (false) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{width: 40, height: 40, opacity: 0.3}}
              source={require('../../assets/home/GoBackb.png')}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 20, color: 'black', marginLeft: 10}}>
            Modifier le mot de passe
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nouveau mot de passe"
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={handleUpdateProfile}>
            <Text style={styles.button}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  titleLogin: {
    fontSize: 28,
    fontWeight: '400',
    marginTop: 20,
    color: 'black',
  },
  inputContainer: {
    marginTop: 30,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0FAE0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: 60,
    fontSize: 15,
    marginTop: 10,
  },
  button: {
    textAlign: 'center',
    height: 60,
    padding: 15,
    backgroundColor: '#009CC6',
    marginTop: 40,
    color: 'white',
    borderRadius: 10,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 30,
  },
});
