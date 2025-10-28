import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

// Types
interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

// User Icon Component (same as in design)
const UserIcon = () => (
  <Svg width={78} height={78} viewBox="0 0 78 78" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.6667 17.3333C21.6667 12.7362 23.4929 8.32745 26.7435 5.07682C29.9941 1.82618 34.4029 0 39 0C43.5971 0 48.0059 1.82618 51.2565 5.07682C54.5072 8.32745 56.3333 12.7362 56.3333 17.3333C56.3333 21.9304 54.5072 26.3392 51.2565 29.5899C48.0059 32.8405 43.5971 34.6667 39 34.6667C34.4029 34.6667 29.9941 32.8405 26.7435 29.5899C23.4929 26.3392 21.6667 21.9304 21.6667 17.3333ZM21.6667 43.3333C15.9203 43.3333 10.4093 45.6161 6.34602 49.6794C2.28273 53.7426 0 59.2536 0 65C0 68.4478 1.36964 71.7544 3.80761 74.1924C6.24559 76.6304 9.55219 78 13 78H65C68.4478 78 71.7544 76.6304 74.1924 74.1924C76.6304 71.7544 78 68.4478 78 65C78 59.2536 75.7173 53.7426 71.654 49.6794C67.5907 45.6161 62.0797 43.3333 56.3333 43.3333H21.6667Z"
      fill="#4C4C4C"
    />
  </Svg>
);

// Flame Icon Component (same as in design)
const FlameIcon = () => (
  <Svg width={92} height={92} viewBox="0 0 92 92" fill="none">
    <Path
      d="M67.6981 42.9333C66.8164 41.7833 65.7431 40.7867 64.7464 39.79C62.1781 37.49 59.2647 35.8417 56.8114 33.4267C51.0997 27.83 49.8347 18.5917 53.4764 11.5C49.8347 12.3817 46.6531 14.375 43.9314 16.56C34.0031 24.5333 30.0931 38.6017 34.7697 50.6767C34.9231 51.06 35.0764 51.4433 35.0764 51.9417C35.0764 52.785 34.5014 53.5517 33.7347 53.8583C32.8531 54.2417 31.9331 54.0117 31.2047 53.3983C30.9872 53.2161 30.8052 52.9951 30.6681 52.7467C26.3364 47.265 25.6464 39.4067 28.5597 33.12C22.1581 38.3333 18.6697 47.15 19.1681 55.4683C19.3981 57.385 19.6281 59.3017 20.2797 61.2183C20.8164 63.5183 21.8514 65.8183 23.0014 67.85C27.1414 74.4817 34.3097 79.235 42.0147 80.1933C50.2181 81.2283 58.9964 79.7333 65.2831 74.06C72.2981 67.6967 74.7514 57.5 71.1481 48.76L70.6497 47.7633C69.8447 46 67.6981 42.9333 67.6981 42.9333ZM55.5847 67.0833C54.5114 68.0033 52.7481 69 51.3681 69.3833C47.0747 70.9167 42.7814 68.77 40.2514 66.24C44.8131 65.1667 47.5347 61.7933 48.3397 58.3817C48.9914 55.315 47.7647 52.785 47.2664 49.8333C46.8064 46.9967 46.8831 44.5817 47.9181 41.9367C48.6464 43.3933 49.4131 44.85 50.3331 46C53.2847 49.8333 57.9231 51.52 58.9197 56.7333C59.0731 57.27 59.1497 57.8067 59.1497 58.3817C59.2647 61.525 57.8847 64.975 55.5847 67.0833Z"
      fill="#EF9D39"
    />
  </Svg>
);

