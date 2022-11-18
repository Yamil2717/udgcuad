import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Image, Input, Button, ButtonGroup, withTheme, Card} from 'react-native';

function NavBar({setShowNavBar}) {
  return (
    <View style={styles.container}>
      <View style={styles.containerClose}>
        <Image
          source={require('../assets/icons/ArrowCircleDown.png')}
          style={styles.imgClose}
          onPress={() => setShowNavBar(false)}
        />
        <Text style={styles.textClose} onPress={() => setShowNavBar(false)}>
          Cerrar
        </Text>
      </View>

      <Text style={styles.textTitle}>Tus comunidades</Text>

      <Button
        title="Crear comunidad"
        buttonStyle={{
          borderColor: '#45A17C',
          borderRadius: 30,
          borderWidth: 2,
        }}
        type="outline"
        raised
        containerStyle={{
          width: 200,
          borderRadius: 30,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{
          color: '#45A17C',
          marginHorizontal: 5,
          fontSize: 16,
        }}
        onPress={() => navigation.navigate('Register')}
      />

      <View style={styles.subContainer}>
        <Image
          source={require('../assets/ImgProfile.png')}
          containerStyle={styles.ImageProfile}
        />
        <Text style={styles.textCategory}>Ciclovías</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    width: 300,
    height: '100%',
  },
  containerClose: {
    marginTop: 10,
    marginLeft: '70%',
    display: 'flex',
    flexDirection: 'row',
  },
  imgClose: {
    width: 20,
    height: 20,
  },
  textClose: {
    fontSize: 16,
    color: '#96B1A6',
    marginLeft: 10,
  },
  textTitle: {
    fontSize: 18,
    marginVertical: 10,
    marginLeft: '20%',
  },
  textCategory: {
    fontSize: 18,
    marginVertical: 10,
    marginLeft: 20,
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '20%',
    marginVertical: 15,
  },
  ImageProfile: {
    width: 50,
    height: 50,
  },
});
export default NavBar;
