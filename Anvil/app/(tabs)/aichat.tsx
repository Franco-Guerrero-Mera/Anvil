import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  Linking,
} from "react-native";
import Svg, {
  Path,
} from "react-native-svg";

const { height, width } = Dimensions.get("window");

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

type CrisisInfo = {
  title: string;
  message: string;
  phone?: string;
  link?: string;
  keywords: string[];
};

/** --- Crisis keyword map (edit/expand as needed) --- */
const crisisKeywords: Record<string, CrisisInfo> = {
  suicide: {
    keywords: ["kill myself", "want to die", "suicide", "end my life", "hopeless", "i'm done"],
    title: "There is Help",
    message:
      "If you're in emotional pain or thinking about suicide, help is available now. You can call or text 988 (Suicide & Crisis Lifeline).",
    phone: "988",
    link: "https://988lifeline.org",
  },
  abuse: {
    keywords: ["hit me", "abused", "unsafe at home", "hurts me", "domestic violence", "hits me"],
    title: "There is Help",
    message:
      "If you're in an unsafe situation or experiencing abuse, confidential help is available. Call 1-800-799-7233 or visit the website.",
    phone: "1-800-799-7233",
    link: "https://www.thehotline.org",
  },
  addiction: {
    keywords: ["addicted", "addiction", "need rehab", "drinking too much", "drug problem", "I can't stop drinking"],
    title: "There is Help",
    message:
      "If you're struggling with substance use, you can call 1-800-662-HELP (4357) for confidential support and referrals.",
    phone: "1-800-662-HELP",
    link: "https://www.samhsa.gov/find-help/national-helpline",
  },
};

