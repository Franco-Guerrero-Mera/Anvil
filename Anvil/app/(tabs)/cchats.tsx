import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar 
} from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';
import { useEffect, useState } from 'react';
import { useRouter } from "expo-router";

// Back Arrow Icon Component
const BackArrowIcon = () => (
  <Svg width="18" height="16" viewBox="0 0 18 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 8C18 8.41421 17.6642 8.75 17.25 8.75H2.56031L8.03063 14.2194C8.32368 14.5124 8.32368 14.9876 8.03063 15.2806C7.73757 15.5737 7.26243 15.5737 6.96937 15.2806L0.219375 8.53063C0.0785421 8.38995 -0.000590086 8.19906 -0.000590086 8C-0.000590086 7.80094 0.0785421 7.61005 0.219375 7.46937L6.96937 0.719375C7.26243 0.426319 7.73757 0.426319 8.03063 0.719375C8.32368 1.01243 8.32368 1.48757 8.03063 1.78062L2.56031 7.25H17.25C17.6642 7.25 18 7.58579 18 8V8Z"
      fill="#212121"
    />
  </Svg>
);

// Basketball Icon Component
const BasketballIcon = () => (
  <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <Path
      d="M0 19.7094C0.184028 17.8323 0.570486 16.0568 1.15938 14.3829C1.74826 12.709 2.55799 11.1352 3.58854 9.66146C4.87674 10.9865 5.95367 12.5235 6.81933 14.2725C7.685 16.0215 8.24592 17.8338 8.50208 19.7094H0ZM35.4438 19.7094C35.7014 17.8323 36.2535 16.0288 37.1 14.299C37.9465 12.5691 39.0323 11.0417 40.3573 9.71667C41.3878 11.1521 42.1976 12.7163 42.7865 14.4094C43.3753 16.1024 43.7618 17.8691 43.9458 19.7094H35.4438ZM3.58854 34.2292C2.55799 32.7937 1.74826 31.2383 1.15938 29.563C0.570486 27.8876 0.184028 26.1121 0 24.2365H8.50208C8.24444 26.1135 7.68279 27.917 6.81713 29.6469C5.95146 31.3767 4.876 32.9042 3.59075 34.2292M40.3595 34.2292C39.0345 32.9042 37.9487 31.3767 37.1022 29.6469C36.2557 27.917 35.7036 26.1135 35.446 24.2365H43.948C43.764 26.0767 43.3776 27.8434 42.7887 29.5365C42.1998 31.2295 41.3901 32.7937 40.3595 34.2292ZM12.9762 19.7094C12.6817 17.0594 11.964 14.6118 10.823 12.3667C9.68207 10.1215 8.19071 8.09722 6.34896 6.29375C8.11563 4.52708 10.1311 3.11007 12.3954 2.04271C14.6597 0.975347 17.0977 0.294444 19.7094 0V19.7094H12.9762ZM24.2387 19.7094V0C26.8519 0.294444 29.2906 0.975347 31.5549 2.04271C33.8192 3.11007 35.8332 4.52708 37.5969 6.29375C35.7198 8.06042 34.2203 10.0759 33.0985 12.3402C31.9767 14.6044 31.2678 17.0608 30.9719 19.7094H24.2387ZM19.7116 43.9458C17.0616 43.6514 14.614 42.9617 12.3689 41.8766C10.1237 40.7916 8.11783 39.365 6.35117 37.5969C8.22825 35.8302 9.72845 33.8243 10.8518 31.5792C11.9751 29.334 12.6832 26.8865 12.9762 24.2365H19.7116V43.9458ZM24.2387 43.9458V24.2365H30.9741C31.2685 26.8865 31.9774 29.3436 33.1007 31.6079C34.224 33.8722 35.7235 35.8869 37.5991 37.6521C35.8324 39.4188 33.8169 40.8358 31.5527 41.9031C29.2884 42.9705 26.8504 43.6514 24.2387 43.9458Z"
      fill="#EF7850"
    />
  </Svg>
);

