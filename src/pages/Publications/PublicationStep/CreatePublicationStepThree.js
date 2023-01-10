import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import NavigationPublication from './NavigationPublication';
import {launchImageLibrary} from 'react-native-image-picker';
import IconsEntypo from 'react-native-vector-icons/Entypo';
import IconsMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import {MentionInput} from 'react-native-controlled-mentions';
import useKeyboard from '../../../tools/useKeyboard';
import {AuthContext} from '../../../contexts/AuthContext';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');

function CreatePublicationStepThree({
  step,
  onChangeStep,
  title,
  description,
  onChangeDescription,
  photos,
  setPhotos,
  groupsFormatted,
  setGroupsFormatted,
  group,
  setGroup,
}) {
  let authContext = useContext(AuthContext);
  let [open, setOpen] = useState(false);
  let [suggestions, setSuggestions] = useState([]);
  let isUseKeyboard = useKeyboard();

  function validateStep() {
    let failed = false;
    /*if (description) {
      let countCharacters = title.length + description.length;
      if (countCharacters > 280) {
        failed = true;
        return Alert.alert(
          'Voces',
          'La descripción y el titulo no pueden superar los 280 caracteres',
        );
      }
    }*/
    if (!photos && !description) {
      failed = true;
      return Alert.alert(
        'Voces',
        'Debes ingresar una descripción o seleccionar 1 fotografía como mínimo para crear una publicación.',
      );
    }
    return failed;
  }
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
        includeBase64: true,
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
            tempPhotos.push(image);
          });
          setPhotos([...tempPhotos]);
        }
      },
    );
  }

  useEffect(() => {
    setSuggestions(authContext.friends);
  }, []);

  const renderSuggestions = ({keyword, onSuggestionPress}) => {
    if (keyword == null) {
      return null;
    }

    return (
      <View style={styles.containerSuggestions}>
        <Text style={styles.titleSuggestions}>
          Selecciona entre las sugerencias:
        </Text>
        <View style={styles.paddingInternalSuggestions}>
          {suggestions.length > 0 ? (
            suggestions
              .filter(user =>
                user.name
                  .toLocaleLowerCase()
                  .includes(keyword.toLocaleLowerCase()),
              )
              .slice(0, 3)
              .map(user => (
                <Pressable
                  key={user.id}
                  onPress={() => onSuggestionPress(user)}
                  style={styles.containerSuggestion}>
                  <View style={styles.subContainerSuggestion}>
                    <FastImage
                      source={{
                        uri: user.avatar,
                        priority: FastImage.priority.high,
                      }}
                      style={styles.avatarSuggestion}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={styles.nameSuggestion}>{user.name}</Text>
                  </View>
                </Pressable>
              ))
          ) : (
            <Text style={styles.titleSuggestions}>
              No tiene amigos agregados.
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationPublication
        valueScreen={step}
        previousScreenOnPress={onChangeStep}
        afterScreenOnPress={onChangeStep}
        incrementOnPress={1}
        validateStep={validateStep}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : height}
        style={styles.keyboardContainer}>
        <View>
          <MentionInput
            value={description}
            onChange={onChangeDescription}
            style={styles.inputDescription}
            partTypes={[
              {
                trigger: '@',
                renderSuggestions,
                isBottomMentionSuggestionsRender: true,
                isInsertSpaceAfterMention: true,
                textStyle: {fontWeight: 'bold', color: '#2A9DD8'},
              },
              {
                pattern: /[#][a-z0-9_]+/gi,
                allowedSpacesCount: 0,
                textStyle: {fontWeight: 'bold', color: '#2A9DD8'},
              },
            ]}
            autoFocus
            placeholder="Descripción de la publicación..."
            textAlignVertical="top"
            multiline={true}
            numberOfLines={4}
          />
          <View style={styles.containerDropDownPickerMain}>
            <DropDownPicker
              open={open}
              setOpen={setOpen}
              items={groupsFormatted}
              setItems={setGroupsFormatted}
              value={group}
              setValue={setGroup}
              defaultValue={group}
              listMode="SCROLLVIEW"
              placeholder="Seleccionar"
              style={styles.dropDownStyle}
              containerStyle={styles.containerDropDownPicker}
              dropDownStyle={styles.dropDownPickerBackground}
              labelStyle={styles.dropDownPickerLabel}
              itemStyle={styles.dropDownPickerItem}
            />
          </View>
          {photos && photos.length > 0 && (
            <ScrollView style={styles.containerImages} horizontal>
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
            </ScrollView>
          )}
        </View>
        <View
          style={[
            isUseKeyboard ? styles.containerSecIcons : styles.containerSec,
          ]}>
          <TouchableOpacity onPress={() => choosePhoto()}>
            <View style={styles.listStyle}>
              <IconsEntypo
                name="image-inverted"
                color="#2A9DD8"
                size={28}
                style={styles.iconCreatePublication}
              />
              {!isUseKeyboard && (
                <Text style={styles.textCreatePublication}>Imagen</Text>
              )}
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
              {!isUseKeyboard && (
                <Text style={styles.textCreatePublication}>Video</Text>
              )}
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
              {!isUseKeyboard && (
                <Text style={styles.textCreatePublication}>Texto</Text>
              )}
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
              {!isUseKeyboard && (
                <Text style={styles.textCreatePublication}>Enlace</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  keyboardContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    position: 'relative',
  },
  inputDescription: {
    height: 120,
    backgroundColor: '#f5f5f5',
    color: '#164578',
    fontSize: 16,
    padding: 10,
    margin: 15,
    borderRadius: 12,
  },
  containerDropDownPickerMain: {
    width: '90%',
    marginBottom: 5,
    marginHorizontal: '5%',
  },
  dropDownStyle: {
    backgroundColor: '#F5F5F5',
    minHeight: 35,
    borderRadius: 24,
  },
  containerDropDownPicker: {
    width: '100%',
  },
  dropDownPickerBackground: {
    backgroundColor: '#fafafa',
  },
  dropDownPickerLabel: {
    fontSize: 14,
  },
  dropDownPickerItem: {
    justifyContent: 'flex-start',
    height: 15,
  },
  containerImages: {
    maxWidth: width,
    width: width,
    maxHeight: 170,
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
  },
  containerSec: {
    elevation: 2,
    backgroundColor: '#f5f5f5',
    height: 200,
    justifyContent: 'center',
  },
  containerSecIcons: {
    elevation: 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
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
  containerSuggestions: {
    position: 'relative',
    top: -20,
    marginHorizontal: 15,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },
  titleSuggestions: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: '#f5f5f5',
  },
  paddingInternalSuggestions: {
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  containerSuggestion: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  subContainerSuggestion: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarSuggestion: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    marginHorizontal: 10,
  },
  nameSuggestion: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export default CreatePublicationStepThree;