export default function ChatScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey, how can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Crisis modal state
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [crisisInfo, setCrisisInfo] = useState<CrisisInfo | null>(null);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Detect crisis by checking keywords (simple, deterministic)
  const detectCrisis = (text: string): CrisisInfo | null => {
    const lower = text.toLowerCase();
    for (const key of Object.keys(crisisKeywords)) {
      const info = crisisKeywords[key];
      if (info.keywords.some((kw) => lower.includes(kw))) {
        return info;
      }
    }
    return null;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    // Add to UI immediately
    setMessages((prev) => [...prev, userMessage]);

    // Clear input and set loading as before
    setInput("");
    setLoading(true);

    // --- Crisis detection triggered immediately (still send to backend) ---
    const crisis = detectCrisis(userMessage.text);
    if (crisis) {
      setCrisisInfo(crisis);
      setShowCrisisModal(true);
    }

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: Date.now().toString() + "-bot",
        text: data.response || "Sorry, there was an error.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-error",
          text: "There was an error contacting the server.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderUserIcon = () => (
    <View style={styles.userIconContainer}>
      <Svg width={36} height={36} viewBox="0 0 36 36">
        <Path
          d="M18 20.25C26.6625 20.25 33.75 25.875 33.75 30.375C33.75 31.2701 33.3944 32.1286 32.7615 32.7615C32.1286 33.3944 31.2701 33.75 30.375 33.75H5.625C4.72989 33.75 3.87145 33.3944 3.23851 32.7615C2.60558 32.1286 2.25 31.2701 2.25 30.375C2.25 25.875 9.3375 20.25 18 20.25ZM18 2.25C20.0886 2.25 22.0916 3.07969 23.5685 4.55653C25.0453 6.03338 25.875 8.03642 25.875 10.125C25.875 12.2136 25.0453 14.2166 23.5685 15.6935C22.0916 17.1703 20.0886 18 18 18C15.9114 18 13.9084 17.1703 12.4315 15.6935C10.9547 14.2166 10.125 12.2136 10.125 10.125C10.125 8.03642 10.9547 6.03338 12.4315 4.55653C13.9084 3.07969 15.9114 2.25 18 2.25Z"
          fill="black"
        />
      </Svg>
    </View>
  );

  const renderSendIcon = () => (
    <Svg width={32} height={32} viewBox="0 0 32 32">
      <Path
        d="M29.0672 11.5969L6.87763 0.498277C6.00192 0.0622759 5.01309 -0.0929437 4.04597 0.0537816C3.07885 0.200507 2.18049 0.642036 1.47339 1.31817C0.766294 1.99431 0.284857 2.87214 0.0947237 3.83199C-0.0954097 4.79185 0.0150132 5.787 0.410937 6.68178L4.21487 15.196C4.30118 15.4018 4.34564 15.6228 4.34564 15.846C4.34564 16.0693 4.30118 16.2903 4.21487 16.4961L0.410937 25.0103C0.0887125 25.7344 -0.0475071 26.5276 0.0146577 27.3178C0.0768226 28.108 0.335401 28.8701 0.766893 29.5349C1.19839 30.1997 1.78911 30.7461 2.48539 31.1244C3.18166 31.5027 3.96141 31.701 4.75376 31.7012C5.4959 31.6938 6.22698 31.5204 6.89348 31.1938L29.0831 20.0952C29.8702 19.6991 30.5318 19.0921 30.9941 18.3418C31.4564 17.5915 31.7012 16.7274 31.7012 15.846C31.7012 14.9647 31.4564 14.1006 30.9941 13.3503C30.5318 12.6 29.8702 11.993 29.0831 11.5969H29.0672ZM27.6566 17.2572L5.467 28.3557C5.17562 28.4957 4.84844 28.5432 4.52931 28.4919C4.21018 28.4405 3.91438 28.2928 3.68155 28.0685C3.44872 27.8443 3.29001 27.5541 3.22669 27.2371C3.16337 26.92 3.19847 26.5911 3.32729 26.2946L7.11537 17.7804C7.16441 17.6667 7.20675 17.5502 7.24217 17.4316H18.1626C18.583 17.4316 18.9861 17.2645 19.2834 16.9672C19.5806 16.6698 19.7476 16.2665 19.7476 15.846C19.7476 15.4255 19.5806 15.0223 19.2834 14.7249C18.9861 14.4276 18.583 14.2605 18.1626 14.2605H7.24217C7.20675 14.1419 7.16441 14.0254 7.11537 13.9117L3.32729 5.39751C3.19847 5.10096 3.16337 4.77211 3.22669 4.45503C3.29001 4.13796 3.44872 3.84784 3.68155 3.62356C3.91438 3.39928 4.21018 3.25157 4.52931 3.20023C4.84844 3.1489 5.17562 3.19639 5.467 3.33635L27.6566 14.4349C27.9162 14.568 28.1341 14.7701 28.2863 15.0191C28.4384 15.2681 28.5189 15.5542 28.5189 15.846C28.5189 16.1379 28.4384 16.424 28.2863 16.673C28.1341 16.922 27.9162 17.1241 27.6566 17.2572Z"
        fill="white"
      />
    </Svg>
  );

  return (
    <View style={styles.container}>
      {/* --- Crisis modal --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showCrisisModal}
        onRequestClose={() => setShowCrisisModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{crisisInfo?.title}</Text>
            <Text style={styles.modalMessage}>{crisisInfo?.message}</Text>

            {crisisInfo?.phone ? (
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  // open phone dialer
                  const tel = `tel:${crisisInfo.phone}`;
                  Linking.canOpenURL(tel).then((supported) => {
                    if (supported) Linking.openURL(tel);
                    else if (crisisInfo.link) Linking.openURL(crisisInfo.link);
                  });
                }}
              >
                <Text style={styles.modalButtonText}>
                  Call {crisisInfo.phone}
                </Text>
              </TouchableOpacity>
            ) : null}

            {crisisInfo?.link ? (
              <TouchableOpacity
                style={[styles.modalButton, { marginTop: 10 }]}
                onPress={() => {
                  Linking.openURL(crisisInfo.link!);
                }}
              >
                <Text style={styles.modalButtonText}>Open Resource</Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={[styles.modalButton, styles.closeButton]}
              onPress={() => setShowCrisisModal(false)}
            >
              <Text style={[styles.modalButtonText, { color: "#EF7850" }]}>
                I'm okay — close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.background}>
        <View style={styles.chatContainer}>
          {/* Header */}
          <Text style={styles.headerTitle}>Bobert Companion</Text>
          <Text style={styles.subtitle}>
            Try asking Bobert, "I want to practice a scenario!"
          </Text>
          <View style={styles.headerDivider} />

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <View key={message.id}>
                {message.sender === "bot" ? (
                  <View style={styles.botMessageContainer}>
                    <Image
                      source={{
                        uri: "https://api.builder.io/api/v1/image/assets/TEMP/b7833fdb0389daf1eda35f8110449a3f91510888?width=112",
                      }}
                      style={styles.botAvatar}
                    />
                    <View style={styles.botMessageContent}>
                      <Text style={styles.botName}>Bobert</Text>
                      <Text style={styles.botMessage}>{message.text}</Text>
                      <Text style={styles.timestamp}>
                        {formatTime(message.timestamp)}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.userMessageContainer}>
                    <View style={styles.userMessageContent}>
                      <Text style={styles.userName}>Funky_Franky</Text>
                      <Text style={styles.userMessage}>{message.text}</Text>
                      <Text style={styles.timestamp}>
                        {formatTime(message.timestamp)}
                      </Text>
                    </View>
                    <View style={styles.userAvatarContainer}>
                      <View style={styles.userAvatar}>{renderUserIcon()}</View>
                    </View>
                  </View>
                )}
              </View>
            ))}

            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#FF960E" />
              </View>
            )}
          </ScrollView>

          {/* Bottom divider */}
          <View style={styles.bottomDivider} />

          {/* Input area */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.inputArea}
          >
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={input}
                onChangeText={setInput}
                placeholder="Message ..."
                placeholderTextColor="#C3AAAA"
                returnKeyType="send"
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <View style={styles.sendButtonGradient}>{renderSendIcon()}</View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* --- original styles kept --- */
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 60,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 25,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 20,
    marginTop: -2,
    marginBottom: -50, // Adjust based on how far you want it to go under
    paddingBottom: 60,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#212121",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 7,
    fontFamily: "Istok Web, -apple-system, Roboto, Helvetica, sans-serif",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "#595755",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 7,
    fontFamily: "Istok Web, -apple-system, Roboto, Helvetica, sans-serif",
  },
  headerDivider: {
    height: 1,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 0,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messagesContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  botMessageContainer: {
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "flex-start",
  },
  botAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 15,
  },
  botMessageContent: {
    flex: 1,
  },
  botName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 5,
    fontFamily: "Istok Web, -apple-system, Roboto, Helvetica, sans-serif",
  },
  botMessage: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4596EC",
    marginBottom: 5,
    fontFamily: "Istok Web, -apple-system, Roboto, Helvetica, sans-serif",
  },
  userMessageContainer: {
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  userMessageContent: {
    alignItems: "flex-end",
    flex: 1,
    marginLeft: 15,
    maxWidth: "80%",
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212121",
    paddingRight: 10,
    marginBottom: 5,
    fontFamily: "Istok Web, -apple-system, Roboto, Helvetica, sans-serif",
  },
  userMessage: {
    fontSize: 15,
    fontWeight: "700",
    color: "#EF5724",
    marginBottom: 5,
    textAlign: "right",
    fontFamily: "Istok Web, -apple-system, Roboto, Helvetica, sans-serif",
    paddingRight: 10,
  },
  userAvatarContainer: {
    width: 67,
    height: 67,
    borderRadius: 33.5,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  userAvatar: {
    justifyContent: "center",
    alignItems: "center",
  },
  userIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  timestamp: {
    fontSize: 10,
    fontWeight: "700",
    color: "#ABB0B9",
    fontFamily: "Istok Web, -apple-system, Roboto, Helvetica, sans-serif",
    paddingRight: 10,
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  bottomDivider: {
    height: 1,
    backgroundColor: "#D5CFCF",
    marginHorizontal: 3,
  },
  inputArea: {
    paddingTop: 25,
    paddingHorizontal: 26,
    paddingBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    height: 43,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: "#EF7850",
    backgroundColor: "#FFE5E5",
    paddingHorizontal: 26,
    fontSize: 17,
    fontWeight: "700",
    color: "#212121",
    marginRight: 7,
    fontFamily: "Istok Web, -apple-system, Roboto, Helvetica, sans-serif",
  },
  sendButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonGradient: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#EF7850",
    justifyContent: "center",
    alignItems: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 22,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
    color: "#212121",
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 15,
    fontWeight: "600",
    color: "#595755",
    textAlign: "center",
  },
  modalButton: {
    marginTop: 18,
    width: "100%",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#EF7850",
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
  closeButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#EF7850",
  },
});
