import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, {
  Path,
  Rect,
  G,
  Defs,
  Filter,
  FeFlood,
  FeBlend,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeComposite,
  LinearGradient as SvgLinearGradient,
  Stop,
} from "react-native-svg";
import { useRouter } from 'expo-router';

// Custom Logo Component
const AppLogo = () => (
  <View style={styles.logoContainer}>
    <Svg width="158" height="149" viewBox="0 0 158 149" fill="none">
      <Defs>
        <SvgLinearGradient
          id="logoGradient"
          x1="78.7816"
          y1="0"
          x2="78.7816"
          y2="149"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.221154" stopColor="#F49825" />
          <Stop offset="0.793269" stopColor="#EF5724" />
        </SvgLinearGradient>
        <Filter
          id="filter0_i"
          x="18.9175"
          y="44.3729"
          width="116.985"
          height="75.1119"
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
          <FeBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </Filter>
      </Defs>
      <Rect width="157.563" height="149" rx="41" fill="url(#logoGradient)" />
      <G filter="url(#filter0_i)">
        <Path
          d="M20.6391 53.9214C17.027 50.4499 19.4771 44.3586 24.4797 44.3729L56.3427 44.4643C59.6493 44.4737 62.3324 47.1571 62.3419 50.464L62.3793 63.461C62.3893 66.9373 59.4259 69.6711 55.9612 69.3819L54.5786 69.2666C41.848 68.2041 29.8609 62.7843 20.6391 53.9214Z"
          fill="white"
        />
        <Path
          d="M68.1887 48.6777C68.1887 46.4686 69.9796 44.6777 72.1887 44.6777H129.857H131.903C134.112 44.6777 135.903 46.4686 135.903 48.6777V51.4758C135.903 53.1453 134.55 54.4987 132.88 54.4987C131.21 54.4987 129.857 55.8521 129.857 57.5217V66.3214C129.857 68.5306 128.066 70.3214 125.857 70.3214H72.1887C69.9796 70.3214 68.1887 68.5306 68.1887 66.3214V48.6777Z"
          fill="white"
        />
        <Path
          d="M68.2608 65.3458L98.6714 70.3215L96.8265 70.6381C96.5713 70.6819 96.3245 70.7655 96.0952 70.8859C94.7394 71.5979 93.8903 73.0029 93.8903 74.5343V78.7418V89.1633C93.8903 91.2086 95.3742 92.9518 97.3933 93.2783L103.866 93.8809C106.437 94.1202 108.403 96.2775 108.403 98.8593V110.485C108.403 113.246 106.164 115.485 103.403 115.485H102.898H94.8017C94.2346 115.485 93.7076 115.193 93.4067 114.713C87.2608 104.896 73.1675 104.329 66.2531 113.62L65.3038 114.896C65.0279 115.267 64.593 115.485 64.1309 115.485H54.2035C51.4421 115.485 49.2035 113.246 49.2035 110.485V96.286C49.2035 95.1909 50.0912 94.3032 51.1863 94.3032H59.1212C61.9361 94.3032 64.573 92.9259 66.1812 90.6155C67.1411 89.2365 67.6761 87.6066 67.7202 85.927L68.2608 65.3458Z"
          fill="white"
        />
      </G>
    </Svg>
  </View>
);

// Arrow Icon Component
const ArrowIcon = () => (
  <Svg width="12" height="17" viewBox="0 0 12 17" fill="none">
    <Path
      d="M3.87283 0.585786C3.09178 -0.195262 1.82545 -0.195262 1.0444 0.585786C0.263356 1.36683 0.263356 2.63316 1.0444 3.41421L3.87283 0.585786ZM2.45862 2L1.0444 3.41421L9.1274 11.4972L10.5416 10.083L11.9558 8.66878L3.87283 0.585786L2.45862 2Z"
      fill="#FFFFFF"
    />
    <Path
      d="M0.936805 13.2821C0.103869 14.0076 0.0167428 15.2709 0.742203 16.1038C1.46766 16.9368 2.73099 17.0239 3.56393 16.2984L0.936805 13.2821ZM2.25037 14.7903L3.56393 16.2984L11.7459 9.17222L10.4323 7.66405L9.11877 6.15589L0.936805 13.2821L2.25037 14.7903Z"
      fill="#FFFFFF"
    />
  </Svg>
);
// Main sign Up Screen Component
const router = useRouter();
export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <AppLogo />

        {/* Email Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Your email address</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="example@email.com"
              placeholderTextColor="#AFB0B4"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Choose a password</Text>
          <View style={styles.inputContainer}>
            <TextInput
          style={styles.textInput}
  value={password}
  onChangeText={setPassword}
  placeholder="min 8 characters"
  placeholderTextColor="#AFB0B4"
  secureTextEntry={true}
            />
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity onPress={() => router.push('/home')}
        style={styles.continueButtonContainer}>
          <View style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
            <View style={styles.arrowIcon}>
              <ArrowIcon />
            </View>
          </View>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google Sign Up */}
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={{
              uri: "https://api.builder.io/api/v1/image/assets/TEMP/2fa618db6788a9c2ac11cc8caaa412daea21d7dd?width=74",
            }}
            style={styles.googleIcon}
          />
          <Text style={styles.socialButtonText}>Sign up with google</Text>
        </TouchableOpacity>

        {/* Apple Sign Up */}
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={{
              uri: "https://api.builder.io/api/v1/image/assets/TEMP/d4c48690176ea0546d373e9631ccf42dcefa8552?width=62",
            }}
            style={styles.appleIcon}
          />
          <Text style={styles.socialButtonText}>Sign up with apple</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 37,
    paddingTop: 46,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 78,
  },
  inputSection: {
    marginBottom: 56,
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginBottom: 14,
    fontFamily: "Istok Web, -apple-system, Roboto, Helvetica, sans-serif",
  },
  inputContainer: {
    width: 367,
    height: 69,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    backgroundColor: "#FFF",
    justifyContent: "center",
    paddingHorizontal: 32,
    alignSelf: "center",
  },
  textInput: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    fontFamily: "Istok Web, -apple-system, Roboto, Helvetica, sans-serif",
  },
  continueButtonContainer: {
    alignItems: "center",
    marginBottom: 28,
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
  continueButtonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "Istok Web, -apple-system, Roboto, Helvetica, sans-serif",
  },
  arrowIcon: {
    marginLeft: 8,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 41,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#EBEBEB",
  },
  orText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#82838B",
    marginHorizontal: 16,
    fontFamily: "Istok Web, -apple-system, Roboto, Helvetica, sans-serif",
  },
  socialButton: {
    width: 367,
    height: 69,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 45,
    alignSelf: "center",
    position: "relative",
  },
  socialButtonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    fontFamily: "Istok Web, -apple-system, Roboto, Helvetica, sans-serif",
  },
  googleIcon: {
    width: 37,
    height: 37,
    position: "absolute",
    left: 45,
  },
  appleIcon: {
    width: 31,
    height: 38,
    position: "absolute",
    left: 48,
  },
});
