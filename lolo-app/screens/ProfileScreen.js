// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

// --- Mock Data ---
const MOCK_PROFILES = {
  'My Profile': {
    name: 'You',
    avatar: require('../assets/images/pfp.png'),
    bio: 'Exploring the decentralized world, one block at a time. Creator of moments.',
    stats: {
      followers: '1.2k',
      following: '450',
      moments: '23',
    },
  },
  'Tom': {
    name: 'tom.eth',
    avatar: require('../assets/images/pfp_tom.png'),
    bio: 'ETH enthusiast. Building the future of finance.',
    stats: {
      followers: '5.8k',
      following: '120',
      moments: '5',
    },
  },
  'User 2': {
    name: 'User 2',
    avatar: require('../assets/images/pfp_user2.png'),
    bio: 'Just here for the vibes and the community. Let\'s connect!',
    stats: {
      followers: '340',
      following: '600',
      moments: '12',
    },
  },
};

const ProfileScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const profile = MOCK_PROFILES[username] || MOCK_PROFILES['User 2'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{profile.name}</Text>
            <View style={{width: 24}} />
        </View>

        <View style={styles.profileContainer}>
          <Image source={profile.avatar} style={styles.avatar} />
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.bio}>{profile.bio}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{profile.stats.moments}</Text>
              <Text style={styles.statLabel}>Moments</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{profile.stats.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{profile.stats.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          {/* ★★★ Message ボタンに onPress イベントを追加 ★★★ */}
          <TouchableOpacity 
            style={styles.messageButton} 
            onPress={() => navigation.navigate('Messages')}
          >
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// スタイルは変更ありません
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F5F0',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    headerTitle: {
        fontFamily: 'EBGaramond-Bold',
        fontSize: 20,
        color: '#333',
    },
    profileContainer: {
        alignItems: 'center',
        padding: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 15,
    },
    name: {
        fontFamily: 'EBGaramond-Bold',
        fontSize: 28,
        color: '#333',
    },
    bio: {
        fontFamily: 'EBGaramond-Regular',
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#EAEAEA',
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        fontFamily: 'EBGaramond-Bold',
        fontSize: 20,
        color: '#333',
    },
    statLabel: {
        fontFamily: 'EBGaramond-Regular',
        fontSize: 14,
        color: '#888',
    },
    messageButton: {
        backgroundColor: '#fff',
        borderWidth: 1.5,
        borderColor: '#333',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 50,
        marginTop: 10,
    },
    messageButtonText: {
        fontFamily: 'EBGaramond-Bold',
        fontSize: 18,
        color: '#333',
    },
});

export default ProfileScreen;