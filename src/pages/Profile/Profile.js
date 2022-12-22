import React, {useState, useContext, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Navbar from '../../components/Navbar/Navbar';
import Spinner from '../../components/Spinner';
import {AuthContext} from '../../contexts/AuthContext';
import {AxiosContext} from '../../contexts/AxiosContext';
import {launchImageLibrary} from 'react-native-image-picker';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Publication from '../../components/Publication';

const {width, height} = Dimensions.get('window');

function Profile({route, navigation}) {
  let {id} = route.params;
  console.log('id xd ', id);
  let [loading, setLoading] = useState(true);
  let [profileInfo, setProfileInfo] = useState({});
  let [bannerPhoto, setBannerPhoto] = useState(null);
  let [follow, setFollow] = useState(false);
  let [dataPublications, setDataPublications] = useState([]);
  let [refreshing, setRefreshing] = useState(false);
  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);

  const refreshPublications = useCallback(async () => {
    setRefreshing(true);
    await authAxios
      .get(`/publications/${id}`)
      .then(data => {
        console.log(data);
        setDataPublications(data);
        setRefreshing(false);
      })
      .catch(() => {
        setDataPublications([]);
        setRefreshing(false);
      });
  }, []);

  function getTextHeaderButton() {
    if (id === authContext.dataUser.id) {
      return 'Editar perfil';
    } else {
      return 'Enviar solicitud de amistad';
    }
  }

  function choosePhoto() {
    if (id !== authContext.dataUser.id) {
      return;
    }
    launchImageLibrary(
      {
        title: 'Seleccione una fotografía',
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 1,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      response => {
        if (response.assets) {
          if (response.assets[0].fileSize > 4 * 1024 * 1024) {
            return Alert.alert(
              'Error',
              'La imagen no puede superar los 4MB, por favor escoja otra.',
            );
          } else {
            setBannerPhoto({...response.assets[0]});
          }
        }
      },
    );
  }

  useEffect(() => {
    if (id === authContext.dataUser.id) {
      setProfileInfo(authContext.dataUser);
      setLoading(false);
    } else {
      getDataUser();
    }
    getPublications();
  }, [id]);

  async function getDataUser() {
    await authAxios
      .get(`/user/${id}`)
      .then(userData => {
        console.log(userData);
        setProfileInfo(userData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err?.response?.data?.message || err.message);
        authContext.logout();
      });
  }

  async function getPublications() {
    await authAxios
      .get(`/publications/${id}`)
      .then(data => {
        console.log(data);
        setDataPublications(data);
      })
      .catch(() => {
        setDataPublications([]);
      });
  }

  return loading ? (
    <Spinner />
  ) : (
    <SafeAreaView>
      <Navbar navigation={navigation} />
      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#2A9DD8', '#2A9DD8']}
            refreshing={refreshing}
            onRefresh={refreshPublications}
          />
        }
        data={dataPublications}
        style={styles.container}
        ListHeaderComponent={
          <View>
            <TouchableWithoutFeedback onPress={choosePhoto}>
              <FastImage
                source={{
                  uri: bannerPhoto?.uri || profileInfo.header,
                  priority: FastImage.priority.high,
                }}
                style={styles.imageHeader}
                resizeMode={FastImage.resizeMode.cover}>
                <View style={styles.containerHeaderButtons}>
                  {id !== authContext.dataUser.id && (
                    <TouchableOpacity
                      style={styles.headerButtonFollow}
                      onPress={() => setFollow(!follow)}>
                      <IconEntypo
                        name={follow ? 'heart' : 'heart-outlined'}
                        color="#2A9DD8"
                        size={24}
                        style={styles.headerIcon}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={styles.headerButton}>
                    <Text style={styles.headerTextButton}>
                      {getTextHeaderButton()}
                    </Text>
                  </TouchableOpacity>
                </View>
              </FastImage>
            </TouchableWithoutFeedback>
            <View style={styles.containerUserInfo}>
              <FastImage
                source={{
                  uri: profileInfo.avatar,
                  priority: FastImage.priority.high,
                }}
                style={styles.imageAvatar}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={styles.containerTextUserInfo}>
                <Text style={styles.name}>{profileInfo.name}</Text>
                <Text style={styles.role}>{profileInfo.role.name}</Text>
              </View>
            </View>
          </View>
        }
        renderItem={({item, index}) => (
          <Publication
            key={item.id}
            id={index + 1}
            length={dataPublications.length}
            idPost={item.id}
            description={item.description}
            groupID={item.group.id}
            groupName={item.group.name}
            pictureGroup={item.group.picture}
            pictures={item.pictures}
            ownerID={item.ownerID}
            ownerName={item.user.name}
            createdAt={item.createdAt}
            likeNegative={item.likeNegative}
            likeNeutral={item.likeNeutral}
            likePositive={item.likePositive}
            commentCount={item.commentCount}
            navigation={navigation}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.textNoContainPublications}>
            No se encontraron publicaciones.
          </Text>
        }
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: height - 61.1,
    maxHeight: height - 61.1,
  },
  imageHeader: {
    width: width,
    height: 145,
    position: 'relative',
  },
  containerHeaderButtons: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  headerButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  headerTextButton: {
    fontSize: 14,
    color: '#2A9DD8',
    fontWeight: '500',
  },
  headerButtonFollow: {
    padding: 4,
    backgroundColor: 'white',
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 75 / 2,
    flexDirection: 'row',
  },
  containerUserInfo: {
    display: 'flex',
    flexDirection: 'row',
  },
  imageAvatar: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    position: 'relative',
    top: -37.5,
    marginLeft: '5%',
  },
  containerTextUserInfo: {
    paddingHorizontal: 15,
    paddingTop: 5,
    width: '80%',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  role: {
    fontSize: 14,
    color: '#828282',
  },
  textNoContainPublications: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Profile;
