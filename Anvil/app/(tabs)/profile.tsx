import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path } from 'react-native-svg';

// User Profile Icon Component
const UserProfileIcon = () => (
  <Svg width={104} height={104} viewBox="0 0 104 104" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M34.6667 30.3333C34.6667 25.7362 36.4929 21.3274 39.7435 18.0768C42.9941 14.8262 47.4029 13 52 13C56.5971 13 61.0059 14.8262 64.2565 18.0768C67.5072 21.3274 69.3333 25.7362 69.3333 30.3333C69.3333 34.9304 67.5072 39.3392 64.2565 42.5899C61.0059 45.8405 56.5971 47.6667 52 47.6667C47.4029 47.6667 42.9941 45.8405 39.7435 42.5899C36.4929 39.3392 34.6667 34.9304 34.6667 30.3333ZM34.6667 56.3333C28.9203 56.3333 23.4093 58.6161 19.346 62.6794C15.2827 66.7426 13 72.2536 13 78C13 81.4478 14.3696 84.7544 16.8076 87.1924C19.2456 89.6304 22.5522 91 26 91H78C81.4478 91 84.7544 89.6304 87.1924 87.1924C89.6304 84.7544 91 81.4478 91 78C91 72.2536 88.7173 66.7426 84.654 62.6794C80.5907 58.6161 75.0797 56.3333 69.3333 56.3333H34.6667Z"
      fill="#4C4C4C"
    />
  </Svg>
);

// Edit Pencil Icon Component
const EditPencilIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M16.425 6.6998L14.475 8.64147L11.35 5.51647L13.3 3.5748C13.625 3.2498 14.1667 3.2498 14.475 3.5748L16.425 5.5248C16.75 5.83314 16.75 6.3748 16.425 6.6998ZM2.5 14.3748L10.8833 5.98314L14.0083 9.10814L5.625 17.4998H2.5V14.3748ZM13.85 4.1998L12.5667 5.48314L14.5167 7.43314L15.8 6.1498L13.85 4.1998ZM12.8 9.16647L10.8333 7.1998L3.33333 14.7165V16.6665H5.28333L12.8 9.16647Z"
      fill="white"
    />
  </Svg>
);

