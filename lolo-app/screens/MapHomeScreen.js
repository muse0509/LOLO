import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'; // ImageBackgroundを削除
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import MapBackground from '../assets/images/map_background.svg'; // SVGファイルをインポート

const MapHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* SVGを背景として配置 */}
      <MapBackground 
        width="100%" 
        height="100%" 
        style={{ position: 'absolute', top: 0, left: 0 }} 
      />
      
      {/* ImageBackgroundを削除し、SafeAreaViewを直接配置 */}
      <SafeAreaView style={styles.overlay}>
        {/* Top Right Icons */}
        <View style={styles.topRightContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="person-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="diamond-stone" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('PrivacySettings')}
          >
            <MaterialCommunityIcons name="ethereum" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {/* Message Icon */}
        <TouchableOpacity 
          style={styles.messageIcon}
          onPress={() => navigation.navigate('Messages')}
        >
           <Icon name="mail-outline" size={28} color="#000" />
        </TouchableOpacity>
        
        {/* Map Popups (Mock) */}
        <View style={styles.popupContainer}>
           <Text style={styles.popupText}>"Hey, want to meet at the pier?"</Text>
        </View>
         <View style={styles.infoBox}>
           <Text style={styles.infoText}>🔷 +400</Text>
           <Text style={styles.infoSubText}>tom.eth</Text>
           <Text style={styles.infoSubText}>oxr234...</Text>
           <Text style={styles.infoSubText}>ox5678...</Text>
        </View>

        {/* Slider */}
        <View style={styles.sliderContainer}>
          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor="#FFFFFF"
          />
        </View>
      </SafeAreaView>

      {/* Event Create Button */}
      <TouchableOpacity 
        style={styles.createEventButton}
        onPress={() => navigation.navigate('EventCreation')}
      >
        <Icon name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

// --- スタイル定義（styles）は変更なし ---
// （前回の回答からスタイル部分をコピーしてください）
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5F0' }, // 背景色をSVGと合わせる
  overlay: { flex: 1, position: 'relative' },
  topRightContainer: {
    position: 'absolute',
    top: 50,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 20,
    padding: 5,
  },
  iconButton: {
    padding: 8,
  },
  messageIcon: {
    position: 'absolute',
    top: 140,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 25,
    elevation: 5,
  },
  popupContainer: {
    position: 'absolute',
    top: 200,
    left: '25%',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 5,
  },
  popupText: {
    fontFamily: 'EBGaramond-Regular',
    fontSize: 16,
  },
  infoBox: {
    position: 'absolute',
    top: 300,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
  },
  infoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoSubText: {
    color: '#ccc',
    fontSize: 14,
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  createEventButton: {
     position: 'absolute',
     bottom: 100,
     right: 20,
     backgroundColor: '#1E90FF',
     width: 60,
     height: 60,
     borderRadius: 30,
     justifyContent: 'center',
     alignItems: 'center',
     elevation: 8,
  }
});


export default MapHomeScreen;