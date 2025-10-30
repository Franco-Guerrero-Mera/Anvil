import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

type ValueOption = {
  id: string;
  label: string;
};

const valueOptions: ValueOption[] = [
  { id: 'integrity', label: 'Integrity and Honesty' },
  { id: 'compassion', label: 'Compassion and Empathy' },
  { id: 'courage', label: 'Courage and Bravery' },
  { id: 'growth', label: 'Growth and Learning' },
  { id: 'responsibility', label: 'Responsibility and Accountability' },
  { id: 'family', label: 'Family and Relationships' },
  { id: 'service', label: 'Service and Contribution' },
  { id: 'authenticity', label: 'Authenticity and Self-Expression' },
];

const goalOptions: ValueOption[] = [
  { id: 'emotional', label: 'Better Emotional Regulation' },
  { id: 'communication', label: 'Improved Communication Skills' },
  { id: 'relationships', label: 'Stronger Relationships' },
  { id: 'confidence', label: 'Building Self-Confidence' },
  { id: 'stress', label: 'Managing Stress & Anxiety' },
  { id: 'leadership', label: 'Leadership Development' },
  { id: 'boundaries', label: 'Setting Healthy Boundaries' },
  { id: 'mindfulness', label: 'Mindfulness & Self-Awareness' },
];

const challengeOptions: ValueOption[] = [
  { id: 'anger', label: 'Managing Anger' },
  { id: 'vulnerability', label: 'Being Vulnerable' },
  { id: 'perfectionism', label: 'Overcoming Perfectionism' },
  { id: 'rejection', label: 'Fear of Rejection' },
  { id: 'isolation', label: 'Social Isolation' },
  { id: 'comparison', label: 'Comparing to Others' },
  { id: 'expectations', label: 'Unrealistic Expectations' },
  { id: 'criticism', label: 'Handling Criticism' },
];

const motivationOptions: ValueOption[] = [
  { id: 'family_future', label: 'Being a Better Partner/Father' },
  { id: 'career', label: 'Professional Growth' },
  { id: 'health', label: 'Mental & Physical Health' },
  { id: 'role_model', label: 'Being a Role Model' },
  { id: 'purpose', label: 'Finding Life Purpose' },
  { id: 'legacy', label: 'Creating a Positive Legacy' },
  { id: 'happiness', label: 'Personal Happiness' },
  { id: 'authenticity_motivation', label: 'Living Authentically' },
];

const stepData = [
  {
    step: 1,
    badge: 'Core Values',
    question: 'What values are most important to you?',
    instruction: 'Select the values that resonate most with you',
    options: valueOptions,
  },
  {
    step: 2,
    badge: 'Personal Goals',
    question: 'What areas would you like to improve?',
    instruction: 'Choose the goals that matter most to you',
    options: goalOptions,
  },
  {
    step: 3,
    badge: 'Challenges',
    question: 'What challenges do you face most often?',
    instruction: 'Select the challenges you want to work on',
    options: challengeOptions,
  },
  {
    step: 4,
    badge: 'Motivation',
    question: 'What motivates you to grow?',
    instruction: 'Pick what drives your personal development',
    options: motivationOptions,
  },
];




