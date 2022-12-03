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
function NavigationScreens(params) {
  return (
    <SafeAreaView style={styles.container}>
        <IconMaterialCommunityIcons
          name="home-city"
          color="#2A9DD8"
          size={16}
          style={styles.iconForm}
        />
        <IconFontAwesome
          name="hashtag"
          color="#2A9DD8"
          size={16}
          style={styles.iconForm}
        />
        <IconMaterialIcons
          name="add-circle-outline"
          color="#2A9DD8"
          size={16}
          style={styles.iconForm}
        />
        <IconFontAwesome
          name="whatsapp"
          color="#2A9DD8"
          size={16}
          style={styles.iconForm}
        />
        <IconIonicons
          name="notifications"
          color="#2A9DD8"
          size={16}
          style={styles.iconForm}
        />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: width,
    maxWidth: width,
    height: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  iconForm: {
    width: 15,
    height: 15,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 5,
    padding: 0,
  },
});

export default NavigationScreens;