// Menu Item Component
interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIconContainer}>
      {icon}
    </View>
    <Text style={styles.menuItemText}>{title}</Text>
  </TouchableOpacity>
);

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with background image */}
        <View style={styles.headerContainer}>
          <Image
            source={{
              uri: 'https://api.builder.io/api/v1/image/assets/TEMP/fa7dbf96910fc2e3af6aa3592519f7250dc22261?width=880',
            }}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          
          {/* Back button */}
          <TouchableOpacity style={styles.editbutton0}>
            <Svg width={15} height={15} viewBox="0 0 15 15" fill="none">
              <Path
                d="M13.925 3.36875L11.975 5.31042L8.85 2.18542L10.8 0.24375C11.125 -0.08125 11.6667 -0.08125 11.975 0.24375L13.925 2.19375C14.25 2.50208 14.25 3.04375 13.925 3.36875ZM0 11.0437L8.38333 2.65208L11.5083 5.77708L3.125 14.1687H0V11.0437ZM11.35 0.86875L10.0667 2.15208L12.0167 4.10208L13.3 2.81875L11.35 0.86875ZM10.3 5.83542L8.33333 3.86875L0.833333 11.3854V13.3354H2.78333L10.3 5.83542Z"
                fill="white"
              />
            </Svg>
          </TouchableOpacity>

          {/* Profile picture container */}
          <View style={styles.profileContainer}>
            <View style={styles.profilePictureContainer}>
              <Svg width={142} height={142} viewBox="0 0 142 142" fill="none">
                <Circle cx="71" cy="71" r="71" fill="#D9D9D9" />
              </Svg>
              <View style={styles.profileImageOverlay}>
                <UserProfileIcon />
              </View>
            </View>
            
            {/* Edit button */}
            <TouchableOpacity style={styles.editButton}>
              <EditPencilIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* User information */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>Funky_Franky</Text>
          <Text style={styles.userBio}>
            Hello! My name is Franky. Some of my interests are sports and music. I also binge a lot of tv shows like Breaking Bad and Stranger things
          </Text>
        </View>

        {/* Menu items */}
        <View style={styles.menuContainer}>
          <MenuItem
            icon={
              <Svg width={20} height={19} viewBox="0 0 20 20" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.6503 17.8746C18.2225 15.4062 16.0222 13.6362 13.4544 12.7971C16.0651 11.2429 17.3157 8.136 16.5098 5.20652C15.7038 2.27703 13.0399 0.24707 10.0016 0.24707C6.96326 0.24707 4.29939 2.27703 3.49342 5.20652C2.68745 8.136 3.93805 11.2429 6.54878 12.7971C3.98097 13.6352 1.78066 15.4052 0.352847 17.8746C0.2103 18.107 0.205124 18.3985 0.339328 18.6359C0.473532 18.8732 0.725972 19.019 0.998621 19.0167C1.27127 19.0144 1.52117 18.8642 1.65128 18.6246C3.41753 15.5721 6.53941 13.7496 10.0016 13.7496C13.4638 13.7496 16.5857 15.5721 18.3519 18.6246C18.482 18.8642 18.7319 19.0144 19.0046 19.0167C19.2772 19.019 19.5297 18.8732 19.6639 18.6359C19.7981 18.3985 19.7929 18.107 19.6503 17.8746ZM4.7516 6.99962C4.7516 4.10013 7.1021 1.74962 10.0016 1.74962C12.9011 1.74962 15.2516 4.10013 15.2516 6.99962C15.2516 9.89912 12.9011 12.2496 10.0016 12.2496C7.10339 12.2465 4.7547 9.89783 4.7516 6.99962Z"
                  fill="#121417"
                />
              </Svg>
            }
            title="Account information"
          />

          <MenuItem
            icon={
              <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.7938 14.4944C17.2734 13.5981 16.5 11.0622 16.5 7.75C16.5 3.60786 13.1421 0.25 9 0.25C4.85786 0.25 1.5 3.60786 1.5 7.75C1.5 11.0631 0.725625 13.5981 0.205312 14.4944C-0.065134 14.9581 -0.067101 15.5311 0.200155 15.9967C0.467411 16.4623 0.963134 16.7496 1.5 16.75H5.32594C5.68267 18.4956 7.21835 19.7492 9 19.7492C10.7816 19.7492 12.3173 18.4956 12.6741 16.75H16.5C17.0367 16.7493 17.5321 16.4619 17.7991 15.9963C18.0662 15.5308 18.0641 14.958 17.7938 14.4944ZM9 18.25C8.04674 18.2497 7.19713 17.6487 6.87938 16.75H11.1206C10.8029 17.6487 9.95326 18.2497 9 18.25ZM1.5 15.25C2.22188 14.0088 3 11.1325 3 7.75C3 4.43629 5.68629 1.75 9 1.75C12.3137 1.75 15 4.43629 15 7.75C15 11.1297 15.7763 14.0059 16.5 15.25H1.5Z"
                  fill="#121417"
                />
              </Svg>
            }
            title="Notifications"
          />

          <MenuItem
            icon={
              <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.5 0.75H1.5C0.671573 0.75 0 1.42157 0 2.25V7.75969C0 16.1606 7.10812 18.9478 8.53125 19.4212C8.8352 19.5246 9.1648 19.5246 9.46875 19.4212C10.8938 18.9478 18 16.1606 18 7.75969V2.25C18 1.42157 17.3284 0.75 16.5 0.75ZM16.5 7.76156C16.5 15.1134 10.2797 17.5697 9 17.9972C7.73156 17.5744 1.5 15.12 1.5 7.76156V2.25H16.5V7.76156Z"
                  fill="#121417"
                />
              </Svg>
            }
            title="Privacy"
          />

          <MenuItem
            icon={
              <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.125 14.875C11.125 15.4963 10.6213 16 10 16C9.37868 16 8.875 15.4963 8.875 14.875C8.875 14.2537 9.37868 13.75 10 13.75C10.6213 13.75 11.125 14.2537 11.125 14.875ZM10 4.75C7.93188 4.75 6.25 6.26406 6.25 8.125V8.5C6.25 8.91421 6.58579 9.25 7 9.25C7.41421 9.25 7.75 8.91421 7.75 8.5V8.125C7.75 7.09375 8.75969 6.25 10 6.25C11.2403 6.25 12.25 7.09375 12.25 8.125C12.25 9.15625 11.2403 10 10 10C9.58579 10 9.25 10.3358 9.25 10.75V11.5C9.25 11.9142 9.58579 12.25 10 12.25C10.4142 12.25 10.75 11.9142 10.75 11.5V11.4325C12.46 11.1184 13.75 9.75438 13.75 8.125C13.75 6.26406 12.0681 4.75 10 4.75ZM19.75 10C19.75 15.3848 15.3848 19.75 10 19.75C4.61522 19.75 0.25 15.3848 0.25 10C0.25 4.61522 4.61522 0.25 10 0.25C15.3824 0.255684 19.7443 4.61758 19.75 10ZM18.25 10C18.25 5.44365 14.5563 1.75 10 1.75C5.44365 1.75 1.75 5.44365 1.75 10C1.75 14.5563 5.44365 18.25 10 18.25C14.5542 18.2448 18.2448 14.5542 18.25 10Z"
                  fill="#121417"
                />
              </Svg>
            }
            title="Help"
          />

          <MenuItem
            icon={
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M20.249 12.5696V11.4221L21.689 10.1621C21.9544 9.92811 22.1286 9.60784 22.1808 9.25787C22.2329 8.9079 22.1597 8.55076 21.974 8.24957L20.204 5.24957C20.0724 5.02177 19.8833 4.83256 19.6556 4.70092C19.4279 4.56928 19.1695 4.49984 18.9065 4.49957C18.7435 4.49832 18.5813 4.52366 18.4265 4.57457L16.604 5.18957C16.2897 4.9798 15.9615 4.79185 15.6215 4.62707L15.239 2.73707C15.1704 2.39178 14.9825 2.0816 14.7083 1.86085C14.4341 1.6401 14.0909 1.52283 13.739 1.52957H10.229C9.87699 1.52283 9.53386 1.6401 9.25963 1.86085C8.9854 2.0816 8.79755 2.39178 8.72897 2.73707L8.34647 4.62707C8.00444 4.79256 7.67372 4.98047 7.35647 5.18957L5.57147 4.54457C5.41494 4.50379 5.25285 4.48859 5.09147 4.49957C4.82842 4.49984 4.57008 4.56928 4.34234 4.70092C4.11461 4.83256 3.92549 5.02177 3.79397 5.24957L2.02397 8.24957C1.84891 8.55031 1.78386 8.90257 1.83996 9.246C1.89605 9.58943 2.06981 9.90267 2.33147 10.1321L3.74897 11.4296V12.5771L2.33147 13.8371C2.06242 14.0681 1.88391 14.3869 1.82762 14.737C1.77133 15.0871 1.84089 15.4459 2.02397 15.7496L3.79397 18.7496C3.92549 18.9774 4.11461 19.1666 4.34234 19.2982C4.57008 19.4299 4.82842 19.4993 5.09147 19.4996C5.25448 19.5008 5.41661 19.4755 5.57147 19.4246L7.39397 18.8096C7.7082 19.0194 8.03648 19.2073 8.37647 19.3721L8.75897 21.2621C8.82755 21.6074 9.0154 21.9175 9.28963 22.1383C9.56386 22.3591 9.90699 22.4763 10.259 22.4696H13.799C14.1509 22.4763 14.4941 22.3591 14.7683 22.1383C15.0425 21.9175 15.2304 21.6074 15.299 21.2621L15.6815 19.3721C16.0235 19.2066 16.3542 19.0187 16.6715 18.8096L18.4865 19.4246C18.6413 19.4755 18.8035 19.5008 18.9665 19.4996C19.2295 19.4993 19.4879 19.4299 19.7156 19.2982C19.9433 19.1666 20.1324 18.9774 20.264 18.7496L21.974 15.7496C22.149 15.4488 22.2141 15.0966 22.158 14.7532C22.1019 14.4097 21.9281 14.0965 21.6665 13.8671L20.249 12.5696ZM18.9065 17.9996L16.334 17.1296C15.7314 17.6391 15.0432 18.0378 14.3015 18.3071L13.769 20.9996H10.229L9.69647 18.3371C8.96053 18.0602 8.27608 17.6623 7.67147 17.1596L5.09147 17.9996L3.32147 14.9996L5.36147 13.1996C5.22279 12.4232 5.22279 11.6284 5.36147 10.8521L3.32147 8.99957L5.09147 5.99957L7.66397 6.86957C8.26654 6.36001 8.95469 5.96134 9.69647 5.69207L10.229 2.99957H13.769L14.3015 5.66207C15.0374 5.9389 15.7219 6.3369 16.3265 6.83957L18.9065 5.99957L20.6765 8.99957L18.6365 10.7996C18.7751 11.5759 18.7751 12.3707 18.6365 13.1471L20.6765 14.9996L18.9065 17.9996Z"
                  fill="black"
                />
                <Path
                  d="M12 16.5C11.11 16.5 10.24 16.2361 9.49994 15.7416C8.75991 15.2471 8.18314 14.5443 7.84254 13.7221C7.50195 12.8998 7.41283 11.995 7.58647 11.1221C7.7601 10.2492 8.18868 9.44736 8.81802 8.81802C9.44736 8.18868 10.2492 7.7601 11.1221 7.58647C11.995 7.41283 12.8998 7.50195 13.7221 7.84254C14.5443 8.18314 15.2471 8.75991 15.7416 9.49994C16.2361 10.24 16.5 11.11 16.5 12C16.506 12.5926 16.3937 13.1805 16.1697 13.7292C15.9457 14.2779 15.6145 14.7763 15.1954 15.1954C14.7763 15.6145 14.2779 15.9457 13.7292 16.1697C13.1805 16.3937 12.5926 16.506 12 16.5ZM12 9C11.6035 8.99077 11.2093 9.06205 10.8411 9.20954C10.473 9.35704 10.1386 9.57768 9.85812 9.85812C9.57768 10.1386 9.35704 10.473 9.20954 10.8411C9.06205 11.2093 8.99077 11.6035 9 12C8.99077 12.3965 9.06205 12.7907 9.20954 13.1589C9.35704 13.527 9.57768 13.8615 9.85812 14.1419C10.1386 14.4223 10.473 14.643 10.8411 14.7905C11.2093 14.938 11.6035 15.0092 12 15C12.3965 15.0092 12.7907 14.938 13.1589 14.7905C13.527 14.643 13.8615 14.4223 14.1419 14.1419C14.4223 13.8615 14.643 13.527 14.7905 13.1589C14.938 12.7907 15.0092 12.3965 15 12C15.0092 11.6035 14.938 11.2093 14.7905 10.8411C14.643 10.473 14.4223 10.1386 14.1419 9.85812C13.8615 9.57768 13.527 9.35704 13.1589 9.20954C12.7907 9.06205 12.3965 8.99077 12 9Z"
                  fill="black"
                />
              </Svg>
            }
            title="Settings"
          />

          <MenuItem
            icon={
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H11C11.2833 3 11.521 3.096 11.713 3.288C11.905 3.48 12.0007 3.71733 12 4C11.9993 4.28267 11.9033 4.52033 11.712 4.713C11.5207 4.90567 11.2833 5.00133 11 5H5V19H11C11.2833 19 11.521 19.096 11.713 19.288C11.905 19.48 12.0007 19.7173 12 20C11.9993 20.2827 11.9033 20.5203 11.712 20.713C11.5207 20.9057 11.2833 21.0013 11 21H5ZM17.175 13H10C9.71667 13 9.47933 12.904 9.288 12.712C9.09667 12.52 9.00067 12.2827 9 12C8.99933 11.7173 9.09533 11.48 9.288 11.288C9.48067 11.096 9.718 11 10 11H17.175L15.3 9.125C15.1167 8.94167 15.025 8.71667 15.025 8.45C15.025 8.18333 15.1167 7.95 15.3 7.75C15.4833 7.55 15.7167 7.44567 16 7.437C16.2833 7.42833 16.525 7.52433 16.725 7.725L20.3 11.3C20.5 11.5 20.6 11.7333 20.6 12C20.6 12.2667 20.5 12.5 20.3 12.7L16.725 16.275C16.525 16.475 16.2877 16.571 16.013 16.563C15.7383 16.555 15.5007 16.4507 15.3 16.25C15.1167 16.05 15.0293 15.8127 15.038 15.538C15.0467 15.2633 15.1423 15.034 15.325 14.85L17.175 13Z"
                  fill="#121417"
                />
              </Svg>
            }
            title="Log Out"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    height: 253,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  editbutton0: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 38,
    height: 31,
    borderRadius: 9,
    backgroundColor: 'rgba(97, 98, 99, 0.8)',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    position: 'absolute',
    bottom: -71,
    left: '50%',
    marginLeft: -71,
    alignItems: 'center',
  },
  profilePictureContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageOverlay: {
    position: 'absolute',
    top: 19,
    left: 19,
  },
  editButton: {
    position: 'absolute',
    top: 100,
    right:1,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(97, 98, 99, 0.8)',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoContainer: {
    marginTop: 82,
    paddingHorizontal: 27,
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    fontFamily: 'System', // Will fallback to system font instead of Istok Web
    marginBottom: 30,
  },
  userBio: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 35,
    fontFamily: 'System', // Will fallback to system font instead of Istok Web
  },
  menuContainer: {
    marginTop: 40,
    paddingHorizontal: 27,
    paddingBottom: 100, // Extra space for tab bar
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    marginBottom: 0,
    minHeight: 56,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFEBE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#121417',
    lineHeight: 24,
    fontFamily: 'System', // Will fallback to system font instead of Manrope
    flex: 1,
  },
});
