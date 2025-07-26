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

const PersonIcon = () => (
  <Svg width={34} height={34} viewBox="0 0 34 34" fill="none">
    <Path
      d="M17.0007 3.54199C18.6668 3.54148 20.2892 4.07507 21.6298 5.06444C22.9704 6.05381 23.9585 7.44686 24.4492 9.03911C24.9399 10.6314 24.9072 12.339 24.356 13.9113C23.8048 15.4836 22.7641 16.8379 21.3867 17.7752C23.7775 18.6522 25.8512 20.2246 27.3408 22.29C28.8304 24.3555 29.6677 26.8196 29.745 29.365C29.7522 29.5063 29.7312 29.6476 29.683 29.7806C29.6349 29.9137 29.5607 30.0358 29.4648 30.1397C29.3689 30.2437 29.2531 30.3275 29.1244 30.3861C28.9956 30.4448 28.8565 30.4771 28.7151 30.4813C28.5737 30.4854 28.4328 30.4613 28.3009 30.4103C28.1689 30.3593 28.0485 30.2825 27.9466 30.1843C27.8447 30.0861 27.7635 29.9686 27.7077 29.8386C27.6518 29.7086 27.6225 29.5688 27.6214 29.4273C27.5371 26.6669 26.3812 24.0478 24.3988 22.125C22.4163 20.2022 19.7631 19.1269 17.0014 19.1269C14.2397 19.1269 11.5864 20.2022 9.60401 22.125C7.62157 24.0478 6.4657 26.6669 6.38134 29.4273C6.37288 29.7091 6.25284 29.976 6.0476 30.1693C5.84236 30.3626 5.56876 30.4664 5.28696 30.458C5.00517 30.4495 4.73828 30.3294 4.545 30.1242C4.35172 29.919 4.24788 29.6454 4.25634 29.3636C4.3339 26.8184 5.17136 24.3547 6.66093 22.2895C8.15051 20.2243 10.224 18.6521 12.6147 17.7752C11.2372 16.8379 10.1965 15.4836 9.64534 13.9113C9.09415 12.339 9.06148 10.6314 9.55214 9.03911C10.0428 7.44686 11.0309 6.05381 12.3715 5.06444C13.7121 4.07507 15.3345 3.54148 17.0007 3.54199ZM11.334 11.3337C11.334 12.8366 11.931 14.2779 12.9937 15.3406C14.0564 16.4033 15.4978 17.0003 17.0007 17.0003C18.5036 17.0003 19.9449 16.4033 21.0076 15.3406C22.0703 14.2779 22.6673 12.8366 22.6673 11.3337C22.6673 9.83077 22.0703 8.38943 21.0076 7.32672C19.9449 6.26401 18.5036 5.66699 17.0007 5.66699C15.4978 5.66699 14.0564 6.26401 12.9937 7.32672C11.931 8.38943 11.334 9.83077 11.334 11.3337Z"
      fill="#FFFCFC"
    />
  </Svg>
);



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
    <ScrollView
  contentContainerStyle={styles.scrollContent}
  showsVerticalScrollIndicator={false}
>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profileIconContainer}>
          <Svg width={61} height={61} viewBox="0 0 61 61" fill="none">
            <Circle cx="30.5" cy="30.5" r="30.5" fill="#7096CC" />
          </Svg>
          <View style={styles.personIconContainer}>
            <PersonIcon />
          </View>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Persona Builder</Text>
          <Text style={styles.subtitle}>Discover your path to healthy masculinity</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 100,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileIconContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  personIconContainer: {
    position: 'absolute',
    top: 13.5,
    left: 13.5,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Istok Web',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#AFB0B4',
    fontFamily: 'Istok Web',
    textAlign: 'center',
  },
  stepText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#AFB0B4',
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
    backgroundColor: '#7096CC',
  },
  badgeContainer: {
    backgroundColor: '#E6EAF2',
    borderRadius: 86,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 20,
  },
  badgeText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F234B',
    fontFamily: 'Istok Web',
  },
  scrollContent: {
  paddingHorizontal: 20,
},

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4E4E50',
    fontFamily: 'Istok Web',
    textAlign: 'center',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#82838B',
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
    backgroundColor: '#B8C6DA',
    borderColor: '#4D6A93',
  },
  valueOptionUnselected: {
    backgroundColor: '#FFF',
    borderColor: '#DFDDDB',
  },
  valueOptionText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Istok Web',
    textAlign: 'center',
  },
  valueOptionTextSelected: {
    color: '#0F234B',
  },
  valueOptionTextUnselected: {
    color: '#7E7E7E',
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
    color: '#A7A4A4',
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
    backgroundColor: '#7096CC',
    gap: 8,
    marginTop: 15,
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    fontFamily: 'Istok Web',
  },
});

export default PersonaBuilder;
