import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from "expo-blur";

// Journal Entry Interface
interface JournalEntry {
  id: string;
  title: string;
  content: string;
  emotion: string;
  date: string;
  timestamp: number;
}

// Custom SVG Icons
const PlusIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 18 18" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 9C18 9.41421 17.6642 9.75 17.25 9.75H9.75V17.25C9.75 17.6642 9.41421 18 9 18C8.58579 18 8.25 17.6642 8.25 17.25V9.75H0.75C0.335786 9.75 0 9.41421 0 9C0 8.58579 0.335786 8.25 0.75 8.25H8.25V0.75C8.25 0.335786 8.58579 0 9 0C9.41421 0 9.75 0.335786 9.75 0.75V8.25H17.25C17.6642 8.25 18 8.58579 18 9Z"
      fill="#0D141C"
    />
  </Svg>
);

const SearchIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 20 20" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.5306 18.4694L14.8366 13.7762C17.6629 10.383 17.3204 5.36693 14.0591 2.38935C10.7978 -0.588237 5.77134 -0.474001 2.64867 2.64867C-0.474001 5.77134 -0.588237 10.7978 2.38935 14.0591C5.36693 17.3204 10.383 17.6629 13.7762 14.8366L18.4694 19.5306C18.7624 19.8237 19.2376 19.8237 19.5306 19.5306C19.8237 19.2376 19.8237 18.7624 19.5306 18.4694ZM1.75 8.5C1.75 4.77208 4.77208 1.75 8.5 1.75C12.2279 1.75 15.25 4.77208 15.25 8.5C15.25 12.2279 12.2279 15.25 8.5 15.25C4.77379 15.2459 1.75413 12.2262 1.75 8.5Z"
      fill="#9DA3AE"
    />
  </Svg>
);

const ChevronDownIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 14 9" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.6922 1.94219L7.44219 8.19219C7.32496 8.30955 7.16588 8.37549 7 8.37549C6.83412 8.37549 6.67504 8.30955 6.55781 8.19219L0.307812 1.94219C0.0635991 1.69797 0.0635991 1.30203 0.307812 1.05781C0.552026 0.813599 0.947974 0.813599 1.19219 1.05781L7 6.86641L12.8078 1.05781C13.052 0.813599 13.448 0.813599 13.6922 1.05781C13.9364 1.30203 13.9364 1.69797 13.6922 1.94219Z"
      fill="#9DA3AE"
    />
  </Svg>
);

const SmileyIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 20 20" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 0.25C4.61522 0.25 0.25 4.61522 0.25 10C0.25 15.3848 4.61522 19.75 10 19.75C15.3848 19.75 19.75 15.3848 19.75 10C19.7443 4.61758 15.3824 0.255684 10 0.25ZM10 18.25C5.44365 18.25 1.75 14.5563 1.75 10C1.75 5.44365 5.44365 1.75 10 1.75C14.5563 1.75 18.25 5.44365 18.25 10C18.2448 14.5542 14.5542 18.2448 10 18.25ZM5.5 8.125C5.5 7.50368 6.00368 7 6.625 7C7.24632 7 7.75 7.50368 7.75 8.125C7.75 8.74632 7.24632 9.25 6.625 9.25C6.00368 9.25 5.5 8.74632 5.5 8.125ZM14.5 8.125C14.5 8.74632 13.9963 9.25 13.375 9.25C12.7537 9.25 12.25 8.74632 12.25 8.125C12.25 7.50368 12.7537 7 13.375 7C13.9963 7 14.5 7.50368 14.5 8.125ZM14.3997 12.625C13.435 14.2928 11.8309 15.25 10 15.25C8.16906 15.25 6.56594 14.2938 5.60125 12.625C5.45346 12.3925 5.44502 12.0977 5.57928 11.8571C5.71353 11.6166 5.96887 11.469 6.24434 11.4727C6.5198 11.4764 6.77105 11.6309 6.89875 11.875C7.59906 13.0853 8.69969 13.75 10 13.75C11.3003 13.75 12.4009 13.0844 13.1003 11.875C13.3074 11.5162 13.7662 11.3932 14.125 11.6003C14.4838 11.8074 14.6068 12.2662 14.3997 12.625Z"
      fill="#9DA3AE"
    />
  </Svg>
);

