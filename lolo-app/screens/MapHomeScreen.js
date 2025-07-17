// screens/MapHomeScreen.js - Displays Moments
// ==================================================
// + ADD: MomentMarker component to display events with images
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';

// --- assets ---
const MAP_IMG  = require('../assets/images/map_background.png');
const ETH_LOGO = require('../assets/images/eth_logo.png');
const SOL_LOGO = require('../assets/images/sol_logo.png');
const PFP_MAIN = require('../assets/images/pfp.png');
const PFP_TOM  = require('../assets/images/pfp_tom.png');
const PFP_USER2= require('../assets/images/pfp_user2.png');

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/* ---------------- current‑location pulse ---------------- */
const CurrentUserLocationMarker = ({ radius, isVisible }) => {
    const pulse = useRef(new Animated.Value(0)).current;
    const animatedRadius = useRef(new Animated.Value(radius)).current;

    useEffect(() => {
        if (!isVisible) {
            pulse.stopAnimation();
            return;
        };
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, { toValue: 1, duration: 2000, easing: Easing.out(Easing.quad), useNativeDriver: false }),
                Animated.timing(pulse, { toValue: 0, duration: 0, useNativeDriver: false }),
            ]),
        );
        loop.start();
        return () => loop.stop();
    }, [pulse, isVisible]);

    useEffect(() => {
        Animated.spring(animatedRadius, {
            toValue: radius,
            friction: 7,
            useNativeDriver: false,
        }).start();
    }, [radius, animatedRadius]);

    const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 2] });
    const opacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.7, 0] });

    const pulseStyle = {
        width: animatedRadius,
        height: animatedRadius,
        borderRadius: Animated.divide(animatedRadius, 2),
        backgroundColor: 'rgba(0,191,255,0.3)',
        transform: [{ scale }],
        opacity,
    };

    const wrapperStyle = {
        ...styles.locWrapper,
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
    };

    if (!isVisible) {
        return <View style={wrapperStyle}><View style={styles.locDot} /></View>;
    }

    return (
      <View style={wrapperStyle}>
        <Animated.View style={[styles.locPulse, pulseStyle]} />
        <View style={styles.locDot} />
      </View>
    );
  };

/* ---------------- simple avatar marker ---------------- */
const UserMarker = ({ avatar, style, children, onPress }) => (
  <TouchableOpacity style={[styles.userMarkerContainer, style]} onPress={onPress}>
    <Image source={avatar} style={styles.userAvatar} />
    {children}
  </TouchableOpacity>
);

/* ---------------- speech bubble ---------------- */
const InfoPopup = ({ message, style }) => (
  <View style={[styles.infoPopup, style]}>
    <Text style={styles.infoText}>{message}</Text>
    <View style={styles.popupTail} />
  </View>
);

/* ---------------- horizontal score ticker ---------------- */
const ScoreTicker = ({ score, username, style }) => (
  <View style={[styles.scoreTicker, style]}>
    <Image source={ETH_LOGO} style={styles.tickerAsset} />
    <Text style={styles.tickerScore}>{score}</Text>
    <Text style={styles.tickerUser}>{username}</Text>
  </View>
);

/* ---------------- green badge with Sol logo ---------------- */
const ScoreBadge = ({ score, style }) => (
  <View style={[styles.scoreBadge, style]}>
    <Image source={SOL_LOGO} style={styles.badgeAsset} />
    <Text style={styles.scoreBadgeText}>{score}</Text>
  </View>
);

// ★★★ MomentMarkerコンポーネントを追加 ★★★
const MomentMarker = ({ moment, style }) => (
    <TouchableOpacity style={[styles.momentMarker, style]}>
        {moment.image ? (
            <Image source={{ uri: moment.image }} style={styles.momentImage} />
        ) : (
            <Text style={styles.momentText}>{moment.name.substring(0, 2)}</Text>
        )}
    </TouchableOpacity>
);


