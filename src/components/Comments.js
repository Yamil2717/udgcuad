import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  findNodeHandle,
  SafeAreaView,
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconOcticons from 'react-native-vector-icons/Octicons';
import FastImage from 'react-native-fast-image';
import Moment from 'moment';
import ES from 'moment/locale/es';
import {AuthContext} from '../contexts/AuthContext';
import {AxiosContext} from '../contexts/AxiosContext';
import SubComments from './SubComments';
import SpinnerWithoutLogo from './SpinnerWithoutLogo';

const {width, height} = Dimensions.get('window');

function Comments({
  idPublication,
  addCommentCounter,
  _scrollToInput,
  navigation,
}) {
  Moment.updateLocale('es', ES);
  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);
  let [loading, setLoading] = useState(true);
  let [commentInput, onChangeCommentInput] = useState('');
  let [commentsList, setCommentsList] = useState([]);
  let [lock, setLock] = useState(false);
  let [inputSubComment, setInputSubComment] = useState({});

  useEffect(() => {
    getAllComments();
  }, []);

  async function getAllComments() {
    authAxios
      .get(`/comments/${idPublication}`)
      .then(data => {
        setCommentsList([...data]);
        setLoading(false);
      })
      .catch(() => {
        setCommentsList([]);
        setLoading(false);
      });
  }

  async function postComment() {
    setLock(true);
    if (!commentInput || commentInput.length <= 0) {
      setLock(false);
      return Alert.alert('Voces', 'Error, debe ingresar un comentario.');
    }
    if (commentInput.length > 280) {
      setLock(false);
      return Alert.alert(
        'Voces',
        'Solo se puede comentar un máximo de 280 caracteres.',
      );
    }
    authAxios
      .post('/comment', {
        idPublication,
        comment: commentInput,
        ownerID: authContext.dataUser.id,
      })
      .then(data => {
        if (data) {
          setLock(false);
          onChangeCommentInput('');
          Alert.alert(
            'Voces',
            'Tu comentario fue publicado, gracias por dar tu opinión.',
          );
          addCommentCounter();
          getAllComments();
        }
      })
      .catch(err => {
        Alert.alert('Voces error', err?.response?.data?.message || err.message);
        setLock(false);
      });
  }

  async function addReactionComment(idComment, action, index) {
    setLock(true);
    await authAxios
      .post('/comment/reaction', {
        idComment,
        ownerID: authContext.dataUser.id,
        action,
      })
      .then(async () => {
        addReactionCounter(index, action);
        Alert.alert('Voces', 'Le has dado like a ese comentario exitosamente.');
        setLock(false);
      })
      .catch(err => {
        console.log(err);
        setLock(false);
      });
  }

  function activeInputSubComment(id) {
    let tempActiveSubComment = {...inputSubComment};
    tempActiveSubComment[id] = {
      active: tempActiveSubComment[id]?.active ? false : true,
    };
    setInputSubComment(tempActiveSubComment);
  }

  async function addReactionCounter(indexComment, action) {
    let tempDataComments = [...commentsList];
    let reaction = {};
    if (tempDataComments[indexComment].reaction.action === action) {
      switch (action) {
        case 1:
          tempDataComments[indexComment].likePositive -= 2;
          break;
        case 2:
          tempDataComments[indexComment].likeNeutral -= 1;
          break;
        case 3:
          tempDataComments[indexComment].likeNegative -= 1;
          break;
      }
      reaction = {action: 0, liked: false};
    } else if (tempDataComments[indexComment].reaction.action === 0) {
      switch (action) {
        case 1:
          tempDataComments[indexComment].likePositive += 2;
          break;
        case 2:
          tempDataComments[indexComment].likeNeutral += 1;
          break;
        case 3:
          tempDataComments[indexComment].likeNegative += 1;
          break;
      }
      reaction = {action, liked: true};
    } else {
      switch (action) {
        case 1:
          switch (tempDataComments[indexComment].reaction.action) {
            case 1:
              tempDataComments[indexComment].likePositive -= 2;
              break;
            case 2:
              tempDataComments[indexComment].likeNeutral -= 1;
              break;
            case 3:
              tempDataComments[indexComment].likeNegative -= 1;
              break;
          }
          tempDataComments[indexComment].likePositive += 2;
          break;
        case 2:
          switch (tempDataComments[indexComment].reaction.action) {
            case 1:
              tempDataComments[indexComment].likePositive -= 2;
              break;
            case 2:
              tempDataComments[indexComment].likeNeutral -= 1;
              break;
            case 3:
              tempDataComments[indexComment].likeNegative -= 1;
              break;
          }
          tempDataComments[indexComment].likeNeutral += 1;
          break;
        case 3:
          switch (tempDataComments[indexComment].reaction.action) {
            case 1:
              tempDataComments[indexComment].likePositive -= 2;
              break;
            case 2:
              tempDataComments[indexComment].likeNeutral -= 1;
              break;
            case 3:
              tempDataComments[indexComment].likeNegative -= 1;
              break;
          }
          tempDataComments[indexComment].likeNegative += 1;
          break;
      }
      reaction = {action, liked: true};
    }
    tempDataComments[indexComment].reaction = reaction;
    setCommentsList([...tempDataComments]);
  }

  async function addReactionCounterSubComments(
    indexCommentFather,
    index,
    action,
  ) {
    let tempDataComments = [...commentsList];
    let reaction = {};
    if (
      tempDataComments[indexCommentFather].subComments[index].reaction
        .action === action
    ) {
      switch (action) {
        case 1:
          tempDataComments[indexCommentFather].subComments[
            index
          ].likePositive -= 2;
          break;
        case 2:
          tempDataComments[indexCommentFather].subComments[
            index
          ].likeNeutral -= 1;
          break;
        case 3:
          tempDataComments[indexCommentFather].subComments[
            index
          ].likeNegative -= 1;
          break;
      }
      reaction = {action: 0, liked: false};
    } else if (
      tempDataComments[indexCommentFather].subComments[index].reaction
        .action === 0
    ) {
      switch (action) {
        case 1:
          tempDataComments[indexCommentFather].subComments[
            index
          ].likePositive += 2;
          break;
        case 2:
          tempDataComments[indexCommentFather].subComments[
            index
          ].likeNeutral += 1;
          break;
        case 3:
          tempDataComments[indexCommentFather].subComments[
            index
          ].likeNegative += 1;
          break;
      }
      reaction = {action, liked: true};
    } else {
      switch (action) {
        case 1:
          switch (
            tempDataComments[indexCommentFather].subComments[index].reaction
              .action
          ) {
            case 1:
              tempDataComments[indexCommentFather].subComments[
                index
              ].likePositive -= 2;
              break;
            case 2:
              tempDataComments[indexCommentFather].subComments[
                index
              ].likeNeutral -= 1;
              break;
            case 3:
              tempDataComments[indexCommentFather].subComments[
                index
              ].likeNegative -= 1;
              break;
          }
          tempDataComments[indexCommentFather].subComments[
            index
          ].likePositive += 2;
          break;
        case 2:
          switch (
            tempDataComments[indexCommentFather].subComments[index].reaction
              .action
          ) {
            case 1:
              tempDataComments[indexCommentFather].subComments[
                index
              ].likePositive -= 2;
              break;
            case 2:
              tempDataComments[indexCommentFather].subComments[
                index
              ].likeNeutral -= 1;
              break;
            case 3:
              tempDataComments[indexCommentFather].subComments[
                index
              ].likeNegative -= 1;
              break;
          }
          tempDataComments[indexCommentFather].subComments[
            index
          ].likeNeutral += 1;
          break;
        case 3:
          switch (
            tempDataComments[indexCommentFather].subComments[index].reaction
              .action
          ) {
            case 1:
              tempDataComments[indexCommentFather].subComments[
                index
              ].likePositive -= 2;
              break;
            case 2:
              tempDataComments[indexCommentFather].subComments[
                index
              ].likeNeutral -= 1;
              break;
            case 3:
              tempDataComments[indexCommentFather].subComments[
                index
              ].likeNegative -= 1;
              break;
          }
          tempDataComments[indexCommentFather].subComments[
            index
          ].likeNegative += 1;
          break;
      }
      reaction = {action, liked: true};
    }
    tempDataComments[indexCommentFather].subComments[index].reaction = reaction;
    setCommentsList([...tempDataComments]);
  }

  return loading ? (
    <SpinnerWithoutLogo />
  ) : (
    <SafeAreaView>
      <FlatList
        data={commentsList}
        style={[commentsList.length > 0 && styles.flatListHaveComments]}
        renderItem={({item, index}) => (
          <View key={`_key${item.id.toString()}`}>
            <View style={styles.commentContainer}>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate('Profile', {id: item.ownerID})
                }>
                <FastImage
                  source={{
                    uri: item.user.avatar,
                    priority: FastImage.priority.high,
                  }}
                  style={styles.imageComments}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </TouchableWithoutFeedback>
              <View style={styles.textsComments}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('Profile', {id: item.ownerID})
                  }>
                  <Text style={styles.nameOwnerComment}>{item.user.name}</Text>
                </TouchableWithoutFeedback>
                <Text style={styles.descriptionComment}>{item.comment}</Text>

                <View style={styles.containerReactionComments}>
                  <View style={styles.containerTimeAndReply}>
                    <Text style={styles.textTime} numberOfLines={1}>
                      {Moment(item.createdAt).startOf('minute').fromNow()}
                    </Text>
                    <TouchableOpacity
                      style={styles.replyComments}
                      onPress={() => activeInputSubComment(item.id.toString())}>
                      <Text style={styles.textReplyComments}>Responder</Text>
                      <IconOcticons
                        name="reply"
                        size={20}
                        color="#2A9DD8"
                        style={styles.iconReplyComments}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.reactionsCommentsContainer}>
                    <View style={styles.reactionsComments}>
                      <TouchableOpacity
                        onPress={() =>
                          !lock && addReactionComment(item.id, 1, index)
                        }>
                        <IconFontAwesome
                          name={
                            item.reaction.liked && item.reaction.action === 1
                              ? 'circle'
                              : 'circle-thin'
                          }
                          size={20}
                          color="#30D34B"
                        />
                      </TouchableOpacity>
                      <Text style={styles.semaphoreNumber}>
                        {item.likePositive}
                      </Text>
                    </View>
                    <View style={styles.reactionsComments}>
                      <TouchableOpacity
                        onPress={() =>
                          !lock && addReactionComment(item.id, 2, index)
                        }>
                        <IconFontAwesome
                          name={
                            item.reaction.liked && item.reaction.action === 2
                              ? 'circle'
                              : 'circle-thin'
                          }
                          size={20}
                          color="#FFBD12"
                        />
                      </TouchableOpacity>
                      <Text style={styles.semaphoreNumber}>
                        {item.likeNeutral}
                      </Text>
                    </View>
                    <View style={styles.reactionsComments}>
                      <TouchableOpacity
                        onPress={() =>
                          !lock && addReactionComment(item.id, 3, index)
                        }>
                        <IconFontAwesome
                          name={
                            item.reaction.liked && item.reaction.action === 3
                              ? 'circle'
                              : 'circle-thin'
                          }
                          size={20}
                          color="#EB4237"
                        />
                      </TouchableOpacity>
                      <Text style={styles.semaphoreNumber}>
                        {item.likeNegative}
                      </Text>
                    </View>
                  </View>
                </View>
                <SubComments
                  idPublication={idPublication}
                  idFatherComment={item.id.toString()}
                  indexFatherComment={index}
                  subComments={item.subComments}
                  inputActive={
                    inputSubComment[`${item.id.toString()}`]?.active || false
                  }
                  addReactionCounterSubComments={addReactionCounterSubComments}
                  getAllComments={getAllComments}
                  addCommentCounter={addCommentCounter}
                  _scrollToInput={_scrollToInput}
                  navigation={navigation}
                />
              </View>
            </View>
          </View>
        )}
        listKey={item => `_key${item.id.toString()}`}
        keyExtractor={item => `_key${item.id.toString()}`}
        nestedScrollEnabled={true}
        ListFooterComponent={
          <View style={styles.containerCommentInput}>
            <TextInput
              placeholder="Comentar"
              style={styles.input}
              value={commentInput}
              onChangeText={onChangeCommentInput}
              onFocus={() => _scrollToInput()}
            />
            <TouchableOpacity
              style={[styles.button1, lock && styles.disabled]}
              onPress={() => !lock && postComment()}>
              <Text style={styles.buttonText}>Publicar</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatListHaveComments: {
    paddingTop: 10,
    paddingBottom: 0,
    paddingHorizontal: 5,
  },
  imageComments: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    alignSelf: 'flex-start',
  },
  textsComments: {
    marginLeft: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  nameOwnerComment: {
    color: '#828282',
    fontSize: 16,
    fontWeight: '600',
  },
  descriptionComment: {
    color: '#828282',
    fontSize: 14,
    lineHeight: 14,
    flexShrink: 1,
    width: width - 100,
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    fontSize: 14,
    height: 35,
    borderRadius: 24,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '60%',
  },
  button1: {
    height: 35,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderColor: '#2A9DD8',
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: 'transparent',
    marginLeft: 5,
  },
  buttonText: {
    color: '#2A9DD8',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  containerCommentInput: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 50,
    flexDirection: 'row',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  reactionComments: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  containerReactionComments: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerTimeAndReply: {
    display: 'flex',
    flexDirection: 'row',
  },
  textTime: {
    color: '#828282',
    fontSize: 13,
    width: 85,
    maxWidth: 85,
  },
  replyComments: {
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  textReplyComments: {
    color: '#2A9DD8',
  },
  iconReplyComments: {
    marginLeft: 10,
  },
  reactionsCommentsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  reactionsComments: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 5,
  },
  semaphoreNumber: {
    color: '#828282',
    marginStart: 5,
    fontSize: 16,
  },
});

export default Comments;
