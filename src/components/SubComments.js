import React, {useState, useContext, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AuthContext} from '../contexts/AuthContext';
import {AxiosContext} from '../contexts/AxiosContext';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import ES from 'moment/locale/es';

const {width, height} = Dimensions.get('window');

function SubComments({
  idPublication,
  idFatherComment,
  subComments,
  inputActive,
  getAllComments,
  indexPublication,
  addCommentCounter,
  navigation,
}) {
  Moment.updateLocale('es', ES);
  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);
  let [showSubComments, setShowSubComments] = useState(false);
  let [lock, setLock] = useState(false);
  let [subCommentInput, setSubCommentInput] = useState(null);

  const refInput = useRef();

  function addSubComment() {
    setLock(true);
    if (!subCommentInput || subCommentInput.length <= 0) {
      setLock(false);
      return Alert.alert('Voces', 'Error, debe ingresar un comentario.');
    }
    if (subCommentInput.length > 280) {
      setLock(false);
      return Alert.alert(
        'Voces',
        'Solo se puede comentar un máximo de 280 caracteres.',
      );
    }
    authAxios
      .post('/comment', {
        idPublication,
        comment: subCommentInput,
        ownerID: authContext.dataUser.id,
        idFatherComment,
      })
      .then(data => {
        if (data) {
          setLock(false);
          setSubCommentInput('');
          Alert.alert(
            'Voces',
            'Tu comentario fue publicado, gracias por dar tu opinión.',
          );
          addCommentCounter(indexPublication);
          getAllComments();
        }
      })
      .catch(err => {
        Alert.alert('Voces error', err?.response?.data?.message || err.message);
        setLock(false);
      });
  }

  async function addReactionSubComments(idComment, action) {
    setLock(true);
    await authAxios
      .post('/comment/reaction', {
        idComment,
        ownerID: authContext.dataUser.id,
        action,
      })
      .then(() => {
        Alert.alert('Voces', 'Le has dado like a ese comentario exitosamente.');
        getAllComments();
        setLock(false);
      })
      .catch(err => {
        console.log(err);
        setLock(false);
      });
  }

  useEffect(() => {
    if (refInput.current && inputActive) {
      refInput.current.focus();
    }
  }, [refInput, inputActive]);

  return (
    <View>
      {!showSubComments ? (
        subComments?.length > 0 && (
          <TouchableOpacity onPress={() => setShowSubComments(true)}>
            <Text style={styles.showsSubComments}>
              Mostrar {subComments?.length}{' '}
              {subComments?.length > 1 ? 'comentarios' : 'comentario'}
            </Text>
          </TouchableOpacity>
        )
      ) : (
        <FlatList
          data={subComments}
          style={[subComments.length > 0 && styles.flatListHaveComments]}
          renderItem={({item}) => (
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
                    <Text style={styles.nameOwnerComment}>
                      {item.user.name}
                    </Text>
                  </TouchableWithoutFeedback>
                  <Text style={styles.descriptionComment}>{item.comment}</Text>

                  <View style={styles.containerReactionComments}>
                    <View style={styles.containerTimeAndReply}>
                      <Text style={styles.textTime} numberOfLines={1}>
                        {Moment(item.createdAt).startOf('minute').fromNow()}
                      </Text>
                    </View>
                    <View style={styles.reactionsCommentsContainer}>
                      <View style={styles.reactionsComments}>
                        <TouchableOpacity
                          onPress={() =>
                            !lock && addReactionSubComments(item.id, 1)
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
                            !lock && addReactionSubComments(item.id, 2)
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
                            !lock && addReactionSubComments(item.id, 3)
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
                </View>
              </View>
            </View>
          )}
          listKey={item => `_key${item.id.toString()}`}
          keyExtractor={item => `_key${item.id.toString()}`}
          nestedScrollEnabled={true}
        />
      )}
      {inputActive && (
        <>
          <View style={styles.containerCommentInput}>
            <TextInput
              ref={refInput}
              placeholder="Comentar"
              style={styles.input}
              value={subCommentInput}
              onChangeText={setSubCommentInput}
            />
            <TouchableOpacity
              style={[styles.button1, lock && styles.disabled]}
              onPress={() => !lock && addSubComment()}>
              <Text style={styles.buttonText}>Publicar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.lineBottom} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  showsSubComments: {
    marginVertical: 5,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  flatListHaveComments: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  imageComments: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
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
    maxWidth: '92.5%',
  },
  nameOwnerComment: {
    color: '#828282',
    fontSize: 14,
    fontWeight: '600',
    maxWidth: '95%',
  },
  descriptionComment: {
    color: '#828282',
    fontSize: 12,
    lineHeight: 14,
    flexShrink: 1,
    width: width - 100,
    maxWidth: '95%',
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
  lineBottom: {
    height: 2,
    width: '80%',
    marginHorizontal: '10%',
    backgroundColor: '#ccc',
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
    maxWidth: '95%',
  },
  containerTimeAndReply: {
    display: 'flex',
    flexDirection: 'row',
  },
  textTime: {
    color: '#828282',
    fontSize: 13,
    justifyContent: 'flex-start',
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

export default SubComments;
