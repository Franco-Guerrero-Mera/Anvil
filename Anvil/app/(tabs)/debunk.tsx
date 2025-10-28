import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Svg, {
  Path,
  Ellipse,
  Defs,
  LinearGradient,
  Stop,
  Circle,
} from "react-native-svg";
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  runOnJS,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Linking} from 'react-native';

// Swipe Indicator Component
const SwipeIndicator = () => (
  <View style={styles.swipeIndicator}>
    <Text style={styles.swipeText}>Swipe to continue</Text>
    <View style={styles.swipeArrow}>
      <Svg width={20} height={12} viewBox="0 0 20 12" fill="none">
        <Path
          d="M1 6L19 6M19 6L14 1M19 6L14 11"
          stroke="#666"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  </View>
);

// End of Lesson Component
const EndOfLessonIndicator = () => (
  <View style={styles.endOfLessonContainer}>
    <View style={styles.textAndIcon}>
      <View style={styles.textContainer}>
        <Text style={styles.endOfLessonText}>Lesson Complete!</Text>
        <Text style={styles.endOfLessonSubtext}>Great job debunking these myths</Text>
      </View>
      <View style={styles.completionIcon}>
        <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
          <Circle cx="20" cy="20" r="20" fill="#4CAF50" />
          <Path
            d="M12 20L18 26L28 16"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
    </View>
  </View>
);


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Card data
const cardData = [
  {
    quote: 'I\'m weak for needing help.',
    content: 'According to the American Psychiatric Association, "Mental health struggles aren’t about weakness or character flaws. Environmental factors, genetics, and other stressors play a role." Acknowledging the need for support and taking steps to address mental health issues demonstrates resilience and self-awareness.',
       sourceUrl: 'https://www.psychiatry.org/news-room/apa-blogs/myths-and-facts-about-mental-health?'
  },
  {
    quote: 'I should be able to handle mental issues on my own.',
    content: 'It\'s okay to seek support; you don\'t have to face mental health challenges alone. The Substance Abuse and Mental Health Services Administration (SAMHSA) states, "Talking to someone and asking for help is a sign of strength, not weakness."  Reaching out for help is a proactive step toward healing and well-being, not a sign of inadequacy.',
    sourceUrl: 'https://www.samhsa.gov/find-support/how-to-cope/how-to-ask-for-help?'
  },
  {
    quote: 'Only people with serious problems need therapy.',
    content: 'Therapy is beneficial for anyone, regardless of the severity of their issues. The National Alliance on Mental Illness (NAMI) notes, "Therapy can help those with diagnosed mental health conditions and benefit anyone seeking support." Therapy provides valuable tools for managing stress, improving self-awareness, and enhancing overall mental health.',
    sourceUrl: 'https://blog.ulliance.com/top-10-behavioral-health-myths-busted?'
  },
  {
    quote: 'I\'m just overreacting; I don\'t need help.',
    content: 'Your feelings are valid, and seeking help is a responsible choice. The American Psychiatric Association emphasizes, "Mental health struggles aren’t about weakness or character flaws... Seeking help when struggling is a sign of resilience and strength."  Recognizing and addressing emotional distress is a crucial step in maintaining mental well-being.',
    sourceUrl: 'https://www.psychiatry.org/news-room/apa-blogs/myths-and-facts-about-mental-health?'
  },
];

