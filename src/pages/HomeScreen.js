import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../../global/contexts/AuthContext';
import Publication from '../components/Publication';
import NavBar from '../components/NavBar';

function HomeScreen() {
  let [showNavBar, setShowNavBar] = useState(false);

  return (
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
    // flex: 1,
    backgroundColor: '#fff',
  },
  navigate: {
    // flex: 1,
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
});

export default HomeScreen;
