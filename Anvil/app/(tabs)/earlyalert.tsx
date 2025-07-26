import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useRouter } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

const EarlyAlert = () => {
  const router = useRouter();
  const [customResponse, setCustomResponse] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionSelect = (optionNumber: number) => {
    setSelectedOption(optionNumber);
  };


  const BellIcon = () => (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <Path
        d="M1.62097 22.5V15C1.62097 12.3478 2.76715 9.8043 4.80737 7.92893C6.84758 6.05357 9.6147 5 12.5 5C15.3853 5 18.1524 6.05357 20.1926 7.92893C22.2328 9.8043 23.379 12.3478 23.379 15V22.5H24.7389V25H0.261096V22.5H1.62097ZM4.34073 15H7.06049C7.06049 13.6739 7.63358 12.4021 8.65368 11.4645C9.67379 10.5268 11.0574 10 12.5 10V7.5C10.336 7.5 8.26069 8.29018 6.73053 9.6967C5.20037 11.1032 4.34073 13.0109 4.34073 15ZM11.1401 0H13.8599V3.75H11.1401V0ZM23.0771 3.51L25 5.2775L22.1171 7.92875L20.1928 6.16125L23.0771 3.51ZM0 5.2775L1.92287 3.51L4.80717 6.16L2.88566 7.93L0 5.2775Z"
        fill="#7096CC"
      />
    </Svg>
  );

  const ProgressDot = ({ filled }: { filled: boolean }) => (
    <Svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <Circle cx="6.5" cy="6.5" r="6.5" fill={filled ? "#0E356C" : "#D9D9D9"} />
    </Svg>
  );

  return (
    
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <BellIcon />
          <Text style={styles.title}>Early Alert</Text>
        </View>
        <Text style={styles.subtitle}>Practice healthy communication responses</Text>
        
        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          <ProgressDot filled={true} />
          <ProgressDot filled={false} />
        
        </View>
      </View>

      {/* Scenario Badge */}
      <View style={styles.scenarioBadge}>
        <Text style={styles.scenarioBadgeText}>Scenario 1</Text>
      </View>

      {/* Scenario Description */}
      <Text style={styles.scenarioDescription}>
        You're hanging out with a buddy who's having a bad day.
      </Text>

      {/* Friend's Quote Section */}
      <View style={styles.friendQuoteContainer}>
        <Text style={styles.friendLabel}>Friend:</Text>
        <Text style={styles.friendQuote}>
          "I'm just sick of everyone always judging me."
        </Text>
      </View>

      {/* How do you reply? */}
      <Text style={styles.replyTitle}>How do you reply?</Text>

      {/* Option 1 */}
      <TouchableOpacity
        style={[
          styles.optionContainer,
          selectedOption === 1 && styles.selectedOption
        ]}
        onPress={() => handleOptionSelect(1)}
      >
        <Text style={styles.optionLabel}>Option 1:</Text>
        <Text style={styles.optionText}>
          "Stop whining-everyone has bad days"
        </Text>
      </TouchableOpacity>

      {/* Option 2 */}
      <TouchableOpacity
        style={[
          styles.optionContainer,
          selectedOption === 2 && styles.selectedOption
        ]}
        onPress={() => handleOptionSelect(2)}
      >
        <Text style={styles.optionLabel}>Option 2:</Text>
        <Text style={styles.optionText}>"I get it. What happened"</Text>
      </TouchableOpacity>

      {/* Option 3 */}
      <TouchableOpacity
        style={[
          styles.optionContainer,
          selectedOption === 3 && styles.selectedOption
        ]}
        onPress={() => handleOptionSelect(3)}
      >
        <Text style={styles.optionLabel}>Option 3:</Text>
        <Text style={styles.optionText}>
          "You're overreacting.Let's play some video game"
        </Text>
      </TouchableOpacity>

      {/* Custom Response Section */}
      <View style={styles.customResponseSection}>
        <Text style={styles.customResponseTitle}>Or write your own</Text>
        
        <View style={styles.customInputContainer}>
          <TextInput
            style={styles.customInput}
            placeholder="Type your response here....."
            placeholderTextColor="#7E7E7E"
            value={customResponse}
            onChangeText={setCustomResponse}
            multiline
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => router.push("/earlyalert2")}
        >
          <Text style={styles.submitButtonText}>Submit Custom Response</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EarlyAlert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    alignItems: 'center',
    paddingTop: 22,
    paddingHorizontal: 13,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Istok Web',
    fontSize: 30,
    fontWeight: '700',
    color: '#000',
    marginLeft: 10,
  },
  subtitle: {
    fontFamily: 'Istok Web',
    fontSize: 13,
    fontWeight: '700',
    color: '#AFB0B4',
    textAlign: 'center',
    marginBottom: 15,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 19,
    marginBottom: 17,
  },
  scenarioBadge: {
    backgroundColor: '#7096CC',
    borderRadius: 86,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 3,
  },
  scenarioBadgeText: {
    fontFamily: 'Istok Web',
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  scenarioDescription: {
    fontFamily: 'Istok Web',
    fontSize: 12,
    fontWeight: '700',
    color: '#7E7E7E',
    textAlign: 'center',
    marginHorizontal: 13,
    marginBottom: 17,
  },
  friendQuoteContainer: {
    backgroundColor: '#FFEBB8',
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E3E1DF',
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  friendLabel: {
    fontFamily: 'Istok Web',
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  friendQuote: {
    fontFamily: 'Istok Web',
    fontSize: 19,
    fontWeight: '400',
    color: '#6B6A6A',
    textAlign: 'center',
  },
  replyTitle: {
    fontFamily: 'Istok Web',
    fontSize: 21,
    fontWeight: '700',
    color: '#000',
    marginLeft: 13,
    marginBottom: 17,
  },
  optionContainer: {
    marginHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E3E1DF',
    padding: 16,
    marginBottom: 19,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: '#FFF',
  },
  selectedOption: {
    borderColor: '#7096CC',
    borderWidth: 2,
  },
  optionLabel: {
    fontFamily: 'Istok Web',
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  optionText: {
    fontFamily: 'Istok Web',
    fontSize: 16,
    fontWeight: '700',
    color: '#7E7E7E',
    textAlign: 'center',
  },
  customResponseSection: {
    marginHorizontal: 12,
    marginBottom: 30,
  },
  customResponseTitle: {
    fontFamily: 'Istok Web',
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 17,
    marginLeft: 9,
  },
  customInputContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E3E1DF',
    padding: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: '#FFF',
    minHeight: 120,
  },
  customInput: {
    fontFamily: 'Istok Web',
    fontSize: 14,
    fontWeight: '700',
    color: '#7E7E7E',
    textAlign: 'left',
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#7096CC',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 20,
    alignSelf: 'center',
    width: 248,
  },
  submitButtonText: {
    fontFamily: 'Istok Web',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
});
