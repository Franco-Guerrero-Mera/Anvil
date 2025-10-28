import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth } = Dimensions.get('window');

// Journal Entry Interface
interface JournalEntry {
  id: string;
  title: string;
  content: string;
  emotion: string;
  date: string;
  timestamp: number;
}

// Close Icon Component
const CloseIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 16 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.2806 14.2194C15.5737 14.5124 15.5737 14.9876 15.2806 15.2806C14.9876 15.5737 14.5124 15.5737 14.2194 15.2806L8 9.06031L1.78062 15.2806C1.48757 15.5737 1.01243 15.5737 0.719375 15.2806C0.426319 14.9876 0.426319 14.5124 0.719375 14.2194L6.93969 8L0.719375 1.78062C0.426319 1.48757 0.426319 1.01243 0.719375 0.719375C1.01243 0.426319 1.48757 0.426319 1.78062 0.719375L8 6.93969L14.2194 0.719375C14.5124 0.426319 14.9876 0.426319 15.2806 0.719375C15.5737 1.01243 15.5737 1.48757 15.2806 1.78062L9.06031 8L15.2806 14.2194Z"
      fill="#212121"
    />
  </Svg>
);

// Microphone Icon Component
const MicrophoneIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 16 22" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 15.5C10.4842 15.4974 12.4974 13.4842 12.5 11V5C12.5 2.51472 10.4853 0.5 8 0.5C5.51472 0.5 3.5 2.51472 3.5 5V11C3.50258 13.4842 5.51579 15.4974 8 15.5ZM5 5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5V11C11 12.6569 9.65685 14 8 14C6.34315 14 5 12.6569 5 11V5ZM8.75 18.4625V20.75C8.75 21.1642 8.41421 21.5 8 21.5C7.58579 21.5 7.25 21.1642 7.25 20.75V18.4625C3.41988 18.0728 0.504731 14.8499 0.5 11C0.5 10.5858 0.835786 10.25 1.25 10.25C1.66421 10.25 2 10.5858 2 11C2 14.3137 4.68629 17 8 17C11.3137 17 14 14.3137 14 11C14 10.5858 14.3358 10.25 14.75 10.25C15.1642 10.25 15.5 10.5858 15.5 11C15.4953 14.8499 12.5801 18.0728 8.75 18.4625Z"
      fill="#595755"
    />
  </Svg>
);

