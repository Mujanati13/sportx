import React, {useState, useEffect} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getToken, getUserData} from '../../utils/db';

export default function Contract({navigation}) {
  const [contrsct, setContarct] = useState([]);

  useEffect(() => {
    fetchContract();
  }, []);

  const fetchContract = async () => {
    try {
      // Add authentication headers
      const token = await getToken(); // Replace 'YOUR_AUTH_TOKEN' with actual token
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const userDataw = await getUserData();
      const response = await fetch(
        'https://fithouse.pythonanywhere.com/api/contrat/?client_id=77',
        {headers},
      );
      const data = await response.json();
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      setContarct(data.data);
    } catch (error) {
      console.error('Error fetching app version:', error);
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView
        style={{
          padding: 20,
          paddingTop: 20,
          flex: 1,
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
                Mes Contrats
              </Text>
            </View>
            <View style={{marginTop: 16, paddingLeft: 5}}>
              {/* <Text style={{fontWeight: 600, color: 'black', fontSize: 20}}>
                Contract de sportx
              </Text> */}
            </View>
            {contrsct&&contrsct.map(con => {
              return (
                <View
                  key={con.id_contrat}
                  style={{
                    marginTop: 20,
                    paddingLeft: 5,
                    backgroundColor: '#D7ECFF',
                    borderRadius: 5,
                    padding: 10,
                  }}>
                  <Text style={{color: 'black', fontSize: 18}}>
                    {con.client}
                  </Text>
                  <Text style={{color: 'black', marginTop: 5}}>
                    Le reste: {con.reste}dh
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Text style={{color: 'black'}}>{con.date_debut}</Text>
                    <Text style={{marginLeft: 8, color: 'black'}}>
                      {con.date_fin}
                    </Text>
                  </View>
                </View>
              );
            })}
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
