import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Custom SVG Icons
const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 18 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 8C18 8.41421 17.6642 8.75 17.25 8.75H2.56031L8.03063 14.2194C8.32368 14.5124 8.32368 14.9876 8.03063 15.2806C7.73757 15.5737 7.26243 15.5737 6.96937 15.2806L0.219375 8.53063C0.0785422 8.38995 -0.000590086 8.19906 -0.000590086 8C-0.000590086 7.80094 0.0785422 7.61005 0.219375 7.46937L6.96937 0.719375C7.26243 0.426319 7.73757 0.426319 8.03063 0.719375C8.32368 1.01243 8.32368 1.48757 8.03063 1.78062L2.56031 7.25H17.25C17.6642 7.25 18 7.58579 18 8Z"
      fill="#212121"
    />
  </Svg>
);

const PlayIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 14 18" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.75 9C13.751 9.43165 13.5257 9.83224 13.1562 10.0555L1.9 16.9414C1.51356 17.178 1.02931 17.187 0.634375 16.9648C0.243229 16.7461 0.000653744 16.3333 0 15.8852V2.11484C0.000653744 1.66671 0.243229 1.25385 0.634375 1.03516C1.02931 0.81299 1.51356 0.821958 1.9 1.05859L13.1562 7.94453C13.5257 8.16776 13.751 8.56835 13.75 9Z"
      fill="#FFFFFF"
    />
  </Svg>
);

const PauseIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 14 18" fill="none">
    <Path
      d="M2 2C2 0.895431 2.89543 0 4 0C5.10457 0 6 0.895431 6 2V16C6 17.1046 5.10457 18 4 18C2.89543 18 2 17.1046 2 16V2Z"
      fill="#FFFFFF"
    />
    <Path
      d="M8 2C8 0.895431 8.89543 0 10 0C11.1046 0 12 0.895431 12 2V16C12 17.1046 11.1046 18 10 18C8.89543 18 8 17.1046 8 16V2Z"
      fill="#FFFFFF"
    />
  </Svg>
);

