import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";


const { width } = Dimensions.get("window");


const GroupIcon = ({ size = 28, color = "#EF7850" }) => (
  <Svg width={size * 1.75} height={size} viewBox="0 0 49 28" fill="none">
    <Path
      d="M24.5 15.75C27.8279 15.75 30.7679 16.66 33.1567 17.85C35.3617 18.97 36.75 21.49 36.75 24.22V28H12.25V24.2433C12.25 21.49 13.6383 18.97 15.8433 17.8733C18.2321 16.66 21.1721 15.75 24.5 15.75ZM8.16667 16.3333C10.4125 16.3333 12.25 14.2333 12.25 11.6667C12.25 9.1 10.4125 7 8.16667 7C5.92084 7 4.08333 9.1 4.08333 11.6667C4.08333 14.2333 5.92084 16.3333 8.16667 16.3333ZM10.4738 18.9C9.71834 18.76 8.96292 18.6667 8.16667 18.6667C6.14542 18.6667 4.22625 19.1567 2.49083 20.02C1.75116 20.3813 1.12072 20.9831 0.677871 21.7506C0.235022 22.5181 -0.000701693 23.4173 1.56901e-06 24.3367V28H9.1875V24.2433C9.1875 22.3067 9.65709 20.4867 10.4738 18.9ZM40.8333 16.3333C43.0792 16.3333 44.9167 14.2333 44.9167 11.6667C44.9167 9.1 43.0792 7 40.8333 7C38.5875 7 36.75 9.1 36.75 11.6667C36.75 14.2333 38.5875 16.3333 40.8333 16.3333ZM49 24.3367C49 22.4467 48.02 20.7667 46.5092 20.02C44.7189 19.1272 42.7866 18.6665 40.8333 18.6667C40.0371 18.6667 39.2817 18.76 38.5263 18.9C39.3429 20.4867 39.8125 22.3067 39.8125 24.2433V28H49V24.3367ZM24.5 0C27.8892 0 30.625 3.12667 30.625 7C30.625 10.8733 27.8892 14 24.5 14C21.1108 14 18.375 10.8733 18.375 7C18.375 3.12667 21.1108 0 24.5 0Z"
      fill={color}
    />
  </Svg>
);

