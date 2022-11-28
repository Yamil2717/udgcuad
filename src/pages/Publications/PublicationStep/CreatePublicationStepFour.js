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
  Switch,
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

function CreatePublicationStepFour({step, onChangeStep}) {
  let [open, setOpen] = useState(false);
  let grupos = ['grupo1', 'grupo2'];
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
        <View style={styles.navigate}>
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

          <View style={styles.containerPublicationSub}>
            <View>
              <Text>Ciclovías obstrullen el tráfico</Text>
              <Text>@Juan Gutiérrez </Text>
              <Text>#gobiernogdl #bicicletas #circulación</Text>
            </View>
            <Image
              source={require('../../../assets/PublicationImg.png')}
              style={styles.ImagePublication}
            />
          </View>
        </View>

        <View style={styles.listStyle}>
          <Image
            source={require('../../../assets/twitter.png')}
            style={styles.ImageProfile}
          />
          <View>
            <Text style={styles.textCreatePublication}>
              Publicar en Twitter
            </Text>
            <Switch
              trackColor={{false: '#767577', true: '#2A9DD8'}}
              thumbColor={isEnabled ? '#2A9DD8' : '#767577'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              style={styles.switch}
              value={isEnabled}
            />
          </View>
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('crear comunidad')}>
            <Text style={styles.textButton}>Ver mas</Text>
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
  navigate: {
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
    fontSize: 24,
  },
  subTtextCreatePublication: {
    fontSize: 12,
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
  input: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    fontSize: 14,
    height: 35,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    paddingVertical: 5,
    paddingLeft: 15,
  },
  iconForm: {
    width: 15,
    height: 15,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 5,
    padding: 0,
  },
  containerButton: {
    alignItems: 'center',
    marginVertical: 5,
  },
  button: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: '#2A9DD8',
    borderWidth: 2,
    borderRadius: 24,
  },
  textButton: {
    fontSize: 16,
    color: '#2A9DD8',
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
  switch: {
    width: 40,
  },
  containerPublicationSub: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImagePublication: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 10,
  },
});

export default CreatePublicationStepFour;
