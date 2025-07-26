import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, {
  Path,
  G,
  Defs,
  Filter,
  FeFlood,
  FeBlend,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeComposite,
} from "react-native-svg";
import { useRouter } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Anvil Icon Component
const AnvilIcon = () => (
  <Svg width={286} height={164} viewBox="0 0 287 164" style={styles.anvilIcon}>
    <Defs>
      <Filter
        id="filter0_i_166_12"
        x="9.79956"
        y="1.87329"
        width="276.321"
        height="166.011"
        filterUnits="userSpaceOnUse"
      >
        <FeFlood floodOpacity="0" result="BackgroundImageFix" />
        <FeBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <FeColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <FeOffset dy="4" />
        <FeGaussianBlur stdDeviation="2" />
        <FeComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <FeColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <FeBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_166_12"
        />
      </Filter>
    </Defs>
    <G filter="url(#filter0_i_166_12)">
      <Path
        d="M11.6603 12.1944C7.75602 8.44207 10.4043 1.85785 15.8117 1.87335L112.559 2.15063C115.865 2.1601 118.549 4.84344 118.558 8.1504L118.689 53.5816C118.699 57.0926 115.706 59.8537 112.207 59.5616L77.3456 56.6522C63.5848 55.5037 50.6278 49.6454 40.6597 40.0653L11.6603 12.1944Z"
        fill="white"
      />
      <Path
        d="M131.896 6.61499C131.896 4.40585 133.687 2.61499 135.896 2.61499H272.35H282.12C284.33 2.61499 286.12 4.40585 286.12 6.61499V20.983C286.12 23.1922 284.33 24.983 282.12 24.983H276.35C274.141 24.983 272.35 26.7739 272.35 28.983V57.0205C272.35 59.2296 270.559 61.0205 268.35 61.0205H135.896C133.687 61.0205 131.896 59.2296 131.896 57.0205V6.61499Z"
        fill="white"
      />
      <Path
        d="M132.061 49.6885L201.323 61.0209L197.121 61.742C196.54 61.8418 195.978 62.0323 195.456 62.3065C192.368 63.928 190.434 67.1281 190.434 70.6158V80.1988V103.935C190.434 108.593 193.814 112.563 198.412 113.307L218.951 115.219C221.521 115.458 223.487 117.615 223.487 120.197V158.884C223.487 161.646 221.249 163.884 218.487 163.884H210.95H192.51C191.218 163.884 190.018 163.22 189.332 162.125C175.335 139.767 143.236 138.476 127.488 159.637L125.326 162.542C124.698 163.387 123.707 163.884 122.655 163.884H93.6563C90.8948 163.884 88.6562 161.646 88.6562 158.884V120.157C88.6562 117.663 90.6781 115.641 93.1722 115.641H111.245C117.656 115.641 123.661 112.504 127.324 107.242C129.51 104.101 130.729 100.389 130.829 96.5638L132.061 49.6885Z"
        fill="white"
      />
    </G>
  </Svg>
);

// Arrow Icon Component
const ArrowIcon = () => (
  <Svg width={12} height={17} viewBox="0 0 12 17" style={styles.arrowIcon}>
    <Path
      d="M3.87271 0.585786C3.09166 -0.195262 1.82533 -0.195262 1.04428 0.585786C0.263234 1.36683 0.263234 2.63316 1.04428 3.41421L3.87271 0.585786ZM2.4585 2L1.04428 3.41421L9.12727 11.4972L10.5415 10.083L11.9557 8.66878L3.87271 0.585786L2.4585 2Z"
      fill="#FFFFFF"
    />
    <Path
      d="M0.936683 13.2821C0.103747 14.0076 0.0166208 15.2709 0.742081 16.1038C1.46754 16.9368 2.73087 17.0239 3.56381 16.2984L0.936683 13.2821ZM2.25024 14.7903L3.56381 16.2984L11.7458 9.17222L10.4322 7.66405L9.11865 6.15589L0.936683 13.2821L2.25024 14.7903Z"
      fill="#FFFFFF"
    />
  </Svg>
);
// Main Home Screen Component

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Background Circle */}
      <LinearGradient
        colors={['#F49825', '#EF5724']}
        style={styles.backgroundCircle}
      />

      {/* Anvil Icon */}
      <View style={styles.iconContainer}>
        <AnvilIcon />
      </View>

      {/* Main Title */}
      <Text style={styles.title}>ANVIL</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Forge a stronger mentality</Text>

      {/* CTA Button */}
      <TouchableOpacity onPress={() => router.push('/signup')}
              style={styles.continueButtonContainer}>
                <View style={styles.continueButton}>
                  <Text style={styles.ctaText}>Get started for free</Text>
                  <ArrowIcon />
                </View>
              </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity style={styles.loginContainer} activeOpacity={0.7}>
        <Text style={styles.link}>Have an account already?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
    alignItems: "center",
  },
  backgroundCircle: {
    position: "absolute",
    width: 511,
    height: 532,
    borderRadius: 145,
    left: -36,
    top: -65,
  },
  iconContainer: {
    position: "absolute",
    top: 261,
    left: screenWidth / 2 - 143, // Center the 286px wide icon
  },
  anvilIcon: {
    width: 286,
    height: 164,
  },
  title: {
    position: "absolute",
    top: 527,
    left: screenWidth / 2 - 110, // Center the 220px wide text
    width: 220,
    height: 108,
    fontFamily: "System",
    fontWeight: "700",
    fontSize: 60,
    lineHeight: 60,
    textAlign: "center",
    color: "#212121",
  },
  subtitle: {
    position: "absolute",
    top: 615,
    left: screenWidth / 2 - 194.5, // Center the 389px wide text
    width: 389,
    height: 108,
    fontFamily: "System",
    fontWeight: "400",
    fontSize: 30,
    lineHeight: 30,
    textAlign: "center",
    color: "#212121",
  },
  ctaButton: {
    position: "absolute",
    top: 743,
    left: screenWidth / 2 - 150.5, // Center the 301px wide button
    width: 301,
    height: 72,
    backgroundColor: "#EF7850",
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  ctaText: {
    fontFamily: "System",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
  arrowIcon: {
    width: 9,
    height: 13,
    marginLeft: 8,
  },
  continueButtonContainer: {
    alignItems: "center",
    marginBottom: 28,
     top: 695,
  },
  continueButton: {
    width: 301,
    height: 72,
    backgroundColor: "#EF7850",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  loginContainer: {
    position: "absolute",
    top: 875,
    left: screenWidth / 2 - 109.5, // Center the 219px wide text
    width: 219,
    height: 26,
  },
  link: {
    fontFamily: "System",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 18,
    textAlign: "center",
    color: "#4596EC",
    textDecorationLine: "underline",
  },
});
