// screens/LoginScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  ActivityIndicator,
  Easing, // Easingを追加
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// SVGをコンポーネントとしてインポート
import LoginBackground from '../assets/images/LoginBackground.svg';

// 表示するログインオプション
const loginOptions = [
  { name: 'Wallet', icon: 'wallet-outline', lib: Icon },
  { name: '', icon: 'google', lib: FontAwesome },
  { name: '', icon: 'twitter', lib: FontAwesome },
  { name: '', icon: 'instagram', lib: FontAwesome },
  { name: '', icon: 'facebook-square', lib: FontAwesome },
];

const LoginScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  // アニメーション用の値
  const waveAnimation = useRef(new Animated.Value(0)).current;

  // アニメーションのループ処理
  useEffect(() => {
    Animated.loop(
      Animated.timing(waveAnimation, {
        toValue: 1,
        duration: 8000, // アニメーションの時間を調整
        easing: Easing.inOut(Easing.sin), // ゆっくり始まってゆっくり終わる動き
        useNativeDriver: true,
      })
    ).start();
  }, [waveAnimation]);

  // ボタンを押した時の処理
  const handleLogin = () => {
    setIsLoading(true); // ローディング開始
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('MapHome');
    }, 2000);
  };

  // アニメーションのスタイル
  const animatedStyle = {
    transform: [
      {
        translateX: waveAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-20, 20], // 横に20pxずつ動かす
        }),
      },
      {
        translateY: waveAnimation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 15, 0], // 上下に15px動かす
        })
      }
    ],
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Animated.View style={[styles.backgroundSvg, animatedStyle]}>
        <LoginBackground width="100%" height="100%" />
      </Animated.View>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.logo}>Lolo</Text>
          <Text style={styles.connectText}>Connect</Text>

          {/* ローディング表示 */}
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#333" />
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              {loginOptions.map((item, index) => {
                const IconComponent = item.lib;
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.connectButton}
                    onPress={handleLogin}
                  >
                    <IconComponent name={item.icon} size={24} color="#333" />
                    <Text style={styles.buttonText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F0', // 背景色
  },
  backgroundSvg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.5, // 線の透明度
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent', // 背景SVGが見えるように透明にする
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    fontFamily: 'EBGaramond-Regular',
    fontSize: 90,
    color: '#333',
    letterSpacing: 2,
  },
  connectText: {
    fontFamily: 'EBGaramond-Regular',
    fontSize: 22,
    color: '#555',
    marginTop: 20,
    marginBottom: 80,
    borderBottomWidth: 1,
    borderColor: '#555',
  },
  buttonContainer: {
    width: '100%',
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: 12,
    paddingVertical: 18,
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontFamily: 'EBGaramond-Regular',
    fontSize: 20,
    color: '#333',
    marginLeft: 15,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;