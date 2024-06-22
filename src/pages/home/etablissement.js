import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getToken } from '../../utils/db';

function Etablissement({ navigation }) {
  const [etablissementData, setEtablissementData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken(); // Replace 'YOUR_AUTH_TOKEN' with your actual authentication token
        const response = await fetch(
          'https://fithouse.pythonanywhere.com/api/etablissements/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();
        // Assuming the API response is an array of etablissement objects
        console.log(data);
        setEtablissementData(data.data[0]); // Assuming you want to display the first etablissement
      } catch (error) {
        // console.error('Error fetching etablissement data:', error);
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
        paddingTop: 30,
        flex: 1,
        backgroundColor: 'white',
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          style={{ width: 40, height: 40, opacity: 0.5 }}
          source={require('../../assets/home/GoBackb.png')}
        />
      </TouchableOpacity>
      <Text style={{ fontSize: 30, color: 'black', marginTop: 20 }}>
        {etablissementData && etablissementData.nom_etablissement}
      </Text>
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
                  marginTop: 10,
                  borderRadius: 20,
                }}
                source={{
                  uri:
                    'https://fithouse.pythonanywhere.com/media/' +
                    etablissementData.image,
                }}
              // source={require('../../assets/home/salleSport.jpg')}
              />
            </View>
            <Text style={{ fontSize: 25, color: 'black', marginTop: 20 }}>
              Description
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 20,
                fontWeight: 300,
                lineHeight: 25,
              }}>
              {etablissementData.description}
            </Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `tel:${etablissementData.teletablissement}`,
                )
              }>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 40,
                }}>
                <Image source={require('../../assets/home/Phone.png')}></Image>
                <Text style={{ fontSize: 20, marginLeft: 10 }}>
                  {etablissementData.teletablissement}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Image source={require('../../assets/home/Location.png')}></Image>
              <Text style={{ fontSize: 20, marginLeft: 10 }}>
                {etablissementData.ville} -{' '}
                {etablissementData.adresse_etablissement}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Image source={require('../../assets/home/Internet.png')}></Image>
              <View style={{ fontSize: 20, marginLeft: 10 }}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(`${etablissementData.sitewebetablissement}`)
                  }>
                  <Text style={{ fontSize: 20, color: 'blue' }}>
                    {' '}
                    {etablissementData.sitewebetablissement}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{ fontSize: 25, color: 'black', marginTop: 30 }}>
              Social Media
            </Text>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: '',
              }}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`${etablissementData.facebook}`)
                }>
                <Image
                  style={{ marginTop: 30, width: 55, height: 56 }}
                  source={require('../../assets/home/Facebook.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`${etablissementData.instagrame}`)
                }>
                <Image
                  style={{ marginTop: 30, width: 45, height: 45, marginLeft: 20 }}
                  source={require('../../assets/home/Instagram.png')}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      ) : (
        <Text>No etablissement data available</Text>
      )}
    </SafeAreaView>
  );
}

export default Etablissement;
