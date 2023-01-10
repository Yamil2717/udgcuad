import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import NavbarFloat from '../../components/Navbar/NavbarFloat';
import {AuthContext} from '../../contexts/AuthContext';
import UserMode from './SearchModes/UserMode';
import GroupsMode from './SearchModes/GroupsMode';
import TagsMode from './SearchModes/TagsMode';
import MatchMode from './SearchModes/MatchMode';
import SpinnerWithoutLogo from '../../components/SpinnerWithoutLogo';

const {width, height} = Dimensions.get('window');

function Search({route, navigation}) {
  let {search} = route.params;
  let authContext = useContext(AuthContext);
  let {avatar, id} = authContext.dataUser;
  let [modalVisible, setModalVisible] = useState(false);
  let [searchInput, onChangeSearchInput] = useState(search || null);
  let [searchMode, setSearchMode] = useState('users');

  const searchModes = [
    {
      icon: () => (
        <IconFontAwesome5
          name="user-alt"
          color="#2A9DD8"
          size={16}
          style={styles.iconMode}
        />
      ),
      name: 'Usuarios',
      mode: 'users',
    },
    {
      icon: () => (
        <IconFontAwesome5
          name="user-friends"
          color="#2A9DD8"
          size={20}
          style={styles.iconMode}
        />
      ),
      name: 'Grupos',
      mode: 'groups',
    },
    {
      icon: () => (
        <IconFontAwesome5
          name="hashtag"
          color="#2A9DD8"
          size={20}
          style={styles.iconMode}
        />
      ),
      name: 'Tags',
      mode: 'hashtags',
    },
    {
      icon: () => (
        <IconIonicons
          name="md-text-sharp"
          color="#2A9DD8"
          size={20}
          style={styles.iconMode}
        />
      ),
      name: 'Coincidencias',
      mode: 'match',
    },
  ];

  useEffect(() => {
    setSearchMode('');
    setTimeout(() => setSearchMode('users'), 250);
  }, [search]);

  function getModeRender() {
    switch (searchMode) {
      case 'users':
        return <UserMode search={search} navigation={navigation} />;
      case 'groups':
        return <GroupsMode search={search} navigation={navigation} />;
      case 'hashtags':
        return <TagsMode search={search} navigation={navigation} />;
      case 'match':
        return <MatchMode search={search} navigation={navigation} />;
      default:
        return <SpinnerWithoutLogo />;
    }
  }

  return (
    <SafeAreaView>
      <View>
        {modalVisible && (
          <NavbarFloat
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            navigation={navigation}
          />
        )}
        <View style={styles.navigate}>
          <TouchableOpacity
            style={styles.menu}
            onPress={() => setModalVisible(true)}>
            <IconEntypo
              name="menu"
              color="#2A9DD8"
              size={28}
              style={styles.IconNav}
            />
          </TouchableOpacity>

          <View style={styles.formsStyle}>
            <TextInput
              placeholder="Busca en voces"
              style={styles.input}
              textColor={styles.colorInput}
              value={searchInput}
              onChangeText={onChangeSearchInput}
              onSubmitEditing={() => {
                if (searchInput && searchInput.length > 0) {
                  navigation.navigate('Search', {search: searchInput});
                }
              }}
            />
            <IconFontisto
              name="search"
              color="#2A9DD8"
              size={16}
              style={styles.iconSearch}
              onPress={() => {
                if (search && search.length > 0) {
                  navigation.navigate('Search', {search: searchInput});
                }
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', {id})}>
            <FastImage
              source={{
                uri: avatar,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
              style={styles.imageProfile}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <ScrollView style={styles.containerSearchModes} horizontal>
          {searchModes.map((mode, index) => (
            <TouchableOpacity
              key={index}
              style={styles.containerMode}
              onPress={() => setSearchMode(mode.mode)}>
              <mode.icon />
              <Text
                style={[
                  styles.textMode,
                  searchMode === mode.mode && styles.textModeActive,
                ]}>
                {mode.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.containerModeData}>{getModeRender()}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navigate: {
    width: '100%',
    maxWidth: width,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  menu: {
    height: 35,
    marginRight: 10,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  formsStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 35,
    marginVertical: 10,
    width: '70%',
    backgroundColor: '#F8F8F8',
    borderRadius: 24,
  },
  formsStyleText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 35,
    borderRadius: 24,
    marginVertical: 10,
    width: '70%',
  },
  iconSearch: {
    width: 15,
    height: 15,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 5,
    padding: 0,
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    fontSize: 14,
    height: 35,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    paddingVertical: 5,
    paddingLeft: 15,
  },
  titleNotification: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#828282',
  },
  imageProfile: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    marginLeft: 10,
  },
  containerSearchModes: {
    paddingVertical: 5,
    width: width,
    backgroundColor: 'white',
  },
  containerMode: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  iconMode: {
    marginRight: 5,
  },
  textMode: {
    fontSize: 16,
    color: '#828282',
    alignSelf: 'center',
  },
  textModeActive: {
    color: '#2A9DD8',
    textDecorationLine: 'underline',
  },
  containerModeData: {
    height: height - 96.4,
    backgroundColor: 'white',
  },
});

export default Search;