const JournalEntry = ({
  title,
  description,
  emotion,
  date,
  entryId,
  onPress,
  onDelete,
}: {
  title: string;
  description: string;
  emotion?: string;
  date?: string;
  entryId: string;
  onPress?: () => void;
  onDelete?: (id: string) => void;
}) => {
  // Map emotions to emojis
  const getEmotionEmoji = (emotion?: string) => {
    const emojiMap: { [key: string]: string } = {
      'Happy': '😊',
      'Excited': '😆',
      'Neutral': '😐',
      'Sad': '😢',
      'Angry': '😡',
      'Bored': '🥱',
      'Anxious': '😰',
      'worried': '😟'
    };
    return emojiMap[emotion || 'Neutral'] || '😐';
  };

  const EmojiIcon = () => (
    <View style={styles.emojiIconContainer}>
      <Text style={styles.emojiIcon}>{getEmotionEmoji(emotion)}</Text>
    </View>
  );

  const handleLongPress = () => {
    // Only allow deletion of custom entries (not sample entries)
    if (entryId.startsWith('sample-')) {
      Alert.alert(
        'Cannot Delete',
        'Sample entries cannot be deleted.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this journal entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => onDelete?.(entryId)
        }
      ]
    );
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
      onLongPress={handleLongPress}
      delayLongPress={500}
    >
      <View style={styles.entryContainer}>
        <View style={styles.iconContainer}>
          {emotion ? <EmojiIcon /> : <SmileyIcon />}
        </View>
        <View style={styles.entryContent}>
          <View style={styles.entryHeader}>
            <Text style={styles.entryTitle}>{title}</Text>
            {emotion && (
              <Text style={styles.entryEmotion}>{emotion}</Text>
            )}
          </View>
          <Text style={styles.entryDescription}>{description}</Text>
          {date && (
            <Text style={styles.entryDate}>{date}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Journal = () => {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [showPinModal, setShowPinModal] = useState(true);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [searchText, setSearchText] = useState('');

  // Load journal entries from storage
  const loadJournalEntries = async () => {
    try {
      const entriesJson = await AsyncStorage.getItem('journalEntries');
      if (entriesJson) {
        const entries: JournalEntry[] = JSON.parse(entriesJson);
        setJournalEntries(entries);
      }
    } catch (error) {
      console.error('Error loading journal entries:', error);
    }
  };

  // Load entries when component mounts and when screen comes into focus
  useEffect(() => {
    loadJournalEntries();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadJournalEntries();
    }, [])
  );

  useEffect(() => {
    if (pin.length === 4) {
      setTimeout(() => setShowPinModal(false), 300); // short delay for feedback
    }
  }, [pin]);

  const handlePinPress = (digit: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + digit);
    }
  };

  const clearPin = () => {
    setPin('');
  };

  // Delete journal entry function
  const deleteJournalEntry = async (entryId: string) => {
    try {
      const entriesJson = await AsyncStorage.getItem('journalEntries');
      if (entriesJson) {
        const entries: JournalEntry[] = JSON.parse(entriesJson);
        const updatedEntries = entries.filter(entry => entry.id !== entryId);
        await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
        setJournalEntries(updatedEntries);
      }
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      Alert.alert('Error', 'Failed to delete journal entry. Please try again.');
    }
  };

  // Group entries by date with existing sample entries included
  const groupEntriesByDate = (entries: JournalEntry[]) => {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString();
    
    // Sample entries to always show (with lower timestamps so they appear after custom entries)
    const sampleEntries = [
      {
        id: 'sample-1',
        title: 'Kayaking was awesome',
        content: 'Today I went out to the LA river and I had the opportunity to go kayaking with some of my...',
        emotion: 'Happy',
        date: today,
        timestamp: Date.now() - 86400000 // Much older timestamp
      },
      {
        id: 'sample-2', 
        title: 'I had a rough day',
        content: 'I felt really left out when with my friends and I just felt myself shutting down when people talked to...',
        emotion: 'Sad',
        date: yesterday,
        timestamp: Date.now() - 172800000 // Much older timestamp
      },
      {
        id: 'sample-3',
        title: 'Boring day',
        content: 'The most notable thing that happend was watching my favorite show for the third time. However, I did...',
        emotion: 'Bored',
        date: yesterday,
        timestamp: Date.now() - 172801000 // Much older timestamp
      }
    ];

    // Combine custom entries with sample entries
    const allEntries = [...entries, ...sampleEntries];
    
    // Apply search filter to all entries
    const filteredAllEntries = searchText.trim() 
      ? allEntries.filter(entry =>
          entry.title.toLowerCase().includes(searchText.toLowerCase()) ||
          entry.content.toLowerCase().includes(searchText.toLowerCase())
        )
      : allEntries;
    
    const grouped = {
      today: filteredAllEntries.filter(entry => entry.date === today).sort((a, b) => b.timestamp - a.timestamp),
      yesterday: filteredAllEntries.filter(entry => entry.date === yesterday).sort((a, b) => b.timestamp - a.timestamp),
      older: filteredAllEntries.filter(entry => entry.date !== today && entry.date !== yesterday).sort((a, b) => b.timestamp - a.timestamp)
    };
    
    return grouped;
  };

  const groupedEntries = groupEntriesByDate(journalEntries);


  return (
    <View style={styles.container}>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Reflection</Text>
          </View>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/entrywrite")}>
            <PlusIcon />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <View style={styles.searchIconContainer}>
              <SearchIcon />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search entries"
              placeholderTextColor="#ABB0B9"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Filter */}
        <View style={styles.filterSection}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filter</Text>
            <ChevronDownIcon />
          </TouchableOpacity>
        </View>

        {/* Today Section */}
        {groupedEntries.today.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today</Text>
            </View>
            {groupedEntries.today.map((entry) => (
              <JournalEntry
                key={entry.id}
                entryId={entry.id}
                title={entry.title}
                description={entry.content.length > 80 ? entry.content.substring(0, 80) + '...' : entry.content}
                emotion={entry.emotion}
                date={entry.date}
                onPress={() => {
                  if (entry.id.startsWith('sample-')) {
                    router.push("/entryview");
                  } else {
                    router.push({
                      pathname: "/entryview",
                      params: {
                        id: entry.id,
                        title: entry.title,
                        content: entry.content,
                        emotion: entry.emotion,
                        date: entry.date
                      }
                    });
                  }
                }}
                onDelete={deleteJournalEntry}
              />
            ))}
          </>
        )}

        {/* Yesterday Section */}
        {groupedEntries.yesterday.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Yesterday</Text>
            </View>
            {groupedEntries.yesterday.map((entry) => (
              <JournalEntry
                key={entry.id}
                entryId={entry.id}
                title={entry.title}
                description={entry.content.length > 80 ? entry.content.substring(0, 80) + '...' : entry.content}
                emotion={entry.emotion}
                date={entry.date}
                onPress={() => {
                  if (entry.id.startsWith('sample-')) {
                    router.push("/entryview");
                  } else {
                    router.push({
                      pathname: "/entryview",
                      params: {
                        id: entry.id,
                        title: entry.title,
                        content: entry.content,
                        emotion: entry.emotion,
                        date: entry.date
                      }
                    });
                  }
                }}
                onDelete={deleteJournalEntry}
              />
            ))}
          </>
        )}

        {/* Older Entries Section */}
        {groupedEntries.older.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Earlier</Text>
            </View>
            {groupedEntries.older.map((entry) => (
              <JournalEntry
                key={entry.id}
                entryId={entry.id}
                title={entry.title}
                description={entry.content.length > 80 ? entry.content.substring(0, 80) + '...' : entry.content}
                emotion={entry.emotion}
                date={entry.date}
                onPress={() => {
                  if (entry.id.startsWith('sample-')) {
                    router.push("/entryview");
                  } else {
                    router.push({
                      pathname: "/entryview",
                      params: {
                        id: entry.id,
                        title: entry.title,
                        content: entry.content,
                        emotion: entry.emotion,
                        date: entry.date
                      }
                    });
                  }
                }}
                onDelete={deleteJournalEntry}
              />
            ))}
          </>
        )}

        {/* No entries found message */}
        {searchText.trim() && 
         groupedEntries.today.length === 0 && 
         groupedEntries.yesterday.length === 0 && 
         groupedEntries.older.length === 0 && (
          <View style={styles.noEntriesContainer}>
            <Text style={styles.noEntriesText}>No entries found matching your search.</Text>
          </View>
        )}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
          </ScrollView>
          
          {/* PIN Lock Overlay - Renders behind navigation */}
          {showPinModal && (
            <View style={styles.pinOverlay}>
              <BlurView intensity={80} tint="light" style={styles.blurBackground} />
              <View style={styles.modalContainer}>
                <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Enter PIN to Access Journal</Text>
                <View style={styles.pinDisplay}>
                  {[0, 1, 2, 3].map(i => (
                    <View key={i} style={[styles.pinDot, pin[i] && styles.pinDotFilled]} />
              ))}
            </View>
            <View style={styles.pinPad}>
              {/* Row 1 */}
              <View style={styles.pinRow}>
                {['1', '2', '3'].map(num => (
                  <TouchableOpacity key={num} style={styles.pinButton} onPress={() => handlePinPress(num)}>
                    <Text style={styles.pinButtonText}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Row 2 */}
              <View style={styles.pinRow}>
                {['4', '5', '6'].map(num => (
                  <TouchableOpacity key={num} style={styles.pinButton} onPress={() => handlePinPress(num)}>
                    <Text style={styles.pinButtonText}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Row 3 */}
              <View style={styles.pinRow}>
                {['7', '8', '9'].map(num => (
                  <TouchableOpacity key={num} style={styles.pinButton} onPress={() => handlePinPress(num)}>
                    <Text style={styles.pinButtonText}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Row 4 – Only 0 centered */}
              <View style={styles.pinRow}>
                <View style={styles.pinSpacer} />
                <TouchableOpacity style={styles.pinButton} onPress={() => handlePinPress('0')}>
                  <Text style={styles.pinButtonText}>0</Text>
                </TouchableOpacity>
                <View style={styles.pinSpacer} />
              </View>

              {/* Clear Button */}
              <TouchableOpacity style={styles.clearButton} onPress={clearPin}>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
            </View>
          )}
    </View>
    );
};

export default Journal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
  },
  scrollView: {
    flex: 1,
  },
  pinOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom:100, // Leave space for tab bar (adjust as needed)
  },
  modalContainer: {
  // Remove flex positioning since modalOverlay handles it now
},
modalBox: {
  backgroundColor: '#fff',
  padding: 24,
  borderRadius: 16,
  width: 280,
  alignItems: 'center',
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 16,
},
pinDisplay: {
  flexDirection: 'row',
  gap: 12,
  marginBottom: 20,
},
pinDot: {
  width: 16,
  height: 16,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#999',
},
pinDotFilled: {
  backgroundColor: '#EF5724',
},
pinPad: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 10,
},
pinButton: {
  width: 60,
  height: 60,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 30,
  backgroundColor: '#FFEBE5',
  margin: 5,
},
pinButtonText: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#212121',
},
clearButton: {
  marginTop: 16,
},
pinRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 12,
  marginBottom: 8,
},
pinSpacer: {
  width: 60,
  height: 60,
},
clearText: {
  color: '#E6B9AB',
  fontWeight: '600',
  fontSize: 16,
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
  headerContent: {
    flex: 1,
    paddingLeft: 48,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Epilogue',
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 30,
    color: '#212121',
    textAlign: 'center',
  },
  addButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    height: 48,
    minWidth: 160,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FFEBE5',
  },
  searchIconContainer: {
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: 'Epilogue',
    fontWeight: '400',
    lineHeight: 24,
    color: '#9DA3AE',
  },
  filterSection: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  filterButton: {
    flexDirection: 'row',
    height: 32,
    paddingLeft: 16,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 16,
    backgroundColor: '#FFEBE5',
    alignSelf: 'flex-start',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Epilogue',
    fontWeight: '400',
    lineHeight: 21,
    color: '#9DA3AE',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Epilogue',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 23,
    color: '#212121',
  },
  entryContainer: {
    flexDirection: 'row',
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FFEBE5',
  },
  emojiIconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FFEBE5',
  },
  emojiIcon: {
    fontSize: 24,
  },
  entryContent: {
    flex: 1,
    justifyContent: 'center',
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  entryTitle: {
    fontSize: 16,
    fontFamily: 'Epilogue',
    fontWeight: '400',
    lineHeight: 24,
    color: '#212121',
    flex: 1,
  },
  entryEmotion: {
    fontSize: 12,
    fontFamily: 'Epilogue',
    fontWeight: '600',
    color: '#EF7850',
    backgroundColor: '#FEF5F3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  entryDescription: {
    fontSize: 14,
    fontFamily: 'Epilogue',
    fontWeight: '400',
    lineHeight: 21,
    color: '#595755',
    marginBottom: 4,
  },
  entryDate: {
    fontSize: 12,
    fontFamily: 'Epilogue',
    fontWeight: '400',
    color: '#ABB0B9',
  },
  bottomSpacing: {
    height: 20,
  },
  noEntriesContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noEntriesText: {
    fontSize: 16,
    fontFamily: 'Epilogue',
    fontWeight: '400',
    color: '#595755',
    textAlign: 'center',
  },
});
