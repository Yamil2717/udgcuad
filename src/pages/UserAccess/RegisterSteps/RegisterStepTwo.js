import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import NavigationRegister from './NavigationRegister';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchImageLibrary} from 'react-native-image-picker';

function RegisterStepTwo({
  step,
  onChangeStep,
  photo,
  setPhoto,
  typesUser,
  setTypesUser,
  selectTypeUser,
  onChangeSelectTypeUser,
  categoriesInterest,
  setCategoriesInterest,
  tagsCategoriesInterest,
  selectTags,
  onChangeSelectTags,
}) {
  let [open, setOpen] = useState(false);
  let [selection, setSelection] = useState(1);

  function choosePhoto() {
    launchImageLibrary(
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
          if (response.assets[0].fileSize > 2097152) {
            return alert(
              'La imagen no puede superar los 2MB, por favor escoja otra.',
            );
          }
          setPhoto({...response.assets[0]});
        }
      },
    );
  }

  function chooseInterestCategory(id) {
    if (
      categoriesInterest[id]?.active &&
      categoriesInterest[id]?.active === true
    ) {
      let tempInterest = [...categoriesInterest];
      tempInterest[id] = {...categoriesInterest[id], active: false};
      setCategoriesInterest([...tempInterest]);
    } else {
      let tempInterest = [...categoriesInterest];
      tempInterest[id] = {...categoriesInterest[id], active: true};
      setCategoriesInterest([...tempInterest]);
    }
  }

  function chooseTags(tag) {
    if (selectTags[tag.id]) {
      let tempTags = {...selectTags};
      delete tempTags[tag.id];
      onChangeSelectTags({...tempTags});
    } else {
      let tempTags = {...selectTags};
      tempTags[tag.id] = {...tag};
      onChangeSelectTags({...tempTags});
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationRegister
        valueScreen={step}
        previousScreenOnPress={onChangeStep}
        afterScreenOnPress={onChangeStep}
        incrementOnPress={1}
      />
      <ScrollView>
        <Text style={styles.textTitle}>Crear cuenta</Text>
        <View style={styles.subContainer}>
          <Text style={[styles.textSubTitle, styles.textCenter]}>
            Elije tu fotografía de perfil
          </Text>
          <View style={styles.containerPhoto}>
            {photo ? (
              <TouchableOpacity onPress={choosePhoto}>
                <Image source={{uri: photo.uri}} style={styles.photoUser} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={choosePhoto}>
                <Image
                  source={require('../../../assets/icons/ChooseImage.png')}
                  style={styles.noPhoto}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.textSubTitle}>Tipo de usuario</Text>
          <DropDownPicker
            open={open}
            setOpen={setOpen}
            items={typesUser}
            setItems={setTypesUser}
            value={selectTypeUser}
            setValue={onChangeSelectTypeUser}
            listMode="SCROLLVIEW"
            placeholder="Seleccionar"
            style={styles.dropDownStyle}
            containerStyle={styles.containerDropDownPicker}
            dropDownStyle={styles.dropDownPickerBackground}
            labelStyle={styles.dropDownPickerLabel}
            itemStyle={styles.dropDownPickerItem}
          />
          <Text style={styles.textSubTitle}>Selecciona tus intereses</Text>
          <View style={styles.flexCenter}>
            <View style={styles.btnGroup}>
              <TouchableOpacity
                style={[styles.btn, selection === 1 && styles.btnActive]}
                onPress={() => setSelection(1)}>
                <Text
                  style={[
                    styles.btnText,
                    selection === 2 && styles.textNoActive,
                  ]}>
                  Tema
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, selection === 2 && styles.btnActive]}
                onPress={() => setSelection(2)}>
                <Text
                  style={[
                    styles.btnText,
                    selection === 1 && styles.textNoActive,
                  ]}>
                  #
                </Text>
              </TouchableOpacity>
            </View>

            {selection === 1 && (
              <View style={styles.categoryList}>
                {categoriesInterest.map((category, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.categoryItem}
                      onPress={() => chooseInterestCategory(index)}>
                      <View style={styles.justifyContentCenter}>
                        <Image
                          source={{uri: category.picture}}
                          style={[
                            styles.categoryImage,
                            category?.active === true &&
                              styles.categoryImageActive,
                          ]}
                          PlaceholderContent={<ActivityIndicator />}
                        />
                        <Text
                          style={[
                            styles.categoryText,
                            category?.active === true &&
                              styles.categoryTextActive,
                          ]}>
                          {category.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {selection === 2 && (
              <View style={styles.tagsList}>
                {categoriesInterest.map(category => {
                  if (category?.active && category?.active === true) {
                    let tags = tagsCategoriesInterest[category.id].map(
                      (tag, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={styles.tagsItem}
                            onPress={() => chooseTags(tag)}>
                            <Text
                              style={[
                                styles.tagsText,
                                selectTags[tag.id] && styles.tagsTextActive,
                              ]}>
                              #{tag.hashtag}
                            </Text>
                          </TouchableOpacity>
                        );
                      },
                    );
                    return tags;
                  }
                })}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  textTitle: {
    color: '#2A9DD8',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  subContainer: {
    marginHorizontal: 50,
    marginBottom: 10,
  },
  textSubTitle: {
    color: '#828282',
    fontSize: 18,
    marginVertical: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
  containerPhoto: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoUser: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  noPhoto: {
    width: 100,
    height: 100,
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
  flexCenter: {
    alignItems: 'center',
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#2A9DD8',
    overflow: 'hidden',
    marginBottom: 10,
  },
  btn: {
    paddingVertical: 2.5,
    paddingHorizontal: 10,
    width: '25%',
    textAlign: 'center',
  },
  btnText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
  },
  btnActive: {
    backgroundColor: '#2A9DD8',
  },
  textNoActive: {
    color: '#2A9DD8',
  },
  categoryList: {
    width: '100%',
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  categoryItem: {
    width: '50%',
    marginVertical: 10,
    flexBasis: '50%',
  },
  justifyContentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: 125,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 5,
    borderColor: 'transparent',
  },
  categoryText: {
    fontSize: 16,
    width: 125,
    textAlign: 'center',
    color: '#2A9DD8',
  },
  categoryImageActive: {
    borderColor: '#2A9DD8',
  },
  categoryTextActive: {
    fontWeight: '800',
  },
  tagsList: {
    width: '100%',
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tagsItem: {
    marginVertical: 10,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  tagsText: {
    color: '#85B1C7',
  },
  tagsTextActive: {
    color: '#2A9DD8',
  },
});

export default RegisterStepTwo;
