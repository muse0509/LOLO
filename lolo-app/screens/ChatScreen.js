// screens/ChatScreen.js – modern Luma‑style event card embedded in chat bubbles (FIX: thumbnail default)
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// --- アセットのインポート ---
const PFP_MAIN = require('../assets/images/pfp.png');
const PFP_TOM  = require('../assets/images/pfp_tom.png');
// サムネイルのプレースホルダー（ファイルが無い場合はご自身の画像へ置換してください）
let THUMB_PLACEHOLDER;
try {
  THUMB_PLACEHOLDER = require('../assets/images/event_thumb.png');
} catch (e) {
  // ファイルが存在しない場合は透明 1px PNG を生成（fallback）
  THUMB_PLACEHOLDER = { uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=' };
}

/* =====================================================
 * <EventCard /> – Luma / Instagram‑link preview スタイル
 * ===================================================== */
const EventCard = ({ title, datetime, location, thumbnail }) => {
  const thumbSrc = thumbnail || THUMB_PLACEHOLDER;
  return (
    <View style={styles.cardRoot}>
      <Image source={thumbSrc} style={styles.cardImg} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardMeta}>{datetime}</Text>
        <Text style={styles.cardMeta}>{location}</Text>
      </View>
    </View>
  );
};

// --- モックデータ ---
const initialMessages = [
  {
    id: '1',
    text: 'Hey, are you free this weekend?',
    user: 'Tom',
    avatar: PFP_TOM,
  },
  {
    id: '2',
    text: 'I was thinking of checking out that new gallery downtown.',
    user: 'Tom',
    avatar: PFP_TOM,
  },
  {
    id: '3',
    text: 'Sounds cool! I should be free on Saturday.',
    user: 'Me',
    avatar: PFP_MAIN,
  },
  {
    id: '4',
    type: 'event', // ★ イベントカード用
    user: 'Tom',
    avatar: PFP_TOM,
    event: {
      title: 'Gallery Meetup',
      datetime: 'Sat, 26 Jul · 7:00 PM',
      location: '21 Jump St.',
    },
  },
];

const ChatScreen = ({ route, navigation }) => {
  const { chatName, chatAvatar } = route.params;
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  // --- メッセージ送信処理 ---
  const handleSend = () => {
    if (inputText.trim().length === 0) return;

    const newMessage = {
      id: (messages.length + 1).toString(),
      text: inputText,
      user: 'Me',
      avatar: PFP_MAIN,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  // --- メッセージのレンダリング ---
  const renderMessage = ({ item }) => {
    const isMyMessage = item.user === 'Me';

    /* イベントカードメッセージ */
    if (item.type === 'event' && item.event) {
      return (
        <View style={[styles.messageRow, isMyMessage ? styles.myMessageRow : styles.otherMessageRow]}>
          {!isMyMessage && <Image source={item.avatar} style={styles.avatar} />}
          <EventCard {...item.event} />
          {isMyMessage && <Image source={item.avatar} style={styles.avatar} />}
        </View>
      );
    }

    /* テキストメッセージ */
    return (
      <View style={[styles.messageRow, isMyMessage ? styles.myMessageRow : styles.otherMessageRow]}>
        {!isMyMessage && <Image source={item.avatar} style={styles.avatar} />}
        <View style={[styles.messageBubble, isMyMessage ? styles.myMessageBubble : styles.otherMessageBubble]}>
          <Text style={[styles.messageText, !isMyMessage && styles.otherMessageText]}>{item.text}</Text>
        </View>
        {isMyMessage && <Image source={item.avatar} style={styles.avatar} />}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ----- ヘッダー ----- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Image source={chatAvatar} style={styles.headerAvatar} />
        <Text style={styles.headerTitle}>{chatName}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* ----- メッセージリスト ----- */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {/* ----- 入力欄 ----- */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Icon name="arrow-up-circle" size={32} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

/* =====================================================
 * Styles
 * ===================================================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 10,
  },
  headerTitle: {
    fontFamily: 'EBGaramond-Bold',
    fontSize: 20,
    color: '#333',
    flex: 1,
  },
  messageList: { flex: 1 },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 6,
    paddingHorizontal: 10,
  },
  myMessageRow: { justifyContent: 'flex-end' },
  otherMessageRow: { justifyContent: 'flex-start' },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  // ---- バブル ----
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    maxWidth: '75%',
  },
  myMessageBubble: { backgroundColor: '#007AFF' },
  otherMessageBubble: { backgroundColor: '#E5E5EA' },
  messageText: { fontSize: 16, color: '#fff' },
  otherMessageText: { color: '#000' },
  // ---- 入力 ----
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#EAEAEA',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: { marginLeft: 10 },
  /* ---- EventCard ---- */
  cardRoot: {
    width: 260,
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImg: { width: '100%', height: 120 },
  cardBody: { padding: 12 },
  cardTitle: { fontFamily: 'EBGaramond-Bold', fontSize: 16, color: '#333' },
  cardMeta: {
    fontFamily: 'EBGaramond-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default ChatScreen;