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
import DropDownPicker from 'react-native-dropdown-picker';

const {width} = Dimensions.get('window');

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
          placeholder="Descripción de la publicación..."
          textAlignVertical="top"
          textColor={styles.colorInput}
          multiline={true}
          numberOfLines={4}
          value={description}
          onChangeText={onChangeDescription}
        />
      </View>
      <View
        style={[
          styles.containerDropDownPickerMain,
          !photos || photos.length === 0
            ? styles.DropDownMarginBottom
            : styles.dropDownMarginBottomNormal,
        ]}>
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
    height: '20%',
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
  containerDropDownPickerMain: {
    width: '90%',
    marginHorizontal: '5%',
  },
  DropDownMarginBottom: {
    marginBottom: '72.5%',
  },
  dropDownMarginBottomNormal: {
    marginBottom: '27.5%',
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
