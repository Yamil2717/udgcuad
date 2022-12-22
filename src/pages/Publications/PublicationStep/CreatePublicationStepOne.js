import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import NavigationPublication from './NavigationPublication';
import {launchImageLibrary} from 'react-native-image-picker';
import IconsEntypo from 'react-native-vector-icons/Entypo';
import IconsMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

function CreatePublicationStepOne({
  step,
  onChangeStep,
  description,
  onChangeDescription,
  photos,
  setPhotos,
}) {
  function choosePhoto() {
    launchImageLibrary(
      {
        title: 'Seleccione una fotografía',
        mediaType: 'photo',
        selectionLimit: 4,
        quality: 1,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      response => {
        if (response.assets) {
          let tempPhotos = [];
          if (photos) {
            tempPhotos = [...photos];
          }
          if (tempPhotos.length >= 4) {
            return Alert.alert(
              'Error',
              'Solo puede subir 4 imágenes por publicación.',
            );
          }
          response.assets.map(image => {
            if (image.fileSize > 4 * 1024 * 1024) {
              return Alert.alert(
                'Error',
                'La imagen no puede superar los 4MB, por favor escoja otra.',
              );
            } else {
              tempPhotos.push(image);
            }
          });
          setPhotos([...tempPhotos]);
        }
      },
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationPublication
        valueScreen={step}
        previousScreenOnPress={onChangeStep}
        afterScreenOnPress={onChangeStep}
        incrementOnPress={1}
      />
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Título de tu publicación......"
          textAlignVertical="top"
          textColor={styles.colorInput}
          multiline={true}
          numberOfLines={4}
          value={description}
          onChangeText={onChangeDescription}
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
      </View>
      <ScrollView style={styles.containerImages} horizontal>
        {photos && photos.length > 0 && (
          <>
            {photos.map((photo, index) => {
              return (
                <TouchableOpacity key={index}>
                  <Image
                    source={{
                      uri: photo?.uri,
                    }}
                    style={styles.image}
                  />
                </TouchableOpacity>
              );
            })}
            {photos.length < 4 && (
              <TouchableOpacity onPress={() => choosePhoto()}>
                <Image
                  source={require('../../../assets/addPublication.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
      <View style={styles.containerSec}>
        <TouchableOpacity onPress={() => choosePhoto()}>
          <View style={styles.listStyle}>
            <IconsEntypo
              name="image-inverted"
              color="#2A9DD8"
              size={28}
              style={styles.iconCreatePublication}
            />
            <Text style={styles.textCreatePublication}>Imagen</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.listStyle}>
            <IconsEntypo
              name="video"
              color="#2A9DD8"
              size={28}
              style={styles.iconCreatePublication}
            />
            <Text style={styles.textCreatePublication}>Video</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.listStyle}>
            <IconsMaterial
              name="text-recognition"
              color="#2A9DD8"
              size={28}
              style={styles.iconCreatePublication}
            />
            <Text style={styles.textCreatePublication}>Texto</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.listStyle}>
            <IconsEntypo
              name="link"
              color="#2A9DD8"
              size={28}
              style={styles.iconCreatePublication}
            />
            <Text style={styles.textCreatePublication}>Enlace</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: height,
    maxHeight: height,
  },
  containerSec: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    height: '30%',
    justifyContent: 'center',
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
  containerInput: {
    height: '40%',
  },
  input: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    color: '#164578',
    height: '100%',
    fontSize: 20,
    textAlignVertical: 'top',
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
  },
  containerImages: {
    maxWidth: width,
    width: width,
    minHeight: 180,
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
    marginVertical: 5,
    marginHorizontal: 10,
  },
  iconCreatePublication: {
    marginHorizontal: 15,
  },
  textCreatePublication: {
    fontSize: 16,
  },
});

export default CreatePublicationStepOne;
