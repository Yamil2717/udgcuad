import React, {useState, useContext} from 'react';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Comments from './Comments';
import Moment from 'moment';
import ES from 'moment/locale/es';
import {AuthContext} from '../contexts/AuthContext';
import {AxiosContext} from '../contexts/AxiosContext';
import Modal from './Modal';

const {width, height} = Dimensions.get('window');

function Publication({
  id,
  length,
  idPost,
  title,
  description,
  groupID,
  groupName,
  pictureGroup,
  pictures,
  ownerID,
  ownerName,
  createdAt,
  likeNegative,
  likeNeutral,
  likePositive,
  commentCount,
  reaction,
  navigation,
  addReactionCounter,
  addCommentCounter,
  showComments,
}) {
  Moment.updateLocale('es', ES);
  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);

  let [toggleComments, setToggleComments] = useState(true);
  let [modalVisible, setModalVisible] = useState(false);
  let [modalConfig, setModalConfig] = useState({});

  async function addReaction(idPublication, action) {
    await authAxios
      .post('/publication/reaction', {
        idPublication,
        ownerID: authContext.dataUser.id,
        action,
      })
      .then(data => addReactionCounter(id - 1, action))
      .catch(err => console.log(err));
  }

  const mentionHashtagClick = text => {
    console.log('Clicked to + ' + text);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        showComments && styles.containerPublicationById,
        id !== length && styles.marginBottom,
      ]}>
      <View style={styles.groupData}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Group', {id: groupID})}>
          <FastImage
            source={{
              uri: pictureGroup,
              priority: FastImage.priority.high,
            }}
            style={styles.imageGroup}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableWithoutFeedback>
        <View style={styles.textsGroup}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Group', {id: groupID})}>
            <Text style={styles.nameGroup}>{groupName}</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Profile', {id: ownerID})}>
            <Text style={styles.username}>@{ownerName}</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Group', {id: groupID})}>
            <Text
              style={[
                authContext.dataUser.groups[groupID]
                  ? styles.buttonGroupMember
                  : styles.buttonGroupNoMember,
              ]}>
              {authContext.dataUser.groups[groupID] ? 'Tu grupo' : 'Unirse'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          if (showComments) {
            return;
          }
          navigation.navigate('Publication', {id: idPost});
        }}>
        <View>
          <View style={styles.descriptionContainer}>
            <View>
              <Text style={styles.titleText}>{title}</Text>
              {description && (
                <Text style={styles.descriptionText}>{description}</Text>
              )}
            </View>
            <Text style={styles.textTime} numberOfLines={1}>
              {Moment(createdAt).startOf('minute').fromNow()}
            </Text>
          </View>
          <FlatList
            data={pictures}
            style={[
              styles.imagesContainer,
              pictures.length === 3 && styles.flexDirectionColumn,
            ]}
            renderItem={({item, index}) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  if (!showComments) {
                    return navigation.navigate('Publication', {id: idPost});
                  }
                  setModalConfig({
                    photoUrl: item,
                  });
                  setModalVisible(true);
                }}>
                <FastImage
                  key={index}
                  source={{
                    uri: item,
                    priority: FastImage.priority.high,
                  }}
                  style={[
                    pictures.length === 1
                      ? styles.oneImage
                      : pictures.length === 2
                      ? styles.twoImages
                      : pictures.length === 4
                      ? styles.fourImages
                      : index === 0
                      ? styles.threeImages
                      : styles.threeImages2,
                  ]}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.reactionsContainer}>
        <View style={styles.reaction}>
          <TouchableOpacity onPress={() => addReaction(idPost, 1)}>
            <IconFontAwesome
              name={
                reaction.liked && reaction.action === 1
                  ? 'circle'
                  : 'circle-thin'
              }
              size={30}
              color="#30D34B"
            />
          </TouchableOpacity>
          <Text style={styles.semaphoreNumber}>{likePositive}</Text>
        </View>
        <View style={styles.reaction}>
          <TouchableOpacity onPress={() => addReaction(idPost, 2)}>
            <IconFontAwesome
              name={
                reaction.liked && reaction.action === 2
                  ? 'circle'
                  : 'circle-thin'
              }
              size={30}
              color="#FFBD12"
            />
          </TouchableOpacity>
          <Text style={styles.semaphoreNumber}>{likeNeutral}</Text>
        </View>
        <View style={styles.reaction}>
          <TouchableOpacity onPress={() => addReaction(idPost, 3)}>
            <IconFontAwesome
              name={
                reaction.liked && reaction.action === 3
                  ? 'circle'
                  : 'circle-thin'
              }
              size={30}
              color="#EB4237"
            />
          </TouchableOpacity>
          <Text style={styles.semaphoreNumber}>{likeNegative}</Text>
        </View>
        <TouchableOpacity
          style={styles.reaction}
          onPress={() => {
            if (showComments) {
              return setToggleComments(!toggleComments);
            }
            navigation.navigate('Publication', {id: idPost});
          }}>
          <IconFeather name="message-circle" size={30} color="#828282" />
          <Text style={styles.semaphoreNumber}>{commentCount}</Text>
        </TouchableOpacity>
        <View style={styles.share}>
          <IconEntypo name="share" size={20} color="#828282" />
        </View>
        <View style={styles.bookmark}>
          <IconFeather name="bookmark" size={20} color="#2A9DD8" />
        </View>
      </View>
      {showComments && toggleComments && (
        <Comments
          indexPublication={id - 1}
          idPublication={idPost}
          addCommentCounter={addCommentCounter}
          navigation={navigation}
        />
      )}
      {showComments && modalVisible && (
        <Modal
          photoUrl={modalConfig?.photoUrl}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerPublicationById: {
    minHeight: height,
  },
  container: {
    backgroundColor: '#fff',
    width: width,
    maxWidth: width,
    position: 'relative',
  },
  marginBottom: {
    marginBottom: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2.5,
  },
  groupData: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    paddingRight: '35%',
    position: 'relative',
  },
  imageGroup: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    marginLeft: 25,
  },
  textsGroup: {
    marginLeft: 20,
  },
  nameGroup: {
    fontSize: 16,
    color: '#2A9DD8',
    fontWeight: '600',
    lineHeight: 16,
  },
  username: {
    color: '#828282',
    fontSize: 14,
    lineHeight: 14,
  },
  buttonGroup: {
    position: 'absolute',
    top: 0,
    right: 5,
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#F5F5F5',
  },
  titleText: {
    fontWeight: '600',
    fontSize: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: '#828282',
    textAlign: 'justify',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flexDirectionColumn: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  oneImage: {
    width: width,
    height: 225,
  },
  twoImages: {
    width: width / 2,
    height: 225,
  },
  threeImages: {
    flexGrow: 0,
    flexShrink: 2,
    flexBasis: width,
    width: width,
    height: 225 / 2,
  },
  threeImages2: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 225 / 2,
    width: width / 2,
    height: 225 / 2,
  },
  fourImages: {
    width: width / 2,
    height: 225 / 2,
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

export default Publication;
