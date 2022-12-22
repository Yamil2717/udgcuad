import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');
function NavigationScreens({navigation}) {
  /* -------------------------- STATE PARA NAVIGATION -------------------------- */

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <View style={styles.iconFormNormal}>
          <IconMaterialCommunityIcons
            name="home-city"
            color="#2A9DD8"
            size={28}
            style={styles.iconForm}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          console.log('Hashtag');
        }}>
        <View style={styles.iconFormNormal}>
          <IconFontAwesome
            name="hashtag"
            color="#2A9DD8"
            size={28}
            style={styles.iconForm}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CreatePublication');
        }}>
        <View style={styles.iconFormNormal}>
          <IconMaterialIcons
            name="add-circle-outline"
            color="#2A9DD8"
            size={28}
            style={styles.iconForm}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          console.log('Chat');
        }}>
        <View style={styles.iconFormNormal}>
          <IconFontAwesome
            name="whatsapp"
            color="#2A9DD8"
            size={28}
            style={styles.iconForm}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Notifications');
        }}>
        <View style={styles.iconFormNormal}>
          <IconIonicons
            name="notifications"
            color="#2A9DD8"
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
    minWidth: width,
    height: 50,
    maxHeight: 50,
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
  iconFormNormal: {
    paddingVertical: 10,
  },
});

export default NavigationScreens;
