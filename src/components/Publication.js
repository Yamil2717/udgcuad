import React, {useState, useEffect, useContext} from 'react';
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
  TextInput,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AxiosContext} from '../contexts/AxiosContext';
import {AuthContext} from '../contexts/AuthContext';

const {width, height} = Dimensions.get('window');

function Publication({
  id,
  length,
  idPost,
  description,
  groupID,
  groupName,
  pictureGroup,
  pictures,
  ownerName,
}) {
  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);
  let [isCommentsOpen, setIsCommentsOpen] = useState(true);
  let [commentInput, onChangeCommentInput] = useState('');
  let [commentsList, setCommentsList] = useState([]);
  let [lock, setLock] = useState(false);

  useEffect(() => {
    getAllComments();
  }, []);

  async function postComment() {
    setLock(true);
    authAxios
      .post('/comment', {
        idPost: idPost,
        comment: commentInput,
        ownerID: authContext.dataUser.id,
        ownerName: authContext.dataUser.name,
        photoUrl: authContext.dataUser.avatar,
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

  async function getAllComments() {
    authAxios
      .get(`/comments/${idPost}`)
      .then(data => {
        setCommentsList(data);
      })
      .catch(() => {
        setCommentsList([]);
      });
  }

  return (
    <SafeAreaView
      style={[styles.container, id !== length && styles.marginBottom]}>
      <View style={styles.groupData}>
        <FastImage
          source={{
            uri: pictureGroup,
            priority: FastImage.priority.high,
          }}
          style={styles.imageGroup}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.textsGroup}>
          <Text style={styles.nameGroup}>{groupName}</Text>
          <Text style={styles.username}>{ownerName}</Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{description}</Text>
        <View style={styles.hashtagsContainer}>
          <Text style={styles.hashtags}>#hashtagTest1</Text>
          <Text style={styles.hashtags}>#hashtagTest2</Text>
          <Text style={styles.hashtags}>#hashtagTest3</Text>
        </View>
      </View>
      <FlatList
        data={pictures}
        style={[
          styles.imagesContainer,
          pictures.length === 3 && styles.flexDirectionColumn,
        ]}
        renderItem={({item, index}) => (
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
        )}
      />
      <View style={styles.reactionsContainer}>
        <View style={styles.reaction}>
          <IconFontAwesome name="circle" size={30} color="#30D34B" />
          <Text style={styles.semaphoreNumber}>0</Text>
        </View>
        <View style={styles.reaction}>
          <IconFontAwesome name="circle" size={30} color="#FFBD12" />
          <Text style={styles.semaphoreNumber}>0</Text>
        </View>
        <View style={styles.reaction}>
          <IconFontAwesome name="circle" size={30} color="#EB4237" />
          <Text style={styles.semaphoreNumber}>0</Text>
        </View>
        <TouchableOpacity
          style={styles.reaction}
          onPress={() => {
            setIsCommentsOpen(!isCommentsOpen);
            if (!isCommentsOpen) {
              getAllComments();
            }
          }}>
          <IconFeather name="message-circle" size={30} color="#828282" />
          <Text style={styles.semaphoreNumber}>0</Text>
        </TouchableOpacity>
        <View style={styles.share}>
          <IconEntypo name="share" size={20} color="#828282" />
        </View>
        <View style={styles.bookmark}>
          <IconFeather name="bookmark" size={20} color="#2A9DD8" />
        </View>
      </View>
      {isCommentsOpen && (
        <View style={{paddingTop: 10}}>
          <View>
            <FlatList
              data={commentsList}
              style={{paddingVertical: 10, paddingHorizontal: 5}}
              renderItem={({item, index}) => (
                <View
                  key={`_key${item.id.toString()}`}
                  style={styles.commentContainer}>
                  <FastImage
                    source={{
                      uri: item.photoUrl,
                      priority: FastImage.priority.high,
                    }}
                    style={styles.imageComments}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <View style={styles.textsComments}>
                    <Text style={styles.nameOwnerComment}>
                      {item.ownerName}
                    </Text>
                    <Text style={styles.descriptionComment}>
                      {item.comment}
                    </Text>
                  </View>
                </View>
              )}
              listKey={item => `_key${item.id.toString()}`}
              keyExtractor={item => `_key${item.id.toString()}`}
              nestedScrollEnabled={true}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 15,
              paddingHorizontal: 50,
              flexDirection: 'row',
            }}>
            <TextInput
              placeholder="Comentar"
              style={styles.input}
              value={commentInput}
              onChangeText={onChangeCommentInput}
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
            <TouchableOpacity
              style={[styles.button1, lock && {backgroundColor: '#ccc'}]}
              onPress={() => !lock && postComment()}>
              <Text style={styles.buttonText}>Publicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: width,
    maxWidth: width,
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
  descriptionContainer: {
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#F5F5F5',
  },
  descriptionText: {
    fontSize: 14,
    color: '#828282',
    textAlign: 'justify',
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F5',
  },
  hashtags: {
    color: '#2A9DD8',
    marginRight: 5,
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
  // temporal
  imageComments: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
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
});

export default Publication;
