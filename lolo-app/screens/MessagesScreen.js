// screens/MessagesScreen.js – with inline <EventCard /> support
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// --- アセットのインポート ---
const PFP_TOM   = require('../assets/images/pfp_tom.png');
const PFP_USER2 = require('../assets/images/pfp_user2.png');
const ETH_LOGO  = require('../assets/images/eth_logo.png');
const SOL_LOGO  = require('../assets/images/sol_logo.png');

/* =====================================================
 * <EventCard /> – lightweight rich‑content bubble
 * ===================================================== */
const EventCard = ({ title, when, where }) => (
  <View style={styles.eventCard}>
    <Icon name="image-outline" size={18} color="#666" style={{ marginRight: 8 }} />
    <View style={{ flex: 1 }}>
      <Text style={styles.eventTitle}>{title}</Text>
      <Text style={styles.eventMeta}>{`${when} · ${where}`}</Text>
    </View>
  </View>
);

// --- モックデータ ---
const messagesData = [
  {
    id: '1',
    type: 'token',
    name: 'ETH Whales NYC',
    avatar: ETH_LOGO,
    text: 'alex: on my way',
    time: '14:32',
  },
  {
    id: '2',
    type: 'friends',
    name: 'Best friends',
    avatar: PFP_USER2,
    members: [PFP_TOM, PFP_USER2],
    text: 'morgan: yo im at the door',
    time: '09:43',
  },
  {
    id: '3',
    type: 'club',
    name: 'Solana Miami Club',
    avatar: SOL_LOGO,
    text: 'sage: why is sol dumping',
    time: 'yesterday',
  },
  {
    id: '4',
    type: 'dm',
    name: 'Tom',
    avatar: PFP_TOM,
    text: 'See you there!',
    time: '2d',
  },
  // ★ 新しく EventCard をプレビューするためのエントリ
 
];

const MessagesScreen = ({ navigation }) => {
  const renderItem = ({ item }) => {
    // イベントカード専用レンダー
    if (item.type === 'event') {
      return (
        <TouchableOpacity
          style={styles.messageItem}
          onPress={() =>
            navigation.navigate('Chat', {
              chatName: item.name,
              chatAvatar: item.avatar,
            })
          }
        >
          <View style={styles.iconContainer}>
            <Image source={item.avatar} style={styles.groupIcon} />
          </View>
          <View style={styles.messageContent}>
            <Text style={styles.fromText}>{item.name}</Text>
            <EventCard {...item.event} />
          </View>
          <Text style={styles.timeText}>{item.time}</Text>
        </TouchableOpacity>
      );
    }

    // 既存メッセージのレンダー
    return (
      <TouchableOpacity
        style={styles.messageItem}
        onPress={() =>
          navigation.navigate('Chat', {
            chatName: item.name,
            chatAvatar: item.avatar,
          })
        }
      >
        <View style={styles.iconContainer}>
          {item.type === 'token' && <Image source={item.avatar} style={styles.groupIcon} />}
          {item.type === 'club' && <Image source={item.avatar} style={styles.groupIcon} />}
          {item.type === 'dm' && <Image source={item.avatar} style={styles.groupIcon} />}
          {item.type === 'friends' && (
            <View style={styles.friendsIconContainer}>
              <Image source={item.members[0]} style={[styles.friendIcon, { zIndex: 1, left: 0 }]} />
              <Image source={item.members[1]} style={[styles.friendIcon, { zIndex: 0, left: 15, top: 5 }]} />
            </View>
          )}
        </View>
        <View style={styles.messageContent}>
          <Text style={styles.fromText}>{item.name}</Text>
          <Text style={styles.previewText} numberOfLines={1}>
            {item.text}
          </Text>
        </View>
        <Text style={styles.timeText}>{item.time}</Text>
      </TouchableOpacity>
    );
  };

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

// スタイル
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
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendsIconContainer: { width: 50, height: 50 },
  friendIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: '#F8F5F0',
    position: 'absolute',
  },
  messageContent: { flex: 1, marginLeft: 15 },
  fromText: { fontFamily: 'EBGaramond-Bold', fontSize: 18, color: '#333' },
  previewText: { fontFamily: 'EBGaramond-Regular', fontSize: 16, color: '#777', marginTop: 2 },
  timeText: { fontFamily: 'EBGaramond-Regular', fontSize: 14, color: '#999' },
  separator: { height: 1, backgroundColor: '#EAEAEA', marginLeft: 85 },
  /* --- EventCard styles --- */
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 4,
  },
  eventTitle: { fontFamily: 'EBGaramond-Bold', fontSize: 16, color: '#333' },
  eventMeta: { fontFamily: 'EBGaramond-Regular', fontSize: 14, color: '#666', marginTop: 2 },
});

export default MessagesScreen;