const PersonaBuilder = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedValues, setSelectedValues] = useState<Set<string>>(
    new Set()
  );

  // Animation values
  const progressWidth = useSharedValue(106); // Initial width for step 1
  const contentOpacity = useSharedValue(1);
  const contentTranslateX = useSharedValue(0);

  const getCurrentStepData = () => stepData[currentStep];

  const goToNextStep = () => {
    if (currentStep < stepData.length - 1) {
      // Animate content out
      contentOpacity.value = withTiming(0, { duration: 200 });
      contentTranslateX.value = withTiming(-50, { duration: 200 });

      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setSelectedValues(new Set()); // Reset selections for new step

        // Update progress bar
        const newWidth = 106 + ((currentStep + 1) * (width - 40 - 106) / 3);
        progressWidth.value = withSpring(newWidth, {
          damping: 15,
          stiffness: 150,
        });

        // Animate content back in
        contentTranslateX.value = 50;
        contentOpacity.value = withTiming(1, { duration: 300 });
        contentTranslateX.value = withTiming(0, { duration: 300 });
      }, 200);
    } else {
      // Navigate to results page when completing the last step
      router.push('/personaresult');
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      // Animate content out
      contentOpacity.value = withTiming(0, { duration: 200 });
      contentTranslateX.value = withTiming(50, { duration: 200 });

      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setSelectedValues(new Set()); // Reset selections for previous step

        // Update progress bar
        const newWidth = 106 + ((currentStep - 1) * (width - 40 - 106) / 3);
        progressWidth.value = withSpring(newWidth, {
          damping: 15,
          stiffness: 150,
        });

        // Animate content back in
        contentTranslateX.value = -50;
        contentOpacity.value = withTiming(1, { duration: 300 });
        contentTranslateX.value = withTiming(0, { duration: 300 });
      }, 200);
    }
  };

  const toggleValue = (id: string) => {
    const newSelected = new Set(selectedValues);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedValues(newSelected);
  };

  const renderValueOption = (option: ValueOption) => {
    const isSelected = selectedValues.has(option.id);
    return (
      <TouchableOpacity
        key={option.id}
        style={[
          styles.valueOption,
          isSelected ? styles.valueOptionSelected : styles.valueOptionUnselected,
        ]}
        onPress={() => toggleValue(option.id)}
      >
        <Text
          style={[
            styles.valueOptionText,
            isSelected ? styles.valueOptionTextSelected : styles.valueOptionTextUnselected,
          ]}
        >
          {option.label}
        </Text>
      </TouchableOpacity>
    );
  };

  // Animated styles
  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: progressWidth.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateX: contentTranslateX.value }],
  }));

  const currentStepData = getCurrentStepData();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
      

        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Persona Builder</Text>
          <Text style={styles.subtitle}>Discover your path towards optimal mental health</Text>
        </View>

        <Text style={styles.stepText}>Step {currentStepData.step} of 4</Text>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground} />
          <Animated.View style={[styles.progressFill, progressAnimatedStyle]} />
        </View>

        {/* Core Values Badge */}
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{currentStepData.badge}</Text>
        </View>

      {/* Content Section */}
      <Animated.View style={[styles.content, contentAnimatedStyle]}>
        <Text style={styles.questionText}>{currentStepData.question}</Text>
        <Text style={styles.instructionText}>{currentStepData.instruction}</Text>

        {/* Values List */}
        <View style={styles.valuesContainer}>
          {currentStepData.options.map(renderValueOption)}
        </View>
      </Animated.View>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.previousButton,
            currentStep === 0 && styles.previousButtonDisabled
          ]}
          onPress={goToPreviousStep}
          disabled={currentStep === 0}
        >
          <Text style={[
            styles.previousButtonText,
            currentStep === 0 && styles.previousButtonTextDisabled
          ]}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={goToNextStep}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === stepData.length - 1 ? 'Complete' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#212121',
    fontFamily: 'Istok Web',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#595755',
    fontFamily: 'Istok Web',
    textAlign: 'center',
  },
  stepText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#595755',
    fontFamily: 'Istok Web',
    textAlign: 'center',
    marginBottom: 16,
  },
  progressContainer: {
    position: 'relative',
    width: width - 40,
    height: 9,
    marginBottom: 16,
  },
  progressBackground: {
    width: '100%',
    height: 9,
    borderRadius: 6,
    backgroundColor: '#D9D9D9',
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 106,
    height: 9,
    borderRadius: 6,
    backgroundColor: '#EF7850',
  },
  badgeContainer: {
    backgroundColor: '#FEF5F3',
    borderRadius: 86,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 20,
  },
  badgeText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F3A47D',
    fontFamily: 'Istok Web',
  },
  scrollContent: {
  paddingHorizontal: 20,
  paddingTop: 60,
},

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F3A47D',
    fontFamily: 'Istok Web',
    textAlign: 'center',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#595755',
    fontFamily: 'Istok Web',
    textAlign: 'center',
    marginBottom: 24,
  },
  valuesContainer: {
    gap: 23,
  },
  valueOption: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  valueOptionSelected: {
    backgroundColor: '#FEF5F3',
    borderColor: '#F3A47D',
  },
  valueOptionUnselected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DFDDDB',
  },
  valueOptionText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Istok Web',
    textAlign: 'center',
  },
  valueOptionTextSelected: {
    color: '#F3A47D',
  },
  valueOptionTextUnselected: {
    color: '#595755',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 20,
  },
  previousButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 159,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EEE9E9',
    gap: 8,
    marginTop: 15,
  },
  previousButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#595755',
    fontFamily: 'Istok Web',
  },
  previousButtonDisabled: {
    backgroundColor: '#F5F5F5',
  },
  previousButtonTextDisabled: {
    color: '#D0D0D0',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 159,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EF7850',
    gap: 8,
    marginTop: 15,
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Istok Web',
  },
});

export default PersonaBuilder;
