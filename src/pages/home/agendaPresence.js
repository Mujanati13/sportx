import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Agenda, AgendaList} from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/fr';
import Timetable from 'react-native-calendar-timetable';
import {getIdReservation, getToken, getUserData} from '../../utils/db';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

export const AgendaPresenece = ({id}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState({});
  const [date, setDate] = useState();
  const [idSeance, setIdseance] = useState();
  const [pop, setpop] = useState(false);

  const handlepopOpen = () => {
    setpop(true);
  };
  const handlepopClose = () => {
    setpop(false);
  };

  useEffect(() => {
    // Function to load items for the month
    const loadItemsForMonth = async () => {
      const idcor = await getIdReservation();
      const user = await getUserData();
      try {
        const token = await getToken();
        const response = await fetch(
          `https://fithouse.pythonanywhere.com/api/seance/?client_id=${user.id_client}&cour_id=${idcor}`,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
              // Add other headers if needed
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setDate(data.data[0].date_reservation);
        setIdseance(data.data[0].id_seance);
        const eventData = data.data.map(item => ({
          date: item.date_reservation,
          heure_debut: item.heure_debut,
          heure_fin: item.heure_fin,
          title: item.cour,
          coach: item.coach,
          salle: item.salle,
          capacity: item.capacity,
          day: item.day_name,
          id: item.id_seance,
        }));

        // Group events by date
        const groupedItems = {};
        eventData.forEach(item => {
          if (!groupedItems[item.date]) {
            groupedItems[item.date] = [];
          }
          groupedItems[item.date].push(item);
        });

        setItems(groupedItems);
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      }
    };

    // Load items for the initial month
    loadItemsForMonth();

    // Clean up function
    return () => {
      // Any cleanup code if needed
    };
  }, []);

  const makeReservation = async (
    idSeance,
    date,
    salle,
    heur_debut,
    heure_fin,
    cour,
    day,
    id,
  ) => {
    const authToken = await getToken(); // Replace 'YOUR_AUTH_TOKEN' with your actual authentication token
    const user = await getUserData();

    const reservationData = {
      id_client: user.id_client,
      id_seance: id,
      date_operation: date,
      date_presence: date,
      status: null,
      presence: null,
      motif_annulation: null,
      salle: salle,
      heur_debut: heur_debut,
      heure_fin: heure_fin,
      client: user.nom_client + ' ' + user.prenom_client,
      cour: cour,
      day_name: day,
    };

    console.log(reservationData);

    try {
      const response = await fetch(
        'https://fithouse.pythonanywhere.com/api/reservation/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`, // Include the authentication token in the request headers
          },
          body: JSON.stringify(reservationData),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Reservation successful:', data);
      if (data.msg == 'Vous avez déjà une réservation sur ce créneau') {
        Alert.alert('Warning', 'Vous avez déjà une réservation sur ce créneau');
      } else {
        Alert.alert('Success', 'Reservation successful');
      }
      // Optionally, handle success here, such as showing a success message
    } catch (error) {
      console.error('There was a problem with the reservation:', error.message);
      // Optionally, handle errors here, such as showing an error message
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        refreshing={refreshing}
        hideExtraDays={true}
        firstDay={1}
        monthFormat="yyyy MM"
        disableAllTouchEvents
        renderItem={(item, firstItemInDay) => (
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Information seance',
                `\n cours : ${item.title} \n Salle : ${item.salle} \n Coach : ${item.coach} \n capacity: ${item.capacity} \n commance: ${item.heure_debut} `,

                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'Annuler',
                  },
                  {
                    text: 'Reserve',
                    onPress: () =>
                      makeReservation(
                        item.id,
                        item.date,
                        item.salle,
                        item.heure_debut,
                        item.heure_fin,
                        item.title,
                        item.day,
                        item.id,
                      ),
                  },
                ],
                {cancelable: false},
              );
            }}>
            <View style={styles.item}>
              {true && (
                <View style={styles.dateContainer}>
                  <Text style={styles.date}>
                    {item.heure_debut} - {item.heure_fin}
                  </Text>
                  <Text style={styles.day}>{item.day}</Text>
                </View>
              )}
              <Text style={styles.title}>{item.coach}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        renderEmptyData={(item, firstItemInDay) => <></>}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#D8FFD7',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  dateContainer: {
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    fontWeight: '400',
  },
  day: {
    fontSize: 15,
    color: 'grey',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'auto',
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
