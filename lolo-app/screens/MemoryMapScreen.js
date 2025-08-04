import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// — 固定サンプル思い出データ
const memories = [
  { id: '1', title: 'Going to the beach', emoji: '🏝️', position: { top: '20%', left: '30%' }, images: ['https://via.placeholder.com/200x150.png?text=Beach+1', 'https://via.placeholder.com/200x150.png?text=Beach+2'] },
  { id: '2', title: 'Movie with babe',  emoji: '❤️', position: { top: '40%', left: '60%' }, images: ['https://via.placeholder.com/200x150.png?text=Movie+1', 'https://via.placeholder.com/200x150.png?text=Movie+2'] },
  { id: '3', title: 'Diplo concert',    emoji: '🎧', position: { top: '55%', left: '25%' }, images: ['https://via.placeholder.com/200x150.png?text=Concert+1', 'https://via.placeholder.com/200x150.png?text=Concert+2'] },
  { id: '4', title: 'Walk with Joe',     emoji: '🚶', position: { top: '70%', left: '50%' }, images: ['https://via.placeholder.com/200x150.png?text=Walk+1', 'https://via.placeholder.com/200x150.png?text=Walk+2'] },
  { id: '5', title: 'Coffee date',       emoji: '☕️', position: { top: '30%', left: '75%' }, images: ['https://via.placeholder.com/200x150.png?text=Coffee+1', 'https://via.placeholder.com/200x150.png?text=Coffee+2'] },
  { id: '6', title: 'Drinks with friends', emoji: '🍻', position: { top: '80%', left: '20%' }, images: ['https://via.placeholder.com/200x150.png?text=Drinks+1', 'https://via.placeholder.com/200x150.png?text=Drinks+2'] },
];

const MemoryMapScreen = () => {
  const [selectedMemory, setSelectedMemory] = useState(null);

  // マーカー描画ヘルパー
  const renderMarker = (mem) => (
    <TouchableOpacity
      key={mem.id}
      style={[styles.marker, mem.position]}
      onPress={() => setSelectedMemory(mem)}
    >
      <Text style={styles.emoji}>{mem.emoji}</Text>
    </TouchableOpacity>
  );

  // モーダル内の画像レンダラー
  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 実装ではここを Map 画像レイヤーに差し替え */}
      <View style={styles.mapPlaceholder} />

      {/* 思い出マーカー一覧 */}
      {memories.map(renderMarker)}

      {/* 思い出詳細モーダル */}
      <Modal
        visible={!!selectedMemory}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedMemory(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedMemory?.title}</Text>
              <TouchableOpacity onPress={() => setSelectedMemory(null)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={selectedMemory?.images}
              keyExtractor={(uri, idx) => `${uri}-${idx}`}
              renderItem={renderImage}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f0f0' },
    mapPlaceholder: {
      width: screenWidth,
      height: screenHeight,
      backgroundColor: '#e9e4dc',
      position: 'absolute',
    },
    marker: {
      position: 'absolute',
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'rgba(255,255,255,0.9)',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    emoji: { fontSize: 24 },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 16,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    image: {
      width: 200,
      height: 150,
      borderRadius: 8,
      marginRight: 12,
    },
  });
  
export default MemoryMapScreen;
