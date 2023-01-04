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
import Modal from '../../components/Modal';
import ModalEditInfo from '../../components/ModalEditInfo';
import Share from 'react-native-share';

const {width, height} = Dimensions.get('window');

function Profile({route, navigation}) {
  let {id} = route.params;
  let [loading, setLoading] = useState(true);
  let [follow, setFollow] = useState(false);
  let [profileInfo, setProfileInfo] = useState({});
  let [dataPublications, setDataPublications] = useState([]);
  let [refreshing, setRefreshing] = useState(false);
  let [textHeaderButton, setTextHeaderButton] = useState('');
  let [lock, setLock] = useState(false);
  let [modalVisible, setModalVisible] = useState(false);
  let [modalConfig, setModalConfig] = useState({});
  let [modalUserInfoVisible, setModalUserInfoVisible] = useState(false);
  let [modalUserInfoConfig, setModalUserInfoConfig] = useState({});
  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);

  /* edit info */
  let [typesUser, setTypesUser] = useState([]);

  const refreshPublications = async () => {
    setRefreshing(true);
    if (id !== authContext.dataUser.id) {
      getDataUser();
    } else {
      setProfileInfo(authContext.dataUser);
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
    if (lock) {
      return;
    }
    setLock(true);
    await authAxios
      .put(`/user/follow/${id}`)
      .then(data => {
        setFollow(!follow);
        setModalConfig({
          description: `Has ${!follow ? 'comenzado' : 'dejado'} a seguir a ${
            profileInfo.name
          }`,
          textButton1: 'Aceptar',
        });
        setModalVisible(true);
        setLock(false);
      })
      .catch(err => {
        setLock(false);
        console.error(err?.response?.data?.message || err.message);
      });
  }

  async function handleButtonAddFriend() {
    if (lock) {
      return;
    }
    setLock(true);
    if (authContext.dataUser.friends[id]) {
      const shareOptions = {
        title: 'Mensaje via Voces',
        message: `Hola, soy ${authContext.dataUser.name} de Voces.`,
        social: Share.Social.WHATSAPP,
        whatsAppNumber: profileInfo.countryIndicator + profileInfo.phone,
      };
      try {
        setLock(false);
        await Share.shareSingle(shareOptions);
      } catch (error) {
        setLock(false);
        console.error(error);
        Alert.alert(
          'Voces',
          'algo fallo y no pudimos enviar un mensaje en WhatsApp.',
        );
      }
    } else {
      if (textHeaderButton === 'Aceptar') {
        await authAxios
          .put(`/user/addFriend/${id}`)
          .then(async data => {
            await authAxios
              .delete(`/request/user/${id}`)
              .then(async success => {
                await getMyDataUser();
                setTextHeaderButton('Enviar mensaje');
                setModalConfig({
                  description: `Has aceptado la solicitud de amistad de ${profileInfo.name}`,
                  icon: 'addFriend',
                  textButton1: 'Cerrar',
                });
                setModalVisible(true);
                setLock(false);
              })
              .catch(err => {
                setLock(false);
                console.error(err?.response?.data?.message || err.message);
              });
          })
          .catch(err => {
            setLock(false);
            Alert.alert(
              'Voces error',
              err?.response?.data?.message || err.message,
            );
            refreshPublications();
            console.error(err?.response?.data?.message || err.message);
          });
      } else {
        if (id === authContext.dataUser.id) {
          setModalUserInfoConfig({
            type: 'profile',
            typesUser,
            setTypesUser,
            setProfileInfo,
            refreshPublications,
            textButton1: 'Actualizar',
            textButton2: 'Cancelar',
          });
          setModalUserInfoVisible(true);

          setLock(false);
        } else if (textHeaderButton === 'Enviar solicitud de amistad') {
          await authAxios
            .post('/request/user/friend', {id})
            .then(() => {
              setTextHeaderButton('Cancelar solicitud');
              setModalConfig({
                description: `Has enviado tu solicitud de amistad a ${profileInfo.name} correctamente.`,
                icon: 'addFriend',
                textButton1: 'Cerrar',
              });
              setModalVisible(true);
              setLock(false);
            })
            .catch(err => {
              setLock(false);
              Alert.alert(
                'Voces error',
                err?.response?.data?.message || err.message,
              );
              refreshPublications();
              console.error(err?.response?.data?.message || err.message);
            });
        } else {
          await authAxios
            .delete(`/request/user/${id}`)
            .then(success => {
              setModalConfig({
                description: `Has cancelado tu solicitud de amistad a ${profileInfo.name} correctamente.`,
                icon: 'addFriend',
                textButton1: 'Cerrar',
              });
              setModalVisible(true);
              setLock(false);
              setTextHeaderButton('Enviar solicitud de amistad');
            })
            .catch(err => {
              setLock(false);
              console.error(err?.response?.data?.message || err.message);
            });
        }
      }
    }
  }

  async function declineRequestFriend() {
    await authAxios
      .delete(`/request/user/${id}`)
      .then(success => {
        setLock(false);
        setModalConfig({
          description: `Has rechazado la solicitud de amistad de ${profileInfo.name}.`,
          icon: 'removeFriend',
          textButton1: 'Cerrar',
        });
        setModalVisible(true);
        setTextHeaderButton('Enviar solicitud de amistad');
      })
      .catch(err => {
        setLock(false);
        console.error(err?.response?.data?.message || err.message);
      });
  }

  async function removeFriend() {
    setModalConfig({
      description: `¿Seguro desea eliminar de amigo a ${profileInfo.name}?`,
      icon: 'wp',
      textButton1: 'Aceptar',
      handleButton1: async () => {
        await authAxios
          .delete(`/user/deleteFriend/${id}`)
          .then(async data => {
            await getMyDataUser();
            setLock(false);
            setTextHeaderButton('Enviar solicitud de amistad');
          })
          .catch(err => {
            setLock(false);
            Alert.alert(
              'Voces error',
              err?.response?.data?.message || err.message,
            );
            refreshPublications();
            console.error(err?.response?.data?.message || err.message);
          });
      },
      textButton2: 'Cancelar',
      //handleButton2
    });
    setModalVisible(true);
  }

  useEffect(() => {
    if (id === authContext.dataUser.id) {
      setProfileInfo(authContext.dataUser);
      setTextHeaderButton('Editar perfil');
      getUserTypes();
      setLoading(false);
    } else {
      getDataUser();
    }
    getPublications();
  }, [id]);

  async function getUserTypes() {
    await authAxios
      .get(`${env.api}/user/types`)
      .then(types => {
        setTypesUser(types);
      })
      .catch(err => {
        console.error(err?.response?.data?.message || err.message);
        Alert.alert('Voces', err?.response?.data?.message || err.message);
      });
  }

  async function getMyDataUser() {
    await authAxios
      .get('/user')
      .then(userData => {
        authContext.setDataUser({...userData});
      })
      .catch(err => {
        console.error(err?.response?.data?.message || err.message);
      });
  }

  async function getDataUser() {
    await getMyDataUser();
    await authAxios
      .get(`/user/${id}`)
      .then(async userData => {
        setProfileInfo(userData);
        if (authContext.dataUser.friends[id]) {
          setTextHeaderButton('Enviar mensaje');
          setLoading(false);
        } else {
          await authAxios
            .get(`/request/user/${id}`)
            .then(requestUser => {
              if (requestUser.type === 2) {
                setTextHeaderButton('Aceptar');
              } else {
                setTextHeaderButton('Cancelar solicitud');
              }
              setLoading(false);
            })
            .catch(() => {
              setTextHeaderButton('Enviar solicitud de amistad');
              setLoading(false);
            });
        }
      })
      .catch(err => {
        console.error(err?.response?.data?.message || err.message);
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

  async function choosePhoto(type) {
    if (lock) {
      return;
    }
    setLock(true);
    if (id !== authContext.dataUser.id) {
      setModalConfig({
        photoUrl: profileInfo[type],
      });
      setModalVisible(true);
      setLock(false);
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
          if (response.didCancel) {
            setLock(false);
          }
          if (response.assets) {
            setLock(false);
            uploadPhoto(response.assets[0], type);
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
              setLock(false);
              await authAxios.delete(`${env.api}/images/${deletePhoto}`);
            });
        });
    } catch (error) {
      console.log(error);
      setLock(false);
    }
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
                  {authContext.dataUser.friends[id] && (
                    <TouchableOpacity
                      style={styles.headerButtonRemoveFriend}
                      onPress={removeFriend}>
                      <IconEntypo
                        name="cross"
                        color="#2A9DD8"
                        size={24}
                        style={styles.headerIcon}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.headerButton}
                    onPress={handleButtonAddFriend}>
                    <Text style={styles.headerTextButton}>
                      {textHeaderButton}
                    </Text>
                  </TouchableOpacity>
                  {(textHeaderButton === 'Aceptar' ||
                    textHeaderButton === 'Aceptar mensaje') && (
                    <TouchableOpacity
                      style={[styles.headerButton, styles.marginLeft]}
                      onPress={() => declineRequestFriend()}>
                      <Text style={styles.headerTextButton}>Rechazar</Text>
                    </TouchableOpacity>
                  )}
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
      {modalVisible && (
        <Modal
          {...modalConfig}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
      {modalUserInfoVisible && (
        <ModalEditInfo
          {...modalUserInfoConfig}
          modalVisible={modalUserInfoVisible}
          setModalVisible={setModalUserInfoVisible}
        />
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
  marginLeft: {
    marginLeft: 5,
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
  headerButtonRemoveFriend: {
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
});

export default Profile;
