// screens/PrivacySettingsScreen.js
import React from 'react'; // useState, useRef, useEffect は不要になったので削除
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Animated, // CustomSwitchを再利用するため残す
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// CustomSwitchコンポーネントはそのまま
const CustomSwitch = ({ value, onValueChange }) => {
    const animValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

    React.useEffect(() => {
        Animated.timing(animValue, {
            toValue: value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [value, animValue]);

    const handleLeft = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [3, 25],
    });

    return (
        <TouchableOpacity onPress={onValueChange} activeOpacity={0.8}>
            <View style={styles.switchContainer}>
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
const PrivacySettingsScreen = ({ navigation, isRadiusVisible, setIsRadiusVisible }) => {
  // この画面で管理していたstateはApp.jsに移動

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => navigation.goBack()} />
      
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Privacy Settings</Text>

        <View style={styles.settingsContainer}>
          <SettingRow label="Show my radius">
            <CustomSwitch
              value={isRadiusVisible}
              onValueChange={() => setIsRadiusVisible(previousState => !previousState)}
            />
          </SettingRow>

          {/* 他の設定項目はそのまま */}
        </View>
      </View>
    </SafeAreaView>
  );
};

// スタイルは変更なし
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
  switchContainer: {
    width: 54,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#333',
    justifyContent: 'center',
  },
  switchHandle: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#333',
  },
});


export default PrivacySettingsScreen;