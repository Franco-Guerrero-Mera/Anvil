import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useRouter } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

// Star Icon Component
const StarIcon = () => (
  <Svg width={36} height={35} viewBox="0 0 40 39" fill="none">
    <Path
      d="M20 2L25.3405 13.8332L38 15.3686L28.6404 24.2153L31.1248 36.9982L20 30.6332L8.87517 37L11.3596 24.2171L2 15.3668L14.6613 13.8314L20 2Z"
      stroke="white"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  </Svg>
);

// People Icon Component
const PeopleIcon = () => (
  <Svg width={22} height={14} viewBox="0 0 22 14" fill="none">
    <Path
      d="M7 8.5C8.10247 8.5 9.78898 8.78123 11.1875 9.34082C11.8863 9.62047 12.4819 9.95737 12.8945 10.3379C13.3038 10.7153 13.5 11.1012 13.5 11.5V13C13.5 13.2739 13.2739 13.5 13 13.5H1C0.726142 13.5 0.5 13.2739 0.5 13V11.5C0.5 11.1012 0.696226 10.7153 1.10547 10.3379C1.51812 9.95737 2.11369 9.62047 2.8125 9.34082C4.21102 8.78123 5.89753 8.5 7 8.5ZM15.293 8.50781C16.3869 8.55144 17.9078 8.82876 19.1875 9.34082C19.8863 9.62047 20.4819 9.95737 20.8945 10.3379C21.3038 10.7153 21.5 11.1012 21.5 11.5V13C21.5 13.2739 21.2739 13.5 21 13.5H16.458C16.4831 13.3375 16.5 13.1706 16.5 13V11.5C16.5 10.2847 16.0208 9.29834 15.293 8.50781ZM7 0.5C8.38168 0.5 9.49023 1.61396 9.49023 3C9.49023 4.38604 8.38168 5.5 7 5.5C5.61614 5.5 4.5 4.38386 4.5 3C4.5 1.61614 5.61614 0.5 7 0.5ZM15 0.5C16.3817 0.5 17.4902 1.61396 17.4902 3C17.4902 4.38604 16.3817 5.5 15 5.5C13.6161 5.5 12.5 4.38386 12.5 3C12.5 1.61614 13.6161 0.5 15 0.5Z"
      stroke="#F08955"
    />
  </Svg>
);



