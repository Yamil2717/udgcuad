import React, {useEffect, useState, useContext} from 'react';
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
import DropDownPicker from 'react-native-dropdown-picker';
import {AxiosContext} from '../../../contexts/AxiosContext';
import env from '../../../env';
import Spinner from '../../../components/Spinner';

const {height} = Dimensions.get('window');

function CreateGroupStepOne({
  step,
  onChangeStep,
  photoGroup,
  setPhotoGroup,
  name,
  setName,
  selectCategories,
  onChangeSelectCategories,
  description,
  setDescription,
  createGroup,
}) {
  let [loading, setLoading] = useState(false);
  let [open, setOpen] = useState(false);
  let [categories, setCategories] = useState([]);
  const {publicAxios} = useContext(AxiosContext);
  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    await publicAxios
      .get(`${env.api}/interest`)
      .then(interests => {
        let tempInterest = [];
        interests.map(interest => {
          tempInterest.push({label: interest.name, value: interest.id});
        });
        setCategories([...tempInterest]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err?.response?.data?.message || err.message);
        Alert.alert('Voces', err?.response?.data?.message || err.message);
      });
  }

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

  return loading ? (
    <Spinner />
  ) : (
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
            <Text style={styles.textTitle}>Seleccione una categoría</Text>
            <DropDownPicker
              open={open}
              setOpen={setOpen}
              items={categories}
              setItems={setCategories}
              value={selectCategories}
              setValue={onChangeSelectCategories}
              listMode="SCROLLVIEW"
              placeholder="Seleccionar"
              style={styles.dropDownStyle}
              containerStyle={styles.containerDropDownPicker}
              dropDownStyle={styles.dropDownPickerBackground}
              labelStyle={styles.dropDownPickerLabel}
              itemStyle={styles.dropDownPickerItem}
            />
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
            if (!photoGroup || !name || !description || !selectCategories) {
              return;
            }
            createGroup();
          }}>
          <Text
            style={[
              styles.textButtonBottom,
              !photoGroup || !name || !description || !selectCategories
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
  navigate: {
    height: height - 47.6,
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
    color: '#858585',
    fontSize: 16,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '100%',
  },
  formsStyleTwo: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 10,
  },
  dropDownStyle: {
    backgroundColor: '#F5F5F5',
    minHeight: 35,
    borderRadius: 24,
    borderColor: 'transparent',
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
  inputDescription: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: '#858585',
    height: 90,
    maxHeight: 90,
    textAlignVertical: 'top',
    width: '100%',
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
