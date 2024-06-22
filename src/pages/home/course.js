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
import {getCoursefId, getToken, storeIdReservation} from '../../utils/db';
import Etablissement from './etablissement';

export default function Course({navigation}) {
  const [etablissementData, setEtablissementData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get the authentication token
        const token = await getToken();

        const response = await fetch(
          'https://fithouse.pythonanywhere.com/api/cours/',
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data);
        const id = await getCoursefId();
        // Assuming the API response is an array of etablissement objects
        const foundCour = data.data.filter(cour => cour.id_cour == id);
        setEtablissementData(foundCour); // Assuming you want to display the first etablissement
      } catch (error) {
        console.error('Error fetching etablissement data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : etablissementData ? (
        <>
          <ScrollView>
            <View
              style={{
                width: 'auto',
                height: 250,
                backgroundColor: '#fff',
                marginTop: 30,
                borderRadius: 15,
              }}>
              {/* Assuming etablissementData has an image URL */}
              <Image
                style={{
                  width: 350,
                  height: 230,
                  alignSelf: 'center',
                  marginTop: 0,
                  borderRadius: 20,
                }}
                source={{
                  uri:
                    'https://fithouse.pythonanywhere.com/media/' +
                    etablissementData[0].image,
                }}
                // source={require('../../assets/home/salleSport.jpg')}
              />
            </View>
            <Text
              style={{
                fontSize: 25,
                color: 'black',
                marginTop: 20,
                opacity: 0.7,
              }}>
              {etablissementData[0].nom_cour}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../../assets/home/man2.png')}></Image>
                <Image
                  style={{width: 30, height: 30, marginLeft: 10}}
                  source={require('../../assets/home/female2.png')}></Image>
              </View>
              <View
                style={{
                  marginLeft: 0,
                  backgroundColor: 'green',
                  width: 110,
                  height: 35,
                  borderRadius: 5,
                  paddingTop: 4,
                }}>
                <TouchableOpacity onPress={async()=>{
                  await storeIdReservation(etablissementData[0].id_cour)
                  navigation.navigate("Attendance")
                }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      textAlign: 'center',
                      fontWeight: 600,
                    }}>
                    Reserver
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={{fontSize: 25, color: 'black', marginTop: 40}}>
              reglement
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 20,
                fontWeight: 300,
                lineHeight: 25,
                color: 'black',
              }}>
              {etablissementData[0].reglement}
            </Text>
            <Text style={{fontSize: 25, color: 'black', marginTop: 20}}>
              Description
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 20,
                fontWeight: 300,
                lineHeight: 25,
              }}>
              {etablissementData[0].description}
            </Text>
          </ScrollView>
        </>
      ) : (
        <Text>No etablissement data available</Text>
      )}
    </SafeAreaView>
  );
}
