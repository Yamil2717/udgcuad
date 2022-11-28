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

import IconsAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconsMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconsFoundation from 'react-native-vector-icons/Foundation';

function CreatePublicationStepOne({step, onChangeStep}) {
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
        </View>

        <View style={styles.containerSec}>
          <View style={styles.listStyle}>
            <Text>1</Text>
            <Text>Foto</Text>
          </View>

          <View style={styles.listStyle}>
            <Text>1</Text>
            <Text>Foto</Text>
          </View>

          <View style={styles.listStyle}>
            <Text>1</Text>
            <Text>Foto</Text>
          </View>

          <View style={styles.listStyle}>
            <Text>1</Text>
            <Text>Foto</Text>
          </View>
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
    backgroundColor: 'gray',
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
    height: 200,
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
});

export default CreatePublicationStepOne;
