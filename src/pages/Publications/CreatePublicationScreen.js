import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';
import {AxiosContext} from '../../contexts/AxiosContext';
import NavBar from '../../components/NavBar';
import Spinner from '../../components/Spinner';
import CreatePublicationSetpOne from './PublicationStep/CreatePublicationSetpOne';

function CreatePublicationScreen() {
  let [showNavBar, setShowNavBar] = useState(false);
  let [loading, setLoading] = useState(false);
  let [step, onChangeStep] = useState(0);

  switch (step) {
    case 0:
      return loading ? (
        <Spinner />
      ) : (
        <View style={styles.container}>
          {showNavBar && <NavBar setShowNavBar={setShowNavBar} />}
          <CreatePublicationSetpOne step={step} onChangeStep={onChangeStep} />
        </View>
      );
    case 1:
      return loading ? (
        <Spinner />
      ) : (
        <View style={styles.container}>
          {showNavBar && <NavBar setShowNavBar={setShowNavBar} />}
          <Text>Setp2</Text>
        </View>
      );
  }
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
  containerInputLogin: {
    width: 250,
    color: '#164578',
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
});

export default CreatePublicationScreen;
