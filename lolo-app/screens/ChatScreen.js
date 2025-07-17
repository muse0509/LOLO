// screens/ChatScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// --- アセットのインポート ---
const PFP_MAIN = require('../assets/images/pfp.png');
const PFP_TOM = require('../assets/images/pfp_tom.png');

// --- モックデータ ---
const initialMessages = [
    { id: '1', text: 'Hey, are you free this weekend?', user: 'Tom', avatar: PFP_TOM },
    { id: '2', text: 'I was thinking of checking out that new gallery downtown.', user: 'Tom', avatar: PFP_TOM },
    { id: '3', text: 'Sounds cool! I should be free on Saturday.', user: 'Me', avatar: PFP_MAIN },
];

const ChatScreen = ({ route, navigation }) => {
    const { chatName, chatAvatar } = route.params; // 前の画面からチャット相手の情報を受け取る
    const [messages, setMessages] = useState(initialMessages);
    const [inputText, setInputText] = useState('');

    // メッセージ送信処理
    const handleSend = () => {
        if (inputText.trim().length > 0) {
            const newMessage = {
                id: (messages.length + 1).toString(),
                text: inputText,
                user: 'Me',
                avatar: PFP_MAIN,
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setInputText('');
        }
    };

    // メッセージのレンダリング
    const renderMessage = ({ item }) => {
        const isMyMessage = item.user === 'Me';
        return (
            <View style={[styles.messageRow, isMyMessage ? styles.myMessageRow : styles.otherMessageRow]}>
                {!isMyMessage && <Image source={item.avatar} style={styles.avatar} />}
                <View style={[styles.messageBubble, isMyMessage ? styles.myMessageBubble : styles.otherMessageBubble]}>
                    <Text style={styles.messageText}>{item.text}</Text>
                </View>
                {isMyMessage && <Image source={item.avatar} style={styles.avatar} />}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Image source={chatAvatar} style={styles.headerAvatar} />
                <Text style={styles.headerTitle}>{chatName}</Text>
                <View style={{width: 24}} />
            </View>

            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                style={styles.messageList}
                contentContainerStyle={{ paddingVertical: 10 }}
            />

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
    messageList: {
        flex: 1,
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 5,
        paddingHorizontal: 10,
    },
    myMessageRow: {
        justifyContent: 'flex-end',
    },
    otherMessageRow: {
        justifyContent: 'flex-start',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 5,
    },
    messageBubble: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        maxWidth: '75%',
    },
    myMessageBubble: {
        backgroundColor: '#007AFF',
    },
    otherMessageBubble: {
        backgroundColor: '#E5E5EA',
    },
    messageText: {
        fontSize: 16,
        color: '#fff',
    },
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
    sendButton: {
        marginLeft: 10,
    },
});

export default ChatScreen;