/* ================================================== */
const MapHomeScreen = ({ navigation, events, isRadiusVisible }) => {
  const [selectedAsset, setSelectedAsset] = useState(0);
  const [radius, setRadius] = useState(60);

  const assets = [
    { id: 'eth', image: ETH_LOGO },
    { id: 'sol', image: SOL_LOGO },
    { id: 'punks', icon: 'diamond-stone' },
    { id: 'add',  icon: 'plus' },
  ];

  const avatars = { main: PFP_MAIN, tom: PFP_TOM, user2: PFP_USER2 };

  const handleAssetPress = (asset, index) => {
    if (asset.id === 'add') {
        navigation.navigate('EventCreation');
    } else {
        setSelectedAsset(index);
    }
  };

  const navigateToProfile = (username) => {
      navigation.navigate('Profile', { username });
  };

  return (
    <View style={styles.root}>
      {/* map layer */}
      <View style={styles.zoomContainer}>
        <Image source={MAP_IMG} style={styles.mapImage} resizeMode="cover" />
        <View style={styles.overlay} />

        {/* floating widgets */}
        <CurrentUserLocationMarker radius={radius} isVisible={isRadiusVisible} />
        <ScoreTicker score="+400" username="tom.eth" style={{ top: '30%', left: '8%' }} />
        <ScoreBadge  score="+100" style={{ top: '45%', left: '65%' }} />

        <UserMarker
          avatar={avatars.tom}
          style={{ top: '55%', left: '20%' }}
          onPress={() => navigateToProfile('Tom')}
        />
        <UserMarker
          avatar={avatars.user2}
          style={{ top: '65%', left: '50%' }}
          onPress={() => navigateToProfile('User 2')}
        >
          <InfoPopup message="Hey, want to meet at the pier?" style={{ position: 'absolute', bottom: 50, right: -20 }} />
        </UserMarker>
        
        {/* ★★★ EventMarkerをMomentMarkerに変更 ★★★ */}
        {events.map((moment, index) => (
            <MomentMarker 
                key={moment.id} 
                moment={moment} 
                style={{ top: `${40 + index * 10}%`, left: `${75 - index * 15}%` }} 
            />
        ))}
      </View>

      {/* fixed top & bottom UI */}
      <SafeAreaView style={styles.uiContainer} edges={['top', 'bottom']} pointerEvents="box-none">
        <View style={styles.topUiWrapper} pointerEvents="box-auto">
          <TouchableOpacity
            style={styles.mailBtn}
            onPress={() => navigation?.navigate?.('Messages')}
          >
            <Ionicons name="mail" size={22} color="#000" />
          </TouchableOpacity>

          <View style={styles.assetStack}>
            <View style={styles.assetBox}>
              {assets.map((a, i) => (
               <TouchableOpacity key={a.id} style={[styles.assetBtn, selectedAsset === i && styles.assetActive]} onPress={() => handleAssetPress(a, i)}>
               {a.image ? (
                 <Image source={a.image} style={styles.assetImg} />
               ) : (
                 <MaterialCommunityIcons name={a.icon} size={20} color={selectedAsset === i && a.id !== 'add' ? '#000' : '#fff'} />
               )}
             </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.avatarBtn} onPress={() => navigation.navigate('PrivacySettings')}>
              <Image source={PFP_MAIN} style={styles.avatarImg} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomBar} pointerEvents="box-auto">
          <Slider
            style={{ flex: 1 }}
            minimumValue={20}
            maximumValue={200}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#000"
            value={radius}
            onValueChange={setRadius}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

/* ====================== styles ===================== */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#e9e4dc', overflow: 'hidden' },
  zoomContainer: { width: screenWidth, height: screenHeight },
  mapImage: { position: 'absolute', width: '100%', height: '100%' },
  overlay:   { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.15)' },

  uiContainer: { ...StyleSheet.absoluteFillObject, justifyContent: 'space-between' },
  topUiWrapper:{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12 },
  bottomBar:   { paddingHorizontal: 20, paddingBottom: 20 },

  // ★★★ MomentMarkerのスタイルを追加 ★★★
  momentMarker: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    overflow: 'hidden',
  },
  momentImage: {
    width: '100%',
    height: '100%',
  },
  momentText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },

  mailBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },

  assetStack:{ alignItems: 'flex-end' },
  assetBox:  { backgroundColor: 'rgba(0,0,0,0.85)', padding: 6, borderRadius: 26, marginBottom: 12 },
  assetBtn:  { padding: 6, borderRadius: 18, marginVertical: 2 },
  assetActive:{ backgroundColor: '#fff' },
  assetImg:  { width: 22, height: 22, resizeMode: 'contain' },
  avatarBtn: { borderWidth: 2, borderColor: '#fff', borderRadius: 26 },
  avatarImg: { width: 52, height: 52, borderRadius: 26 },

  infoPopup:{ backgroundColor: '#fff', paddingHorizontal: 7, paddingVertical: 9, borderRadius: 6, maxWidth: 1900,
              shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
  infoText: { fontFamily: 'EBGaramond-Regular', color: '#333' },
  popupTail:{ position: 'absolute', bottom: -8, left: 10, width: 0, height: 0, borderLeftWidth: 8, borderRightWidth: 8, borderTopWidth: 8,
              borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#fff' },

  scoreTicker:{ position: 'absolute', flexDirection: 'row', alignItems: 'center', gap: 6,
               backgroundColor: 'rgba(0,0,0,0.85)', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20 },
  tickerAsset:{ width: 18, height: 18, resizeMode: 'contain' },
  tickerScore:{ fontFamily: 'EBGaramond-Bold', fontSize: 18, color: '#fff' },
  tickerUser: { fontFamily: 'EBGaramond-Regular', fontSize: 14, color: '#eee' },

  scoreBadge:{ position: 'absolute', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.85)',
              paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16 },
  badgeAsset:{ width: 16, height: 16, resizeMode: 'contain', marginRight: 4 },
  scoreBadgeText:{ fontFamily: 'EBGaramond-Bold', fontSize: 16, color: '#fff' },

  locWrapper:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    alignItems: 'center',
    justifyContent: 'center'
},
  locPulse:  {
    position: 'absolute',
},
  locDot:    {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#00BFFF',
    borderWidth: 2,
    borderColor: '#fff'
},

  userMarkerContainer:{ position: 'absolute' },
  userAvatar:{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#fff',
               shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3, elevation: 5 },
});

export default MapHomeScreen;