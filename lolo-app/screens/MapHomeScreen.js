// screens/MapHomeScreen.js - Enhanced with new features
// ==================================================
// + Fixed marker positioning bug
// + Relocated "Create Event" button
// + Added new visibility toggle button
// ==================================================

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Dimensions,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // For group icon
import Slider from '@react-native-community/slider';


// --- assets ---
const MAP_IMG  = require('../assets/images/map.png');
const ETH_LOGO = require('../assets/images/eth_logo.png');
const SOL_LOGO = require('../assets/images/sol_logo.png');
const PFP_MAIN = require('../assets/images/pfp.png');
const PFP_TOM  = require('../assets/images/pfp_tom.png');
const PFP_USER2= require('../assets/images/pfp_user2.png');
const MEMORY_ICON_DEFAULT = require('../assets/images/music.png'); // Default icon for events

// New asset images for the selection modal
const BTC_LOGO = require('../assets/images/bitcoin.png'); // Add btc_logo.png to assets
const XRP_LOGO = require('../assets/images/xrp.png'); // Add xrp_logo.png to assets
const HYPE_LOGO = require('../assets/images/hype.png'); // Add hype_logo.png to assets
const PENGU_NFT = require('../assets/images/nft.png'); // Add pengu_nft.png to assets


// Enhanced memories data - simulating a long-time Lolo user
const memories = [
  { id: '1', title: 'Going to the beach', icon: require('../assets/images/beach.png'), position: { top: '20%', left: '30%' }, images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'] },
  { id: '2', title: 'Movie with babe', icon: require('../assets/images/love.png'), position: { top: '40%', left: '60%' }, images: ['https://images.unsplash.com/photo-1489599558418-e776f26c7fc2?w=400', 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400'] },
  { id: '3', title: 'Diplo concert', icon: require('../assets/images/music.png'), position: { top: '46%', left: '25%' }, images: ['https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'] },
  { id: '4', title: 'Walk with Muse', icon: require('../assets/images/walking.png'), position: { top: '70%', left: '70%' }, images: ['https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400'] },
  { id: '5', title: 'Coffee date', icon: require('../assets/images/coffee.png'), position: { top: '30%', left: '65%' }, images: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400'] },
  { id: '6', title: 'Drinks with friends', icon: require('../assets/images/beer.png'), position: { top: '75%', left: '20%' }, images: ['https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400', 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400'] },
];

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


// --- Loading Screen Component ---
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#000" />
    <Text style={styles.loadingText}>Loading Map...</Text>
  </View>
);


// --- MODIFICATION (Point 3) --- New Animated Component to fix positioning bug
const AnimatedTouchableOpacity = ({ onPress, style, children, isVisible, delay }) => {
    const anim = useRef(new Animated.Value(0)).current;
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    useEffect(() => {
        Animated.timing(anim, {
            toValue: isVisible ? 1 : 0,
            duration: 500,
            delay: isVisible ? delay : 0,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, [isVisible, anim]);

    const animationStyle = {
        opacity: anim,
        transform: [{
            scale: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
            }),
        }],
    };

    return (
        <AnimatedTouchable onPress={onPress} style={[style, animationStyle]}>
            {children}
        </AnimatedTouchable>
    );
};


// --- Memory Detail Modal (Unified) ---
const MemoryDetailModal = ({ visible, memory, onClose }) => {
  if (!memory) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlayBottom} activeOpacity={1} onPress={onClose}>
        <View style={styles.modalContentBottom}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{memory.title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
            {memory.images && memory.images.length > 0 ? (
                memory.images.map((image, index) => <Image key={index} source={{ uri: image }} style={styles.memoryImage} />)
            ) : (
                <View style={styles.noImageContainer}>
                    <Text style={styles.noImageText}>No images for this memory.</Text>
                </View>
            )}
          </ScrollView>
          <View style={styles.memoryInfo}>
            <Image source={memory.icon} style={styles.modalIcon} />
            <Text style={styles.memoryDescription}>
              A memory you created with Lolo.
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// --- Asset Selection Modal ---
const assetModalItems = [
  { id: 'btc', name: 'Bitcoin', image: BTC_LOGO, type: 'Crypto' },
  { id: 'xrp', name: 'XRP', image: XRP_LOGO, type: 'Crypto' },
  { id: 'hype', name: 'HypeCoin', image: HYPE_LOGO, type: 'Crypto' },
  { id: 'pengu', name: 'Pengu', image: PENGU_NFT, type: 'NFT' },
  { id: 'friends', name: 'Best Friends', icon: 'user-friends', type: 'Group' },
];

const AssetSelectionModal = ({ visible, onClose, onSelect }) => {
  const handleSelect = (item) => {
    console.log('Selected:', item);
    onSelect(item);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlayBottom} activeOpacity={1} onPress={onClose}>
        <View style={styles.assetModalContent}>
          <Text style={styles.assetModalTitle}>Select Asset or Group</Text>
          <View style={styles.assetGrid}>
            {assetModalItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.assetItem} onPress={() => handleSelect(item)}>
                {item.image ? (
                  <Image source={item.image} style={styles.assetItemImage} />
                ) : (
                  <FontAwesome5 name={item.icon} size={40} color="#333" />
                )}
                <Text style={styles.assetItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};


/* ---------------- reusable pulse ring ---------------- */
const PulseRing = ({ diameter = 120, color = 'rgba(0,191,255,0.5)', visible = true }) => {
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!visible) return;
    const loop = Animated.loop(Animated.sequence([Animated.timing(pulse, { toValue: 1, duration: 2000, easing: Easing.out(Easing.quad), useNativeDriver: false }), Animated.timing(pulse, { toValue: 0, duration: 0, useNativeDriver: false }),]),);
    loop.start();
    return () => loop.stop();
  }, [pulse, visible]);
  if (!visible) return null;
  const scale   = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 2] });
  const opacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.7, 0] });
  return (<Animated.View style={{ position: 'absolute', width: diameter, height: diameter, borderRadius: diameter / 2, backgroundColor: color, transform: [{ scale }], opacity, }} />);
};

