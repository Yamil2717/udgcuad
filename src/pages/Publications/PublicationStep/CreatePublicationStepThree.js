import React, {useRef, useState} from 'react';
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
  Pressable,
} from 'react-native';
import NavigationPublication from './NavigationPublication';
import {launchImageLibrary} from 'react-native-image-picker';
import IconsEntypo from 'react-native-vector-icons/Entypo';
import IconsMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import {MentionInput} from 'react-native-controlled-mentions';

const {width, height} = Dimensions.get('window');

function CreatePublicationStepThree({
  step,
  onChangeStep,
  description,
  onChangeDescription,
  photos,
  setPhotos,
  groupsFormatted,
  setGroupsFormatted,
  group,
  setGroup,
}) {
  let [open, setOpen] = useState(false);
  const refInputDescription = useRef();

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

  const suggestions = [
    {id: '1', name: 'David Tabaka'},
    {id: '2', name: 'Mary'},
    {id: '3', name: 'Tony'},
    {id: '4', name: 'Mike'},
    {id: '5', name: 'Grey'},
  ];

  const renderSuggestions = ({keyword, onSuggestionPress}) => {
    if (keyword == null) {
      return null;
    }

    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 777,
          bottom: 15,
          left: 15,
          right: 15,
        }}>
        <Text
          style={{
            paddingHorizontal: 12,
            paddingVertical: 5,
            backgroundColor: '#ccc',
          }}>
          Selecciona una sugerencia
        </Text>
        {suggestions
          .filter(one =>
            one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()),
          )
          .slice(0, 2)
          .map(one => (
            <Pressable
              key={one.id}
              onPress={() => onSuggestionPress(one)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 5,
                backgroundColor: '#f5f5f5',
                borderBottomWidth: 2,
                borderColor: '#ccc',
              }}>
              <Text>{one.name}</Text>
            </Pressable>
          ))}
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
      />
      <View style={styles.subContainer}>
        <View style={styles.subSubContainer}>
          <View style={styles.containerInput}>
            <MentionInput
              value={description}
              onChange={onChangeDescription}
              style={{
                height: 100,
                backgroundColor: '#f5f5f5',
                color: '#164578',
                fontSize: 16,
                marginHorizontal: 15,
                marginVertical: 15,
                borderRadius: 12,
                paddingVertical: 10,
                paddingHorizontal: 10,
                position: 'relative',
              }}
              partTypes={[
                {
                  trigger: '@', // Should be a single character like '@' or '#'
                  renderSuggestions,
                  textStyle: {fontWeight: 'bold', color: '#2A9DD8'}, // The mention style in the input
                },
                {
                  pattern: /[#][a-z0-9_]+/gi,
                  allowedSpacesCount: 0,
                  textStyle: {fontWeight: 'bold', color: '#2A9DD8'},
                },
              ]}
              autoFocus
              multiline={true}
              placeholder="Descripción de la publicación..."
              textAlignVertical="top"
              numberOfLines={4}
            />
          </View>
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
          <ScrollView
            style={[photos && photos.length > 0 && styles.containerImages]}
            horizontal>
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
        </View>
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
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  subContainer: {
    minHeight: height - 47.5,
    position: 'relative',
  },
  subSubContainer: {
    marginBottom: '30%',
  },
  containerSec: {
    position: 'absolute',
    backgroundColor: '#f5f5f5',
    height: '30%',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    right: 0,
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
    maxHeight: 225,
    position: 'relative',
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    color: '#164578',
    height: 200,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 12,
    overflow: 'scroll',
    zIndex: 5,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: '#164578',
    height: 200,
    fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: 'red',
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 12,
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  containerDropDownPickerMain: {
    width: '90%',
    marginVertical: 5,
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
});

export default CreatePublicationStepThree;
