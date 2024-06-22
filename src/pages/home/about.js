import React, {useState, useEffect} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function About({navigation}) {
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
          backgroundColor: 'white',
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
                à propos
              </Text>
            </View>
            <View style={{marginTop: 20, paddingLeft: 5}}>
              <Text style={{fontWeight: 600, color: 'black', fontSize: 20}}>
                À propos de SPORT X
              </Text>
              <Text style={{fontSize: 18, marginTop: 5}}>
                FIT-SportX est une application mobile développée par
                JYSSR-Connect. Notre application vise à faciliter votre
                expérience dans notre salle de sport en vous offrant des
                fonctionnalités pratiques et intuitives pour gérer votre emploi
                du temps et vos réservations de cours.
              </Text>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 7,
                }}>
                <Text style={{fontSize: 19, color: 'black'}}>
                  Plate-forme :
                </Text>
                <Text style={{marginLeft: 5, fontSize: 19}}>
                  Disponible sur iOS et Android
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 7,
                }}>
                <Text style={{fontSize: 19, color: 'black'}}>
                  Mise en production le:
                </Text>
                <Text style={{marginLeft: 5, fontSize: 19}}>20/03/2023</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 7,
                }}>
                <Text style={{fontSize: 19, color: 'black'}}>Version :</Text>
                <Text style={{marginLeft: 5, fontSize: 19}}>
                  {appVersion && appVersion}
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 18,
                  marginTop: 5,
                }}>
                Consultation du planning - Vous pouvez facilement consulter le
                planning des cours disponibles, avec les horaires, les types de
                cours et les instructeurs associés. Vous serez toujours informé
                des dernières mises à jour du planning pour planifier vos
                entraînements en conséquence.
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 5,
                }}>
                Réservation des cours - Grâce à notre fonctionnalité de
                réservation, vous pouvez réserver vos places pour les cours qui
                vous intéressent. Cela vous permet de garantir votre
                participation et de vous assurer une place dans les cours les
                plus populaires. Vous pouvez également annuler vos réservations
                si nécessaire. L'application SportX est accessible sur les
                systèmes iOS et Android, assurant une parfaite compatibilité
                avec les smartphones les plus courants. Notre équipe travaille
                sans relâche pour perfectionner l'application, et nous avons
                prévu de dévoiler de nouvelles fonctionnalités captivantes dans
                les prochaines mises à jour.
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '600',
                  marginTop: 5,
                }}>
                L'Équipe JYSSR-Connect{' '}
              </Text>
              <Text style={{fontSize: 18, marginTop: 5}}>
                Notre équipe dévouée de développeurs travaille sans relâche pour
                améliorer constamment Sport X. Nous nous efforçons de créer une
                application intuitive, sûre et efficace pour répondre à vos
                besoins.
              </Text>
              <Text style={{fontSize: 18, marginTop: 5}}>
                La sécurité de vos données est notre priorité. Sport X utilise
                des protocoles de sécurité avancés pour protéger vos
                informations personnelles et garantir une expérience utilisateur
                en toute confiance.
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '600',
                  marginTop: 5,
                }}>
                Contact{' '}
              </Text>
              <Text style={{fontSize: 18, marginTop: 5}}>
                Nous sommes ouverts à vos commentaires et suggestions ! Si vous
                avez des idées pour améliorer Sport X ou rencontrez des
                problèmes techniques, n'hésitez pas à nous contacter à
                <Text style={{color: 'blue'}}> support@jyssr-connect.com</Text>.
              </Text>
              <Text style={{fontSize: 18, marginTop: 5}}>
                Merci de faire partie de la communauté Sport X !
              </Text>
            </View>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

export default About;
