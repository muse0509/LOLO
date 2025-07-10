import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EventCreationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Event Creation</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Event Name</Text>
          <TextInput placeholder="Enter event name" style={styles.input} />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>For</Text>
          <View style={styles.iconInputContainer}>
            <TextInput placeholder="ETH holders, Community..." style={styles.input} />
            <Icon name="person-outline" size={20} color="#888" style={styles.inputIcon} />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Lolo</Text>
           <View style={styles.iconInputContainer}>
            <TextInput placeholder="Location or coordinates..." style={styles.input} />
            <Icon name="location-outline" size={20} color="#888" style={styles.inputIcon} />
          </View>
        </View>

        <TouchableOpacity style={styles.collapsibleHeader}>
          <Icon name="chevron-forward" size={20} color="#333" />
          <Text style={styles.collapsibleTitle}>RSVP Requirements</Text>
        </TouchableOpacity>

        <View style={styles.formGroup}>
           <Text style={styles.label}>Visual</Text>
           <View style={styles.uploadBox}>
             <Icon name="cloud-upload-outline" size={30} color="#888" />
             <Text style={styles.uploadText}>IMG   VID   GIF</Text>
           </View>
        </View>
        
        <TouchableOpacity style={styles.collapsibleHeader}>
          <Icon name="chevron-forward" size={20} color="#333" />
          <Text style={styles.collapsibleTitle}>Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('Blast')}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modal: {
    width: '90%',
    backgroundColor: '#F8F5F0',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontFamily: 'EBGaramond-Regular', fontSize: 24, color: '#333' },
  formGroup: { marginBottom: 20 },
  label: { fontFamily: 'EBGaramond-Regular', fontSize: 16, color: '#333', marginBottom: 8 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 12,
    fontSize: 16,
    borderRadius: 4,
    width: '100%',
  },
  iconInputContainer: { flexDirection: 'row', alignItems: 'center', position: 'relative' },
  inputIcon: { position: 'absolute', right: 15 },
  collapsibleHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  collapsibleTitle: { fontFamily: 'EBGaramond-Bold', fontSize: 18, color: '#333', marginLeft: 10 },
  uploadBox: {
    borderWidth: 2,
    borderColor: '#DDD',
    borderStyle: 'dashed',
    borderRadius: 4,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: { fontFamily: 'monospace', color: '#888', marginTop: 10 },
  createButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: { fontFamily: 'EBGaramond-Bold', fontSize: 18, color: '#333' },
});

export default EventCreationScreen;