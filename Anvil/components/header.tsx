import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { usePathname, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ username }: { username: string }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const pathname = usePathname();

  const handleNavigate = (path: string) => {
    setDropdownVisible(false);
    router.push({ pathname: path as any, params: { username } });
  };

  return (
    <View>
      <Pressable
        style={styles.menuButton}
        onPress={() => setDropdownVisible(true)}
        accessibilityLabel="Menú de navegación"
        accessibilityRole="button"
      >
        <Image
          style={styles.menuIcon}
          source={require('../assets/images/hamburger.png')}
        />
      </Pressable>

      <Modal
        transparent
        visible={dropdownVisible}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.dropdownContainer}>
          <View style={styles.dropdown}>
            <DropdownItem
              icon="time"
              label="Historial"
              path="/explore"
              currentPath={pathname}
              onPress={handleNavigate}
            />
            <DropdownItem
              icon="help-circle"
              label="Preguntas frecuentes"
              path="/faqPage"
              currentPath={pathname}
              onPress={handleNavigate}
            />
            <DropdownItem
              icon="chatbubble-ellipses"
              label="Chat"
              path="/homePage"
              currentPath={pathname}
              onPress={handleNavigate}
            />
            <DropdownItem
              icon="exit"
              label="Finalizar sesión"
              path="/"
              currentPath={pathname}
              onPress={() => {
                setDropdownVisible(false);
                router.navigate('/');
                Alert.alert('¡Sesión finalizada!');
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const DropdownItem = ({
  icon,
  label,
  path,
  currentPath,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  path: string;
  currentPath: string;
  onPress: (path: string) => void;
}) => {
  const isActive = currentPath === path;
  return (
    <Pressable
      style={[styles.dropdownItem, isActive && styles.activeItem]}
      onPress={() => onPress(path)}
      accessibilityRole="button"
    >
      <Ionicons
        name={icon}
        size={20}
        color={isActive ? '#007aff' : '#333'}
        style={{ marginRight: 10 }}
      />
      <Text style={[styles.dropdownText, isActive && styles.activeText]}>
        {label}
      </Text>
    </Pressable>
  );
};

export default Header;

const styles = StyleSheet.create({
  menuButton: {
    padding: 10,
    marginLeft: 10,
     marginTop: 30,
  },
  menuIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    backgroundColor: 'transparent',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 20,
    color: '#333',
  },
  activeItem: {
    backgroundColor: '#f0f8ff',
  },
  activeText: {
    color: '#007aff',
    fontWeight: 'bold',
  },
});
