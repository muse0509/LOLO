// App.js
import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native'; // ViewとStyleSheetをインポート
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; // AppLoadingの代わりにSplashScreenをインポート

// Screen Imports
import LoginScreen from './screens/LoginScreen';
import MapHomeScreen from './screens/MapHomeScreen';
import MessagesScreen from './screens/MessagesScreen';
import PrivacySettingsScreen from './screens/PrivacySettingsScreen';
import EventCreationScreen from './screens/EventCreationScreen';
import BlastScreen from './screens/BlastScreen';

const Stack = createStackNavigator();

// フォント読み込み中などに、アプリの起動画面（スプラッシュスクリーン）が表示され続けるようにする
SplashScreen.preventAutoHideAsync();

export default function App() {
  // カスタムフォントを読み込む
  const [fontsLoaded, fontError] = useFonts({
    'EBGaramond-Regular': require('./assets/fonts/EBGaramond-Regular.ttf'),
    'EBGaramond-Bold': require('./assets/fonts/EBGaramond-Bold.ttf'),
  });

  // レイアウトが完了した後に、スプラッシュスクリーンを非表示にする関数
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // フォントが読み込まれていない、かつエラーもない場合は何も表示しない（スプラッシュスクリーンが表示され続ける）
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Viewで全体を囲み、onLayoutでスプラッシュスクリーンを非表示にするタイミングを制御
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
          {/* 画面の定義は変更なし */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MapHome" component={MapHomeScreen} />
          <Stack.Screen name="Messages" component={MessagesScreen} />
          <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
          <Stack.Screen name="EventCreation" component={EventCreationScreen} />
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