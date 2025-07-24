// screens/PrivacySettingsScreen.js – safe defaults + guarded navigation
// ==================================================
// * Falls back to local state when setter props aren’t provided
// * Guarded navigation: shows console warning if target screen is missing
// ==================================================

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* ---------------- reusable animated switch ---------------- */
const CustomSwitch = ({ value, onValueChange }) => {
  const anim = React.useRef(new Animated.Value(value ? 1 : 0)).current;
  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [value, anim]);

  const handleLeft = anim.interpolate({ inputRange: [0, 1], outputRange: [3, 25] });
  const trackBg   = anim.interpolate({ inputRange: [0, 1], outputRange: ['#FFFFFF', '#00BFFF'] });

  return (
    <TouchableOpacity onPress={onValueChange} activeOpacity={0.8}>
      <Animated.View style={[styles.switchContainer, { backgroundColor: trackBg }]}> 
        <Animated.View style={[styles.switchHandle, { left: handleLeft }]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

/* ---------------- plus (+) button ---------------- */
const PlusBtn = ({ onPress }) => (
  <TouchableOpacity style={styles.plusButton} onPress={onPress} activeOpacity={0.7}>
    <Ionicons name="add" size={20} color="#333" />
  </TouchableOpacity>
);

/* ---------------- single row wrapper ---------------- */
const SettingRow = ({ label, children }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

/* ---------------- main screen ---------------- */
const PrivacySettingsScreen = (props) => {
  const {
    navigation,
    locationAutoOff,
    setLocationAutoOff,
    walletAddressVisible,
    setWalletAddressVisible,
    allowDMs,
    setAllowDMs,
  } = props;

  /* ----- fallback local state when parent didn’t provide setters ----- */
  const [localLoc,     setLocalLoc]     = React.useState(locationAutoOff      ?? false);
  const [localWallet,  setLocalWallet]  = React.useState(walletAddressVisible ?? false);
  const [localDMs,     setLocalDMs]     = React.useState(allowDMs            ?? true);

  const currentLoc    = setLocationAutoOff    ? locationAutoOff      : localLoc;
  const currentWallet = setWalletAddressVisible ? walletAddressVisible : localWallet;
  const currentDMs    = setAllowDMs           ? allowDMs            : localDMs;

  const toggleLoc = () => (setLocationAutoOff    ? setLocationAutoOff(p => !p)    : setLocalLoc(p => !p));
  const toggleWallet = () => (setWalletAddressVisible ? setWalletAddressVisible(p => !p) : setLocalWallet(p => !p));
  const toggleDMs = () => (setAllowDMs           ? setAllowDMs(p => !p)           : setLocalDMs(p => !p));

  /* ----- safe navigation helper ----- */
  const handleNavigate = (screen) => {
    if (!navigation?.navigate) return;
    const routeNames = navigation.getState?.().routeNames || [];
    if (routeNames.includes(screen)) {
      navigation.navigate(screen);
    } else {
      console.warn(`Screen '${screen}' not found. Add it to your navigator or adjust the route name.`);
      Alert.alert('Navigation error', `Screen “${screen}” is not registered in the navigator.`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* dismiss by tapping anywhere outside */}
      <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => navigation.goBack()} />

      <View style={styles.content} pointerEvents="box-none">
        <Text style={styles.headerTitle}>Privacy Settings</Text>

        <View style={styles.settingsContainer}>
          <SettingRow label="Location auto‑off">
            <CustomSwitch value={currentLoc} onValueChange={toggleLoc} />
          </SettingRow>

          <SettingRow label="Wallet Address">
            <CustomSwitch value={currentWallet} onValueChange={toggleWallet} />
          </SettingRow>

          <SettingRow label="Holdings">
            <PlusBtn onPress={() => handleNavigate('HoldingsEdit')} />
          </SettingRow>

          <SettingRow label="Socials">
            <PlusBtn onPress={() => handleNavigate('SocialLinksEdit')} />
          </SettingRow>

          <SettingRow label="Allow incoming DMs">
            <CustomSwitch value={currentDMs} onValueChange={toggleDMs} />
          </SettingRow>
        </View>
      </View>
    </SafeAreaView>
  );
};

/* ---------------- styles ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F1EA' },
  content: { paddingHorizontal: 30, paddingTop: 40 },
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
  label: { fontFamily: 'EBGaramond-Regular', fontSize: 24, color: '#333' },
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
    backgroundColor: '#FFF',
    elevation: 2,
  },
});

export default PrivacySettingsScreen;
