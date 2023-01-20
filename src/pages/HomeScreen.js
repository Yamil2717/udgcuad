import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import {AxiosContext} from '../contexts/AxiosContext';
import Publication from '../components/Publication';
import Navbar from '../components/Navbar/Navbar';
import Spinner from '../components/Spinner';
import NavigationScreens from '../components/NavigationScreens';

const {width, height} = Dimensions.get('window');
function HomeScreen({navigation}) {
  let [loading, setLoading] = useState(true);
  let [dataPublication, setDataPublication] = useState([]);
  let [refreshing, setRefreshing] = useState(false);
  let [currentPage, setCurrentPage] = useState(0);
  let [haveMorePublications, setHaveMorePublications] = useState(true);
  const flatListRef = useRef(null);

  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);

  useEffect(() => {
    getDataUser();
    getDataPublications();
  }, []);

  async function getDataUser() {
    await authAxios
      .get('/user')
      .then(userData => {
        authContext.setDataUser({...userData});
        setLoading(false);
      })
      .catch(err => {
        console.error(err?.response?.data?.message || err.message);
        authContext.logout();
      });
    await authAxios
      .get('/myGroups')
      .then(data => authContext.setDataGroups(data))
      .catch(() => authContext.setDataGroups([]));
  }

  async function getDataPublications() {
    await authAxios
      .get(`/publications/home/${currentPage}`)
      .then(data => setDataPublication([...data]))
      .catch(() => setDataPublication([]));
  }

  const refreshPublications = useCallback(async () => {
    setRefreshing(true);
    await authAxios
      .get('/publications/home/1')
      .then(data => {
        setDataPublication([...data]);
        setRefreshing(false);
      })
      .catch(() => {
        setDataPublication([]);
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    getMorePublications();
  }, [currentPage]);

  async function getMorePublications() {
    await authAxios
      .get(`/publications/home/${currentPage}`)
      .then(data => setDataPublication([...dataPublication, ...data]))
      .catch(() => setHaveMorePublications(false));
  }

  async function loadMorePublications() {
    setCurrentPage(currentPage + 15);
  }

  function addCommentCounter(indexPublication) {
    let tempDataPublication = [...dataPublication];
    tempDataPublication[indexPublication].commentCount =
      tempDataPublication[indexPublication].commentCount + 1;
    setDataPublication(tempDataPublication);
  }

  async function addReactionCounter(indexPublication, action) {
    let tempDataPublication = [...dataPublication];
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
    setDataPublication([...tempDataPublication]);
  }

  return loading ? (
    <Spinner />
  ) : (
    <SafeAreaView style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={styles.containerPublications}>
        {dataPublication.length <= 0 ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                colors={['#2A9DD8', '#2A9DD8']}
                refreshing={refreshing}
                onRefresh={refreshPublications}
              />
            }>
            <Text style={styles.textNoContainPublications}>
              No se encontraron publicaciones.
            </Text>
          </ScrollView>
        ) : (
          <FlatList
            ref={flatListRef}
            data={dataPublication}
            style={styles.flatListContainer}
            refreshControl={
              <RefreshControl
                colors={['#2A9DD8', '#2A9DD8']}
                refreshing={refreshing}
                onRefresh={refreshPublications}
              />
            }
            renderItem={({item, index}) => (
              <Publication
                key={item.id}
                id={index + 1}
                length={dataPublication.length}
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
        )}
      </View>
      <View style={styles.NavigationScreensStyle}>
        <NavigationScreens navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'relative',
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
    height: height - 115.1,
    maxHeight: height - 115.1,
  },
  colorInput: {
    color: '#000000',
  },
  NavigationScreensStyle: {
    position: 'absolute',
    top: height - 50,
    left: 0,
    right: 0,
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

export default HomeScreen;
