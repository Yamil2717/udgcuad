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
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Moment from 'moment';
import ES from 'moment/locale/es';
import {AuthContext} from '../contexts/AuthContext';
import {AxiosContext} from '../contexts/AxiosContext';
import {
  MentionInput,
  replaceMentionValues,
} from 'react-native-controlled-mentions';

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
}) {
  Moment.updateLocale('es', ES);
  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);
  let [lock, setLock] = useState(false);

  async function addReaction(idPublication, action) {
    setLock(true);
    await authAxios
      .post('/publication/reaction', {
        idPublication,
        ownerID: authContext.dataUser.id,
        action,
      })
      .then(data => {
        addReactionCounter(id - 1, action);
        Alert.alert('Voces', 'Has dado like correctamente a esa publicación');
        setLock(false);
      })
      .catch(err => {
        setLock(false);
        console.log(err);
      });
  }

  return (
    <SafeAreaView
      style={[styles.container, id !== length && styles.marginBottom]}>
      <View style={styles.groupData}>
        <View style={styles.flexDirectionRow}>
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
              <Text style={styles.nameGroup} numberOfLines={1}>
                {groupName}
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Profile', {id: ownerID})}>
              <Text style={styles.username} numberOfLines={1}>
                @{ownerName}
              </Text>
            </TouchableWithoutFeedback>
          </View>
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
          navigation.navigate('Publication', {id: idPost});
        }}>
        <View>
          <View style={styles.descriptionContainer}>
            <View>
              <Text style={styles.titleText}>{title}</Text>
              {description && (
                <MentionInput
                  value={replaceMentionValues(
                    description,
                    ({name}) => `@${name}`,
                  )}
                  style={styles.descriptionText}
                  numberOfLines={description.length > 150 ? 4 : null}
                  editable={false}
                  partTypes={[
                    {
                      //trigger: '@',
                      pattern: /[@][a-z]+[\s][a-z]+/gi,
                      allowedSpacesCount: 1,
                      textStyle: {fontWeight: 'bold', color: '#2A9DD8'},
                    },
                    {
                      pattern: /[#][a-z0-9_]+/gi,
                      allowedSpacesCount: 0,
                      textStyle: {fontWeight: 'bold', color: '#2A9DD8'},
                    },
                  ]}
                />
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
                  return navigation.navigate('Publication', {id: idPost});
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
          <TouchableOpacity onPress={() => !lock && addReaction(idPost, 1)}>
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
          <TouchableOpacity onPress={() => !lock && addReaction(idPost, 2)}>
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
          <TouchableOpacity onPress={() => !lock && addReaction(idPost, 3)}>
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
  marginBottom: {
    marginBottom: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2.5,
  },
  groupData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    position: 'relative',
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
    height: 'auto',
    fontSize: 14,
    color: '#828282',
    textAlign: 'justify',
    margin: 0,
    padding: 0,
    border: 'none',
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
