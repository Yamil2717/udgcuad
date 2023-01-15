import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  Alert,
  RefreshControl,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Navbar from '../../components/Navbar/Navbar';
import Spinner from '../../components/Spinner';
import {AuthContext} from '../../contexts/AuthContext';
import {AxiosContext} from '../../contexts/AxiosContext';
import Moment from 'moment';
import ES from 'moment/locale/es';
import {
  MentionInput,
  replaceMentionValues,
} from 'react-native-controlled-mentions';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Comments from '../../components/Comments';
import Modal from '../../components/Modal';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

const {width, height} = Dimensions.get('window');

function PublicationByID({route, navigation}) {
  Moment.updateLocale('es', ES);
  let {id} = route.params;
  let [loading, setLoading] = useState(true);
  let [data, setData] = useState(null);
  let [refreshing, setRefreshing] = useState(false);
  const {authAxios} = useContext(AxiosContext);
  let authContext = useContext(AuthContext);
  let [lock, setLock] = useState(false);
  let [modalVisible, setModalVisible] = useState(false);
  let [modalConfig, setModalConfig] = useState({});
  const carouselRef = useRef(null);
  let [activeSlide, setActiveSlide] = useState(0);
  const keyboardFlatListRef = useRef(null);

  useEffect(() => {
    getDataPost();
  }, []);

  async function getDataPost() {
    await authAxios
      .get(`/publication/${id}`)
      .then(resultData => {
        setData({...resultData});
        setLoading(false);
      })
      .catch(() => {
        Alert.alert(
          'Voces',
          'ha ocurrido un error no sé pudo obtener la información de está publicación',
        );
        setData(null);
        setLoading(false);
      });
  }

  async function getPublicationAgain() {
    setRefreshing(true);
    await authAxios
      .get(`/publication/${id}`)
      .then(resultData => {
        setData({...resultData});
        setLoading(false);
        setRefreshing(false);
      })
      .catch(() => {
        Alert.alert(
          'Voces',
          'ha ocurrido un error no sé pudo obtener la información de está publicación',
        );
        setLoading(false);
        setRefreshing(false);
      });
  }

  function addCommentCounter() {
    setLock(true);
    let tempDataPublication = {...data};
    tempDataPublication.commentCount += 1;
    setData(tempDataPublication);
    setLock(false);
  }

  async function addReactionCounter(action) {
    setLock(true);
    let tempDataPublication = {...data};
    let reaction = {};
    if (tempDataPublication.reaction.action === action) {
      switch (action) {
        case 1:
          tempDataPublication.likePositive -= 2;
          break;
        case 2:
          tempDataPublication.likeNeutral -= 1;
          break;
        case 3:
          tempDataPublication.likeNegative -= 1;
          break;
      }
      reaction = {action: 0, liked: false};
    } else if (tempDataPublication.reaction.action === 0) {
      switch (action) {
        case 1:
          tempDataPublication.likePositive += 2;
          break;
        case 2:
          tempDataPublication.likeNeutral += 1;
          break;
        case 3:
          tempDataPublication.likeNegative += 1;
          break;
      }
      reaction = {action, liked: true};
    } else {
      switch (action) {
        case 1:
          switch (tempDataPublication.reaction.action) {
            case 1:
              tempDataPublication.likePositive -= 2;
              break;
            case 2:
              tempDataPublication.likeNeutral -= 1;
              break;
            case 3:
              tempDataPublication.likeNegative -= 1;
              break;
          }
          tempDataPublication.likePositive += 2;
          break;
        case 2:
          switch (tempDataPublication.reaction.action) {
            case 1:
              tempDataPublication.likePositive -= 2;
              break;
            case 2:
              tempDataPublication.likeNeutral -= 1;
              break;
            case 3:
              tempDataPublication.likeNegative -= 1;
              break;
          }
          tempDataPublication.likeNeutral += 1;
          break;
        case 3:
          switch (tempDataPublication.reaction.action) {
            case 1:
              tempDataPublication.likePositive -= 2;
              break;
            case 2:
              tempDataPublication.likeNeutral -= 1;
              break;
            case 3:
              tempDataPublication.likeNegative -= 1;
              break;
          }
          tempDataPublication.likeNegative += 1;
          break;
      }
      reaction = {action, liked: true};
    }
    tempDataPublication.reaction = reaction;
    setLock(false);
    setData({...tempDataPublication});
  }

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  function _scrollToInput(reactNode) {
    if (reactNode) {
      keyboardFlatListRef.current.scrollToFocusedInput(reactNode);
    } else {
      keyboardFlatListRef.current.scrollToEnd();
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <SafeAreaView style={{height: '100%', flex: 1}}>
      <View style={styles.containerPublications}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 64.7}
          style={{flex: 1}}>
          <Navbar navigation={navigation} />
          {!data ? (
            <ScrollView
              refreshControl={
                <RefreshControl
                  colors={['#2A9DD8', '#2A9DD8']}
                  refreshing={refreshing}
                  onRefresh={getPublicationAgain}
                />
              }>
              <Text style={styles.textNoContainPublications}>
                Algo falló y no sé pudo obtener la información de la
                publicación.
              </Text>
            </ScrollView>
          ) : (
            <KeyboardAwareFlatList
              ref={keyboardFlatListRef}
              refreshControl={
                <RefreshControl
                  colors={['#2A9DD8', '#2A9DD8']}
                  refreshing={refreshing}
                  onRefresh={getPublicationAgain}
                />
              }
              data={[]}
              ListEmptyComponent={
                <View>
                  <View style={styles.subContainer}>
                    <View style={styles.groupData}>
                      <View style={styles.flexDirectionRow}>
                        <TouchableWithoutFeedback
                          onPress={() =>
                            navigation.navigate('Group', {id: data.group.id})
                          }>
                          <FastImage
                            source={{
                              uri: data.group.picture,
                              priority: FastImage.priority.high,
                            }}
                            style={styles.imageGroup}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </TouchableWithoutFeedback>
                        <View style={styles.textsGroup}>
                          <TouchableWithoutFeedback
                            onPress={() =>
                              navigation.navigate('Group', {
                                id: data.group.id,
                              })
                            }>
                            <Text style={styles.nameGroup} numberOfLines={1}>
                              {data.group.name}
                            </Text>
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback
                            onPress={() =>
                              navigation.navigate('Profile', {
                                id: data.ownerID,
                              })
                            }>
                            <Text style={styles.username} numberOfLines={1}>
                              @{data.user.name}
                            </Text>
                          </TouchableWithoutFeedback>
                        </View>
                      </View>
                      <View style={styles.buttonGroup}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Group', {id: data.group.id})
                          }>
                          <Text
                            style={[
                              authContext.dataUser.groups[data.group.id]
                                ? styles.buttonGroupMember
                                : styles.buttonGroupNoMember,
                            ]}>
                            {authContext.dataUser.groups[data.group.id]
                              ? 'Tu grupo'
                              : 'Unirse'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View>
                      {data.pictures && data.pictures.length > 0 && (
                        <View style={styles.carousel}>
                          <Carousel
                            ref={carouselRef}
                            sliderWidth={width}
                            sliderHeight={width}
                            itemWidth={width}
                            data={data.pictures}
                            hasParallaxImages={true}
                            renderItem={({item, index}, parallaxProps) => (
                              <TouchableOpacity
                                activeOpacity={1}
                                style={styles.containerParallaxImage}
                                onPress={() => {
                                  setModalConfig({
                                    photoUrl: item,
                                  });
                                  setModalVisible(true);
                                }}>
                                <ParallaxImage
                                  key={index}
                                  source={{uri: item}}
                                  containerStyle={
                                    styles.subContainerParallaxImage
                                  }
                                  parallaxFactor={0.4}
                                  style={styles.parallaxImage}
                                  {...parallaxProps}
                                />
                              </TouchableOpacity>
                            )}
                            onSnapToItem={index => setActiveSlide(index)}
                          />
                          <View style={styles.paginationCarousel}>
                            <Pagination
                              carouselRef={carouselRef}
                              dotsLength={data.pictures.length}
                              activeDotIndex={activeSlide}
                              containerStyle={styles.containerPaginationImage}
                              dotStyle={styles.dotPaginationImage}
                              //inactiveDotStyle={}
                              inactiveDotOpacity={0.4}
                              inactiveDotScale={0.6}
                              tappableDots={true}
                            />
                          </View>
                        </View>
                      )}
                      <View style={styles.descriptionContainer}>
                        <View>
                          <Text style={styles.titleText}>{data.title}</Text>
                          {data.description && (
                            <MentionInput
                              value={replaceMentionValues(
                                data.description,
                                ({name}) => `@${name}`,
                              )}
                              style={styles.descriptionText}
                              numberOfLines={
                                data.description.length > 150 ? 4 : null
                              }
                              editable={false}
                              partTypes={[
                                {
                                  //trigger: '@',
                                  pattern: /[@][a-z]+[\s][a-z]+/gi,
                                  allowedSpacesCount: 1,
                                  textStyle: {
                                    fontWeight: 'bold',
                                    color: '#2A9DD8',
                                  },
                                },
                                {
                                  pattern: /[#][a-z0-9_]+/gi,
                                  allowedSpacesCount: 0,
                                  textStyle: {
                                    fontWeight: 'bold',
                                    color: '#2A9DD8',
                                  },
                                },
                              ]}
                            />
                          )}
                        </View>
                        <Text style={styles.textTime} numberOfLines={1}>
                          {Moment(data.createdAt).startOf('minute').fromNow()}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.reactionsContainer}>
                      <View style={styles.reaction}>
                        <TouchableOpacity
                          onPress={() => !lock && addReactionCounter(1)}>
                          <IconFontAwesome
                            name={
                              data.reaction.liked && data.reaction.action === 1
                                ? 'circle'
                                : 'circle-thin'
                            }
                            size={30}
                            color="#30D34B"
                          />
                        </TouchableOpacity>
                        <Text style={styles.semaphoreNumber}>
                          {data.likePositive}
                        </Text>
                      </View>
                      <View style={styles.reaction}>
                        <TouchableOpacity
                          onPress={() => !lock && addReactionCounter(2)}>
                          <IconFontAwesome
                            name={
                              data.reaction.liked && data.reaction.action === 2
                                ? 'circle'
                                : 'circle-thin'
                            }
                            size={30}
                            color="#FFBD12"
                          />
                        </TouchableOpacity>
                        <Text style={styles.semaphoreNumber}>
                          {data.likeNeutral}
                        </Text>
                      </View>
                      <View style={styles.reaction}>
                        <TouchableOpacity
                          onPress={() => !lock && addReactionCounter(3)}>
                          <IconFontAwesome
                            name={
                              data.reaction.liked && data.reaction.action === 3
                                ? 'circle'
                                : 'circle-thin'
                            }
                            size={30}
                            color="#EB4237"
                          />
                        </TouchableOpacity>
                        <Text style={styles.semaphoreNumber}>
                          {data.likeNegative}
                        </Text>
                      </View>
                      <IconFeather
                        name="message-circle"
                        size={30}
                        color="#828282"
                      />
                      <Text style={styles.semaphoreNumber}>
                        {data.commentCount}
                      </Text>
                      <View style={styles.share}>
                        <IconEntypo name="share" size={20} color="#828282" />
                      </View>
                      <View style={styles.bookmark}>
                        <IconFeather
                          name="bookmark"
                          size={20}
                          color="#2A9DD8"
                        />
                      </View>
                    </View>
                  </View>
                  <Comments
                    idPublication={data.id}
                    addCommentCounter={addCommentCounter}
                    _scrollToInput={_scrollToInput}
                    navigation={navigation}
                  />
                  {modalVisible && (
                    <Modal
                      photoUrl={modalConfig?.photoUrl}
                      modalVisible={modalVisible}
                      setModalVisible={setModalVisible}
                    />
                  )}
                </View>
              }
            />
          )}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: width,
    maxWidth: width,
    position: 'relative',
  },
  subContainer: {
    backgroundColor: 'white',
  },
  containerPublications: {
    height: height,
  },
  textNoContainPublications: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  groupData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    position: 'relative',
    backgroundColor: 'white',
  },
  flexDirectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageGroup: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    marginLeft: 25,
    alignSelf: 'flex-start',
  },
  textsGroup: {
    marginLeft: 20,
    maxWidth: width / 2.25,
  },
  nameGroup: {
    fontSize: 16,
    color: '#2A9DD8',
    fontWeight: '600',
    lineHeight: 16,
    width: '100%',
  },
  username: {
    color: '#828282',
    fontSize: 14,
    lineHeight: 14,
    width: '100%',
  },
  buttonGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  buttonGroupMember: {
    backgroundColor: '#2A9DD8',
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontSize: 14,
    color: 'white',
    borderRadius: 24,
    borderColor: '#2A9DD8',
    borderWidth: 1,
  },
  buttonGroupNoMember: {
    backgroundColor: 'transparent',
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontSize: 14,
    color: '#2A9DD8',
    borderRadius: 24,
    borderColor: '#2A9DD8',
    borderWidth: 1,
  },
  textTime: {
    color: '#828282',
    fontSize: 13,
  },
  descriptionContainer: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#F5F5F5',
  },
  titleText: {
    fontWeight: '600',
    fontSize: 16,
  },
  descriptionText: {
    height: 'auto',
    fontSize: 14,
    color: '#828282',
    textAlign: 'justify',
    margin: 0,
    padding: 0,
    border: 'none',
  },
  carousel: {
    position: 'relative',
  },
  containerParallaxImage: {
    width: width,
    height: width,
  },
  subContainerParallaxImage: {
    flex: 1,
    marginBottom: 0,
    backgroundColor: 'white',
    borderRadius: 0,
  },
  parallaxImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  paginationCarousel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 2,
    zIndex: 777,
  },
  containerPaginationImage: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingVertical: 10,
  },
  dotPaginationImage: {
    width: 10,
    height: 10,
    borderRadius: 5,
    elevation: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  reactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  semaphoreNumber: {
    color: '#828282',
    marginStart: 5,
    fontSize: 16,
  },
  reaction: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  share: {
    marginHorizontal: 20,
  },
  bookmark: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 50,
  },
});

export default PublicationByID;
