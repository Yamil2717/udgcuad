import React, {useContext, useState} from 'react';
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
   /* -------------------------- STATE PARA NAGIATION -------------------------- */
   let [homeScreenActive, setHomeScreenActive] = useState(false);
   let [hashtagScreenActive, setHashtagScreenActive] = useState(false);
   let [addScreenActive, setAddScreenActive] = useState(false);
   let [chatScreenActive, setChatScreenActive] = useState(false);
   let [notificationScreenActive, setNotificationScreenActive] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
          setHomeScreenActive(true);
          setNotificationScreenActive(false);
          setChatScreenActive(false);
          setHashtagScreenActive(false);
          setAddScreenActive(false);
        }}>
          <View style={
            homeScreenActive
              ? styles.iconFormactivate
              : styles.iconFormDesactivate
          }>

        <IconMaterialCommunityIcons
          name="home-city"
          color= {!homeScreenActive ? "#2A9DD8" : "#fff"}
          size={28}
          style={styles.iconForm}
          />
          </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          console.log('Hashtag');
          setHashtagScreenActive(true);
          setNotificationScreenActive(false);
          setChatScreenActive(false);
          setHomeScreenActive(false);
          setAddScreenActive(false);
        }}>
          <View style={
            hashtagScreenActive
              ? styles.iconFormactivate
              : styles.iconFormDesactivate
          }>

        <IconFontAwesome
          name="hashtag"
          color= {!hashtagScreenActive ? "#2A9DD8" : "#fff"}
          size={28}
          style={styles.iconForm}
          />
          </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CreatePublication');
          setAddScreenActive(true);
          setNotificationScreenActive(false);
          setChatScreenActive(false);
          setHashtagScreenActive(false);
          setHomeScreenActive(false);
        }}>
          <View style={
            addScreenActive
              ? styles.iconFormactivate
              : styles.iconFormDesactivate
          }>

        <IconMaterialIcons
          name="add-circle-outline"
          color= {!addScreenActive ? "#2A9DD8" : "#fff"}
          size={28}
          style={styles.iconForm}
          />
          </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          console.log('Chat');
          setChatScreenActive(true);
          setNotificationScreenActive(false);
          setHashtagScreenActive(false);
          setHomeScreenActive(false);
          setAddScreenActive(false);
        }}>
          <View style={
            chatScreenActive
              ? styles.iconFormactivate
              : styles.iconFormDesactivate
          }>

        <IconFontAwesome
          name="whatsapp"
          color= {!chatScreenActive ? "#2A9DD8" : "#fff"}
          size={28}
          style={styles.iconForm}
          />
          </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Notifications');
          setNotificationScreenActive(true);
          setChatScreenActive(false);
          setHashtagScreenActive(false);
          setHomeScreenActive(false);
          setAddScreenActive(false);
        }}>
        <View
          style={
            notificationScreenActive
              ? styles.iconFormactivate
              : styles.iconFormDesactivate
          }>
          <IconIonicons
            name="notifications"
            color= {!notificationScreenActive ? "#2A9DD8" : "#fff"}
            size={28}
            style={styles.iconForm}
          />
        </View>
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
  },
  iconForm: {
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconFormactivate: {
    backgroundColor: '#2A9DD8',
    paddingVertical: 5,
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconFormDesactivate: {
    paddingVertical: 5,
    paddingVertical: 15,
  },
});

export default NavigationScreens;
