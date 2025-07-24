// screens/ProfileScreen.js – extended social + mutual friends UI
// ==================================================
// * Shows social media links for "My Profile" (icons only)
// * For other profiles, displays follower counts per social network as icon + number
// * Adds a "Mutual Friends" face‑pile row using simple overlap styling
// ==================================================

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- Mock Data ---
const MOCK_PROFILES = {
  'My Profile': {
    name: 'You',
    avatar: require('../assets/images/pfp.png'),
    bio: 'Exploring the decentralized world, one block at a time. Creator of moments.',
    stats: { followers: '1.2k', following: '450', moments: '23' },
    socials: {
      twitter: 'https://x.com/you',
      instagram: 'https://instagram.com/you',
      linkedin: 'https://linkedin.com/in/you',
      facebook: 'https://facebook.com/you',
    },
  },
  Tom: {
    name: 'tom.eth',
    avatar: require('../assets/images/pfp_tom.png'),
    bio: 'ETH enthusiast. Building the future of finance.',
    stats: { followers: '5.8k', following: '120', moments: '5' },
    socialFollowers: { twitter: 5200, instagram: 800, linkedin: 300, facebook: 150 },
    mutualFriends: [require('../assets/images/pfp.png'), require('../assets/images/pfp_user2.png')],
  },
  'User 2': {
    name: 'yusuke',
    avatar: require('../assets/images/pfp_user2.png'),
    bio: "Just here for the vibes and the community. Let's connect!",
    stats: { followers: '340', following: '600', moments: '12' },
    socialFollowers: { twitter: 120, instagram: 90, linkedin: 30, facebook: 12 },
    mutualFriends: [require('../assets/images/pfp_tom.png')],
  },
};

/* ---------------- Social Icon Component ---------------- */
const SocialIcon = ({ platform, url, count }) => {
  const iconName = {
    twitter: 'logo-twitter',
    instagram: 'logo-instagram',
    linkedin: 'logo-linkedin',
    facebook: 'logo-facebook',
  }[platform];

  return (
    <TouchableOpacity
      style={styles.socialBtn}
      onPress={() => url && Linking.openURL(url)}
      disabled={!url}
    >
      <Ionicons name={iconName} size={22} color="#333" />
      {typeof count === 'number' && (
        <Text style={styles.socialCount}>{count > 999 ? `${(count / 1000).toFixed(1)}k` : count}</Text>
      )}
    </TouchableOpacity>
  );
};

/* ---------------- Face pile avatars ---------------- */
const FacePile = ({ images }) => (
  <View style={styles.facePileWrapper}>
    {images.map((img, idx) => (
      <Image
        key={idx.toString()}
        source={img}
        style={[styles.facePileAvatar, { left: idx * 22, zIndex: images.length - idx }]}
      />
    ))}
  </View>
);

/* ---------------- Main Component ---------------- */
const ProfileScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const profile = MOCK_PROFILES[username] || MOCK_PROFILES['User 2'];

  const socialKeys = ['twitter', 'instagram', 'linkedin', 'facebook'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header} pointerEvents="box-none">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{profile.name}</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <Image source={profile.avatar} style={styles.avatar} />
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.bio}>{profile.bio}</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {['moments', 'followers', 'following'].map((key) => (
              <View style={styles.stat} key={key}>
                <Text style={styles.statNumber}>{profile.stats[key]}</Text>
                <Text style={styles.statLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
              </View>
            ))}
          </View>

          {/* Social Icons / Follower Counts */}
          <View style={styles.socialRow}>
            {socialKeys.map((p) => (
              <SocialIcon
                key={p}
                platform={p}
                url={profile.socials?.[p]}
                count={profile.socialFollowers?.[p]}
              />
            ))}
          </View>

          {/* Mutual Friends for non‑self profiles */}
          {profile.mutualFriends && (
            <View style={styles.mutualWrapper}>
              <Text style={styles.mutualLabel}>Mutual Friends</Text>
              <FacePile images={profile.mutualFriends} />
            </View>
          )}

          {/* Message Button */}
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

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F5F0' },
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
  profileContainer: { alignItems: 'center', padding: 20 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 15,
  },
  name: { fontFamily: 'EBGaramond-Bold', fontSize: 28, color: '#333' },
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
  stat: { alignItems: 'center' },
  statNumber: { fontFamily: 'EBGaramond-Bold', fontSize: 20, color: '#333' },
  statLabel: { fontFamily: 'EBGaramond-Regular', fontSize: 14, color: '#888' },

  /* Social */
  socialRow: { flexDirection: 'row', gap: 18, marginTop: 10 },
  socialBtn: { alignItems: 'center' },
  socialCount: {
    fontFamily: 'EBGaramond-Regular',
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },

  /* Mutual Friends */
  mutualWrapper: { width: '100%', marginTop: 30 },
  mutualLabel: {
    fontFamily: 'EBGaramond-Regular',
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  facePileWrapper: { flexDirection: 'row', height: 40 },
  facePileAvatar: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },

  /* Message Button */
  messageButton: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginTop: 20,
  },
  messageButtonText: {
    fontFamily: 'EBGaramond-Bold',
    fontSize: 18,
    color: '#333',
  },
});

export default ProfileScreen;