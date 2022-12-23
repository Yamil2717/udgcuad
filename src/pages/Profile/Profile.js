import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  Alert,
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
import env from '../../env';
import tools from '../../tools/tools';

const {width, height} = Dimensions.get('window');

function Profile({route, navigation}) {
  let {id} = route.params;
  let [loading, setLoading] = useState(true);
  let [modalImage, setModalImage] = useState({active: false, image: ''});
  let [follow, setFollow] = useState(false);
  let [profileInfo, setProfileInfo] = useState({});
  let [dataPublications, setDataPublications] = useState([]);
  let [refreshing, setRefreshing] = useState(false);
  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);

  const refreshPublications = async () => {
    setRefreshing(true);
    if (id !== authContext.dataUser.id) {
      getDataUser();
    }
    await authAxios
      .get(`/publications/${id}`)
      .then(data => {
        setDataPublications(data);
        setRefreshing(false);
      })
      .catch(() => {
        setDataPublications([]);
        setRefreshing(false);
      });
  };

  async function followHandle() {
    setFollow(!follow);
    console.log(authContext.dataUser);
    await authAxios
      .put(`/user/follow/${id}`)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  function getTextHeaderButton() {
    if (id === authContext.dataUser.id) {
      return 'Editar perfil';
    } else {
      return 'Enviar solicitud de amistad';
    }
  }

  async function choosePhoto(type) {
    if (id !== authContext.dataUser.id) {
      setModalImage({active: true, image: type});
    } else {
      await launchImageLibrary(
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
              uploadPhoto(response.assets[0], type);
            }
          }
        },
      );
    }
  }

  async function uploadPhoto(imagen, type) {
    try {
      await authAxios
        .post(
          `${env.api}/images/${
            type === 'avatar' ? 'user' : 'profile_banner'
          }/upload`,
          tools.formDataSinglePhoto(imagen),
          {
            headers: {'Content-Type': 'multipart/form-data'},
          },
        )
        .then(async url => {
          let urlType = type === 'avatar' ? '/user/avatar' : '/user/header';
          await authAxios
            .put(`${env.api}${urlType}`, {url})
            .then(async data => {
              let tempDataUser = {...authContext.dataUser};
              let deletePhoto = tempDataUser[type]
                .split('/')
                .slice(4, 6)
                .join('/');
              tempDataUser[type] = url;
              authContext.setDataUser({...tempDataUser});
              setProfileInfo({...tempDataUser});
              await authAxios.delete(`${env.api}/images/${deletePhoto}`);
            });
        });
    } catch (error) {
      console.log(error);
    }
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
        setDataPublications(data);
      })
      .catch(() => {
        setDataPublications([]);
      });
  }

  function addCommentCounter(indexPublication) {
    let tempDataPublication = [...dataPublications];
    tempDataPublication[indexPublication].commentCount =
      tempDataPublication[indexPublication].commentCount + 1;
    setDataPublications(tempDataPublication);
  }

  async function addReactionCounter(indexPublication, action) {
    let tempDataPublication = [...dataPublications];
    let reaction = {};
    if (tempDataPublication[indexPublication].reaction.action === action) {
      switch (action) {
        case 1:
          tempDataPublication[indexPublication].likePositive -= 2;
          break;
        case 2:
          tempDataPublication[indexPublication].likeNeutral -= 1;
          break;
        case 3:
          tempDataPublication[indexPublication].likeNegative -= 1;
          break;
      }
      reaction = {action: 0, liked: false};
    } else if (tempDataPublication[indexPublication].reaction.action === 0) {
      switch (action) {
        case 1:
          tempDataPublication[indexPublication].likePositive += 2;
          break;
        case 2:
          tempDataPublication[indexPublication].likeNeutral += 1;
          break;
        case 3:
          tempDataPublication[indexPublication].likeNegative += 1;
          break;
      }
      reaction = {action, liked: true};
    } else {
      switch (action) {
        case 1:
          switch (tempDataPublication[indexPublication].reaction.action) {
            case 1:
              tempDataPublication[indexPublication].likePositive -= 2;
              break;
            case 2:
              tempDataPublication[indexPublication].likeNeutral -= 1;
              break;
            case 3:
              tempDataPublication[indexPublication].likeNegative -= 1;
              break;
          }
          tempDataPublication[indexPublication].likePositive += 2;
          break;
        case 2:
          switch (tempDataPublication[indexPublication].reaction.action) {
            case 1:
              tempDataPublication[indexPublication].likePositive -= 2;
              break;
            case 2:
              tempDataPublication[indexPublication].likeNeutral -= 1;
              break;
            case 3:
              tempDataPublication[indexPublication].likeNegative -= 1;
              break;
          }
          tempDataPublication[indexPublication].likeNeutral += 1;
          break;
        case 3:
          switch (tempDataPublication[indexPublication].reaction.action) {
            case 1:
              tempDataPublication[indexPublication].likePositive -= 2;
              break;
            case 2:
              tempDataPublication[indexPublication].likeNeutral -= 1;
              break;
            case 3:
              tempDataPublication[indexPublication].likeNegative -= 1;
              break;
          }
          tempDataPublication[indexPublication].likeNegative += 1;
          break;
      }
      reaction = {action, liked: true};
    }
    tempDataPublication[indexPublication].reaction = reaction;
    setDataPublications([...tempDataPublication]);
  }

  return loading ? (
    <Spinner />
  ) : (
    <SafeAreaView style={styles.container}>
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
        style={styles.containerFlatList}
        ListHeaderComponent={
          <View>
            <TouchableOpacity onPress={() => choosePhoto('header')}>
              <FastImage
                source={{
                  uri: profileInfo.header,
                  priority: FastImage.priority.high,
                }}
                style={styles.imageHeader}
                resizeMode={FastImage.resizeMode.cover}>
                <View style={styles.containerHeaderButtons}>
                  {id !== authContext.dataUser.id && (
                    <TouchableOpacity
                      style={styles.headerButtonFollow}
                      onPress={followHandle}>
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
            </TouchableOpacity>
            <View style={styles.containerUserInfo}>
              <TouchableOpacity
                style={styles.containerAvatar}
                onPress={() => choosePhoto('avatar')}>
                <FastImage
                  source={{
                    uri: profileInfo.avatar,
                    priority: FastImage.priority.high,
                  }}
                  style={styles.imageAvatar}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </TouchableOpacity>
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
            title={item.title}
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
            reaction={item.reaction}
            navigation={navigation}
            addReactionCounter={addReactionCounter}
            addCommentCounter={addCommentCounter}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.textNoContainPublications}>
            No se encontraron publicaciones.
          </Text>
        }
        removeClippedSubviews={true}
      />
      {modalImage.active && (
        <View style={styles.containerModal}>
          <TouchableOpacity
            style={styles.buttonCloseModal}
            onPress={() => setModalImage({active: false, image: ''})}
          />
          <FastImage
            source={{
              uri: profileInfo[modalImage.image],
              priority: FastImage.priority.high,
            }}
            style={styles.imageModal}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  containerFlatList: {
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
  containerAvatar: {
    position: 'relative',
    top: -37.5,
    marginLeft: '5%',
  },
  imageAvatar: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
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
  containerModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,.5)',
    zIndex: 5,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonCloseModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    zIndex: 15,
  },
  imageModal: {
    width: '90%',
    height: '90%',
    zIndex: 10,
  },
});

export default Profile;