// Camera Icon Component
const CameraIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 6.50002H17.72L17.4 5.50002C17.1926 4.91325 16.8077 4.40553 16.2989 4.04718C15.7901 3.68884 15.1824 3.49762 14.56 3.50002H9.44C8.81155 3.5012 8.19933 3.69971 7.68977 4.06753C7.1802 4.43535 6.79901 4.95391 6.6 5.55002L6.28 6.55002H5C4.20435 6.55002 3.44129 6.86609 2.87868 7.4287C2.31607 7.99131 2 8.75437 2 9.55002V17.55C2 18.3457 2.31607 19.1087 2.87868 19.6713C3.44129 20.234 4.20435 20.55 5 20.55H19C19.7956 20.55 20.5587 20.234 21.1213 19.6713C21.6839 19.1087 22 18.3457 22 17.55V9.55002C22.0066 9.15187 21.9339 8.75638 21.7862 8.38661C21.6384 8.01684 21.4184 7.6802 21.1392 7.39631C20.86 7.11241 20.527 6.88695 20.1597 6.73307C19.7924 6.57919 19.3982 6.49997 19 6.50002ZM20 17.5C20 17.7652 19.8946 18.0196 19.7071 18.2071C19.5196 18.3947 19.2652 18.5 19 18.5H5C4.73478 18.5 4.48043 18.3947 4.29289 18.2071C4.10536 18.0196 4 17.7652 4 17.5V9.50002C4 9.23481 4.10536 8.98045 4.29289 8.79292C4.48043 8.60538 4.73478 8.50002 5 8.50002H7C7.21807 8.5114 7.43386 8.4511 7.61443 8.32831C7.795 8.20552 7.93042 8.027 8 7.82002L8.54 6.18002C8.60709 5.9814 8.7349 5.80889 8.90537 5.68686C9.07584 5.56484 9.28036 5.49948 9.49 5.50002H14.61C14.8196 5.49948 15.0242 5.56484 15.1946 5.68686C15.3651 5.80889 15.4929 5.9814 15.56 6.18002L16.1 7.82002C16.1642 8.01077 16.2844 8.17771 16.445 8.29903C16.6055 8.42035 16.799 8.4904 17 8.50002H19C19.2652 8.50002 19.5196 8.60538 19.7071 8.79292C19.8946 8.98045 20 9.23481 20 9.50002V17.5ZM12 8.50002C11.2089 8.50002 10.4355 8.73462 9.77772 9.17414C9.11992 9.61367 8.60723 10.2384 8.30448 10.9693C8.00173 11.7002 7.92252 12.5045 8.07686 13.2804C8.2312 14.0563 8.61216 14.769 9.17157 15.3284C9.73098 15.8879 10.4437 16.2688 11.2196 16.4232C11.9956 16.5775 12.7998 16.4983 13.5307 16.1955C14.2616 15.8928 14.8864 15.3801 15.3259 14.7223C15.7654 14.0645 16 13.2911 16 12.5C16 11.4392 15.5786 10.4217 14.8284 9.6716C14.0783 8.92145 13.0609 8.50002 12 8.50002ZM12 14.5C11.6044 14.5 11.2178 14.3827 10.8889 14.163C10.56 13.9432 10.3036 13.6308 10.1522 13.2654C10.0009 12.8999 9.96126 12.4978 10.0384 12.1098C10.1156 11.7219 10.3061 11.3655 10.5858 11.0858C10.8655 10.8061 11.2219 10.6156 11.6098 10.5385C11.9978 10.4613 12.3999 10.5009 12.7654 10.6523C13.1308 10.8036 13.4432 11.06 13.6629 11.3889C13.8827 11.7178 14 12.1045 14 12.5C14 13.0305 13.7893 13.5392 13.4142 13.9142C13.0391 14.2893 12.5304 14.5 12 14.5Z"
      fill="#595755"
    />
  </Svg>
);

const emotions = [
  'Happy', 'Excited', 'Neutral', 'Sad',
  'Angry', 'Bored', 'Anxious', 'worried'
];

const journalPrompts = [
  "What was the best or worst highlight of your day?",
  "What made you smile today?",
  "What challenged you today and how did you handle it?",
  "What are you grateful for right now?",
  "What emotions did you experience today?",
  "What would you tell your past self about today?",
  "What small victory can you celebrate today?",
  "What did you learn about yourself today?"
];

