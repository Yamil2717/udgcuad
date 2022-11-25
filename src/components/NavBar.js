import React, {useContext} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';

function NavBar({setShowNavBar, navigation}) {
  let authContext = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowNavBar(false)}>
        <View style={styles.containerClose}>
          <Image
            source={require('../assets/icons/ArrowCircleDown.png')}
            style={styles.imgClose}
          />
          <Text style={styles.textClose}>Cerrar</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.textTitle}>Tus comunidades</Text>

      <Button
        title="Crear comunidad"
        buttonStyle={styles.buttonStyle}
        type="outline"
        raised
        containerStyle={styles.buttonContainerStyle}
        titleStyle={styles.buttonTitleStyle}
        onPress={() => navigation.navigate('Register')}
      />

      <Button
        title="Crear Publicacion"
        buttonStyle={styles.buttonStyle}
        type="outline"
        raised
        containerStyle={styles.buttonContainerStyle}
        titleStyle={styles.buttonTitleStyle}
        onPress={() => navigation.navigate('CreatePublication')}
      />

      <View style={styles.subContainer}>
        <Image
          source={require('../assets/ImgProfile.png')}
          containerStyle={styles.ImageProfile}
        />
        <Text style={styles.textCategory}>Ciclovías</Text>
      </View>

      <Button
        title="Cerrar sesión"
        buttonStyle={styles.buttonStyleLogout}
        type="outline"
        raised
        containerStyle={styles.buttonContainerStyle}
        titleStyle={styles.buttonTitleStyle}
        onPress={() => authContext.logout()}
      />
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
    color: '#164578',
    marginLeft: 10,
  },
  textTitle: {
    fontSize: 18,
    marginVertical: 10,
    marginLeft: '20%',
  },
  textCategory: {
    color: '#828282',
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
  buttonStyle: {
    borderColor: '#45A17C',
    borderRadius: 30,
    borderWidth: 2,
  },
  buttonStyleLogout: {
    borderColor: '#45A17C',
    borderRadius: 30,
    borderWidth: 2,
  },
  buttonContainerStyle: {
    width: 200,
    borderRadius: 30,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  buttonTitleStyle: {
    color: '#45A17C',
    marginHorizontal: 5,
    fontSize: 16,
  },
});
export default NavBar;