// Person Icon Component
const PersonIcon = () => (
  <Svg width="29" height="29" viewBox="0 0 29 29" fill="none">
    <Path
      d="M14.5 16.3125C21.4781 16.3125 27.1875 20.8438 27.1875 24.4688C27.1875 25.1898 26.9011 25.8813 26.3912 26.3912C25.8813 26.9011 25.1898 27.1875 24.4688 27.1875H4.53125C3.81019 27.1875 3.11867 26.9011 2.6088 26.3912C2.09894 25.8813 1.8125 25.1898 1.8125 24.4688C1.8125 20.8438 7.52188 16.3125 14.5 16.3125ZM14.5 1.8125C16.1825 1.8125 17.796 2.48086 18.9857 3.67054C20.1754 4.86023 20.8438 6.47378 20.8438 8.15625C20.8438 9.83872 20.1754 11.4523 18.9857 12.642C17.796 13.8316 16.1825 14.5 14.5 14.5C12.8175 14.5 11.204 13.8316 10.0143 12.642C8.82461 11.4523 8.15625 9.83872 8.15625 8.15625C8.15625 6.47378 8.82461 4.86023 10.0143 3.67054C11.204 2.48086 12.8175 1.8125 14.5 1.8125Z"
      fill="#212121"
    />
  </Svg>
);

// Send Icon Component
const SendIcon = () => (
  <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <Path
      d="M29.0672 11.5969L6.87763 0.498277C6.00192 0.0622759 5.01309 -0.0929437 4.04597 0.0537816C3.07885 0.200507 2.18049 0.642036 1.47339 1.31817C0.766294 1.99431 0.284857 2.87214 0.0947237 3.83199C-0.0954097 4.79185 0.0150132 5.787 0.410937 6.68178L4.21487 15.196C4.30118 15.4018 4.34564 15.6228 4.34564 15.846C4.34564 16.0693 4.30118 16.2903 4.21487 16.4961L0.410937 25.0103C0.0887125 25.7344 -0.0475071 26.5276 0.0146577 27.3178C0.0768226 28.108 0.335401 28.8701 0.766893 29.5349C1.19839 30.1997 1.78911 30.7461 2.48539 31.1244C3.18166 31.5027 3.96141 31.701 4.75376 31.7012C5.4959 31.6938 6.22698 31.5204 6.89348 31.1938L29.0831 20.0952C29.8702 19.6991 30.5318 19.0921 30.9941 18.3418C31.4564 17.5915 31.7012 16.7274 31.7012 15.846C31.7012 14.9647 31.4564 14.1006 30.9941 13.3503C30.5318 12.6 29.8702 11.993 29.0831 11.5969H29.0672ZM27.6566 17.2572L5.467 28.3557C5.17562 28.4957 4.84844 28.5432 4.52931 28.4919C4.21018 28.4405 3.91437 28.2928 3.68155 28.0685C3.44872 27.8443 3.29001 27.5541 3.22669 27.2371C3.16337 26.92 3.19847 26.5911 3.32729 26.2946L7.11537 17.7804C7.16441 17.6667 7.20675 17.5502 7.24217 17.4316H18.1626C18.583 17.4316 18.9861 17.2645 19.2834 16.9672C19.5806 16.6698 19.7476 16.2665 19.7476 15.846C19.7476 15.4255 19.5806 15.0223 19.2834 14.7249C18.9861 14.4276 18.583 14.2605 18.1626 14.2605H7.24217C7.20675 14.1419 7.16441 14.0254 7.11537 13.9117L3.32729 5.39751C3.19847 5.10096 3.16337 4.77211 3.22669 4.45503C3.29001 4.13796 3.44872 3.84784 3.68155 3.62356C3.91437 3.39928 4.21018 3.25157 4.52931 3.20023C4.84844 3.1489 5.17562 3.19639 5.467 3.33635L27.6566 14.4349C27.9162 14.568 28.1341 14.7701 28.2863 15.0191C28.4384 15.2681 28.5189 15.5542 28.5189 15.846C28.5189 16.1379 28.4384 16.424 28.2863 16.673C28.1341 16.922 27.9162 17.1241 27.6566 17.2572Z"
      fill="white"
    />
  </Svg>
);

// Avatar Component
const Avatar = () => (
  <View style={styles.avatar}>
    <Svg width="55" height="55" viewBox="0 0 55 55" fill="none">
      <Circle cx="27.5" cy="27.5" r="27.5" fill="#D9D9D9" />
    </Svg>
    <View style={styles.avatarIcon}>
      <PersonIcon />
    </View>
  </View>
);

// Message Item Component
type MessageItemProps = {
  username: string;
  message: string;
  time: string;
  isCurrentUser?: boolean;
  onReportPress?: () => void; // new
};

