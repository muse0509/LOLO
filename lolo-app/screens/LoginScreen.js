// screens/LoginScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const socialIcons = [
  { name: 'logo-instagram', lib: Icon },
  { name: 'twitter', lib: FontAwesome },
  { name: 'square', lib: FontAwesome },
  { name: 'facebook', lib: FontAwesome },
  { name: 'circle-o-notch', lib: FontAwesome },
  { name: 'circle-thin', lib: FontAwesome },
];

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.logo}>Lolo</Text>
        <Text style={styles.connectText}>Connect</Text>

        <TouchableOpacity 
          style={styles.connectButton}
          onPress={() => navigation.navigate('MapHome')}
        >
          <View style={styles.buttonContent}>
            <Icon name="wallet-outline" size={24} color="#333" />
            <Text style={styles.buttonText}>Wallet</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.connectButton}
        >
          <View style={styles.buttonContent}>
            {socialIcons.map((item, index) => {
              const IconComponent = item.lib;
              return <IconComponent key={index} name={item.name} size={20} color="#555" style={styles.socialIcon} />;
            })}
          </View>
           <Text style={[styles.buttonText, {marginTop: 8}]}>Social</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F0', // Light beige background
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    fontFamily: 'EBGaramond-Regular', // Custom Font
    fontSize: 80,
    color: '#333',
    letterSpacing: 2,
  },
  connectText: {
    fontFamily: 'EBGaramond-Regular',
    fontSize: 20,
    color: '#555',
    marginTop: -10,
    marginBottom: 60,
    textDecorationLine: 'underline',
  },
  connectButton: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  buttonText: {
    fontFamily: 'EBGaramond-Regular',
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginLeft: 10,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
});

export default LoginScreen;