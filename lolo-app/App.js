// App.js
import React, { useState, useCallback } from 'react';
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
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen'; // ChatScreenをインポート
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [events, setEvents] = useState([]);
  const [isRadiusVisible, setIsRadiusVisible] = useState(true);

  const addEvent = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, { ...newEvent, id: Date.now().toString() }]);
  };

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
      <GestureHandlerRootView style={{flex:1}}>
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
          
          <Stack.Screen name="MapHome">
            {(props) => <MapHomeScreen {...props} events={events} isRadiusVisible={isRadiusVisible} />}
          </Stack.Screen>

          <Stack.Screen name="Messages" component={MessagesScreen} />
          
          <Stack.Screen name="PrivacySettings">
              {(props) => <PrivacySettingsScreen {...props} isRadiusVisible={isRadiusVisible} setIsRadiusVisible={setIsRadiusVisible} />}
          </Stack.Screen>
          
          <Stack.Screen name="EventCreation">
            {(props) => <EventCreationScreen {...props} addEvent={addEvent} />}
          </Stack.Screen>

          <Stack.Screen name="Blast" component={BlastScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />{/* ChatScreenを追加 */}
        </Stack.Navigator>
      </NavigationContainer>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});