const MessageItem = ({ username, message, time, isCurrentUser = false, onReportPress }: MessageItemProps) => {
  if (isCurrentUser) {
    return (
      <View style={styles.userMessageContainer}>
        <View style={styles.userMessageContent}>
          <View style={styles.userMessageHeader}>
            <Text style={styles.userTimestamp}>{time}</Text>
            <Text style={styles.userUsername}>{username}</Text>
          </View>
          <Text style={styles.userMessageText}>{message}</Text>
        </View>
        <View style={styles.userAvatar}>
          <Avatar />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.messageContainer}>
      <Avatar />
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.timestamp}>{time}</Text>
        </View>
        <Text style={styles.messageText}>{message}</Text>

        {/* REPORT BUTTON: shown under non-current messages */}
        <View style={styles.messageFooter}>
          <TouchableOpacity
            onPress={onReportPress}
            style={styles.reportButton}
          >
            <Text style={styles.reportButtonText}>Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const CommunityChats = () => {
  const [input, setInput] = useState('');
  
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const chatPool = [
    {
      username: 'HoopsFan91',
      message: 'Yo, that 3-pointer at the buzzer? Unreal. 😳',
    },
    {
      username: 'DunkMaster',
      message: 'Lakers defense looking sus this season ngl.',
    },
    {
      username: 'SkyHook12',
      message: 'Anyone catching the Knicks game tonight?',
    },
    {
      username: 'FastBreak77',
      message: 'wemby is the future 🔥🔥🔥',
    },
    {
      username: 'BallKing23',
      message: 'Did you all see that crazy dunk last night?! 🔥',
    },
     {
      username: 'MambaMentality824',
      message: 'Lakers da best! 🏆',
    },
    {
  username: 'TripleDoubleTony',
  message: 'Jokic makes it look so easy. MVP again?'
},
{
  username: 'BucketsOnly',
  message: 'Bro dropped 40 and still lost... pain. 😩'
},
{
  username: 'CurryFor3',
  message: 'Steph pulled up from half court again 💀'
},
{
  username: 'DefenseWinsGames',
  message: 'Where was the defense in the 4th?!'
},
{
  username: 'FastBreak77',
  message: 'Refs were wildin last night fr.'
},
{
  username: 'BlitzBoy',
  message: 'They ran the same play 3x and we still fell for it 😐'
},
{
  username: 'QBWhisperer',
  message: 'Rookie QB looking nice with those deep throws 👀'
},
{
  username: 'SundaySnacks',
  message: 'Game was mid but those stadium nachos hit 🧀🌮'
},
{
  username: 'NutmegNando',
  message: 'That backheel assist?? Filthy.'
},
{
  username: 'OffsideAndy',
  message: 'Bro was CLEARLY onside what are these refs doing?????'
},
{
  username: 'StadiumUltra',
  message: 'Chants were electric tonight, I got chills 😮‍💨'
},
{
  username: 'BatFlipBilly',
  message: 'Y’all see that walkoff homer? 🔥'
},
{
  username: 'HockeyHypeMan',
  message: 'Fights in the 1st period?? Let’s gooo 🥊'
},
{
  username: 'GroupChatGM',
  message: 'Trade deadline about to get messy 👀'
},
{
  username: 'BleacherTroll',
  message: 'Hot take: LeBron > Jordan and it’s not close.'
},
{
  username: 'OvertimeOllie',
  message: 'Every time I say “just one more quarter” I’m up ‘til 2AM 😩'
},
{
  username: 'StatsGuy44',
  message: 'Bro had 12 rebounds, 8 assists, and 5 steals. Monster stat line.'
},
{
  username: 'InjuryReport',
  message: 'Hope Ja’s injury not serious… hate seeing stars go down 🙏'
},
{
  username: 'UppercutUzi',
  message: 'Bro got hit with that left hook and folded 😮‍💨'
},
{
  username: 'RingsideRay',
  message: 'This fight had more hugging than punches lol'
},
{
  username: 'KOKing',
  message: 'That knockout was CLEAN. Man hit the canvas like timber 😵'
},
{
  username: 'ScorecardSteve',
  message: 'Nah those judges were wildin fr. That wasn’t even close.'
},
{
  username: 'FootworkFrank',
  message: 'His movement was elite tonight. Couldn’t touch him.'
},
{
  username: 'BodyShotBruno',
  message: 'You hear that body shot?? Sounded like a gunshot 💥'
},
{
  username: 'JabJunkie',
  message: 'He controlled the whole fight with just the jab. Masterclass.'
},
{
  username: 'UnderdogDave',
  message: 'Wasn’t expecting the upset!! Fight of the year maybe?'
},
{
  username: 'CutmanCarl',
  message: 'That cut over his eye was NASTY 😬 how’d he keep going?'
},
{
  username: 'FightNightFan',
  message: 'Main event starting late again 😩 I’m tryna sleep!'
},
{
  username: 'TrashTalkTim',
  message: 'All that talk in the presser and then got pieced up 💀'
},

  ];

  const firstMessage = chatPool[Math.floor(Math.random() * chatPool.length)];

  const [messages, setMessages] = useState([
    {
      id: 1,
      username: firstMessage.username,
      message: firstMessage.message,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isCurrentUser: false,
    },
  ]);

  const scrollRef = React.useRef<ScrollView>(null);

  useEffect(() => {
    let messageIndex = 1;

    const interval = setInterval(() => {
      const next = chatPool[Math.floor(Math.random() * chatPool.length)];
      const newMsg = {
        id: messages.length + messageIndex,
        username: next.username,
        message: next.message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: false,
      };

      setMessages(prev => [...prev, newMsg]);
      messageIndex++;
    }, 4000);

    return () => clearInterval(interval); // cleanup
  }, [messages.length]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + Date.now(),
      username: 'Funky_Franky',
      message: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
  };

  const [showRulesModal, setShowRulesModal] = useState(true);
const [canCloseModal, setCanCloseModal] = useState(false);

const rules = [
  "Be respectful to everyone.",
  "Report harmful messages.",
  "If someone is in crisis, encourage professional help.",
];
const [countdown, setCountdown] = useState(5);


useEffect(() => {
  let timer: ReturnType<typeof setTimeout>;

  if (countdown > 0) {
    timer = setTimeout(() => setCountdown(countdown - 1), 1000);
  } else {
    setCanCloseModal(true);
  }

  return () => clearTimeout(timer);
}, [countdown]);


const router = useRouter();

  // --- ReportModal (placed inside CommunityChats)
  const ReportModal = () => {
    const reasons = ['Spam', 'Harassment', 'Hate speech', 'Threat', 'Other'];

    const submitReport = () => {
      // UI-only: hook to API here later.
      console.log('REPORT:', { selectedMessage, reportReason });

      // Close modal -> show thank you -> clear
      setReportModalVisible(false);
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 1800);

      // reset
      setReportReason('');
      setSelectedMessage(null);
    };

    if (!reportModalVisible) return null;

    return (
      <View style={modalStyles.overlay}>
        <View style={modalStyles.modal}>
          <Text style={modalStyles.title}>Report Message</Text>

          {/* preview the message being reported */}
          <Text style={{ fontSize: 14, marginBottom: 12, textAlign: 'center' }}>
            Reporting from <Text style={{ fontWeight: '700' }}>{selectedMessage?.username}</Text>
          </Text>
          <Text style={{ fontSize: 13, marginBottom: 12, color: '#444', textAlign: 'center' }}>
            "{selectedMessage?.message?.slice(0, 120)}{selectedMessage?.message?.length > 120 ? '...' : ''}"
          </Text>

          {/* reasons */}
          {reasons.map((r) => (
            <TouchableOpacity
              key={r}
              style={[
                modalStyles.reasonButton,
                reportReason === r ? modalStyles.selectedReason : null,
              ]}
              onPress={() => setReportReason(r)}
            >
              <Text style={modalStyles.reasonButtonText}>{r}</Text>
            </TouchableOpacity>
          ))}

          {/* custom reason input */}
          <TextInput
            placeholder="Write a custom reason (optional)"
            value={reasons.includes(reportReason) ? '' : reportReason}
            onChangeText={(txt) => setReportReason(txt)}
            style={modalStyles.textArea}
            multiline
          />

          <View style={{ flexDirection: 'row', marginTop: 14 }}>
            <TouchableOpacity
              style={[modalStyles.button, { backgroundColor: '#ccc', marginRight: 10 }]}
              onPress={() => setReportModalVisible(false)}
            >
              <Text style={modalStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                modalStyles.button,
                { backgroundColor: reportReason ? '#EF7850' : '#ccc' },
              ]}
              disabled={!reportReason}
              onPress={submitReport}
            >
              <Text style={modalStyles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

{showRulesModal && (
  <View style={modalStyles.overlay}>
    <View style={modalStyles.modal}>
      <Text style={modalStyles.title}>Chatroom Rules</Text>
      {rules.map((rule, index) => (
        <Text key={index} style={modalStyles.text}>
          {index + 1}. {rule}
        </Text>
      ))}
      
     <TouchableOpacity
  style={[
    modalStyles.button,
    { backgroundColor: canCloseModal ? '#EF7850' : '#ccc' },
  ]}
  disabled={!canCloseModal}
  onPress={() => setShowRulesModal(false)}
>
  <Text style={modalStyles.buttonText}>
    {canCloseModal ? 'I Agree' : `Wait ${countdown}s`}
  </Text>
</TouchableOpacity>
    </View>
  </View>
)}

      
      <StatusBar barStyle="dark-content" backgroundColor="#ff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/community")}>
          <BackArrowIcon />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <BasketballIcon />
          <Text style={styles.headerTitle}>Sports</Text>
          
        </View>
      </View>
      <View style={styles.subtext}>

        <Text style={styles.subtext}>These are simulated messages (these people aren't real)</Text>
      </View>

      {/* Divider */}
      <View style={styles.headerDivider} />
      {/* Messages List */}
      <ScrollView
        ref={scrollRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            username={message.username}
            message={message.message}
            time={message.time}
            isCurrentUser={message.isCurrentUser}
            onReportPress={() => {
              setSelectedMessage(message);
              setReportModalVisible(true);
            }}
          />
        ))}
      </ScrollView>
      

      {/* Bottom Divider */}
      <View style={styles.bottomDivider} />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Message ..."
            placeholderTextColor="#595755"
            value={input}
            onChangeText={setInput}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <SendIcon />
        </TouchableOpacity>
      </View>

      {/* Report modal (UI-only) */}
      <ReportModal />

      {/* Thank you overlay */}
      {showThankYou && (
        <View style={modalStyles.overlay}>
          <View style={modalStyles.thankYouBox}>
            <Text style={{ fontSize: 18, fontWeight: '700' }}>Thanks for reporting</Text>
            <Text style={{ fontSize: 14, marginTop: 8, textAlign: 'center', color: '#555' }}>
              We will review this message.
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const modalStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 6,
    textAlign: 'left',
    alignSelf: 'stretch',
    fontWeight: '700',
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  reasonButton: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  reasonButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  selectedReason: {
    borderColor: '#EF7850',
    backgroundColor: '#FFF2EE',
  },
  textArea: {
    alignSelf: 'stretch',
    minHeight: 60,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    padding: 10,
    borderRadius: 12,
    marginTop: 8,
    fontSize: 14,
    color: '#222',
  },
  thankYouBox: {
    width: '75%',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
});

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 9,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 31,
    borderTopRightRadius: 31,
  },
  subtext: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    paddingBottom: 2,
    fontWeight: '300',
    color: '#838383ff',
    backgroundColor: '#FFF',
  },
  backButton: {
    marginRight: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginRight: 40, // To center with back button
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: '700',
    color: '#212121',
    marginLeft: 8,
    fontFamily: 'System', // Will fallback to system font
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 6,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 16,
  },
  // User message styles
  userMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 16,
    justifyContent: 'flex-end',
  },
  userMessageContent: {
    flex: 1,
    marginTop: 4,
    alignItems: 'flex-end',
    marginRight: 12,
  },
  userMessageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userUsername: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    fontFamily: 'System',
  },
  userTimestamp: {
    fontSize: 11,
    fontWeight: '700',
    color: '#676767',
    fontFamily: 'System',
    marginRight: 12,
  },
  userMessageText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#212121',
    fontFamily: 'System',
    textAlign: 'right',
  },
  userAvatar: {
    position: 'relative',
  },
  // Regular message styles
  currentUserMessage: {
    flexDirection: 'row-reverse',
    paddingLeft: 40,
  },
  avatar: {
    position: 'relative',
    marginRight: 12,
  },
  currentUserAvatar: {
    position: 'relative',
    marginLeft: 12,
    marginRight: 0,
  },
  avatarIcon: {
    position: 'absolute',
    top: 13,
    left: 13,
  },
  messageContent: {
    flex: 1,
    marginTop: 4,
  },
  currentUserMessageContent: {
    alignItems: 'flex-end',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  currentUserMessageHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginRight: 12,
    fontFamily: 'System',
  },
  timestamp: {
    fontSize: 11,
    fontWeight: '700',
    color: '#676767',
    fontFamily: 'System',
    marginRight: 12,
  },
  messageText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#212121',
    fontFamily: 'System',
  },
  currentUserMessageText: {
    textAlign: 'right',
  },
  bottomDivider: {
    height: 1,
    backgroundColor: '#D5CFCF',
    marginHorizontal: 9,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 18,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 31,
    borderBottomRightRadius: 31,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#FFEBE5',
    borderRadius: 200,
    paddingHorizontal: 26,
    paddingVertical: 12,
    marginRight: 12,
  },
  textInput: {
    fontSize: 17,
    fontWeight: '500',
    color: '#212121',
    fontFamily: 'System',
  },
  sendButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EF7850',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // new footer/report styles
  messageFooter: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EF7850',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  reportButtonText: {
    color: '#EF7850',
    fontWeight: '700',
  },
});

export default CommunityChats;
