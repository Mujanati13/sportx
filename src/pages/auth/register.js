import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import {getToken, storeToken, checkIfLoggedIn} from '../../utils/db'; // Importer la fonction checkIfLoggedIn
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {SelectList} from 'react-native-dropdown-select-list';

function Register({navigation}) {
  const [loading, setLoading] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const redirectionSiConnecte = async () => {
      const estConnecte = await checkIfLoggedIn(); // Vérifier si l'utilisateur est connecté
      if (estConnecte) {
        navigation.replace('Accueil'); // Rediriger vers PickStudent si l'utilisateur est déjà connecté
      }
    };

    redirectionSiConnecte(); // Appeler la fonction au montage du composant
  }, []); // Le tableau de dépendances vide assure que l'effet ne s'exécute qu'une seule fois au montage du composant

  const handleRegister = async () => {
    // Form validation checks
    // ...

    setLoading(true);
    try {
      const response = await fetch(
        'https://fithouse.pythonanywhere.com/api/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            civilite: selectedTitle,
            nom_client: nom,
            prenom_client: prenom,
            tel: tel,
            mail: email,
            password: password,
            ville: 1,
            date_inscription: "2024-04-22"
          }),
        },
      );

      if (!response.ok) {
        console.log('====================================');
        console.log(response);
        console.log('====================================');
      }

      Alert.alert('Registration ok.');
      navigation.navigate("Login")
    } catch (error) {
      Alert.alert('Registration failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const datas = [
    {key: '1', value: 'Monsieur'},
    {key: '2', value: 'Madame'},
    {key: '3', value: 'Mademoiselle'},
  ];

  const datas2 = [
    {key: '1', value: 'Ville'},
    {key: '1', value: 'Fes'},
    {key: '2', value: 'Rabat'},
    {key: '3', value: 'Casa'},
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <ProgressSteps>
          <ProgressStep label="1" nextBtnText={'Continue'}>
            <View style={{alignItems: 'center', width: 'auto', marginTop: 50}}>
              <View style={{width: 250}}>
                <SelectList
                  setSelected={setSelectedTitle}
                  data={datas}
                  save="value"
                  defaultOption={{key: '1', value: 'Monsieur'}}
                />
              </View>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#E0FAE0',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  height: 60,
                  fontSize: 15,
                  marginTop: 10,
                  color: 'black',
                  width: 250,
                }}
                onChangeText={setNom}
                placeholder="Nom"
                autoCapitalize="none"
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#E0FAE0',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  height: 60,
                  fontSize: 15,
                  marginTop: 10,
                  color: 'black',
                  width: 250,
                }}
                placeholder="Prenom"
                autoCapitalize="none"
                onChangeText={setPrenom}
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#E0FAE0',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  height: 60,
                  fontSize: 15,
                  marginTop: 10,
                  color: 'black',
                  width: 250,
                }}
                placeholder="Tel"
                autoCapitalize="none"
                onChangeText={setTel}
              />
            </View>
          </ProgressStep>
          <ProgressStep label="2" nextBtnText={'Continue'}>
            <View style={{alignItems: 'center', width: 'auto', marginTop: 50}}>
              <View style={{width: 250}}>
                <SelectList
                  search={false}
                  setSelected={setSelectedCity}
                  data={datas2}
                  save="value"
                  defaultOption={{key: '0', value: 'Ville'}}
                />
              </View>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#E0FAE0',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  height: 60,
                  fontSize: 15,
                  marginTop: 10,
                  color: 'black',
                  width: 250,
                }}
                onChangeText={setEmail}
                placeholder="Email"
                autoCapitalize="none"
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#E0FAE0',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  height: 60,
                  fontSize: 15,
                  marginTop: 10,
                  color: 'black',
                  width: 250,
                }}
                placeholder="Mote de passe"
                autoCapitalize="none"
                onChangeText={setPassword}
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#E0FAE0',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  height: 60,
                  fontSize: 15,
                  marginTop: 10,
                  color: 'black',
                  width: 250,
                }}
                placeholder="Confirmer Mote de passe"
                autoCapitalize="none"
                onChangeText={setConfirmPassword}
              />
            </View>
          </ProgressStep>
          <ProgressStep label="3" onSubmit={handleRegister}>
            <View style={{alignItems: 'center'}}>
              <Text>Review your data before submitting</Text>
              <Text>{selectedCity}</Text>
              <Text>{nom}</Text>
              <Text>{prenom}</Text>
              <Text>{tel}</Text>
              <Text>{email}</Text>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
  );
}

export default Register;
