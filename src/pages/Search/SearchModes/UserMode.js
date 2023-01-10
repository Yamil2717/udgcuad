import React, {useState, useEffect, useContext} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import SpinnerWithoutLogo from '../../../components/SpinnerWithoutLogo';
import {AxiosContext} from '../../../contexts/AxiosContext';

const {width, height} = Dimensions.get('window');

function UserMode({search, navigation}) {
  const {authAxios} = useContext(AxiosContext);
  let [loading, setLoading] = useState(true);
  let [usersFinds, setUsersFinds] = useState([]);

  useEffect(() => {
    getDataSearch();
  }, []);

  async function getDataSearch() {
    await authAxios
      .post('/user/search', {search})
      .then(data => {
        setUsersFinds([...data]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err?.response?.data?.message || err.message);
        Alert.alert('Voces', err?.response?.data?.message || err.message);
      });
  }

  return loading ? (
    <SpinnerWithoutLogo />
  ) : (
    <View style={styles.containerFlatList}>
      <FlatList
        data={usersFinds}
        renderItem={({item}) => (
          <TouchableOpacity
            key={`_key${item.id.toString()}`}
            onPress={() => navigation.navigate('Profile', {id: item.id})}
            style={styles.containerUser}>
            <FastImage
              source={{
                uri: item.avatar,
                priority: FastImage.priority.normal,
              }}
              style={styles.avatar}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        listKey={item => `_key${item.id.toString()}`}
        keyExtractor={item => `_key${item.id.toString()}`}
        ListEmptyComponent={() => (
          <View style={styles.noFound}>
            <Text style={styles.noFoundText}>
              Lo sentimos no pudimos encontrar a ningún usuario que contenga en
              su nombre "<Text style={styles.noFoundSearch}>{search}</Text>"
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerFlatList: {
    height: height - 96.4,
    paddingVertical: 10,
    backgroundColor: '#F8F8F8',
  },
  containerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '400',
    alignSelf: 'center',
    width: '80%',
  },
  noFound: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  noFoundText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  noFoundSearch: {
    color: '#2A9DD8',
  },
});

export default UserMode;
