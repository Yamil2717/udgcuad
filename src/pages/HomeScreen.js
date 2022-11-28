import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import {AxiosContext} from '../contexts/AxiosContext';
import Publication from '../components/Publication';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontisto from 'react-native-vector-icons/Fontisto';

function HomeScreen({navigation}) {
  let [showNavBar, setShowNavBar] = useState(false);
  let [loading, setLoading] = useState(true);

  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);

  useEffect(() => {
    getDataUser();
  }, []);

  async function getDataUser() {
    await authAxios
      .get('/user')
      .then(({data}) => {
        authContext.setDataUser({...data.data});
        console.log(data);
      })
      .catch(err => console.error(JSON.stringify(err)));

    setLoading(false);
  }

  return loading ? (
    <Spinner />
  ) : (
    <View style={styles.container}>
      {showNavBar && (
        <NavBar setShowNavBar={setShowNavBar} navigation={navigation} />
      )}
      <View style={styles.navigate}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => setShowNavBar(true)}>
          <IconEntypo
            name="menu"
            color="#2A9DD8"
            size={28}
            style={styles.IconNav}
          />
        </TouchableOpacity>
        <View style={styles.formsStyle}>
          <TextInput
            placeholder="Busca temas de tu interés"
            style={styles.input}
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
          <IconFontisto
            name="search"
            color="#2A9DD8"
            size={16}
            style={styles.iconForm}
          />
        </View>
        <Image
          source={{uri: authContext.dataUser.avatar}}
          style={styles.imageProfile}
        />
      </View>
      <ScrollView style={styles.containerPublications}>
        <Publication />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'relative',
  },
  navigate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  menu: {
    height: 35,
    marginRight: 10,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  formsStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    height: 35,
    borderRadius: 24,
    marginVertical: 10,
    width: 280,
  },
  iconForm: {
    width: 15,
    height: 15,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 5,
    padding: 0,
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    fontSize: 14,
    height: 35,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    paddingVertical: 5,
    paddingLeft: 15,
  },
  imageProfile: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    marginLeft: 10,
  },
  containerPublications: {},
  colorInput: {
    color: '#000000',
  },
});

export default HomeScreen;
