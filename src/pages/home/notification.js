import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {Footer} from '../../components/footer';
import {
  CurrentDatPluse,
  checkIfLoggedIn,
  formatDate,
  getStudentId,
  getToken,
  getUserData,
  logout,
  splitTextWithEllipsis,
} from '../../utils/db';
import {NotificationsCard, PickStudentCard} from '../../components/home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CurrentDate from '../../utils';
import MSGListen from '../../utils/firebase';

function Notifications({navigation}) {
  const [isMneuav, setisMneuav] = useState(false);
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
  const [idParent, setIdParent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentis, setcurrentis] = useState();
  const [curImage, setCurImage] = useState();
  const [notifications, setNotifications] = useState([]);
  const [userData, setUserData] = useState();

  const toggleleMenuOpen = () => {
    setisMneuav(true);
  };
  const toggleleMenuClose = () => {
    setisMneuav(false);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await checkIfLoggedIn();
      const id = await getStudentId();
      setcurrentis(id);
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, []);

  const toggleProfileMenu = () => {
    setIsProfileMenuVisible(!isProfileMenuVisible);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      // Gérer l'erreur si la déconnexion échoue
    }
  };

  const fetchProfessors = async () => {
    try {
      const token = await getToken(); // Replace 'YOUR_AUTH_TOKEN' with your actual authentication token
      const response = await fetch(
        'https://fithouse.pythonanywhere.com/api/notifications',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch professors');
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const professorData = await response.json();
        const userData = await getUserData();
        const today = new Date(userData.date_inscription);
        console.log(userData.date_inscription);
        // Filter notifications where date_envoye is smaller than today's date
        const filteredNotifications = professorData.filter(notification => {
          const notificationDate = new Date(notification.date_envoye.split(' ')[0]);
          return notificationDate > today;
        });
        console.log(filteredNotifications + " jjjjjjjjjjjjjjj");
        setNotifications(professorData);
      } else {
        throw new Error('Invalid content type: expected JSON');
      }
    } catch (error) {
      console.error('Error fetching professors:', error);
    }
  };

  useEffect(async () => {
    const userData = await getUserData();
    setUserData(userData);
    fetchProfessors();
  }, []);

  return (
    <SafeAreaView
      style={{
        padding: 20,
        paddingTop: 30,
        flex: 1,
        backgroundColor: 'white',
      }}>
      {isMneuav ? (
        <View
          style={{
            flex: 1,
            width: '65%', // Set the width to 50% of the screen
            backgroundColor: '#ffff',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0, // Position the menu on the left side of the screen
            zIndex: 100,
            transform: isMneuav ? 'translateX(0)' : 'translateX(-100%)',
            opacity: isMneuav ? 1 : 0,
            padding: 20,
            paddingTop: 30,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            transitionProperty: 'transform opacity',
            transitionDuration: '0.3s',
          }}>
          <TouchableOpacity style={{}} onPress={toggleleMenuClose}>
            <Image
              style={{
                width: 20,
                height: 20,
                // borderColor: 'black',
                // borderWidth: 0.5,
              }}
              source={require('../../assets/home/Close2.png')}
            />
          </TouchableOpacity>
          <View
            style={{display: 'flex', justifyContent: 'center', width: 'auto'}}>
            <Image
              style={{width: 100, height: 100, alignSelf: 'center'}}
              source={require('../../assets/home//deafult.jpg')}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                alignSelf: 'center',
                opacity: 0.8,
              }}>
              Mohammed Janati
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 40,
            }}>
            <TouchableOpacity
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={() => {
                navigation.navigate('ProfileParent');
                toggleleMenuClose();
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/home/profileuse.png')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  padding: 10,
                  color: 'black',
                  fontWeight: 600,
                  width: 200,
                }}>
                Profile
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={() => {
                navigation.navigate('Setting');
                toggleleMenuClose();
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/home/Settings.png')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  padding: 10,
                  color: 'black',
                  fontWeight: 600,
                  width: 200,
                }}>
                Parameters
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={() => {
                toggleleMenuClose();
                navigation.navigate('About');
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/home/About.png')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  textAlign: 'center',
                  padding: 10,
                  color: 'black',
                  fontWeight: 600,
                }}>
                à propos{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={() => {
                toggleleMenuClose();
                navigation.navigate('Contract');
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/home/contract.png')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  textAlign: 'center',
                  padding: 10,
                  color: 'black',
                  fontWeight: 600,
                }}>
                Mes Contrats
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              padding: 25,
              backgroundColor: 'white',
            }}>
            <TouchableOpacity onPress={handleLogout}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  alignSelf: 'center',
                  color: 'red',
                  fontWeight: 600,
                }}>
                Déconnexion
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        ''
      )}
      <TouchableWithoutFeedback onPress={toggleleMenuClose}>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                toggleleMenuOpen();
              }}>
              <Image
                style={{width: 34, height: 34}}
                source={require('../../assets/home/Menu.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                letterSpacing: 0.8,
              }}>
              Notifications
            </Text>
            <TouchableOpacity>
              {true && (
                <Image
                  style={{width: 40, height: 40, borderRadius: 20}}
                  source={{
                    uri: `https://fithouse.pythonanywhere.com/media/${
                      userData && userData.image
                    }`,
                  }}
                  // source={require('../../assets/home/chraf3.jpg')}
                />
              )}
            </TouchableOpacity>
          </View>
          <Modal
            visible={isProfileMenuVisible}
            transparent={true}
            animationType="fade">
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'flex-end',
              }}
              onPress={toggleProfileMenu}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <Text style={{fontSize: 20}}>
                  {studentList.map(student => {
                    if (student.id_etudiant == currentis) {
                      const capitalized =
                        student.etudiant.charAt(0).toUpperCase() +
                        student.etudiant.slice(1);
                      return `${capitalized} (profil actuel)`;
                    }
                  })}
                </Text>
                {studentList
                  .filter(student => student.id_etudiant != currentis)
                  .map((student, index) => (
                    <TouchableOpacity
                      key={student.id_etudiant}
                      onPress={() => {
                        setcurrentis(student.id_etudiant); // Mettre à jour l'état currentis
                      }}>
                      <PickStudentCard
                        key={index}
                        student={student}
                        id={student.id_etudiant}
                      />
                    </TouchableOpacity>
                  ))}
                {/* <TouchableOpacity onPress={handleLogout}>
                  <View
                    style={{
                      width: 'auto',
                      height: 60,
                      backgroundColor: 'red',
                      marginTop: 20,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: '500',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        color: 'white',
                        letterSpacing: 0.8,
                      }}>
                      Se déconnecter
                    </Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            </TouchableOpacity>
          </Modal>
          <View style={{marginTop: 10, paddingBottom: 25}}>
            {false ? (
              <Text>Loading...</Text>
            ) : (
              <ScrollView style={{paddingBottom: 25}}>
                {notifications.map((notification, index) => {
                  // Convert date_envoye string to Date object
                  const dateEnvoye = new Date(notification.date_envoye);
                  // Get today's date
                  const today = new Date();
                  // Compare date_envoye with today's date
                  const isNotificationOld = dateEnvoye < today;

                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleNotificationPress(notification)}
                      style={{opacity: isNotificationOld ? 1 : 0.5}} // Adjust opacity based on notification's age
                    >
                      <View
                        style={{
                          backgroundColor: '#F9FAFF',
                          width: 'auto',
                          padding: 20,
                          paddingRight: 30,
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          marginTop: 10,
                        }}>
                        <View>
                          <Text
                            style={{
                              fontSize: 20,
                              color: 'black',
                              fontWeight: 500,
                            }}>
                            {splitTextWithEllipsis(
                              false ? 'sujet test' : notification.sujet,
                              17,
                            )}{' '}
                            <Text
                              style={{
                                fontSize: 16,
                                color: 'grey',
                                fontVariant: '200',
                              }}>
                              {formatDate(notification.date_envoye)}
                            </Text>
                          </Text>
                          <Text style={{fontSize: 17, marginTop: 5}}>
                            {splitTextWithEllipsis(notification.contenu, 37)}
                          </Text>
                        </View>
                        <View style={{paddingRight: 20}}>
                          <Image
                            style={{opacity: 0.2, width: 22, height: 22}}
                            source={require('../../assets/home/Mail.png')}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Footer activeScreen={'Notification'} />
    </SafeAreaView>
  );
}

export default Notifications;
