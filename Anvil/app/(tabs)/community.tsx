import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useRouter } from "expo-router";

const router = useRouter();

const CommunityChats = () => {
  const communityData = [
    {
      id: 1,
      title: 'Sports',
      description: 'Discuss favorite teams and sports',
      icon: 'sports'
    },
    {
      id: 2,
      title: 'Gaming',
      description: 'Connect with fellow gamers',
      icon: 'gaming'
    },
    {
      id: 3,
      title: 'Art',
      description: 'Share and discuss creative works',
      icon: 'art'
    },
    {
      id: 4,
      title: 'Films',
      description: 'Movie reviews and reccomendations',
      icon: 'films'
    },
    {
      id: 5,
      title: 'Music',
      description: 'Discover and share great music',
      icon: 'music'
    }
  ];

  const SearchIcon = () => (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <Path
        d="M17.7241 16.1932L13.6436 12.1127C14.626 10.8049 15.1564 9.21299 15.1546 7.57728C15.1546 3.39919 11.7554 0 7.57728 0C3.39919 0 0 3.39919 0 7.57728C0 11.7554 3.39919 15.1546 7.57728 15.1546C9.21299 15.1564 10.8049 14.626 12.1127 13.6436L16.1932 17.7241C16.3998 17.9088 16.6692 18.0073 16.9461 17.9996C17.2231 17.9918 17.4865 17.8783 17.6824 17.6824C17.8783 17.4865 17.9918 17.2231 17.9996 16.9461C18.0073 16.6692 17.9088 16.3998 17.7241 16.1932ZM2.16494 7.57728C2.16494 6.50682 2.48237 5.4604 3.07708 4.57034C3.6718 3.68029 4.51709 2.98657 5.50607 2.57693C6.49504 2.16728 7.58328 2.0601 8.63318 2.26893C9.68307 2.47777 10.6475 2.99325 11.4044 3.75018C12.1613 4.5071 12.6768 5.47149 12.8856 6.52138C13.0945 7.57128 12.9873 8.65952 12.5776 9.64849C12.168 10.6375 11.4743 11.4828 10.5842 12.0775C9.69416 12.6722 8.64774 12.9896 7.57728 12.9896C6.14237 12.9879 4.76672 12.4171 3.75208 11.4025C2.73744 10.3878 2.16666 9.01219 2.16494 7.57728Z"
        fill="#9DA3AE"
      />
    </Svg>
  );

  const SportsIcon = () => (
    <Svg width="27" height="27" viewBox="0 0 27 27" fill="none">
      <Path
        d="M0 12.1093C0.11306 10.956 0.350485 9.86517 0.712276 8.83673C1.07407 7.80829 1.57153 6.84136 2.20466 5.93593C2.99608 6.75 3.65771 7.69432 4.18954 8.76889C4.72137 9.84347 5.06598 10.9569 5.22336 12.1093H0ZM21.7753 12.1093C21.9336 10.956 22.2728 9.84799 22.7928 8.78517C23.3129 7.72236 23.9799 6.78392 24.794 5.96985C25.4271 6.85176 25.9246 7.81281 26.2864 8.85301C26.6482 9.89321 26.8856 10.9786 26.9986 12.1093H21.7753ZM2.20466 21.0301C1.57153 20.1482 1.07407 19.1926 0.712276 18.1633C0.350485 17.1339 0.11306 16.0431 0 14.8907H5.22336C5.06507 16.044 4.72001 17.152 4.18818 18.2148C3.65635 19.2776 2.99563 20.2161 2.20602 21.0301M24.7953 21.0301C23.9813 20.2161 23.3143 19.2776 22.7942 18.2148C22.2741 17.152 21.9349 16.044 21.7766 14.8907H27C26.8869 16.0214 26.6495 17.1068 26.2877 18.147C25.9259 19.1872 25.4285 20.1482 24.7953 21.0301ZM7.97206 12.1093C7.79117 10.4812 7.35023 8.97739 6.64926 7.59799C5.94829 6.21859 5.03206 4.97487 3.90056 3.86683C4.98593 2.78141 6.22416 1.9108 7.61524 1.25503C9.00633 0.599246 10.5041 0.180905 12.1087 0V12.1093H7.97206ZM14.8913 12.1093V0C16.4968 0.180905 17.995 0.599246 19.3861 1.25503C20.7772 1.9108 22.0145 2.78141 23.0981 3.86683C21.9449 4.95226 21.0237 6.19055 20.3345 7.58171C19.6452 8.97286 19.2097 10.4821 19.0279 12.1093H14.8913ZM12.11 27C10.482 26.8191 8.97829 26.3953 7.59896 25.7287C6.21964 25.0621 4.98729 24.1856 3.90191 23.0992C5.05512 22.0138 5.97679 20.7814 6.6669 19.402C7.35702 18.0226 7.79207 16.5188 7.97206 14.8907H12.11V27ZM14.8913 27V14.8907H19.0293C19.2102 16.5188 19.6457 18.0285 20.3358 19.4196C21.0259 20.8108 21.9471 22.0486 23.0994 23.1332C22.0141 24.2186 20.7758 25.0892 19.3848 25.745C17.9937 26.4008 16.4959 26.8191 14.8913 27Z"
        fill="white"
      />
    </Svg>
  );

  const GamingIcon = () => (
    <Svg width="27" height="27" viewBox="0 0 30 26" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.29696 8.55017C3.42357 7.06398 3.96438 5.69177 4.81533 4.69758C5.66628 3.70339 6.76724 3.15746 7.90636 3.16485H19.0924C21.4742 3.16485 23.4549 5.50178 23.7018 8.55017L24.5696 19.2929C24.6132 19.8698 24.5638 20.4522 24.4248 21.0024C24.2858 21.5526 24.0602 22.0583 23.7626 22.4866C23.4651 22.9149 23.1023 23.2564 22.6978 23.4887C22.2932 23.721 21.856 23.839 21.4144 23.8351C20.802 23.8369 20.2021 23.6065 19.6869 23.1718C19.1717 22.7371 18.7631 22.1164 18.5099 21.3843L17.7385 19.1208C17.6426 18.843 17.4881 18.6071 17.2933 18.4411C17.0984 18.2751 16.8714 18.1858 16.6391 18.184H10.3596C10.1273 18.1858 9.90028 18.2751 9.70544 18.4411C9.51061 18.6071 9.35611 18.843 9.26025 19.1208L8.48687 21.3843C8.23386 22.116 7.82547 22.7364 7.31064 23.1711C6.79582 23.6058 6.19642 23.8364 5.5843 23.8351C5.14242 23.8397 4.70476 23.7222 4.29975 23.4902C3.89473 23.2582 3.53144 22.9169 3.23349 22.4885C2.93554 22.0601 2.70959 21.5542 2.57034 21.0036C2.43108 20.4531 2.38164 19.8702 2.42522 19.2929L3.29696 8.55017ZM7.90636 0C4.31141 0 1.27769 3.53451 0.899683 8.21596L0.0318046 18.9587C-0.319204 23.2731 2.28058 27 5.58623 27C7.78678 27 9.79062 25.3112 10.6894 22.6781L11.1426 21.3514H15.8561L16.3113 22.6781C16.7545 23.9672 17.4718 25.0608 18.3771 25.8275C19.2824 26.5942 20.3371 27.0013 21.4144 27C24.7181 27 27.316 23.2705 26.9688 18.9587L26.101 8.21596C25.721 3.53198 22.6873 0 19.0924 0H7.90636ZM8.48494 6.58543C9.15225 6.58543 9.69033 7.29435 9.69033 8.16785V9.50975H10.7125C11.0322 9.50975 11.3388 9.67647 11.5648 9.97323C11.7909 10.27 11.9179 10.6725 11.9179 11.0922C11.9179 11.5119 11.7909 11.9144 11.5648 12.2111C11.3388 12.5079 11.0322 12.6746 10.7125 12.6746H9.69033V14.019C9.69033 14.4387 9.56334 14.8412 9.33728 15.138C9.11123 15.4347 8.80463 15.6015 8.48494 15.6015C8.16526 15.6015 7.85866 15.4347 7.63261 15.138C7.40655 14.8412 7.27956 14.4387 7.27956 14.019V12.6771H6.25739C5.9377 12.6771 5.6311 12.5104 5.40505 12.2137C5.179 11.9169 5.052 11.5144 5.052 11.0947C5.052 10.675 5.179 10.2725 5.40505 9.97577C5.6311 9.679 5.9377 9.51228 6.25739 9.51228H7.27956V8.17039C7.27956 7.29435 7.81764 6.58543 8.48494 6.58543ZM18.5041 8.79576C18.4965 9.09215 18.5343 9.38753 18.6155 9.66431C18.6966 9.94109 18.8193 10.1936 18.9763 10.4068C19.1333 10.62 19.3214 10.7896 19.5294 10.9054C19.7374 11.0212 19.9609 11.0809 20.1868 11.0809C20.4127 11.0809 20.6363 11.0212 20.8443 10.9054C21.0523 10.7896 21.2404 10.62 21.3974 10.4068C21.5544 10.1936 21.6771 9.94109 21.7582 9.66431C21.8393 9.38753 21.8772 9.09215 21.8696 8.79576C21.8548 8.22282 21.671 7.67983 21.3571 7.28139C21.0431 6.88295 20.6235 6.66023 20.1868 6.66023C19.7502 6.66023 19.3306 6.88295 19.0166 7.28139C18.7027 7.67983 18.5189 8.22282 18.5041 8.79576ZM15.6382 13.2417V13.1911C15.6433 12.6071 15.8242 12.0495 16.1415 11.6401C16.4588 11.2307 16.8866 11.0028 17.3314 11.0061C17.7763 11.0095 18.202 11.2438 18.5157 11.658C18.8294 12.0721 19.0055 12.6324 19.0055 13.2164C19.0055 13.8005 18.8294 14.3607 18.5157 14.7749C18.202 15.189 17.7763 15.4234 17.3314 15.4267C16.8866 15.4301 16.4588 15.2021 16.1415 14.7927C15.8242 14.3833 15.6433 13.8257 15.6382 13.2417Z"
        fill="white"
      />
    </Svg>
  );

  const ArtIcon = () => (
    <Svg width="27" height="27" viewBox="0 0 27 27" fill="none">
      <Path
        d="M21.75 13.5C21.1533 13.5 20.581 13.2629 20.159 12.841C19.7371 12.419 19.5 11.8467 19.5 11.25C19.5 10.6533 19.7371 10.081 20.159 9.65901C20.581 9.23705 21.1533 9 21.75 9C22.3467 9 22.919 9.23705 23.341 9.65901C23.7629 10.081 24 10.6533 24 11.25C24 11.8467 23.7629 12.419 23.341 12.841C22.919 13.2629 22.3467 13.5 21.75 13.5ZM17.25 7.5C16.6533 7.5 16.081 7.26295 15.659 6.84099C15.2371 6.41903 15 5.84674 15 5.25C15 4.65326 15.2371 4.08097 15.659 3.65901C16.081 3.23705 16.6533 3 17.25 3C17.8467 3 18.419 3.23705 18.841 3.65901C19.2629 4.08097 19.5 4.65326 19.5 5.25C19.5 5.84674 19.2629 6.41903 18.841 6.84099C18.419 7.26295 17.8467 7.5 17.25 7.5ZM9.75 7.5C9.15326 7.5 8.58097 7.26295 8.15901 6.84099C7.73705 6.41903 7.5 5.84674 7.5 5.25C7.5 4.65326 7.73705 4.08097 8.15901 3.65901C8.58097 3.23705 9.15326 3 9.75 3C10.3467 3 10.919 3.23705 11.341 3.65901C11.7629 4.08097 12 4.65326 12 5.25C12 5.84674 11.7629 6.41903 11.341 6.84099C10.919 7.26295 10.3467 7.5 9.75 7.5ZM5.25 13.5C4.65326 13.5 4.08097 13.2629 3.65901 12.841C3.23705 12.419 3 11.8467 3 11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9C5.84674 9 6.41903 9.23705 6.84099 9.65901C7.26295 10.081 7.5 10.6533 7.5 11.25C7.5 11.8467 7.26295 12.419 6.84099 12.841C6.41903 13.2629 5.84674 13.5 5.25 13.5ZM13.5 0C9.91958 0 6.4858 1.42232 3.95406 3.95406C1.42232 6.4858 0 9.91958 0 13.5C0 17.0804 1.42232 20.5142 3.95406 23.0459C6.4858 25.5777 9.91958 27 13.5 27C14.0967 27 14.669 26.7629 15.091 26.341C15.5129 25.919 15.75 25.3467 15.75 24.75C15.75 24.165 15.525 23.64 15.165 23.25C14.82 22.845 14.595 22.32 14.595 21.75C14.595 21.1533 14.8321 20.581 15.254 20.159C15.676 19.7371 16.2483 19.5 16.845 19.5H19.5C21.4891 19.5 23.3968 18.7098 24.8033 17.3033C26.2098 15.8968 27 13.9891 27 12C27 5.37 20.955 0 13.5 0Z"
        fill="white"
      />
    </Svg>
  );

  const FilmsIcon = () => (
    <Svg width="27" height="27" viewBox="0 0 27 27" fill="none">
      <Path
        d="M13.5 0C20.956 0 27 6.04395 27 13.5C27.0012 15.5959 26.5139 17.6632 25.5768 19.5379C24.6397 21.4126 23.2785 23.0431 21.6013 24.3H24.3C24.658 24.3 25.0014 24.4422 25.2546 24.6954C25.5078 24.9486 25.65 25.292 25.65 25.65C25.65 26.008 25.5078 26.3514 25.2546 26.6046C25.0014 26.8578 24.658 27 24.3 27H13.5C6.04395 27 0 20.9561 0 13.5C0 6.04395 6.04395 0 13.5 0ZM13.5 16.2C12.7839 16.2 12.0972 16.4845 11.5908 16.9908C11.0845 17.4972 10.8 18.1839 10.8 18.9C10.8 19.6161 11.0845 20.3028 11.5908 20.8092C12.0972 21.3155 12.7839 21.6 13.5 21.6C14.2161 21.6 14.9028 21.3155 15.4092 20.8092C15.9155 20.3028 16.2 19.6161 16.2 18.9C16.2 18.1839 15.9155 17.4972 15.4092 16.9908C14.9028 16.4845 14.2161 16.2 13.5 16.2ZM8.1 10.8C7.38391 10.8 6.69716 11.0845 6.19081 11.5908C5.68446 12.0972 5.4 12.7839 5.4 13.5C5.4 14.2161 5.68446 14.9028 6.19081 15.4092C6.69716 15.9155 7.38391 16.2 8.1 16.2C8.81608 16.2 9.50284 15.9155 10.0092 15.4092C10.5155 14.9028 10.8 14.2161 10.8 13.5C10.8 12.7839 10.5155 12.0972 10.0092 11.5908C9.50284 11.0845 8.81608 10.8 8.1 10.8ZM18.9 10.8C18.1839 10.8 17.4972 11.0845 16.9908 11.5908C16.4845 12.0972 16.2 12.7839 16.2 13.5C16.2 14.2161 16.4845 14.9028 16.9908 15.4092C17.4972 15.9155 18.1839 16.2 18.9 16.2C19.6161 16.2 20.3028 15.9155 20.8092 15.4092C21.3155 14.9028 21.6 14.2161 21.6 13.5C21.6 12.7839 21.3155 12.0972 20.8092 11.5908C20.3028 11.0845 19.6161 10.8 18.9 10.8ZM13.5 5.4C12.7839 5.4 12.0972 5.68446 11.5908 6.19081C11.0845 6.69716 10.8 7.38392 10.8 8.1C10.8 8.81608 11.0845 9.50284 11.5908 10.0092C12.0972 10.5155 12.7839 10.8 13.5 10.8C14.2161 10.8 14.9028 10.5155 15.4092 10.0092C15.9155 9.50284 16.2 8.81608 16.2 8.1C16.2 7.38392 15.9155 6.69716 15.4092 6.19081C14.9028 5.68446 14.2161 5.4 13.5 5.4Z"
        fill="white"
      />
    </Svg>
  );

  const MusicIcon = () => (
    <Svg width="27" height="27" viewBox="0 0 30 26" fill="none">
      <Circle cx="5.5" cy="21.5" r="4.5" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Circle cx="23.5" cy="19" r="4.5" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M27.5 4.60938L10.5 8.8594V3.89062L27.5 -0.35938V4.60938Z" fill="white" stroke="white"/>
      <Path d="M10 21.5V9.5V21.5ZM28 20V5V20ZM10 9.5V3.5L28 -1V5M10 9.5L28 5L10 9.5Z" fill="white"/>
      <Path d="M10 21.5V9.5M10 9.5V3.5L28 -1V5M10 9.5L28 5M28 20V5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );

  const PlusIcon = () => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z" fill="#FEFEFE"/>
    </Svg>
  );

  

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'sports':
        return <SportsIcon />;
      case 'gaming':
        return <GamingIcon />;
      case 'art':
        return <ArtIcon />;
      case 'films':
        return <FilmsIcon />;
      case 'music':
        return <MusicIcon />;
      default:
        return <SportsIcon />;
    }
  };

  const CommunityCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            {renderIcon(icon)}
          </View>
          <View style={styles.textContent}>
            <Text style={styles.cardTitle}>{title}</Text>
          </View>
        </View>
        <View style={styles.bottomSection}>
          <Text style={styles.cardDescription}>{description}</Text>
          <TouchableOpacity style={styles.joinButton} onPress={() => router.push("/cchats")}>
            <Text style={styles.joinButtonText}>Join community</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.titleSection}>
      
            <Text style={styles.title}>Community Chats</Text>
            <TouchableOpacity style={styles.addButton}>
              <PlusIcon />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Connect with others who share your interest</Text>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
            <View style={styles.searchInputContainer}>
              <SearchIcon />
              <TextInput
                style={styles.searchInput}
                placeholder="Search communities..."
                placeholderTextColor="#9DA3AE"
              />
          </View>
        </View>

        {/* Community Cards */}
        <View style={styles.cardsContainer}>
          {communityData.map((community) => (
            <CommunityCard
              key={community.id}
              title={community.title}
              description={community.description}
              icon={community.icon}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#212121',
    fontFamily: 'Istok Web',
    textAlign: 'center',
    flex: 1,
  },
  addButton: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
    backgroundColor: '#EF7850',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ABB0B9',
    fontFamily: 'Istok Web',
    textAlign: 'center',
    marginTop: 10,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
  },
  searchInputContainer: {
    height: 46,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E6E7EB',
    backgroundColor: '#FFEBE5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#ABB0B9',
    fontFamily: 'Istok Web',
    marginLeft: 17,
  },
  cardsContainer: {
    paddingHorizontal: 20,
  },
  cardContainer: {
    marginBottom: 25,
  },
  card: {
    height: 141,
    borderRadius: 10,
    backgroundColor: '#EF7850',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7.5,
    elevation: 8,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Istok Web',
    marginBottom: 8,
  },
  descriptionContainer: {
    marginBottom: 15,
  },
  cardDescription: {
    fontSize: 11,
    fontWeight: '400',
    color: '#595755',
    fontFamily: 'Istok Web',
    
  },
  bottomSection: {
    height: 59,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  joinButton: {
    height: 34,
    backgroundColor: '#EF7850',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  joinButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Istok Web',
  },
});

export default CommunityChats;