// Smiley Icon Component
const SmileyIcon = () => (
  <Svg width={51} height={51} viewBox="0 0 51 51" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.1056 6.9486C15.5412 5.29214 18.2806 4.13431 21.1659 3.54189C24.0512 2.94947 27.0252 2.9342 29.9165 3.49694C32.8077 4.05969 35.5589 5.18932 38.0113 6.82067C40.4638 8.45201 42.569 10.5528 44.2055 13.0018C45.8419 15.4509 46.9773 18.1997 47.5461 21.0897C48.1149 23.9798 48.1059 26.9538 47.5195 29.8403C46.9331 32.7269 45.781 35.4687 44.1297 37.9078C42.4783 40.3468 40.3604 42.4347 37.898 44.0511C32.9779 47.3392 26.9531 48.5381 21.1491 47.3841C15.345 46.2301 10.2371 42.8177 6.94898 37.8976C3.66088 32.9775 2.46196 26.9528 3.61596 21.1487C4.76996 15.3446 8.18554 10.2367 13.1056 6.9486ZM14.8779 41.4023C16.9659 42.8131 19.3121 43.7974 21.7818 44.2985C24.2514 44.7997 26.7957 44.8078 29.2685 44.3225C31.7413 43.8372 34.0938 42.868 36.1908 41.4705C38.2878 40.0731 40.088 38.275 41.4879 36.1796C42.8877 34.0843 43.8597 31.7329 44.3479 29.2607C44.8361 26.7884 44.8309 24.2441 44.3326 21.7739C43.8343 19.3037 42.8528 16.9563 41.4444 14.8666C40.036 12.777 38.2285 10.9863 36.1258 9.59741C31.9079 6.81146 26.7586 5.80864 21.8035 6.80817C16.8484 7.8077 12.4906 10.7283 9.68256 14.9315C6.87453 19.1347 5.84473 24.2786 6.81826 29.2389C7.79179 34.1991 10.6895 38.5723 14.8779 41.4023ZM20.7206 22.3123C20.7206 23.1577 20.3847 23.9685 19.787 24.5662C19.1892 25.164 18.3785 25.4998 17.5331 25.4998C16.6877 25.4998 15.8769 25.164 15.2792 24.5662C14.6814 23.9685 14.3456 23.1577 14.3456 22.3123C14.3456 21.467 14.6814 20.6562 15.2792 20.0584C15.8769 19.4607 16.6877 19.1248 17.5331 19.1248C18.3785 19.1248 19.1892 19.4607 19.787 20.0584C20.3847 20.6562 20.7206 21.467 20.7206 22.3123ZM36.6581 22.3123C36.6581 23.1577 36.3223 23.9685 35.7245 24.5662C35.1267 25.164 34.316 25.4998 33.4706 25.4998C32.6252 25.4998 31.8144 25.164 31.2167 24.5662C30.6189 23.9685 30.2831 23.1577 30.2831 22.3123C30.2831 21.467 30.6189 20.6562 31.2167 20.0584C31.8144 19.4607 32.6252 19.1248 33.4706 19.1248C34.316 19.1248 35.1267 19.4607 35.7245 20.0584C36.3223 20.6562 36.6581 21.467 36.6581 22.3123ZM25.5018 35.0623C23.7698 35.0666 22.0691 34.6003 20.5814 33.7133C19.0936 32.8263 17.8748 31.5519 17.0549 30.0261L14.2818 31.5561C15.3979 33.6215 17.0626 35.3386 19.0924 36.5183C21.1222 37.6979 23.4382 38.2942 25.7853 38.2414C28.1324 38.1887 30.4193 37.489 32.394 36.2193C34.3688 34.9497 35.9546 33.1595 36.9768 31.0461L34.1081 29.6755C33.324 31.2908 32.101 32.6528 30.5789 33.6055C29.0569 34.5581 27.2974 35.063 25.5018 35.0623Z"
      fill="#4E4E4E"
    />
  </Svg>
);

// ChecklistItem Component
interface ChecklistItemProps {
  item: ChecklistItem;
  onToggle: (id: string) => void;
}

const ChecklistItemComponent: React.FC<ChecklistItemProps> = ({ item, onToggle }) => (
  <TouchableOpacity 
    style={styles.checklistItem} 
    onPress={() => onToggle(item.id)}
    activeOpacity={0.7}
  >
    <View style={[
      styles.checkbox, 
      item.completed && styles.checkboxCompleted
    ]}>
      {item.completed && (
        <Text style={styles.checkmark}>✓</Text>
      )}
    </View>
    <Text style={[
      styles.checklistText,
      item.completed && styles.checklistTextCompleted
    ]}>
      {item.text}
    </Text>
  </TouchableOpacity>
);