// Bullet Point Component
const BulletPoint = ({ text }: { text: string }) => (
  <View style={styles.bulletItem}>
    <View style={styles.bullet} />
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

export default function PersonaResult() {
  const router = useRouter();

  // Daily practices and weekly goals data
  const dailyPractices = [
    '5-minute morning reflection',
    'One act of kindness daily',
    'Evening gratitude journaling',
    'Weekly mentor check-in',
  ];

  const weeklyGoals = [
    'Have one meaningful conversation',
    'Learn something new',
    'Help someone in need',
    'Reflect on personal growth',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.profileIconContainer}>
            <Svg width={61} height={61} viewBox="0 0 61 61" fill="none">
              <Circle cx="30.5" cy="30.5" r="30.5" fill="#EF5724" />
            </Svg>
            <View style={styles.starIconContainer}>
              <StarIcon />
            </View>
          </View>
          
          <Text style={styles.mainTitle}>The Mindful Leader</Text>
          <Text style={styles.subtitle}>
            A balanced individual who leads by example, priortizing both personal growth and positive impact on others.
          </Text>
        </View>

        {/* Key Traits Section */}
        <Text style={styles.sectionTitle}>Key Traits</Text>
        <View style={styles.traitsContainer}>
          <View style={styles.trait}>
            <Text style={styles.traitText}>Disciplined</Text>
          </View>
          <View style={styles.trait}>
            <Text style={styles.traitText}>Empathetic</Text>
          </View>
          <View style={styles.trait}>
            <Text style={styles.traitText}>Authentic</Text>
          </View>
          <View style={styles.trait}>
            <Text style={styles.traitText}>Empathetic</Text>
          </View>
        </View>

        {/* Role Models Section */}
        <View style={styles.roleModelsSection}>
          <View style={styles.roleModelsHeader}>
            <PeopleIcon />
            <Text style={styles.roleModelsTitle}>Role Models</Text>
          </View>
          
          <View style={styles.roleModelsList}>
            <View style={styles.roleModelItem}>
              <View style={styles.roleModelLine} />
              <View style={styles.roleModelContent}>
                <Text style={styles.roleModelName}>Marcus Aurelius</Text>
                <Text style={styles.roleModelDescription}>
                  Stoic philosopher and leader who emphasized virtue and self-discipline
                </Text>
              </View>
            </View>
            
            <View style={styles.roleModelItem}>
              <View style={styles.roleModelLine} />
              <View style={styles.roleModelContent}>
                <Text style={styles.roleModelName}>Fred Rogers</Text>
                <Text style={styles.roleModelDescription}>
                  Gentle educator who showed emotional intelligence and compassion
                </Text>
              </View>
            </View>
            
            <View style={styles.roleModelItem}>
              <View style={styles.roleModelLine} />
              <View style={styles.roleModelContent}>
                <Text style={styles.roleModelName}>Nelson Mandela</Text>
                <Text style={styles.roleModelDescription}>
                  Leader who demonstrated forgiveness and peaceful resistance
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Daily Practices Section */}
        <View style={styles.checklistSection}>
          <Text style={styles.checklistSectionTitle}>Daily Practices</Text>
          {dailyPractices.map((practice, index) => (
            <BulletPoint key={index} text={practice} />
          ))}
        </View>

        {/* Weekly Goals Section */}
        <View style={styles.checklistSection}>
          <Text style={styles.checklistSectionTitle}>Weekly Goals</Text>
          {weeklyGoals.map((goal, index) => (
            <BulletPoint key={index} text={goal} />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.saveButton} onPress={() => router.push('/home')}>
            <Text style={styles.saveButtonText}>Save Persona</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.startOverButton} onPress={() => router.push('/persona')}>
            <Text style={styles.startOverButtonText}>Start Over</Text>
          </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  profileIconContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  starIconContainer: {
    position: 'absolute',
    top: 13,
    left: 13,
  },
  mainTitle: {
    fontFamily: 'Istok Web',
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Istok Web',
    fontSize: 13,
    fontWeight: '700',
    color: '#525252',
    textAlign: 'center',
    lineHeight: 16,
  },
  sectionTitle: {
    fontFamily: 'Istok Web',
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    marginLeft: 20,
    marginBottom: 16,
  },
  traitsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 19,
    gap: 12,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  trait: {
    flex: 1,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#F08955',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  traitText: {
    fontFamily: 'Istok Web',
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
  roleModelsSection: {
    marginHorizontal: 18,
    marginBottom: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F08955',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  roleModelsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  roleModelsTitle: {
    fontFamily: 'Istok Web',
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  roleModelsList: {
    gap: 25,
  },
  roleModelItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
  },
  roleModelLine: {
    width: 2,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F08955',
    marginTop: 2,
  },
  roleModelContent: {
    flex: 1,
  },
  roleModelName: {
    fontFamily: 'Istok Web',
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  roleModelDescription: {
    fontFamily: 'Istok Web',
    fontSize: 12,
    fontWeight: '400',
    color: '#494A4E',
    lineHeight: 15,
  },
  checklistSection: {
    marginHorizontal: 19,
    marginBottom: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B8C6DA',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  checklistSectionTitle: {
    fontFamily: 'Istok Web',
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F08955',
  },
  bulletText: {
    fontFamily: 'Istok Web',
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 22,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6C81AB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  checklistText: {
    fontFamily: 'Istok Web',
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 19,
    gap: 20,
    marginBottom: 40,
  },
  saveButton: {
    width: 150,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#EF5724',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'Istok Web',
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  startOverButton: {
    width: 159,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ABB0B9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startOverButtonText: {
    fontFamily: 'Istok Web',
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  arrowContainer: {
    position: 'absolute',
    right: 15,
    bottom: 40,
  },
});
