import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {launchImageLibrary} from 'react-native-image-picker';
import Modal from '../../components/Modal';
import ModalEditInfo from '../../components/ModalEditInfo';
import Navbar from '../../components/Navbar/Navbar';
import Publication from '../../components/Publication';
import Spinner from '../../components/Spinner';
import {AuthContext} from '../../contexts/AuthContext';
import {AxiosContext} from '../../contexts/AxiosContext';
import env from '../../env';
import tools from '../../tools/tools';

const {width, height} = Dimensions.get('window');

function GroupScreen({route, navigation}) {
  let {id} = route.params;
  let [loading, setLoading] = useState(true);
  let [refreshing, setRefreshing] = useState(false);
  let [dataGroup, setDataGroup] = useState({});
  let [dataGroupPublications, setDataGroupPublications] = useState([]);
  let [textHeaderButton, setTextHeaderButton] = useState('');
  let [modalVisible, setModalVisible] = useState(false);
  let [modalConfig, setModalConfig] = useState({});
  let [modalUserInfoVisible, setModalUserInfoVisible] = useState(false);
  let [modalUserInfoConfig, setModalUserInfoConfig] = useState({});
  let [lock, setLock] = useState(false);
  let [currentPage, setCurrentPage] = useState(0);
  let [haveMorePublications, setHaveMorePublications] = useState(true);
  const flatListRef = useRef(null);

  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);

  useEffect(() => {
    getGroupData();
    getPublications();
  }, [id]);

  async function getGroupData() {
    await authAxios
      .get(`/group/${id}`)
      .then(data => {
        setDataGroup(data);
        if (data.ownerID === authContext.dataUser.id) {
          setTextHeaderButton('Editar grupo');
        } else if (data.membersIDS.includes(authContext.dataUser.id)) {
          setTextHeaderButton('Perteneces a este grupo');
        } else {
          setTextHeaderButton('Unirse');
        }
        setLoading(false);
      })
      .catch(() => {
        Alert.alert(
          'Voces',
          'Ha ocurrido un error, no se pudo obtener la información del grupo',
        );
      });
  }

  async function handleAskJoinGroup() {
    if (textHeaderButton === 'Editar grupo') {
      setModalUserInfoConfig({
        type: 'group',
        textButton2: 'Cancelar',
        textButton1: 'Actualizar',
      });
      setModalUserInfoVisible(true);
    } else if (textHeaderButton === 'Unirse') {
      console.log('unirse');
    }
  }

  async function loadMorePublications() {
    setCurrentPage(currentPage + 15);
  }

  useEffect(() => {
    getMorePublications();
  }, [currentPage]);

  async function getMorePublications() {
    await authAxios
      .get(`/publications/group/${id}/${currentPage}`)
      .then(data =>
        setDataGroupPublications([...dataGroupPublications, ...data]),
      )
      .catch(() => setHaveMorePublications(false));
  }

  async function getPublications() {
    await authAxios
      .get(`/publications/group/${id}/${currentPage}`)
      .then(data => {
        setDataGroupPublications([...data]);
      })
      .catch(error => {
        console.log(error);
        setDataGroupPublications([]);
      });
  }

  async function refreshGroup() {
    setRefreshing(true);
    await authAxios
      .get(`/group/${id}`)
      .then(async data => {
        setDataGroup(data);
        await authAxios
          .get(`/publications/group/${id}`)
          .then(publications => {
            setDataGroupPublications([...publications]);
            setRefreshing(false);
          })
          .catch(error => {
            console.log(error);
            setDataGroupPublications([]);
            setRefreshing(false);
          });
      })
      .catch(() => {
        Alert.alert(
          'Voces',
          'Ha ocurrido un error, no se pudo obtener la información del grupo',
        );
        setRefreshing(false);
      });
  }

  async function choosePhoto(type) {
    if (lock) {
      return;
    }
    setLock(true);
    if (dataGroup.ownerID !== authContext.dataUser.id) {
      setModalConfig({
        photoUrl: dataGroup[type],
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
            uploadPhoto(response.assets[0], type);
            setLock(false);
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
            type === 'picture' ? 'groups' : 'group_banner'
          }/upload`,
          tools.formDataSinglePhoto(imagen),
          {
            headers: {'Content-Type': 'multipart/form-data'},
          },
        )
        .then(async url => {
          let urlType = type === 'picture' ? '/group/picture' : '/group/header';
          await authAxios
            .put(`${env.api}${urlType}/${id}`, {url})
            .then(async data => {
              let deletePhoto = dataGroup[type]
                .split('/')
                .slice(4, 6)
                .join('/');
              let tempDataGroups = [...authContext.dataGroups];
              let indexGroup;
              tempDataGroups.map((tempDataGroup, index) => {
                if (tempDataGroup.id === id) {
                  indexGroup = index;
                }
              });
              tempDataGroups[indexGroup][type] = url;
              authContext.setDataGroups([...tempDataGroups]);
              setDataGroup({...tempDataGroups[indexGroup]});
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
    let tempDataPublication = [...dataGroupPublications];
    tempDataPublication[indexPublication].commentCount =
      tempDataPublication[indexPublication].commentCount + 1;
    setDataGroupPublications(tempDataPublication);
  }

  async function addReactionCounter(indexPublication, action) {
    let tempDataPublication = [...dataGroupPublications];
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
    setDataGroupPublications([...tempDataPublication]);
  }

  return loading ? (
    <Spinner />
  ) : (
    <SafeAreaView style={styles.container}>
      <Navbar navigation={navigation} />
      <FlatList
        ref={flatListRef}
        refreshControl={
          <RefreshControl
            colors={['#2A9DD8', '#2A9DD8']}
            refreshing={refreshing}
            onRefresh={refreshGroup}
          />
        }
        data={dataGroupPublications}
        style={styles.containerFlatList}
        ListHeaderComponent={
          <View>
            <TouchableOpacity onPress={() => choosePhoto('header')}>
              <FastImage
                source={{
                  uri: dataGroup.header,
                  priority: FastImage.priority.high,
                }}
                style={styles.imageHeader}
                resizeMode={FastImage.resizeMode.cover}>
                <View style={styles.containerHeaderButtons}>
                  {textHeaderButton === 'Editar grupo' && (
                    <TouchableOpacity
                      style={[styles.headerButton, styles.marginRight]}>
                      <Text style={styles.headerTextButton}>
                        Gestionar solicitudes
                      </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.headerButton}
                    onPress={handleAskJoinGroup}>
                    <Text style={styles.headerTextButton}>
                      {textHeaderButton}
                    </Text>
                  </TouchableOpacity>
                </View>
              </FastImage>
            </TouchableOpacity>
            <View style={styles.containerUserInfo}>
              <TouchableOpacity
                style={styles.containerAvatar}
                onPress={() => choosePhoto('picture')}>
                <FastImage
                  source={{
                    uri: dataGroup.picture,
                    priority: FastImage.priority.high,
                  }}
                  style={styles.imageAvatar}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </TouchableOpacity>
              <View style={styles.containerTextUserInfo}>
                <Text style={styles.name}>{dataGroup.name}</Text>
                <Text style={styles.role}>
                  {`${dataGroup.membersCount} ${
                    dataGroup.membersCount > 1 ? 'miembros' : 'miembro'
                  }`}
                </Text>
              </View>
            </View>
            {dataGroup.description && (
              <View style={styles.containerDescription}>
                <Text style={styles.textDescription}>
                  {dataGroup.description}
                </Text>
              </View>
            )}
          </View>
        }
        renderItem={({item, index}) => (
          <Publication
            key={item.id}
            id={index + 1}
            length={dataGroupPublications.length}
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
        keyExtractor={item => item.id}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        ListFooterComponent={() =>
          haveMorePublications ? (
            <View style={styles.loaderStyle}>
              <ActivityIndicator size="large" color="#2A9DD8" />
            </View>
          ) : (
            <View>
              <Text style={styles.textNoMorePublications}>
                No pudimos encontrar más publicaciones
              </Text>
            </View>
          )
        }
        onEndReached={() => haveMorePublications && loadMorePublications()}
        onEndReachedThreshold={0}
      />
      {modalVisible && (
        <Modal
          photoUrl={modalConfig?.photoUrl}
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
  marginRight: {
    marginRight: 5,
  },
  marginLeft: {
    marginLeft: 5,
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
  containerDescription: {
    paddingHorizontal: '5%',
    paddingVertical: 10,
    position: 'relative',
    top: -15,
  },
  textDescription: {
    textAlign: 'justify',
    color: '#555555',
    fontSize: 14,
  },
  textNoContainPublications: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  loaderStyle: {
    marginVertical: 10,
  },
  textNoMorePublications: {
    textAlign: 'center',
    paddingVertical: 10,
    backgroundColor: '#2A9DD8',
    color: 'white',
  },
});

export default GroupScreen;