const PersonaIcon = ({ size = 28, color = "#EF7850" }) => (
  <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <Path
      d="M13.9993 17.6184C13.2822 17.619 12.581 17.4066 11.9848 17.0081C11.3886 16.6096 10.9242 16.043 10.6506 15.3801C10.377 14.7172 10.3064 13.988 10.4479 13.285C10.5894 12.582 10.9365 11.9368 11.4453 11.4314C11.5413 11.3363 11.655 11.2611 11.78 11.21C11.9051 11.1589 12.0389 11.1329 12.174 11.1336C12.3091 11.1342 12.4427 11.1614 12.5672 11.2137C12.6918 11.266 12.8048 11.3423 12.8999 11.4382C12.9949 11.5342 13.0701 11.6479 13.1212 11.7729C13.1724 11.898 13.1983 12.0318 13.1977 12.1669C13.1971 12.302 13.1698 12.4356 13.1176 12.5601C13.0653 12.6847 12.989 12.7977 12.893 12.8928C12.7457 13.0368 12.6287 13.2089 12.5489 13.3989C12.4692 13.589 12.4283 13.793 12.4287 13.9991C12.4105 14.3234 12.4943 14.6454 12.6682 14.9198C12.8422 15.1942 13.0976 15.4073 13.3988 15.5292C13.6999 15.6512 14.0316 15.6759 14.3475 15.5999C14.6634 15.5239 14.9475 15.3509 15.1602 15.1053C15.3546 14.9127 15.6172 14.8046 15.8909 14.8046C16.1646 14.8046 16.4272 14.9127 16.6216 15.1053C16.811 15.3014 16.9169 15.5634 16.9169 15.836C16.9169 16.1087 16.811 16.3707 16.6216 16.5667C16.2764 16.9076 15.8667 17.1763 15.4165 17.3568C14.9662 17.5374 14.4844 17.6263 13.9993 17.6184Z"
      fill={color}
    />
    <Path
      d="M27.9985 13.9993C27.9985 17.7121 26.5236 21.2729 23.8983 23.8983C21.2729 26.5236 17.7121 27.9985 13.9993 27.9985C10.2864 27.9985 6.72566 26.5236 4.10029 23.8983C1.47492 21.2729 0 17.7121 0 13.9993C0 10.2864 1.47492 6.72566 4.10029 4.10029C6.72566 1.47492 10.2864 0 13.9993 0C14.2709 0 14.5315 0.107921 14.7236 0.300021C14.9157 0.492122 15.0236 0.752666 15.0236 1.02434V6.21431C15.0201 6.48488 14.911 6.74338 14.7197 6.93471C14.5283 7.12605 14.2698 7.23511 13.9993 7.23865C12.6617 7.22944 11.3525 7.62457 10.2434 8.37225C9.12797 9.11148 8.25813 10.1663 7.74485 11.402C7.23156 12.6378 7.09813 13.9985 7.36157 15.3104C7.78999 16.8668 8.75594 18.2212 10.088 19.1331C11.4201 20.045 13.0321 20.4555 14.6381 20.2918C16.2441 20.1281 17.7402 19.4007 18.8608 18.2388C19.9815 17.0769 20.6543 15.5555 20.7599 13.9446C20.7581 13.8096 20.7833 13.6756 20.8341 13.5505C20.885 13.4254 20.9603 13.3117 21.0558 13.2162C21.1513 13.1207 21.265 13.0454 21.3901 12.9945C21.5152 12.9437 21.6492 12.9185 21.7842 12.9203H26.9742C27.1134 12.9201 27.2513 12.9483 27.3792 13.0032C27.5072 13.058 27.6227 13.1384 27.7185 13.2394C27.8144 13.3404 27.8887 13.4598 27.9368 13.5905C27.985 13.7211 28.006 13.8602 27.9985 13.9993Z"
      fill={color}
    />
    <Path
      d="M27.507 5.98247C27.4713 6.24819 27.3626 6.49878 27.1929 6.70633L24.2291 9.67008C23.8076 10.0933 23.2862 10.4033 22.7131 10.5715C22.3769 10.6747 22.0268 10.7254 21.6751 10.7217C21.4343 10.7431 21.1921 10.7431 20.9513 10.7217L19.1348 10.3666L16.0208 13.4943C15.825 13.6805 15.5671 13.7875 15.2969 13.7947C15.0253 13.7945 14.765 13.6864 14.573 13.4943C14.4764 13.4001 14.3996 13.2875 14.3472 13.1632C14.2947 13.0389 14.2677 12.9053 14.2677 12.7704C14.2677 12.6355 14.2947 12.5019 14.3472 12.3776C14.3996 12.2533 14.4764 12.1407 14.573 12.0465L17.7007 8.90524L17.3319 7.10241C17.2217 6.52132 17.2498 5.92244 17.4139 5.35421C17.5821 4.7811 17.8921 4.25968 18.3153 3.83819L21.2517 0.901756C21.4535 0.718211 21.7056 0.599288 21.9756 0.560311C22.2282 0.523707 22.486 0.566668 22.7131 0.683231C22.9385 0.797861 23.1276 0.972802 23.2594 1.18857C23.3928 1.43001 23.4499 1.70618 23.4233 1.98072L22.9863 5.06739L26.0593 4.644C26.3165 4.61875 26.5754 4.67173 26.802 4.79601C27.0286 4.92029 27.2125 5.11008 27.3295 5.34055C27.4407 5.53659 27.5017 5.75712 27.507 5.98247Z"
      fill={color}
    />
  </Svg>
);

type TabIconProps = {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
};

const TabIcon = ({ label, icon, onPress }: TabIconProps) => (
  <TouchableOpacity style={styles.tabItem} onPress={onPress}>
    {icon}
    <Text style={styles.tabLabel}>{label}</Text>
  </TouchableOpacity>
);

