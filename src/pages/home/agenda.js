import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Agenda} from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/fr'; // French locale for moment.js
import {LocaleConfig} from 'react-native-calendars';
import {getToken} from '../../utils/db';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'fr';

const MyAgenda = ({id}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState({});

  useEffect(() => {
    // Function to load items for the month
    const loadItemsForMonth = async () => {
      try {
        const token = await getToken();
        const response = await fetch(
          `https://fithouse.pythonanywhere.com/api/seance`,
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

        const eventData = data.data.map(item => ({
          date: item.date_reservation,
          heure_debut: item.heure_debut,
          heure_fin: item.heure_fin,
          title: item.cour,
          coach:item.coach
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

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        refreshing={refreshing}
        hideExtraDays={true}
        firstDay={1}
        selected={new Date(moment().startOf('week'))}
        monthFormat="yyyy MM"
        disableAllTouchEvents
        renderItem={(item, firstItemInDay) => (
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
    backgroundColor: '#B7DCFE',
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

export default MyAgenda;
