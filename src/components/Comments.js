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
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconOcticons from 'react-native-vector-icons/Octicons';
import FastImage from 'react-native-fast-image';
import Moment from 'moment';
import ES from 'moment/locale/es';
import {AuthContext} from '../contexts/AuthContext';
import {AxiosContext} from '../contexts/AxiosContext';
import SubComments from './SubComments';

const {width, height} = Dimensions.get('window');

function Comments({idPublication}) {
  Moment.updateLocale('es', ES);
  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);
  let [commentInput, onChangeCommentInput] = useState('');
  let [commentsList, setCommentsList] = useState([]);
  let [lock, setLock] = useState(false);
  let [inputSubComment, setInputSubComment] = useState({
    id: {
      active: false,
    },
  });

  useEffect(() => {
    getAllComments();
  }, []);

  async function getAllComments() {
    authAxios
      .get(`/comments/${idPublication}`)
      .then(data => {
        setCommentsList(data);
      })
      .catch(() => {
        setCommentsList([]);
      });
  }

  async function postComment() {
    setLock(true);
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
          getAllComments();
        }
      })
      .catch(err => {
        Alert.alert('Voces error', err?.response?.data?.message || err.message);
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

  return (
    <>
      <FlatList
        data={commentsList}
        style={[commentsList.length > 0 && styles.flatListHaveComments]}
        renderItem={({item}) => (
          <View key={`_key${item.id.toString()}`}>
            <View style={styles.commentContainer}>
              <FastImage
                source={{
                  uri: item.user.avatar,
                  priority: FastImage.priority.high,
                }}
                style={styles.imageComments}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={styles.textsComments}>
                <Text style={styles.nameOwnerComment}>{item.user.name}</Text>
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
                      <IconFontAwesome
                        name="circle"
                        size={20}
                        color="#30D34B"
                      />
                      <Text style={styles.semaphoreNumber}>
                        {item.likeNegative}
                      </Text>
                    </View>
                    <View style={styles.reactionsComments}>
                      <IconFontAwesome
                        name="circle"
                        size={20}
                        color="#FFBD12"
                      />
                      <Text style={styles.semaphoreNumber}>
                        {item.likeNeutral}
                      </Text>
                    </View>
                    <View style={styles.reactionsComments}>
                      <IconFontAwesome
                        name="circle"
                        size={20}
                        color="#EB4237"
                      />
                      <Text style={styles.semaphoreNumber}>
                        {item.likePositive}
                      </Text>
                    </View>
                  </View>
                </View>
                <SubComments
                  idPublication={idPublication}
                  idFatherComment={item.id.toString()}
                  subComments={item.subComments}
                  inputActive={
                    inputSubComment[`${item.id.toString()}`]?.active || false
                  }
                  getAllComments={getAllComments}
                />
              </View>
            </View>
          </View>
        )}
        listKey={item => `_key${item.id.toString()}`}
        keyExtractor={item => `_key${item.id.toString()}`}
        nestedScrollEnabled={true}
      />
      <View style={styles.containerCommentInput}>
        <TextInput
          placeholder="Comentar"
          style={styles.input}
          value={commentInput}
          onChangeText={onChangeCommentInput}
        />
        <TouchableOpacity
          style={[styles.button1, lock && styles.disabled]}
          onPress={() => !lock && postComment()}>
          <Text style={styles.buttonText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  flatListHaveComments: {
    paddingTop: 10,
    paddingBottom: 5,
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
