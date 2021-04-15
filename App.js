import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import CalendarModule from './lib';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPress = () => {
    // Accessing constants
    const {DEFAULT_EVENT_NAME} = CalendarModule.getConstants();
    console.log(DEFAULT_EVENT_NAME);

    // Callig native method with Callback
    CalendarModule.createCalendarEventWithCallback(
      'Party',
      '2021-04-15',
      (error, eventId) => {
        if (error) {
          console.error(`Error found! ${error}`);
        }
        console.log(`event id ${eventId} returned`);
      },
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button
            title="Call Native method!"
            color="#841584"
            onPress={() => {
              // Calling native method
              CalendarModule.createCalendarEvent('testName', 'testLocation');
            }}
          />
          <Button
            title="Call Native method with callback!"
            color="#841584"
            onPress={() => {
              // Callig native method with Callback
              CalendarModule.createCalendarEventWithCallback(
                'Party',
                '2021-04-15',
                (error, eventId) => {
                  if (error) {
                    console.error(`Error found! ${error}`);
                  }
                  console.log(`event id ${eventId} returned`);
                },
              );
            }}
          />
          <Button
            title="Callback with error and success!"
            color="#841584"
            onPress={() => {
              // Callig native method with Success and Error Callback
              CalendarModule.createCalendarEventWithSuccessAndErrorCallback(
                'testName',
                'testLocation',
                error => {
                  console.error(`Error found! ${error}`);
                },
                eventId => {
                  console.log(`event id ${eventId} returned`);
                },
              );
            }}
          />
          <Button
            title="Method with Promise!"
            color="#841584"
            onPress={async () => {
              try {
                const eventId = await CalendarModule.createCalendarEventWithPromise(
                  'Party',
                  'my house',
                );
                console.log(`Created a new event with id ${eventId}`);
              } catch (e) {
                console.error(e);
              }
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
