// screens/PrivacySettingsScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView, 
    TouchableOpacity,
    Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ★★★ カスタムスイッチコンポーネント（修正版） ★★★
const CustomSwitch = ({ value, onValueChange }) => {
    // アニメーション用の値（0か1）
    const animValue = useRef(new Animated.Value(value ? 1 : 0)).current;

    // value（ON/OFFの状態）が変わるたびにアニメーションを実行
    useEffect(() => {
        Animated.timing(animValue, {
            toValue: value ? 1 : 0,
            duration: 200, // 0.2秒でアニメーション
            useNativeDriver: false, // 'left'プロパティのアニメーションにはfalseが必要
        }).start();
    }, [value, animValue]);

    // アニメーション値（0〜1）を、つまみの左からの位置（3px〜25px）に変換
    const handleLeft = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [3, 25], // OFFの位置とONの位置
    });

    return (
        <TouchableOpacity onPress={onValueChange} activeOpacity={0.8}>
            <View style={styles.switchContainer}>
                {/* スタイルに 'left' を適用 */}
                <Animated.View style={[styles.switchHandle, { left: handleLeft }]} />
            </View>
        </TouchableOpacity>
    );
};

// 設定項目行コンポーネント
const SettingRow = ({ label, children }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

// メインコンポーネント
const PrivacySettingsScreen = ({ navigation }) => {
  const [locationAutoOff, setLocationAutoOff] = useState(false);
  const [walletAddress, setWalletAddress] = useState(true);
  const [allowDMs, setAllowDMs] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* 画面のどこかをタップすると前の画面に戻るように */}
      <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => navigation.goBack()} />
      
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Privacy Settings</Text>

        <View style={styles.settingsContainer}>
          <SettingRow label="Location auto-off">
            <CustomSwitch 
              value={locationAutoOff}
              onValueChange={() => setLocationAutoOff(previousState => !previousState)}
            />
          </SettingRow>

          <SettingRow label="Wallet Address">
            <CustomSwitch 
              value={walletAddress}
              onValueChange={() => setWalletAddress(previousState => !previousState)}
            />
          </SettingRow>

          <SettingRow label="Holdings">
            <TouchableOpacity style={styles.plusButton}>
              <Ionicons name="add" size={20} color="#333" />
            </TouchableOpacity>
          </SettingRow>

          <SettingRow label="Socials">
            <TouchableOpacity style={styles.plusButton}>
              <Ionicons name="add" size={20} color="#333" />
            </TouchableOpacity>
          </SettingRow>

          <SettingRow label="Allow incoming DMs">
            <CustomSwitch 
              value={allowDMs}
              onValueChange={() => setAllowDMs(previousState => !previousState)}
            />
          </SettingRow>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F1EA'
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  headerTitle: {
    fontFamily: 'EBGaramond-Regular',
    fontSize: 36,
    color: '#333',
    textAlign: 'center',
    marginBottom: 60,
  },
  settingsContainer: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 28,
  },
  label: {
    fontFamily: 'EBGaramond-Regular',
    fontSize: 24,
    color: '#333',
  },
  plusButton: {
    width: 32,
    height: 32,
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // --- Custom Switch Styles (修正) ---
  switchContainer: {
    width: 54,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#333',
    justifyContent: 'center',
  },
  switchHandle: {
    position: 'absolute', // 絶対配置に変更
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#333',
  },
});

export default PrivacySettingsScreen;