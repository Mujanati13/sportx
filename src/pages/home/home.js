import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageView from 'react-native-image-view';

import {
  CourseCard,
  CourseCardSpace,
  PickStudentCard,
  ProfCard,
  ProfCardSpace,
} from '../../components/home';
import {Footer} from '../../components/footer';
import {
  checkIfLoggedIn,
  getStudentId,
  getToken,
  getUserData,
  logout,
  storeIdCoach,
  storeIdCourse,
  storeUniqueProfIds,
} from '../../utils/db';

// import Svg, { Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'; // Import the SkeletonPlaceholder component
import MenuSVG from '../../assets/home/Menu.svg';
import messaging from '@react-native-firebase/messaging';

function Home({navigation}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
  const [idParent, setIdParent] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMneuav, setisMneuav] = useState(false);
  const [currentis, setcurrentis] = useState();
  const [courses, setCourses] = useState([]);
  const [uniqueProfIds, setUniqueProfIds] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [etablissementData, setEtablissementData] = useState(null);
  const [curImage, setCurImage] = useState();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [userData, setUserdata] = useState(false);
  const [error, seterror] = useState(false);

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage?.notification,
    );
    navigation.navigate('Notifications');
  });

  useEffect(() => {
    fetchData();
  }, [currentis]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://jyssrmmas.pythonanywhere.com/api/sean_by_id_etudiant/?id_etudiant=' +
          currentis,
      );
      if (!response.ok) {
        // throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      if (!data || !data.data || !Array.isArray(data.data)) {
        // throw new Error('Invalid response data');
      }
      const ids = data.data.map(item => item.id_prof);
      const uniqueIds = Array.from(new Set(ids)); // Supprimer les ID en double
      setUniqueProfIds(uniqueIds);
      storeUniqueProfIds(uniqueIds); // Stocker les identifiants uniques des professeurs
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
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
          // throw new Error(`Failed to fetch professor with ID ${id}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const professorData = await response.json();
          if (professorData.msg == 'Non authentifié') {
            await logout();
            navigation.replace('Login');
          }
          setProfessors(professorData.data);
        } else {
          // throw new Error('Invalid content type: expected JSON');
        }
      } catch (error) {
        // console.error('Error fetching professors:', error);
      }
    };

    fetchProfessors();
  }, []); // Empty dependency array to run once on component mount

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = await getToken(); // Replace 'YOUR_AUTH_TOKEN' with your actual authentication token
        const response = await fetch(
          'https://fithouse.pythonanywhere.com/api/cours/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          // throw new Error(`Failed to fetch professor with ID ${id}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const CourseData = await response.json();
          console.log(CourseData);
          if (userData.genre === 'Monsieur') {
            const coresFilter = CourseData.data.filter(
              cor => cor.genre === 'Mixte' || cor.genre === 'Homme',
            );
            setCourses(coresFilter);
          } else {
            const coresFilter = CourseData.data.filter(
              cor => cor.genre === 'Mixte' || cor.genre === 'Homme',
            );
            setCourses(coresFilter);
          }
        } else {
          // throw new Error('Invalid content type: expected JSON');
        }
      } catch (error) {
        // console.error('Error fetching professors:', error);
      }
    };

    fetchCourse();
  }, []); // Empty dependency array to run once on component mount

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await checkIfLoggedIn();
      if (loggedIn == false) {
        navigation.replace('Login');
      }
      const id = await getStudentId();
      setcurrentis(id);
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      //  // Rediriger vers l'écran de connexion si non connecté
    }
  }, [isLoggedIn, navigation]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await getUserData();
        if (userData) {
          setUserdata(userData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentis, error]);

  const toggleProfileMenu = () => {
    setIsProfileMenuVisible(!isProfileMenuVisible);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
      // Gérer l'erreur si la déconnexion échoue
    }
  };

  const toggleleMenuOpen = () => {
    setisMneuav(true);
  };

  const toggleleMenuClose = () => {
    setisMneuav(false);
  };

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

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setEtablissementData(data.data[0]);
        } else {
          // seterror('Invalid content type: expected JSON');
          // throw new Error('Invalid Fcontent type: expected JSON');
        }
      } catch (error) {
        // seterror('Error fetching etablissement data:', error);
        // console.error('Error fetching etablissement data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [error]);

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
        seterror('Error fetching user data:');
        // console.error('Error fetching user data:', error);
      } finally {
      }
    };

    fetchData();
  }, [currentis, error]);

  const handleImageError = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    const fetchStudentList = async () => {
      const token = await getToken(); // Replace 'YOUR_AUTH_TOKEN' with your actual authentication token
      try {
        const response = await fetch(
          `https://jyssrmmas.pythonanywhere.com/api/etudiants_by_parent/?id_parent=${idParent}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          // throw new Error('La réponse du réseau n\'était pas correcte');
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log(JSON.stringify(data) + ' belll');
          setStudentList(data.data);
          studentList.map(student => {
            if (student.id_etudiant == currentis) {
            }
          });
        } else {
          // throw new Error('Type de contenu inattendu reçu');
        }
      } catch (error) {
        console.error(
          'Erreur lors de la récupération de la liste des étudiants :',
          error,
        );
        // Gérer l'erreur
      } finally {
        setLoading(false); // Définir loading à false après la récupération, indépendamment du succès ou de l'échec
      }
    };
    fetchStudentList();
  }, [idParent, isProfileMenuVisible]);

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
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                borderRadius: 50,
              }}
              source={{
                uri:
                  'https://fithouse.pythonanywhere.com/media/' + userData.image,
              }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                alignSelf: 'center',
                opacity: 0.8,
                marginTop: 20,
              }}>
              {userData.prenom_client}
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
      <ScrollView>
        <TouchableWithoutFeedback onPress={toggleleMenuClose}>
          <View id="click">
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
              <Text style={{fontSize: 20, color: 'black'}}>
                {userData.prenom_client}
              </Text>
              <TouchableOpacity onPress={toggleProfileMenu}>
                {true && (
                  <Image
                    style={{width: 40, height: 40, borderRadius: 20}}
                    source={{
                      uri: `https://fithouse.pythonanywhere.com/media/${userData.image}`,
                    }}
                    // source={require('../../assets/home/deafult.jpg')}
                    onError={handleImageError} // Handle error event
                  />
                )}
                {curImage?.length == 0 && (
                  <Image
                    style={{width: 40, height: 40, borderRadius: 20}}
                    source={require('../../assets/home/deafult.jpg')} // Provide the path to the backup image
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
                </View>
              </TouchableOpacity>
            </Modal>

            {false ? ( // Render skeleton loading animation if loading state is true
              <View style={{marginTop: 40}}>
                <SkeletonPlaceholder>
                  <SkeletonPlaceholder.Item
                    flexDirection="row"
                    alignItems="center">
                    <SkeletonPlaceholder.Item
                      width={50}
                      height={50}
                      borderRadius={50}
                    />
                    <SkeletonPlaceholder.Item marginLeft={20}>
                      <SkeletonPlaceholder.Item
                        width={120}
                        height={20}
                        borderRadius={4}
                      />
                      <SkeletonPlaceholder.Item
                        marginTop={6}
                        width={80}
                        height={20}
                        borderRadius={4}
                      />
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Etablissement');
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    marginTop: 30,
                    fontWeight: '500',
                    marginLeft: 6,
                  }}>
                  Etablissement
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 15,
                  }}>
                  {etablissementData && (
                    <Image
                      style={{
                        width: 100,
                        height: 100,
                        alignSelf: 'center',
                        marginTop: 10,
                        borderRadius: 10,
                        objectFit: 'cover',
                        marginRight: 4,
                      }}
                      source={{
                        uri:
                          'https://fithouse.pythonanywhere.com/media/' +
                          etablissementData.image,
                      }}
                      // source={require('../../assets/home/salleSport.jpg')}
                    />
                  )}
                  <View style={{width: 280}}>
                    <Text
                      style={{marginLeft: 10, fontSize: 22, color: 'black'}}>
                      {etablissementData && etablissementData.nom_etablissement}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        color: 'black',
                        marginTop: 8,
                      }}>
                      {etablissementData && 'Fes, Maroc'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                marginTop: 20,
                fontWeight: '500',
                marginLeft: 6,
              }}>
              Cours
            </Text>
            {false ? (
              <SkeletonPlaceholder>
                <View
                  style={{
                    backgroundColor: '#D1F3FD',
                    width: 280,
                    borderRadius: 15,
                    marginTop: 20,
                    padding: 1,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                      }}
                    />
                    <View style={{marginLeft: 5}}>
                      <View style={{width: 170, height: 20, borderRadius: 4}} />
                      <View
                        style={{
                          width: 100,
                          height: 15,
                          borderRadius: 0,
                          marginTop: 5,
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      marginLeft: 65,
                    }}>
                    {/* <View style={{width: 25, height: 25, borderRadius: 12.5}} /> */}
                    <View
                      style={{
                        width: 100,
                        height: 18,
                        borderRadius: 4,
                      }}
                    />
                  </View>
                </View>
              </SkeletonPlaceholder>
            ) : (
              <View style={{height: 220}}>
                <ScrollView horizontal={true}>
                  {courses &&
                    courses.map((course, index) =>
                      index === 0 ? (
                        <TouchableOpacity
                          onPress={async () => {
                            await storeIdCourse(course.id_cour);
                            navigation.navigate('Course');
                          }}>
                          <View
                            key={index}
                            style={{
                              // backgroundColor: '#B7DCFE',
                              width: 'auto',
                              borderRadius: 15,
                              marginTop: 0,
                              padding: 15,
                            }}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                              }}>
                              <View>
                                <View
                                  style={{
                                    width: 178,
                                    padding: 2,
                                    borderRadius: 30,
                                  }}>
                                  <Image
                                    style={{
                                      alignSelf: 'center',
                                      marginTop: 3,
                                      width: 180,
                                      height: 160,
                                      borderRadius: 10,
                                    }}
                                    source={{
                                      uri:
                                        'https://fithouse.pythonanywhere.com/media/' +
                                        course.image,
                                    }}
                                    // source={require('../../assets/home/sport.jpg')}
                                  ></Image>
                                </View>
                              </View>
                              <View
                                style={{
                                  marginLeft: 5,
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    opacity: 0.6,
                                    fontSize: 20,
                                    color: 'black',
                                    width: 170,
                                    fontWeight: 600,
                                    width: 'auto',
                                  }}>
                                  {course.nom_cour}
                                </Text>
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginLeft: 5,
                                  }}>
                                  {course.genre == 'Mixte' ||
                                  course.genre == 'Homme' ? (
                                    <Image
                                      style={{width: 20, height: 20}}
                                      source={require('../../assets/home/man2.png')}></Image>
                                  ) : (
                                    ''
                                  )}
                                  {course.genre == 'Mixte' ||
                                  course.genre == 'Femme' ? (
                                    <Image
                                      style={{
                                        width: 20,
                                        height: 20,
                                        marginLeft: 0,
                                      }}
                                      source={require('../../assets/home/female2.png')}></Image>
                                  ) : (
                                    ''
                                  )}
                                </View>
                              </View>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 5,
                              }}>
                              {/* <Image
                        style={{width: 25, height: 25}}
                        source={require('../../assets/home/Book.png')}
                      />
                      <Text
                        style={{fontSize: 18, color: 'black', marginLeft: 7}}>
                        {professor[0].fonction}
                      </Text> */}
                            </View>
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={async () => {
                            await storeIdCourse(course.id_cour);
                            navigation.navigate('Course');
                          }}>
                          <View
                            style={{
                              // backgroundColor: '#B7DCFE',
                              width: 'auto',
                              borderRadius: 15,
                              marginTop: 0,
                              padding: 15,
                            }}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                              }}>
                              <View>
                                <View
                                  style={{
                                    width: 178,
                                    padding: 2,
                                    borderRadius: 30,
                                  }}>
                                  <Image
                                    style={{
                                      alignSelf: 'center',
                                      marginTop: 3,
                                      width: 180,
                                      height: 160,
                                      borderRadius: 10,
                                    }}
                                    source={{
                                      uri:
                                        'https://fithouse.pythonanywhere.com/media/' +
                                        course.image,
                                    }}></Image>
                                </View>
                              </View>
                              <View
                                style={{
                                  marginLeft: 5,
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    opacity: 0.6,
                                    fontSize: 20,
                                    color: 'black',
                                    width: 170,
                                    fontWeight: 600,
                                    width: 'auto',
                                  }}>
                                  {course.nom_cour}
                                </Text>
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginLeft: 5,
                                  }}>
                                  {course.genre == 'Mixte' ||
                                  course.genre == 'Homme' ? (
                                    <Image
                                      style={{width: 20, height: 20}}
                                      source={require('../../assets/home/man2.png')}></Image>
                                  ) : (
                                    ''
                                  )}
                                  {course.genre == 'Mixte' ||
                                  course.genre == 'Femme' ? (
                                    <Image
                                      style={{
                                        width: 20,
                                        height: 20,
                                        marginLeft: 0,
                                      }}
                                      source={require('../../assets/home/female2.png')}></Image>
                                  ) : (
                                    ''
                                  )}
                                </View>
                              </View>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 5,
                              }}>
                              {/* <Image
                        style={{width: 25, height: 25}}
                        source={require('../../assets/home/Book.png')}
                      />
                      <Text
                        style={{fontSize: 18, color: 'black', marginLeft: 7}}>
                        {professor[0].fonction}
                      </Text> */}
                            </View>
                          </View>
                        </TouchableOpacity>
                      ),
                    )}
                </ScrollView>
              </View>
            )}
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                marginTop: 20,
                fontWeight: '500',
                marginLeft: 6,
              }}>
              Coach
            </Text>
            {false ? (
              <SkeletonPlaceholder>
                <View
                  style={{
                    backgroundColor: '#D1F3FD',
                    width: 280,
                    borderRadius: 15,
                    marginTop: 20,
                    padding: 1,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                      }}
                    />
                    <View style={{marginLeft: 5}}>
                      <View style={{width: 170, height: 20, borderRadius: 4}} />
                      <View
                        style={{
                          width: 100,
                          height: 15,
                          borderRadius: 0,
                          marginTop: 5,
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      marginLeft: 65,
                    }}>
                    {/* <View style={{width: 25, height: 25, borderRadius: 12.5}} /> */}
                    <View
                      style={{
                        width: 100,
                        height: 18,
                        borderRadius: 4,
                      }}
                    />
                  </View>
                </View>
              </SkeletonPlaceholder>
            ) : (
              <View style={{height: 280}}>
                <ScrollView horizontal={true}>
                  {professors &&
                    professors.map((prof, index) =>
                      index === 0 ? (
                        <TouchableOpacity
                          onPress={async () => {
                            await storeIdCoach(prof.id_coach);
                            navigation.navigate('CoachProfile');
                          }}>
                          <View
                            style={{
                              // backgroundColor: '#B7DCFE',
                              width: 'auto',
                              borderRadius: 15,
                              marginTop: 0,
                              padding: 15,
                            }}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                              }}>
                              <View>
                                <View
                                  style={{
                                    width: 180,
                                    padding: 2,
                                    borderRadius: 30,
                                  }}>
                                  <Image
                                    style={{
                                      alignSelf: 'center',
                                      marginTop: 3,
                                      width: 140,
                                      height: 140,
                                      borderRadius: 10,
                                    }}
                                    source={{
                                      uri:
                                        'https://fithouse.pythonanywhere.com/media/' +
                                        prof.image,
                                    }}
                                    // source={require('../../assets/home/mohammed.jpg')}
                                  ></Image>
                                </View>
                              </View>
                              <View style={{marginLeft: 5}}>
                                <Text
                                  style={{
                                    opacity: 0.6,
                                    fontSize: 20,
                                    color: 'black',
                                    width: 170,
                                    fontWeight: 600,
                                    width: 140,
                                    textAlign: 'left',
                                  }}>
                                  {prof.nom_coach} {prof.prenom_coach}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 5,
                              }}></View>
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={async () => {
                            await storeIdCoach(prof.id_coach);
                            navigation.navigate('CoachProfile');
                          }}>
                          <View
                            style={{
                              // backgroundColor: '#B7DCFE',
                              width: 'auto',
                              borderRadius: 15,
                              marginTop: 0,
                              padding: 15,
                            }}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                              }}>
                              <View>
                                <View
                                  style={{
                                    width: 140,
                                    padding: 2,
                                    borderRadius: 30,
                                  }}>
                                  <Image
                                    style={{
                                      alignSelf: 'center',
                                      marginTop: 3,
                                      width: 140,
                                      height: 140,
                                      borderRadius: 10,
                                    }}
                                    source={{
                                      uri:
                                        'https://fithouse.pythonanywhere.com/media/' +
                                        prof.image,
                                    }}
                                    // source={require('../../assets/home/mohammed.jpg')}
                                  ></Image>
                                </View>
                              </View>
                              <View style={{marginLeft: 5}}>
                                <Text
                                  style={{
                                    opacity: 0.6,
                                    fontSize: 20,
                                    color: 'black',
                                    width: 170,
                                    fontWeight: 600,
                                    width: 140,
                                    textAlign: 'left',
                                  }}>
                                  {prof.nom_coach} {prof.prenom_coach}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 5,
                              }}>
                              {/* <Image
                        style={{width: 25, height: 25}}
                        source={require('../../assets/home/Book.png')}
                      />
                      <Text
                        style={{fontSize: 18, color: 'black', marginLeft: 7}}>
                        {professor[0].fonction}
                      </Text> */}
                            </View>
                          </View>
                        </TouchableOpacity>
                      ),
                    )}
                </ScrollView>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <Footer activeScreen={'Home'} />
    </SafeAreaView>
  );
}

export default Home;
