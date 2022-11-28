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
import DropDownPicker from 'react-native-dropdown-picker';

function CreatePublicationStepThree({step, onChangeStep}) {
  let [open, setOpen] = useState(false);
  let grupos = ['grupo1', 'grupo2'];
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
        <View>
          <TextInput
            style={styles.containerInputTitle}
            placeholder="Título de tu publicación......"
            rightIcon={{
              type: 'font-awesome',
              name: 'search',
              color: '#045A17',
              size: 20,
            }}
            textAlignVertical="top"
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
          <View style={styles.containerDropDownPickerMain}>
            <DropDownPicker
              open={open}
              setOpen={setOpen}
              items={grupos}
              // setItems={setTypesUser}
              // value={selectTypeUser}
              // setValue={onChangeSelectTypeUser}
              listMode="SCROLLVIEW"
              placeholder="Seleccionar"
              style={styles.dropDownStyle}
              containerStyle={styles.containerDropDownPicker}
              dropDownStyle={styles.dropDownPickerBackground}
              labelStyle={styles.dropDownPickerLabel}
              itemStyle={styles.dropDownPickerItem}
            />
          </View>

          <View style={styles.imagesPublications}>
            <TouchableOpacity>
              <Image
                source={{
                  uri: 'https://img.freepik.com/foto-gratis/primer-plano-piernas-hombre-casual-bicicleta-clasica-carretera-ciudad_158595-4575.jpg?w=740&t=st=1669633444~exp=1669634044~hmac=9efc4dbf38208bf181c0d8e80a92688ff06e499e0315be5fda1d2cc15236293f',
                }}
                style={styles.ImageProfile}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/addPublication.jpg')}
                style={styles.ImageProfile}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerSec}>
          <TouchableOpacity>
            <View style={styles.listStyle}>
              <IconsEntypo
                name="image-inverted"
                color="#2A9DD8"
                size={35}
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
                size={35}
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
                size={35}
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
                size={35}
                style={styles.iconCreatePublication}
              />
              <Text style={styles.textCreatePublication}>Enlace</Text>
            </View>
          </TouchableOpacity>
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
    height: 150,
    fontSize: 20,
  },
  ImageProfile: {
    width: 150,
    height: 150,
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
  imagesPublications: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDropDownPickerMain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  containerDropDownPicker: {
    width: '80%',
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