export default function Home() {
  const [selectedTodayMood, setSelectedTodayMood] = useState<string | null>(null);
  const [weeklyMoodScore, setWeeklyMoodScore] = useState<number>(7.4);
  const [baseScore] = useState<number>(7.4); // Base score without today's mood
  const [previousScore] = useState<number>(7.0); // Previous week's score for comparison
  
  // Calculate percentage change
  const percentageChange = ((weeklyMoodScore - previousScore) / previousScore * 100);
  const formattedChange = percentageChange >= 0 ? 
    `+${Math.abs(percentageChange).toFixed(1)}%` : 
    `-${Math.abs(percentageChange).toFixed(1)}%`;
  
  // Emoji mood values (1-10 scale)
  const moodValues: { [key: string]: number } = {
    '😢': 2.0,  // Very sad
    '😡': 2.5,  // Angry
    '😰': 3.5,  // Anxious
    '🥱': 5.0,  // Bored/tired
    '😐': 6.0,  // Neutral
    '😊': 8.5,  // Happy
    '🤩': 10.0  // Star-struck/amazing
  };
  
  // Initial checklist data
  const [weeklyChecklist, setWeeklyChecklist] = useState<ChecklistItem[]>([
    { id: 'w1', text: 'Attend a support group', completed: false },
    { id: 'w2', text: 'Read 30 pages of a self-help book', completed: false },
    { id: 'w3', text: 'Have a deep talk with a friend', completed: false },
  ]);

  const [dailyChecklist, setDailyChecklist] = useState<ChecklistItem[]>([
    { id: 'd1', text: 'Exercise for 30 minutes', completed: false },
    { id: 'd2', text: 'Meditate for 10 minutes', completed: false },
    { id: 'd3', text: 'Attend a support group', completed: false },
    { id: 'd4', text: 'Read 30 pages of a self-help book', completed: false },
    { id: 'd5', text: 'Have a deep talk with a friend', completed: false },
  ]);

  // Toggle functions
  const toggleWeeklyItem = (id: string) => {
    setWeeklyChecklist(items => 
      items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const toggleDailyItem = (id: string) => {
    setDailyChecklist(items => 
      items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Handle mood emoji selection
  const handleMoodSelection = (emoji: string) => {
    // If clicking the same emoji, don't change anything
    if (selectedTodayMood === emoji) {
      return;
    }
    
    setSelectedTodayMood(emoji);
    
    // Update weekly mood score by replacing today's mood
    const selectedMoodValue = moodValues[emoji];
    // Calculate new weekly average: (base_score * 6 + new_mood) / 7
    const newWeeklyScore = ((baseScore * 6) + selectedMoodValue) / 7;
    setWeeklyMoodScore(Math.round(newWeeklyScore * 10) / 10); // Round to 1 decimal place
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileContent}>
            <View style={styles.profileRow}>
              <View style={styles.avatarContainer}>
                <UserIcon />
              </View>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Welcome back, Funky_Franky</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Streak Section */}
        <View style={styles.streakContainer}>
        <View style={{ flex: 1 }}>
            <Text style={styles.streakTitle}>You are on a 5-Day Streak!</Text>
            <Text style={styles.streakSubtitle}>
            Don't lose it, complete the Daily Debunk or create a new Journal entry
            </Text>
        </View>
        <FlameIcon />
        </View>

        {/* Weekly Mood Score Section */}
        <View style={styles.moodSection}>
          <View style={styles.moodContent}>
            <View style={styles.moodHeader}>
              <Text style={styles.moodTitle}>Weekly Mood Score</Text>
              <Text style={styles.moodScore}>{weeklyMoodScore}/10</Text>
            </View>
            
            <View style={styles.moodStats}>
              <Text style={styles.moodStatsText}>This week</Text>
              <Text style={[
                styles.moodStatsChange,
                { color: percentageChange >= 0 ? '#088738' : '#DC3545' }
              ]}>
                {formattedChange}
              </Text>
            </View>

            {/* Emoji Chart */}
            <View style={styles.emojiChart}>
              <View style={styles.emojiRow}>
                <Text style={styles.emoji}>🤩</Text>
                <Text style={styles.emoji}>😰</Text>
                <Text style={styles.emoji}>🥱</Text>
                <Text style={styles.emoji}>😢</Text>
                <Text style={styles.emoji}>😄</Text>
                {selectedTodayMood ? (
                  <Text style={styles.emoji}>{selectedTodayMood}</Text>
                ) : (
                  <SmileyIcon />
                )}
                <SmileyIcon />
              </View>
              
              <View style={styles.dayLabels}>
                <Text style={styles.dayLabel}>Mon</Text>
                <Text style={styles.dayLabel}>Tue</Text>
                <Text style={styles.dayLabel}>Wed</Text>
                <Text style={styles.dayLabel}>Thu</Text>
                <Text style={styles.dayLabel}>Fri</Text>
                <Text style={styles.dayLabel}>Sat</Text>
                <Text style={styles.dayLabel}>Sun</Text>
              </View>
            </View>

            {/* Mood Selection */}
            <View style={styles.moodSelection}>
              <Text style={styles.moodSelectionTitle}>
                <Text style={styles.moodSelectionBold}>Whats your mood Today? </Text>
                <Text style={styles.moodSelectionNormal}>(select one)</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.moodEmojisRow}>
          {['😢','😡','😰','🥱','😐','😊','🤩'].map((emoji, index) => (
            <TouchableOpacity 
              key={index}
              onPress={() => handleMoodSelection(emoji)}
              activeOpacity={0.7}
              style={[
                styles.moodEmojiButton,
                selectedTodayMood === emoji && styles.selectedMoodEmoji
              ]}
            >
              <Text style={styles.selectorEmoji}>
                {emoji}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily Checklist */}
        <View style={styles.checklistSection}>
          <Text style={styles.sectionTitle}>Daily Checklist</Text>
          {dailyChecklist.map((item) => (
            <ChecklistItemComponent
              key={item.id}
              item={item}
              onToggle={toggleDailyItem}
            />
          ))}
        </View>
        {/* Weekly Checklist */}
        <View style={styles.checklistSection}>
          <Text style={styles.sectionTitle}>Weekly Checklist</Text>
          {weeklyChecklist.map((item) => (
            <ChecklistItemComponent
              key={item.id}
              item={item}
              onToggle={toggleWeeklyItem}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  profileContent: {
    height: 160,
    justifyContent: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontFamily: 'Manrope',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
    color: '#212121',
  },
  streakContainer: {
   flexDirection: 'row',
  alignItems: 'center',
  padding: 16,
  borderRadius: 13,
  backgroundColor: '#FFF2B9',
  marginHorizontal: 15,
  marginBottom: 20,
  },
  streakTitle: {
    fontFamily: 'Manrope',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 23,
    color: '#491C00',
    textAlign: 'center',
    marginTop: -15,
    marginBottom: 8,
  },
  streakSubtitle: {
    fontFamily: 'Manrope',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 23,
    color: '#212121',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  moodSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  moodContent: {
    minHeight: 258,
  },
  moodHeader: {
    marginBottom: 16,
  },
  moodTitle: {
    fontFamily: 'Manrope',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 40,
    color: '#212121',
    marginBottom: -10,
  },
  moodScore: {
    fontFamily: 'Manrope',
    fontSize: 50,
    fontWeight: '700',
    lineHeight: 60,
    color: '#F49825',
  },
  moodStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 20,
  },
  moodStatsText: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#595755',
  },
  moodStatsChange: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: '#088738',
  },
  emojiChart: {
    marginBottom: 20,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 69,
    marginBottom: 20,
  },
  emoji: {
    fontSize: 50,
    textAlign: 'center',
    width: 50,
  },
  selectorEmoji: {
    fontSize: 42,
  },
  moodEmojisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  moodEmojiButton: {
    padding: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedMoodEmoji: {
    backgroundColor: '#FEF5F3',
    borderWidth: 2,
    borderColor: '#F08955',
  },

  dayLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 20,
  },
  dayLabel: {
    fontFamily: 'Manrope',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
    color: '#595755',
    textAlign: 'center',
    width: 50,
  },
  moodSelection: {
    height: 40,
  },
  moodSelectionTitle: {
    fontFamily: 'Manrope',
    fontSize: 15,
    lineHeight: 40,
    color: '#121417ff',
  },
  moodSelectionBold: {
    fontWeight: '700',
  },
  moodSelectionNormal: {
    fontWeight: '400',
  },
  moodEmojis: {
    fontFamily: 'Manrope',
    fontSize: 50,
    fontWeight: '700',
    lineHeight: 60,
    color: '#000',
    marginHorizontal: 40,
    marginBottom: 40,
  },
  checklistSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Manrope',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 23,
    color: '#212121',
    marginBottom: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#DBE0E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#088738',
    borderColor: '#088738',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checklistText: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#595755',
    flex: 1,
  },
  checklistTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#595755',
  },
});
