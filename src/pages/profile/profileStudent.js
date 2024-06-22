import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getIdCoach, getToken} from '../../utils/db';

export default function CoachProfile({navigation}) {
  const [etablissementData, setEtablissementData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [professors, setProfessors] = useState([]);
  const fetchProfessors = async () => {
    try {
      const token = await getToken(); // Replace 'YOUR_AUTH_TOKEN' with your actual authentication token
      const response = await fetch(
        'https://fithouse.pythonanywhere.com/api/coach/',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        console.log(response);
        // throw new Error(`Failed to fetch professor with ID ${id}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const professorData = await response.json();
        console.log(JSON.stringify(professorData) + ' dddddddddddd');
        const id = await getIdCoach();
        console.log(id);
        const coach = professorData.data.filter(co => co.id_coach == id);
        console.log(JSON.stringify(coach) + ' ccccccccccccccccc');
        setProfessors(coach[0]);
      } else {
        // throw new Error('Invalid content type: expected JSON');
      }
    } catch (error) {
      console.error('Error fetching professors:', error);
    }
  };

  useEffect(() => {
    console.log('Cooooooooooooooooooooooooooooooooach');
    fetchProfessors();
  }, []);

  return (
    <SafeAreaView
      style={{
        padding: 20,
        flex: 1,
        backgroundColor: 'white',
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          style={{width: 40, height: 40, opacity: 0.5}}
          source={require('../../assets/home/GoBackb.png')}
        />
      </TouchableOpacity>
      {false ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : true ? (
        <>
          <ScrollView>
            <View
              style={{
                width: 'auto',
                height: 'auto',
                backgroundColor: '#fff',
                marginTop: 30,
                borderRadius: 15,
              }}>
              {/* Assuming etablissementData has an image URL */}
              <Image
                style={{
                  width: 350,
                  height: 390,
                  alignSelf: 'center',
                  marginTop: 0,
                  borderRadius: 10,
                  objectFit: 'cover',
                }}
                source={{
                  uri:
                    'https://fithouse.pythonanywhere.com/media/' +
                    professors.image,
                }}
                // source={require('../../assets/home/chraf3.jpg')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  marginTop: 10,
                  textAlign: 'center',
                }}>
                {professors.nom_coach} {professors.prenom_coach}
              </Text>
            </View>
          </ScrollView>
        </>
      ) : (
        <Text>No etablissement data available</Text>
      )}
    </SafeAreaView>
  );
}
