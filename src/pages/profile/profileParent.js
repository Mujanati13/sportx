import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView,
  Button,
  Alert,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PickStudentCard, PickStudentCardStudents} from '../../components/home';
import {Footer} from '../../components/footer';
import {
  checkIfLoggedIn,
  getStudentId,
  getToken,
  getUserData,
  logout,
  Modal,
} from '../../utils/db';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'; // Import the SkeletonPlaceholder component
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import messaging from '@react-native-firebase/messaging';

export default function ProfileParent({navigation}) {
  const [idParent, setIdParent] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isMneuav, setisMneuav] = useState(false);
  const [currentis, setcurrentis] = useState();
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
  const [curImage, setCurImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [newImage, setNewImage] = useState(false);

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage?.notification,
    );
    navigation.navigate('Notifications');
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await getUserData();
        setUserData(userData);

        if (userData) {
          setIdParent(userData.id_parent);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (idParent) {
        try {
          const response = await fetch(
            `https://jyssrmmas.pythonanywhere.com/api/etudiants_by_parent/?id_parent=${idParent}`,
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            // console.log(JSON.stringify(data.data[0])+ " zzzzzzzzzzzzzzz");
            setStudentList(data.data);
          } else {
            throw new Error('Unexpected content type received');
          }
        } catch (error) {
          console.error('Error fetching student data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStudentData();
  }, [idParent]);

  useEffect(async () => {
    const checkLoginStatus = async () => {
      const loggedIn = await checkIfLoggedIn();
      const id = await getStudentId();
      setcurrentis(id);
    };
    checkLoginStatus();
  }, []);

  const toggleleMenuOpen = () => {
    setisMneuav(true);
  };

  const toggleleMenuClose = () => {
    setisMneuav(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuVisible(!isProfileMenuVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jyssrmmas.pythonanywhere.com/api/etudiantInfo/?id_etudiant=${currentis}`,
        );
        if (!response.ok) {
          // throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCurImage(data.data[0].image); // Assuming the response contains user data
      } catch (error) {
        // console.error('Error fetching user data:', error);
      } finally {
      }
    };

    fetchData();
  }, [currentis]);

  const updateImagePath = async imagePath => {
    const idParentData = await getUserData();
    const {image, password, ...rest} = idParentData;
    console.log(idParentData);
    try {
      // Assuming you have a function to retrieve the authentication token
      const token = await getToken();

      const response = await fetch(
        'https://fithouse.pythonanywhere.com/api/updateImage/',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Include the Authorization header with the token
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_client: userData.id_client,
            image: imagePath,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          'Failed to update image path ' + JSON.stringify(response),
        );
      }

      const data = await response.json();
      console.log(data);
      await AsyncStorage.setItem(
        'userdata',
        JSON.stringify({...rest, image: imagePath}),
      );
      setNewImage(imagePath);
      console.log('Image path updated successfully:', data);
    } catch (error) {
      console.error('Error updating image path:', error);
    }
  };

  const handleImageUpload = () => {
    launchImageLibrary({}, response => {
      if (!response.didCancel && !response.error) {
        const formData = new FormData();
        formData.append('uploadedFile', {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName || 'image.jpg',
        });
        formData.append('path', 'client/'); // Assuming 'client/' is the desired path on the server
        setUploading(true);

        fetch('https://fithouse.pythonanywhere.com/api/saveImage/', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to upload image');
            }
            return response.json();
          })
          .then(async data => {
            // console.log(JSON.stringify(data.path) + " jjjjjjjjjjjjjjjjj");
            await updateImagePath(data.path);
            setUploading(false);
          })
          .catch(error => {
            setUploading(false);
            Alert.alert('Error', error.message || 'Failed to upload image');
            console.error('Error uploading image:', error);
          });
      }
    });
  };

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
                width: 23,
                height: 23,
                // borderColor: 'black',
                // borderWidth: 0.5,
              }}
              source={require('../../assets/home/Close2.png')}
            />
          </TouchableOpacity>
          <View style={{marginTop: 40}}></View>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`https://meetmeafterschool.ma/decouvrir-mmas/`);
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/home/discovery.png')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  textAlign: 'center',
                  padding: 10,
                  // color: 'blue',
                  fontWeight: 600,
                }}>
                Decouvrir MMAS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`https://meetmeafterschool.ma/vivre-chez-mmas/`);
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/home/link.png')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  textAlign: 'center',
                  padding: 10,
                  // color: '',
                  fontWeight: 600,
                }}>
                Vivre chez MMAS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`https://meetmeafterschool.ma/faqs/`);
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/home/questions.png')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  textAlign: 'center',
                  padding: 10,
                  // color: '',
                  fontWeight: 600,
                }}>
                FAQ
              </Text>
            </View>
          </TouchableOpacity>
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
                navigation.navigate('ChangePassword');
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
                Changer Mot de passe
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
                  navigation.goBack();
                }}>
                <Image
                  style={{width: 34, height: 34}}
                  source={require('../../assets/home/GoBack.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleProfileMenu}>
                {/* {curImage && (
              <Image
                style={{width: 45, height: 45, borderRadius: 10}}
                source={{
                  uri: `https://jyssrmmas.pythonanywhere.com/media/${curImage}`,
                }}
              />
            )} */}
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 40,
              width: 'auto',
            }}>
            {newImage != null && newImage.length > 0
              ? userData && (
                  <TouchableOpacity
                    onPress={() => {
                      handleImageUpload();
                    }}>
                    <Image
                      style={{width: 80, height: 80}}
                      source={{
                        uri:
                          'https://fithouse.pythonanywhere.com/media/' +
                          newImage,
                      }}
                      // source={require('../../assets/home/deafult.jpg')}
                    />
                  </TouchableOpacity>
                )
              : userData && (
                  <TouchableOpacity
                    onPress={() => {
                      handleImageUpload();
                    }}>
                    <Image
                      style={{width: 140, height: 140, borderRadius: 20}}
                      source={{
                        uri:
                          'https://fithouse.pythonanywhere.com/media/' +
                          userData.image,
                      }}
                    />
                  </TouchableOpacity>
                )}
            {userData?.image && newImage === null && (
              <TouchableOpacity
                onPress={() => {
                  handleImageUpload();
                }}>
                <Image
                  style={{width: 140, height: 140, borderRadius: 20}}
                  source={require('../../assets/home/deafult.jpg')} // Provide the path to the backup image
                />
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 10,
              width: 'auto',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                textAlign: 'center',
                fontFamily: '600',
              }}>
              {userData.prenom_client}
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: 'black',
                textAlign: 'center',
                fontFamily: '600',
                opacity: 0.6,
              }}>
              {userData.mail}
            </Text>
            <View style={{marginTop: 20}}>
              {/* <Button
                title={uploading ? 'Uploading...' : 'Change la photo de profil'}
                onPress={handleImageUpload}
                disabled={uploading}
              /> */}
              {uploading && <ActivityIndicator style={{marginTop: 10}} />}
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditProfileParent');
              }}>
              <View style={{fontSize: 20, color: 'black', textAlign: 'center'}}>
                <Image
                  style={{alignSelf: 'center', marginTop: 0}}
                  source={require('../../assets/home/edit.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginLeft: 6, marginTop: 40}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/home/Location.png')}></Image>
              <Text style={{color: 'black', fontSize: 20, marginLeft: 10}}>
                {userData.adresse}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`${Linking.openURL(`tel:${userData.tel}`)}`)
              }>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../assets/home/Phone.png')}></Image>
                <Text style={{color: 'black', fontSize: 20, marginLeft: 10}}>
                  {userData.tel}
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
                style={{width: 20, height: 20}}
                source={require('../../assets/home/Location.png')}></Image>
              <Text style={{color: 'black', fontSize: 20, marginLeft: 10}}>
                {userData.city}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Footer activeScreen={'Account'} />
    </SafeAreaView>
  );
}
