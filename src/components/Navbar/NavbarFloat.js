import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import {AuthContext} from '../../contexts/AuthContext';
import FastImage from 'react-native-fast-image';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const {height, width} = Dimensions.get('window');
function NavbarFloat({modalVisible, setModalVisible, navigation}) {
  let authContext = useContext(AuthContext);

  return (
    <View>
      <Modal
        animationType="slide"
        isVisible={true}
        visible={modalVisible}
        swipeDirection={'left'}
        onSwipeComplete={() => setModalVisible(!modalVisible)}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        hideModalContentWhileAnimating={true}
        style={{margin: 0}}
        propagateSwipe
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.containerClose}>
                <IconIonicons
                  name="md-close-circle-outline"
                  color="#2A9DD8"
                  size={22}
                  style={styles.iconClose}
                />
                <Text style={styles.textClose}>Cerrar</Text>
              </TouchableOpacity>
              <Text style={styles.textTitle}>Tus comunidades</Text>

              <View style={styles.containerButton}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.navigate('CreateGroup');
                  }}>
                  <IconIonicons
                    name="ios-add-circle-outline"
                    color="#2A9DD8"
                    size={26}
                    style={styles.iconButton}
                  />
                  <Text style={styles.textButton}>Crear comunidad</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.containerGroups}>
                {authContext.dataGroups?.length <= 0 ? (
                  <Text style={styles.noDataGroups}>
                    No perteneces a ningún grupo.{'\n'}¡Únete a uno o crea tu
                    propia comunidad!
                  </Text>
                ) : (
                  <FlatList
                    data={authContext.dataGroups}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.buttonGroups}
                        onPress={() => {
                          navigation.navigate('Group', {id: item.id});
                          setModalVisible(false);
                        }}>
                        <FastImage
                          source={{
                            uri: item.picture,
                            priority: FastImage.priority.normal,
                          }}
                          style={styles.imageGroups}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                        <Text style={styles.textGroups}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                    removeClippedSubviews={true}
                  />
                )}
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
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  container: {
    width: '100%',
    height: height,
    paddingRight: width * 0.2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  subContainer: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: '100%',
    height: height,
    paddingTop: 60,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    maxWidth: width - width * 0.2,
  },
  containerClose: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
  },
  iconClose: {
    color: '#164578',
    alignSelf: 'center',
  },
  textClose: {
    fontSize: 16,
    color: '#164578',
    marginLeft: 5,
    alignSelf: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 2.5,
    paddingHorizontal: '15%',
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
  containerGroups: {
    justifyContent: 'center',
    marginVertical: 5,
    height: '72.5%',
  },
  noDataGroups: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonGroups: {
    width: '80%',
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageGroups: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  textGroups: {
    fontSize: 16,
    marginLeft: 15,
    fontWeight: '600',
    color: '#828282',
  },
});
export default NavbarFloat;
