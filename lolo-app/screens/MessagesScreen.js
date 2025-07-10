import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// モックデータ（サンプルのメッセージ一覧）
const messagesData = [
  { id: '1', type: 'dm', from: 'alex', text: 'coordinates received', time: '14:32' },
  { id: '2', type: 'group', from: 'studio collective', text: 'meeting notes', time: '12:15' },
  { id: '3', type: 'dm', from: 'morgan', text: 'site analysis complete', time: '09:43' },
  { id: '4', type: 'group', from: 'research team', text: 'documentation updated', time: 'yesterday' },
  { id: '5', type: 'dm', from: 'sage', text: 'draft ready for review', time: 'yesterday' },
];

const MessagesScreen = ({ navigation }) => {
  // FlatListの各行をレンダリングするコンポーネント
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.messageItem}>
      <View style={styles.iconContainer}>
        {item.type === 'dm' ? (
          <View style={styles.dmIcon} />
        ) : (
          <MaterialCommunityIcons name="diamond-outline" size={14} color="#555" />
        )}
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.fromText}>{item.from}</Text>
        <Text style={styles.previewText}>{item.text}</Text>
      </View>
      <Text style={styles.timeText}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput placeholder="Search" style={styles.searchInput} />
        <TouchableOpacity style={styles.plusButton}>
          <Icon name="add" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messagesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5F0' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: { fontFamily: 'EBGaramond-Regular', fontSize: 36, color: '#333' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
    paddingHorizontal: 20,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: 50, fontSize: 16, fontFamily: 'EBGaramond-Regular' },
  plusButton: { marginLeft: 10 },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  iconContainer: { width: 30 },
  dmIcon: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#888',
    marginLeft: 2,
  },
  messageContent: { flex: 1, marginLeft: 10 },
  fromText: { fontFamily: 'EBGaramond-Bold', fontSize: 18, color: '#333' },
  previewText: { fontFamily: 'EBGaramond-Regular', fontSize: 16, color: '#777' },
  timeText: { fontFamily: 'EBGaramond-Regular', fontSize: 14, color: '#999' },
  separator: { height: 1, backgroundColor: '#EAEAEA', marginLeft: 60 },
});

export default MessagesScreen;