export default function WritingJournal() {
  const router = useRouter();
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState(journalPrompts[0]);

  const handleEmotionPress = (emotion: string) => {
    setSelectedEmotion(selectedEmotion === emotion ? null : emotion);
  };

  const handleRandomizePrompt = () => {
    const randomIndex = Math.floor(Math.random() * journalPrompts.length);
    setCurrentPrompt(journalPrompts[randomIndex]);
  };

  const handleSave = async () => {
    // Validate required fields
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please add a title for your journal entry.');
      return;
    }
    
    if (!content.trim()) {
      Alert.alert('Missing Content', 'Please add some content to your journal entry.');
      return;
    }

    try {
      // Create new journal entry
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        emotion: selectedEmotion || 'Neutral',
        date: new Date().toLocaleDateString(),
        timestamp: Date.now(),
      };

      // Get existing entries
      const existingEntriesJson = await AsyncStorage.getItem('journalEntries');
      const existingEntries: JournalEntry[] = existingEntriesJson 
        ? JSON.parse(existingEntriesJson) 
        : [];

      // Add new entry to the beginning of the array
      const updatedEntries = [newEntry, ...existingEntries];

      // Save back to storage
      await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

      console.log('Entry saved successfully:', newEntry);
      Alert.alert('Success', 'Your journal entry has been saved!', [
        { text: 'OK', onPress: () => router.push('/journal') }
      ]);
    } catch (error) {
      console.error('Error saving entry:', error);
      Alert.alert('Error', 'Failed to save your journal entry. Please try again.');
    }
  };

  const handleClose = () => {
    router.push('/journal');
  };

  const handleVoiceMemo = () => {
    // Handle voice memo functionality
    console.log('Add voice memo');
  };

  const handleAddPicture = () => {
    // Handle add picture functionality
    console.log('Add picture');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header with Close Button */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <CloseIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Mood Section */}
        <View style={styles.moodSection}>
          <Text style={styles.moodTitle}>What's on Your Mood?</Text>
        </View>

        {/* Emotion Tags */}
        <View style={styles.emotionContainer}>
          {emotions.map((emotion) => (
            <TouchableOpacity
              key={emotion}
              style={[
                styles.emotionTag,
                selectedEmotion === emotion && styles.emotionTagSelected
              ]}
              onPress={() => handleEmotionPress(emotion)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.emotionText,
                selectedEmotion === emotion && styles.emotionTextSelected
              ]}>
                {emotion}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Journal Prompt Section */}
        <View style={styles.journalPromptSection}>
          <Text style={styles.journalPromptTitle}>Journal Prompt</Text>
          <Text style={styles.journalPromptText}>{currentPrompt}</Text>
          <TouchableOpacity 
            style={styles.randomizeButton}
            onPress={handleRandomizePrompt}
            activeOpacity={0.8}
          >
            <Text style={styles.randomizeButtonText}>Randomize</Text>
          </TouchableOpacity>
        </View>

        {/* Title Input */}
        <View style={styles.titleInputSection}>
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            placeholderTextColor="#595755"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Content Input */}
        <View style={styles.contentInputSection}>
          <TextInput
            style={styles.contentInput}
            placeholder="Start writing your thoughts here..."
            placeholderTextColor="#595755"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Voice Memo Section */}
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleVoiceMemo}
            activeOpacity={0.7}
          >
            <MicrophoneIcon />
          </TouchableOpacity>
          <View style={styles.actionTextContainer}>
            <Text style={styles.actionText}>Add voice memo</Text>
          </View>
        </View>

        {/* Add Picture Section */}
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleAddPicture}
            activeOpacity={0.7}
          >
            <CameraIcon />
          </TouchableOpacity>
          <View style={styles.actionTextContainer}>
            <Text style={styles.actionText}>Add a picture</Text>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}

          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <View style={styles.bottomSpacer} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 48,
    alignSelf: 'flex-end',
  },
  closeButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  moodSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  moodTitle: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 23,
    color: '#212121',
    fontFamily: 'System',
  },
  emotionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    width: 398,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  emotionTag: {
    height: 44,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CFDBE8',
    backgroundColor: 'transparent',
  },
  emotionTagSelected: {
    backgroundColor: '#FEF5F3',
    borderColor: '#F3A47D',
  },
  emotionText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    color: '#595755',
    fontFamily: 'System',
  },
  emotionTextSelected: {
    color: '#212121',
  },
  journalPromptSection: {
    height: 116, 
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  journalPromptTitle: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 23,
    color: '#212121',
    fontFamily: 'System',
  },
  journalPromptText: {
    height: 32,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23,
    color: '#595755',
    fontFamily: 'System',
    marginTop: 8,
  },
  randomizeButton: {
    height: 40,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#EF7850',
    justifyContent: 'center',
    alignItems: 'center',
  },
  randomizeButtonText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    color: '#F7FAFC',
    textAlign: 'center',
    fontFamily: 'System',
  },
  titleInputSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleInput: {
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FFEBE5',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#212121',
    fontFamily: 'System',
  },
  contentInputSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  contentInput: {
    height: 144,
    minHeight: 144,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#FFEBE5',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#212121',
    fontFamily: 'System',
  },
  actionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    height: 56,
    minHeight: 56,
    gap: 16,
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FFEBE5',
  },
  actionTextContainer: {
    flex: 1,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#F08955',
    fontFamily: 'System',
  },
  bottomSection: {
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    height: 40,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    backgroundColor: '#EF7850',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
    color: '#F7FAFC',
    textAlign: 'center',
    fontFamily: 'System',
  },
  bottomSpacer: {
    height: 20,
    backgroundColor: '#FFFFFF',
  },
});
