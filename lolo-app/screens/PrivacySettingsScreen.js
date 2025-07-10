import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingRow = ({ label, children }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

const PrivacySettingsScreen = ({ navigation }) => {
  const [locationAutoOff, setLocationAutoOff] = useState(false);
  const [walletAddress, setWalletAddress] = useState(true);
  const [allowDMs, setAllowDMs] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Privacy Settings</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.settingsContainer}>
        <SettingRow label="Location auto-off">
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={locationAutoOff ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={() => setLocationAutoOff(previousState => !previousState)}
            value={locationAutoOff}
          />
        </SettingRow>

        <SettingRow label="Wallet Address">
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={walletAddress ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={() => setWalletAddress(previousState => !previousState)}
            value={walletAddress}
          />
        </SettingRow>

        <SettingRow label="Holdings">
          <TouchableOpacity style={styles.plusButton}>
            <Icon name="add-outline" size={24} color="#333" />
          </TouchableOpacity>
        </SettingRow>

        <SettingRow label="Socials">
          <TouchableOpacity style={styles.plusButton}>
            <Icon name="add-outline" size={24} color="#333" />
          </TouchableOpacity>
        </SettingRow>

        <SettingRow label="Allow incoming DMs">
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={allowDMs ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={() => setAllowDMs(previousState => !previousState)}
            value={allowDMs}
          />
        </SettingRow>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5F0' },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontFamily: 'EBGaramond-Bold',
    fontSize: 32,
    color: '#333',
    textAlign: 'center',
    flex: 1,
    marginLeft: 30, // to balance the close button
  },
  settingsContainer: {
    paddingHorizontal: 30,
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
  },
  label: {
    fontFamily: 'EBGaramond-Regular',
    fontSize: 22,
    color: '#333',
  },
  plusButton: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 2,
  },
});

export default PrivacySettingsScreen;