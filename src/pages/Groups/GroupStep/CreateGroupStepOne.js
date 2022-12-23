import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import NavigationGroups from './NavigationGroups';
import IconsFeather from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';

const {height} = Dimensions.get('window');

function CreateGroupStepOne({
  step,
  onChangeStep,
  photoGroup,
  setPhotoGroup,
  name,
  setName,
  description,
  setDescription,
  createGroup,
}) {
  async function choosePhoto() {
    await launchImageLibrary(
      {
        title: 'Seleccione una fotografía',
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 1,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      response => {
        if (response.assets) {
          if (response.assets[0].fileSize > 4 * 1024 * 1024) {
            return Alert.alert(
              'Error',
              'La imagen no puede superar los 4MB, por favor escoja otra.',
            );
          } else {
            setPhotoGroup(response.assets[0]);
          }
        }
      },
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationGroups
        valueScreen={step}
        previousScreenOnPress={onChangeStep}
        incrementOnPress={1}
      />
      <ScrollView>
        <View style={styles.navigate}>
          <Text style={styles.title}>Crear una comunidad nueva</Text>
          <Text style={styles.textSubTitle}>Selecciona una imagen</Text>
          <View style={styles.containerPhoto}>
            <TouchableOpacity onPress={choosePhoto}>
              <FastImage
                source={
                  photoGroup?.uri
                    ? {uri: photoGroup.uri, priority: FastImage.priority.high}
                    : require('../../../assets/icons/ChooseImage.png')
                }
                resizeMode={FastImage.resizeMode.contain}
                style={[photoGroup?.uri ? styles.photoUser : styles.noPhoto]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.containerInputs}>
            <Text style={styles.textTitle}>Nombre o comunidad del grupo</Text>
            <View style={styles.formsStyleOne}>
              <IconsFeather
                name="users"
                color="#2A9DD8"
                size={20}
                style={styles.iconForm}
              />
              <TextInput
                placeholder="Nombre"
                style={styles.input}
                onChangeText={setName}
                value={name}
              />
            </View>
            <Text style={styles.textTitle}>Descripción</Text>
            <View style={styles.formsStyleTwo}>
              <TextInput
                placeholder="Descripción"
                style={styles.inputDescription}
                value={description}
                onChangeText={setDescription}
                multiline
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.containerButtonBottom}>
        <TouchableOpacity
          onPress={() => {
            if (!photoGroup || !name || !description) {
              return;
            }
            createGroup();
          }}>
          <Text
            style={[
              styles.textButtonBottom,
              !photoGroup || !name || !description
                ? styles.textButtonDisable
                : styles.textButtonActive,
            ]}>
            Crear
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: height,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#164578',
  },
  textSubTitle: {
    color: '#828282',
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
    margin: 0,
  },
  textTitle: {
    marginTop: 10,
    marginBottom: 5,
    color: '#828282',
    fontSize: 16,
  },
  containerPhoto: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoUser: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  containerInputs: {
    paddingHorizontal: 25,
  },
  formsStyleOne: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: 24,
    marginBottom: 5,
    height: 34,
    paddingHorizontal: 15,
  },
  input: {
    color: '#D4D4D4',
    fontSize: 16,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  formsStyleTwo: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 10,
  },
  inputDescription: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: '#D4D4D4',
    height: 90,
    maxHeight: 90,
    textAlignVertical: 'top',
  },
  noPhoto: {
    width: 100,
    height: 100,
  },
  containerButtonBottom: {
    position: 'relative',
    bottom: '12.5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonBottom: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: '15%',
  },
  textButtonDisable: {
    borderRadius: 24,
    color: '#E3E3E3',
    backgroundColor: '#F5F5F5',
  },
  textButtonActive: {
    borderRadius: 24,
    color: '#fff',
    backgroundColor: '#2A9DD8',
  },
});

export default CreateGroupStepOne;
