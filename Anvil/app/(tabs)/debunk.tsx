import { useRouter } from 'expo-router';
import React, { useState } from "react";
import {
  Dimensions,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, {
  Circle,
  Ellipse,
  Path
} from "react-native-svg";

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
    quote: '"Boys who cry are weak."',
    content: 'Crying is a natural response to stress, pain, and even happiness. Research shows bottling up emotions leads to higher anxiety and anger. Healthy masculinity makes space for emotion.',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6795704'
  },
  {
    quote: '"Real men don\'t ask for help."',
    content: 'Seeking help is a sign of strength and wisdom. Studies show that men who ask for support have better mental health outcomes and stronger relationships. Independence doesn\'t mean isolation.',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8782463'
  },
  {
    quote: '"Men should always be the provider."',
    content: 'Modern relationships thrive on partnership and shared responsibilities. Many successful families have dual incomes or non-traditional roles. True strength comes from supporting each other.',
    sourceUrl: 'https://www.pewresearch.org/social-trends/2017/09/20/americans-see-men-as-the-financial-providers-even-as-womens-contributions-grow/'
  },
  {
    quote: '"Men don\'t need emotional support."',
    content: 'Everyone needs emotional connection and support. Men who maintain close friendships and express their feelings have lower rates of depression and better overall well-being.',
    sourceUrl: 'https://www.cornerstonehealingcenter.com/resource/mens-mental-health-stigma/'
  }
];

export default function DebunkScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
    <SafeAreaView style={styles.safeContainer}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    width: screenWidth - 32, // Simple responsive width with margins
    height: screenHeight - 160, // Account for safe areas and tab bar  
    alignSelf: "center",
    marginTop: Platform.OS === 'ios' ? 0 : 20, // Remove top margin on iOS
    position: "relative",
    overflow: "hidden", // Hide cards that slide off screen
  },
  cardsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth - 32,
    height: screenHeight - 160,
    overflow: "hidden", // Ensure clean card transitions
  },
  cardWithIcon: {
    position: "absolute",
    left: 0,
    top: 0,
    width: screenWidth - 32,
    height: screenHeight - 160,
  },
  circleInCard: {
    position: "absolute",
    left: (screenWidth - 32) / 2 - 86.5, // Center the circle (173/2 = 86.5)
    top: Platform.OS === 'android' ? -10 : 0, // Raise it slightly on Android
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
    left: (screenWidth - 32) / 2 - 37.5, // Center the icon (75/2 = 37.5)
    top: Platform.OS === 'android' ? 35 : 50, // Lower on Android to avoid clipping title
    zIndex: 15, // Above everything
  },
  cardContent: {
    width: screenWidth - 32,
    height: (screenHeight - 160) * 0.89, // Responsive height
    borderRadius: 10,
    position: "absolute",
    left: 0,
    top: Platform.OS === 'android' ? (screenHeight - 160) * 0.09 : (screenHeight - 160) * 0.11, // Less top space on Android
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'android' ? 30 : 20, // Extra padding for Android
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
    color: "#212121",
    textAlign: "center",
    fontFamily: "System",
    fontSize: 25,
    fontWeight: "800",
    position: "absolute",
    left: (screenWidth - 32) * 0.19,
    right: (screenWidth - 32) * 0.19,
    top: Platform.OS === 'android' ? 50 : 40, // More space from top on Android
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: Platform.OS === 'android' ? 85 : 75, // Lower on Android to match title adjustment
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
    color: "#212121",
    textAlign: "center",
    fontFamily: "System",
    fontSize: 18,
    fontWeight: "600",
    position: "absolute",
    left: (screenWidth - 32) * 0.11,
    right: (screenWidth - 32) * 0.11,
    top: 105,
    lineHeight: 24,
  },
  content: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "System",
    fontSize: 20,
    fontWeight: "400",
    position: "absolute",
    left: (screenWidth - 32) * 0.10,
    right: (screenWidth - 32) * 0.10,
    top: 180,
    lineHeight: 32,
  },
  nextButton: {
    height: 60,
    backgroundColor: "#EF7850",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#EF7850",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: (screenWidth - 32) * 0.09,
    right: (screenWidth - 32) * 0.09,
    bottom: Platform.OS === 'android' ? 40 : 20, // More space on Android
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
    bottom: Platform.OS === 'android' ? 110 : 90, // Position above the source button with more space on Android
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
    bottom: Platform.OS === 'android' ? 110 : 90, // Position above the source button with more space on Android
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
