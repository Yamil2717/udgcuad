import React, {useContext} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {height} = Dimensions.get('window');
function NavBar({setShowNavBar, navigation}) {
  let authContext = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => setShowNavBar(false)}>
        <View style={styles.containerClose}>
          <IconIonicons
            name="md-close-circle-outline"
            color="#2A9DD8"
            size={22}
            style={styles.iconClose}
          />
          <Text style={styles.textClose}>Cerrar</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.textTitle}>Tus comunidades</Text>

      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('crear comunidad')}>
          <IconIonicons
            name="ios-add-circle-outline"
            color="#2A9DD8"
            size={26}
            style={styles.iconButton}
          />
          <Text style={styles.textButton}>Crear comunidad</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CreatePublication')}>
          <IconMaterialIcons
            name="post-add"
            color="#2A9DD8"
            size={26}
            style={styles.iconButton}
          />
          <Text style={styles.textButton}>Crear publicación</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerLogout}>
        <TouchableOpacity
          style={styles.logout}
          onPress={() => authContext.logout()}>
          <Text style={styles.textLogout}>Cerrar sesión</Text>
          <IconFeather
            name="log-out"
            color="#699DB8"
            size={22}
            style={styles.iconLogout}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width: '78.5%',
    height: height,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1000,
    paddingBottom: '10%',
  },
  containerClose: {
    marginVertical: 10,
    marginHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconClose: {
    color: '#164578',
    alignSelf: 'center',
  },
  textClose: {
    fontSize: 16,
    color: '#164578',
    marginLeft: 5,
  },
  textTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#828282',
    textAlign: 'center',
  },
  containerButton: {
    alignItems: 'center',
    marginVertical: 5,
  },
  button: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 2.5,
    paddingHorizontal: 5,
    borderColor: '#2A9DD8',
    borderWidth: 2,
    borderRadius: 24,
  },
  iconButton: {
    marginHorizontal: 2.5,
  },
  textButton: {
    fontSize: 16,
    color: '#2A9DD8',
  },
  containerLogout: {
    position: 'absolute',
    bottom: '2.5%',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logout: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogout: {
    color: '#699DB8',
    fontSize: 16,
  },
  iconLogout: {
    marginLeft: 15,
  },
});
export default NavBar;
