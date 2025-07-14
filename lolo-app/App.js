// App.js
import React, { useState, useCallback } from 'react'; // useStateを追加
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Screen Imports
import LoginScreen from './screens/LoginScreen';
import MapHomeScreen from './screens/MapHomeScreen';
import MessagesScreen from './screens/MessagesScreen';
import PrivacySettingsScreen from './screens/PrivacySettingsScreen';
import EventCreationScreen from './screens/EventCreationScreen';
import BlastScreen from './screens/BlastScreen';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  // --- イベントの状態管理を追加 ---
  const [events, setEvents] = useState([]);

  // 新しいイベントを追加する関数
  const addEvent = (newEvent) => {
    // 簡易的にIDを付与してリストに追加
    setEvents(prevEvents => [...prevEvents, { ...newEvent, id: Date.now().toString() }]);
  };
  // -----------------------------

  const [fontsLoaded, fontError] = useFonts({
    'EBGaramond-Regular': require('./assets/fonts/EBGaramond-Regular.ttf'),
    'EBGaramond-Bold': require('./assets/fonts/EBGaramond-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            presentation: 'modal',
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          
          {/* MapHomeScreenにeventsを渡す */}
          <Stack.Screen name="MapHome">
            {(props) => <MapHomeScreen {...props} events={events} />}
          </Stack.Screen>

          <Stack.Screen name="Messages" component={MessagesScreen} />
          <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
          
          {/* EventCreationScreenにaddEvent関数を渡す */}
          <Stack.Screen name="EventCreation">
            {(props) => <EventCreationScreen {...props} addEvent={addEvent} />}
          </Stack.Screen>

          <Stack.Screen name="Blast" component={BlastScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});