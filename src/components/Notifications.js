import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');
import {AuthContext} from '../contexts/AuthContext';
import {AxiosContext} from '../contexts/AxiosContext';

function Notifications({
  setShowNotifacation,
  DescriptionContainer,
  ImageContainer,
}) {
  let authContext = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => setShowNotifacation(false)}>
        <View style={styles.containerClose}>
          <IconAntDesign name="closecircleo" size={20} color="#2A9DD8" />
          <Text style={styles.textCloseStyle}>Cerrar</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <Text>
          Este texto va a ser remplazado y tu no lo podras evitar, naciestes
          para desaparecer
        </Text>
        <Image
          source={{uri: authContext.dataUser.avatar}}
          style={styles.imageNotification}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width: '80%',
    borderRadius: 20,
    position: 'absolute',
    zIndex: 1000,
    padding: 20,
    marginVertical: '60%',
    marginHorizontal: '10%',
  },
  containerClose: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
  },
  textCloseStyle: {
    color: '#2A9DD8',
    marginLeft: 5,
    fontSize: 18,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginHorizontal: 40,
    marginVertical: 20
  },
  imageNotification: {
    width: 65,
    height: 65,
    borderRadius: 35 / 2,
    marginLeft: 10,
  },
});

export default Notifications;
