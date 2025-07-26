import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';

const EarlyAlert2 = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Alert Icon */}
        <View style={styles.iconContainer}>
          <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <Path d="M1.62097 22.5V15C1.62097 12.3478 2.76715 9.8043 4.80737 7.92893C6.84758 6.05357 9.6147 5 12.5 5C15.3853 5 18.1524 6.05357 20.1926 7.92893C22.2328 9.8043 23.379 12.3478 23.379 15V22.5H24.7389V25H0.261096V22.5H1.62097ZM4.34073 15H7.06049C7.06049 13.6739 7.63358 12.4021 8.65368 11.4645C9.67379 10.5268 11.0574 10 12.5 10V7.5C10.336 7.5 8.26069 8.29018 6.73053 9.6967C5.20037 11.1032 4.34073 13.0109 4.34073 15ZM11.1401 0H13.8599V3.75H11.1401V0ZM23.0771 3.51L25 5.2775L22.1171 7.92875L20.1928 6.16125L23.0771 3.51ZM0 5.2775L1.92287 3.51L4.80717 6.16L2.88566 7.93L0 5.2775Z" fill="#7096CC"/>
          </Svg>
        </View>
        
        <Text style={styles.title}>Early Alert</Text>
        
        {/* Navigation Arrow */}
        <View style={styles.navArrow}>
          <Svg width="15" height="7" viewBox="0 0 8 16" fill="none" style={{ transform: [{ rotate: '90deg' }] }}>
            <Path d="M7.03237 7.58742L0.160611 15.0795L4.26606 7.54448L0.185709 0.0725125L7.03237 7.58742Z" fill="#FFFCFC"/>
          </Svg>
        </View>
      </View>

      <Text style={styles.subtitle}>Practice healthy communication responses</Text>

      {/* Progress Indicators */}
      <View style={styles.progressContainer}>
        <Svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <Circle cx="6.5" cy="6.5" r="6.5" fill="#D9D9D9"/>
        </Svg>
        <Svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ marginLeft: 19 }}>
          <Circle cx="6.5" cy="6.5" r="6.5" fill="#0E356C"/>
        </Svg>
      </View>

      {/* Scenario Badge */}
      <View style={styles.scenarioBadge}>
        <Text style={styles.scenarioText}>Scenario 1</Text>
      </View>

      <Text style={styles.scenarioDescription}>
        You're hanging out with a buddy who's having a bad day.
      </Text>

      {/* Friend's Quote */}
      <LinearGradient
        colors={['#FFD675', '#FFEBB8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.friendQuoteContainer}
      >
        <Text style={styles.friendLabel}>Friend:</Text>
        <Text style={styles.friendQuote}>
          "I'm just sick of everyone always judging me."
        </Text>
      </LinearGradient>

      {/* Option 2 */}
      <View style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Option 2:</Text>
        <Text style={styles.optionText}>"I get it. What happened"</Text>
        
        {/* Checkmark */}
        <View style={styles.checkmarkContainer}>
          <Svg width="41" height="40" viewBox="0 0 41 40" fill="none">
            <Path d="M35.1816 2.37314C29.7265 5.50875 24.8671 8.17484 20.7095 13.933C18.876 16.4727 16.8369 19.4619 15.5041 22.2841C14.7432 23.7806 13.3715 26.1191 12.9039 28.3673C10.3464 25.9927 7.59925 23.2975 4.7885 21.1863C2.78509 19.6822 -1.68336 27.4841 0.665507 29.2479C4.87527 32.408 8.3763 36.3438 12.4709 39.6448C14.1836 41.0239 17.9792 38.0289 18.8711 36.7724C21.7989 32.6327 22.1991 27.5724 24.3329 23.0568C27.5909 16.1507 33.3689 10.4777 39.0738 5.55132C42.8535 2.0332 40.3857 -1.67087 37.5196 0.805338" fill="#37B34A"/>
          </Svg>
        </View>
      </View>

      {/* Feedback Section */}
      <LinearGradient
        colors={['#7096CC', '#E6EAF2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.feedbackContainer}
      >
        <Text style={styles.feedbackLabel}>Feedback:</Text>
        <Text style={styles.feedbackText}>
          Great! you asked an open-ended question that invites sharing. Through this you showed validation and curiosity, this builds connection
        </Text>
      </LinearGradient>

      {/* Reflection and Practice Task Container */}
      <View style={styles.reflectionContainer}>
        <Text style={styles.reflectionTitle}>Reflection</Text>
        <Text style={styles.reflectionText}>
          When was the last time you wished someone had said that to you? How did you feel?
        </Text>
        
        <Text style={styles.practiceTitle}>Practice Task</Text>
        <Text style={styles.practiceText}>
          Tonight, next time a friend shares something difficult or personal, try asking open ended questions, and notice how it feels.
        </Text>
      </View>

      {/* Practice Another Scenario Button */}
      <TouchableOpacity style={styles.practiceButton}>
        <Text style={styles.practiceButtonText}>Practice another scenerio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingVertical: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  iconContainer: {
    position: 'absolute',
    left: 93,
  },
  title: {
    fontFamily: 'Istok Web',
    fontSize: 30,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  navArrow: {
    position: 'absolute',
    right: 21,
  },
  subtitle: {
    fontFamily: 'Istok Web',
    fontSize: 13,
    fontWeight: '700',
    color: '#AFB0B4',
    textAlign: 'center',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  scenarioBadge: {
    backgroundColor: '#7096CC',
    borderRadius: 86,
    paddingHorizontal: 6,
    paddingVertical: 1,
    alignSelf: 'flex-start',
    marginBottom: 3,
  },
  scenarioText: {
    fontFamily: 'Istok Web',
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
  scenarioDescription: {
    fontFamily: 'Istok Web',
    fontSize: 12,
    fontWeight: '700',
    color: '#7E7E7E',
    textAlign: 'center',
    marginBottom: 16,
  },
  friendQuoteContainer: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
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
  optionContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DEECC9',
    backgroundColor: '#F9FFE9',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    position: 'relative',
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
  },
  checkmarkContainer: {
    position: 'absolute',
    right: 12,
    top: 16,
  },
  feedbackContainer: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  feedbackLabel: {
    fontFamily: 'Istok Web',
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  feedbackText: {
    fontFamily: 'Istok Web',
    fontSize: 16,
    fontWeight: '700',
    color: '#7E7E7E',
    textAlign: 'center',
    lineHeight: 20,
  },
  reflectionContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ABB0B9',
    padding: 16,
    marginBottom: 16,
  },
  reflectionTitle: {
    fontFamily: 'Istok Web',
    fontSize: 20,
    fontWeight: '700',
    color: '#051833',
    marginBottom: 8,
  },
  reflectionText: {
    fontFamily: 'Istok Web',
    fontSize: 15,
    fontWeight: '700',
    color: '#7E7E7E',
    textAlign: 'center',
    marginBottom: 16,
  },
  practiceTitle: {
    fontFamily: 'Istok Web',
    fontSize: 20,
    fontWeight: '700',
    color: '#051833',
    marginBottom: 8,
  },
  practiceText: {
    fontFamily: 'Istok Web',
    fontSize: 15,
    fontWeight: '700',
    color: '#7E7E7E',
    textAlign: 'center',
  },
  practiceButton: {
    backgroundColor: '#7096CC',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  practiceButtonText: {
    fontFamily: 'Istok Web',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
});

export default EarlyAlert2;