/* ---------------- current‑location pulse ---------------- */
const CurrentUserLocationMarker = ({ radius, isVisible }) => {
  const animatedRadius = useRef(new Animated.Value(radius)).current;
  useEffect(() => { Animated.spring(animatedRadius, { toValue: radius, friction: 7, useNativeDriver: false, }).start(); }, [radius, animatedRadius]);
  const wrapperStyle = { ...styles.locWrapper, width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius, };
  return (
    <View style={wrapperStyle} pointerEvents="none">
      <PulseRing diameter={radius * 2} visible={isVisible} />
      <View style={styles.locDot} />
    </View>
  );
};

/* ---------------- simple avatar marker with glow ---------------- */
const GlowingAvatarMarker = ({ avatar, style, onPress, glowVisible }) => (
  <TouchableOpacity style={[styles.userMarkerContainer, style]} onPress={onPress}>
    <PulseRing diameter={80} visible={glowVisible} />
    <Image source={avatar} style={styles.userAvatar} />
  </TouchableOpacity>
);

/* ---------------- speech bubble ---------------- */
const InfoPopup = ({ message, style }) => {
  return (
    <View style={[styles.infoPopup, style]}>
      <Text style={styles.infoText}>{message}</Text>
      <View style={styles.popupTail} />
    </View>
  );
};

/* ---------------- horizontal score ticker ---------------- */
const ScoreTicker = ({ score, username, style }) => ( <View style={[styles.scoreTicker, style]}> <Image source={ETH_LOGO} style={styles.tickerAsset} /> <Text style={styles.tickerScore}>{score}</Text> <Text style={styles.tickerUser}>{username}</Text> </View> );

/* ---------------- green badge with Sol logo ---------------- */
const ScoreBadge = ({ score, style }) => ( <View style={[styles.scoreBadge, style]}> <Image source={SOL_LOGO} style={styles.badgeAsset} /> <Text style={styles.scoreBadgeText}>{score}</Text> </View> );