const CustomTabBar = ({
  navigation,
  state,
}: BottomTabBarProps) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const icon1Y = useSharedValue(0);
  const icon1X = useSharedValue(0);
  const icon2Y = useSharedValue(0);
  const icon2X = useSharedValue(0);
  const icon3Y = useSharedValue(0);
  const icon3X = useSharedValue(0);
  const blurOpacity = useSharedValue(0);

  const blurAnimatedStyle = useAnimatedStyle(() => ({
    opacity: blurOpacity.value,
  }));

  const popup1Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: icon1X.value },
      { translateY: icon1Y.value },
      { scale: icon1Y.value === 0 ? withTiming(0) : 1 },
    ],
    opacity: blurOpacity.value,
  }));

  const popup2Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: icon2X.value },
      { translateY: icon2Y.value },
      { scale: icon2Y.value === 0 ? withTiming(0) : 1 },
    ],
    opacity: blurOpacity.value,
  }));

  const popup3Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: icon3X.value },
      { translateY: icon3Y.value },
      { scale: icon3Y.value === 0 ? withTiming(0) : 1 },
    ],
    opacity: blurOpacity.value,
  }));

  // Get current route name
  const currentRoute = state.routes[state.index].name;
  
  // Check if we should hide the tab bar on index and signup pages
  const shouldHideTabBar = currentRoute === 'index' || currentRoute === 'signup';

  const toggleMenu = () => {
    const open = !menuOpen;
    setMenuOpen(open);

    if (open) {
      icon1X.value = withSpring(-70);
      icon1Y.value = withSpring(-70);
      icon2X.value = withSpring(0);
      icon2Y.value = withSpring(-90);
      icon3X.value = withSpring(70);
      icon3Y.value = withSpring(-70);
      blurOpacity.value = withTiming(1, { duration: 300 });
    } else {
      icon1X.value = withSpring(0);
      icon1Y.value = withSpring(0);
      icon2X.value = withSpring(0);
      icon2Y.value = withSpring(0);
      icon3X.value = withSpring(0);
      icon3Y.value = withSpring(0);
      blurOpacity.value = withTiming(0, { duration: 300 });

    }
  };

  return (
    <>
      {!shouldHideTabBar && (
        <>
          <Animated.View
            pointerEvents={menuOpen ? 'auto' : 'none'}
            style={[styles.blurOverlay, blurAnimatedStyle]}
          >
            <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
            <TouchableOpacity
              style={styles.blurTouchable}
              onPress={toggleMenu}
              activeOpacity={1}
            />
          </Animated.View>

          {/* Popup buttons */}
          <Animated.View style={[styles.popupIcon, popup1Style]}>
            <TouchableOpacity onPress={() => {
              toggleMenu();
              navigation.navigate("persona");
            }}>
              <View style={styles.popupCircle}>
                <PersonaIcon size={26} color="white" />
              </View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.popupIcon, popup2Style]}>
            <TouchableOpacity onPress={() => {
              toggleMenu();
              navigation.navigate("profile");
            }}>
              <View style={styles.popupCircle}>
                <Ionicons name="person" color="white" size={26} />
              </View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.popupIcon, popup3Style]}>
            <TouchableOpacity onPress={() => {
              toggleMenu();
              navigation.navigate("debunk");
            }}>
              <View style={styles.popupCircle}>
                <Ionicons name="document-text" color="white" size={26} />
              </View>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.tabBar}>
            <View style={styles.leftSection}>
              <TabIcon
                label="Home"
                icon={<Ionicons name="home" size={36} color="#EF7850" />}
                onPress={() => navigation.navigate("home")}
              />
              <TabIcon
                label="Bobert"
                icon={<Ionicons name="chatbubbles" size={36} color="#EF7850" />}
                onPress={() => navigation.navigate("aichat")}
              />
            </View>

            <View style={styles.centerSection}>
              <TouchableOpacity
                onPress={toggleMenu}
                style={styles.centerButtonContainer}
              >
                <View style={styles.centerButton}>
                  <Ionicons
                    name={menuOpen ? "close" : "menu"}
                    size={35}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.rightSection}>
              <TabIcon
                label="Journal"
                icon={<Ionicons name="book" size={35} color="#EF7850" />}
                onPress={() => navigation.navigate("journal")}
              />
              <TabIcon
                label="Community"
                icon={<GroupIcon size={36} color="#EF7850" />}
                onPress={() => navigation.navigate("community")}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="signup" />
      <Tabs.Screen name="aichat" />
      <Tabs.Screen name="community" />
      <Tabs.Screen name="journal" />
      <Tabs.Screen name="debunk" />
      <Tabs.Screen name="persona" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="home" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
 tabBar: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  height: 85,
  backgroundColor: "white",
  borderTopWidth: 0.5,
  borderTopColor: "#ddd",
  paddingBottom: 20,
  paddingTop: 18,
  paddingHorizontal: 25,
  },
  tabItem: {
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 8,
  minWidth: 60,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
  },
  centerButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  leftSection: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
  },
  centerSection: {
    flexDirection: "row",
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  middleSection: {
    flexDirection: "row",
    flex: 2,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  rightSection: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
  },
  spacer: {
  width: 86,          
  height: 86,  
  },
  centerButton: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#EF7850',
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "white",
   elevation: 10,       
   zIndex: 999,    
  },
  popupIcon: {
    position: "absolute",
    bottom: 85,
    left: width / 2 - 30,
    zIndex: 99,
  },
  popupCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EF7850',
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 95,
  },
  blurTouchable: {
    flex: 1,
     backgroundColor: 'transparent',
  },
});