const EntryView = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime] = useState(45); // 45 seconds for demo
  const [intervalRef, setIntervalRef] = useState<number | null>(null);
  
  // Use dynamic data if available, otherwise fall back to sample data
  const entryData = {
    title: params.title as string || 'Kayaking was awesome',
    content: params.content as string || 'Today I went out to the LA river and had the opportunity to go kayaking with some of my peers from school. I never realized that such beautiful places were located so close to where I live. Being able to see the little bugs and animals that live in the LA river was super interesting because I got to learn all about them. I was a little anxious because I didn\'t want to fall in the water because the water is very deep, so deep I couldn\'t touch the floor with my paddle. 10/10 I would do it again.',
    emotion: params.emotion as string || 'Happy',
    date: params.date as string || new Date().toLocaleDateString(),
    id: params.id as string || 'sample'
  };

  // Check if this is a custom entry (has parameters)
  const isCustomEntry = !!params.id && !params.id.toString().startsWith('sample-');

  const handlePlayPress = () => {
    if (isPlaying) {
      // Stop/pause playback
      setIsPlaying(false);
      if (intervalRef) {
        clearInterval(intervalRef);
        setIntervalRef(null);
      }
    } else {
      // Start playback
      setIsPlaying(true);
      
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalTime) {
            setIsPlaying(false);
            clearInterval(interval);
            setIntervalRef(null);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      
      setIntervalRef(interval);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push("/journal")}>
            <BackArrowIcon />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Entry</Text>
          </View>
        </View>

        {/* Entry Title */}
        <View style={styles.titleSection}>
          <Text style={styles.entryTitle}>{entryData.title}</Text>
        </View>

        {/* Entry Date */}
        <View style={styles.dateSection}>
          <Text style={styles.entryDate}>{entryData.date}</Text>
        </View>

        {/* Entry Emotion */}
        <View style={styles.emotionSection}>
          <Text style={styles.emotionLabel}>Mood: </Text>
          <Text style={styles.emotionValue}>{entryData.emotion}</Text>
        </View>

        {/* Entry Content */}
        <View style={styles.contentSection}>
          <Text style={styles.entryText}>
            {entryData.content}
          </Text>
        </View>

        {/* Conditional sections for sample entries only */}
        {!isCustomEntry && (
          <>
            {/* Voice Memo Section */}
            <View style={styles.voiceMemoHeaderSection}>
              <Text style={styles.voiceMemoTitle}>Voice Memo</Text>
            </View>

            <View style={styles.voiceMemoSection}>
              <View style={styles.voiceMemoContainer}>
                <View style={styles.voiceMemoPlayer}>
                  <TouchableOpacity 
                    style={styles.playButtonContainer} 
                    onPress={handlePlayPress}
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </TouchableOpacity>
                  
                  <View style={styles.progressSection}>
                    <View style={styles.progressBarContainer}>
                      <View 
                        style={[
                          styles.progressBarFilled, 
                          { flex: currentTime }
                        ]} 
                      />
                      <View 
                        style={[
                          styles.progressBarEmpty, 
                          { flex: totalTime - currentTime }
                        ]} 
                      />
                    </View>
                    
                    <View style={styles.timeContainer}>
                      <Text style={styles.currentTime}>
                        {formatTime(currentTime)}
                      </Text>
                      <Text style={styles.totalTime}>
                        {formatTime(totalTime)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Photo Section */}
            <View style={styles.photoHeaderSection}>
              <Text style={styles.photoTitle}>Photo</Text>
            </View>

            <View style={styles.photoContainer}>
              <Image
                source={require('../../assets/images/img.jpg')}
                style={styles.photoImage}
                resizeMode="cover"
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default EntryView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 30,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    paddingRight: 48,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Epilogue, -apple-system, Roboto, Helvetica, sans-serif',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 23,
    color: '#212121',
    textAlign: 'center',
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  entryTitle: {
    fontFamily: 'Epilogue, -apple-system, Roboto, Helvetica, sans-serif',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
    color: '#212121',
  },
  dateSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  entryDate: {
    fontFamily: 'Epilogue, -apple-system, Roboto, Helvetica, sans-serif',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#ABB0B9',
  },
  emotionSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  emotionLabel: {
    fontFamily: 'Epilogue, -apple-system, Roboto, Helvetica, sans-serif',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#595755',
  },
  emotionValue: {
    fontFamily: 'Epilogue, -apple-system, Roboto, Helvetica, sans-serif',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#EF7850',
  },
  contentSection: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
  },
  entryText: {
    fontFamily: 'Epilogue, -apple-system, Roboto, Helvetica, sans-serif',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#212121',
  },
  voiceMemoHeaderSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  voiceMemoTitle: {
    fontFamily: 'Epilogue, -apple-system, Roboto, Helvetica, sans-serif',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 23,
    color: '#212121',
  },
  voiceMemoSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  voiceMemoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFEBE5',
    borderRadius: 12,
    gap: 12,
  },
  voiceMemoPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  playButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#EF7850',
  },
  progressSection: {
    flex: 1,
    paddingTop: 6,
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarFilled: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F08955',
  },
  progressBarEmpty: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E6B9AB',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentTime: {
    fontFamily: 'Epilogue, -apple-system, Roboto, Helvetica, sans-serif',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: '#595755',
  },
  totalTime: {
    fontFamily: 'Epilogue, -apple-system, Roboto, Helvetica, sans-serif',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: '#595755',
  },
  photoHeaderSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  photoTitle: {
    fontFamily: 'Epilogue, -apple-system, Roboto, Helvetica, sans-serif',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 23,
    color: '#212121',
  },
  photoSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  photoContainer: {
  
    width: '100%',
  aspectRatio: 4 / 3, // or any other ratio (like 1.5, 4/3, etc.)
  overflow: 'hidden',
  borderRadius: 30,
},
photoImage: {
  width: '100%',
  height: '100%',

},

});