/* ================================================== */
const MapHomeScreen = ({ navigation, events = [] }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState(0);
  const [radius, setRadius] = useState(60);
  const [userPulseVisible, setUserPulseVisible] = useState(true);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [memoryModalVisible, setMemoryModalVisible] = useState(false);
  const [assetModalVisible, setAssetModalVisible] = useState(false);
  const [showAllMarkers, setShowAllMarkers] = useState(true);

  const assets = [ { id: 'eth', image: ETH_LOGO }, { id: 'sol', image: SOL_LOGO }, { id: 'punks', icon: 'diamond-stone' }, { id: 'add',  icon: 'plus' }, ];
  const avatars = { main: PFP_MAIN, tom: PFP_TOM, user2: PFP_USER2 };

  useEffect(() => {
    const networkImages = memories.flatMap(m => m.images.map(uri => Image.prefetch(uri)));
    
    Promise.all(networkImages)
      .catch(err => console.warn("Image prefetch failed:", err))
      .finally(() => {
        setTimeout(() => setIsLoading(false), 1000);
      });
  }, []);

  const handleAssetPress = (asset, index) => {
    if (asset.id === 'add') {
      setAssetModalVisible(true);
    } else {
      setSelectedAsset(index);
    }
  };

  const navigateToProfile = (username) => { navigation.navigate('Profile', { username }); };

  const handleMarkerPress = (markerData) => {
    const formattedMarker = {
      id: markerData.id,
      title: markerData.title || markerData.name,
      images: markerData.images || (markerData.image ? [markerData.image] : []),
      icon: markerData.icon || MEMORY_ICON_DEFAULT,
    };
    setSelectedMemory(formattedMarker);
    setMemoryModalVisible(true);
  };

  const closeModal = () => {
    setMemoryModalVisible(false);
    setSelectedMemory(null);
  };

  const handleAssetSelect = (item) => {
    // Logic for after asset selection
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.root}>
      {/* map layer */}
      <View style={styles.zoomContainer}>
        <Image source={MAP_IMG} style={[styles.mapImage, { transform: [{ scale: 3 }] }]} resizeMode="contain" />
        <View style={styles.overlay} />

        {/* floating widgets */}
        <CurrentUserLocationMarker radius={radius} isVisible={userPulseVisible} />
        <ScoreTicker score="+400" username="" style={{ top: '30%', left: '8%' }} />
        <ScoreBadge  score="+100" style={{ top: '45%', left: '65%' }} />

        <GlowingAvatarMarker avatar={avatars.tom} style={{ top: '55%', left: '20%' }} glowVisible={true} onPress={() => navigateToProfile('Tom')} />
        <GlowingAvatarMarker avatar={avatars.user2} style={{ top: '65%', left: '50%' }} glowVisible={true} onPress={() => navigateToProfile('User 2')} />
        
        <InfoPopup message="Hey, want to meet at the pier?" style={{ position: 'absolute', bottom: '36%', left: '47%' }} />

        {/* Memory markers */}
        {memories.map((mem, index) => (
          <AnimatedTouchableOpacity
            key={`mem-${mem.id}`}
            style={[styles.memoryMarker, mem.position]}
            isVisible={showAllMarkers}
            delay={index * 50}
            onPress={() => handleMarkerPress(mem)}
          >
            <Image source={mem.icon} style={styles.markerIcon} />
          </AnimatedTouchableOpacity>
        ))}

        {/* events (if any) */}
        {events.map((moment, index) => (
          <AnimatedTouchableOpacity
            key={`evt-${moment.id}`}
            style={[styles.eventMarker, { top: `${40 + index * 10}%`, left: `${75 - index * 15}%` }]}
            isVisible={showAllMarkers}
            delay={(memories.length + index) * 50}
            onPress={() => handleMarkerPress(moment)}
          >
            <Text style={styles.eventText}>{moment.name?.substring(0, 2) || 'E'}</Text>
          </AnimatedTouchableOpacity>
        ))}
      </View>

      {/* fixed top & bottom UI */}
      <SafeAreaView style={styles.uiContainer} edges={['top', 'bottom']} pointerEvents="box-none">
        <View style={styles.topUiWrapper} pointerEvents="box-auto">
            {/* --- MODIFICATION (Point 1) --- Buttons stacked on the left */}
            <View>
                <TouchableOpacity style={styles.mailBtn} onPress={() => navigation?.navigate?.('Messages')}>
                    <Ionicons name="mail" size={22} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.mailBtn, { marginTop: 12 }]} // Re-use style
                    onPress={() => navigation.navigate('EventCreation')}
                >
                    <MaterialCommunityIcons name="calendar-plus" size={22} color="#000" />
                </TouchableOpacity>
            </View>

          <View style={styles.assetStack}>
            <View style={styles.assetBox}>
              {assets.map((a, i) => (
                <TouchableOpacity key={a.id} style={[styles.assetBtn, selectedAsset === i && styles.assetActive]} onPress={() => handleAssetPress(a, i)}>
                  {a.image ? (<Image source={a.image} style={styles.assetImg} /> ) : ( <MaterialCommunityIcons name={a.icon} size={20} color={selectedAsset === i && a.id !== 'add' ? '#000' : '#fff'} /> )}
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.avatarBtn} onPress={() => navigation.navigate('PrivacySettings')}>
              <Image source={PFP_MAIN} style={styles.avatarImg} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.bottomBar} pointerEvents="box-auto">
          <Slider style={{ flex: 1, marginRight: 12 }} minimumValue={20} maximumValue={200} minimumTrackTintColor="#000" maximumTrackTintColor="#ccc" thumbTintColor="#000" value={radius} onValueChange={setRadius} />
          
          <TouchableOpacity style={styles.toggleBtn} onPress={() => setUserPulseVisible((prev) => !prev)}>
            <Ionicons name={userPulseVisible ? 'eye' : 'eye-off'} size={22} color="#000" />
          </TouchableOpacity>
          
          {/* --- MODIFICATION (Point 2) --- New visibility toggle button */}
          <TouchableOpacity style={[styles.toggleBtn, { marginLeft: 10 }]} onPress={() => setShowAllMarkers((prev) => !prev)}>
          <Ionicons name={showAllMarkers ? 'grid' : 'grid-outline'} size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Modals */}
      <MemoryDetailModal visible={memoryModalVisible} memory={selectedMemory} onClose={closeModal} />
      <AssetSelectionModal visible={assetModalVisible} onClose={() => setAssetModalVisible(false)} onSelect={handleAssetSelect} />
    </View>
  );
};