export default function DebunkScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const translateX = useSharedValue(0);
  const progressScale = useSharedValue(1);

  const goToNextCard = () => {
    if (currentIndex < cardData.length - 1) {
      const nextIndex = currentIndex + 1;
      // Add a brief scale animation to progress indicator
      progressScale.value = withSpring(1.2, { duration: 200 }, () => {
        progressScale.value = withSpring(1);
      });
      setCurrentIndex(nextIndex);
      translateX.value = withSpring(0); // Reset position after state change
    } else {

    }
  };

  const goToPrevCard = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      // Add a brief scale animation to progress indicator
      progressScale.value = withSpring(1.2, { duration: 200 }, () => {
        progressScale.value = withSpring(1);
      });
      setCurrentIndex(prevIndex);
      translateX.value = withSpring(0); // Reset position after state change
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      const threshold = screenWidth * 0.25;
      const slideInThreshold = screenWidth * 0.15; // Same as animation threshold
      
      if (event.translationX < -threshold && currentIndex < cardData.length - 1) {
        // Swipe left - next card
        runOnJS(goToNextCard)();
      } else if (event.translationX > threshold && currentIndex > 0) {
        // Swipe right - previous card
        runOnJS(goToPrevCard)();
      } else if (Math.abs(event.translationX) > slideInThreshold) {
        // If we've started sliding in a new card but didn't reach full threshold,
        // complete the transition anyway
        if (event.translationX < -slideInThreshold && currentIndex < cardData.length - 1) {
          runOnJS(goToNextCard)();
        } else if (event.translationX > slideInThreshold && currentIndex > 0) {
          runOnJS(goToPrevCard)();
        } else {
          // Snap back to center
          translateX.value = withSpring(0);
        }
      } else {
        // Snap back to center
        translateX.value = withSpring(0);
      }
    });

  // Background elements move subtly with the gesture for cohesion
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const subtleMovement = translateX.value * 0.1; // Much subtler movement
    return {
      transform: [
        { translateX: subtleMovement },
      ],
    };
  });

  // Animation for individual cards - true card replacement with separate elements
  const getCardAnimatedStyle = (cardIndex: number) => {
    return useAnimatedStyle(() => {
      const isCurrentCard = cardIndex === currentIndex;
      const isNextCard = cardIndex === currentIndex + 1;
      const isPreviousCard = cardIndex === currentIndex - 1;
      
      let cardTranslateX = 0;
      let translateY = 0;
      let scale = 1;
      let zIndex = 0;
      let opacity = 1;
      let rotation = 0;
      
      if (isCurrentCard) {
        // Current card - slides out when swiped
        cardTranslateX = translateX.value;
        scale = interpolate(
          Math.abs(translateX.value),
          [0, screenWidth * 0.2],
          [1, 0.95],
          Extrapolate.CLAMP
        );
        rotation = interpolate(
          translateX.value,
          [-screenWidth, screenWidth],
          [-15, 15],
          Extrapolate.CLAMP
        );
        zIndex = 10;
        opacity = 1;
      } else if (isNextCard) {
        // Next card - starts off-screen right, slides in when current card is swiped left
        cardTranslateX = screenWidth;
        translateY = 0;
        scale = 1;
        zIndex = 9;
        opacity = 1;
        
        // Only start sliding in when current card is significantly swiped
        if (translateX.value < -screenWidth * 0.15) {
          cardTranslateX = interpolate(
            translateX.value,
            [-screenWidth * 0.15, -screenWidth * 0.5],
            [screenWidth, 0],
            Extrapolate.CLAMP
          );
        }
      } else if (isPreviousCard) {
        // Previous card - starts off-screen left, slides in when current card is swiped right
        cardTranslateX = -screenWidth;
        translateY = 0;
        scale = 1;
        zIndex = 9;
        opacity = 1;
        
        // Only start sliding in when current card is significantly swiped
        if (translateX.value > screenWidth * 0.15) {
          cardTranslateX = interpolate(
            translateX.value,
            [screenWidth * 0.15, screenWidth * 0.5],
            [-screenWidth, 0],
            Extrapolate.CLAMP
          );
        }
      } else {
        // Other cards - completely hidden
        cardTranslateX = cardIndex > currentIndex ? screenWidth * 2 : -screenWidth * 2;
        scale = 1;
        zIndex = 5;
        opacity = 0;
      }
      
      return {
        transform: [
          { translateX: cardTranslateX },
          { translateY },
          { scale },
          { rotate: `${rotation}deg` }
        ],
        zIndex,
        opacity,
      };
    });
  };

  // Animated progress indicator feedback
  const progressAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: progressScale.value }],
  }));

  // Background color animation for better tab differentiation
  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      Math.abs(translateX.value),
      [0, screenWidth * 0.15],
      [1, 0.9],
      Extrapolate.CLAMP
    );
    return {
      opacity,
    };
  });

  const getCurrentCard = () => cardData[currentIndex];
  const currentCard = getCurrentCard();

  return (
    <Animated.View style={[styles.container, backgroundAnimatedStyle]}>
      <View style={styles.contentContainer}>
        {/* Cards Container - Stacked deck effect with integrated icons and white circle */}
        <GestureDetector gesture={panGesture}>
          <View style={styles.cardsContainer}>
            {/* Render cards in reverse order so current card appears on top */}
            {[...cardData].reverse().map((card, reverseIndex) => {
              const index = cardData.length - 1 - reverseIndex;
              return (
                <Animated.View 
                  key={index}
                  style={[styles.cardWithIcon, getCardAnimatedStyle(index)]}
                >
                  {/* White Circle Background - moves with each card */}
                  <View style={styles.circleInCard}>
                    <Svg
                      width={173}
                      height={176}
                      viewBox="0 0 174 177"
                      style={styles.circleBackground}
                    >
                      <Path
                        d="M86.7005 0C134.455 0 173.168 39.4741 173.168 88.168C173.168 136.862 134.455 176.336 86.7005 176.336C38.9457 176.336 0.232727 136.862 0.232727 88.168C0.232796 39.4741 38.9457 2.52293e-05 86.7005 0Z"
                        fill="#FFEBE5"
                      />
                    </Svg>
                  </View>

                  {/* Document Icon - Above the card */}
                  <View style={styles.iconAboveCard}>
                    <Svg width={75} height={75} viewBox="0 0 75 75">
                      <Ellipse
                        cx="37.2624"
                        cy="37.2635"
                        rx="37.2624"
                        ry="37.2635"
                        fill="#EF7850"
                      />
                      <Path
                        d="M24.4344 56.2008C23.4265 56.2008 22.5639 55.7891 21.8468 54.9657C21.1296 54.1423 20.7704 53.1512 20.7692 51.9926V22.5347C20.7692 21.3774 21.1284 20.3871 21.8468 19.5636C22.5652 18.7402 23.4277 18.3278 24.4344 18.3264H44.5927L53.7556 28.8471V51.9926C53.7556 53.1498 53.397 54.1409 52.6799 54.9657C51.9627 55.7905 51.0996 56.2022 50.0904 56.2008H24.4344ZM24.4344 51.9926H50.0904V30.9512H42.7601V22.5347H24.4344V51.9926ZM28.0995 47.7843H46.4253V43.576H28.0995V47.7843ZM28.0995 30.9512H37.2624V26.743H28.0995V30.9512ZM28.0995 39.3678H46.4253V35.1595H28.0995V39.3678Z"
                        fill="white"
                      />
                    </Svg>
                  </View>

                  {/* White Card */}
                  <View style={styles.cardContent}>
                    {/* Title */}
                    <Text style={styles.title}>Daily Debunk</Text>
                    
                    {/* Progress Indicator - Only show on current card */}
                    {index === currentIndex && (
                      <Animated.View style={[styles.progressContainer, progressAnimatedStyle]}>
                        {cardData.map((_, dotIndex) => (
                          <Animated.View
                            key={dotIndex}
                            style={[
                              styles.progressDot,
                              dotIndex === currentIndex && styles.progressDotActive
                            ]}
                          />
                        ))}
                      </Animated.View>
                    )}

                    {/* Quote */}
                    <Text style={styles.quote}>{card.quote}</Text>

                    {/* Main content */}
                    <Text style={styles.content}>
                      {card.content}
                    </Text>
                    
                    {/* Show swipe indicator only on first card - above source button */}
                    {index === currentIndex && currentIndex === 0 && (
                      <View style={styles.swipeIndicatorContainer}>
                        <SwipeIndicator />
                      </View>
                    )}

                    {/* Show end of lesson indicator on last card - above source button */}
                    {index === currentIndex && currentIndex === cardData.length - 1 && (
                      <View style={styles.endOfLessonWrapper}>
                        <EndOfLessonIndicator />
                      </View>
                    )}

                    {/* Sources Button - Only show on current card, now in next button position */}
                    {index === currentIndex && (
                      <TouchableOpacity 
                        onPress={() => Linking.openURL(card.sourceUrl)}
                        style={styles.nextButton}
                      >
                        <Text style={styles.nextButtonText}>Sources</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </Animated.View>
              );
            })}
          </View>
        </GestureDetector>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    width: 386,
    height: 794,
    alignSelf: "center",
    marginTop: 15,
    position: "relative",
    overflow: "hidden", // Hide cards that slide off screen
  },
  cardsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 386,
    height: 794,
    overflow: "hidden", // Ensure clean card transitions
  },
  cardWithIcon: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 386,
    height: 794,
  },
  circleInCard: {
    position: "absolute",
    left: 102,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5, // Behind the white card container
  },
  circleBackground: {
    position: "absolute",
    left: 0,
    top: 38,
  },
  iconAboveCard: {
    position: "absolute",
    left: 150,
    top: 50,
    zIndex: 15, // Above everything
  },
  cardContent: {
    width: 386,
    height: 705,

    borderRadius: 10,
    position: "absolute",
    left: 0,
    top: 89,
    paddingHorizontal: 20,
    zIndex: 10, // Above the white circle, below the icon
    backgroundColor: "#FFEBE5"
  },
  separator: {
    width: 167,
    height: 7,
    backgroundColor: "white",
    position: "absolute",
    left: 110,
    top: 14,
  },
  title: {
    width: 240,
    height: 30,
    color: "#212121",
    textAlign: "center",
    fontFamily: "System",
    fontSize: 25,
    fontWeight: "800",
    position: "absolute",
    left: 73,
    top: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 75,
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D0D0D0',
  },
  progressDotActive: {
    backgroundColor: '#EF7850',
    width: 12,
    height: 8,
    borderRadius: 4,
  },
  quote: {
    width: 300,
    minHeight: 60,
    color: "#212121",
    textAlign: "center",
    fontFamily: "System",
    fontSize: 18,
    fontWeight: "600",
    position: "absolute",
    left: 43,
    top: 105,
    lineHeight: 24,
  },
  content: {
    width: 306,
    minHeight: 300,
    color: "#212121",
    textAlign: "center",
    fontFamily: "System",
    fontSize: 20,
    fontWeight: "400",
    position: "absolute",
    left: 40,
    top: 180,
    lineHeight: 32,
  },
  nextButton: {
    width: 331,
    height: 60,
    backgroundColor: "#EF7850",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#EF7850",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 35,
    top: 631,
  },
  nextButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "System",
    fontSize: 20,
    fontWeight: "700",
  },
  // Swipe Indicator Styles
  swipeIndicatorContainer: {
    position: "absolute",
    bottom: 90, // Position above the source button (button is at bottom 20, height 60, so 80 + 10 margin)
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 20,
  },
  swipeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  swipeArrow: {
    opacity: 0.7,
  },
  swipeText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
  // End of Lesson Styles
  endOfLessonWrapper: {
    position: "absolute",
    bottom: 90, // Position above the source button (same as swipe indicator)
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 20,
  },
  endOfLessonContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    width: 320, // Set a specific width to provide more space
    maxWidth: 350, // Maximum width to prevent overflow
  },
  textAndIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  textContainer: {
    flex: 1,
  },
  completionIcon: {
    // Icon positioned on the right
  },
  endOfLessonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "left", // Changed from center to left for better space utilization
  },
  endOfLessonSubtext: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "left", // Changed from center to left for better space utilization
  },
});
