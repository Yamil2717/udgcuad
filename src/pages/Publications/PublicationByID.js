import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Alert,
  RefreshControl,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import Navbar from '../../components/Navbar/Navbar';
import Publication from '../../components/Publication';
import Spinner from '../../components/Spinner';
import {AxiosContext} from '../../contexts/AxiosContext';

const {width, height} = Dimensions.get('window');

function PublicationByID({route, navigation}) {
  let {id} = route.params;
  let [loading, setLoading] = useState(true);
  let [dataPost, setDataPost] = useState([]);
  let [refreshing, setRefreshing] = useState(false);
  const {authAxios} = useContext(AxiosContext);

  useEffect(() => {
    getDataPost();
  }, []);

  async function getDataPost() {
    await authAxios
      .get(`/publication/${id}`)
      .then(data => {
        setDataPost([data]);
        setLoading(false);
      })
      .catch(() => {
        Alert.alert(
          'Voces',
          'ha ocurrido un error no sé pudo obtener la información de está publicación',
        );
        setDataPost([]);
        setLoading(false);
      });
  }

  async function getPublicationAgain() {
    setRefreshing(true);
    await authAxios
      .get(`/publication/${id}`)
      .then(data => {
        setDataPost([data]);
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

  function addCommentCounter(indexPublication) {
    let tempDataPublication = [...dataPost];
    tempDataPublication[indexPublication].commentCount =
      tempDataPublication[indexPublication].commentCount + 1;
    setDataPost(tempDataPublication);
  }

  async function addReactionCounter(indexPublication, action) {
    let tempDataPublication = [...dataPost];
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
    setDataPost([...tempDataPublication]);
  }

  return loading ? (
    <Spinner />
  ) : (
    <View>
      <Navbar navigation={navigation} />
      <View style={styles.containerPublications}>
        {dataPost.length <= 0 ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                colors={['#2A9DD8', '#2A9DD8']}
                refreshing={refreshing}
                onRefresh={getPublicationAgain}
              />
            }>
            <Text style={styles.textNoContainPublications}>
              Algo falló y no sé pudo obtener la información de la publicación.
            </Text>
          </ScrollView>
        ) : (
          <FlatList
            data={dataPost}
            style={styles.flatListContainer}
            refreshControl={
              <RefreshControl
                colors={['#2A9DD8', '#2A9DD8']}
                refreshing={refreshing}
                onRefresh={getPublicationAgain}
              />
            }
            renderItem={({item, index}) => (
              <Publication
                key={item.id}
                id={index + 1}
                length={dataPost.length}
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
                showComments={true}
              />
            )}
            removeClippedSubviews={true}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'relative',
    minHeight: height,
  },
  containerPublications: {
    height: height,
  },
  textNoContainPublications: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  flatListContainer: {
    height: height - 65.1,
    maxHeight: height - 65.1,
  },
});

export default PublicationByID;
