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
        <View style={styles.navigate}>
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
        </View>

        <View style={styles.listStyle}>
          <Image
            source={require('../../../assets/imgGroups.png')}
            style={styles.ImageProfile}
          />
          <View>
            <Text style={styles.textCreatePublication}>Ciclovías</Text>
            <Text style={styles.subTtextCreatePublication}>20 miebmbros</Text>
          </View>
        </View>

        <View style={styles.listStyle}>
          <Image
            source={require('../../../assets/imgGroups.png')}
            style={styles.ImageProfile}
          />
          <View>
            <Text style={styles.textCreatePublication}>Vialidad</Text>
            <Text style={styles.subTtextCreatePublication}>20 miebmbros</Text>
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
});

export default CreatePublicationStepTwo;
