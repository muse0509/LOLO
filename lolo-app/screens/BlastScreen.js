import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const BlastScreen = ({ navigation }) => {
  const goHome = () => navigation.navigate('MapHome');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.iconText}>((o))</Text>
        <Text style={styles.title}>Blast</Text>
        <Text style={styles.subtitle}>Send notification to relevant communities</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={goHome}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blastButton} onPress={goHome}>
            <Text style={styles.blastButtonText}>Blast</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconText: {
    fontFamily: 'monospace',
    fontSize: 24,
    color: '#888',
  },
  title: {
    fontFamily: 'EBGaramond-Bold',
    fontSize: 48,
    color: '#333',
    marginTop: 10,
  },
  subtitle: {
    fontFamily: 'EBGaramond-Regular',
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 60,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  skipButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#F8F5F0',
    padding: 15,
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 4,
  },
  blastButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#000',
    padding: 15,
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 4,
  },
  skipButtonText: {
    fontFamily: 'EBGaramond-Bold',
    fontSize: 18,
    color: '#333',
  },
  blastButtonText: {
    fontFamily: 'EBGaramond-Bold',
    fontSize: 18,
    color: '#fff',
  },
});

export default BlastScreen;