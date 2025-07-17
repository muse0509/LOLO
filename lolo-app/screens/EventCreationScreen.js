// screens/EventCreationScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  Alert,
  Image, // Imageコンポーネントを追加
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker'; // ImagePickerをインポート

// AndroidでLayoutAnimationを有効にするための設定
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// 展開・折りたたみ可能なセクションのためのコンポーネント
const CollapsibleSection = ({ title, children, isOpen, onToggle }) => {
  return (
    <View style={styles.collapsibleContainer}>
      <TouchableOpacity onPress={onToggle} style={styles.collapsibleHeader}>
        <Icon name={isOpen ? "chevron-down" : "chevron-forward"} size={20} color="#333" />
        <Text style={styles.collapsibleTitle}>{title}</Text>
      </TouchableOpacity>
      {isOpen && <View style={styles.collapsibleContent}>{children}</View>}
    </View>
  );
};


const EventCreationScreen = ({ navigation, addEvent }) => {
  // 各入力フィールドの状態
  const [eventName, setEventName] = useState('');
  const [eventFor, setEventFor] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [image, setImage] = useState(null); // 選択された画像のURIを保存

  // 展開セクションの状態
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionName) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  // 画像を選択する関数
  const pickImage = async () => {
    // Media Libraryへのアクセス許可をリクエスト
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  // 「Create」ボタンが押された時の処理
  const handleCreateEvent = () => {
    if (!eventName.trim()) {
        Alert.alert('Error', 'Please enter an event name.');
        return;
    }

    const newEvent = {
        name: eventName,
        for: eventFor,
        location: eventLocation,
        image: image, // 画像のURIを追加
    };
    
    addEvent(newEvent);
    navigation.goBack();
  };


  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.modal}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Create a Moment</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="close" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Moment Name</Text>
                    <TextInput
                        placeholder="e.g., Sunset at the park"
                        style={styles.input}
                        value={eventName}
                        onChangeText={setEventName}
                    />
                </View>

                {/* 画像アップロードセクション */}
                <View style={styles.formGroup}>
                   <Text style={styles.label}>Photo</Text>
                   <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
                     {image ? (
                        <Image source={{ uri: image }} style={styles.previewImage} />
                     ) : (
                        <>
                            <Icon name="cloud-upload-outline" size={30} color="#888" />
                            <Text style={styles.uploadText}>Tap to select a photo</Text>
                        </>
                     )}
                   </TouchableOpacity>
                </View>

                <CollapsibleSection
                  title="Details"
                  isOpen={openSection === 'details'}
                  onToggle={() => toggleSection('details')}
                >
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>For</Text>
                        <TextInput
                            placeholder="ETH holders, Community..."
                            style={styles.input}
                            value={eventFor}
                            onChangeText={setEventFor}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Location</Text>
                        <TextInput
                            placeholder="Location or coordinates..."
                            style={styles.input}
                            value={eventLocation}
                            onChangeText={setEventLocation}
                        />
                    </View>
                </CollapsibleSection>

                <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
                    <Text style={styles.createButtonText}>Create Moment</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' },
  scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
  },
  modal: {
    width: '90%',
    backgroundColor: '#F8F5F0',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontFamily: 'EBGaramond-Regular', fontSize: 24, color: '#333' },
  formGroup: { marginBottom: 20 },
  label: { fontFamily: 'EBGaramond-Regular', fontSize: 16, color: '#333', marginBottom: 8 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 12,
    fontSize: 16,
    borderRadius: 4,
    width: '100%',
    fontFamily: 'EBGaramond-Regular',
  },
  collapsibleContainer: {
      borderBottomWidth: 1,
      borderColor: '#eee',
      marginBottom: 15,
  },
  collapsibleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  collapsibleTitle: { fontFamily: 'EBGaramond-Bold', fontSize: 18, color: '#333', marginLeft: 10 },
  collapsibleContent: {
      paddingTop: 10,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: '#DDD',
    borderStyle: 'dashed',
    borderRadius: 4,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden', // 画像がはみ出さないように
  },
  uploadText: { fontFamily: 'monospace', color: '#888', marginTop: 10 },
  previewImage: {
      width: '100%',
      height: '100%',
  },
  createButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: { fontFamily: 'EBGaramond-Bold', fontSize: 18, color: '#333' },
});


export default EventCreationScreen;