import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../contexts/AuthContext';
const {width, height} = Dimensions.get('window');
function NavigationScreens({navigation}) {
  /* -------------------------- STATE PARA NAVIGATION -------------------------- */

  let authContext = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={styles.iconFormNormal}>
          <IconMaterialCommunityIcons
            name="home-city"
            color="#2A9DD8"
            size={28}
            style={styles.iconForm}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log('Hashtag');
          }}
          style={styles.iconFormNormal}>
          <IconFontAwesome
            name="hashtag"
            color="#2A9DD8"
            size={28}
            style={styles.iconForm}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (authContext.dataGroups.length <= 0) {
              return Alert.alert(
                'Voces',
                'No perteneces a ningún grupo.\n¡Únete a uno o crea tu propia comunidad!\n\n\nEs necesario para crear una publicación.',
              );
            }
            navigation.navigate('CreatePublication');
          }}
          style={styles.iconFormNormal}>
          <IconMaterialIcons
            name="add-circle-outline"
            color="#2A9DD8"
            size={28}
            style={styles.iconForm}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log('Chat');
          }}
          style={styles.iconFormNormal}>
          <IconFontAwesome
            name="whatsapp"
            color="#2A9DD8"
            size={28}
            style={styles.iconForm}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Notifications');
          }}
          style={styles.iconFormNormal}>
          <IconIonicons
            name="notifications"
            color="#2A9DD8"
            size={28}
            style={styles.iconForm}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: width,
    maxWidth: width,
    height: 50,
    maxHeight: 50,
  },
  subContainer: {
    backgroundColor: '#fff',
    marginHorizontal: '3.75%',
    width: '92.5%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconForm: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconFormNormal: {
    paddingVertical: 10,
  },
});

export default NavigationScreens;
