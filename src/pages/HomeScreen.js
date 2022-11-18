import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import {Image, Input, Button, ButtonGroup, withTheme, Card} from 'react-native';
import {AuthContext} from '../../global/contexts/AuthContext';
import Publication from '../components/Publication';
import NavBar from '../components/NavBar';

function HomeScreen() {
  let [showNavBar, setShowNavBar] = useState(false);

  return (
    <View style={styles.container}>
      {showNavBar && <NavBar setShowNavBar={setShowNavBar} />}
      <View style={styles.navigate}>
        <Image
          source={require('../assets/icons/IconNav.png')}
          containerStyle={styles.IconNav}
          onPress={() => setShowNavBar(true)}
        />
        <Input
          containerStyle={styles.containerInputLogin}
          placeholder="Busca temas de tu interés"
          rightIcon={{
            type: 'font-awesome',
            name: 'search',
            color: '#045A17',
            size: 20,
          }}
          // onChangeText={(value) => setState({ comment: value })}
        />
        <Image
          source={require('../assets/ImgProfile.png')}
          containerStyle={styles.ImageProfile}
        />
      </View>
      <ScrollView>
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
    width: 260,
  },
  ImageProfile: {
    width: 50,
    height: 50,
    margin: 10,
  },
});

export default HomeScreen;