/* ====================== styles ===================== */
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9e4dc',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'EBGaramond-Regular',
  },
  root: { flex: 1, backgroundColor: '#e9e4dc', overflow: 'hidden' },
  zoomContainer: { width: screenWidth, height: screenHeight },
  mapImage: { position: 'absolute', width: '100%', height: '90%' },
  overlay: { position: 'absolute', width: '100%', height: '100%' },

  uiContainer: { ...StyleSheet.absoluteFillObject, justifyContent: 'space-between' },
  topUiWrapper: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12, alignItems: 'flex-start' },
  bottomBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },

  toggleBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 4 },
  markerIcon: { width: 28, height: 28, resizeMode: 'contain' },
  modalIcon: { width: 48, height: 48, marginBottom: 10, resizeMode: 'contain' },

  memoryMarker: { position: 'absolute', width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255, 255, 255, 0.95)', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 6, },
  eventMarker: { position: 'absolute', width: 40, height: 40, borderRadius: 8, backgroundColor: 'rgba(0, 191, 255, 0.9)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff', },
  eventText: { color: '#fff', fontWeight: 'bold', fontSize: 14, },

  modalOverlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContentBottom: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
    maxHeight: '70%',
  },

  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', flex: 1, fontFamily: 'EBGaramond-Regular', },
  closeButton: { padding: 8, },
  imageScroll: { marginBottom: 20, },
  memoryImage: { width: 200, height: 150, borderRadius: 12, marginRight: 12, },
  noImageContainer: {
    width: 200,
    height: 150,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
      color: '#888',
      fontFamily: 'EBGaramond-Regular',
  },
  memoryInfo: { alignItems: 'center', fontFamily: 'EBGaramond-Regular', },
  memoryDescription: { fontSize: 16, color: '#666', textAlign: 'center', fontStyle: 'italic', fontFamily: 'EBGaramond-Regular', },

  mailBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 4, },
  assetStack: { alignItems: 'flex-end' },
  assetBox: { backgroundColor: 'rgba(0,0,0,0.85)', padding: 6, borderRadius: 26, marginBottom: 12 },
  assetBtn: { padding: 6, borderRadius: 18, marginVertical: 2 },
  assetActive: { backgroundColor: '#fff' },
  assetImg: { width: 22, height: 22, resizeMode: 'contain' },
  avatarBtn: { borderWidth: 2, borderColor: '#fff', borderRadius: 26 },
  avatarImg: { width: 52, height: 52, borderRadius: 26 },

  infoPopup: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 9, borderRadius: 6, minWidth: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
  infoText: { fontFamily: 'EBGaramond-Regular', color: '#333' },
  popupTail: { position: 'absolute', bottom: -8, left: 20, width: 0, height: 0, borderLeftWidth: 8, borderRightWidth: 8, borderTopWidth: 8, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#fff' },

  scoreTicker: { position: 'absolute', flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(0,0,0,0.85)', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20 },
  tickerAsset: { width: 18, height: 18, resizeMode: 'contain' },
  tickerScore: { fontFamily: 'EBGaramond-Bold', fontSize: 18, color: '#fff' },
  tickerUser: { fontFamily: 'EBGaramond-Regular', fontSize: 14, color: '#eee' },

  scoreBadge: { position: 'absolute', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.85)', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16 },
  badgeAsset: { width: 16, height: 16, resizeMode: 'contain', marginRight: 4 },
  scoreBadgeText: { fontFamily: 'EBGaramond-Bold', fontSize: 16, color: '#fff' },

  locWrapper: { position: 'absolute', top: '50%', left: '50%', alignItems: 'center', justifyContent: 'center' },
  locDot: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#00BFFF', borderWidth: 2, borderColor: '#fff', shadowColor: '#00BFFF', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.9, shadowRadius: 6, elevation: 6, },

  userMarkerContainer: { position: 'absolute' },
  userAvatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#fff', shadowColor: '#00BFFF', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 6, elevation: 5 },

  assetModalContent: {
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    width: '100%',
  },
  assetModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
    fontFamily: 'EBGaramond-Bold',
  },
  assetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  assetItem: {
    width: '40%',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  assetItemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  assetItemText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'EBGaramond-Regular',
  },
});

export default MapHomeScreen;