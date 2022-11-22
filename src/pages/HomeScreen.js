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

function HomeScreen() {
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
        authContext.setDataUser({...data});
      })
      .catch(err => console.error(JSON.stringify(err)));

    setLoading(false);
  }

  return loading ? (
    <Spinner />
  ) : (
    <View style={styles.container}>
      {showNavBar && <NavBar setShowNavBar={setShowNavBar} />}
      <View style={styles.navigate}>
        <TouchableOpacity onPress={() => setShowNavBar(true)}>
          <Image
            source={require('../assets/icons/IconNav.png')}
            style={styles.IconNav}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.containerInputLogin}
          placeholder="Busca temas de tu interés"
          rightIcon={{
            type: 'font-awesome',
            name: 'search',
            color: '#045A17',
            size: 20,
          }}
          textColor={styles.colorInput}
          theme={{
            colors: {
              placeholder: 'black',
              text: 'black',
              primary: 'black',
            },
          }}
        />
        <Image
          source={require('../assets/ImgProfile.png')}
          style={styles.ImageProfile}
        />
      </View>
      <ScrollView style={styles.containerPublications}>
        <Publication />
        <Publication />
        <Publication />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  navigate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconNav: {
    width: 20,
    height: 20,
    margin: 10,
  },
  containerInputLogin: {
    width: 250,
    color: '#164578',
  },
  ImageProfile: {
    width: 50,
    height: 50,
    margin: 10,
  },
  containerPublications: {
    marginBottom: 100,
  },
  colorInput: {
    color: '#000',
  },
});

export default HomeScreen;
