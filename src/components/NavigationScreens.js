import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');
function NavigationScreens({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <IconMaterialCommunityIcons
          name="home-city"
          color="#2A9DD8"
          size={28}
          style={styles.iconForm}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Home')}>
        <IconFontAwesome
          name="hashtag"
          color="#2A9DD8"
          size={28}
          style={styles.iconForm}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Home')}>
        <IconMaterialIcons
          name="add-circle-outline"
          color="#2A9DD8"
          size={28}
          style={styles.iconForm}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Home')}>
        <IconFontAwesome
          name="whatsapp"
          color="#2A9DD8"
          size={28}
          style={styles.iconForm}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <IconIonicons
          name="notifications"
          color="#2A9DD8"
          size={28}
          style={styles.iconForm}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: width,
    maxWidth: width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  iconForm: {
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NavigationScreens;
