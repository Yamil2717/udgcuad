import React, {useContext, useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import {AxiosContext} from '../contexts/AxiosContext';
import Publication from '../components/Publication';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import Notifications from '../components/Notifications';
import NavigationScreens from '../components/NavigationScreens';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');
function HomeScreen({navigation}) {
  let [showNavBar, setShowNavBar] = useState(false);
  let [showNotifacation, setShowNotifacation] = useState(false);
  let [loading, setLoading] = useState(true);
  let [dataPublication, setDataPublication] = useState([]);

  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);

  useEffect(() => {
    getDataUser();
    getDataRemaining();
  }, []);

  async function getDataUser() {
    await authAxios
      .get('/user')
      .then(userData => {
        authContext.setDataUser({...userData});
        setLoading(false);
      })
      .catch(err => {
        console.error(err?.response?.data?.message || err.message);
        authContext.logout();
      });
  }

  async function getDataRemaining() {
    await authAxios
      .get('/publications')
      .then(data => setDataPublication(data))
      .catch(() => setDataPublication([]));
    await authAxios
      .get('/groups')
      .then(groupsData => {
        authContext.setDataGroups([...groupsData]);
      })
      .catch(() => authContext.setDataGroups([]));
  }

  return loading ? (
    <Spinner />
  ) : (
    <SafeAreaView style={styles.container}>
      {showNavBar && (
        <NavBar setShowNavBar={setShowNavBar} navigation={navigation} />
      )}
      <View style={styles.navigate}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => setShowNavBar(true)}>
          <IconEntypo
            name="menu"
            color="#2A9DD8"
            size={28}
            style={styles.IconNav}
          />
        </TouchableOpacity>
        <View style={styles.formsStyle}>
          <TextInput
            placeholder="Busca temas de tu interés"
            style={styles.input}
            textColor={styles.colorInput}
            theme={{
              colors: {
                placeholder: '#000000',
                text: '#000000',
                primary: '#000000',
              },
            }}
            selectionColor="#000000"
            accessibilityIgnoresInvertColors={true}
          />
          <IconFontisto
            name="search"
            color="#2A9DD8"
            size={16}
            style={styles.iconForm}
          />
        </View>
        <TouchableOpacity onPress={() => setShowNotifacation(true)}>
          <Image
            source={{uri: authContext.dataUser.avatar}}
            style={styles.imageProfile}
          />
        </TouchableOpacity>
      </View>

      {showNotifacation && (
        <Notifications setShowNotifacation={setShowNotifacation} />
      )}

      <View style={styles.containerPublications}>
        {dataPublication.length <= 0 ? (
          <View>
            <Text style={styles.textNoContainPublications}>
              No se encontraron publicaciones.
            </Text>
          </View>
        ) : (
          <FlatList
            data={dataPublication}
            style={styles.flatListContainer}
            renderItem={({item, index}) => (
              <Publication
                key={item.id}
                description={item.description}
                groupID={item.groupID}
                groupName={item.groupName}
                pictureGroup={item.pictureGroup}
                pictures={item.pictures}
                ownerName={item.ownerName}
              />
            )}
            removeClippedSubviews={true}
          />
        )}
      </View>
      <View style={styles.NavigationScreensStyle}>

      <NavigationScreens navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'relative',
  },
  navigate: {
    width: width,
    // maxWidth: width,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
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
    backgroundColor: '#F8F8F8',
    height: 35,
    borderRadius: 24,
    marginVertical: 10,
    width: 280,
  },
  iconForm: {
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
  imageProfile: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    marginLeft: 10,
  },
  // containerPublications: {
  //   minHeight: height,
  // },
  textNoContainPublications: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  flatListContainer: {
    height: height - 65.1,
    maxHeight: height - 65.1,
  },
  colorInput: {
    color: '#000000',
  }
});

export default HomeScreen;
