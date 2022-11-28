import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import NavigationPublication from './NavigationPublication';
import MapView, {Marker} from 'react-native-maps';
import Spinner from '../../../components/Spinner';

import IconsEntypo from 'react-native-vector-icons/Entypo';
import IconsMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconsFoundation from 'react-native-vector-icons/Foundation';
import IconFontisto from 'react-native-vector-icons/Fontisto';

function CreatePublicationStepTwo({step, onChangeStep}) {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationPublication
        valueScreen={step}
        previousScreenOnPress={onChangeStep}
        afterScreenOnPress={onChangeStep}
        incrementOnPress={1}
        // createUser={createUser}
      />
      <ScrollView>
        <View style={styles.formsStyle}>
          <TextInput
            placeholder="Busca temas de tu interés"
            style={styles.input}
            textColor={styles.colorInput}
            theme={{
              colors: {
                placeholder: '#000000',
                text: '#000000',
                primary: '#000000',
              },
            }}
            selectionColor="#000000"
            accessibilityIgnoresInvertColors={true}
          />
          <IconFontisto
            name="search"
            color="#2A9DD8"
            size={16}
            style={styles.iconForm}
          />
        </View>

        <View style={styles.containerSec}>
          <View style={styles.listStyle}>
            <IconsEntypo
              name="image-inverted"
              color="#2A9DD8"
              size={35}
              style={styles.iconCreatePublication}
            />
            <Text style={styles.textCreatePublication}>Imagen</Text>
          </View>

          <View style={styles.listStyle}>
            <IconsEntypo
              name="video"
              color="#2A9DD8"
              size={35}
              style={styles.iconCreatePublication}
            />
            <Text style={styles.textCreatePublication}>Video</Text>
          </View>

          <View style={styles.listStyle}>
            <IconsMaterial
              name="text-recognition"
              color="#2A9DD8"
              size={35}
              style={styles.iconCreatePublication}
            />
            <Text style={styles.textCreatePublication}>Texto</Text>
          </View>

          <View style={styles.listStyle}>
            <IconsEntypo
              name="link"
              color="#2A9DD8"
              size={35}
              style={styles.iconCreatePublication}
            />
            <Text style={styles.textCreatePublication}>Enlace</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  containerSec: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 30,
  },
  navigate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconNav: {
    width: 20,
    height: 20,
    margin: 10,
  },
  containerInputTitle: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    color: '#164578',
    height: 400,
    fontSize: 20,
  },
  ImageProfile: {
    width: 50,
    height: 50,
    margin: 10,
  },
  containerPublications: {
    marginBottom: 100,
  },
  colorInput: {
    color: '#000000',
  },
  listAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  iconCreatePublication: {
    marginHorizontal: 15,
  },
  textCreatePublication: {
    fontSize: 18,
  },
  formsStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    height: 35,
    borderRadius: 24,
    marginVertical: 10,
    width: 280,
  },
});

export default CreatePublicationStepTwo;
